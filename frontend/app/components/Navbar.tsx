"use client";
import React from "react";
import Link from "next/link";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

export default function Navbar() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link href="/" style={{ color: "#fff", textDecoration: "none" }}>
            E-Learning
          </Link>
        </Typography>

        <Button color="inherit" component={Link} href="/">
          Home
        </Button>
        <Button color="inherit" component={Link} href="/login">
          Login
        </Button>
        <Button color="inherit" component={Link} href="/signup">
          Sign Up
        </Button>
        <Button color="inherit" component={Link} href="/dashboard">
          Dashboard
        </Button>
      </Toolbar>
    </AppBar>
  );
}
