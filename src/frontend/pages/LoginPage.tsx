import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, TextField, Container, Typography } from "@mui/material";
import { loginUser } from "../services/AuthService";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error: any) {
      alert(error.response.data.error || 'Login failed.');
    }
  };

  return (
    <Container className="mt-10 space-y-4">
      <Typography variant="h4">Login</Typography>
      <TextField label="Email" fullWidth onChange={(e) => setEmail(e.target.value)} />
      <TextField label="Password" type="password" fullWidth onChange={(e) => setPassword(e.target.value)} />
      <Button variant="contained" onClick={handleLogin}>Login</Button>
      <Typography><Link to="/register">Register here</Link></Typography>
    </Container>
  );
};

export default LoginPage;
