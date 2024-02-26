import React from "react";
import Navbar from "scenes/navbar";
import { Box, useMediaQuery } from "@mui/material";
import UserWidget from "scenes/widgets/UserWidget";
import { useSelector } from "react-redux";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const {_id, picturePath}=useSelector((state)=>state.user);
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        {/* first section */}
        <Box 
          flexBasis={isNonMobileScreens? "26%": undefined}
        >
          {/* we need userid to extract user info */}
          <UserWidget userId={_id} picturePath={picturePath}/>
        </Box>
        {/* middle posts section */}
        <Box flexBasis={isNonMobileScreens? "42%": undefined}>
          <MyPostWidget picturePath={picturePath}/>
          {/* this id so we can get posts of this id only if its profile */}
          <PostsWidget userId={_id}/>
        </Box>
        {/* friends secttion only visible on desktop */}
        {isNonMobileScreens && <Box flexBasis={isNonMobileScreens? "26%": undefined} >
        <FriendListWidget userId={_id} />
          </Box>}
      </Box>
    </Box>
  );
};

export default HomePage;
