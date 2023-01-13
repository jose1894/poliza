export function cloneClassObject(object: any) {
  return Object.assign(Object.create(Object.getPrototypeOf(object)), object);
}
