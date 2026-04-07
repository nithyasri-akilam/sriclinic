import { AppBar, Toolbar, IconButton, Typography, Box, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useNavigate } from 'react-router-dom';

const Header = ({ handleDrawerToggle, isDarkMode, toggleTheme, drawerWidth }) => {
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        bgcolor: '#1e72a9',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          dashboard
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <DarkModeSwitch
            checked={isDarkMode}
            onChange={toggleTheme}
            size={30}
            sunColor="orange"
            moonColor="#42a5f5"
          />
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <IconButton color="inherit">
            <Avatar sx={{ width: 32, height: 32 }} onClick={() => navigate('/admin/profile')}>
              A
            </Avatar>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;