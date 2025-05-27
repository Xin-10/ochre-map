<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import type { OchreItem } from '$lib';

  const { data }: { data: { item: OchreItem } } = $props();
  const item = data.item;
</script>

<div class="max-w-3xl mx-auto p-6 space-y-6">
  <a href="/">
    <Button variant="outline" class="text-sm">Home</Button>
  </a>

  <h1 class="text-2xl font-semibold">{item.identification?.label}</h1>

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
  <p class="text-muted-foreground text-sm">[ No image available ]</p>
  {/if}

  <div class="grid grid-cols-2 gap-x-8 gap-y-4">
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