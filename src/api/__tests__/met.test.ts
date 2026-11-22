import { http, HttpResponse } from 'msw';
import { server } from '../../mocks/server';
import { BASE_URL, metClient } from '../client';
import {
  getDepartmentHighlightIds,
  getDepartments,
  getObject,
  getObjects,
  searchObjectIds,
} from '../met';

describe('getDepartments', () => {
  it('returns the list of departments', async () => {
    const departments = await getDepartments();
    expect(departments).toHaveLength(2);
    expect(departments[0].displayName).toBe('American Decorative Arts');
  });
});

describe('getObject', () => {
  it('returns the artwork for the given ID', async () => {
    const artwork = await getObject(123);
    expect(artwork.objectID).toBe(123);
    expect(artwork.title).toBe('The Starry Test Night');
  });
});

describe('searchObjectIds', () => {
  it('returns matching IDs', async () => {
    const ids = await searchObjectIds('sunflowers');
    expect(ids).toEqual([1, 2, 3]);
  });

  it('sends the query and only asks for works with images', async () => {
    let params: URLSearchParams | undefined;
    server.use(
      http.get(`${BASE_URL}/v1.1/search`, ({ request }) => {
        params = new URL(request.url).searchParams;
        return HttpResponse.json({ total: 0, objectIDs: [] });
      }),
    );

    await searchObjectIds('sunflowers');

    expect(params?.get('q')).toBe('sunflowers');
    expect(params?.get('hasImages')).toBe('true');
  });

  it('returns an empty list for zero results (Met sends null)', async () => {
    const ids = await searchObjectIds('zzznothing');
    expect(ids).toEqual([]);
  });

  it('does not make a request for an empty query', async () => {
    const getSpy = jest.spyOn(metClient, 'get');

    const ids = await searchObjectIds('   ');

    expect(ids).toEqual([]);
    expect(getSpy).not.toHaveBeenCalled();
    getSpy.mockRestore();
  });
});

describe('getDepartmentHighlightIds', () => {
  it('asks for highlighted works with images in that department', async () => {
    let params: URLSearchParams | undefined;
    server.use(
      http.get(`${BASE_URL}/v1.1/search`, ({ request }) => {
        params = new URL(request.url).searchParams;
        return HttpResponse.json({ total: 2, objectIDs: [10, 20] });
      }),
    );

    const ids = await getDepartmentHighlightIds(11);

    expect(ids).toEqual([10, 20]);
    expect(params?.get('departmentId')).toBe('11');
    expect(params?.get('isHighlight')).toBe('true');
    expect(params?.get('hasImages')).toBe('true');
  });
});

describe('getObjects', () => {
  it('skips IDs that fail and works without an image', async () => {
    server.use(
      http.get(`${BASE_URL}/v1/objects/:objectID`, ({ params }) => {
        const id = Number(params.objectID);
        if (id === 2) {
          return new HttpResponse(null, { status: 404 });
        }
        return HttpResponse.json({
          objectID: id,
          title: `Artwork ${id}`,
          primaryImageSmall: id === 3 ? '' : 'https://example.com/fake.jpg',
        });
      }),
    );

    const artworks = await getObjects([1, 2, 3]);

    expect(artworks.map((a) => a.objectID)).toEqual([1]);
  });
});
