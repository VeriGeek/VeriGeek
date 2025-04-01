import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './styles/index.css';

// Import pages
import Home from './pages/Home';
import Modules from './pages/Modules';
import ModuleDetail from './pages/ModuleDetail';
import ChapterView from './pages/ChapterView';
import CodeEditor from './pages/CodeEditor';
import Forum from './pages/Forum';
import Login from './pages/Login';
import Register from './pages/Register';
import Resources from './pages/Resources';
import Careers from './pages/Careers';
import CommunityForum from './components/CommunityForum';

// Import components
import Header from './components/Header';
import Footer from './components/Footer';

// Create a theme with our purple color
const theme = createTheme({
  palette: {
    primary: {
      main: '#6a0dad',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  useEffect(() => {
    // Set document title
    document.title = 'VeriGeek - Empower Your Logic, Code Your Circuit!';
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/modules" element={<Modules />} />
            <Route path="/modules/:id" element={<ModuleDetail />} />
            <Route path="/modules/:moduleId/chapters/:chapterId" element={<ChapterView />} />
            <Route path="/editor" element={<CodeEditor />} />
            <Route path="/modules/:moduleId/exercises/:exerciseId" element={<CodeEditor />} />
            <Route path="/forum" element={<CommunityForum />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* More routes can be added here as needed */}
          </Routes>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App; 