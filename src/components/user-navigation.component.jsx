import React, {useContext} from "react";
import AnimationWrapper from "../common/page-animation";
import {Link} from "react-router-dom";
import {UserContext} from "../App";
import {removeFromSession} from "../common/session";

function UserNavigationPanel() {
    const {
        userAuth: {fullname, username},
        setUserAuth,
    } = useContext(UserContext);

    const signOutUser = () => {
        removeFromSession("user");
        setUserAuth({access_token: null});
    };
    return (
        <AnimationWrapper
            transition={{duration: 0.2}}
            className="absolute right-0 z-50"
        >
            <div className="bg-white border border-grey w-60  duration-200 right-0 absolute">
                <Link to="/editor" className="flex gap-2 link md:hidden pl-8 py-4">
                    <i className="fi fi-rr-file-edit"></i>
                    <p>Write</p>
                </Link>

                <Link to={`/user/${username}`} className="link pl-8 py-4">
                    Profile
                </Link>
                <Link to="/dashboard/blogs" className="link pl-8 py-4">
                    Dashboard
                </Link>
                <Link to="/setting/edit-profile" className="link pl-8 py-4">
                    Setting
                </Link>

                <span className="absolute border-t border-grey w-[100%] "></span>

                <button
                    onClick={signOutUser}
                    className="text-left p-2 hover:bg-grey w-full pl-8"
                >
                    <div className="flex gap-2">
                        <i className="fi fi-br-sign-out-alt text-xl"></i>
                        <span className="font-bold text-xl mb-1">Sign Out</span>
                    </div>
                    <p className="text-dark-grey">@{fullname}</p>
                </button>
            </div>
        </AnimationWrapper>
    );
}

export default UserNavigationPanel;
