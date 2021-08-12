/**
 * Determine the pulumi stack name for the current GitHub build.
 *
 * The name of the stack will be printed to STDOUT.
 */

/* eslint-disable no-console */

const { getGitHubEvent } = require('./github')
const { getStackName } = require('./stack-config')

async function main() {
  const event = await getGitHubEvent()
  try {
    const stack = await getStackName(event)
    if (!stack?.stack) throw new Error('Could not determine Pulumi stack name.')
    console.log(stack.stack)
  } catch (error) {
    console.error(error)
    console.error(JSON.stringify(event, null, 2))
    process.exitCode = 1
  }
}

main().catch(error => {
  process.exitCode = 1
  console.error(error)
})
