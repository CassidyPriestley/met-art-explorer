import axios from 'axios';

const MET_API = 'https://collectionapi.metmuseum.org/public/collection/v1';

describe('MSW setup', () => {
  it('intercepts Met API requests and returns mock data', async () => {
    const { data } = await axios.get(`${MET_API}/objects/123`);
    expect(data.objectID).toBe(123);
    expect(data.title).toBe('The Starry Test Night');
  });
});
