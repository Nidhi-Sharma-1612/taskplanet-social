import { Box, Container, Typography } from "@mui/material";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import { useEffect, useState } from "react";
import api from "../services/api";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const { data } = await api.get("/posts");
    setPosts(data);
  };

  useEffect(() => {
    let isMounted = true;

    const loadPosts = async () => {
      try {
        const { data } = await api.get("/posts");
        if (isMounted) {
          setPosts(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Container maxWidth="sm">
      <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
        Social Feed
      </Typography>

      <CreatePost onPostCreated={fetchPosts} />

      <Box mt={2}>
        {posts.map((post) => (
          <PostCard key={post._id} post={post} onUpdate={fetchPosts} />
        ))}
      </Box>
    </Container>
  );
}
