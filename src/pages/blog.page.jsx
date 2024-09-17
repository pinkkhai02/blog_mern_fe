import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogPage = () => {
  const blogStructure = {
    title: "",
    des: "",
    content: [],
    tags: [],
    author: { personal_info: {} },
    banner: "",
    publishedAt: "",
  };
  const { blog_id } = useParams();
  const [blog, setBlog] = useState(blogStructure);

  const {
    title,
    content,
    banner,
    author: {},
    publishedAt,
  } = blog;

  const fetchBlog = () => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/get-blog", { blog_id })
      .then(({ data: blog }) => {
        console.log(blog);
        setBlog(blog);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchBlog();
  }, []);
  return <div>BlogPage -{blog_id} </div>;
};

export default BlogPage;
