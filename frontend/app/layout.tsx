import type { Metadata } from "next";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "E-Learning Platform",
  description: "Professional e-learning app built with Next.js & MUI",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Navbar /> {/* ✅ Client-safe navbar */}
        <Container sx={{ py: 4 }}>{children}</Container>
      </body>
    </html>
  );
}
