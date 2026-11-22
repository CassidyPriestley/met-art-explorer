import { http, HttpResponse } from 'msw';
import { BASE_URL } from '../api/client';

export const handlers = [
  http.get(`${BASE_URL}/v1/departments`, () => {
    return HttpResponse.json({
      departments: [
        { departmentId: 1, displayName: 'American Decorative Arts' },
        { departmentId: 11, displayName: 'European Paintings' },
      ],
    });
  }),

  http.get(`${BASE_URL}/v1.1/search`, ({ request }) => {
    const q = new URL(request.url).searchParams.get('q');
    if (q === 'zzznothing') {
      return HttpResponse.json({ total: 0, objectIDs: null });
    }
    return HttpResponse.json({ total: 3, objectIDs: [1, 2, 3] });
  }),

  http.get(`${BASE_URL}/v1/objects/:objectID`, ({ params }) => {
    return HttpResponse.json({
      objectID: Number(params.objectID),
      title: 'The Starry Test Night',
      artistDisplayName: 'Mock Van Gogh',
      primaryImage: 'https://example.com/fake-large.jpg',
      primaryImageSmall: 'https://example.com/fake.jpg',
      objectDate: '1889',
      medium: 'Oil on canvas',
      department: 'European Paintings',
      dimensions: '29 x 36 in.',
      objectURL: 'https://www.metmuseum.org/art/collection/search/1',
      isHighlight: true,
    });
  }),
];
