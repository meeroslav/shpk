export class HelperService {
  getObjectDelta<T>(src: T, dest: T): Partial<T> {
    const delta: Partial<T> = {};

    for (const prop in src) {
      if (src.hasOwnProperty(prop) &&
        src[prop].toString() !== dest[prop].toString() ) {
        delta[prop] = dest[prop];
      }
    }

    return delta;
  }
}
