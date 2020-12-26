<script>
  import { title } from "sam/stores/global.js";
  import { pop as popRoute } from "svelte-spa-router";
  import { onMount } from "svelte";
  import api from "sam/services/axios.js";

  export let params = {};
  let optionsKriteria = [];
  let id_kriteria = null;
  let sub = {
    nama: "",
    bobot: 0,
    core: 0
  };

  async function loadAllKriteria () {
    const url = `/kriteria`;
    try {
      const response = await api.get(url);
      optionsKriteria = response.data.map(it => {
        return {
          text: it.nama,
          value: it.id
        };
      });
      id_kriteria = optionsKriteria[0].value;
    } catch (err) {
      console.log(err);
      alert("gagal memuat data kriteria");
    }
  }

  async function save (payload) {
    const url = `/subkriteria`;
    try {
      const response = await api.post(url, payload);
      console.log(response.data);
      popRoute();
    } catch (err) {
      console.log(err);
      alert("gagal menyimpan data subkriteria");
    }
  }

  onMount(async () => {
    await loadAllKriteria();
  });
</script>

<div class="bg-gray-100 fixed items-center top-0 right-0 h-16 border-b border-gray-300 flex px-6" style="left: 16rem">
  <div class="font-bold text-gray-700 text-xl">Tambah Data Sub Aspek</div>
  <div class="flex-grow"></div>
</div>

<div class="w-3/5 mx-auto">
  <h1 class="text-2xl text-gray-600 font-semibold mb-8">Input Data Sub Aspek</h1>
  <form>

    <div class="mb-6 flex flex-col">
      <label>Pilih Kriteria</label>
      <select bind:value={id_kriteria} class="rounded border border-gray-300 px-3 py-1">
        {#each optionsKriteria as opt (opt.value)}
          <option value={opt.value}>{opt.text}</option>
        {/each}
      </select>
    </div>

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
        save({
          id_kriteria,
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
</div>