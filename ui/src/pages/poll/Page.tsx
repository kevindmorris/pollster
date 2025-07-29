import { Api } from "@/services";
import type { Poll } from "@/types";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CircularProgress,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import { useParams } from "react-router";
import SockJS from "sockjs-client";
import webstomp from "webstomp-client";

const MotionCard = motion(Card);
const MotionStack = motion(Stack);

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const api = new Api();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [poll, setPoll] = React.useState<Poll | null>(null);

  const fetchPoll = async () => {
    try {
      setLoading(true);
      const pollData = await api.get(Number(id));
      setPoll(pollData);
    } catch (error) {
      console.error("Failed to fetch poll", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (!id) return;
    fetchPoll();

    const socket = new SockJS("http://localhost:8080/ws");
    const client = webstomp.over(socket);
    client.connect({}, () => {
      client.subscribe(`/topic/poll/${id}`, (msg) => {
        const data = JSON.parse(msg.body);
        setPoll(data);
      });
    });

    return () => {
      if (client.connected) {
        client.disconnect();
      } else {
        socket.close();
      }
    };
  }, [id]);

  const vote = async (type: "yes" | "no") => {
    if (!poll) return;
    const updated =
      type === "yes" ? await api.voteYes(poll.id) : await api.voteNo(poll.id);
    setPoll(updated);
  };

  if (loading || !poll) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress size={64} thickness={5} />
      </Box>
    );
  }

  const totalVotes = poll.numYes + poll.numNo || 1;
  const yesPercentage = (poll.numYes / totalVotes) * 100;
  const noPercentage = (poll.numNo / totalVotes) * 100;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MotionCard
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        sx={{
          width: "100%",
          maxWidth: 500,
          p: 4,
          borderRadius: 4,
          boxShadow: 8,
          background: "white",
        }}
      >
        <CardContent>
          <Stack spacing={4}>
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Typography
                variant="h1"
                fontWeight={700}
                textAlign="center"
                fontSize="2rem"
              >
                {poll.question}
              </Typography>
            </motion.div>

            <MotionStack
              spacing={2}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="subtitle2" color="text.secondary">
                  Yes
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {poll.numYes}
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={yesPercentage}
                sx={{ height: 10, borderRadius: 5, backgroundColor: "#e0f2f1" }}
                color="success"
              />

              <Stack direction="row" justifyContent="space-between" mt={2}>
                <Typography variant="subtitle2" color="text.secondary">
                  No
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {poll.numNo}
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={noPercentage}
                sx={{ height: 10, borderRadius: 5, backgroundColor: "#ffebee" }}
                color="error"
              />
            </MotionStack>

            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <ButtonGroup fullWidth variant="contained" size="large">
                <Button
                  color="success"
                  onClick={() => vote("yes")}
                  sx={{ fontWeight: 600 }}
                >
                  Vote Yes
                </Button>
                <Button
                  color="error"
                  onClick={() => vote("no")}
                  sx={{ fontWeight: 600 }}
                >
                  Vote No
                </Button>
              </ButtonGroup>
            </motion.div>
          </Stack>
        </CardContent>
      </MotionCard>
    </Box>
  );
}
