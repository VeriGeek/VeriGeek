import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Box, Typography, Button, Grid, Card, CardContent, Breadcrumbs, 
  Tabs, Tab, List, ListItem, ListItemIcon, ListItemText, Divider, 
  Chip, Rating, Avatar, LinearProgress, Paper 
} from '@mui/material';
import { 
  PlayArrow, Assignment, MenuBook, Check, PlayCircleOutline, 
  BarChart, People, Schedule, AutoStories, ArrowBack, BookmarkAdd 
} from '@mui/icons-material';

// Import the module data
import { getModuleById } from '../data/modules';

const ModuleDetail = () => {
  const { id } = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch module data
  useEffect(() => {
    // Simulating API fetch with a delay
    setTimeout(() => {
      const moduleData = getModuleById(id);
      setModule(moduleData);
      setLoading(false);
    }, 800);
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (loading) {
    return (
      <Box className="container page-container" sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5" sx={{ mb: 4 }}>Loading module content...</Typography>
        <LinearProgress color="primary" sx={{ mx: 'auto', width: '50%' }} />
      </Box>
    );
  }

  if (!module) {
    return (
      <Box className="container page-container" sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5">Module not found</Typography>
        <Button component={Link} to="/modules" sx={{ mt: 2 }}>
          Back to Modules
        </Button>
      </Box>
    );
  }

  // Ensure required arrays exist to prevent "length of undefined" errors
  const syllabus = module.syllabus || [];
  const exercises = module.exercises || [];
  const codeExamples = module.codeExamples || [];
  const resources = module.resources || [];
  const relatedModules = module.relatedModules || [];

  return (
    <Box className="container page-container">
      {/* Breadcrumb */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          Home
        </Link>
        <Link to="/modules" style={{ textDecoration: 'none', color: 'inherit' }}>
          Modules
        </Link>
        <Typography color="text.primary">{module.title}</Typography>
      </Breadcrumbs>

      <Button 
        component={Link} 
        to="/modules" 
        startIcon={<ArrowBack />} 
        sx={{ mb: 3 }}
      >
        Back to Modules
      </Button>

      {/* Module Header */}
      <Box sx={{ position: 'relative', mb: 5 }}>
        <Box
          sx={{ 
            position: 'relative',
            height: '350px',
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Box
            component="img"
            src={module.image}
            alt={module.title}
            sx={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
            }}
          />
          <Box 
            sx={{ 
              position: 'absolute', 
              top: 0,
              left: 0,
              right: 0,
              bottom: 0, 
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.8))',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              p: { xs: 3, md: 5 }
            }}
          >
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Chip 
                label={module.level} 
                size="small" 
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.15)', 
                  color: 'white',
                  fontWeight: 'bold',
                  backdropFilter: 'blur(10px)'
                }} 
              />
              <Chip 
                label={`${syllabus.length} lessons`} 
                size="small" 
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.15)', 
                  color: 'white',
                  fontWeight: 'bold',
                  backdropFilter: 'blur(10px)'
                }} 
              />
            </Box>
            <Typography 
              variant="h2" 
              component="h1" 
              sx={{ 
                fontWeight: 'bold',
                color: 'white',
                textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                mb: 2,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
              }}
            >
              {module.title}
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.9)',
                textShadow: '0 1px 3px rgba(0,0,0,0.3)',
                maxWidth: '800px',
                fontWeight: 'normal',
                lineHeight: 1.5
              }}
            >
              {module.description}
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mt: 3,
              color: 'white',
              gap: 3
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar 
                  src={module.instructor.avatar} 
                  alt={module.instructor.name}
                  sx={{ width: 40, height: 40, mr: 1 }}
                />
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>Instructor</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{module.instructor.name}</Typography>
                </Box>
              </Box>
              <Divider orientation="vertical" flexItem sx={{ bgcolor: 'rgba(255,255,255,0.3)' }} />
              <Box>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>Last Updated</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{new Date(module.updatedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</Typography>
              </Box>
              <Divider orientation="vertical" flexItem sx={{ bgcolor: 'rgba(255,255,255,0.3)' }} />
              <Box>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>Rating</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body1" sx={{ fontWeight: 'medium', mr: 0.5 }}>{module.rating}</Typography>
                  <Rating value={module.rating} precision={0.1} readOnly size="small" sx={{ color: 'rgba(255, 255, 255, 0.9)' }} />
                  <Typography variant="body2" sx={{ ml: 0.5, opacity: 0.8 }}>({module.studentsCount?.toLocaleString() || 0})</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Module Stats */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={6} sm={3}>
          <Paper sx={{ p: 2, height: '100%', display: 'flex', alignItems: 'center' }}>
            <People sx={{ color: 'primary.main', mr: 1 }} />
            <Box>
              <Typography variant="body2" color="text.secondary">Students</Typography>
              <Typography variant="h6">{module.studentsCount?.toLocaleString() || 0}</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper sx={{ p: 2, height: '100%', display: 'flex', alignItems: 'center' }}>
            <Schedule sx={{ color: 'primary.main', mr: 1 }} />
            <Box>
              <Typography variant="body2" color="text.secondary">Duration</Typography>
              <Typography variant="h6">{module.duration}</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper sx={{ p: 2, height: '100%', display: 'flex', alignItems: 'center' }}>
            <AutoStories sx={{ color: 'primary.main', mr: 1 }} />
            <Box>
              <Typography variant="body2" color="text.secondary">Lessons</Typography>
              <Typography variant="h6">{syllabus.length}</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper sx={{ p: 2, height: '100%', display: 'flex', alignItems: 'center' }}>
            <Assignment sx={{ color: 'primary.main', mr: 1 }} />
            <Box>
              <Typography variant="body2" color="text.secondary">Exercises</Typography>
              <Typography variant="h6">{codeExamples.length}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Progress and Start buttons */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Your Progress
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={module.completed} 
              sx={{ height: 10, borderRadius: 5, mb: 1 }} 
            />
            <Typography variant="body2">
              {module.completed}% Complete
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', gap: 2, height: '100%' }}>
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              startIcon={<PlayArrow />}
              component={Link}
              to={`/modules/${id}/chapters/1`}
              sx={{ height: '100%' }}
            >
              {module.completed > 0 ? 'Continue Learning' : 'Start Module'}
            </Button>
            <Button 
              variant="outlined" 
              color="primary"
              startIcon={<BookmarkAdd />}
              sx={{ flexShrink: 0 }}
            >
              Save
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Tabs and Content */}
      <Box sx={{ mb: 4 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          sx={{ 
            borderBottom: 1, 
            borderColor: 'divider',
            mb: 3,
            '& .MuiTab-root': {
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 500
            }
          }}
        >
          <Tab label="Overview" icon={<MenuBook />} iconPosition="start" />
          <Tab label="Content" icon={<PlayCircleOutline />} iconPosition="start" />
          <Tab label="Exercises" icon={<Assignment />} iconPosition="start" />
          <Tab label="Instructor" icon={<People />} iconPosition="start" />
        </Tabs>

        {/* Overview Tab */}
        {tabValue === 0 && (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ borderLeft: '4px solid #6a0dad', pl: 2 }}>About This Module</Typography>
            <Typography paragraph sx={{ fontSize: '1.05rem', lineHeight: 1.6 }}>{module.overview}</Typography>
            
            {/* Learning Outcomes */}
            {syllabus.length > 0 && (
              <>
                <Typography variant="h5" gutterBottom sx={{ mt: 4, borderLeft: '4px solid #6a0dad', pl: 2 }}>What You'll Learn</Typography>
                <Paper elevation={0} variant="outlined" sx={{ p: 3, borderRadius: 2, mb: 4 }}>
                  <Grid container spacing={2}>
                    {syllabus.map((week, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                          <Check sx={{ color: 'success.main', mr: 1, mt: 0.3 }} />
                          <Typography variant="body1">{week.title}</Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </>
            )}
            
            {/* Prerequisites */}
            <Typography variant="h5" gutterBottom sx={{ mt: 4, borderLeft: '4px solid #6a0dad', pl: 2 }}>Prerequisites</Typography>
            <Paper elevation={0} variant="outlined" sx={{ p: 3, borderRadius: 2, mb: 4 }}>
              <List sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1 }}>
                {module.prerequisites.map((prereq, index) => (
                  <ListItem key={index} sx={{ px: 1 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <Check sx={{ color: 'primary.main' }} />
                    </ListItemIcon>
                    <ListItemText primary={prereq} />
                  </ListItem>
                ))}
              </List>
            </Paper>

            {/* Skills */}
            <Typography variant="h5" gutterBottom sx={{ mt: 4, borderLeft: '4px solid #6a0dad', pl: 2 }}>Skills You'll Gain</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
              {module.skills.map((skill, index) => (
                <Chip 
                  key={index} 
                  label={skill} 
                  sx={{ bgcolor: 'rgba(106, 13, 173, 0.08)', fontWeight: 500 }} 
                />
              ))}
            </Box>
            
            {/* Code Examples */}
            {codeExamples.length > 0 && (
              <>
                <Typography variant="h5" gutterBottom sx={{ mt: 4, borderLeft: '4px solid #6a0dad', pl: 2 }}>Code Examples</Typography>
                <Grid container spacing={3} sx={{ mb: 4 }}>
                  {codeExamples.map((example, index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <Paper elevation={2} sx={{ p: 0, overflow: 'hidden', borderRadius: 2 }}>
                        <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderBottom: '1px solid #e0e0e0' }}>
                          <Typography variant="subtitle1" fontWeight="medium">{example.title}</Typography>
                        </Box>
                        <Box sx={{ 
                          p: 2, 
                          bgcolor: '#272822',
                          color: '#f8f8f2',
                          fontFamily: 'monospace',
                          fontSize: '0.875rem',
                          overflow: 'auto',
                          maxHeight: '300px',
                          whiteSpace: 'pre'
                        }}>
                          {example.code}
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
            
            {/* Additional Resources */}
            {resources.length > 0 && (
              <>
                <Typography variant="h5" gutterBottom sx={{ mt: 4, borderLeft: '4px solid #6a0dad', pl: 2 }}>Additional Resources</Typography>
                <Paper elevation={0} variant="outlined" sx={{ p: 3, borderRadius: 2, mb: 4 }}>
                  <List>
                    {resources.map((resource, index) => (
                      <React.Fragment key={index}>
                        <ListItem sx={{ px: 1 }}>
                          <ListItemIcon>
                            {resource.type === 'PDF' ? 
                              <MenuBook color="primary" /> : 
                              <Assignment color="primary" />
                            }
                          </ListItemIcon>
                          <ListItemText 
                            primary={resource.title} 
                            secondary={resource.type} 
                          />
                          <Button variant="outlined" size="small" component="a" href={resource.url}>
                            Download
                          </Button>
                        </ListItem>
                        {index < resources.length - 1 && <Divider component="li" />}
                      </React.Fragment>
                    ))}
                  </List>
                </Paper>
              </>
            )}

            {/* Related Modules */}
            {relatedModules.length > 0 && (
              <>
                <Typography variant="h5" gutterBottom sx={{ mt: 4, borderLeft: '4px solid #6a0dad', pl: 2 }}>Related Modules</Typography>
                <Grid container spacing={3}>
                  {relatedModules.map(relModule => (
                    <Grid item xs={12} sm={6} md={4} key={relModule.id}>
                      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-8px)' } }}>
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" component="h3" gutterBottom>
                            {relModule.title}
                          </Typography>
                          <Chip 
                            label={relModule.level} 
                            size="small" 
                            sx={{ 
                              mb: 2,
                              backgroundColor: relModule.level === 'Beginner' ? '#e3f2fd' : 
                                            relModule.level === 'Intermediate' ? '#fff8e1' : '#fbe9e7',
                              color: relModule.level === 'Beginner' ? '#0277bd' : 
                                  relModule.level === 'Intermediate' ? '#ff8f00' : '#e64a19'
                            }} 
                          />
                          <Typography variant="body2" paragraph sx={{ mb: 2 }}>
                            {relModule.description}
                          </Typography>
                          <Button 
                            component={Link} 
                            to={`/modules/${relModule.id}`}
                            variant="outlined"
                            color="primary"
                            size="small"
                            fullWidth
                          >
                            View Module
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
          </Box>
        )}

        {/* Content Tab */}
        {tabValue === 1 && (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ borderLeft: '4px solid #6a0dad', pl: 2 }}>Module Content</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
              <Typography variant="body1">
                This module contains <strong>{module.chapters.length} chapters</strong> with a total duration of <strong>{module.duration}</strong>.
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<PlayArrow />}
                component={Link}
                to={`/modules/${id}/chapters/1`}
                size="small"
              >
                Start Learning
              </Button>
            </Box>
            
            <Paper elevation={0} variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
              {module.chapters.map((chapter, index) => (
                <Box 
                  key={chapter.id}
                  sx={{ 
                    borderBottom: index < module.chapters.length - 1 ? '1px solid #e0e0e0' : 'none',
                  }}
                >
                  <Box 
                    sx={{ 
                      p: 2,
                      display: 'flex',
                      alignItems: 'flex-start',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.02)'
                      },
                      bgcolor: chapter.completed ? 'rgba(76, 175, 80, 0.05)' : 'transparent'
                    }}
                  >
                    <Box sx={{ mr: 2, mt: 0.5 }}>
                      {chapter.completed ? (
                        <Box sx={{ 
                          width: 32, 
                          height: 32, 
                          borderRadius: '50%', 
                          bgcolor: 'success.main',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Check fontSize="small" />
                        </Box>
                      ) : (
                        <Box sx={{ 
                          width: 32, 
                          height: 32, 
                          borderRadius: '50%', 
                          border: '2px solid #e0e0e0',
                          color: 'text.secondary',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold'
                        }}>
                          {chapter.id}
                        </Box>
                      )}
                    </Box>
                    
                    <Box sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, flexWrap: 'wrap' }}>
                        <Typography variant="h6" component="h3" sx={{ mr: 2 }}>
                          {chapter.title}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          <Chip 
                            icon={<MenuBook fontSize="small" />}
                            label="Chapter" 
                            size="small"
                            sx={{ 
                              bgcolor: 'rgba(106, 13, 173, 0.08)',
                              color: '#6a0dad',
                            }} 
                          />
                          <Chip 
                            label={chapter.estimatedTime} 
                            size="small"
                            sx={{ bgcolor: 'rgba(0, 0, 0, 0.05)' }} 
                          />
                        </Box>
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {chapter.description}
                      </Typography>
                      
                      {chapter.sections && (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {chapter.sections.map((section, sectionIndex) => (
                            <Chip 
                              key={sectionIndex}
                              label={section.title} 
                              size="small"
                              sx={{ 
                                fontSize: '0.7rem',
                                height: 24,
                                bgcolor: 'rgba(0, 0, 0, 0.04)'
                              }} 
                            />
                          ))}
                        </Box>
                      )}
                    </Box>
                    
                    <Button 
                      component={Link} 
                      to={`/modules/${id}/chapters/${chapter.id}`}
                      variant="outlined"
                      color="primary"
                      size="small"
                      sx={{ ml: 2, alignSelf: 'center', flexShrink: 0 }}
                    >
                      {chapter.completed ? 'Revisit' : 'Start'}
                    </Button>
                  </Box>
                </Box>
              ))}
            </Paper>
          </Box>
        )}

        {/* Exercises Tab */}
        {tabValue === 2 && (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ borderLeft: '4px solid #6a0dad', pl: 2 }}>Practical Exercises</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="body1">
                Master your skills with these <strong>{exercises.length} hands-on exercises</strong>. Complete them to reinforce your learning.
              </Typography>
              <Chip 
                label={`${exercises.filter(ex => ex.completed).length}/${exercises.length} Completed`}
                color={exercises.filter(ex => ex.completed).length === exercises.length ? "success" : "default"}
                variant="outlined"
              />
            </Box>
            
            <Grid container spacing={3}>
              {exercises.map((exercise, index) => (
                <Grid item xs={12} md={6} key={exercise.id}>
                  <Paper 
                    elevation={0} 
                    variant="outlined" 
                    sx={{ 
                      p: 0, 
                      borderRadius: 2, 
                      overflow: 'hidden',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 3
                      },
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <Box sx={{ 
                      p: 2,
                      borderBottom: '1px solid #e0e0e0',
                      bgcolor: exercise.difficulty === 'Easy' ? '#e8f5e9' : 
                             exercise.difficulty === 'Medium' ? '#fff8e1' : '#ffebee',
                    }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" component="h3">
                          {exercise.title}
                        </Typography>
                        {exercise.completed && <Check color="success" />}
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                        <Chip 
                          label={exercise.difficulty} 
                          size="small"
                          sx={{ 
                            bgcolor: 'white',
                            color: exercise.difficulty === 'Easy' ? '#2e7d32' : 
                                  exercise.difficulty === 'Medium' ? '#ff8f00' : '#d32f2f',
                            fontWeight: 'bold'
                          }} 
                        />
                        <Chip 
                          label={exercise.type} 
                          size="small"
                          sx={{ 
                            bgcolor: 'white',
                            textTransform: 'capitalize'
                          }} 
                        />
                        <Chip 
                          label={`${exercise.points} pts`}
                          size="small"
                          sx={{ bgcolor: 'white' }}
                        />
                      </Box>
                    </Box>
                    
                    <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="body2" paragraph>
                        {exercise.description}
                      </Typography>
                      
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        mt: 'auto', 
                        borderTop: '1px solid #e0e0e0',
                        pt: 2
                      }}>
                        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                          <Schedule fontSize="small" sx={{ mr: 0.5 }} />
                          Est. time: {exercise.estimatedTime}
                        </Typography>
                        
                        <Button 
                          component={Link} 
                          to={`/modules/${id}/exercises/${exercise.id}`}
                          variant="contained"
                          color="primary"
                          size="small"
                        >
                          {exercise.completed ? 'Review' : 'Start Exercise'}
                        </Button>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Instructor Tab */}
        {tabValue === 3 && (
          <Box>
            <Paper elevation={0} variant="outlined" sx={{ p: 0, borderRadius: 2, overflow: 'hidden' }}>
              <Box sx={{ 
                p: 3, 
                bgcolor: 'rgba(106, 13, 173, 0.05)', 
                borderBottom: '1px solid #e0e0e0',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: { xs: 'center', md: 'flex-start' },
                gap: 4
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  width: { xs: '100%', md: '220px' } 
                }}>
                  <Avatar 
                    src={module.instructor.avatar} 
                    alt={module.instructor.name}
                    sx={{ 
                      width: 160, 
                      height: 160, 
                      mb: 2,
                      border: '4px solid white',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
                    {module.instructor.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Rating value={module.rating} precision={0.1} readOnly sx={{ mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      {module.rating}/5 ({module.studentsCount?.toLocaleString() || 0} students)
                    </Typography>
                  </Box>
                  <Button 
                    variant="outlined" 
                    color="primary"
                    fullWidth
                    sx={{ mb: 1 }}
                  >
                    View Profile
                  </Button>
                  <Button 
                    variant="text" 
                    color="primary"
                    fullWidth
                  >
                    All Courses
                  </Button>
                </Box>
                
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" gutterBottom>About the Instructor</Typography>
                  <Typography paragraph sx={{ fontSize: '1.05rem', lineHeight: 1.6, mb: 3 }}>
                    {module.instructor.bio}
                  </Typography>
                  
                  {module.instructor.credentials && (
                    <>
                      <Typography variant="h6" gutterBottom>Credentials</Typography>
                      <List disablePadding>
                        {module.instructor.credentials.map((credential, index) => (
                          <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <Check sx={{ color: 'success.main' }} />
                            </ListItemIcon>
                            <ListItemText primary={credential} />
                          </ListItem>
                        ))}
                      </List>
                    </>
                  )}
                </Box>
              </Box>
              
              <Box sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>Other Modules by This Instructor</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                      <Typography variant="subtitle1" gutterBottom>Advanced Verilog Techniques</Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        Master advanced Verilog concepts for complex digital systems design.
                      </Typography>
                      <Button size="small" color="primary">View Module</Button>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                      <Typography variant="subtitle1" gutterBottom>SystemVerilog for Verification</Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        Learn hardware verification using advanced SystemVerilog features.
                      </Typography>
                      <Button size="small" color="primary">View Module</Button>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                      <Typography variant="subtitle1" gutterBottom>FPGA Design with Verilog</Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        Implement your Verilog designs on real FPGA hardware.
                      </Typography>
                      <Button size="small" color="primary">View Module</Button>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ModuleDetail; 