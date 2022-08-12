import webLibraryGenerator from './library/web';
import nodeLibraryGenerator from './library/node';

const processLibrary = (library) =>
  library
    .reduce((acc, v) => {
      const family = acc.find((l) => l.name === v.name);
      if (family) {
        family.methods = family.methods
          .concat(v.methods)
          .filter((v, i, a) => a.findIndex((e) => e.name === v.name) === i);
      } else {
        acc.push(v);
      }
      return acc;
    }, [])
    .sort((a, b) => a.name.localeCompare(b.name));

export const webLibrary = processLibrary(webLibraryGenerator());
export const nodeLibrary = processLibrary(nodeLibraryGenerator());
