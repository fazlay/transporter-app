import { useState, useEffect } from "react";

import "./App.css";
import LoginPage from "./Pages/LoginPage";
import SignUppage from "./Pages/SignUppage";
import MarchentDashboard from "./Pages/MarchentDashboard";
import TarnsporterDashboard from "./Pages/TarnsporterDashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>({});
  const [isMember, setIsMember] = useState<boolean>(true);

  useEffect(() => {
    const userData = localStorage.getItem("user-data");
    const parsedUserData = userData && JSON.parse(userData);
    console.log({ parsedUserData });
    if (userData) {
      setIsLoggedIn(true);
      setUserData(parsedUserData);
    }
  }, [isLoggedIn]);
  return (
    <>
      {isLoggedIn ? (
        <>
          {" "}
          {userData?.role ? (
            <>
              {userData?.role === "Transporter" ? (
                <TarnsporterDashboard userData={userData} />
              ) : (
                <MarchentDashboard userData={userData} />
              )}
            </>
          ) : (
            <>
              {" "}
              <div className="flex align-center place-content-center">
                <span className="loading loading-infinity loading-lg"></span>
              </div>{" "}
            </>
          )}
        </>
      ) : (
        <>
          {isMember ? (
            <LoginPage
              setIsLoggedIn={setIsLoggedIn}
              setIsMember={setIsMember}
            />
          ) : (
            <SignUppage setIsMember={setIsMember} />
          )}
        </>
      )}
    </>
  );
}

export default App;
