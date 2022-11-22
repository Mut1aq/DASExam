/**
 * @param obj any typeORM object that was found by findOne
 * @returns clean object
 */
export function cleanObject(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}
