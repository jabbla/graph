const rollup = require('rollup');
const minify = require('rollup-plugin-babel-minify');

const inputOptions = [
    {
        input: 'src/index.js',
    },
    {
        input: 'src/index.js',
        plugins: [minify({
            comments: false,
            sourceMap: true,
            banner: undefined,
            bannerNewLine: false
        })]
    }
];

const outputOptions = [
    {
        file: 'docs/dist/graph.js',
        format: 'umd',
        name: 'Graph'
    },
    {
        file: 'dist/graph.js',
        format: 'umd',
        name: 'Graph'
    },
    {
        file: 'dist/graph.min.js',
        format: 'umd',
        name: 'Graph'
    }
]

async function build() {
    const bundle = await rollup.rollup(inputOptions[0]);
    await bundle.generate(outputOptions[0]);
    await bundle.write(outputOptions[0]);

    await bundle.generate(outputOptions[1]);
    await bundle.write(outputOptions[1]);


    const bundleMin = await rollup.rollup(inputOptions[1]);
    await bundleMin.generate(outputOptions[2]);
    await bundleMin.write(outputOptions[2]);
}

build();