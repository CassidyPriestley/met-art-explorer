export type Department = {
  departmentId: number;
  displayName: string;
};

export type DepartmentsResponse = {
  departments: Department[];
};

export type SearchResponse = {
  total: number;
  objectIDs: number[] | null;
};

export type MetObject = {
  objectID: number;
  title: string;
  artistDisplayName: string;
  primaryImageSmall: string;
  primaryImage: string;
  objectDate: string;
  medium: string;
  department: string;
  dimensions: string;
  objectURL: string;
  isHighlight: boolean;
};
