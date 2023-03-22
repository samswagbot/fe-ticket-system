import {
  Alert,
  Button,
  Snackbar,
  Stack,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { useState } from "react";
import styles from "../container.module.css";

export default function Home() {
  const [notifications, setNotifications] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const req = await fetch("/api/tickets", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (req.ok) {
        setSubmitting(false);
        setNotifications(true);
      }
    } catch (error) {
      setSubmitting(false);
      setError("Could not submit ticket");
    }
  };
  return (
    <div>
      {notifications && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={notifications}
          autoHideDuration={6000}
        >
          <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
            Your ticket has been submitted successfully!
          </Alert>
        </Snackbar>
      )}
      <div className={styles.container}>
        <Box onSubmit={handleOnSubmit} component="form">
          <Typography variant="h5">Submit a ticket</Typography>
          <Stack
            spacing={2}
            sx={{
              width: { xs: 450, sm: 500 },
            }}
          >
            <TextField
              margin="normal"
              fullWidth
              required
              name="name"
              id="name"
              label="Name"
              onChange={handleOnChange}
            />

            <TextField
              margin="normal"
              type="email"
              name="email"
              required
              id="email"
              label="Email"
              onChange={handleOnChange}
            />

            <TextField
              margin="normal"
              required
              name="description"
              id="description"
              label="Issue Description"
              multiline
              onChange={handleOnChange}
            />
            <Button
              disabled={submitting}
              type="submit"
              size="large"
              variant="contained"
              fullWidth
            >
              Submit
            </Button>
            {error && error}
          </Stack>
        </Box>
      </div>
    </div>
  );
}
