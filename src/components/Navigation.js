import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  List as ListIcon,
  Add as AddIcon,
  BarChart as ChartIcon,
  Settings as SettingsIcon,
  Login as LoginIcon,
  Palette as PaletteIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material';
import { useTheme as useCustomTheme } from '../theme/ThemeProvider';

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const { toggleTheme, isDark } = useCustomTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Главная', icon: <HomeIcon /> },
    { path: '/technologies', label: 'Технологии', icon: <ListIcon /> },
    { path: '/add-technology', label: 'Добавить', icon: <AddIcon /> },
    { path: '/statistics', label: 'Статистика', icon: <ChartIcon /> },
    { path: '/settings', label: 'Настройки', icon: <SettingsIcon /> },
    { path: '/login', label: 'Вход', icon: <LoginIcon /> },
    { path: '/mui-demo', label: 'MUI Демо', icon: <NotificationsIcon /> },
  ];

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawer = (
    <Box sx={{ width: 250, pt: 2 }}>
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.path}
            button
            component={Link}
            to={item.path}
            onClick={() => setDrawerOpen(false)}
            selected={location.pathname === item.path}
            sx={{
              mb: 1,
              mx: 1,
              borderRadius: 1,
              '&.Mui-selected': {
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              },
            }}
          >
            <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
              {item.icon}
            </Box>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
        <ListItem sx={{ mt: 2, mx: 1 }}>
          <FormControlLabel
            control={
              <Switch
                checked={isDark}
                onChange={toggleTheme}
                icon={<PaletteIcon />}
                checkedIcon={<PaletteIcon />}
              />
            }
            label={isDark ? 'Тёмная тема' : 'Светлая тема'}
            sx={{ width: '100%' }}
          />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" color="default" elevation={1}>
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            🚀 Трекер технологий
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
                  startIcon={item.icon}
                  color={location.pathname === item.path ? 'primary' : 'inherit'}
                  variant={location.pathname === item.path ? 'contained' : 'text'}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: location.pathname === item.path ? 600 : 400,
                  }}
                >
                  {item.label}
                </Button>
              ))}
              
              <FormControlLabel
                control={
                  <Switch
                    checked={isDark}
                    onChange={toggleTheme}
                    size="small"
                  />
                }
                label=""
                sx={{ ml: 1 }}
              />
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

export default Navigation;