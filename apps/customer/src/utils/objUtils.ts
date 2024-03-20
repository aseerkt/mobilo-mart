export function isObjEmpty(obj: Object) {
  return Object.values(obj).some((v) => v === '' || v === null);
}

export function parseDoc(obj: Object) {
  return JSON.parse(JSON.stringify(obj));
}
