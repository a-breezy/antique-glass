import { useState, useEffect } from "react";
import axios from "axios";
import { Link, redirect } from "react-router-dom";
// import { MdOutlineAddBox } from "react-icons/md";
import Auth from "../../utils/auth.js";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("")

  const handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleFormSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const data = await axios.post("http://localhost:5555/login", credentials);

      if (data != null) {
        Auth.login(data.data.token);
        // reroute to dashboard with credentials if success
      }
      // else set message that there was an error
      else setError("Eemail or  passworare i nc")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-wrap justify-between items-center">
        <h1>Login</h1>
      </div>
      <form onSubmit={handleFormSubmit}>
        Email
        <input
          type="email"
          placeholder="enter"
          name="email"
          id="email"
          value={credentials.email}
          onChange={handleChange}
        />
        <br />
        Password
        <input
          type="password"
          name="password"
          placeholder="enter"
          id="password"
          value={credentials.password}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      {error ? <div>It seems like there was an error</div> : null}
    </div>
  );
}
