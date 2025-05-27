import { fetchItem } from '@digitalculture/ochre-sdk';

export const load = async () => {
  const { error, item: set } = await fetchItem(
    '240e6e06-9d05-4210-aa83-f4190639886d', // UUID
    'set',
    'spatialUnit'
  );

  if (error) throw new Error('Failed to fetch OCHRE data.');

  return { set };
};