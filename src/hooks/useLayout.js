import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../theme/ThemeContext';
import { useTheme as useMuiTheme, useMediaQuery } from '@mui/material';
import Swal from 'sweetalert2';

import authService from '../services/authService';

const useLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const theme = useMuiTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out of your account!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!'
    });

    if (result.isConfirmed) {
      try {
        await authService.logout();
        Swal.fire('Logged Out!', 'You have been successfully logged out.', 'success');
        navigate('/login');
      } catch (err) {
        console.error('Logout error:', err);
        Swal.fire('Error!', 'Failed to logout. Please try again.', 'error');
      }
    }
  };

  return {
    mobileOpen,
    setMobileOpen,     // Make sure this is included
    isDarkMode,
    toggleTheme,
    isMobile,
    handleDrawerToggle,
    handleLogout
  };
};

export default useLayout;