import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '404.html',
      precompress: false,
      strict: true
    }),

    paths: {
      base: process.env.NODE_ENV === 'production' ? '/opmr0.github.com' : ''
    },

    prerender: {
      handleHttpError: ({ path, message }) => {
        if (path.includes('favicon')) return;
        throw new Error(message);
      }
    }
  }
};

export default config;