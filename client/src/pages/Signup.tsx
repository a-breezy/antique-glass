import { useState } from "react";
import axios from "axios";
import Auth from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [verifyPW, setVerifyPW] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (event: { target: { name: string; value: string } }) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleFormSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (verifyPW != credentials.password) {
      return setMessage("Password verification does not match");
    } else {
      try {
        const data = await axios.post(
          "http://localhost:5555/vendor",
          credentials
        );
        if (data != null) {
          setMessage("Sign up successful, sending you to your dashboard...");
          axios
            .post("http://localhost:5555/login", {
              email: credentials.email,
              password: credentials.password,
            })
            .then((res) => {
              setTimeout(() => {
                Auth.login(res.data.id, res.data.token, res.data.refreshToken);
                navigate(`/dashboard${res.data.id}`);
              }, 3000);
            });
        }
      } catch (err) {
        setMessage("An error occurred. Please check your sign up credentials");
        console.log(err);
      }
    }
  };

  return (
    <div className="lg:h-86 mt-16 mr-auto ml-auto lg:flex flex-col place-items-center justify-between border-4 rounded-md md:w-1/2">
      <div className="flex justify-center">
        <h1 className="p-2">Sign Up</h1>
      </div>
      <div className="lg:w-3/4 flex flex-col px-2">
        <form onSubmit={handleFormSubmit}>
          <div className="p-2 flex justify-between">
            First Name
            <input
              type="text"
              placeholder="Martha"
              name="firstName"
              id="firstName"
              required
              value={credentials.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="p-2 flex justify-between">
            Last Name
            <input
              type="text"
              placeholder="Doe"
              name="lastName"
              id="lastName"
              required
              value={credentials.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="p-2 flex justify-between">
            Email
            <input
              type="email"
              placeholder="martha@here.com"
              name="email"
              id="email"
              required
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
              required
              value={credentials.password}
              onChange={handleChange}
            />
          </div>
          <div className="p-2 flex justify-between">
            Verify Password
            <input
              type="password"
              name="verifyPassword"
              placeholder="********"
              id="verifyPassword"
              required
              value={verifyPW}
              onChange={(e) => {
                setVerifyPW(e.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            className="lg:m-2 my-4 w-full self-center border-4 rounded border-slate-300 hover:border-black hover:bg-orange-400"
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
