import JSON5 from 'json5'

export {
  parse,
  prettyPrint,
  prettySerialize
}

function parse (string) {
  try {
    return JSON5.parse(string)
  } catch (error) {
    const shortString = string.length < 20 ? string : `${string.substr(0, 17)}...`
    throw Object.assign(error, {
      message: `${error.message.replace(/ at line.+$/, '')} in '${shortString}'`
    })
  }
}

function prettyPrint (data) {
  return JSON5.stringify(data, null, 2)
}

function prettySerialize (data) {
  // Use JSON, not JSON5, since when serializing we aim for max compatibility
  return JSON.stringify(data, null, 2)
}
