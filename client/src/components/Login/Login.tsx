import { useEffect, useState } from "react";
import axios from "axios";
import Auth from "../../utils/auth.js";
import { useVendor } from "../../context/VendorContext.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const { logIn, setLogIn, vendor } = useVendor();
  const navigate = useNavigate();

  useEffect(() => {
    if (logIn) navigate(`/dashboard/${vendor}`);
  });
  
  const handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleFormSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const data = await axios.post("http://localhost:5555/login", credentials);
      if (data != null) {
        setMessage("Login successful, sending you to your dashboard...");
        setLogIn(true);
        setTimeout(() => {
          Auth.login(data.data.id, data.data.token, data.data.refreshToken);
        }, 3000);
      }
    } catch (err) {
      setMessage("Email or password incorrect");
      console.log(err);
    }
  };

  return (
    <div className="h-52 mt-16 mr-auto ml-auto flex flex-col place-items-center justify-between border-4 rounded-md md:w-1/2">
      <div className="flex flex-wrap justify-between items-center">
        <h1 className="p-2">Login</h1>
      </div>
      <div className="w-1/2 flex flex-col">
        <form onSubmit={handleFormSubmit}>
          <div className="p-2 flex justify-between">
            Email
            <input
              type="email"
              placeholder="martha@here.com"
              name="email"
              id="email"
              value={credentials.email}
              onChange={handleChange}
            />
          </div>
          <div className="p-2 flex justify-between">
            Password
            <input
              type="password"
              name="password"
              placeholder="********"
              id="password"
              value={credentials.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="m-2 w-full self-center border-4 rounded border-slate-300 hover:border-black hover:bg-orange-400"
          >
            Submit
          </button>
        </form>
      </div>
      {message != "" ? (
        <div className="p-4 border-2 rounded bg-red-200">
          <div>{message}</div>
        </div>
      ) : null}
    </div>
  );
}
