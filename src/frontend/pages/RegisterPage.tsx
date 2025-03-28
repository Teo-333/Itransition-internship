import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, TextField, Container, Typography } from "@mui/material";
import { registerUser } from "../services/AuthService";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await registerUser(email, password);
      navigate("/login");
    } catch (error: any) {
      alert(error.response.data.error || 'Registration failed.');
    }
  };

  return (
    <Container className="mt-10 space-y-4">
      <Typography variant="h4">Register</Typography>
      <TextField label="Email" fullWidth onChange={(e) => setEmail(e.target.value)} />
      <TextField label="Password" type="password" fullWidth onChange={(e) => setPassword(e.target.value)} />
      <Button variant="contained" onClick={handleRegister}>Register</Button>
      <Typography><Link to="/login">Login here</Link></Typography>
    </Container>
  );
};

export default RegisterPage;
