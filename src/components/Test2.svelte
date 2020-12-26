<script>
  import { onMount } from "svelte";
  import api from "sam/services/axios.js";

  const gap_mapping = new Map();
  gap_mapping.set(0, 5);
  gap_mapping.set(1, 4.5);
  gap_mapping.set(-1, 4);
  gap_mapping.set(2, 3.5);
  gap_mapping.set(-2, 3);
  gap_mapping.set(3, 2.5);
  gap_mapping.set(-3, 2);
  gap_mapping.set(4, 1.5);
  gap_mapping.set(-4, 1);

  const cores = [
    [true, true, false, false, 
    [true, true, false, false], 
    [true, true, false]
  ];

  const alternatives = [
    [ 
      [2, 4, 5, 4], 
      [5, 2, 4, 5],
      [1, 1, 4]
    ],
    [
      [2, 4, 1, 5],
      [2, 3, 3, 4],
      [3, 4, 1]
    ],
    [
      [1, 2, 1, 3],
      [3, 2, 2, 1],
      [1, 1, 2]
    ],
    [
      [4, 5, 4, 3],
      [3, 1, 5, 2],
      [2, 2, 5]
    ]
  ];

  const targets = [ [5, 4, 4, 3], [5, 4, 3, 3], [4, 3, 3]];

  function run () {
    alternatives.map(alt => {
      const gaps = alt
        .map((xs, i) => xs.map((x, j) => x - targets[i][j]));
      const gaps_transformed = gaps.map(xs => xs.map(x => gap_mapping.get(x)));
      console.log(gaps_transformed);
    })
  }

  onMount(run);
</script>

<div class="bg-gray-100 fixed items-center top-0 right-0 h-16 border-b border-gray-300 flex px-6" style="left: 16rem">
  <div class="font-bold text-gray-700 text-xl">Scratch</div>
  <div class="flex-grow"></div>
</div>