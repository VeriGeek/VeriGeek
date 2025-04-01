import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Stack,
  Rating,
  Card,
  CardContent,
  CardActions,
  Pagination,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  TextareaAutosize,
  Snackbar,
  Collapse,
  Badge,
} from '@mui/material';
import {
  Add as AddIcon,
  ThumbUp as ThumbUpIcon,
  Comment as CommentIcon,
  Share as ShareIcon,
  Bookmark as BookmarkIcon,
  Code as CodeIcon,
  Tag as TagIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Send as SendIcon,
  QuestionAnswer as QuestionAnswerIcon,
} from '@mui/icons-material';
import axios from 'axios';

const CommunityForum = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openAnswerDialog, setOpenAnswerDialog] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answerContent, setAnswerContent] = useState('');
  const [answerCodeSnippet, setAnswerCodeSnippet] = useState('');
  const [showAnswerCodeEditor, setShowAnswerCodeEditor] = useState(false);
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);
  
  const [question, setQuestion] = useState({
    title: '',
    content: '',
    tags: [],
    currentTag: '',
    codeSnippet: '',
  });
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTag, setSelectedTag] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  });

  useEffect(() => {
    fetchQuestions();
  }, [page, selectedTag, searchQuery, tabValue]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: 10,
        ...(selectedTag && { tag: selectedTag }),
        ...(searchQuery && { search: searchQuery }),
      };

      // Add sorting based on tab selection
      if (tabValue === 1) { // Most Liked
        params.sort = 'likes';
      } else if (tabValue === 2) { // Unanswered
        params.unanswered = true;
      }

      // First try to fetch from the API
      try {
        const response = await axios.get('/api/forum', { params });
        if (response.data && response.data.questions) {
          setQuestions(response.data.questions);
          setTotalPages(response.data.totalPages || 1);
          setError(null);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (apiError) {
        console.error('API error:', apiError);
        // If API fails, use sample data for testing UI
        const sampleData = [
          {
            id: '1',
            title: "What's the most efficient way to implement a 4-bit multiplier in Verilog?",
            content: "I'm working on a project that requires a 4-bit multiplier. I've tried a naive implementation using a nested loop, but I'm wondering if there are more efficient techniques specifically for FPGA implementation.",
            tags: ["verilog", "multiplier", "optimization", "fpga"],
            author: { name: 'VerilogNewbie' },
            createdAt: new Date().toISOString(),
            difficulty: 3,
            likes: ['user1', 'user2', 'user3'],
            comments: [
              {
                content: "Have you tried using the built-in multiplication operator? It's generally optimized by the synthesizer.",
                author: { name: 'FPGA_Expert' },
                createdAt: new Date().toISOString(),
              }
            ]
          },
          {
            id: '2',
            title: "Understanding non-blocking assignments in Verilog",
            content: "I'm confused about when to use blocking (=) versus non-blocking (<=) assignments in Verilog. Could someone explain the difference and provide guidelines on which to use in different situations?",
            tags: ["verilog", "sequential-logic", "best-practices"],
            author: { name: 'LearningVerilog' },
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            difficulty: 2,
            likes: ['user1'],
            comments: []
          }
        ];
        
        // Filter based on selected tab
        let filteredData = [...sampleData];
        
        if (tabValue === 1) { // Most Liked
          filteredData.sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0));
        } else if (tabValue === 2) { // Unanswered
          filteredData = filteredData.filter(q => !q.comments || q.comments.length === 0);
        }
        
        setQuestions(filteredData);
        setTotalPages(1);
        setError('Could not connect to server. Showing sample data for UI testing.');
      }
    } catch (err) {
      setError('Failed to fetch questions. Please try again later.');
      console.error('Error in fetchQuestions:', err);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setQuestion({
      title: '',
      content: '',
      tags: [],
      currentTag: '',
      codeSnippet: '',
    });
    setShowCodeEditor(false);
  };

  const handleOpenAnswerDialog = (question) => {
    if (!isLoggedIn) {
      setSnackbar({
        open: true,
        message: 'Please log in to answer questions',
        severity: 'warning'
      });
      return;
    }
    setSelectedQuestion(question);
    setOpenAnswerDialog(true);
  };

  const handleCloseAnswerDialog = () => {
    setOpenAnswerDialog(false);
    setSelectedQuestion(null);
    setAnswerContent('');
    setAnswerCodeSnippet('');
    setShowAnswerCodeEditor(false);
  };

  const handleAddTag = () => {
    if (question.currentTag.trim()) {
      setQuestion({
        ...question,
        tags: [...question.tags, question.currentTag.trim()],
        currentTag: '',
      });
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setQuestion({
      ...question,
      tags: question.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleSubmitQuestion = async () => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Please log in to post a question');
        return;
      }

      const response = await axios.post('/api/forum', 
        {
          title: question.title,
          content: question.content,
          tags: question.tags,
          codeSnippet: question.codeSnippet,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      setQuestions([response.data, ...questions]);
      handleCloseDialog();
      setError(null);
      setSnackbar({
        open: true,
        message: 'Question posted successfully!',
        severity: 'success'
      });
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('You must be logged in to post a question');
      } else {
        setError('Failed to post question. Please try again later.');
      }
      console.error('Error posting question:', err);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!selectedQuestion || !answerContent.trim()) return;
    
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setSnackbar({
          open: true,
          message: 'Please log in to answer questions',
          severity: 'warning'
        });
        return;
      }

      const response = await axios.post(
        `/api/forum/${selectedQuestion._id || selectedQuestion.id}/comments`, 
        {
          content: answerContent,
          codeSnippet: answerCodeSnippet
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      handleCloseAnswerDialog();
      fetchQuestions(); // Refresh questions to show the new answer
      
      setSnackbar({
        open: true,
        message: 'Answer posted successfully!',
        severity: 'success'
      });
    } catch (err) {
      console.error('Error posting answer:', err);
      setSnackbar({
        open: true,
        message: 'Failed to post answer. Please try again.',
        severity: 'error'
      });
    }
  };

  const handleLike = async (questionId) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setSnackbar({
          open: true,
          message: 'Please log in to like questions',
          severity: 'warning'
        });
        return;
      }

      await axios.post(`/api/forum/${questionId}/like`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      fetchQuestions(); // Refresh questions to get updated likes
    } catch (err) {
      console.error('Error liking question:', err);
      setSnackbar({
        open: true,
        message: 'Failed to like question',
        severity: 'error'
      });
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setPage(1); // Reset to first page when changing tabs
  };

  const toggleExpandQuestion = (questionId) => {
    if (expandedQuestionId === questionId) {
      setExpandedQuestionId(null);
    } else {
      setExpandedQuestionId(questionId);
    }
  };

  const renderCodeSnippet = (code) => {
    if (!code) return null;
    return (
      <Paper sx={{ p: 2, bgcolor: '#f5f5f5', mt: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          <CodeIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Code Snippet
        </Typography>
        <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{code}</pre>
      </Paper>
    );
  };

  // Function to test user login
  const handleTestLogin = async () => {
    try {
      // Try to create a test user first
      try {
        await axios.post('/api/auth/test-user');
      } catch (err) {
        console.log('Test user might already exist, proceeding to login');
      }
      
      // Login with test user
      const loginResponse = await axios.post('/api/auth/login', {
        email: 'test@example.com',
        password: 'password123'
      });
      
      if (loginResponse.data && loginResponse.data.token) {
        localStorage.setItem('token', loginResponse.data.token);
        setIsLoggedIn(true);
        setSnackbar({
          open: true,
          message: 'Logged in as test user',
          severity: 'success'
        });
      }
    } catch (err) {
      console.error('Login error:', err);
      setSnackbar({
        open: true,
        message: 'Login failed',
        severity: 'error'
      });
    }
  };

  // Function to logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setSnackbar({
      open: true,
      message: 'Logged out successfully',
      severity: 'info'
    });
  };

  // Close snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Verilog Community Forum
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {isLoggedIn ? (
            <>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleOpenDialog}
              >
                Ask Question
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              startIcon={<LoginIcon />}
              onClick={handleTestLogin}
            >
              Test Login
            </Button>
          )}
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Search questions"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Latest Questions" />
          <Tab label="Most Liked" />
          <Tab label={
            <Badge badgeContent={
              questions.filter(q => !q.comments || q.comments.length === 0).length
            } color="error">
              Unanswered
            </Badge>
          } />
        </Tabs>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <List>
            {questions.length > 0 ? (
              questions.map((q) => (
                <React.Fragment key={q._id || q.id}>
                  <ListItem
                    component={Card}
                    sx={{
                      mb: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'stretch',
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <ListItemAvatar>
                          <Avatar>{q.author?.name?.[0] || 'U'}</Avatar>
                        </ListItemAvatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6">{q.title}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Posted by {q.author?.name || 'Unknown'} on{' '}
                            {new Date(q.createdAt || Date.now()).toLocaleDateString()}
                          </Typography>
                        </Box>
                        <Rating value={q.difficulty || 0} readOnly size="small" />
                      </Box>

                      <Typography variant="body1" paragraph>
                        {q.content}
                      </Typography>

                      {renderCodeSnippet(q.codeSnippet)}

                      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                        {q.tags && q.tags.map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            onClick={() => setSelectedTag(tag)}
                            color={selectedTag === tag ? 'primary' : 'default'}
                          />
                        ))}
                      </Stack>
                    </CardContent>

                    <CardActions sx={{ justifyContent: 'space-between' }}>
                      <Box>
                        <IconButton
                          size="small"
                          onClick={() => handleLike(q._id || q.id)}
                          color={(q.likes && q.author && q.likes.includes(q.author._id)) ? 'primary' : 'default'}
                        >
                          <ThumbUpIcon />
                          <Typography variant="body2" sx={{ ml: 0.5 }}>
                            {q.likes?.length || 0}
                          </Typography>
                        </IconButton>
                        <IconButton 
                          size="small"
                          onClick={() => toggleExpandQuestion(q._id || q.id)}
                        >
                          <CommentIcon />
                          <Typography variant="body2" sx={{ ml: 0.5 }}>
                            {q.comments?.length || 0}
                          </Typography>
                        </IconButton>
                        <Button
                          size="small"
                          startIcon={<QuestionAnswerIcon />}
                          variant="text"
                          color="primary"
                          onClick={() => handleOpenAnswerDialog(q)}
                          sx={{ ml: 1 }}
                        >
                          Answer
                        </Button>
                      </Box>
                    </CardActions>
                    
                    <Collapse in={expandedQuestionId === (q._id || q.id)} timeout="auto" unmountOnExit>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Answers ({q.comments?.length || 0})
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        
                        {q.comments && q.comments.length > 0 ? (
                          q.comments.map((comment, index) => (
                            <Box key={index} sx={{ mb: 2 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                                  {comment.author?.name?.[0] || 'A'}
                                </Avatar>
                                <Typography variant="subtitle2">
                                  {comment.author?.name || 'Anonymous'}
                                </Typography>
                                <Typography variant="caption" sx={{ ml: 1, color: 'text.secondary' }}>
                                  {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : 'Unknown date'}
                                </Typography>
                              </Box>
                              <Typography variant="body2" sx={{ ml: 5 }}>
                                {comment.content}
                              </Typography>
                              {comment.codeSnippet && (
                                <Box sx={{ ml: 5, mt: 1 }}>
                                  <Paper sx={{ p: 1.5, bgcolor: '#f5f5f5' }}>
                                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: '0.85rem' }}>
                                      {comment.codeSnippet}
                                    </pre>
                                  </Paper>
                                </Box>
                              )}
                            </Box>
                          ))
                        ) : (
                          <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                            No answers yet. Be the first to answer!
                          </Typography>
                        )}
                        
                        <Button
                          variant="outlined"
                          startIcon={<QuestionAnswerIcon />}
                          sx={{ mt: 1 }}
                          onClick={() => handleOpenAnswerDialog(q)}
                          disabled={!isLoggedIn}
                        >
                          Add an Answer
                        </Button>
                      </CardContent>
                    </Collapse>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))
            ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" gutterBottom>
                  No questions found
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Be the first to ask a question!
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={handleOpenDialog}
                  disabled={!isLoggedIn}
                >
                  Ask Question
                </Button>
              </Box>
            )}
          </List>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </>
      )}

      {/* Ask Question Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle 
          sx={{ 
            bgcolor: 'primary.main', 
            color: 'white',
            pt: 2,
            pb: 2
          }}
        >
          Ask a Question
        </DialogTitle>
        <DialogContent sx={{ pt: 3, pb: 1 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={question.title}
            onChange={(e) => setQuestion({ ...question, title: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Question"
            fullWidth
            multiline
            rows={4}
            value={question.content}
            onChange={(e) => setQuestion({ ...question, content: e.target.value })}
            sx={{ mb: 2 }}
          />
          
          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              <TagIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Tags
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <TextField
                size="small"
                label="Add Tag"
                value={question.currentTag}
                onChange={(e) =>
                  setQuestion({ ...question, currentTag: e.target.value })
                }
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && question.currentTag.trim()) {
                    handleAddTag();
                    e.preventDefault();
                  }
                }}
              />
              <Button
                variant="outlined"
                onClick={handleAddTag}
                disabled={!question.currentTag.trim()}
              >
                Add
              </Button>
            </Box>
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              {question.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => handleRemoveTag(tag)}
                />
              ))}
            </Stack>
          </Box>

          <Box sx={{ mt: 2, mb: 2 }}>
            <Button
              startIcon={<CodeIcon />}
              onClick={() => setShowCodeEditor(!showCodeEditor)}
              sx={{ mb: 1 }}
              variant="outlined"
            >
              {showCodeEditor ? 'Remove Code Snippet' : 'Add Code Snippet'}
            </Button>
            {showCodeEditor && (
              <Paper sx={{ p: 1, bgcolor: '#f5f5f5' }}>
                <TextareaAutosize
                  minRows={4}
                  placeholder="Paste your Verilog code here..."
                  value={question.codeSnippet}
                  onChange={(e) =>
                    setQuestion({ ...question, codeSnippet: e.target.value })
                  }
                  style={{ width: '100%', padding: '8px', fontFamily: 'monospace' }}
                />
              </Paper>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleCloseDialog} variant="outlined">Cancel</Button>
          <Button
            onClick={handleSubmitQuestion}
            variant="contained"
            color="primary"
            disabled={!question.title.trim() || !question.content.trim()}
          >
            Post Question
          </Button>
        </DialogActions>
      </Dialog>

      {/* Answer Dialog */}
      <Dialog 
        open={openAnswerDialog} 
        onClose={handleCloseAnswerDialog} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle 
          sx={{ 
            bgcolor: 'primary.main', 
            color: 'white',
            pt: 2,
            pb: 2
          }}
        >
          Answer Question
        </DialogTitle>
        <DialogContent sx={{ pt: 3, pb: 1 }}>
          {selectedQuestion && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                {selectedQuestion.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                You are answering {selectedQuestion.author?.name || 'Unknown'}'s question
              </Typography>
            </Box>
          )}
          
          <TextField
            autoFocus
            margin="dense"
            label="Your Answer"
            fullWidth
            multiline
            rows={4}
            value={answerContent}
            onChange={(e) => setAnswerContent(e.target.value)}
            sx={{ mb: 2 }}
          />
          
          <Box sx={{ mt: 2, mb: 2 }}>
            <Button
              startIcon={<CodeIcon />}
              onClick={() => setShowAnswerCodeEditor(!showAnswerCodeEditor)}
              sx={{ mb: 1 }}
              variant="outlined"
            >
              {showAnswerCodeEditor ? 'Remove Code Snippet' : 'Add Code Snippet'}
            </Button>
            {showAnswerCodeEditor && (
              <Paper sx={{ p: 1, bgcolor: '#f5f5f5' }}>
                <TextareaAutosize
                  minRows={4}
                  placeholder="Paste your Verilog code here..."
                  value={answerCodeSnippet}
                  onChange={(e) => setAnswerCodeSnippet(e.target.value)}
                  style={{ width: '100%', padding: '8px', fontFamily: 'monospace' }}
                />
              </Paper>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleCloseAnswerDialog} variant="outlined">Cancel</Button>
          <Button
            onClick={handleSubmitAnswer}
            variant="contained"
            color="primary"
            disabled={!answerContent.trim()}
            startIcon={<SendIcon />}
          >
            Post Answer
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
      />
    </Box>
  );
};

export default CommunityForum; 