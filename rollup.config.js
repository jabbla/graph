import minify from 'rollup-plugin-babel-minify';

const env = process.env.NODE_ENV;
const outputFile = env === 'dev'? 'docs/dist/graph.js':'dist/graph.min.js';
const devPlugins = [];
const prodPlugins = [minify({
    comments: false,
    sourceMap: true,
    banner: undefined,
    bannerNewLine: false
})];
const plugins = env === 'dev'? devPlugins : prodPlugins;
export default {
    input: 'src/index.js',
    output: {
        file: outputFile,
        format: 'cjs'
    },
    plugins
};