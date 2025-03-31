import React from 'react';
import { User } from '../../types/User';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  TableSortLabel,
} from '@mui/material';

interface Props {
  users: User[];
  selected: number[];
  onSelectAll: (checked: boolean) => void;
  onSelectRow: (id: number) => void;
  order: 'asc' | 'desc';
  onSort: () => void;
}

const formatDate = (dateString?: string): string => {
  if (!dateString || dateString.trim() === '') return 'N/A';
  
  // Replace space with 'T' if necessary
  let isoString = dateString.includes('T') ? dateString : dateString.replace(' ', 'T');

  // Truncate fractional seconds to 3 digits (milliseconds)
  isoString = isoString.replace(/(\.\d{3})\d+/, '$1');

  // If no timezone info is present (ends neither with Z nor an offset), assume UTC by appending "Z"
  if (!/Z|[+-]\d{2}:\d{2}$/.test(isoString)) {
    isoString = isoString + 'Z';
  }

  const date = new Date(isoString);
  return isNaN(date.getTime()) ? 'N/A' : date.toLocaleString();
};

const UserTable: React.FC<Props> = ({
  users,
  selected,
  onSelectAll,
  onSelectRow,
  order,
  onSort,
}) => {
  const isAllSelected = users.length > 0 && selected.length === users.length;

  return (
    <TableContainer component={Paper} className="shadow-md">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                checked={isAllSelected}
                onChange={(e) => onSelectAll(e.target.checked)}
              />
            </TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>
              <TableSortLabel active direction={order} onClick={onSort}>
                Last Login Time
              </TableSortLabel>
            </TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} hover>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selected.includes(user.id)}
                  onChange={() => onSelectRow(user.id)}
                />
              </TableCell>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{formatDate(user.lastLoggedIn)}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded text-white ${
                    user.blocked ? 'bg-red-500' : 'bg-green-500'
                  }`}
                >
                  {user.blocked ? 'Blocked' : 'Active'}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
