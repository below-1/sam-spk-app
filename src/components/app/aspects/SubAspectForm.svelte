<script>
  import { onMount } from "svelte";

  export let sub = {};

  $: {
    name = sub.name;
    value = sub.value;
    core = sub.core;
    weight = sub.weight;
  };

  let name = "";
  let value = 0;
  let core = false;
  let weight = 0;
</script>

<form>
  <div class="mb-6 flex flex-col">
    <label>Nama Sub Aspek</label>
    <input bind:value={name} class="rounded border border-gray-300 p-1 px-2 text-medium" />
  </div>

  <div class="mb-6 flex flex-col">
    <label>Nilai Sub Aspek</label>
    <input bind:value={value} class="rounded border border-gray-300 p-1 px-2 text-medium" />
  </div>

  <div class="mb-6 flex flex-col">
    <label>Bobot Sub Aspek</label>
    <input bind:value={weight} class="rounded border border-gray-300 p-1 px-2 text-medium" />
  </div>

  <div class="mb-6 flex items-center">
    <input type="radio" bind:value={core} class="rounded border border-gray-300 p-1 px-2 text-medium mr-4" />
    <label><i>Core Factore</i></label>
  </div>
</form>