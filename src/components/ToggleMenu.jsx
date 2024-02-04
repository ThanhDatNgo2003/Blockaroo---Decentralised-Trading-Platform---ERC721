import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import LoginIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";

export default function ToggleMenu() {
  const [state, setState] = React.useState({
    left: false,
    isLoggedIn: false, // Add a state to track login status
  });

  const icons = [
    <SpaceDashboardIcon fontSize="large" sx={{ color: "#8A8B92" }} />,
    <CollectionsBookmarkIcon fontSize="large" sx={{ color: "#8A8B92" }} />,
    <LoginIcon fontSize="large" sx={{ color: "#8A8B92" }} />,
  ];

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const menuItems = ["Marketplace", "Profile", "Login"];

  const list = (anchor) => (
    <Box
      sx={{
        width: "400px",
        height: "100%",
        backgroundColor: "#080808",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List sx={{ margin: "100px 50px" }}>
        {menuItems.map((text, index) => (
          <React.Fragment key={text}>
            {text === "Profile" && !state.isLoggedIn ? null : (
              <Link
                to={`/${text.toLowerCase()}`}
                key={text}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItem key={text} disablePadding>
                  <ListItemButton sx={{ padding: "20px" }}>
                    <ListItemIcon>{icons[index]}</ListItemIcon>
                    <ListItemText
                      primary={text}
                      fontSize="large"
                      sx={{ color: "#8A8B92" }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton
        onClick={toggleDrawer("left", true)}
        size="large"
        edge="start"
        aria-label="open drawer"
        sx={{ color: "white" }}
      >
        <MenuIcon sx={{ fontSize: "28px" }} />
      </IconButton>
      <SwipeableDrawer
        anchor="left"
        open={state.left}
        onClose={toggleDrawer("left", false)}
        onOpen={toggleDrawer("left", true)}
      >
        {list("left")}
      </SwipeableDrawer>
    </div>
  );
}
