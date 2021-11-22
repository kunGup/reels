import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { makeStyles } from "@mui/styles";
import insta from "../Assets/Instagram.JPG";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import Avatar from "@mui/material/Avatar";
const useStyles = makeStyles({
  appb: {
    background: "white",
  },
});
export default function Navbar({ userData }) {
  console.log(userData);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const history = useHistory();
  const classes = useStyles();
  const { logout } = React.useContext(AuthContext);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleProfile = () => {
    history.push(`/profile/${userData.userId}`);
  };
  const handleLogout = async () => {
    await logout();
    history.push("/login");
  };
  const handlebannerclick = () => {
    history.push(`/`);
  };
  const handleexplore = () => {
    let win = window.open("https://www.google.com", "_blank");
    win.focus();
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfile}>
        <AccountCircleIcon />
        <p>&nbsp;&nbsp;</p>Profile
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <ExitToAppIcon />
        <p>&nbsp;&nbsp;</p>Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfile}>
        <AccountCircleIcon />
        <p>&nbsp;&nbsp;</p>Profile
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <ExitToAppIcon />
        <p>&nbsp;&nbsp;</p>Logout
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        className={classes.appb}
        sx={{ background: "white" }}
      >
        <Toolbar>
          <div
            style={{ marginLeft: "5%", display: "flex", alignItems: "center" }}
          >
            <img
              src={insta}
              style={{ width: "20vh", cursor: "pointer" }}
              onClick={handlebannerclick}
            />
          </div>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              color: "black",
              alignItems: "center",
              marginRight: "4rem",
            }}
          >
            <HomeIcon
              onClick={handlebannerclick}
              sx={{ marginRight: "1.5rem", cursor: "pointer" }}
            />
            <ExploreIcon
              onClick={handleexplore}
              sx={{ marginRight: "1rem", cursor: "pointer" }}
            />
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar
                src={userData.profileUrl}
                sx={{ height: "2rem", width: "2rem", cursor: "pointer" }}
              />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              sx={{ color: "black" }}
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
