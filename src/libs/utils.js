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

export function dateFormat(postDate) {
  let options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const temp = new Intl.DateTimeFormat("en-US", options)
    .format(postDate)
    .split(" ");
  temp[2] = temp[2].replace(",", " ");
  return temp.join(" ");
}

export function successModal(swal, text) {
  swal({
    icon: "success",
    title: "Saved!",
    text: text,
  });
}

export function errorModal(swal, error) {
  swal({
    icon: "error",
    title: "Something went wrong !",
    text: `[Reason] :  ${error}`,
  });
}
