import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { CustomThemeProvider } from './theme/ThemeProvider';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import AddTechnology from './pages/AddTechnology';
import StatisticsPage from './pages/StatisticsPage';
import SettingsPage from './pages/SettingsPage';
import Login from './pages/Login';
import MuiNotification from './components/MuiNotification';
import './App.css';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <CustomThemeProvider>
      <Router>
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
          <Navigation />
          <Box component="main" sx={{ p: { xs: 2, sm: 3 } }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/technologies" element={<TechnologyList />} />
              <Route path="/technology/:id" element={<TechnologyDetail />} />
              <Route path="/add-technology" element={<AddTechnology />} />
              <Route path="/statistics" element={<StatisticsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/mui-demo" element={<MuiNotification />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </CustomThemeProvider>
  );
}

export default App;