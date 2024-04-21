import { useState } from "react";

const InputBox = ({ name, type, id, value, placeholder, icon }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <div className="relative w-[100%] mb-4">
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={value}
        id={id}
        className="input-box"
      />

      <i className={"fi " + icon + " input-icon"}></i>
      {/* 
      {type == "password" ? (
        <i
          class="fi fi-rr-eye-crossed input-icon left-[auto] right-4 cursor-pointer"
          onClick={() => setPasswordVisible(!passwordVisible)}
        ></i>
      ) : (
        ""
      )} */}
    </div>
  );
};

export default InputBox;
