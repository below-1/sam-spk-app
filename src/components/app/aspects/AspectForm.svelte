<script>
  export let aspect = {};
</script>

<form>
  <div class="mb-6 flex flex-col">
    <label class="text-gray-600">Nama Aspek</label>
    <input bind:value={aspect.name} class="rounded border border-gray-300 p-1 px-2 text-medium" />
  </div>
  <div class="mb-6 flex flex-col">
    <label class="text-gray-600">Bobot</label>
    <input type="number" bind:value={aspect.weight} class="rounded border border-gray-300 p-1 px-2 text-medium" />
  </div>

  <button class="appearance-none rounded shadow-lg bg-blue-600 text-white px-4 py-1 text-lg">simpan</button>
</form>