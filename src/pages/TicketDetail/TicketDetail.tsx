import { useEffect, useState, useCallback } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CircularProgress,
} from "@mui/material";
import { Ticket } from "../../types/ticket";
import { useParams } from "react-router-dom";
import styles from "../container.module.css";
import ticketStyles from "./ticketDetail.module.css";
import TicketDetailModal from "../../components/TicketDetailModal/TicketDetailModal";
import Response from "../../components/Response/Response";

export default function TicketDetail() {
  const { id } = useParams();

  const [ticket, setTickets] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  const getTicket = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://ticket-system.herokuapp.com/api/tickets/${id}`
      );
      const data = await res.json();
      setTickets(data);
    } catch (error) {
      setError("Can not fetch ticket");
      console.error(error);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    getTicket();
  }, [getTicket, showModal]);

  return (
    <>
      <div className={styles.container}>
        {!loading && ticket ? (
          <Card
            sx={{
              maxWidth: 800,
              minWidth: { sm: 400, md: 500 },
              padding: { sm: 1, md: 2 },
            }}
          >
            <CardContent>
              <div className={ticketStyles.title}>
                <Typography variant="h4" gutterBottom>
                  <strong>Ticket Detail</strong>
                </Typography>
                <Typography variant="h6" gutterBottom>
                  <strong>Status: </strong>
                  {ticket.status}
                </Typography>
              </div>
              <Typography sx={{ mb: 1 }} variant="body2" color="text.secondary">
                <strong>Id: </strong>
                {ticket._id}
              </Typography>
              <Typography
                sx={{ mb: 1 }}
                variant="body2"
                color="text.secondary"
                component="div"
              >
                <strong>Name: </strong>
                {ticket.name}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }} color="text.secondary">
                <strong>Email: </strong>
                {ticket.email}
              </Typography>
              <Typography>
                <strong>Description: </strong>
                {ticket.description}
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "end",
              }}
            >
              <Button
                variant="outlined"
                onClick={() => setShowModal(!showModal)}
                size="medium"
              >
                Respond
              </Button>
            </CardActions>
          </Card>
        ) : (
          <CircularProgress />
        )}
        {error && <div>{error}</div>}
        {ticket && (
          <TicketDetailModal
            ticket={ticket}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
      </div>
      {ticket?.response && (
        <div className={ticketStyles.response}>
          {ticket.response.map((response, index) => (
            <Response index={index} response={response} key={index} />
          ))}
        </div>
      )}
    </>
  );
}
