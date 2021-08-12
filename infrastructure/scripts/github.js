const fs = require('fs')
const { promisify } = require('util')

const readFile = promisify(fs.readFile)

function env(key) {
  const value = process.env[key]
  if (value === undefined) {
    throw new Error(`Missing environment variable: ${key}`)
  }
  return value
}

async function getGitHubEvent() {
  const eventData = await readFile(env('GITHUB_EVENT_PATH'), 'utf8')
  return JSON.parse(eventData)
}

module.exports = { getGitHubEvent }
