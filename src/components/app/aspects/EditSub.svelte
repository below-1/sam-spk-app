<script>
  import { title } from "sam/stores/global.js";
  import { onMount } from "svelte";
  import SubAspectForm from "./SubAspectForm.svelte";
  import { findSubAspectById } from "sam/services/aspects.js";

  export let params = {};
  let sub = {};

  onMount(async () => {
    title.set("Edit Sub Aspek");
    const id = parseInt(params.id);
    sub = await findSubAspectById(id);
  });
</script>

<div class="w-3/5 mx-auto">
  <h1 class="text-2xl text-gray-600 font-semibold">Input Data Sub Aspek</h1>
  <SubAspectForm {sub} />
  <button class="appearance-none rounded shadow-lg bg-blue-600 text-white px-4 py-1 text-lg">simpan</button>
</div>