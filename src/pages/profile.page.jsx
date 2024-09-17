import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import Loader from "../components/loader.component";

const profileDataStructure = {
  personal_info: {
    fullname: "",
    username: "",
    profile_img: "",
    bio: "",
  },
  account_info: {
    total_posts: 0,
    total_reads: 0,
  },
  social_links: {},
  joinedAt: " ",
};

const ProfilePage = () => {
  let { id: profileId } = useParams();
  let [profile, setProfile] = useState(profileDataStructure);

  let {
    personal_info: { fullname, username: proflie_username, profile_img, bio },
    account_info: { total_posts, total_reads },
    social_links,
    joinedAt,
  } = profile;

  useEffect(() => {
    const fetchUserProfile = async () => {
      await axios
        .post(import.meta.env.VITE_SERVER_DOMAIN + "/get-profile", {
          username: profileId,
        })
        .then(({ data: user }) => {
          setProfile(user);
          console.log(user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchUserProfile();
  }, []);

  return <>{profileId}</>;
};

export default ProfilePage;
