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
import { singuptologin } from "../action";
import { useFormState } from "react-dom";

const initielState = { message: "" };

export default function Singup() {
  const [errors, formAction] = useFormState(singuptologin, initielState);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          marginTop: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 3,
            gap: 3,
            width: "auto",
          }}
        >
          <Typography variant="h4">Welcome to login.io</Typography>
          <Divider></Divider>
          <form
            action={formAction}
            style={{
              display: "flex",
              flexDirection: "column",
              padding: 3,
              width: "500px",
            }}
          >
            { 
            errors?.message &&
              <Alert
                severity="error"
                variant="filled"
              >
                {errors?.message}
              </Alert>
            }

            <TextField
              label="Enter your user name"
              sx={{ my: 1 }}
              name="username"
            ></TextField>
            <TextField
              label="Enter your email address"
              sx={{ my: 1 }}
              name="email"
            ></TextField>
            <TextField
              label="Enter your password"
              sx={{ my: 1 }}
              name="password"
            ></TextField>
            <Button
              variant="contained"
              color="primary"
              sx={{ my: 1, p: 1 }}
              type="submit"
            >
              Let's create an account
            </Button>
          </form>
          <Typography>
            I have an account already
            <Link href={"/login"} style={{ padding: "5px" }}>
              Click me
            </Link>
          </Typography>
        </Paper>
      </Box>
    </>
  );
}
