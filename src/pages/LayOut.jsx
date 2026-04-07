
import React from 'react';
import { Box, Drawer } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from '../Components/layout/Header.jsx';
import SideDrawer from '../Components/layout/Drawer';
import useLayout from '../hooks/useLayout';

const drawerWidth = 240;

const AdminLayout = () => {
  const {
    mobileOpen,
    setMobileOpen,
    isDarkMode,
    toggleTheme,
    isMobile,
    handleDrawerToggle,
    handleLogout,
    openSubMenu,
    handleSubMenuToggle
  } = useLayout();

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Header 
          handleDrawerToggle={handleDrawerToggle}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          drawerWidth={drawerWidth}
        />

        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            <SideDrawer 
              handleLogout={handleLogout}
              isDarkMode={isDarkMode}
              isMobile={isMobile}
              setMobileOpen={setMobileOpen}
              openSubMenu={openSubMenu}
              handleSubMenuToggle={handleSubMenuToggle}
            />
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            <SideDrawer 
              handleLogout={handleLogout}
              isDarkMode={isDarkMode}
              isMobile={isMobile}
              setMobileOpen={setMobileOpen}
            />
          </Drawer>
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            mt: 8,
            display: 'flex',
            flexDirection: 'column',
            minHeight: '80vh',
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
      <Box sx={{ mt: 5 }}>
        <Footer />
      </Box>
    </>
  );
};

export default AdminLayout;
