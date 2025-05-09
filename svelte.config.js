import sveltePreprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';


/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: sveltePreprocess({
    postcss: true
  }),
  kit: {

	adapter: adapter({
		fallback: '404.html'
	}),

    paths: {
      base: 'Cameron-Showcase/todo-tracker', // important for GitHub Pages
    }
  }
};

export default config;