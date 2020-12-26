<script>
  import Router from 'svelte-spa-router';
  import Landing from "sam/components/Landing.svelte";
  import App from "sam/components/app/index.svelte";
  import Test from "sam/components/Test.svelte";

  const routes = {
    "/": Landing,
    "/app": App,
    "/app/*": App,
    "/test": Test
  };

	export let name;
</script>

<Router {routes}></Router>