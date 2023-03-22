import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Ticket } from "../../types/ticket";
import styles from "./ticket.module.css";

export default function TicketListItem({ ticket }: { ticket: Ticket }) {
  const { description, name, status, email, _id } = ticket;
  const navigate = useNavigate();
  return (
    <div className={styles.ticket}>
      <h2 className={styles.title}>Ticket: {_id}</h2>
      <div className={styles.content}>
        <div className={styles.details}>
          <p>
            <strong>Name: </strong>
            <span>{name}</span>
          </p>

          <p>
            <strong>Status: </strong>
            <span>{status}</span>
          </p>
          <p>
            <strong>Email: </strong>
            <span>{email}</span>
          </p>
          <p className={styles.desc}>
            <strong>Issue Description: </strong>
            <span>{description}</span>
          </p>
        </div>
        <Button
          onClick={() => navigate(`/admin/${_id}`)}
          fullWidth
          variant="contained"
        >
          See more
        </Button>
      </div>
    </div>
  );
}
