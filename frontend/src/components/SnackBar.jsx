import Snackbar from "@mui/material/Snackbar";
import Box from "@mui/material/Box";
import React from "react";

const SnackBar = ({ message, vertical = "bottom", horizontal = "right" }) => {
  const [open, setOpen] = React.useState(true);
  setTimeout(() => {
    setOpen(false);
  }, 3000);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={message}
        key={vertical + horizontal}
      />
    </Box>
  );
};

export default SnackBar;
