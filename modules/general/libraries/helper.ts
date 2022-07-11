const addClientId = (url: string, and: boolean = false) =>
  url + `${and ? "&" : ""}client_id=${process.env.unsplash_access_key}`;

function log(title: string, ...args: any[]) {
  console.log(title + "__________");
  args.forEach((arg) => console.log(arg));
}
export { addClientId, log };
