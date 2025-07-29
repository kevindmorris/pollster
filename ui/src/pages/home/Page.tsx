import { Button, Container, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router";

export default function HomePage() {
  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 12 }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Typography variant="h1"  gutterBottom>
          Welcome to Pollster
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
      >
        <Typography variant="subtitle1" color="text.secondary">
          Create and share polls instantly, and watch live results update in
          real-time. Whether for team decisions, event planning, or quick
          feedback, Pollster makes voting simple, fast, and transparent.
        </Typography>
      </motion.div>

      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      >
        <Stack direction="row" justifyContent="center" mt={6}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={Link}
            to="/polls"
            sx={{ px: 6 }}
          >
            View active polls
          </Button>
        </Stack>
      </motion.div>
    </Container>
  );
}
