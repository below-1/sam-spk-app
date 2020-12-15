<script>
  import Ship from "sam/icons/boat.svg";
  import { title } from "sam/stores/global.js";

  const menus = [
    { path: "/app/aspects", text: "aspek" },
    { path: "/app/data", text: "data" },
    { path: "/app/decision", text: "penentuan" },
    { path: "/app/testing", text: "testing" }
  ];
</script>

<div class="bg-gray-100 fixed items-center top-0 right-0 h-16 border-b border-gray-300 flex px-6" style="left: 16rem">
  <div class="font-bold text-gray-700 text-xl">{$title}</div>
  <div class="flex-grow"></div>  
</div>

<div class="fixed left-0 bottom-0 top-0 border-r border-gray-300 w-64 flex flex-col bg-indigo-900 text-white">
  <div class="h-16 px-4 flex items-center border-b border-indigo-800">
    <div class="bg-gray-900 rounded-full h-10 w-10 p-1 mr-4">
      <img src={Ship}/>
    </div>
    <div class="text-xl font-bold">SPK</div>
  </div>

  <ul class="flex flex-col">
    {#each menus as menu (menu.path)}
      <li class="px-4 h-12 flex items-center text-lg font-bold">
        <a href={'/#' + menu.path}>{menu.text}</a>
      </li>
    {/each}
  </ul>
</div>

<div class="ml-64 mt-16 p-6">
  <slot name="content"></slot>
</div>