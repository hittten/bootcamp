import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

interface Video {
  id: number;
  title: string;
  image: string;
  duration: number;
  favorite: boolean;
  createdAt: Date;
  note?: string;
}

export const addVideo = functions.https.onRequest(async (request, response) => {
  const videos = await db.collection('videos').orderBy('createdAt', 'desc').limit(1).get();
  const video = {
    id: 1,
    title: 'title 1',
    image: 'https://picsum.photos/220/120?random=1',
    duration: 59,
    favorite: false,
    createdAt: new Date(),
  };

  if (!videos.empty) {
    videos.forEach(dbVideo => {
      const data = dbVideo.data() as Video;
      const id = data.id + 1;
      video.id = id;
      video.title = 'title ' + id;
      video.image = 'https://picsum.photos/220/120?random=' + id;
      video.duration = data.duration + 1;
      video.favorite = false;
      video.createdAt = new Date();
    });
  }
  await db.collection('videos').doc(video.id.toString()).set(video);

  response.json(video);
});

export const getVideos = functions.https.onRequest(async (request: functions.Request, response: functions.Response) => {
  response.set('Cache-Control', 'public, max-age=15, s-maxage=30');
  response.set('Access-Control-Allow-Methods', 'OPTIONS, GET');
  response.set('Access-Control-Allow-Headers', 'Authorization,Content-Type');
  response.set('Access-Control-Allow-Credentials', 'true');
  response.set('Access-Control-Allow-Origin', '*');

  if (request.method === 'OPTIONS') {
    response.sendStatus(204);
    return;
  }

  const search = request.query.search || '';
  const searchReg = new RegExp(search, 'i');
  console.debug('search', search);

  const videos = await db.collection('videos').get();

  const responseVideos: any = [];
  videos.forEach(video => {
    const data = video.data();

    if (!searchReg.test(data.title)) {
      return;
    }

    responseVideos.push(Object.assign({}, data, {createdAt: data.createdAt.toDate()}));
  });

  response.json(responseVideos);
});

export const getVideo = functions.https.onRequest(async (request: functions.Request, response: functions.Response) => {
  response.set('Cache-Control', 'public, max-age=30, s-maxage=60');
  response.set('Access-Control-Allow-Methods', 'OPTIONS, GET');
  response.set('Access-Control-Allow-Headers', 'Authorization,Content-Type');
  response.set('Access-Control-Allow-Credentials', 'true');
  response.set('Access-Control-Allow-Origin', '*');

  if (request.method === 'OPTIONS') {
    response.sendStatus(204);
    return;
  }

  const id = request.query.id;
  if (!id) {
    response.sendStatus(400);
    return;
  }

  const video = await db.collection('videos').doc(id).get();

  const data = video.data();
  if (!video.exists || !data) {
    response.sendStatus(404);

    return;
  }
  const result = Object.assign({}, data, {createdAt: data.createdAt.toDate()});
  response.json(result);
});

export const addToPlaylist = functions.https.onRequest(async (request: functions.Request, response: functions.Response) => {
  response.set('Access-Control-Allow-Methods', 'OPTIONS, POST');
  response.set('Access-Control-Allow-Headers', 'Authorization,Content-Type');
  response.set('Access-Control-Allow-Credentials', 'true');
  response.set('Access-Control-Allow-Origin', '*');

  if (request.method === 'OPTIONS') {
    response.sendStatus(204);
    return;
  }

  if (request.method !== 'POST') {
    response.sendStatus(405);
    return;
  }

  const idToken = request.header('Authorization');
  if (!idToken) {
    response.sendStatus(403);
    return;
  }

  const id = request.body.id;
  if (!id) {
    response.sendStatus(400);
    return;
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken.split(' ')[1]);
    const videoDocument = await db.collection('videos').doc(id.toString()).get();
    const video = videoDocument.data();

    if (!videoDocument.exists || !video) {
      response.sendStatus(400);
      return;
    }

    await db.collection('users').doc(decodedToken.uid).collection('playlist').add(video);
    response.json(video);
  } catch (e) {
    response.sendStatus(403);
    console.error(e);
  }
});

export const removeFromPlaylist = functions.https.onRequest(async (request: functions.Request, response: functions.Response) => {
  response.set('Access-Control-Allow-Methods', 'OPTIONS, POST');
  response.set('Access-Control-Allow-Headers', 'Authorization,Content-Type');
  response.set('Access-Control-Allow-Credentials', 'true');
  response.set('Access-Control-Allow-Origin', '*');

  if (request.method === 'OPTIONS') {
    response.sendStatus(204);
    return;
  }

  if (request.method !== 'POST') {
    response.sendStatus(405);
    return;
  }

  const idToken = request.header('Authorization');
  if (!idToken) {
    response.sendStatus(403);
    return;
  }

  const id = request.body.id;
  if (!id) {
    response.sendStatus(400);
    return;
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken.split(' ')[1]);
    const playlist = await db.collection('users').doc(decodedToken.uid).collection('playlist').where('id','==', id).limit(1).get();

    playlist.forEach(async video => {
      await db.collection('users').doc(decodedToken.uid).collection('playlist').doc(video.id).delete();

      response.json(video.data());
    });
  } catch (e) {
    response.sendStatus(403);
    console.error(e);
  }
});

export const getPlaylist = functions.https.onRequest(async (request: functions.Request, response: functions.Response) => {
  response.set('Access-Control-Allow-Methods', 'OPTIONS, GET');
  response.set('Access-Control-Allow-Headers', 'Authorization,Content-Type');
  response.set('Access-Control-Allow-Credentials', 'true');
  response.set('Access-Control-Allow-Origin', '*');

  if (request.method === 'OPTIONS') {
    response.sendStatus(204);
    return;
  }

  if (request.method !== 'GET') {
    response.sendStatus(405);
    return;
  }

  const idToken = request.header('Authorization');
  if (!idToken) {
    response.sendStatus(403);
    return;
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken.split(' ')[1]);
    const playlistDocuments = await db.collection('users').doc(decodedToken.uid).collection('playlist').get();
    const responseVideos: any = [];

    playlistDocuments.forEach(video => {
      const data = video.data();
      responseVideos.push(Object.assign({}, data, {createdAt: data.createdAt.toDate()}));
    });

    response.json(responseVideos);
  } catch (e) {
    response.sendStatus(403);
    console.error(e);
  }
});

export const getUser = functions.https.onRequest(async (request: functions.Request, response: functions.Response) => {
  response.set('Access-Control-Allow-Methods', 'OPTIONS, GET');
  response.set('Access-Control-Allow-Headers', 'Authorization,Content-Type');
  response.set('Access-Control-Allow-Credentials', 'true');
  response.set('Access-Control-Allow-Origin', '*');

  if (request.method === 'OPTIONS') {
    response.sendStatus(204);
    return;
  }

  if (request.method !== 'GET') {
    response.sendStatus(405);
    return;
  }

  const idToken = request.header('Authorization');
  if (!idToken) {
    response.sendStatus(403);
    return;
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken.split(' ')[1]);
    const authUser = await admin.auth().getUser(decodedToken.uid);
    const user = {
      id: authUser.uid,
      email: authUser.email,
    };

    response.json(user);
  } catch (e) {
    response.sendStatus(403);
    console.error(e);
  }
});
