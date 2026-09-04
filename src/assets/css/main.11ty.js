const fs = require('fs');
const path = require('path');
const postcss = require('postcss');

module.exports = class {
  data() {
    return {
      permalink: '/assets/css/main.css',
      eleventyExcludeFromCollections: true,
    };
  }

  async render() {
    const src = fs.readFileSync(path.join(__dirname, 'main.css'), 'utf8');
    const result = await postcss([require('@tailwindcss/postcss')]).process(src, {
      from: path.join(__dirname, 'main.css'),
    });
    return result.css;
  }
};
