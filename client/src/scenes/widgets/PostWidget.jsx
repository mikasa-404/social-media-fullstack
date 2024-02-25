import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import React from "react";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        friendPicturePath={userPicturePath}
        name={name}
        subtitle={location}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`/assets/${picturePath}`}
        />
      )}
      
    </WidgetWrapper>
  );
};

export default PostWidget;
