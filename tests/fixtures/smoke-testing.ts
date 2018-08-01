#!/usr/bin/env ts-node

// tslint:disable:no-console

import {
  Listag,
}                 from 'listag'

async function main () {
  const lt = new Listag()
  console.log(`Listag smoke testing passed.`)
  return 0
}

main()
.then(process.exit)
.catch(e => {
  console.error(e)
  process.exit(1)
})
