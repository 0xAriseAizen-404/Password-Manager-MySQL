import { toast } from "react-toastify";
import GlobalLineIcon from "remixicon-react/GlobalLineIcon";
import UserLineIcon from "remixicon-react/UserLineIcon";
import LockLineIcon from "remixicon-react/LockLineIcon";
import { useState } from "react";
import Axios from "axios";

export const AddingPassword = () => {
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [url, setUrl] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (title === "" || password === "" || url === "") {
      return toast.error("Please fill all the fields");
    }
    const res = await Axios.post("http://localhost:5000/addpassword", {
      title: title,
      password: password,
      url: url,
    });
    toast.success(res);
    setTitle("");
    setPassword("");
    setUrl("");
  };

  return (
    <form className="AddingPassword">
      <h2>Add New Password</h2>
      <div className="form-group">
        <label htmlFor="title">Enter Title : </label>
        <div className="input-con">
          <div className="icon-con">
            <GlobalLineIcon className="icon" />
          </div>
          <input
            type="text"
            placeholder="Ex. instagram"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="password">Enter Password :</label>
        <div className="input-con">
          <div className="icon-con">
            <UserLineIcon className="icon" />
          </div>
          <input
            type="text"
            placeholder="Ex. password123"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="url">Enter URL of the site : </label>
        <div className="input-con">
          <div className="icon-con">
            <LockLineIcon className="icon" />
          </div>
          <input
            type="text"
            placeholder="Ex. https://instagram.com"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
      </div>
      <p>
        <u>Note:</u> Passwords are saved in encrypted form.
      </p>
      <div className="form-group">
        <button type="submit" onClick={(e) => submitHandler(e)}>
          Add Password
        </button>
      </div>
    </form>
  );
};
