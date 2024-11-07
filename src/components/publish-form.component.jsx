import React, {useContext} from "react";
import AnimationWrapper from "../common/page-animation";
import {toast, Toaster} from "react-hot-toast";
import {EditorContext} from "../pages/editor.pages";
import Tag from "./tags.component";
import axios from "axios";
import {UserContext} from "../App";
import {useNavigate, useParams} from "react-router-dom";

const PublishForm = () => {
    const characterLimit = 200;
    const tagLimit = 10;
    let {blog_id} = useParams();
    let {
        blog,
        blog: {banner, title, des, tags, content},
        setBlog,
        setEditorState,
    } = useContext(EditorContext);
    const handleCLoseEvent = () => {
        setEditorState("editor");
    };

    let {
        userAuth: {access_token},
    } = useContext(UserContext);

    let navigate = useNavigate();

    const handleBlogTitleChange = (e) => {
        let input = e.target;
        setBlog({...blog, title: input.value});
    };

    const handleBlogDesChange = (e) => {
        let input = e.target;
        setBlog({...blog, des: input.value});
    };

    const handleTitleKeyDown = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
        }
    };
    const handleTagsKeyDown = (e) => {
        // console.log(e.keyCode);
        if (e.keyCode === 13 || e.keyCode === 188) {
            e.preventDefault();
            let tag = e.target.value;
            // console.log(tag);
            if (tags.length < tagLimit) {
                if (!tags.includes(tag) && tag.length) {
                    setBlog({...blog, tags: [...tags, tag]});
                }
            } else {
                toast.error(`You can add max ${tagLimit} tags`);
            }
            e.target.value = "";
        }
    };

    const publishBlog = (e) => {
        if (e.target.className.includes("disable")) {
            return;
        }
        if (!title.length) {
            return toast.error("Write blog title before publishing");
        }
        if (!des.length || des.length > characterLimit) {
            return toast.error(
                `Write a description about your blog withing ${characterLimit} character to publish`
            );
        }
        if (!tags.length || tags.length > tagLimit) {
            return toast.error(
                `Enter at least tag to help us rank your blog max: ${tagLimit}`
            );
        }

        let loadingToast = toast.loading("Publishinh...");

        e.target.classList.add("disable");

        let blogOjb = {title, banner, des, content, tags, draft: false};

        axios
            .post(import.meta.env.VITE_SERVER_DOMAIN + "/create-blog", {...blogOjb, id: blog_id}, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })
            .then(() => {
                e.target.classList.remove("disable");
                toast.dismiss(loadingToast);
                toast.success("Published 👍");

                setTimeout(() => {
                    navigate("/");
                }, 500);
            })
            .catch(({response}) => {
                e.target.classList.remove("disable");
                toast.dismiss(loadingToast);

                return toast.error(response.data.error);
            });
    };

    return (
        <AnimationWrapper>
            <section className="w-screen min-h-screen grid items-center lg:grid-cols-2 py-16 lg:gap-4">
                <Toaster/>
                <button
                    className="w-12 h-12 absolute right-[5vw] z-10 top-[5%] lg:top-[10%]"
                    onClick={handleCLoseEvent}
                >
                    <i className="fi fi-br-cross"></i>
                </button>

                <div className="max-w-[650px] center">
                    <p className="text-dark-gray mb-1">Preview</p>

                    <div className="w-full aspect-video rounded-lg overflow-hidden bg-gray mt-4">
                        <img src={banner} alt=""/>
                    </div>

                    <h1 className="text-4xl font-medium mt-2 leading-tight break-all  ">
                        {title}
                    </h1>
                    <p className=" font-gelasio text-xl leading-7 mt-4 break-all">
                        {des}
                    </p>
                </div>

                <div className="max-w-[650px] border-grey lg:border-1 lg:pl-8 center w-full ">
                    <p className="text-dark-grey mb-2 mt-9">Blog title</p>
                    <input
                        type="text"
                        placeholder="Blog title"
                        defaultValue={title}
                        className="input-box pl-4"
                        onChange={handleBlogTitleChange}
                    />
                    <p className="text-dark-grey mb-2 mt-9">
                        Shot description about your blog
                    </p>

                    <textarea
                        name=""
                        id=""
                        maxLength={characterLimit}
                        defaultValue={des}
                        className="h-40 resize-none leading-7 input-box pl-4"
                        onChange={handleBlogDesChange}
                        onKeyDown={handleTitleKeyDown}
                    ></textarea>

                    <p className="mt-1 text-dark-grey text-sm text-right">
                        {characterLimit - des.length} characters left
                    </p>

                    <p className="text-dark-grey mb-2 mt-9">
                        Topic - (Helps is sreaching and ranking your blog post)
                    </p>

                    <div className="relative input-box pl-2 py-2 pb-4">
                        <input
                            type="text"
                            placeholder="Topic"
                            className="input-box bg-white sticky top-0 right-0 pl-4 mb-3 focus:bg-white"
                            onKeyDown={handleTagsKeyDown}
                        />
                        {tags.map((tag, i) => {
                            return <Tag tag={tag} tagIndex={i} key={i}/>;
                        })}
                    </div>

                    <p className="mt-1 mb-4 text-dark-grey text-right text-sm">
                        {tagLimit - tags.length} Tags left
                    </p>

                    <button className="btn-dark px-8" onClick={publishBlog}>
                        Publish
                    </button>
                </div>
            </section>
        </AnimationWrapper>
    );
};

export default PublishForm;
