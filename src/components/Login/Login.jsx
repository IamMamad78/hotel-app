import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("mamadi78.94@gmail.com");
  const [password, setPassword] = useState("123456789");
  const navigate = useNavigate();
  const { user, login, isAuthenticated } = useAuth();
  const handleForm = (e) => {
    e.preventDefault();
    if (email && password) login(email, password);
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  return (
    <div className="loginContainer">
      <h2>Login</h2>
      <form onSubmit={handleForm} className="form">
        <div className="formControl">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="formControl">
          <label htmlFor="">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="buttons">
          <button className="bookmarkBtn btn--primary">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
