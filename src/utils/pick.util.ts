export const pick = (object: object, keys: string[]): object => {
    return keys.reduce((obj, key): object => {
      if (object && Object.prototype.hasOwnProperty.call(object, key)) {
        // eslint-disable-next-line no-param-reassign
        obj[key] = object[key];
      }
      return obj;
    }, {});
  };
  