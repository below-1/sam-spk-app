<script>
  import Router from 'svelte-spa-router';
  import Landing from "sam/components/Landing.svelte";
  import App from "sam/components/app/index.svelte";

  const routes = {
    "/": Landing,
    "/app": App,
    "/app/*": App
  };

	export let name;
</script>

<Router {routes}></Router>