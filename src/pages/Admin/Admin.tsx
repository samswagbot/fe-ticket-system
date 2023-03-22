import { CircularProgress, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import TicketListItem from "../../components/TicketListItem/TicketListItem";
import { Ticket } from "../../types/ticket";
import styles from "../container.module.css";

export default function Admin() {
  const [tickets, setTickets] = useState<Ticket[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getTickets = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/tickets");
      const data = await res.json();
      setTickets(data);
    } catch (error) {
      setError("Can not fetch tickets");
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getTickets();
  }, []);

  return (
    <div className={styles.container}>
      <Stack spacing={3}>
        {!loading && tickets ? (
          tickets.map((ticket) => (
            <TicketListItem key={ticket._id} ticket={ticket} />
          ))
        ) : (
          <CircularProgress />
        )}
        {!loading && !tickets && <div>There are no tickets at this time</div>}
      </Stack>
      {error && <div>{error}</div>}
    </div>
  );
}
