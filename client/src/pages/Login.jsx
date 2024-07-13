import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
// import { refreshAccessToken } from "../authService";
import axios from "axios";
import {
  PIIELOGOCROPPED,
  IECONNECNEWPNG,
  PUPLOGOPNG,
  BACKGROUND
} from "../assets/index";


const Login = () => {
  const { setIsAuthenticated } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const data = { uname: username, pword: password };
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/ie-connect/api/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.statusText === "OK" && response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
        setIsAuthenticated(response.data.data);
        navigate("/bulletin");
      } else {
        alert(response.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  };
  return (
    <>
      {/*bulletin_icons bulletin-header*/}
      <header className=" | login-header">
        <ul className=" | login-header-icons flex items-center w-full justify-between">
          <img id="piie-logo" src={PIIELOGOCROPPED} alt="" />

          <span>
            <img src={IECONNECNEWPNG} alt="" />
          </span>

          <a href="https://www.pup.edu.ph/">
            <img src={PUPLOGOPNG} alt="" />
          </a>
        </ul>
      </header>
      <main className="login-main">
        <section>
          <div>
            <img className="w-full brightness-100 index-bg absolute" src={BACKGROUND} alt="" />
          </div>
          
          <div className="pt-15">
            <h1 className="font-bold text-lime-950"><span className="text-green-900">Connect, Network,</span> and Inspire</h1>
          </div>
          <div className="login-form-div bg-white">
            <p className="text-xs font-medium">Email or phone</p>
            <form onSubmit={handleLogin}>
              <input
                className="login-input mt-5"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />



              <p className="text-xs font-medium">Password</p>            
              <input
                className="login-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              
              <p className="text-sm text-center text-green-900 font-bold">Forgot Password?</p>
              <button type="submit" className="btn bg-green-900 text-white">Sign in</button>
              <div className="registration-link">
                <p className="text-sm text-center">Don&#39;t have an account?</p>
                <NavLink to="/registration" ><p className="text-center text-sm">Sign up</p></NavLink>
              </div>
            </form>
          </div>  
          <footer>
            <div>
              <p>admin</p>
            </div>
          </footer>
        </section>
      </main>
    </>
  );
};

export default Login;
