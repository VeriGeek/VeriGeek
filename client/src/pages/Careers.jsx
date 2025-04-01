import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box, Typography, Grid, Paper, Tabs, Tab, Accordion, AccordionSummary,
  AccordionDetails, Divider, Button, Card, CardContent, Chip, List,
  ListItem, ListItemIcon, ListItemText
} from '@mui/material';
import {
  ExpandMore, Work, School, TrendingUp, Business, Engineering,
  PlayArrow, Timeline, Check, ComputerOutlined, MemoryOutlined,
  AssessmentOutlined, DataObjectOutlined, DeveloperBoardOutlined
} from '@mui/icons-material';

const Careers = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // VLSI career roles data
  const careerRoles = [
    {
      title: 'RTL Design Engineer',
      description: 'Design digital circuits using hardware description languages (HDLs) like Verilog and VHDL.',
      responsibilities: [
        'Translate specifications into synthesizable RTL code',
        'Create and optimize digital circuits for performance, power, and area',
        'Develop testbenches for functional verification',
        'Debug and fix design issues',
        'Collaborate with verification and physical design teams'
      ],
      skills: [
        'Verilog/VHDL',
        'Digital Design Concepts',
        'Logic Design',
        'Timing Analysis',
        'Low Power Design Techniques'
      ],
      education: 'B.S./M.S. in Electrical/Computer Engineering',
      salary: '$110,000 - $150,000',
      growth: 'Steady',
      companies: ['Intel', 'AMD', 'Nvidia', 'Qualcomm', 'Apple', 'Samsung'],
      icon: <Engineering />
    },
    {
      title: 'Verification Engineer',
      description: 'Ensure RTL designs meet specifications through comprehensive testing and verification approaches.',
      responsibilities: [
        'Develop verification plans and testbenches',
        'Implement coverage-driven verification strategies',
        'Create assertions to verify design properties',
        'Perform functional and formal verification',
        'Debug design issues and collaborate with design teams'
      ],
      skills: [
        'SystemVerilog',
        'UVM (Universal Verification Methodology)',
        'Assertions',
        'Functional Coverage',
        'Simulation Tools (VCS, ModelSim, etc.)'
      ],
      education: 'B.S./M.S. in Electrical/Computer Engineering',
      salary: '$115,000 - $160,000',
      growth: 'High',
      companies: ['Synopsys', 'Cadence', 'Intel', 'AMD', 'Broadcom', 'MediaTek'],
      icon: <AssessmentOutlined />
    },
    {
      title: 'Physical Design Engineer',
      description: 'Transform RTL code into optimized physical layouts for semiconductor manufacturing.',
      responsibilities: [
        'Floorplan design and optimization',
        'Placement and routing of logic cells',
        'Clock tree synthesis',
        'Timing closure and signoff',
        'Design rule checking (DRC) and layout vs. schematic (LVS) verification'
      ],
      skills: [
        'Physical Design Flow',
        'Placement & Routing Tools',
        'Timing Analysis',
        'Power Analysis',
        'DRC/LVS Verification'
      ],
      education: 'B.S./M.S. in Electrical/Computer Engineering',
      salary: '$120,000 - $165,000',
      growth: 'Steady',
      companies: ['TSMC', 'Global Foundries', 'Intel', 'Samsung', 'Qualcomm', 'Apple'],
      icon: <DeveloperBoardOutlined />
    },
    {
      title: 'FPGA Engineer',
      description: 'Design and implement digital systems on field-programmable gate arrays (FPGAs).',
      responsibilities: [
        'Develop RTL code for FPGA implementation',
        'Perform synthesis, place and route',
        'Create timing constraints',
        'Debug and optimize designs for performance',
        'Develop test frameworks and validation'
      ],
      skills: [
        'Verilog/VHDL',
        'FPGA Architecture',
        'Synthesis Tools (Vivado, Quartus)',
        'Timing Constraints',
        'Debugging Tools'
      ],
      education: 'B.S./M.S. in Electrical/Computer Engineering',
      salary: '$100,000 - $140,000',
      growth: 'Moderate',
      companies: ['Xilinx/AMD', 'Intel', 'Microchip', 'Lattice Semiconductor', 'Defense Contractors'],
      icon: <MemoryOutlined />
    },
    {
      title: 'DFT Engineer',
      description: 'Design for Testability (DFT) engineers ensure that manufactured chips can be tested effectively.',
      responsibilities: [
        'Implement scan chain insertion and test logic',
        'Develop ATPG (Automatic Test Pattern Generation) strategies',
        'Implement BIST (Built-In Self-Test) circuits',
        'Optimize test coverage and test time',
        'Create test plans and collaborate with test engineers'
      ],
      skills: [
        'DFT Methodologies',
        'ATPG Tools',
        'Scan Insertion',
        'BIST Design',
        'Boundary Scan/JTAG'
      ],
      education: 'B.S./M.S. in Electrical/Computer Engineering',
      salary: '$110,000 - $150,000',
      growth: 'Moderate',
      companies: ['Intel', 'Qualcomm', 'Broadcom', 'NXP', 'Mentor Graphics/Siemens'],
      icon: <DataObjectOutlined />
    },
    {
      title: 'Analog/Mixed-Signal Design Engineer',
      description: 'Design analog and mixed-signal circuits like PLLs, ADCs, DACs, and high-speed interfaces.',
      responsibilities: [
        'Design analog and mixed-signal circuits',
        'Perform circuit simulation and analysis',
        'Create and review schematics and layouts',
        'Characterize and validate circuits',
        'Debug and optimize for performance'
      ],
      skills: [
        'Analog Circuit Design',
        'Mixed-Signal Design',
        'SPICE Simulation',
        'Layout Tools',
        'Signal Integrity Analysis'
      ],
      education: 'M.S./Ph.D. in Electrical Engineering',
      salary: '$130,000 - $180,000',
      growth: 'Moderate',
      companies: ['Texas Instruments', 'Analog Devices', 'Infineon', 'NXP', 'Skyworks', 'Qualcomm'],
      icon: <ComputerOutlined />
    }
  ];

  // Industry trends data
  const industryTrends = [
    {
      title: 'AI Hardware Acceleration',
      description: 'The rapid growth of artificial intelligence applications is driving demand for specialized hardware accelerators, including GPUs, TPUs, and custom ASIC solutions.',
      impact: 'Companies are hiring VLSI engineers with experience in designing efficient compute architectures for machine learning workloads.',
      timeframe: 'Current and growing over next 5 years'
    },
    {
      title: 'RISC-V Adoption',
      description: 'The open-source RISC-V instruction set architecture is gaining momentum in the industry as an alternative to proprietary architectures.',
      impact: 'Creates opportunities for engineers with expertise in processor design and RISC-V implementation.',
      timeframe: 'Growing over next 3-5 years'
    },
    {
      title: 'Chiplet-Based Architecture',
      description: 'Companies are moving from monolithic chips to smaller, specialized chiplets that are integrated together, enabling more complex systems and better yield.',
      impact: 'Increasing demand for engineers skilled in high-speed interfaces, packaging technologies, and system integration.',
      timeframe: 'Current and growing over next 3-4 years'
    },
    {
      title: 'Hardware Security',
      description: 'With growing concerns about hardware vulnerabilities, companies are focusing on security features built directly into hardware designs.',
      impact: 'Rising demand for VLSI engineers with expertise in security protocols, secure boot, trusted execution environments, and side-channel attack prevention.',
      timeframe: 'Current and ongoing'
    },
    {
      title: '3D Integration',
      description: 'Three-dimensional integration of chips allows for higher density and performance with lower power consumption.',
      impact: 'Creates opportunities for engineers with knowledge of 3D design methodologies, through-silicon vias (TSVs), and thermal management.',
      timeframe: 'Growing over next 3-5 years'
    }
  ];

  // Educational paths data
  const educationPaths = [
    {
      degree: 'Bachelor\'s Degree in Electrical/Computer Engineering',
      description: 'Provides foundational knowledge in digital logic, circuit design, and computer architecture.',
      courses: [
        'Digital Logic Design',
        'Computer Architecture',
        'Electronic Circuits',
        'Signals and Systems',
        'Semiconductor Devices'
      ],
      duration: '4 years',
      career: 'Entry-level positions in RTL design, verification, or FPGA development'
    },
    {
      degree: 'Master\'s Degree in VLSI/Microelectronics',
      description: 'Offers specialized knowledge in advanced digital design, semiconductor physics, and EDA tools.',
      courses: [
        'Advanced VLSI Design',
        'Digital System Testing',
        'Low Power Design',
        'Physical Design Automation',
        'Hardware Security'
      ],
      duration: '1.5-2 years',
      career: 'Mid-level positions in design, verification, or physical design'
    },
    {
      degree: 'Ph.D. in Electrical Engineering (VLSI focus)',
      description: 'Involves original research in specialized areas like novel architectures, emerging technologies, or design methodologies.',
      courses: [
        'Advanced research seminars',
        'Specialized topics based on research area',
        'Dissertation research'
      ],
      duration: '4-6 years',
      career: 'Research positions, architecture development, or specialized design roles'
    },
    {
      degree: 'Industry Certifications',
      description: 'Specialized certifications from tool vendors or industry associations that demonstrate expertise in specific areas.',
      courses: [
        'Synopsys Certified Professional',
        'Cadence Certified Expert',
        'Xilinx/AMD Certified Developer',
        'UVM Methodology Certification'
      ],
      duration: 'Varies (typically weeks to months)',
      career: 'Enhances credentials for specialized roles or tool expertise'
    }
  ];

  // Render content based on active tab
  const renderTabContent = () => {
    switch (tabValue) {
      case 0: // Career Roles
        return (
          <Grid container spacing={4}>
            {careerRoles.map((role, index) => (
              <Grid item xs={12} key={index}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                      <Box sx={{ 
                        backgroundColor: 'rgba(106, 13, 173, 0.1)', 
                        borderRadius: '50%', 
                        p: 1,
                        mr: 2,
                        color: '#6a0dad'
                      }}>
                        {role.icon}
                      </Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6">{role.title}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {role.description}
                        </Typography>
                      </Box>
                      <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 3 }}>
                        <Box>
                          <Typography variant="caption" color="text.secondary">Salary Range</Typography>
                          <Typography variant="body2" fontWeight="medium">{role.salary}</Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary">Growth</Typography>
                          <Typography variant="body2" fontWeight="medium">{role.growth}</Typography>
                        </Box>
                      </Box>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                          Key Responsibilities
                        </Typography>
                        <List dense>
                          {role.responsibilities.map((resp, i) => (
                            <ListItem key={i}>
                              <ListItemIcon sx={{ minWidth: 32 }}>
                                <PlayArrow color="primary" fontSize="small" />
                              </ListItemIcon>
                              <ListItemText primary={resp} />
                            </ListItem>
                          ))}
                        </List>
                        
                        <Typography variant="subtitle1" gutterBottom fontWeight="medium" sx={{ mt: 2 }}>
                          Required Skills
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                          {role.skills.map((skill, i) => (
                            <Chip 
                              key={i} 
                              label={skill} 
                              sx={{ backgroundColor: 'rgba(106, 13, 173, 0.08)' }} 
                            />
                          ))}
                        </Box>
                        
                        <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                          Typical Education
                        </Typography>
                        <Typography variant="body2" paragraph>
                          {role.education}
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                          Top Companies Hiring
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                          {role.companies.map((company, i) => (
                            <Chip 
                              key={i} 
                              label={company} 
                              variant="outlined"
                              sx={{ borderColor: 'rgba(106, 13, 173, 0.3)' }} 
                            />
                          ))}
                        </Box>
                        
                        <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                          Career Path Progression
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Timeline color="primary" sx={{ mr: 1 }} />
                          <Typography variant="body2">Junior {role.title} (0-3 years)</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Timeline color="primary" sx={{ mr: 1 }} />
                          <Typography variant="body2">{role.title} (3-7 years)</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Timeline color="primary" sx={{ mr: 1 }} />
                          <Typography variant="body2">Senior {role.title} (7+ years)</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Timeline color="primary" sx={{ mr: 1 }} />
                          <Typography variant="body2">Lead/Principal Engineer or Technical Manager (10+ years)</Typography>
                        </Box>
                        
                        <Button 
                          variant="contained" 
                          color="primary" 
                          sx={{ mt: 3 }}
                          component="a"
                          href="/modules"
                        >
                          Explore Related Modules
                        </Button>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            ))}
          </Grid>
        );
        
      case 1: // Industry Trends
        return (
          <Grid container spacing={4}>
            {industryTrends.map((trend, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper elevation={2} sx={{ p: 3, height: '100%', borderLeft: '4px solid #6a0dad' }}>
                  <Typography variant="h6" gutterBottom>
                    {trend.title}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {trend.description}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" gutterBottom color="primary">
                    Career Impact
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {trend.impact}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TrendingUp sx={{ color: 'text.secondary', mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      Timeframe: {trend.timeframe}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
            
            <Grid item xs={12}>
              <Paper elevation={1} sx={{ p: 3, mt: 2, bgcolor: 'rgba(106, 13, 173, 0.04)' }}>
                <Typography variant="h6" gutterBottom>
                  Stay Ahead of the Curve
                </Typography>
                <Typography variant="body2" paragraph>
                  Keep up with the latest VLSI industry trends and technologies through our regularly updated modules and resources.
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary"
                  component="a"
                  href="/resources"
                >
                  Explore Industry Resources
                </Button>
              </Paper>
            </Grid>
          </Grid>
        );
        
      case 2: // Education Paths
        return (
          <Grid container spacing={4}>
            {educationPaths.map((path, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card elevation={3} sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <School color="primary" sx={{ mr: 2 }} />
                      <Typography variant="h6">
                        {path.degree}
                      </Typography>
                    </Box>
                    <Typography variant="body2" paragraph>
                      {path.description}
                    </Typography>
                    
                    <Typography variant="subtitle2" gutterBottom color="primary">
                      Key Courses/Components
                    </Typography>
                    <List dense>
                      {path.courses.map((course, i) => (
                        <ListItem key={i} disableGutters>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <Check color="primary" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={course} />
                        </ListItem>
                      ))}
                    </List>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary">
                          Typical Duration
                        </Typography>
                        <Typography variant="body2" fontWeight="medium">
                          {path.duration}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary">
                          Career Opportunities
                        </Typography>
                        <Typography variant="body2">
                          {path.career}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
            
            <Grid item xs={12}>
              <Paper elevation={1} sx={{ p: 3, mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Continuous Learning is Key
                </Typography>
                <Typography variant="body2" paragraph>
                  The VLSI field evolves rapidly. Beyond formal education, continuous learning through online courses, certifications, and hands-on projects is essential for career growth.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button 
                    variant="contained" 
                    color="primary"
                    component="a"
                    href="/modules"
                  >
                    Explore Our Modules
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="primary"
                    component="a"
                    href="/resources"
                  >
                    Learning Resources
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        );
        
      default:
        return null;
    }
  };

  return (
    <Box className="container page-container">
      <Typography variant="h3" component="h1" gutterBottom color="primary">
        VLSI Career Center
      </Typography>
      <Typography variant="subtitle1" paragraph sx={{ mb: 4 }}>
        Explore career paths, industry trends, and educational requirements for VLSI and digital design professionals
      </Typography>

      {/* Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <Work sx={{ fontSize: 60, color: '#6a0dad', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Diverse Career Paths
            </Typography>
            <Typography>
              The VLSI industry offers multiple specialized career tracks from RTL design to verification, physical design, and more.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <School sx={{ fontSize: 60, color: '#6a0dad', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Educational Pathways
            </Typography>
            <Typography>
              Learn about degree programs, certifications, and continuous learning opportunities to advance your VLSI career.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <Business sx={{ fontSize: 60, color: '#6a0dad', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Industry Insights
            </Typography>
            <Typography>
              Stay informed about the latest trends, technologies, and job market conditions in the semiconductor industry.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Market Overview */}
      <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          VLSI Job Market Overview
        </Typography>
        <Typography variant="body1" paragraph>
          The semiconductor industry is experiencing strong growth driven by emerging technologies like AI, IoT, autonomous vehicles, and 5G. This growth is creating sustained demand for VLSI design and verification engineers across various specializations.
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="primary" fontWeight="bold">
                $605B
              </Typography>
              <Typography variant="body2">
                Global semiconductor market size (2023)
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="primary" fontWeight="bold">
                14%
              </Typography>
              <Typography variant="body2">
                YoY growth in VLSI job openings
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="primary" fontWeight="bold">
                $137K
              </Typography>
              <Typography variant="body2">
                Average VLSI engineer salary in the US
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="primary" fontWeight="bold">
                5-7%
              </Typography>
              <Typography variant="body2">
                Projected annual job growth (2023-2028)
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabs for different career info */}
      <Box sx={{ width: '100%', mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          centered
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Career Roles" icon={<Work />} iconPosition="start" />
          <Tab label="Industry Trends" icon={<TrendingUp />} iconPosition="start" />
          <Tab label="Education Paths" icon={<School />} iconPosition="start" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box sx={{ mt: 3 }}>
        {renderTabContent()}
      </Box>

      {/* Call to Action */}
      <Box sx={{ textAlign: 'center', py: 6, mt: 6, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Ready to advance your VLSI career?
        </Typography>
        <Typography paragraph sx={{ maxWidth: '700px', mx: 'auto', mb: 3 }}>
          Our comprehensive modules and resources are designed to help you build the skills needed for today's competitive VLSI job market.
        </Typography>
        <Box>
          <Button 
            variant="contained" 
            color="primary"
            size="large"
            sx={{ mr: 2 }}
            component="a"
            href="/modules"
          >
            Explore Learning Modules
          </Button>
          <Button 
            variant="outlined"
            color="primary"
            size="large"
            component="a"
            href="/resources"
          >
            Industry Resources
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Careers; 