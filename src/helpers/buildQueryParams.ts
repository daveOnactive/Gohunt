
type Params = {
  [key: string]: string;
}

export function buildQueryParams(path: string, queries: Params) {

  let url = `${path}?`;

  function separateQuery(index: number, arr: string[]){
    if(index !== arr.length - 1) return '&'
    return '';
  }

  Object.keys(queries).forEach((item, index, arr) => url = `${url}${item}=${queries[item]}${separateQuery(index, arr)}`);

  return url;
}