<script>
  import { onMount } from "svelte";
  import api from "sam/services/axios.js";
  import { range } from "lodash";

  const N_KRIT = 3;
  const N_ALT = 4;

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
    [true, true, false, false],
    [true, true, false, false], 
    [true, true, false]
  ];
  const weights = [ 0.4, 0.35, 0.25 ];

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
    const gps = alternatives.map(alt => {
      const gaps = alt
        .map((xs, i) => xs.map((x, j) => x - targets[i][j]));
      const gaps_transformed = gaps.map(xs => xs.map(x => gap_mapping.get(x)));
      return gaps_transformed;
    });
    const sf_cf = range(N_KRIT).map(i => {
      const nc = cores[i].filter(c => c).length;
      const ns = cores[i].filter(c => !c).length;

      // console.log(`nc = ${nc}`);
      // console.log(`ns = ${ns}`);

      return gps.map(xs => {
        const cf = xs[i]
          .filter((x, j) => cores[i][j])
          .reduce((a, b) => a + b) / nc;
        const sf = xs[i]
          .filter((x, j) => !cores[i][j])
          .reduce((a, b) => a + b, 0) / ns;
        return (0.6 * cf) +(0.4 * sf);
      })
    })

    const results = range(N_ALT).map(i => 
        range(N_KRIT)
          .map(j => sf_cf[j][i] * weights[j])
          .reduce((a, b) => a + b, 0))

    console.log(results);
  }

  onMount(run);
</script>

<div class="bg-gray-100 fixed items-center top-0 right-0 h-16 border-b border-gray-300 flex px-6" style="left: 16rem">
  <div class="font-bold text-gray-700 text-xl">Scratch</div>
  <div class="flex-grow"></div>
</div>