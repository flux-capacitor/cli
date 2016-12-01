import test from 'ava'
import { parse, prettyPrint, prettySerialize } from '../json'

test('parse() parses JSON5 correctly', (t) => {
  const parsed = parse('{ foo: 123 }')
  t.deepEqual(parsed, { foo: 123 })
})

test('parse() fails with a useful error message', (t) => {
  t.throws(() => parse('{foo}'), `Expected ':' instead of '}' in '{foo}'`)
})

test('parse() fails with a shortened error message', (t) => {
  t.throws(() => parse('{fooooooooooooooooooo}'), `Expected ':' instead of '}' in '{fooooooooooooooo...'`)
})

test('prettyPrint() returns nicely formatted JSON5', (t) => {
  const stringified = prettyPrint({ foo: 123 })
  t.is(stringified, '{\n  foo: 123\n}')
})

test('prettySerialize() returns nicely formatted raw JSON', (t) => {
  const stringified = prettySerialize({ foo: 123 })
  t.is(stringified, '{\n  "foo": 123\n}')
})
