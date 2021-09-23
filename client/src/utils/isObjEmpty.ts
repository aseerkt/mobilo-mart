export default function (obj: Object) {
  return Object.values(obj).some((v) => v === '' || v === null);
}
