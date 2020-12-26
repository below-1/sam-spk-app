<script>
  import { onMount, createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let sub = {};
</script>

<form>
  <div class="mb-6 flex flex-col">
    <label>Nama Sub Aspek</label>
    <input bind:value={sub.nama} class="rounded border border-gray-300 p-1 px-2 text-medium" />
  </div>

  <div class="mb-6 flex flex-col">
    <label>Nilai Sub Aspek</label>
    <input bind:value={sub.bobot} class="rounded border border-gray-300 p-1 px-2 text-medium" />
  </div>


  <div class="mb-6 flex items-center">
    <input type="checkbox" bind:checked={sub.core} class="rounded border border-gray-300 p-1 px-2 text-medium mr-4" />
    <label><i>Core Factore</i></label>
  </div>

  <button
    type="button"
    on:click={() => {
      dispatch("done", {
        nama: sub.nama,
        bobot: sub.bobot,
        core: sub.core
      })
    }}
    class="appearance-none rounded bg-blue-800 text-white px-3 py-1 font-bold text-lg"
  >
    simpan
  </button>
</form>