import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "./Modal.css";

const isDarkMode = () => {
  const theme = localStorage.getItem("theme");
  return theme === "dark";
};

interface TransitionsModalProps {
  open: boolean;
  handleClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const TransitionsModal: React.FC<TransitionsModalProps> = ({
  open,
  handleClose,
  title,
  children,
}) => {
  const modalClass = isDarkMode() ? "modal-box dark-mode" : "modal-box";

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box className={modalClass}>
          <div className="modal-header">
            {title && (
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                {title}
              </Typography>
            )}
            {/* Close Button */}
            <IconButton
              aria-label="close"
              onClick={handleClose}
              className="modal-close-button"
              sx={{ position: "absolute", right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </div>
          {children}
        </Box>
      </Fade>
    </Modal>
  );
};

export default TransitionsModal;
