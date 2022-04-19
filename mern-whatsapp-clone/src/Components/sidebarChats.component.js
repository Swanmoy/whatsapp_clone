import React from "react";
import "../Css/sidebarChats.css";
import { Avatar } from "@mui/material";
function SidebarChats() {
  return (
    <div className='sidebarChat'>
      <Avatar />
      <div className='sidebarChat_info'>
        <h2>Room Name</h2>
        <p>This is the last chat</p>
      </div>
    </div>
  );
}

export default SidebarChats;
