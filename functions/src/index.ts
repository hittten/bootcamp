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

  response.set('Cache-Control', 'public, max-age=15, s-maxage=30');
  response.set('Access-Control-Allow-Methods', 'OPTIONS, GET');
  response.set('Access-Control-Allow-Headers', 'Authorization,Content-Type');
  response.set('Access-Control-Allow-Credentials', 'true');
  response.set('Access-Control-Allow-Origin', '*');

  response.json(video);
});

export const getVideos = functions.https.onRequest(async (request: functions.Request, response: functions.Response) => {

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

  response.set('Cache-Control', 'public, max-age=15, s-maxage=30');
  response.set('Access-Control-Allow-Methods', 'OPTIONS, GET');
  response.set('Access-Control-Allow-Headers', 'Authorization,Content-Type');
  response.set('Access-Control-Allow-Credentials', 'true');
  response.set('Access-Control-Allow-Origin', '*');

  response.json(responseVideos);
});

export const getVideo = functions.https.onRequest(async (request: functions.Request, response: functions.Response) => {

  const id = request.query.id;
  if (!id) {
    response.sendStatus(400);
    return;
  }

  const video = await db.collection('videos').doc(id).get();

  response.set('Cache-Control', 'public, max-age=15, s-maxage=30');
  response.set('Access-Control-Allow-Methods', 'OPTIONS, GET');
  response.set('Access-Control-Allow-Headers', 'Authorization,Content-Type');
  response.set('Access-Control-Allow-Credentials', 'true');
  response.set('Access-Control-Allow-Origin', '*');

  const data = video.data();
  if (!video.exists || !data) {
    response.sendStatus(404);

    return;
  }
  const result = Object.assign({}, data, {createdAt: data.createdAt.toDate()});
  response.json(result);
});
