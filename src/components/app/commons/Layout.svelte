<script>
  import Ship from "sam/icons/boat.svg";
  import { title } from "sam/stores/global.js";
  import FaArchive from 'svelte-icons/fa/FaArchive.svelte'
  import FaTable from 'svelte-icons/fa/FaTable.svelte'
  import FaPlay from 'svelte-icons/fa/FaPlay.svelte'
  import FaTachometerAlt from 'svelte-icons/fa/FaTachometerAlt.svelte'

  const menus = [
    { path: "/app/aspects", text: "kriteria", icon: FaArchive },
    { path: "/app/data", text: "data", icon: FaTable  },
    { path: "/app/pm", text: "penentuan", icon: FaPlay },
    { path: "/app/testing", text: "testing", icon: FaTachometerAlt }
  ];
</script>

<div class="fixed left-0 bottom-0 top-0 w-64 flex flex-col bg-gray-900 text-white">
  <div class="h-16 px-8 flex items-center bg-blue-900">
    <div class="bg-gray-900 rounded-full h-10 w-10 p-1 mr-4">
      <img src={Ship}/>
    </div>
    <div class="text-xl font-bold">SPK</div>
  </div>

  <ul class="flex flex-col">
    {#each menus as menu (menu.path)}
      <li class="px-8 h-20 flex items-center text-lg font-bold">
        <div class="w-6 h-6 text-gray-100 mr-4">
          <svelte:component this={menu.icon} />
        </div>
        <a href={'/#' + menu.path}>{menu.text}</a>
      </li>
    {/each}
  </ul>
</div>

<nav class="h-16 px-12 fixed top-0 right-0 flex items-center bg-blue-800" style="left: 16rem;">
  <div>
    <div class="text-gray-100 font-bold text-lg">sistem pendukung keputusan</div>
    <div class="text-gray-200 font-medium text-xs">metode profile matching</div>
  </div>
</nav>

<div class="ml-64 bg-gray-200 px-12 py-6 mt-16" style="min-height: calc(100vh - 4rem);">
  <slot name="content"></slot>
</div>