import { Button } from "@mui/material";
import { Ticket } from "../../types/ticket";
import styles from "./ticket.module.css";

export default function TicketListItem({
  ticket,
  index,
}: {
  ticket: Ticket;
  index: number;
}) {
  const { description, name, status, email } = ticket;
  return (
    <div className={styles.ticket}>
      <h1 className={styles.title}>Ticket {index + 1}</h1>
      <div className={styles.content}>
        <div className={styles.details}>
          <div>
            <p>
              <strong>Name: </strong>
              <span>{name}</span>
            </p>
            <p>
              <strong>Issue Description: </strong>
              <span>{description}</span>
            </p>
          </div>
          <div>
            <p>
              <strong>Status: </strong>
              <span>{status}</span>
            </p>
            <p>
              <strong>Email: </strong>
              <span>{email}</span>
            </p>
          </div>
        </div>
        <Button fullWidth variant="contained">
          See more
        </Button>
      </div>
    </div>
  );
}
