export default function requestify(url, options) {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open(options.method, url);
    if (typeof options.headers !== 'undefined') options.headers.forEach(header => req.setRequestHeader(header.name, header.value));
    req.onload = () => {
      if (req.status >= 200 && req.status < 300) {
        resolve(req.response);
      } else {
        reject(Error(req.statusText));
      }
    }
    req.onerror = () => reject({ status: req.status, statusText: req.statusText });
    req.send(options.data);
  });
}
