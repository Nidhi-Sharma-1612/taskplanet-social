import { Box, Button, Paper, TextField } from "@mui/material";
import { useState } from "react";
import api from "../services/api";

export default function CreatePost({ onPostCreated }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    if (!text.trim()) return;

    setLoading(true);
    await api.post("/posts", { text });
    setText("");
    setLoading(false);
    onPostCreated();
  };

  return (
    <Paper sx={{ p: 2 }}>
      <TextField
        fullWidth
        multiline
        rows={2}
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <Box textAlign="right" mt={1}>
        <Button variant="contained" onClick={submitHandler} disabled={loading}>
          Post
        </Button>
      </Box>
    </Paper>
  );
}
