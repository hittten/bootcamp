import {Video} from './video';

export const VIDEOS: Video[] = [
  {id: 1, title: 'título 1', image: 'https://picsum.photos/220/120?random=1', duration: 59, favorite: false, createdAt: new Date()},
  {id: 2, title: 'título 2', image: 'https://picsum.photos/220/120?random=2', duration: 60, favorite: true, createdAt: new Date()},
  {
    id: 3,
    title: 'título 3',
    image: 'https://picsum.photos/220/120?random=3',
    duration: 61,
    favorite: false,
    createdAt: new Date(),
    note: 'video 3 note!',
  },
  {
    id: 4,
    title: 'título 4',
    image: 'https://picsum.photos/220/120?random=4',
    duration: 104,
    favorite: false,
    createdAt: new Date(),
    note: 'video 4 note!',
  },
  {id: 5, title: 'título 5', image: 'https://picsum.photos/220/120?random=5', duration: 105, favorite: false, createdAt: new Date()},
  {id: 6, title: 'título 6', image: 'https://picsum.photos/220/120?random=6', duration: 106, favorite: false, createdAt: new Date()},
  {id: 7, title: 'título 7', image: 'https://picsum.photos/220/120?random=7', duration: 107, favorite: false, createdAt: new Date()},
  {id: 8, title: 'título 8', image: 'https://picsum.photos/220/120?random=8', duration: 108, favorite: false, createdAt: new Date()},
  {id: 9, title: 'título 9', image: 'https://picsum.photos/220/120?random=9', duration: 109, favorite: false, createdAt: new Date()},
  {id: 10, title: 'título 10', image: 'https://picsum.photos/220/120?random=10', duration: 110, favorite: false, createdAt: new Date()},
];

export const PLAYLIST: Video[] = [];
