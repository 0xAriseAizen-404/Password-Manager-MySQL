import SearchLineIcon from "remixicon-react/SearchLineIcon";
import { PasswordCard } from "./PasswordCard";
import { useEffect, useState } from "react";
import Axios from "axios";

export const ShowPasswords = () => {
  const [data, setData] = useState([]);
  // Fetch passwords data on mount
  useEffect(() => {
    Axios.get("http://localhost:5000/showpasswords").then((res) =>
      setData(res.data)
    );
  }, []);
  const filterResults = () => {
    const title = document.getElementById("title").value;
    Axios.get(`http://localhost:5000/showpasswords/${title}`).then((res) =>
      setData(res.data)
    );
  };
  return (
    <div className="main-showpass">
      <div className="img-con"></div>
      <div className="heading">
        <h2>
          Your passwords
          {/* <HowMany /> */}
        </h2>
        <div className="input-con">
          <div className="icon-con">
            <SearchLineIcon className="icon" />
          </div>
          <input
            type="text"
            placeholder="Ex. instagram"
            id="title"
            onChange={() => filterResults()}
          />
        </div>
      </div>
      <div className="passwords-con">
        {data.map((password) => (
          <PasswordCard
            key={password.id}
            password={password}
            setData={setData}
          />
        ))}
      </div>
    </div>
  );
};
