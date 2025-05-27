export type OchreProperty = {
  label: string;
  values: Array<{ content: string }>;
  properties?: OchreProperty[];
};

export type Coordinates = {
  latitude: number;
  longitude: number;
  label?: string | null;
  type?: string | null;
};

export type OchreItem = {
  uuid: string;
  identification: { label: string };
  properties: OchreProperty[];
  coordinates?: Coordinates;
  media?: Array<{ iiif: string }>;
};
