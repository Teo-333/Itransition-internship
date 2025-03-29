import { Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate(); 

  const handleClick = () => {
    navigate("/login"); 
  };

  return (
    <Container className="mt-5">
      <Typography variant="h4" gutterBottom>
        Welcome to User Management
      </Typography>
      <Button variant="contained" color="primary" onClick={handleClick}>
        Manage Users
      </Button>
    </Container>
  );
};

export default HomePage;
