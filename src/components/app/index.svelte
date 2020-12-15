<script>
  import Layout from "./commons/Layout.svelte";
  import Router from "svelte-spa-router";
  import AspectList from "./aspects/List.svelte";
  import AspectDetail from "./aspects/Detail.svelte";
  import AspectEditSub from "./aspects/EditSub.svelte";
  
  const routes = {
    "/aspects": AspectList,
    "/aspects/:id": AspectDetail,
    "/sub-aspects/:id": AspectEditSub
  }
</script>

<Layout>
  <div slot="content">
    <Router {routes} prefix="/app"></Router>
  </div>
</Layout>