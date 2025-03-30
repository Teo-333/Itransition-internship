import React, { useEffect, useState } from 'react';
import UserTable from '../components/UserTable';
import UserToolbar from '../components/UserToolbar';
import { User } from '../../types/User';
import axios from 'axios';
import { Button } from '@mui/material';
import { useTheme } from '../context/ThemeContext';

const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    fetchUsers();
  }, [order]);

  const fetchUsers = async () => {
    const { data } = await axios.get<User[]>(`http://localhost:5000/api/users?order=${order}`);
    setUsers(data);
  };

  const handleSelectAll = (checked: boolean) => {
    setSelected(checked ? users.map(user => user.id) : []);
  };

  const handleSelectRow = (id: number) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(userId => userId !== id) : [...prev, id]
    );
  };

  const handleSort = () => {
    setOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const handleBlock = async () => {
    await axios.post('http://localhost:5000/api/users/block', { ids: selected });
    fetchUsers();
    setSelected([]);
  };

  const handleUnblock = async () => {
    await axios.post('http://localhost:5000/api/users/unblock', { ids: selected });
    fetchUsers();
    setSelected([]);
  };

  const handleDelete = async () => {
    await axios.post('http://localhost:5000/api/users/delete', { ids: selected });
    fetchUsers();
    setSelected([]);
  };

  return (
    <div className={`min-h-screen w-full py-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="container mx-auto bg-white dark:bg-gray-800 p-6 shadow-xl rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">User Management Dashboard</h1>
          <Button variant="outlined" onClick={toggleTheme}>
            {theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </Button>
        </div>
        <UserToolbar
          onBlock={handleBlock}
          onUnblock={handleUnblock}
          onDelete={handleDelete}
          selectedCount={selected.length}
        />
        <UserTable
          users={users}
          selected={selected}
          onSelectAll={handleSelectAll}
          onSelectRow={handleSelectRow}
          order={order}
          onSort={handleSort}
        />
      </div>
    </div>
  );
};

export default UserManagementPage;
