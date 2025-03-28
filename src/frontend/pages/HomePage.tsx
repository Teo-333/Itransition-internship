import { Button, Typography, Container } from "@mui/material";

const HomePage = () => (
  <Container className="mt-5">
    <Typography variant="h4" gutterBottom>
      Welcome to User Management
    </Typography>
    <Button variant="contained" color="primary">
      Manage Users
    </Button>
  </Container>
);

export default HomePage;