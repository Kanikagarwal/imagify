import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { enable, disable, isEnabled } from "darkreader";
export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [credit, setCredit] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  console.log(backendUrl);

   const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkreader-enabled") === "true";
  });

  // 🔁 Sync dark mode state with Darkreader
  useEffect(() => {
    if (darkMode) {
      enable({
        brightness: 100,
        contrast: 90,
        sepia: 10,
      });
    } else {
      disable();
    }
    localStorage.setItem("darkreader-enabled", darkMode.toString());
  }, [darkMode]);

  // 🧠 Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  const loadCreditData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/credits", {
        headers: { token },
      });
      if (data.success) {
        console.log(data.credits);

        setCredit(data.credits);
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };

  const generateImage = async (prompt) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/image/generate-image",
        { prompt },
        { headers: { token } }
      );
      if (data.success) {
        loadCreditData();
        return data.resultImage;
      } else {
        toast.error(data.message);
        loadCreditData();
        if (data.creditBalance <= 0) {
          navigate("/buy");
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      loadCreditData();
    }
  }, [token]);



//   THEME TOGGLE


  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendUrl,
    token,
    setToken,
    credit,
    setCredit,
    loadCreditData,
    logout,
    generateImage,
    darkMode,
    toggleDarkMode,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;

// Testkeyid=rzp_test_7I0SCQCJXeRn1b

// Testkeysecret=XvHGM0Wn4uFowqc17JU6rDLb
