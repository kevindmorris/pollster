import { AddRounded, ExpandMore, PollRounded } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
} from "@mui/material";
import React from "react";
import { Link } from "react-router";

export default function Nav() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: "transparent",
        backdropFilter: "blur(10px)",
        color: "black",
        borderBottomColor: "divider",
        borderBottomStyle: "solid",
        borderBottomWidth: "thin",
      }}
    >
      <Toolbar>
        <Container maxWidth="lg">
          <Stack direction="row" gap={2} alignItems="center">
            <IconButton component={Link} to="/" sx={{ color: "inherit" }}>
              <PollRounded />
            </IconButton>
            <Button component={Link} to="/polls" sx={{ color: "inherit" }}>
              Polls
            </Button>
            <Box sx={{ ml: "auto" }}>
              <Button
                onClick={handleOpenMenu}
                variant="outlined"
                sx={{
                  color: "inherit",
                  borderColor: "rgba(0, 0, 0, 0.2)",
                  minWidth: "auto",
                  px: 1,
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "rgba(0,0,0,0.04)",
                    borderColor: "rgba(0, 0, 0, 0.4)",
                  },
                }}
              >
                <AddRounded sx={{ fontSize: 20, mr: 0.25 }} />
                <ExpandMore
                  sx={{
                    fontSize: 20,
                    transform: open ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease-in-out",
                  }}
                />
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                slotProps={{
                  paper: {
                    elevation: 3,
                    sx: {
                      mt: 1,
                      borderRadius: 2,
                      minWidth: 180,
                      boxShadow:
                        "0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)",
                    },
                  },
                }}
              >
                <MenuItem
                  component={Link}
                  to="/polls/new"
                  onClick={handleCloseMenu}
                  sx={{
                    fontWeight: 500,
                    px: 2.5,
                    py: 1,
                    "&:hover": {
                      backgroundColor: "rgba(0,0,0,0.04)",
                    },
                  }}
                >
                  Create a New Poll
                </MenuItem>
              </Menu>
            </Box>
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
