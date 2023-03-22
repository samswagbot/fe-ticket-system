import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";

export default function Response({
  response,
  index,
}: {
  response: string;
  index: number;
}) {
  return (
    <Accordion
      sx={{
        width: { xs: 400, sm: 500 },
        mt: 2,
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Response {index + 1}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{response}</Typography>
      </AccordionDetails>
    </Accordion>
  );
}
