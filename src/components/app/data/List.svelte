<script>
  import { onMount } from "svelte";
  import api from "sam/services/axios.js";

  let items = [];

  async function onDelete (id) {
  }

  async function loadData () {
    try {
      const response = await api.get("/kapal");
      items = response.data;
    } catch (err) {
      console.log(err);
    }
  }

  onMount(async () => {
    await loadData();
  })
</script>

<div class="bg-white rounded items-center h-16 p-4 border border-gray-300 flex">
  <div class="font-bold text-gray-700 text-xl">Data Kapal</div>
  <div class="flex-grow"></div>
  <nav>
    <a href="#/app/aspects/create" class="appearance-none bg-green-600 text-white p-2 rounded">Tambah Aspek</a>
  </nav>
</div>

<table class="jo-table w-full bg-white mt-8">
  <thead>
    <th>id</th>
    <th>Nama</th>
    <th>Callsign</th>
    <th>GT</th>
    <th>Tahun</th>
    <th>Pemilik</th>
    <th></th>
  </thead>
  <tbody>
    {#each items as item (item.id)}
      <tr class="text-base">
        <td>{item.id}</td>
        <td>{item.nama}</td>
        <td>{item.callsign}</td>
        <td>{item.gt}</td>
        <td>{item.tahun}</td>
        <td>{item.pemilik}</td>
        <td class="flex items-center justify-end">
          <a 
            href={`/#/app/data/${item.id}`}
            class="appearance-none px-2 py-1 text-sm font-bold bg-indigo-600 text-white mr-2 rounded"
          >edit
          </a>
          <button 
            class="appearance-none px-2 py-1 text-sm font-bold bg-red-600 text-white rounded"
            on:click={() => {
              onDelete(item.id)
            }}
          >hapus</button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
