import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const useAuth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleMySqlEmailPassword = async (e) => {
    e.preventDefault();
    const apiUrl = isSignUp
      ? `${import.meta.env.VITE_API_URL}/authorize/signup`
      : `${import.meta.env.VITE_API_URL}/authorize/signin`;

    const requestBody = {
      email,
      password,
    };
    if (isSignUp) {
      requestBody.name = userName;
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(requestBody),
      });
      const responseData = await response.json();
      // console.log(responseData.token);
      if (response.status === 201 && isSignUp) {
        alert("Signup successful. Please log in.");
        setIsSignUp(false);
      } else if (response.status === 200 && !isSignUp) {
        const decodedToken = jwtDecode(responseData.token);
        const authInfo = {
          userId: decodedToken.authId,
          name: decodedToken.userName,
          profilePhoto: "",
          isAuth: true,
          jwtToken: responseData.token,
        };
        localStorage.setItem("auth", JSON.stringify(authInfo));
        navigate("/budget-buddy");
      } else {
        alert("Error: " + responseData.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error posting data", error);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    userId,
    setUserId,
    userName,
    setUserName,
    isSignUp,
    setIsSignUp,
    handleMySqlEmailPassword,
  };
};
