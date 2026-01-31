import {
  Avatar,
  Box,
  IconButton,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/useAuth";

export default function PostCard({ post, onUpdate }) {
  const { user } = useAuth();
  const [comment, setComment] = useState("");

  const liked = post.likes.includes(user.username);

  const likeHandler = async () => {
    await api.post(`/posts/${post._id}/like`);
    onUpdate();
  };

  const commentHandler = async () => {
    if (!comment.trim()) return;
    await api.post(`/posts/${post._id}/comment`, { text: comment });
    setComment("");
    onUpdate();
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      {/* Header */}
      <Box display="flex" alignItems="center" mb={1}>
        <Avatar sx={{ mr: 1 }}>{post.username[0].toUpperCase()}</Avatar>
        <Typography fontWeight="bold">{post.username}</Typography>
      </Box>

      {/* Content */}
      <Typography sx={{ mb: 1 }}>{post.text}</Typography>

      {/* Actions */}
      <Box display="flex" alignItems="center">
        <IconButton onClick={likeHandler} color={liked ? "error" : "default"}>
          <FavoriteIcon />
        </IconButton>
        <Typography variant="body2">{post.likes.length}</Typography>

        <IconButton sx={{ ml: 1 }}>
          <ChatBubbleOutlineIcon />
        </IconButton>
        <Typography variant="body2">{post.comments.length}</Typography>
      </Box>

      {/* Comments */}
      {post.comments.map((c) => (
        <Typography key={c._id} variant="body2" sx={{ mt: 1 }}>
          <b>{c.username}:</b> {c.text}
        </Typography>
      ))}

      {/* Add Comment */}
      <Box mt={1} display="flex" gap={1}>
        <TextField
          size="small"
          fullWidth
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button variant="outlined" onClick={commentHandler}>
          Send
        </Button>
      </Box>
    </Paper>
  );
}
