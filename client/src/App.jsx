import { useState } from "react";
import "./App.css";
import { AddingPassword } from "./components/AddingPassword";
import { ShowPasswords } from "./components/ShowPasswords"; // Import the ShowPassword component
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // State to track whether the show password button is clicked
  const [showPasswordClicked, setShowPasswordClicked] = useState(true);

  // Function to handle the click event of the show password button
  const handleShowPasswordClick = () => {
    setShowPasswordClicked(prev => !prev);
  };

  return (
    <>
      <ToastContainer />
      <main>
        {!showPasswordClicked ? (
          <>
            <button className="btn-handler showpass-btn" onClick={handleShowPasswordClick}>
              My Passwords
            </button>
            <AddingPassword />
            <div className="img-container">
              <img src="../assets/4498897.jpg" alt="" />
            </div>
          </>
        ) : (
          <>
            <button className="btn-handler add-pass" onClick={handleShowPasswordClick}>
              Add Password
            </button>
            <ShowPasswords />
          </>
        )}
      </main>
    </>
  );
}

export default App;
