import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "../firebase";
import CircularProgress from "@mui/material/CircularProgress";
import Navbar from "./Navbar";
import Typography from "@mui/material/Typography";
import "./Profile.css";
import Like2 from "./Like2";
import Video from "./Video";
import Comments from "./Comments";
import "./Posts.css";
import Like from "./Like";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AddComment from "./AddComment";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, CardActions } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import Avatar from "@mui/material/Avatar";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
function Profile() {
  const { id } = useParams();
  const [userData, setUserdata] = useState(null);
  const [posts, setPosts] = useState(null);
  const [open, setOpen] = useState(null);

  const handleClickOpen = (id) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen(null);
  };
  useEffect(() => {
    database.users.doc(id).onSnapshot((snap) => {
      setUserdata(snap.data());
    });
  }, [id]);
  useEffect(async () => {
    if (userData != null) {
      let parr = [];
      for (let i = 0; i < userData.postIds.length; i++) {
        let postData = await database.posts.doc(userData.postIds[i]).get();
        parr.push({ ...postData.data(), postId: postData.id });
      }
      setPosts(parr);
    }
  });
  return (
    <>
      {posts == null || userData == null ? (
        <CircularProgress />
      ) : (
        <>
          <Navbar userData={userData} />
          <div className="spacer"></div>
          <div className="container">
            <div className="upper-part">
              <div className="profile-img">
                <img src={userData.profileUrl} alt="" />
              </div>
              <div className="info">
                <Typography variant="h5">Email: {userData.email}</Typography>
                <Typography variant="h6">
                  Posts: {userData.postIds.length}
                </Typography>
              </div>
            </div>
            <hr style={{ marginTop: "3rem", marginBottom: "3rem" }} />
            <div className="profile-videos">
              {posts.map((post, index) => (
                <React.Fragment key={index}>
                  <div className="videos">
                    <video
                      onClick={() => handleClickOpen(post.pId)}
                      muted="muted"
                    >
                      <source src={post.pUrl} />
                    </video>
                    <Dialog
                      open={open == post.pId}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                      fullWidth={true}
                      maxWidth="md"
                    >
                      <div className="modal-container">
                        <div className="video-modal">
                          <video autoplay={true} muted="muted" controls>
                            <source src={post.pUrl} />
                          </video>
                        </div>
                        <div className="comment-modal">
                          <Card className="card1" style={{ padding: "1rem" }}>
                            <Comments postData={post} />
                          </Card>
                          <Card variant="outlined" className="card2">
                            <Typography style={{ padding: "0.4rem" }}>
                              {post.likes.length == 0
                                ? ""
                                : `Liked by ${post.likes.length}`}
                            </Typography>
                            <div style={{ display: "flex" }}>
                              <Like2
                                postData={post}
                                userData={userData}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              />
                              <AddComment userData={userData} postData={post} />
                            </div>
                          </Card>
                        </div>
                      </div>
                    </Dialog>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Profile;
