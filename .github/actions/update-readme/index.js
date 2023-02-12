const fs = require('fs')
const path = require('path')

const indexToIgnore = ['.git', '.github', 'LICENSE', 'README.md']
const indexQueue = []

readDirectory(process.env.REPO_WORKSPACE)
console.log(indexQueue)

function readDirectory(directoryPath) {
  fs.readdirSync(directoryPath).forEach(file => {
    const filePath = path.join(directoryPath, file)
    const stat = fs.statSync(filePath)
    if (!indexToIgnore.includes(file)) {
      if (stat.isDirectory()) {
        addToIndexQueue(file, true)
        readDirectory(filePath)  // Recursive call
      }
      else { addToIndexQueue(file, false) }
    }
  })
}


/*
// Replace current README.md for a new one
fs.writeFileSync('README.md', '# Dummy\nDummy repo for testing purposes', function (err) {
  if (err) throw err;
  console.log('Saved!');
});
*/

function addToIndexQueue(name, isDirectory) { indexQueue.push({ name, isDirectory }) }
