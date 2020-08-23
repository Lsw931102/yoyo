const returnAddrs = (addrs: string) => {
  return addrs.substring(0, 6) + '...' + addrs.substring(addrs.length - 4, addrs.length)
}

export { returnAddrs }
