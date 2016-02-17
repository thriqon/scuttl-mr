
var rollup = require('rollup').rollup;
var babel = require('rollup-plugin-babel');

rollup({
  entry: 'lib/execute.js',
  plugins: [
    babel({exclude: 'node_modules/**'})
  ]
}).then(function(bundle) {
  return bundle.write({format: 'cjs', dest: 'dist/hoppel.js'})
});
