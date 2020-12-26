<script>
  import { onMount, createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let aspect = {};

  let name = "";
  let bobot = 0;
</script>

<form>
  <div class="mb-6 flex flex-col">
    <label class="text-gray-600">Nama Aspek</label>
    <input bind:value={aspect.nama} class="rounded border border-gray-300 p-1 px-2 text-medium" />
  </div>
  <div class="mb-6 flex flex-col">
    <label class="text-gray-600">Bobot</label>
    <input 
      type="number" 
      min=1
      max=100
      step=1
      bind:value={aspect.bobot} class="rounded border border-gray-300 p-1 px-2 text-medium" />
  </div>

  <button 
    type="button"
    on:click={() => {
      dispatch("done", aspect);
    }}
    class="appearance-none rounded shadow-lg bg-blue-600 text-white px-4 py-1 text-lg"
  >simpan</button>
</form>