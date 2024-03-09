import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "next/link";

function Navbar() {
  return (
    <>
      <AppBar>
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <IconButton color="inherit">
            <LoginIcon></LoginIcon>
            <Typography variant="h5" sx={{ px: 1 }}>
              Login.io
            </Typography>
          </IconButton>

          <IconButton color="inherit">
            <Link href={"/profile"}>
              <AccountCircleIcon></AccountCircleIcon>
            </Link>
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
