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
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/useAuth";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

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
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Avatar sx={{ mr: 1 }}>{post.username[0].toUpperCase()}</Avatar>
          <Box>
            <Typography fontWeight="bold">{post.username}</Typography>
            <Typography variant="caption" color="text.secondary">
              {dayjs(post.createdAt).fromNow()}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Text Content */}
      {post.text && <Typography sx={{ mt: 1 }}>{post.text}</Typography>}

      {/* Image Content */}
      {post.image && (
        <Box mt={1}>
          <img
            src={post.image}
            alt="post"
            style={{
              width: "100%",
              borderRadius: 8,
              maxHeight: 400,
              objectFit: "cover",
            }}
          />
        </Box>
      )}

      {/* Actions */}
      <Box display="flex" alignItems="center" mt={1}>
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
        <Box
          key={c._id}
          display="flex"
          gap={1.5}
          mt={1.5}
          alignItems="flex-start"
        >
          <Avatar src={c.avatar} sx={{ width: 32, height: 32 }}>
            {!c.avatar && c.username[0].toUpperCase()}
          </Avatar>

          <Box>
            <Typography variant="body2" fontWeight="bold">
              {c.username}
            </Typography>

            <Typography variant="caption" color="text.secondary">
              {c.email} • {dayjs(c.createdAt).fromNow()}
            </Typography>

            <Typography variant="body2" sx={{ mt: 0.5 }}>
              {c.text}
            </Typography>
          </Box>
        </Box>
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
        <IconButton
          color="primary"
          onClick={commentHandler}
          disabled={!comment.trim()}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
}
