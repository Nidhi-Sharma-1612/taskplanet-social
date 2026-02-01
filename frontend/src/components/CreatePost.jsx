import { Box, Button, Paper, TextField, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import CircularProgress from "@mui/material/CircularProgress";
import api from "../services/api";

export default function CreatePost({ onPostCreated }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const uploadImageToCloudinary = async () => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "taskplanet_posts");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dvzqdripg/image/upload",
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await res.json();
    return data.secure_url;
  };

  const submitHandler = async () => {
    if (!text.trim() && !imageFile) return;

    setLoading(true);

    let imageUrl = null;

    if (imageFile) {
      imageUrl = await uploadImageToCloudinary();
    }

    await api.post("/posts", {
      text,
      image: imageUrl,
    });

    setText("");
    setImageFile(null);
    setImagePreview(null);
    setLoading(false);
    onPostCreated();
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const isPostDisabled = loading || (!text.trim() && !imageFile);

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

      {/* Image preview */}
      {imagePreview && (
        <Box mt={1} position="relative">
          <img
            src={imagePreview}
            alt="preview"
            style={{ width: "100%", borderRadius: 8 }}
          />
          <IconButton
            size="small"
            onClick={removeImage}
            sx={{
              position: "absolute",
              top: 5,
              right: 5,
              backgroundColor: "rgba(0,0,0,0.6)",
              color: "#fff",
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      )}

      {/* Actions */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={1}
      >
        <IconButton component="label">
          <PhotoCamera />
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;

              setImageFile(file);
              setImagePreview(URL.createObjectURL(file));
            }}
          />
        </IconButton>

        <Button
          variant="contained"
          onClick={submitHandler}
          disabled={isPostDisabled}
          endIcon={
            loading ? (
              <CircularProgress size={18} color="inherit" />
            ) : (
              <SendIcon />
            )
          }
        >
          {loading ? "Posting..." : "Post"}
        </Button>
      </Box>
    </Paper>
  );
}
