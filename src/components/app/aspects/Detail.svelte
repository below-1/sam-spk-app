<script>
  import { findById } from "sam/services/aspects.js";
  import { onMount } from "svelte";
  import AspectForm from "./AspectForm.svelte";
  import { title } from "sam/stores/global.js";
  import api from "sam/services/axios.js";

  export let params = {};
  $: id = params.id ? parseInt(params.id) : null;

  let aspect = {};
  $: subs = aspect.subs ? aspect.subs : [];

  async function onDeleteSub (idSub) {
    const url = `/subkriteria/${idSub}`;
    try {
      const response = await api.delete(url);
      console.log(response.data);
      await loadAspect(id);
    } catch (err) {
      console.log(err);
      alert("gagal menghapus data subkriteria");
    }
  }

  async function loadAspect (id) {
    if (!id) {
      throw new Error("INVALID_ID");
    }
    try {
      const response = await api.get(`/kriteria/${id}`);
      aspect = response.data;
    } catch (err) {
      console.log(err);
      alert("gagal memuat data aspek");
    }
  }

  async function saveAspect (payload) {
    const url = `/kriteria/${id}`;
    try {
      const response = await api.put(url, payload);
      console.log(response.data);
      alert("sukses mengubah data kriteria");
    } catch (err) {
      console.log(err);
      alert("gagal mengubah data kriteria");
    } finally {
      loadAspect(id);
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
    <div class="bg-white border border-gray-300 rounded p-4">
      <AspectForm {aspect} on:done={(event) => {
        saveAspect({
          nama: aspect.nama,
          bobot: aspect.bobot
        });
      }} />
    </div>
  </div>

  <div class="flex items-center justify-between mt-10 mb-2">
    <h1 class="text-gray-600 text-xl font-bold">Daftar Sub Aspek</h1>
    <a href={`#/app/sub-aspects/create`} class="bg-green-700 text-white px-4 py-1 rounded">tambah subkriteria</a>
  </div>
  <div class="flex">
    <table class="jo-table flex-grow">
      <thead>
        <th>ID</th>
        <th>Nama</th>
        <th>Nilai Sub Aspek</th>
        <th>Bobot</th>
        <th></th>
      </thead>
      <tbody>
        {#each subs as sub (sub.id)}
          <tr>
            <td>{sub.id}</td>
            <td>{sub.nama}</td>
            <td>{sub.bobot}</td>
            <td><i>{sub.core ? "Core" : "Secondary"} Factor</i></td>
            <td class="flex justify-end">
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