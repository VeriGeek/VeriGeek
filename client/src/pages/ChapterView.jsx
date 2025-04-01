import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Box, Typography, Button, Breadcrumbs, Paper, CircularProgress,
  Divider, IconButton, Drawer, List, ListItem, ListItemText, Tabs, Tab
} from '@mui/material';
import { 
  ArrowBack, MenuBook, Menu, NavigateBefore, NavigateNext,
  BookmarkBorder 
} from '@mui/icons-material';

// Import the module data and the ChapterContent component
import { getModuleById } from '../data/modules';
import ChapterContent from '../components/ChapterContent';

const ChapterView = () => {
  const { moduleId, chapterId } = useParams();
  const [module, setModule] = useState(null);
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Fetch module and chapter data
  useEffect(() => {
    // Simulating API fetch with a delay
    const fetchData = async () => {
      setLoading(true);
      // Get module data
      const moduleData = getModuleById(moduleId);
      setModule(moduleData);
      
      // Find the chapter by id (convert to number if needed)
      const chapterNum = parseInt(chapterId, 10);
      const chapterData = moduleData?.chapters.find(ch => ch.id === chapterNum) || null;
      setChapter(chapterData);
      
      setLoading(false);
    };
    
    fetchData();
  }, [moduleId, chapterId]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Handle navigation to previous chapter
  const navigateToPrevChapter = () => {
    if (!module || !chapter) return;
    
    const currentIndex = module.chapters.findIndex(ch => ch.id === chapter.id);
    if (currentIndex > 0) {
      const prevChapter = module.chapters[currentIndex - 1];
      window.location.href = `/modules/${moduleId}/chapters/${prevChapter.id}`;
    }
  };

  // Handle navigation to next chapter
  const navigateToNextChapter = () => {
    if (!module || !chapter) return;
    
    const currentIndex = module.chapters.findIndex(ch => ch.id === chapter.id);
    if (currentIndex < module.chapters.length - 1) {
      const nextChapter = module.chapters[currentIndex + 1];
      window.location.href = `/modules/${moduleId}/chapters/${nextChapter.id}`;
    }
  };

  // Render loading state
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Render error state if module or chapter not found
  if (!module || !chapter) {
    return (
      <Box className="container page-container" sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5">Content not found</Typography>
        <Button component={Link} to="/modules" sx={{ mt: 2 }}>
          Back to Modules
        </Button>
      </Box>
    );
  }

  // Calculate chapter navigation info
  const currentIndex = module.chapters.findIndex(ch => ch.id === chapter.id);
  const isFirstChapter = currentIndex === 0;
  const isLastChapter = currentIndex === module.chapters.length - 1;
  const prevChapter = !isFirstChapter ? module.chapters[currentIndex - 1] : null;
  const nextChapter = !isLastChapter ? module.chapters[currentIndex + 1] : null;

  return (
    <>
      {/* Chapter Navigation Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{ '& .MuiDrawer-paper': { width: { xs: '85%', sm: 350 } } }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            {module.title}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Chapters
          </Typography>
          <List>
            {module.chapters.map((ch) => (
              <ListItem 
                key={ch.id}
                button
                component={Link}
                to={`/modules/${moduleId}/chapters/${ch.id}`}
                selected={ch.id === chapter.id}
                sx={{ 
                  borderRadius: 1, 
                  mb: 0.5,
                  bgcolor: ch.id === chapter.id ? 'action.selected' : 'transparent',
                }}
              >
                <ListItemText 
                  primary={`${ch.id}. ${ch.title}`} 
                  secondary={ch.description}
                  primaryTypographyProps={{ 
                    fontWeight: ch.id === chapter.id ? 'bold' : 'normal'
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box className="container page-container">
        {/* Header with navigation */}
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={toggleDrawer} sx={{ mr: 1 }}>
              <Menu />
            </IconButton>
            <Breadcrumbs>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                Home
              </Link>
              <Link to="/modules" style={{ textDecoration: 'none', color: 'inherit' }}>
                Modules
              </Link>
              <Link to={`/modules/${moduleId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                {module.title}
              </Link>
              <Typography color="text.primary">Chapter {chapter.id}</Typography>
            </Breadcrumbs>
          </Box>
          <Button 
            component={Link} 
            to={`/modules/${moduleId}`}
            startIcon={<ArrowBack />}
          >
            Back to Module
          </Button>
        </Box>

        {/* Chapter progress indicator */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <MenuBook sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="subtitle1">
              Chapter {chapter.id} of {module.chapters.length}
            </Typography>
          </Box>
          <Button
            variant="outlined"
            size="small"
            startIcon={<BookmarkBorder />}
          >
            Bookmark
          </Button>
        </Box>

        {/* Main content */}
        <Paper elevation={0} sx={{ borderRadius: 2, overflow: 'hidden', mb: 4 }}>
          <ChapterContent chapter={chapter} />
        </Paper>
        
        {/* Chapter navigation */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            mt: 4,
            mb: 6,
            mx: { xs: 2, md: 8 }
          }}
        >
          <Button 
            variant="outlined"
            disabled={isFirstChapter}
            onClick={navigateToPrevChapter}
            startIcon={<NavigateBefore />}
            sx={{ visibility: isFirstChapter ? 'hidden' : 'visible' }}
          >
            {prevChapter ? prevChapter.title : 'Previous'}
          </Button>
          
          <Button 
            variant="contained"
            disabled={isLastChapter}
            onClick={navigateToNextChapter}
            endIcon={<NavigateNext />}
            sx={{ visibility: isLastChapter ? 'hidden' : 'visible' }}
          >
            {nextChapter ? nextChapter.title : 'Next'}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ChapterView; 