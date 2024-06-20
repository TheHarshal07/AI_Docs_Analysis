import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavLink, useNavigate, Link } from "react-router-dom";
import styles from "./dashboard.module.css";
import logo from "../../images/google.png";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import QuizIcon from '@mui/icons-material/Quiz';
import LogoutIcon from "@mui/icons-material/Logout";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import UserInfo from "../Pages/UserInfo";
import { HashLink } from "react-router-hash-link";

// navBar
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function dashboard(props) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  const LogOff = () => {
    navigate("/login");
  };
  

  

 
  return (
    <>
      {/* <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <h2 className="user" style={{ display: "flex" }}>
                Welcome <span> {props.name}</span>
              </h2>
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box> */}

      <div className="row">
        <div className="col-md-2">
          <nav className={`${styles.sidebar}`}>
            <header>
              <div className={styles.image_text}>
                <div className={styles.image_text_name}>
                  <span className={styles.name}>AutoDocs</span>
                </div>
              </div>
            </header>

            <div className={`${styles.menu_bar}`}>
              <div className={styles.menu}>
                <li className={styles.search_link}>
                  <SearchIcon className={styles.search} />
                  <input type="text" placeholder="Search...." />
                </li>
                {/* <ul className={styles.menu_links}> */}

                <li className={styles.nav_link}>
                  <a href="">
                    <HomeIcon className={styles.icon} />
                    <span className={styles.nav_text}><HashLink className={styles.name} to="#">Details</HashLink></span>
                  </a>
                </li>
                <li className={styles.nav_link}>
                  <a href="">
                    <QuizIcon className={styles.icon} />
                    <span className={styles.nav_text}><HashLink className={styles.name} to="#faq">FAQ</HashLink></span>
                  </a>
                </li>
              </div>

              <div className={styles.bottom_content}>
                <div className={styles.bottom_link}>
                  <li>
                    <a href="">
                      <LogoutIcon />
                      <span className={styles.bottom_text} onClick={LogOff}  >Logout</span>
                    </a>
                  </li>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
