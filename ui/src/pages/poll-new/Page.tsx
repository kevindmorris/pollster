import { Api } from "@/services";
import { type Poll } from "@/types";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router";

const MotionCard = motion(Card);

export default function Page() {
  const api = new Api();
  const navigate = useNavigate();

  const [question, setQuestion] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubmit = async () => {
    if (!question.trim()) {
      setError("Question cannot be empty.");
      return;
    }

    try {
      setLoading(true);
      const createdPoll: Poll = await api.create(question);
      navigate(`/polls/${createdPoll.id}`);
    } catch (err) {
      console.error(err);
      setError("Failed to create poll. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <MotionCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        sx={{ width: "100%", maxWidth: 500, borderRadius: 4, boxShadow: 6 }}
      >
        <CardContent>
          <Stack spacing={4}>
            <Typography variant="h5" fontWeight={600} textAlign="center">
              Create a New Poll
            </Typography>

            <TextField
              label="Poll Question"
              placeholder="What do you want to ask?"
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value);
                setError("");
              }}
              fullWidth
              error={Boolean(error)}
              helperText={error}
            />

            <Button
              onClick={handleSubmit}
              variant="contained"
              size="large"
              disabled={loading}
              fullWidth
            >
              {loading ? <CircularProgress size={24} /> : "Create Poll"}
            </Button>
          </Stack>
        </CardContent>
      </MotionCard>
    </Box>
  );
}
