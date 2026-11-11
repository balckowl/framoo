import { appendFile, readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const headersPath = fileURLToPath(new URL('../dist/_headers', import.meta.url))
const headers = await readFile(headersPath, 'utf8')

if (!headers.includes('X-Robots-Tag: noindex')) {
  const separator = headers.endsWith('\n') ? '' : '\n'
  await appendFile(
    headersPath,
    `${separator}\n/*\n  X-Robots-Tag: noindex\n`,
    'utf8',
  )
}
