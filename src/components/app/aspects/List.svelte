<script>
  import { onMount } from "svelte";
  import { title } from "sam/stores/global.js";
  import { list as getAspects } from "sam/services/aspects.js";

  let items = [];

  async function onDelete (id) {

  }

  async function loadAspects() {
    try {
      items = await getAspects();
    } catch (err) {
      console.log(err);
      alert("Gagal mengambil data aspek");
    }
  }

  onMount(async () => {
    title.set("Daftar Aspek");
    await loadAspects();
  });
</script>

<div class="flex flex-col">
  <table class="jo-table">
    <thead>
      <th></th>
      <th>Nama</th>
      <th>Bobot</th>
      <th>Sub Aspek</th>
      <th></th>
    </thead>
    <tbody>
      {#each items as item (item.id)}
        <tr class="text-base">
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{(item.weight * 100).toFixed(2)} %</td>
          <td>{item.subs.length}</td>
          <td class="flex items-center justify-end">
            <a 
              href={`/#/app/aspects/${item.id}`}
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
</div>

