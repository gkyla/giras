import {
  uploadFile,
  deleteImageStorage,
  createStorageRef,
} from "./firebase/index";

export async function uploadImage({ type, currentLocalValue, file }) {
  const ref = createStorageRef(type);
  const hasImageBefore = !!currentLocalValue;
  console.log(file);

  if (hasImageBefore) {
    // If has image remove first then upload the new one
    if (file) {
      await deleteImageStorage(currentLocalValue);
      console.log("deleted first");
      const url = await uploadFile(ref, file);
      //   currentFile.value = null;
      console.log("user mengupdate gambar nya");
      return url;
    } else {
      console.log("return gambar yang sudah ada");
      return currentLocalValue;
    }
  } else {
    if (file) {
      const url = await uploadFile(ref, file);
      //   currentFile.value = null;
      console.log("user mengupload file gambar pertama kali");
      return url;
    } else {
      console.log("user tidak memasukan file apapun");
      return null;
    }
  }
}
