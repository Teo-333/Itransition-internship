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
      navigate("/dashboard");
    } catch (error: any) {
      alert(error.response.data.error || 'Login failed.');
    }
  };

  return (
    <Container className="mt-10 space-y-4 flex-col gap-4 flex w-full">
      <Typography variant="h4">Login</Typography>
      <TextField label="Email" type='email' fullWidth onChange={(e) => {setEmail(e.target.value); console.log('value changed', email)}} required />
      <TextField label="Password" type="password" fullWidth onChange={(e) => setPassword(e.target.value)} required  />
      <Button variant="contained" onClick={handleLogin}>Login</Button>
      <Typography><Link to="/register">Register here</Link></Typography>
    </Container>
  );
};

export default LoginPage;
