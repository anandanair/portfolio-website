import React, { useState } from "react";
import {
  Button,
  Alert,
  Box,
  Toolbar,
  IconButton,
  Typography,
  CssBaseline,
  styled,
  Drawer,
  Divider,
  useTheme,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Chip,
  Slide,
  Fade,
  Zoom,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import {
  Menu,
  ChevronLeft,
  ChevronRight,
  Inbox,
  DarkMode,
  LightMode,
  AccountCircle,
  Settings,
  Article,
  People,
} from "@mui/icons-material";
import { useFirestore } from "../contexts/FirestoreContext";
import { useLocalTheme } from "../contexts/ThemeContext";
import MuiAppBar from "@mui/material/AppBar";
import logo from "../images/logo_transparent.png";
import { useNavigate } from "react-router-dom";
const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export default function DrawerNavBar({ children }) {
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const { updateUser } = useFirestore();
  const { localTheme } = useLocalTheme();
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerList = [
    {
      label: "Account",
      icon: <AccountCircle />,
      divider: false,
      link: "/update-profile",
    },
    {
      label: "Inbox",
      icon: <Inbox />,
      divider: false,
      link: "/update-profile",
    },
    {
      label: "Portfolio",
      icon: <Article />,
      divider: false,
      link: "/update-profile",
    },
    {
      label: "Community",
      icon: <People />,
      divider: true,
      link: "/update-profile",
    },
    {
      label: "Settings",
      icon: <Settings />,
      divider: true,
      link: "/update-profile",
    },
  ];
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");
    try {
      await logout();
    } catch (error) {
      setError("Failed to logout!");
    }
  }

  const toggleDrawer = () => {
    setDrawerOpen(drawerOpen ? false : true);
  };

  function changeTheme() {
    const newTheme = localTheme === "light" ? "dark" : "light";
    updateUser("theme", newTheme);
  }

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          open={drawerOpen}
          style={{
            background: "transparent",
            boxShadow: "none",
          }}
        >
          <Toolbar variant="regular">
            <Box
              component="img"
              sx={{
                height: 50,
                width: 50,
                cursor: "pointer",
              }}
              src={logo}
              onClick={() => navigate("/")}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              onClick={() => navigate("/")}
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              APW
            </Typography>

            <Chip
              sx={{ ml: "auto", mr: "10px" }}
              className="normalText"
              label={localTheme === "light" ? "Light Mode" : "Dark Mode"}
              onClick={() => changeTheme()}
              icon={localTheme === "light" ? <LightMode /> : <DarkMode />}
            ></Chip>

            <Button
              variant="text"
              className="normalText"
              onClick={handleLogout}
            >
              Log Out
            </Button>
            <Fade in={!drawerOpen} timeout={200}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={toggleDrawer}
                sx={{ ...(drawerOpen && { display: "none" }) }}
              >
                <Menu />
              </IconButton>
            </Fade>
          </Toolbar>
        </AppBar>
        <Main open={drawerOpen}>
          <DrawerHeader />
          {children}
        </Main>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
            },
          }}
          variant="persistent"
          anchor="right"
          open={drawerOpen}
        >
          <DrawerHeader>
            <Slide direction="right" in={drawerOpen} timeout={400}>
              <IconButton onClick={toggleDrawer}>
                {theme.direction === "rtl" ? <ChevronLeft /> : <ChevronRight />}
              </IconButton>
            </Slide>
          </DrawerHeader>
          <Divider />
          <List>
            {drawerList.map((drawerObject, index) => (
              <div key={index}>
                {drawerObject.divider && (
                  <Divider
                    variant="middle"
                    sx={{ my: 1 }}
                    key={drawerObject.label + index}
                  />
                )}
                <ListItem key={drawerObject.label} disablePadding>
                  <Zoom in={drawerOpen} timeout={index * 200}>
                    <ListItemButton onClick={() => navigate(drawerObject.link)}>
                      <ListItemIcon>{drawerObject.icon}</ListItemIcon>
                      <ListItemText
                        className="normalText"
                        primary={drawerObject.label}
                      />
                    </ListItemButton>
                  </Zoom>
                </ListItem>
              </div>
            ))}
          </List>
        </Drawer>
      </Box>

      <div>{error && <Alert severity="error">{error}</Alert>}</div>
    </div>
  );
}
