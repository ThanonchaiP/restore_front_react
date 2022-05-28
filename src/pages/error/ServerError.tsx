import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {};

const ServerError = (props: Props) => {
  const navigate = useNavigate();
  const { state }: any = useLocation();
  return (
    <Container component={Paper} sx={{ py: "1rem" }}>
      {state ? (
        <>
          <Typography variant="h5" color="error" gutterBottom>
            {state?.title}
          </Typography>
          <Divider />
          <Typography>{state?.detail || "Internal server error"}</Typography>
        </>
      ) : (
        <Typography variant="h5" gutterBottom>
          Server error
        </Typography>
      )}
      <Button sx={{ mt: 2 }} onClick={() => navigate("/catalog")}>
        Go back to the store
      </Button>
    </Container>
  );
};

export default ServerError;
