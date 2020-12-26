<script>
  import Layout from "./commons/Layout.svelte";
  import Router from "svelte-spa-router";
  import AspectList from "./aspects/List.svelte";
  import AspectDetail from "./aspects/Detail.svelte";
  import AspectEditSub from "./aspects/EditSub.svelte";
  import AspectAddSub from "./aspects/AddSub.svelte";
  import AspectCreate from "./aspects/Create.svelte";
  import Scratch from "./data/Scratch.svelte";
  import DataCreate from "./data/Create.svelte";
  import DataEdit from "./data/Edit.svelte";
  import DataList from "./data/List.svelte";
  import PM from "./PM.svelte";
  
  const routes = {
    "/scratch": Scratch,
    "/aspects": AspectList,
    "/aspects/create": AspectCreate,
    "/aspects/:id": AspectDetail,
    "/sub-aspects/create": AspectAddSub,
    "/sub-aspects/:id": AspectEditSub,
    "/data": DataList,
    "/pm": PM,
    "/data/create": DataCreate,
    "/data/:id": DataEdit
  }
</script>

<Layout>
  <div slot="content">
    <Router {routes} prefix="/app"></Router>
  </div>
</Layout>