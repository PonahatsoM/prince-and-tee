import { useState } from "react";
import { Login } from "./Login";
import { CampusApp } from "./CampusApp";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <CampusApp />
      )}
    </>
  );
};

export default Index;
