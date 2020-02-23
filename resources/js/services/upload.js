import { storage } from "./firebase";

export async function uploadImage(folder, image) {
  return new Promise((resolve, reject) => {
    const originalName = image.name;
    const ext = originalName.slice(originalName.lastIndexOf("."));
    const date = new Date();
    const time = date.getTime();
    const imageName = time + ext;
    const uploadTask = storage.ref(`images/${folder}/${imageName}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // progress function ....
      },
      error => {
        // error function ....
        reject(error);
      },
      () => {
        // complete function ....
        storage.ref(`images/${folder}`).child(imageName).getDownloadURL().then(url => {
          resolve(url);
        });
      }
    );
  });
}
