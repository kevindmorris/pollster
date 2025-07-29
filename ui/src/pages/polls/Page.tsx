import { Api } from "@/services";
import { type Poll } from "@/types";
import {
  Box,
  CircularProgress,
  List,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router";
import SockJS from "sockjs-client";
import webstomp from "webstomp-client";

const MotionBox = motion(Box);

export default function Page() {
  const api = new Api();

  const [loading, setLoading] = React.useState(false);
  const [polls, setPolls] = React.useState<Poll[]>([]);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const allPolls = await api.getAll();
        setPolls(allPolls);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  React.useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = webstomp.over(socket);

    client.connect({}, () => {
      polls.forEach((poll) => {
        client.subscribe(`/topic/poll/${poll.id}`, (message) => {
          const updatedPoll: Poll = JSON.parse(message.body);
          setPolls((prev) =>
            prev.map((p) => (p.id === updatedPoll.id ? updatedPoll : p)),
          );
        });
      });
    });

    return () => {
      if (client.connected) {
        client.disconnect();
      }
    };
  }, [polls.map((p) => p.id).join(",")]);

  const filteredPolls = polls.filter((poll) =>
    poll.question.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress size={64} />
      </Box>
    );
  }

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        width: "100%",
        pt: 12,
      }}
    >
      <Box mb={3}>
        <TextField
          fullWidth
          variant="outlined"
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="e.g. Do you like goldfish?"
          autoFocus
          autoComplete="off"
        />
      </Box>
      <List disablePadding>
        {filteredPolls.length === 0 ? (
          <Typography variant="body2" color="text.secondary" textAlign="center">
            No polls match your search.
          </Typography>
        ) : (
          filteredPolls.map((poll, i) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
            >
              <MenuItem
                key={poll.id}
                component={Link}
                to={`/polls/${poll.id}`}
                color="text.primary"
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  px: 2,
                  py: 1.5,
                  transition: "all 0.2s",
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
              >
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" fontWeight={600}>
                      {poll.question}
                    </Typography>
                  }
                  secondary={
                    <Stack direction="row" spacing={2} mt={0.5}>
                      <Typography
                        variant="caption"
                        color="success.main"
                        fontWeight={500}
                      >
                        Yes: {poll.numYes}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="error.main"
                        fontWeight={500}
                      >
                        No: {poll.numNo}
                      </Typography>
                    </Stack>
                  }
                />
              </MenuItem>
            </motion.div>
          ))
        )}
      </List>
    </MotionBox>
  );
}
