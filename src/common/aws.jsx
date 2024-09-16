import axios from "axios";

export const uploadImage = async (img) => {
  // await axios
  //   .get(import.meta.env.VITE_SERVER_DOMAIN + "/get-upload-url")
  //   .then(async ({ data: { uploadURL } }) => {
  //     await axios({
  //       method: "put",
  //       url: uploadURL,
  //       headers: { "Content-Type": "multipart/form-data" },
  //       data: img,
  //     }).then(() => {
  //       console.log(uploadURL);
  //       imgURL = uploadURL.split("?")[0];
  //     });
  //   });

  let imgURL = null;
  await axios
    .get(import.meta.env.VITE_SERVER_DOMAIN + "/get-upload-url")
    .then(async ({ data: { uploadURL } }) => {
      await axios
        .put(uploadURL, img, {
          headers: {
            "Content-Type": img.type,
          },
        })
        .then(() => {
          const baseUrl = uploadURL.split("?")[0];
          // console.log(uploadURL);
          // console.log(baseUrl);
          imgURL = baseUrl;
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    });
  // console.log(imgURL);
  return imgURL;
};
