import { locatePackageJson } from '../util/fs'
import { parse as parseJson, prettyPrint, prettySerialize } from '../util/json'
import { instantiateStore } from '../util/store'

export default dispatchCommand

async function dispatchCommand (options, args, print = console.log) {
  if (args.length === 0 || args.length > 3) {
    throw new Error(`dispatch: Expected one, two or three arguments.`)
  }

  const rawOutput = 'raw' in options
  const [ eventNameOrJson, optionalEventPayload = '', optionalEventMeta = '' ] = args
  let event

  if (eventNameOrJson.charAt(0) === '{') {
    event = parseJson(eventNameOrJson)
    if (args.length > 1) {
      throw new Error(`dispatch: Expected only one argument`)
    }
  } else {
    event = {
      type: eventNameOrJson,
      payload: Object.assign({}, optionalEventPayload ? parseJson(optionalEventPayload) : {}),
      meta: Object.assign({}, optionalEventMeta ? parseJson(optionalEventMeta) : {}),
    }
  }

  const store = await instantiateStore(await locatePackageJson())
  const createdEvents = await store.dispatch(event)

  if (rawOutput) {
    print(prettySerialize(createdEvents))
  } else {
    print(`Successfully dispatched event${createdEvents.length === 1 ? '' : 's'}:`)
    createdEvents.forEach((createdEvent) => print(prettyPrint(createdEvent)))
  }
}
