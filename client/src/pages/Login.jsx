import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Box, Typography, TextField, Button, Paper, Grid, 
  Divider, Checkbox, FormControlLabel, Snackbar, Alert,
  InputAdornment, IconButton
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'info'
  });
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'rememberMe' ? checked : value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Demo credentials check
      if (formData.email === 'user@example.com' && formData.password === 'password') {
        setNotification({
          open: true,
          message: 'Login successful! Redirecting...',
          severity: 'success'
        });
        
        // Simulate storing token
        localStorage.setItem('demoUserLoggedIn', 'true');
        
        // Redirect after a delay
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        setNotification({
          open: true,
          message: 'Invalid credentials. Try email: user@example.com, password: password',
          severity: 'error'
        });
      }
    }
  };

  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false
    });
  };

  return (
    <Box className="container page-container">
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
            {/* Logo and Title */}
            <Box sx={{ mb: 3, textAlign: 'center' }}>
              <Box 
                component="img" 
                src="/images/LOGO.png" 
                alt="VeriGeek Logo" 
                sx={{ 
                  width: 120, 
                  mb: 2 
                }}
              />
              <Typography component="h1" variant="h5" gutterBottom>
                Sign in to VeriGeek
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                Empower Your Logic, Code Your Circuit!
              </Typography>
            </Box>
            
            <form onSubmit={handleSubmit} noValidate>
              <TextField
                fullWidth
                margin="normal"
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                error={!!errors.email}
                helperText={errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
              />
              
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      name="rememberMe" 
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      color="primary"
                    />
                  }
                  label="Remember me"
                />
                
                <Link to="/forgot-password" style={{ color: '#6a0dad', textDecoration: 'none' }}>
                  Forgot password?
                </Link>
              </Box>
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              
              <Divider sx={{ my: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  OR
                </Typography>
              </Divider>
              
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2">
                  Don't have an account yet?{' '}
                  <Link to="/register" style={{ color: '#6a0dad', textDecoration: 'none' }}>
                    Sign Up
                  </Link>
                </Typography>
              </Box>
            </form>
          </Paper>
          
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              For demo purposes, use: <br />
              Email: user@example.com <br />
              Password: password
            </Typography>
          </Box>
        </Grid>
      </Grid>
      
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login; 