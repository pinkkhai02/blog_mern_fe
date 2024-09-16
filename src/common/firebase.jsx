import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBLWcgZhFu_nUkbsKbIKQLv6ICQe4jk_Kc",
  authDomain: "react-js-blog-website-yt-e5273.firebaseapp.com",
  projectId: "react-js-blog-website-yt-e5273",
  storageBucket: "react-js-blog-website-yt-e5273.appspot.com",
  messagingSenderId: "247597277145",
  appId: "1:247597277145:web:eec70a786f0f97f7fcc3c8",
};

const app = initializeApp(firebaseConfig);

//gg auth
const provider = new GoogleAuthProvider();
const auth = getAuth();

// export const authWithGoogle = async () => {
//   let user = null;

//   await signInWithPopup(auth, provider)
//     .then((result) => {
//       user = result.user;
//     })
//     .catch((err) => {
//       console.log(err);
//     });

//   return user;
// };
export const authWithGoogle = async () => {
  let user = null;
  await signInWithPopup(auth, provider)
    .then((result) => {
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      user = result.user;
    })
    .catch((error) => {
      console.log(err);
    });
  return user;
};
