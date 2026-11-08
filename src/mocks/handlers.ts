import { http, HttpResponse } from 'msw';

const MET_API = 'https://collectionapi.metmuseum.org/public/collection/v1';

export const handlers = [
  http.get(`${MET_API}/objects/:objectID`, ({ params }) => {
    return HttpResponse.json({
      objectID: Number(params.objectID),
      title: 'The Starry Test Night',
      artistDisplayName: 'Mock Van Gogh',
      primaryImageSmall: 'https://example.com/fake.jpg',
    });
  }),
];
