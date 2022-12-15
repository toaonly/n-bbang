const createIdGenerator = (prefix: string) => {
  let n = 0

  const generator = function* () {
    while (true) yield `${prefix}-${n++}`
  }

  return generator()
}

export default createIdGenerator
