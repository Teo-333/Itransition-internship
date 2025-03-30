import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, TextField, Container, Typography, Paper } from "@mui/material";
import { loginUser } from "../services/AuthService";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (error: any) {
      const errorText = error.response.data.error || "Login failed.";
      setErrorMessage(errorText);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 flex items-center justify-center w-full">
      <Container maxWidth="sm">
        <Paper elevation={3} className="p-8 shadow-xl rounded-xl">
          <Typography variant="h4" align="center" className="mb-6 font-semibold">
            Welcome Back
          </Typography>

          <form className="gap-4 pt-6 flex flex-col" onSubmit={handleLogin}>
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

            {errorMessage.includes("blocked") && (
              <Typography className="text-center text-orange-500 font-medium">
                {errorMessage}
              </Typography>
            )}

            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              type="submit"
            >
              Login
            </Button>

            <Typography className="text-center mt-4">
              Don't have an account?{" "}
              <Link to="/register" className="text-indigo-600 font-medium">
                Register here
              </Link>
            </Typography>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default LoginPage;