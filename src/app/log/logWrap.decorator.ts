
export default function logWrap(target: Object, key: string, descriptor: TypedPropertyDescriptor<any>) {
  let origMethod = descriptor.value;
  descriptor.value = function(...args: any[]) {
    console.info(`@logWrap - [${key}] method args: ${JSON.stringify(args)}`);
    let result = origMethod.apply(this, args);
    console.info(`@logWrap - [${key}] method return value: ${JSON.stringify(result)}`);
    return result;
  };
  return descriptor;
}
