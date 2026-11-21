import { metClient } from './client';
import { Department, DepartmentsResponse, MetObject, SearchResponse } from './types';

export async function getDepartments(): Promise<Department[]> {
  const { data } = await metClient.get<DepartmentsResponse>('/v1/departments');
  return data.departments;
}
export async function getObject(id: number): Promise<MetObject> {
  const { data } = await metClient.get<MetObject>(`/v1/objects/${id}`);
  return data;
}
export async function searchObjectIds(query: string, limit = 20): Promise<number[]> {
  if (query.trim() === '') return [];
  const { data } = await metClient.get<SearchResponse>('/v1.1/search', {
    params: { q: query, hasImages: true, limit },
  });
  return data.objectIDs ?? [];
}
export async function getDepartmentHighlightIds(
  departmentId: number,
  limit = 20,
): Promise<number[]> {
  const { data } = await metClient.get<SearchResponse>('/v1.1/search', {
    params: { departmentId, isHighlight: true, hasImage: true, limit },
  });
  return data.objectIDs ?? [];
}
export async function getObjects(ids: number[]): Promise<MetObject[]> {
  const results = await Promise.allSettled(ids.map((id) => getObject(id)));
  return results
    .filter((r): r is PromiseFulfilledResult<MetObject> => r.status === 'fulfilled')
    .map((r) => r.value)
    .filter((artwork) => artwork.primaryImageSmall !== '');
}
