<script>
  import { title } from "sam/stores/global.js";
  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";
  import AspectForm from "./AspectForm.svelte";
  import api from "sam/services/axios.js";

  let aspect = {};

  async function save (payload) {
    try {
      const response = await api.post("/kriteria", payload);
      console.log(response.data);
      push("/app/aspects");
    } catch (err) {
      console.log(err);
      alert("gagal menambah data aspek");
    }
  }

  onMount(async () => {
    title.set("Tambah Data Aspek");
  });
</script>

<div class="bg-gray-100 fixed items-center top-0 right-0 h-16 border-b border-gray-300 flex px-6" style="left: 16rem">
  <div class="font-bold text-gray-700 text-xl">Tambah Data Aspek</div>
  <div class="flex-grow"></div>
</div>

<div class="w-3/5">
  <h1 class="text-2xl text-gray-600 font-semibold">Input Data Aspek</h1>
  <AspectForm 
    {aspect} 
    on:done={({ detail }) => {
      save(detail);
      console.log("done input data aspek");
      console.log(detail);
    }}
  />
</div>