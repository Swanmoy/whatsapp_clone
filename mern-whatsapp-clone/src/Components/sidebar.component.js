import React from "react";
import "../Css/sidebar.css";
import ChatIcon from "@mui/icons-material/Chat";
import { IconButton, Avatar } from "@mui/material";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import avatarImg from "../Images/avatar.jpg";
import SearchIcon from "@mui/icons-material/Search";
import SidebarChats from "./sidebarChats.component.js";
export default function Sidebar(props) {
  return (
    <div className='sidebar'>
      <div className='sidebar_header'>
        <Avatar
          src={avatarImg}
          onClick={() => {
            props.setShow(!props.show);
          }}
        />
        <div className='siderbar_headerRight'>
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon
              onClick={() => {
                props.setShowLogoutComponent(!props.showLogoutComponent);
              }}
            />
          </IconButton>
        </div>
      </div>
      <div className='sidebar_search'>
        <div className='sidebar_searchContainer'>
          <SearchIcon />
          <input type='text' placeholder='Search or Start a new Chat' />
        </div>
      </div>
      <div className='sidebar_chats'>
        <SidebarChats />
        <SidebarChats />
        <SidebarChats />
        <SidebarChats />
        <SidebarChats />
        <SidebarChats />
      </div>
    </div>
  );
}
