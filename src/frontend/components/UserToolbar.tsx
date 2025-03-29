import React from 'react';
import { Button, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  onBlock: () => void;
  onUnblock: () => void;
  onDelete: () => void;
  selectedCount: number;
}

const UserToolbar: React.FC<Props> = ({ onBlock, onUnblock, onDelete, selectedCount }) => {
  return (
    <Toolbar className="border-b mb-4 bg-gray-50">
      {selectedCount > 0 ? (
        <Typography className="flex-1" color="inherit" variant="subtitle1">
          {selectedCount} selected
        </Typography>
      ) : (
        <Typography className="flex-1" variant="h6">
          Users
        </Typography>
      )}

      <Button variant="text" color="error" onClick={onBlock} disabled={!selectedCount}>
        Block
      </Button>

      <Tooltip title="Unblock">
        <IconButton onClick={onUnblock} disabled={!selectedCount}>
          <LockOpenIcon color="success" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Delete">
        <IconButton onClick={onDelete} disabled={!selectedCount}>
          <DeleteIcon color="error" />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

export default UserToolbar;
