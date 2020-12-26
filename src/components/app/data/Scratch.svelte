<script>
  import { onMount } from "svelte";
  import api from "sam/services/axios.js";

  const gap_lookups = [
    [0, 5],
    [1, 4.5],
    [-1, 4],
    [2, 3.5],
    [-2, 3],
    [3, 2.5],
    [-3, 2],
    [4, 1.5],
    [-4, 1]
  ];

  function almost_equal (x, y) {
    return Math.abs(x - y) < 0.01;
  }

  function gap_mapping (g) {
    for (let pair of gap_lookups) {
      let [ _g, val ] = pair;
      if (almost_equal(g, _g)) return val;
    }
    throw new Error(`can't find value for gap = ${g}`);
  }

  const alternatives = [
    [ 
      2, 4, 5, 4, 
      5, 2, 4, 5,
      1, 1, 4
    ],
    [
      2, 4, 1, 5,
      2, 3, 3, 4,
      3, 4, 1
    ],
    [
      1, 2, 1, 3,
      3, 2, 2, 1,
      1, 1, 2
    ],
    [
      4, 5, 4, 3,
      3, 1, 5, 2,
      2, 2, 5
    ]
  ];

  const targets = [ 5, 4, 4, 3, 5, 4, 3, 3, 4, 3, 3];

  function run () {
    alternatives.map(alt => {
      const gaps = alt.map((x, j) => x - targets[j]);
      const mapped_gaps = gaps.map(x => gap_mapping(x));
      console.log(mapped_gaps);
    })
  }

  onMount(run);
</script>

<div class="bg-gray-100 fixed items-center top-0 right-0 h-16 border-b border-gray-300 flex px-6" style="left: 16rem">
  <div class="font-bold text-gray-700 text-xl">Scratch</div>
  <div class="flex-grow"></div>
</div>