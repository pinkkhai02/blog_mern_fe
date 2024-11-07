import axios from "axios";
import React, {createContext, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import AnimationWrapper from "../common/page-animation.jsx";
import Loader from "../components/loader.component.jsx";
import {getDay} from "../common/date.jsx";
import BlogInteraction from "../components/blog-interaction.component.jsx";
import BlogPostCard from "../components/blog-post.component.jsx";
import BlogContent from "../components/blog-content.component.jsx";

 export const blogStructure = {
  title: "",
  des: "",
  content: [], tags:[],
  author: { personal_info: {} },
  banner: "",
  publishedAt: "",
};

 export const BlogContext = createContext({});

const BlogPage = () => {
  const { blog_id } = useParams();
  const [blog, setBlog] = useState(blogStructure);
  const [similerBlog,setSimilerBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    title,
    content,
    banner,
    author: {personal_info:{fullname, username: author_username, profile_img}},
    publishedAt,
  } = blog;


  const fetchBlog = () => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/get-blog", { blog_id })
      .then(({ data: blog }) => {
            // let tags = blog.tags;
          console.log(blog.content[0])

              axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", { tag: blog.tags[0], limit: 6, eliminate_blog: blog_id})
                  .then(({ data }) => {
                      console.log(data.blogs);
                      setSimilerBlog(data.blogs);
                  })
          setBlog(blog);
          setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
      resetStates();
    fetchBlog();
  }, [blog_id]);

  const resetStates = () => {
      setBlog(blogStructure);
      setSimilerBlog(null);
      setLoading(true)
  }
  return (
      <AnimationWrapper>
        {
          loading ? <Loader /> : (
              <BlogContext.Provider value={{blog,setBlog}}>
                  <div className="max-2-[900px] center p-10 max-lg:px-[5vw]">
                      <img src={banner} alt="" className="aspect-video"/>

                      <div className="mt-12">
                          <h2>{title}</h2>

                          <div className="flex max-sm:flex-col justify-between my-8">
                              <div className="flex gap-5 items-start">
                                  <img src={profile_img} alt="" className="h-12 w-12 rounded-full"/>
                                  <p className="capitalize">
                                      {fullname}
                                      <br/>
                                      @
                                      <Link to={`/user/${author_username}`}
                                            className="underline">{author_username} </Link>
                                  </p>
                              </div>
                              <p className="text-dark-grey opacity-75 max-sm:mt-6 max-sm:ml-12 max-sm:pl-6">
                                  Published on {getDay(publishedAt)}
                              </p>
                          </div>
                      </div>

                      <BlogInteraction/>
                        <div className="my-12 font-gelasio blog-page-content">
                            {
                                content[0].blocks.map((block,i) =>{
                                    return <div key={i} className="my-4 md:my-8">
                                        <BlogContent block={block}/>
                                    </div>
                                })
                            }
                        </div>
                      <BlogInteraction/>

                      {
                          similerBlog !== null && similerBlog.length ?
                              <>
                                  <h1 className="text-2xl mt-14 mb-10 font-medium">Similar Blogs</h1>

                                  {
                                      similerBlog.map((blog,i) => {
                                          let {author:{personal_info}} = blog;

                                          return <AnimationWrapper key={i} transition={{duration:1, delay:i* 0.08}}>
                                              <BlogPostCard content={blog} author={personal_info} />
                                          </AnimationWrapper>
                                      })
                                  }
                              </>
                              :""
                      }
                  </div>
              </BlogContext.Provider>

          )
        }
      </AnimationWrapper>
  );
};

export default BlogPage;
