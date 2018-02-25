export function deepCopy<T>(target: T): T {
  if (target === null || target === undefined || typeof target !== "object") {
    return target;
  }

  if (Array.isArray(target)) {
    return <any>target.map(deepCopy);
  }

  let newObj:any = {};
  for (let key in target) {
    newObj[key] = deepCopy(target[key]);
  }

  Object.getOwnPropertySymbols(target).forEach(s => {
    newObj[s] = (<any>target)[s];
  });

  return newObj;
}