import {
  Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Modal,
  Radio,
  RadioGroup,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./ticketDetailModal.module.css";
import { useState } from "react";
import { Ticket } from "../../types/ticket";

export default function TicketDetailModal({
  showModal,
  setShowModal,
  ticket,
}: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  ticket: Ticket;
}) {
  const [form, setForm] = useState({
    response: "",
    status: ticket.status,
  });
  const [submitting, setSubmitting] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [error, setError] = useState("");
  const style = {
    position: "absolute" as "absolute",
    borderRadius: "4px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("trigger");
    e.preventDefault();
    setSubmitting(true);
    const copyOfResponses = [...ticket.response];
    copyOfResponses.push(form.response);
    const updatedTicket = {
      response: copyOfResponses,
      status: form.status,
    };
    try {
      const req = await fetch(`/api/tickets/${ticket._id}`, {
        method: "PUT",
        body: JSON.stringify(updatedTicket),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (req.ok) {
        setSubmitting(false);
        setNotifications(true);
        setShowModal(!showModal);
      }
    } catch (error) {
      setSubmitting(false);
      setError("Could not update ticket");
    }
  };

  return (
    <>
      {notifications && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={notifications}
          autoHideDuration={6000}
        >
          <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
            This ticket has been updated!
          </Alert>
        </Snackbar>
      )}

      <Modal
        open={showModal}
        onClose={() => setShowModal(!showModal)}
        aria-describedby="update-ticket"
      >
        <Box sx={style} onSubmit={handleOnSubmit} component="form">
          <Typography id="update-ticket" variant="h4" component="h2">
            Response:
          </Typography>
          <TextField
            margin="dense"
            required
            name="response"
            rows={3}
            fullWidth
            id="response"
            label="Response"
            multiline
            onChange={handleOnChange}
          />
          <FormControl margin="dense">
            <FormLabel id="status">Status</FormLabel>
            <RadioGroup
              row
              aria-labelledby="status"
              name="status"
              value={form.status}
              onChange={handleOnChange}
            >
              <FormControlLabel value="new" control={<Radio />} label="New" />
              <FormControlLabel
                value="in progress"
                control={<Radio />}
                label="In progress"
              />
              <FormControlLabel
                value="completed"
                control={<Radio />}
                label="Completed"
              />
            </RadioGroup>
          </FormControl>
          <div className={styles.buttons}>
            <Button
              disabled={submitting}
              variant="outlined"
              onClick={() => setShowModal(!showModal)}
              size="medium"
              color="error"
            >
              Cancel
            </Button>
            <Button
              disabled={submitting}
              variant="contained"
              size="medium"
              type="submit"
            >
              Update Ticket
            </Button>
          </div>
          {error && error}
        </Box>
      </Modal>
    </>
  );
}
