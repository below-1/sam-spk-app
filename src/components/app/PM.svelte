<script>
  import { onMount } from "svelte";
  import { range } from "lodash";
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
    [true, true, false, false],
    [true, true, false, false], 
    [true, true, false]
  ];

  const weights = [ 0.4, 0.35, 0.25 ];

  let items = [];
  let kriteria = [];
  let bobots = [];
  let done = false;

  async function load_data () {
    try {
      const resp_kapal = await api.get("/kapal");
      items = resp_kapal.data;
    } catch (err) {
      console.log(err);
      alert("gagal mengambil data kapal");
    }
  }

  async function load_kriterias () {
    try {
      const response = await api.get("/kriteria");
      kriteria = response.data.map(krit => {
        let subs = krit.subs.map(sub => {
          return {
            ...sub
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
    try {
      const urls = items.map(it => `/kapal/${it.id}/kriteria`);
      const proms = urls.map(async url => {
        const response = await api.get(url);
        const kbs = response.data;
        return kriteria.map(k => {
          return k.subs.map(sk => {
            const sub = kbs.find(kb => kb.id_sub == sk.id);
            return {
              ...sk,
              bobot: sub.bobot
            };
          })
        });
      })
      bobots = await Promise.all(proms);
      // console.log(bobots);
      run_pm();
    } catch (err) {
      console.log(err);
      alert("gagal mengambil data bobot kapal");
    }
  }

  function run_pm () {
    done = false;
    const N_KRIT = kriteria.length;
    const N_ALT = bobots.length;
    const weights = kriteria.map(k => k.bobot / 100);

    const cores = kriteria.map(k => {
      return k.subs.map(sk => sk.core);
    });

    const targets = kriteria.map(k => {
      return k.subs.map(sub => {
        return sub.bobot;
      })
    })

    const gps = bobots.map((alt, i) => {
      const gaps = alt.map((krits, j) => {
        return krits.map((sub, k) => {
          return sub.bobot - targets[j][k];  
        });
      })
      const gaps_transformed = gaps.map(gs => {
        return gs.map(g => gap_mapping.get(g));
      })
      return gaps_transformed;
    })

    console.log("gaps");
    console.log(gps);

    const sf_cf = range(N_KRIT).map(i => {
      const nc = cores[i].filter(c => c).length;
      const ns = cores[i].filter(c => !c).length;
      return gps.map(xs => {
        const cf = xs[i]
          .filter((x, j) => cores[i][j])
          .reduce((a, b) => a + b) / nc;
        const sf = xs[i]
          .filter((x, j) => !cores[i][j])
          .reduce((a, b) => a + b, 0) / ns;
        return (0.6 * cf) +(0.4 * sf);
      });
    });

    const results = range(N_ALT).map(i => 
      range(N_KRIT).map(j => sf_cf[j][i] * weights[j])
        .reduce((a, b) => a + b, 0));

    items = items.map((it, i) => {
      return {
        ...it,
        v: results[i]
      }
    })
    items.sort((a, b) => {
      if (a.v < b.v) return 1;
      if (a.v == b.v) return 0;
      if (a.v > b.v) return -1;
    });
    items = [...items];
    done = true;
  }

  onMount(async () => {
    console.log("here");
    try {
      await load_data();
      await load_kriterias();
      await load_bobot_kapal();
    } catch (err) {
      console.log(err);
    }
  })
</script>

<div class="bg-white rounded items-center h-16 p-4 border border-gray-300 flex">
  <div class="font-bold text-gray-700 text-xl">Hasil Perangkingan</div>
  <div class="flex-grow"></div>
  <nav>
    <button on:click={run_pm} class="appearance-none bg-green-600 text-white p-2 rounded">Ulangi</button>
  </nav>
</div>

{#if done}
<table class="jo-table w-full bg-white mt-8">
  <thead>
    <th>id</th>
    <th>Nama</th>
    <th>Callsign</th>
    <th>GT</th>
    <th>Tahun</th>
    <th>Pemilik</th>
    <th>Nilai</th>
  </thead>
  <tbody>
    {#each items as item (item.id)}
      <tr class="text-base">
        <td>{item.id}</td>
        <td>{item.nama}</td>
        <td>{item.callsign}</td>
        <td>{item.gt}</td>
        <td>{item.tahun}</td>
        <td>{item.pemilik}</td>
        <td>{item.v.toFixed(3)}</td>
      </tr>
    {/each}
  </tbody>
</table>
{:else}
<div class="bg-white rounded items-center h-16 p-4 border border-gray-300 flex mt-12">
  <div class="font-bold text-gray-700 text-xl">Loading...</div>
</div>
{/if}