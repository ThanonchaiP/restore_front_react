import {
  Alert,
  AlertTitle,
  Button,
  ButtonGroup,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useState } from "react";
import httpClient from "../../utils/httpClient";

type Props = {};

const About = (props: Props) => {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  function getValidationError() {
    httpClient.TestErrors.getValidationError()
      .then(() => console.log("should not see this"))
      .catch((error) => setValidationErrors(error));
  }

  return (
    <Container>
      <Typography gutterBottom variant="h2">
        Errors for testing
      </Typography>
      <ButtonGroup fullWidth>
        <Button variant="contained" onClick={() => httpClient.TestErrors.get400Error()}>
          Test 400
        </Button>
        <Button variant="contained" onClick={() => httpClient.TestErrors.get401Error()}>
          Test 401
        </Button>
        <Button variant="contained" onClick={() => httpClient.TestErrors.get404Error()}>
          Test 404
        </Button>
        <Button variant="contained" onClick={() => httpClient.TestErrors.get500Error()}>
          Test 500
        </Button>
        <Button variant="contained" onClick={getValidationError}>
          Test ValidationError
        </Button>
      </ButtonGroup>
      {validationErrors.length > 0 && (
        <Alert severity="error">
          <AlertTitle>Validation Errors</AlertTitle>
          <List>
            {validationErrors.map((error) => (
              <ListItem key={error}>
                <ListItemText>{error}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Alert>
      )}
    </Container>
  );
};

export default About;
