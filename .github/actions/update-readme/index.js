const fs = require('fs')
const path = require('path')

const root = process.env.REPO_WORKSPACE
const readMeFilePath = path.join(root, 'README.md')
const indexToIgnore = ['.git', '.github', '.gitkeep', 'LICENSE', 'README.md']
const indexQueue = []

readDirectory(root, 0)

const splitter = '## Table of Contents'
const index = `${splitter}\n${buildIndex(indexQueue)}`
const readMeContents = fs.readFileSync(readMeFilePath, { encoding: 'utf8' }).split(splitter)[0]
// Replace current README.md for a new one
fs.writeFileSync(readMeFilePath, readMeContents + index, function (err) {
  if (err) throw err
  console.log('Saved!')
})

function buildIndex(queue) {
  return queue.map(file => {
    if (file.isDirectory) {
      str = file.level > 0 ? `- /${file.name}\n` : `- ${file.name}\n`
    }
    else {
      str = `- [**${file.name.split('.')[0]}**](${file.path})\n`  // Remove file extension
    }
    return file.level == 0 ? str : '\t'.repeat(file.level) + str  // Add tabs 
  }).join('')
}

function readDirectory(directoryPath, level) {
  fs.readdirSync(directoryPath).forEach(file => {
    const filePath = path.join(directoryPath, file)
    const stat = fs.statSync(filePath)
    if (!indexToIgnore.includes(file)) {
      if (stat.isDirectory()) {
        addToIndexQueue(file, true, level, filePath)
        readDirectory(filePath, level + 1)  // Recursive call
      }
      else { addToIndexQueue(file, false, level, filePath) }
    }
  })
}

function addToIndexQueue(name, isDirectory, level, path) {
  indexQueue.push({ name, isDirectory, level, path: path.split(root)[1].replaceAll(' ', '%20') })  // Remove root part from path
}
