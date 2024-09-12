'use client';
import { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Drawer, List, ListItem, ListItemIcon, ListItemText, CssBaseline, Button } from '@mui/material';
import { Home, People, AccountCircle } from '@mui/icons-material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import RecordVoiceOverRoundedIcon from '@mui/icons-material/RecordVoiceOverRounded';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { signOut } from "firebase/auth";
import { useRouter } from 'next/navigation';
import { auth } from '../lib/firebase';
import DashboardQSO from './DashboardQSO';
import ListaRF from './ListaRF';
import Perfil from './Perfil'; 
import Registros from './Registros';
import ListaRep from './ListaRep';

export default function DashboardLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeView, setActiveView] = useState('Libro QSO'); // Default to "Libro QSO"

  const router = useRouter();
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/Login');
    } catch (err) {
      console.error("Error logging out: ", err);
    }
  };

  const renderContent = () => {
    switch (activeView) {
      case 'Registros QSO':
        return <Registros />;
      case 'Perfil':
        return <Perfil />;
      case 'Lista RF':
        return <ListaRF />;
        case 'ListaRep':
          return <ListaRep />;
      default:
        return <Registros />;
    }
  };

  const renderDrawerItems = () => {
    return [
      { text: 'Perfil', icon: <AccountCircleRoundedIcon />, view: 'Perfil' }, 
      { text: 'Registros QSO', icon: <RecordVoiceOverRoundedIcon />, view: 'Registros QSO' },
      { text: 'Licencias Radio Aficionados', icon: <People />, view: 'Lista RF' }, 
      { text: 'Repetidores Radioaficionados', icon: <People />, view: 'ListaRep' }, 
    ];
  };

  const handleViewChange = (view) => {
    setActiveView(view);
    setDrawerOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Radioaficionados Chile
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
          {auth && <AccountCircle />}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
        }}
      >
        <IconButton onClick={toggleDrawer} sx={{ ml: 1 }}>
          <ChevronLeftIcon />
        </IconButton>
        <List style={{ paddingTop: '30px' }}>
          {renderDrawerItems().map((item, index) => (
            <ListItem button key={item.text} onClick={() => handleViewChange(item.view)}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {renderContent()}
      </Box>
    </Box>
  );
}
