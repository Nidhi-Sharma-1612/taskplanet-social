import { Box, Container, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../services/api";
import Header from "../components/Header";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Load first page (or refresh feed)
  const loadInitialPosts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/posts?page=1&limit=5");
      setPosts(data);
      setPage(1);
      setHasMore(data.length === 5);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Load next page
  const loadMorePosts = async () => {
    try {
      const nextPage = page + 1;
      setLoading(true);

      const { data } = await api.get(`/posts?page=${nextPage}&limit=5`);

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prev) => [...prev, ...data]);
        setPage(nextPage);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Load feed on mount
  useEffect(() => {
    loadInitialPosts();
  }, []);

  return (
    <>
      <Header />

      <Container maxWidth="sm">
        <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
          Social Feed
        </Typography>

        {/* Create Post */}
        <CreatePost onPostCreated={loadInitialPosts} />

        {/* Posts */}
        <Box mt={2}>
          {posts.map((post) => (
            <PostCard key={post._id} post={post} onUpdate={loadInitialPosts} />
          ))}
        </Box>

        {/* Load More */}
        {hasMore && (
          <Box textAlign="center" mt={2} mb={2}>
            <Button
              variant="outlined"
              onClick={loadMorePosts}
              disabled={loading}
            >
              {loading ? "Loading..." : "Load more"}
            </Button>
          </Box>
        )}
      </Container>
    </>
  );
}
