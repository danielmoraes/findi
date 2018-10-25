#!/usr/bin/env node

const fs = require('fs')
const gm = require('gm').subClass({ imageMagick: true })
const path = require('path')
const program = require('commander')
const Promise = require('bluebird')
const recursive = require('recursive-readdir')

const diff = (a, b) => new Promise((resolve, reject) => {
  const options = { file: '/dev/null', metric: 'MAE' }
  gm().compare(a, b, options, (err, isEqual, equality) => {
    if (err) { reject(err) }
    return resolve(equality)
  })
})

const findMatch = async (imagePath, searchPaths) => {
  try {
    let images = []
    for (let i = 0; i < searchPaths.length; i++) {
      images = images.concat(await recursive(searchPaths[i]))
    }
    const diffs =
      await Promise.map(images, i => diff(imagePath, i), { concurrency: 10 })
    const bestMatch = diffs.reduce((b, v, i, a) => v < a[b] ? i : b, 0)
    return { path: images[bestMatch], diff: diffs[bestMatch] }
  } catch (e) {
    return e.message
  }
}

const renameMatch = async (imagePath, searchPaths) => {
  try {
    const bestMatch = await findMatch(imagePath, searchPaths)
    const duplicatePath = bestMatch.path
    const duplicateNewPath =
      path.join(path.dirname(duplicatePath), path.basename(imagePath))
    fs.renameSync(duplicatePath, duplicateNewPath)
    return { from: duplicatePath, to: duplicateNewPath }
  } catch (e) {
    return e.message
  }
}

program
  .version('0.0.1')
  .description('Find image duplicates')

program
  .command('find-match <image-path> [search-paths...]')
  .alias('f')
  .description('Find best match')
  .action(async (i, s) => console.log(await findMatch(i, s)))

program
  .command('rename-match <image-path> [search-paths...]')
  .alias('r')
  .description('Rename best match')
  .action(async (i, s) => console.log(await renameMatch(i, s)))

program.parse(process.argv)

if (!program.args.length) {
  program.help()
}
