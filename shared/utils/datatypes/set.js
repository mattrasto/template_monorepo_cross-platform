export const setDifference = (a, b) => new Set([...a].filter((x) => !b.has(x)));
export const setIntersection = (a, b) => new Set([...a].filter((x) => b.has(x)));
export const setUnion = (a, b) => new Set([...a, ...b]);
