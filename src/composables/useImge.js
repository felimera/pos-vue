import { uid } from "uid";
import { useFirebaseStorage } from "vuefire";
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export default function useImage() {
  const storage = useFirebaseStorage();

  const onFileChange = (e) => {
    console.log("e.target.files[0]", e.target.files[0]);
    const file = e.target.files[0];
    const filename = uid() + ".jpg";
    const sRef = storageRef(storage, "/products/" + filename);

    // Sube el archivo
    const uploadTask = uploadBytesResumable(sRef, file);
    uploadTask.on(
      "state_changed",
      () => {},
      (error) => console.log(error),
      () => {
        // La imagen ya se subio
        // Upload is completed
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
        });
      }
    );
  };

  return {
    onFileChange,
  };
}
