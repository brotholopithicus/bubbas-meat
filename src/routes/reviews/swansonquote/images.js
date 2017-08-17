const importImages = (r) => r.keys().map(r);
const images = importImages(require.context('./images/320s', false, /.jpeg$/));
export default images;
