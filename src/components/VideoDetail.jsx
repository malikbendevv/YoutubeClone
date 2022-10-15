import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Box, Typography, Stack } from "@mui/material";
import { fetchFromApi } from "../utils/fetchFromApi";
import { CheckCircle } from "@mui/icons-material";
import Videos from "./Videos";

const VideoDetail = () => {
  const [video, setVideo] = useState([null]);
  const [recommendedVideos, setRecomendedVideos] = useState([null]);

  const { id } = useParams();
  useEffect(() => {
    fetchFromApi(`videos?part=snippet,statistics&id=${id}`).then((data) => {
      setVideo(data);
    });
    fetchFromApi(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => {
        setRecomendedVideos(data);
      }
    );
  }, [id]);
  if (!video[0]?.snippet && !video[0]?.statistics) {
    return "Loading ...";
  }

  const {
    snippet: { title, channelTitle },
    statistics: { viewCount, likeCount },
  } = video[0];

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ Width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer
              url={`https://youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography color="#fff" variant="h5" fontWeight="bold" padding={2}>
              {title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "#fff" }}
              px={1}
              py={2}
            >
              <Link to={`/channel/${video[0]?.snippet?.channelId}`}>
                <Typography
                  variant={{ sm: "subtitle", md: "h6", color: "#fff" }}
                >
                  {channelTitle}
                  <CheckCircle
                    sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                  />
                </Typography>{" "}
              </Link>
              <Stack>
                <Typography variant="body1" sx={{ opacity: "0.7" }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: "0.7" }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          <Videos videos={recommendedVideos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
