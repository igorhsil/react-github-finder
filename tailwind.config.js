module.exports = {
    purge: [ './src/**/*.{js,jsx,ts,tsx}' ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    daisyui: {
        styled: true,
        themes: [ 'dark', ]
    },
    plugins: [ require( 'daisyui' ) ],
};
