<script>
  import { findById } from "sam/services/aspects.js";
  import { onMount } from "svelte";
  import AspectForm from "./AspectForm.svelte";
  import { title } from "sam/stores/global.js";

  export let params = {};
  $: id = params.id ? parseInt(params.id) : null;

  let aspect = {};
  $: subs = aspect.subs ? aspect.subs : [];

  async function onDeleteSub (idSub) {

  }

  async function loadAspect (id) {
    if (!id) {
      throw new Error("INVALID_ID");
    }
    try {
      aspect = await findById(id);
    } catch (err) {
      console.log(err);
      alert("gagal memuat data aspek");
    }
  }

  onMount(async () => {
    const id = params.id ? parseInt(params.id) : null;
    loadAspect(id);
    title.set("Detail Aspek");
  });
</script>

<div>
  <h1 class="text-gray-600 text-2xl font-bold mb-2">Edit Data Aspek</h1>
  <div class="w-3/5">
    <div class="border border-gray-300 rounded p-4">
      <AspectForm {aspect} />
    </div>
  </div>

  <h1 class="text-gray-600 text-xl font-bold mt-10 mb-2">Daftar Sub Aspek</h1>
  <div class="flex">
    <table class="jo-table flex-grow">
      <thead>
        <th>Nama</th>
        <th>Nilai Sub Aspek</th>
        <th>Bobot</th>
        <th>Keterangan</th>
        <th>

        </th>
      </thead>
      <tbody>
        {#each subs as sub (sub.id)}
          <tr>
            <td>{sub.name}</td>
            <td>{sub.value}</td>
            <td>{(sub.weight * 100).toFixed(2)} %</td>
            <td><i>{sub.core ? "Core" : "Secondary"} Factor</i></td>
            <td>
              <a 
                href={`/#/app/sub-aspects/${sub.id}`}
                class="appearance-none px-2 py-1 text-sm font-bold bg-indigo-600 text-white mr-2 rounded"
              >edit
              </a>
              <button 
                class="appearance-none px-2 py-1 text-sm font-bold bg-red-600 text-white rounded"
                on:click={() => {
                  onDeleteSub(sub.id)
                }}
              >hapus</button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>