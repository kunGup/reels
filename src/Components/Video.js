import React from "react";
import "./Video.css";
import ReactDOM from "react-dom";
function Video(props) {
  const handleClick = (e) => {
    e.preventDefault();
    e.target.muted = !e.target.muted;
  };
  const handleScroll = (e) => {
    let par = ReactDOM.findDOMNode(e.target).parentNode;
    let next = par.nextSibling;
    let first = par.parentNode.firstChild;
    if (next) {
      next.scrollIntoView({ behavior: "smooth" });
      e.target.muted = true;
    } else {
      first.scrollIntoView();
      e.target.muted = true;
    }
  };
  return (
    <video
      src={props.src}
      className="videos-styling"
      muted="muted"
      onEnded={handleScroll}
      onClick={handleClick}
    ></video>
  );
}

export default Video;
