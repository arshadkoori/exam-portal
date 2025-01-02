// export default function toBase64(file) {
//     return new Promise((res, rej) => {
//       let fileReader = new FileReader();
//       fileReader.readAsDataURL(file);
//       fileReader.onload = () => res(fileReader.result);
//       fileReader.onerror = (error) => rej(error);
//     });
//   }

export default function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
