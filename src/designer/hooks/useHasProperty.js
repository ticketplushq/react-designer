export const useHasProperty = (object = {}) => {
  const hasProperty = (property, newObject) =>
    Object.hasOwn(newObject ?? object, property)
  return [hasProperty]
}
