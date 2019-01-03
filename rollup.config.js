const outputFile = 'docs/dist/graph.js';
export default {
    input: 'src/index.js',
    output: {
        file: outputFile,
        format: 'umd',
        name: 'Graph'
    }
};