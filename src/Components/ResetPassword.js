import * as React from "react";
import { useState, useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import { makeStyles } from "@mui/styles";
import "./Signup.css";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import insta from "../Assets/Instagram.JPG";
import { SettingsSystemDaydreamRounded } from "@material-ui/icons";
import { database, storage } from "../firebase";
export default function MultiActionAreaCard() {
  const useStyles = makeStyles({
    text1: {
      color: "grey",
      textAlign: "center",
    },
    card2: {
      marginTop: "2%",
    },
  });
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { reset } = useContext(AuthContext);
  const handleClick = async () => {
    try {
      setError("");
      setLoading(true);
      let res = await reset(email);
      setLoading(false);
      history.push("/login");
    } catch (err) {
      setError(err);
      setTimeout(() => {
        setError("");
      }, 2000);
      setLoading(false);
    }
  };
  return (
    <div className="signupWrapper">
      <div className="signupCard">
        <Card variant="outlined">
          <div className="insta-logo">
            <img src={insta} alt="" />
          </div>
          <CardContent>
            <Typography className={classes.text1} variant="subtitle1">
              Get an email to reset password
            </Typography>
            {error != "" && <Alert severity="error">{error}</Alert>}
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              fullWidth={true}
              margin="dense"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </CardContent>
          <CardActions>
            <Button
              color="primary"
              fullWidth={true}
              variant="contained"
              disabled={loading}
              onClick={handleClick}
            >
              Reset Password
            </Button>
          </CardActions>
        </Card>
        <Card variant="outlined" className={classes.card2}>
          <CardContent>
            <Typography className={classes.text1} variant="subtitle1">
              Back to{" "}
              <Link to="/login" style={{ textDecoration: "none" }}>
                Login
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
