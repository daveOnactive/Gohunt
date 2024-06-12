
type Params = {
  [key: string]: string;
}

export function buildQueryParams(path: string, queries: Params) {

  let url = `${path}?`;

  Object.keys(queries).forEach(item => url = `${url}${item}=${queries[item]}&`);

  return url;
}