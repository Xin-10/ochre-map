<script lang="ts">
  import { Input } from '$lib/components/ui/input/index.js';
  import * as Table from '$lib/components/ui/table/index.js';
  import { MapLibre, DefaultMarker } from 'svelte-maplibre';
  import type { PageData } from './+page.ts';

  const { data }: { data: PageData } = $props();
  const setItems = data.set.items;
  let filter = $state('');

  const matchesFilter = (item: any, filter: string) => {
    const lower = filter.toLowerCase();
    const nameMatch = item.identification?.label?.toLowerCase().includes(lower);
    const propMatch = item.properties?.some((prop: any) =>
      prop.label?.toLowerCase().includes(lower) ||
      prop.values?.some((v: any) => v.content?.toLowerCase().includes(lower))
    );
    return nameMatch || propMatch;
  };
</script>

<div class="p-6">
  <div class="space-y-6">
    <div class="rounded-lg border-2 border-gray-400 shadow-sm overflow-hidden">
      <MapLibre
        zoom={5}
        center={[35, 34]}
        class="h-[400px]"
        style="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
      >
        {#each setItems.filter(item => matchesFilter(item, filter)) as item}
          {#if item.coordinates}
            <DefaultMarker
              lngLat={[
                item.coordinates.longitude,
                item.coordinates.latitude
              ]}
            />
          {/if}
        {/each}
      </MapLibre>
    </div>

    <Input
    placeholder="Filter items…"
    bind:value={filter}
    class="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
    />

    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.Head class="text-black">Name</Table.Head>
          <Table.Head class="text-black">Object Type</Table.Head>
          <Table.Head class="text-black">Museum Number</Table.Head>
          <Table.Head class="text-black">Full TEO Findspot</Table.Head>
          <Table.Head class="text-black">Script</Table.Head>
          <Table.Head class="text-black">Language</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each setItems.filter(item => matchesFilter(item, filter)) as item}
          <Table.Row>
            <Table.Cell>
              <a href={`/${item.uuid}`} class="hover:underline text-foreground">
                {item.identification?.label}
              </a>
            </Table.Cell>
            <Table.Cell>
              {item.properties.find(p => p.label === 'Object type')?.values?.[0]?.content ?? ''}
            </Table.Cell>
            <Table.Cell>
              {item.properties.find(p => p.label === 'Museum Number')?.values?.[0]?.content ?? ''}
            </Table.Cell>
            <Table.Cell>
              {item.properties.find(p => p.label === 'Full TEO Findspot')?.values?.[0]?.content ?? ''}
            </Table.Cell>
            <Table.Cell>
              {item.properties.find(p => p.label === 'Script')?.values?.[0]?.content ?? ''}
            </Table.Cell>
            <Table.Cell>
              {item.properties.find(p => p.label === 'Language')?.values?.[0]?.content ?? ''}
            </Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>

    {#if data.set.identification?.label}
      <p class="text-xl text-center text-muted-foreground -mt-2">
        {data.set.identification.label}
      </p>
    {/if}
  </div>
</div>