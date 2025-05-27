import type { PageLoad } from './$types';
import { fetchItem } from '@digitalculture/ochre-sdk';

export const load: PageLoad = async ({ params }) => {
  const { error, item } = await fetchItem(params.uuid, 'spatialUnit');
  if (error) throw new Error('Failed to load item');
  return { item };
};

export type PageData = Awaited<ReturnType<typeof load>>;