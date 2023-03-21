import { Button } from "@mui/material";
import styles from "./nav.module.css";

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <Button
        sx={{
          marginRight: 2,
        }}
        color="inherit"
        href="/"
        variant="outlined"
      >
        Submit Ticket
      </Button>
      <Button color="inherit" variant="outlined" href="/admin">
        Admin Panel
      </Button>
    </nav>
  );
}
