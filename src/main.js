import App from './App.svelte';
import "sam/styles/main.css";

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;