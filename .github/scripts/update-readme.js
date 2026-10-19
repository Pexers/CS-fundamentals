const fs = require('node:fs')
const path = require('node:path')

const root = process.env.GITHUB_WORKSPACE || path.resolve(__dirname, '../..')
const readmePath = path.join(root, 'README.md')
const startMarker = '<!-- toc:start -->'
const endMarker = '<!-- toc:end -->'
const ignoredNames = new Set(['LICENSE', 'README.md'])

function escapeMarkdown(value) {
  return value.replace(/[\\`*_[\]<>]/g, '\\$&')
}

function encodeSegment(value) {
  return encodeURIComponent(value).replace(/[!'()*]/g, character =>
    `%${character.charCodeAt(0).toString(16).toUpperCase()}`)
}

function buildIndex(directory = root, level = 0) {
  const entries = fs.readdirSync(directory, { withFileTypes: true })
    .filter(entry => !entry.name.startsWith('.') && !ignoredNames.has(entry.name))
    .sort((left, right) => left.name < right.name ? -1 : left.name > right.name ? 1 : 0)
  const lines = []

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name)
    const indentation = '\t'.repeat(level)

    if (entry.isDirectory()) {
      const children = buildIndex(entryPath, level + 1)
      if (children.length === 0) continue
      const name = escapeMarkdown(entry.name)
      lines.push(`${indentation}${level === 0 ? `- ### ${name}` : `- _/${name}_`}`, ...children)
    } else if (entry.isFile()) {
      const name = escapeMarkdown(path.parse(entry.name).name)
      const url = '/' + path.relative(root, entryPath).split(path.sep).map(encodeSegment).join('/')
      lines.push(`${indentation}- [**${name}**](${url})`)
    }
  }

  return lines
}

const contents = fs.readFileSync(readmePath, 'utf8')
const start = contents.indexOf(startMarker)
const end = contents.indexOf(endMarker)

if (start === -1 || end < start ||
    contents.indexOf(startMarker, start + startMarker.length) !== -1 ||
    contents.indexOf(endMarker, end + endMarker.length) !== -1) {
  throw new Error('README.md must contain exactly one ordered pair of toc:start and toc:end markers')
}

const newline = contents.includes('\r\n') ? '\r\n' : '\n'
const generated = [startMarker, ...buildIndex(), endMarker].join(newline)
const updated = contents.slice(0, start) + generated + contents.slice(end + endMarker.length)

if (updated !== contents) {
  fs.writeFileSync(readmePath, updated)
  console.log('README.md updated')
} else {
  console.log('README.md already up to date')
}