import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@shared";
import { CircularProgress } from "@mui/material";
import "./styles.css";

type ConfirmModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  isLoading?: boolean;
  confirmText?: string;
  cancelText?: string;
};

export function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  isLoading = false,
  confirmText = "Да",
  cancelText = "Нет",
}: ConfirmModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        className="modal-style"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <div className="confirm-delete-menu-buttons">
          <Button
            color="primary"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : confirmText}
          </Button>
          <Button color="secondary" onClick={onClose}>
            {cancelText}
          </Button>
        </div>
      </Box>
    </Modal>
  );
}