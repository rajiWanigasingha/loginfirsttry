import type { Metadata } from "next";
import "@/app/ui/globals.css";
import { Container } from "@mui/material";
import Navbar from "./ui/components/navbar";

export const metadata: Metadata = {
  title: "Login-App",
  description: "Exproling login",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar></Navbar>
        <Container>{children}</Container>
      </body>
    </html>
  );
}
