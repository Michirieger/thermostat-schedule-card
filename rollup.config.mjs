import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

const dev = process.env.ROLLUP_WATCH;

export default {
  input: 'src/thermostat-schedule-card.js',
  output: {
    file: 'thermostat-schedule-card.js',
    format: 'es',
    sourcemap: dev ? true : false,
  },
  plugins: [
    resolve(),
    !dev &&
      terser({
        format: { comments: false },
        compress: { drop_console: false },
      }),
  ].filter(Boolean),
  // Externalize lit to use HA's bundled version at runtime
  // (comment out if you want a fully self-contained bundle)
  // external: ['lit'],
};
