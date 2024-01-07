export default function isObjEmpty(obj: Object) {
  return Object.values(obj).some((v) => v === '' || v === null);
}
