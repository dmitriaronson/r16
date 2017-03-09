const fs = require('fs');
const path = require('path');
const slug = require('slug');
const filenames = fs.readdirSync('src/samples').filter(f => f.includes('.wav'));

console.log(`Found ${filenames.length} samples`);

const content = `
  export default [${filenames.map((filename, i) => {
    const name = filename.replace('.wav', '');
    const slugName = `${slug(name.trim().toLowerCase())}.wav`;

    fs.renameSync(`./src/samples/${filename}`, `./src/samples/${slugName}`);

    console.log(`Import #${i += 1}: ${filename} => ${slugName}`);

    return `"${slugName}"`;
  })}]
`;

fs.writeFile('src/samples/index.ts', content, (e) => {
  if (e) {
    console.error(e);
  }
});