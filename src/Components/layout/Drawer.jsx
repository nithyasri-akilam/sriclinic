import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Divider, Collapse } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useNavigate, useLocation } from 'react-router-dom';
import { getMenuItems } from './MenuItems';
import { useState } from 'react';
import logo from "../../assets/images/sripharmacy.jpg" 

const SideDrawer = ({ handleLogout, isDarkMode, isMobile, setMobileOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const menuItems = getMenuItems();
  const [openSubMenu, setOpenSubMenu] = useState('');

  const handleMenuClick = (item) => {
    if (item.subMenu) {
      setOpenSubMenu(openSubMenu === item.text ? '' : item.text);
    } else {
      navigate(item.path);
      if (isMobile) setMobileOpen(false);
    }
  };

  return (
    <Box>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1, bgcolor: isDarkMode ? "#1e72a9" : "#1e72a9" }}>
        <img src={logo} alt="Logo" style={{ width: 34, height: 33 }} />
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: "white" }}>
        Sri Clinic
        </Typography>
      </Box>

      <List sx={{ p: 0, m: 0, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ flexGrow: 1 }}>
          {menuItems.map((item) => (
            <>
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  onClick={() => handleMenuClick(item)}
                  selected={location.pathname === item.path}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: '#e02276',
                      color: '#fff',
                      '& .MuiListItemIcon-root': {
                        color: '#fff',
                      },
                    },
                    '&.Mui-selected:hover': {
                      backgroundColor: '#1565c0',
                    },
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                  {item.subMenu && (openSubMenu === item.text ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
              </ListItem>
              {item.subMenu && (
                <Collapse in={openSubMenu === item.text} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.subMenu.map((subItem) => (
                      <ListItemButton
                        key={subItem.text}
                        sx={{ pl: 4 }}
                        onClick={() => {
                          navigate(subItem.path);
                          if (isMobile) setMobileOpen(false);
                        }}
                        selected={location.pathname === subItem.path}
                      >
                        <ListItemIcon>{subItem.icon}</ListItemIcon>
                        <ListItemText primary={subItem.text} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </>
          ))}
        </Box>

        {/* <Divider />

        <Box>
          <ListItem disablePadding>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                '&:hover': {
                  backgroundColor: '#ff5252',
                  color: '#fff',
                  '& .MuiListItemIcon-root': {
                    color: '#fff',
                  },
                },
              }}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </Box> */}
      </List>
    </Box>
  );
};

export default SideDrawer;