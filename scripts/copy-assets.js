var fs = require('fs');
var path = require('path');

const copyList = [{ from: './scripts/postinstall.js', to: './lib/scripts' }];

for (const copyThis of copyList) {
  copyRecursive(copyThis.from, copyThis.to);
}

console.log('Asset files successfully copied!');

function copyRecursive(source, target) {
  if (fs.lstatSync(source).isDirectory()) {
    const folderContent = readdirSync(source).map((name) => join(source, name));
    for (const subFolder of folderContent.filter(isDirectory)) {
      fs.mkdirSync(path.join(target, subFolder), { recursive: true });
      copyRecursive(subFolder, path.join(target, subFolder));
    }
    for (const file of folderContent.filter(!isDirectory)) {
      fs.copyFileSync(file, target);
    }
  } else {
    const targetFileName = path.join(target, path.basename(source));
    fs.mkdirSync(target, { recursive: true });
    fs.copyFileSync(source, targetFileName);
  }
}
