<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import type { OchreItem } from '$lib';

  const { data }: { data: { item: OchreItem } } = $props();
  const item = data.item;
</script>

<div class="max-w-2xl mx-auto p-6">
  <a href="/">
    <Button variant="outline" class="text-sm">Home</Button>
  </a>

  <div class="mt-6 space-y-2">
    <h1 class="text-2xl font-bold">{item.identification?.label}</h1>

    {#if item.media && item.media.length > 0}
      {#each item.media as m}
        {#if m.iiif}
          <img
            src="{m.iiif}/full/600,/0/default.jpg"
            alt={item.identification?.label ?? ''}
            class="rounded-lg my-4 max-w-md mx-auto"
          />
        {/if}
      {/each}
    {:else}
      <p class="text-sm text-black">[ No image available ]</p>
    {/if}
  </div>

  <div class="mt-10 grid grid-cols-[200px_1fr] gap-x-24 gap-y-4">
    {#each item.properties as prop}
      <p class="font-medium">{prop.label}</p>
      <p>{prop.values?.map((v: { content: string }) => v.content).join(', ')}</p>

      {#if prop.properties && prop.properties.length > 0}
        {#each prop.properties as sub}
          <p class="pl-4 font-medium text-black">{sub.label}</p>
          <p class="text-black">{sub.values?.map((v: { content: string }) => v.content).join(', ')}</p>
        {/each}
      {/if}
    {/each}
  </div>
</div>