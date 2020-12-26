<script>
  import { onMount } from "svelte";
  import { flatten } from "lodash";
  import api from "sam/services/axios.js";
  import isEmpty from 'validator/es/lib/isEmpty';

  export let params = {};

  $: id = params.id ? parseInt(params.id) : null;

  let nama = "";
  let callsign = "";
  let gt = 0;
  let tahun = 0;
  let pemilik = "";
  let kriteria = [];

  async function load_data ({ id }) {
    if (!id) return;
    try {
      const url = `/kapal/${id}`;
      const response = await api.get(url);
      const item = response.data;
      nama = item.nama;
      callsign = item.callsign;
      gt = item.gt;
      tahun = item.tahun;
      pemilik = item.pemilik;
    } catch (err) {
      console.log(err);
    }
  }

  async function load_kriterias () {
    try {
      const response = await api.get("/kriteria");
      kriteria = response.data.map(krit => {
        let subs = krit.subs.map(sub => {
          return {
            ...sub,
            bobot: 1
          }
        })
        return {
          ...krit,
          subs
        }
      });
    } catch (err) {
      console.log(err);
      alert("gagal mengambil data kriteria");
    }
  }

  async function load_bobot_kapal () {
    const url = `/kapal/${id}/kriteria`;
    try {
      const response = await api.get(url);
      const kbs = response.data;
      let all_sk = [];
      kriteria.forEach(k => {
        k.subs.forEach(sk => {
          const sub = kbs.find(kb => kb.id_sub == sk.id);
          sk.bobot = sub.bobot;
          all_sk.push(sk);
        })
      });
      kriteria = [...kriteria];
    } catch (err) {
      console.log(err);
      alert("gagal mengambil data bobot kapal");
    }
  }

  async function save_kapal () {
    const bobot = kriteria.map(k => {
      return k.subs.map(s => {
        return {
          id_sub: s.id,
          bobot: s.bobot
        }
      })
    })
    const payload = {
      nama,
      callsign,
      gt,
      tahun,
      pemilik
    }
    try {
      const url = `/kapal/${id}`;
      const response = await api.put(url, payload);
      console.log(response.data);
    } catch (err) {
      console.log(err);
      alert("gagal mengubah data kapal");
    }
  }

  async function save_kriteria () {
    const url = `/kapal/${id}/kriteria`;
    let payload = [];
    kriteria.forEach(k => {
      k.subs.forEach(sk => {
        payload.push({
          id_sub: sk.id,
          bobot: sk.bobot,
          id_kapal: id
        });
      })
    });
    try {
      const response = await api.put(url, payload);
      alert("sukses mengubah bobot kapal");
    } catch (err) {
      console.log(err);
      alert("gagal mengubah bobot kapal");
    }
  }

  async function save () {
    try {
      await save_kapal();
      await save_kriteria();
    } catch (err) {
      console.log(err);
    }
  }

  onMount(async () => {
    try {
      await load_data({ id });
      await load_kriterias();
      await load_bobot_kapal();
    } catch (err) {
      console.log(err);
    }
  })
</script>

<div class="w-3/5">
  <div class="rounded bg-white border border-gray-300">
    <div class="bg-gray-200 py-2 px-6">
      <h1 class="text-2xl text-gray-600 font-semibold">Input Data Kapal</h1>
    </div>
    <form class="p-6">
      <div class="mb-6 flex flex-col">
        <label class="text-gray-600">Nama Kapal</label>
        <input bind:value={nama} class="rounded border border-gray-300 p-1 px-2 text-medium" />
      </div>
      <div class="mb-6 flex flex-col">
        <label class="text-gray-600">Callsign</label>
        <input bind:value={callsign} class="rounded border border-gray-300 p-1 px-2 text-medium" />
      </div>
      <div class="mb-6 flex flex-col">
        <label class="text-gray-600">GT</label>
        <input bind:value={gt} type="number" class="rounded border border-gray-300 p-1 px-2 text-medium" />
      </div>
      <div class="mb-6 flex flex-col">
        <label class="text-gray-600">Tahun</label>
        <input bind:value={tahun} type="number" class="rounded border border-gray-300 p-1 px-2 text-medium" />
      </div>
      <div class="mb-6 flex flex-col">
        <label class="text-gray-600">Pemilik</label>
        <input bind:value={pemilik} class="rounded border border-gray-300 p-1 px-2 text-medium" />
      </div>
    </form>
  </div>
</div>

<div class="w-3/5 mt-12">
  <div class="rounded bg-white border border-gray-300">
    <div class="bg-gray-200 py-2 px-6">
      <h1 class="text-2xl text-gray-600 font-semibold">Input Data Kriteria</h1>
    </div>
    <form class="p-6">
      {#each kriteria as krit (krit.id)}
        <div class="text-lg font-bold mt-6">{krit.nama}</div>
        {#each krit.subs as sub (sub.id)}
        <li class="py-2 px-4 border-b border-gray-300 flex items-center justify-between">
          <div>{sub.nama}</div>
          <select bind:value={sub.bobot} class="appearance-none p-2 font-bold">
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </li>
        {/each}
      {/each}
    </form>
  </div>
</div>

<button 
  class="appearance-none bg-blue-700 text-white p-2 px-4 font-bold text-lg rounded mt-12"
  on:click={save}
>
  simpan
</button>