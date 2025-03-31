import { Button, Typography, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* Animated Background */}
      <Box
        component="div"
        className="area"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          zIndex: -1,
        }}
      >
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            padding: 6,
            borderRadius: 4,
            textAlign: "center",
            backgroundColor: "white",
            maxWidth: 400,
            width: "100%",
          }}
        >
          <Typography variant="h4" gutterBottom color="primary">
            Welcome to User Management
          </Typography>
          <Button variant="contained" color="primary" onClick={handleClick}>
            Manage Users
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default HomePage;
