import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, TextField, Container, Typography, Paper } from "@mui/material";
import { registerUser } from "../services/AuthService";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(email, password);
      navigate("/login");
    } catch (error: any) {
      alert(error.response.data.error || "Registration failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-200 via-teal-200 to-blue-200 flex items-center justify-center w-full">
      <Container maxWidth="sm">
        <Paper elevation={3} className="p-8 shadow-xl rounded-xl">
          <Typography variant="h4" align="center" className="mb-6 font-semibold">
            Create an Account
          </Typography>
          <form className="gap-4 pt-6 flex flex-col" onSubmit={handleRegister}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              type="submit"
            >
              Register
            </Button>
            <Typography className="text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-600 font-medium">
                Login here
              </Link>
            </Typography>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default RegisterPage;
