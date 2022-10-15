import React from "react";
import { Stack, Box } from "@mui/material";
import { VideoCard, ChannelCard } from "../components/index";
const Videos = ({ videos, direction }) => {
  if (videos?.length < 2) return "Loading...";
  return (
    <Stack
      direction={{ sm: "row", md: direction }}
      flexWrap="wrap"
      justifyContent={{ xs: "center", md: "start" }}
      gap={2}
    >
      {videos?.map((item, idx) => (
        <Box key={idx}>
          {item.id.videoId && <VideoCard video={item} />}
          {item.id.channelId && <ChannelCard channelDetail={item} />}
        </Box>
      ))}
    </Stack>
  );
};

export default Videos;
