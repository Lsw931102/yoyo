/* eslint-disable */
const { Conflux } = require('js-conflux-sdk')
import unit from 'js-conflux-sdk/src/util/unit'
const fcFile = require('./conflux.json')
const abi = fcFile.abi
const code = fcFile.bytecode
const address = fcFile.address
const cfxUrl = 'http://wallet-mainnet-jsonrpc.conflux-chain.org:12537'

const cfx = new Conflux({
  url: process.argv[3] ? process.argv[3] : cfxUrl,
  defaultGasPrice: 10000,
  defaultGas: 10000000
})

const contract = cfx.Contract({
  bytecode: code,
  abi
})

const fcCon = cfx.Contract({
  abi: fcFile.fcabi,
  address: fcFile.address
})

export { abi, code, address, cfx, contract, fcCon, unit }
