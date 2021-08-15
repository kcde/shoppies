module.exports = {
  purge: ['./src/**/*.{js}'],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: { backgroundColor: ['active'] },
  },
  plugins: [],
};
