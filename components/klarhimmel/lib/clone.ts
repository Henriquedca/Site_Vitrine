// Deep copy for JSON data (props, decks, styles). Not structuredClone: that is a DOM/worker global, and these modules
// must typecheck in a worker program with no DOM lib (tsconfig.nodom.json).
export const clone = <T>(v: T): T => (v === undefined ? v : JSON.parse(JSON.stringify(v)));
