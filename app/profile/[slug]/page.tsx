"use server";

import {
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Client } from "pg";

async function Profile({params}:{params:{slug:string}}) {
  const client = new Client(process.env.DATABASE_URL);
  let result;

  await client.connect();
  try {
    result = await client.query(`SELECT email,username FROM  rajinda_schema.userdev where id='${params.slug}'`);
    console.log(result.rows);
  } catch (err) {
    console.error("error executing query:", err);
  } finally {
    client.end();
  }

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
            width: "500px",
          }}
        >
              <Typography variant="h4">Welcome, {result?.rows[0].username}</Typography>
              <Divider></Divider>
              <Typography>user name: {result?.rows[0].username}</Typography>
              <Typography>email: {result?.rows[0].email}</Typography>
        </Paper>
      </Box>
    </>
  );
}

export default Profile;
