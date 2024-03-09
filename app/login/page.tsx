"use client";

import {
  Alert,
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { login } from "../action";
import { useFormState } from "react-dom";
import { Suspense } from "react";

const initielState = { message: "" };

function Login() {
  const [errors, formAction] = useFormState(login, initielState);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <form action={formAction}>
          <Paper
            elevation={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 3,
              gap: 3,
              width: "500px",
            }}
          >
            <Typography variant="h4">Login into your profile</Typography>
            <Divider></Divider>
            {errors?.message && (
              <Alert severity="error" variant="filled">
                {errors?.message}
              </Alert>
            )}
            <TextField
              label="Enter your email address"
              required
              name="email"
              type="email"
            ></TextField>
            <TextField
              label="Enter your password"
              required
              name="password"
              type="password"
            ></TextField>
            <Button variant="contained" color="primary" type="submit">
              Let's login
            </Button>
            <Typography>
              Don't have an account <Link href={"/signup"}>Click me</Link>
            </Typography>
          </Paper>
        </form>
      </Box>
    </>
  );
}

export default Login;
