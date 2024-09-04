import EyeFillIcon from "remixicon-react/EyeFillIcon";
import EyeOffLineIcon from "remixicon-react/EyeOffFillIcon";
import DeleteBinLineIcon from "remixicon-react/DeleteBinLineIcon";
import Axios from "axios";
import { useState } from "react";

export const PasswordCard = ({ password, setData }) => {
  const [eyeIconClicked, setEyeIconClicked] = useState(false);
  const [pass, setPass] = useState("");

  const decryptedPassword = () => {
    Axios.post("http://localhost:5000/decryptpassword", {
      iv: password.iv,
      password: password.password,
    }).then((res) => setPass(res.data));
    return pass;
  };

  const deletePasswordHandler = (id) => {
    Axios.delete("http://localhost:5000/deletepassword", { data: { id } })
      .then((response) => {
        console.log(response.data); // Optionally, log the response
        // Handle any further actions if needed
        // Update state to trigger re-fetching of passwords data
        setData((prevData) =>
          prevData.filter((password) => password.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting password:", error);
        // Handle error gracefully
      });
  };

  return (
    <div className="password-card">
      <div className="top">
        <div className="title">{password.title}</div>
        <a href={password.url} target="_blank" className="link">
          open link
        </a>
      </div>
      <hr />
      <div className="bottom">
        <div className="show-password-con">
          <div className="password">
            {eyeIconClicked ? decryptedPassword() : password.password}
          </div>
          {eyeIconClicked ? (
            <EyeFillIcon
              className="icon"
              onClick={() => setEyeIconClicked((prev) => !prev)}
            />
          ) : (
            <EyeOffLineIcon
              className="icon"
              onClick={() => setEyeIconClicked((prev) => !prev)}
            />
          )}
        </div>
        <button className="delete-icon">
          <DeleteBinLineIcon
            className="icon"
            size={24}
            onClick={() => deletePasswordHandler(password.id)}
          />
        </button>
      </div>
    </div>
  );
};
