import { useTheme } from "@emotion/react";
import React from "react";
import FlexBetween from "./FlexBetween";
import { Box, IconButton,Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { setFriends } from "state";
import UserImage from "./UserImage";
import { useNavigate } from "react-router-dom";

const Friend = ({ friendId, friendPicturePath, name, subtitle,isProfile }) => {
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const navigate = useNavigate();

  
  const friends = useSelector((state) => state.user.friends);
  const isFriend = friends.find((friend) => friend._id === friendId);

  const { _id } = useSelector((state) => state.user);
  const isLoggedInUser= Boolean(_id===friendId);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  //add/remove friend on current user
  const patchFriend = async () => {
    const response = await fetch(`https://social-media-fullstack-hyy9.onrender.com/users/${_id}/${friendId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
    // this will set state.user.friends as given data
  };
  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={friendPicturePath} size="55px" />
        <Box
          onClick={()=>{
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {isLoggedInUser || isProfile ?(<></>):(
         <IconButton
         onClick={() => patchFriend()}
         sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
       >
         {isFriend ? (
           <PersonRemoveOutlined sx={{ color: primaryDark }} />
         ) : (
           <PersonAddOutlined sx={{ color: primaryDark }} />
         )}
       </IconButton>
      )}
     
    </FlexBetween>
  );
};

export default Friend;
