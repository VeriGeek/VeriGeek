import React, { useState } from 'react';
import { 
  Box, Typography, Paper, Accordion, AccordionSummary, AccordionDetails,
  Divider, Button, Grid, Card, CardContent, CardMedia, CardActionArea, 
  Chip, Radio, RadioGroup, FormControlLabel, FormControl, Alert
} from '@mui/material';
import { 
  ExpandMore, PlayArrow, Code, Quiz, Check, VideoLibrary,
  Assignment, BookmarkBorder, Bookmark, ArrowForward
} from '@mui/icons-material';

const ChapterContent = ({ chapter }) => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [bookmarked, setBookmarked] = useState([]);

  const handleSectionChange = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const handleQuizAnswer = (questionId, answer) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionId]: answer
    });
  };

  const submitQuiz = () => {
    setQuizSubmitted(true);
    // In a real app, you might send these answers to a backend for validation
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  const toggleBookmark = (sectionId) => {
    if (bookmarked.includes(sectionId)) {
      setBookmarked(bookmarked.filter(id => id !== sectionId));
    } else {
      setBookmarked([...bookmarked, sectionId]);
    }
  };

  const calculateQuizScore = () => {
    if (!chapter.quiz || !quizSubmitted) return null;
    
    const totalQuestions = chapter.quiz.questions.length;
    const correctAnswers = chapter.quiz.questions.filter(
      question => quizAnswers[question.id] === question.correctAnswer
    ).length;
    
    return {
      score: correctAnswers,
      total: totalQuestions,
      percentage: Math.round((correctAnswers / totalQuestions) * 100)
    };
  };

  const quizScore = calculateQuizScore();

  if (!chapter) {
    return <Box sx={{ p: 3 }}><Typography>Chapter not found</Typography></Box>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {chapter.title}
      </Typography>
      
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        {chapter.description} • Estimated time: {chapter.estimatedTime}
      </Typography>
      
      <Divider sx={{ my: 3 }} />
      
      {/* Chapter Sections */}
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Chapter Content
      </Typography>
      
      {chapter.sections.map((section) => (
        <Accordion 
          key={section.id}
          expanded={expandedSection === section.id}
          onChange={() => handleSectionChange(section.id)}
          sx={{ mb: 2, overflow: 'hidden' }}
        >
          <AccordionSummary expandIcon={<ExpandMore />} sx={{ bgcolor: 'action.hover' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
              <Typography sx={{ fontWeight: expandedSection === section.id ? 'bold' : 'normal' }}>
                {section.id} - {section.title}
              </Typography>
              <Button 
                size="small" 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleBookmark(section.id);
                }}
                startIcon={bookmarked.includes(section.id) ? <Bookmark /> : <BookmarkBorder />}
                sx={{ ml: 2 }}
              >
                {bookmarked.includes(section.id) ? 'Bookmarked' : 'Bookmark'}
              </Button>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ p: 1 }} dangerouslySetInnerHTML={{ __html: section.content }} />
          </AccordionDetails>
        </Accordion>
      ))}
      
      {/* Chapter Examples */}
      {chapter.examples && chapter.examples.length > 0 && (
        <>
          <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
            Code Examples
          </Typography>
          
          <Grid container spacing={3}>
            {chapter.examples.map((example) => (
              <Grid item xs={12} md={6} key={example.id}>
                <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                  <Box sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', p: 2, display: 'flex', alignItems: 'center' }}>
                    <Code sx={{ mr: 1 }} />
                    <Typography variant="h6">{example.title}</Typography>
                  </Box>
                  <Box sx={{ p: 2 }}>
                    <Typography variant="body2" paragraph>{example.description}</Typography>
                    <Paper variant="outlined" sx={{ 
                      p: 2, 
                      bgcolor: '#272822', 
                      color: '#f8f8f2', 
                      fontFamily: 'monospace',
                      whiteSpace: 'pre-wrap',
                      overflowX: 'auto',
                      fontSize: '0.875rem'
                    }}>
                      {example.code}
                    </Paper>
                    <Typography variant="subtitle2" sx={{ mt: 2, fontWeight: 'bold' }}>Explanation:</Typography>
                    <Typography variant="body2">{example.explanation}</Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </>
      )}
      
      {/* Chapter Videos */}
      {chapter.videos && chapter.videos.length > 0 && (
        <>
          <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
            Video Resources
          </Typography>
          
          <Grid container spacing={3}>
            {chapter.videos.map((video) => (
              <Grid item xs={12} sm={6} md={4} key={video.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardActionArea component="a" href={video.url} target="_blank" rel="noopener noreferrer">
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={video.thumbnail}
                        alt={video.title}
                      />
                      <Box sx={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        width: '100%', 
                        height: '100%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        background: 'rgba(0,0,0,0.3)',
                        transition: 'background 0.3s',
                        '&:hover': { background: 'rgba(0,0,0,0.5)' }
                      }}>
                        <PlayArrow sx={{ fontSize: 60, color: 'white' }} />
                      </Box>
                      <Box sx={{ 
                        position: 'absolute', 
                        bottom: 8, 
                        right: 8, 
                        bgcolor: 'rgba(0,0,0,0.7)', 
                        color: 'white',
                        px: 1,
                        borderRadius: 1
                      }}>
                        <Typography variant="caption">{video.duration}</Typography>
                      </Box>
                    </Box>
                    <CardContent>
                      <Typography variant="subtitle1" component="div" gutterBottom noWrap>
                        {video.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {video.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
      
      {/* Chapter Quiz */}
      {chapter.quiz && (
        <>
          <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
            Chapter Quiz
          </Typography>
          
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Quiz sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">{chapter.quiz.title}</Typography>
            </Box>
            
            <Typography variant="body2" paragraph>
              {chapter.quiz.description}
            </Typography>
            
            {quizSubmitted && quizScore && (
              <Alert 
                severity={quizScore.percentage >= 70 ? "success" : "warning"} 
                sx={{ mb: 3 }}
              >
                <Typography variant="subtitle2">
                  You scored {quizScore.score} out of {quizScore.total} ({quizScore.percentage}%)
                </Typography>
                <Typography variant="body2">
                  {quizScore.percentage >= 70 
                    ? "Great job! You've passed this quiz." 
                    : "You might want to review the material and try again."}
                </Typography>
              </Alert>
            )}
            
            {chapter.quiz.questions.map((question, index) => (
              <Box key={question.id} sx={{ mb: 3, pb: 3, borderBottom: index < chapter.quiz.questions.length - 1 ? '1px solid #e0e0e0' : 'none' }}>
                <Typography variant="subtitle1" gutterBottom>
                  {index + 1}. {question.question}
                </Typography>
                
                <FormControl component="fieldset" sx={{ ml: 2 }}>
                  <RadioGroup
                    value={quizAnswers[question.id] || ''}
                    onChange={(e) => handleQuizAnswer(question.id, e.target.value)}
                  >
                    {question.options.map((option) => (
                      <FormControlLabel
                        key={option.id}
                        value={option.id}
                        control={<Radio />}
                        label={option.text}
                        disabled={quizSubmitted}
                        sx={{
                          ...(quizSubmitted && option.id === question.correctAnswer && {
                            color: 'success.main',
                            fontWeight: 'bold'
                          }),
                          ...(quizSubmitted && quizAnswers[question.id] === option.id && quizAnswers[question.id] !== question.correctAnswer && {
                            color: 'error.main'
                          })
                        }}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
                
                {quizSubmitted && (
                  <Box sx={{ mt: 1, ml: 2 }}>
                    {quizAnswers[question.id] === question.correctAnswer ? (
                      <Typography variant="body2" sx={{ color: 'success.main', display: 'flex', alignItems: 'center' }}>
                        <Check fontSize="small" sx={{ mr: 0.5 }} />
                        Correct!
                      </Typography>
                    ) : (
                      <Typography variant="body2" sx={{ color: 'error.main' }}>
                        Incorrect. The correct answer is: {
                          question.options.find(opt => opt.id === question.correctAnswer)?.text
                        }
                      </Typography>
                    )}
                    
                    <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
                      {question.explanation}
                    </Typography>
                  </Box>
                )}
              </Box>
            ))}
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              {quizSubmitted ? (
                <Button 
                  variant="outlined" 
                  onClick={resetQuiz} 
                  startIcon={<Assignment />}
                >
                  Retake Quiz
                </Button>
              ) : (
                <Button 
                  variant="contained" 
                  onClick={submitQuiz} 
                  startIcon={<Check />}
                  disabled={Object.keys(quizAnswers).length !== chapter.quiz.questions.length}
                >
                  Submit Answers
                </Button>
              )}
              
              <Button 
                variant="outlined" 
                endIcon={<ArrowForward />}
              >
                Next Chapter
              </Button>
            </Box>
          </Paper>
        </>
      )}
    </Box>
  );
};

export default ChapterContent; 