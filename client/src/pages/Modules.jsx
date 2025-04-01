import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, Typography, Grid, Card, CardContent, CardMedia, CardActionArea, 
  Chip, TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem,
  Pagination, Divider
} from '@mui/material';
import { Search, FilterList } from '@mui/icons-material';

const Modules = () => {
  // State for filters and pagination
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [page, setPage] = useState(1);
  
  // Array of modules
  const modules = [
    {
      id: 1,
      title: "Verilog Fundamentals",
      description: "Master the basics of Verilog HDL and start your journey in digital design",
      level: "Beginner",
      duration: "4 weeks",
      image: "https://www.fpgakey.com/upload/2020/04/29/20200429102215-b170db2c.png",
      topics: [
        "Introduction to Hardware Description Languages",
        "Verilog Syntax and Basic Constructs",
        "Module Declaration and Instantiation",
        "Combinational Logic Design",
        "Sequential Logic Design",
        "Structural vs. Behavioral Modeling",
        "Test Bench Development"
      ],
      prerequisites: [],
      instructor: "Dr. Sarah Johnson",
      exercises: 12,
      enrolledCount: 2845
    },
    {
      id: 2,
      title: "Sequential Circuit Design",
      description: "Learn the principles of designing sequential logic circuits using Verilog",
      level: "Intermediate",
      duration: "3 weeks",
      image: "https://i.ytimg.com/vi/FZ0EQNF0Jig/maxresdefault.jpg",
      topics: [
        "Flip-Flops and Latches",
        "Registers and Counters",
        "Finite State Machines (FSM)",
        "FSM Encoding Techniques",
        "Clock Domain Crossing",
        "Metastability and Synchronization",
        "Sequential Optimizations"
      ],
      prerequisites: [1],
      instructor: "Prof. David Chang",
      exercises: 10,
      enrolledCount: 1876
    },
    {
      id: 3,
      title: "Advanced Testbench Techniques",
      description: "Master comprehensive verification strategies for complex digital designs",
      level: "Intermediate",
      duration: "4 weeks",
      image: "https://www.einfochips.com/blog/wp-content/uploads/2018/12/Functional_Verification_trend_in_SOC_Design_Blog_Fetaured_Image.jpg",
      topics: [
        "Self-Checking Testbenches",
        "Test Vectors and Stimulus Generation",
        "Assertions and Functional Coverage",
        "Scoreboarding Techniques",
        "Randomized Testing",
        "Code Coverage Analysis",
        "Verification Planning"
      ],
      prerequisites: [1],
      instructor: "Dr. Lisa Wong",
      exercises: 8,
      enrolledCount: 1532
    },
    {
      id: 4,
      title: "SystemVerilog for Verification",
      description: "Explore object-oriented verification using SystemVerilog",
      level: "Advanced",
      duration: "6 weeks",
      image: "https://www.design-reuse.com/news_img/20231113_systemverilog.png",
      topics: [
        "SystemVerilog Data Types",
        "Classes and Objects",
        "Inheritance and Polymorphism",
        "Interfaces and Modports",
        "Randomization and Constraints",
        "Functional Coverage",
        "Introduction to UVM"
      ],
      prerequisites: [1, 3],
      instructor: "Prof. Michael Chen",
      exercises: 14,
      enrolledCount: 985
    },
    {
      id: 5,
      title: "Universal Verification Methodology (UVM)",
      description: "Master the industry-standard verification methodology for complex designs",
      level: "Expert",
      duration: "8 weeks",
      image: "https://www.doulos.com/media/1097/uvm-methodology.png",
      topics: [
        "UVM Components and Architecture",
        "UVM Factory Pattern",
        "Sequences and Sequencers",
        "UVM Phases",
        "Configuring Testbenches",
        "Register Layer",
        "Advanced Scoreboards"
      ],
      prerequisites: [1, 3, 4],
      instructor: "Dr. James Roberts",
      exercises: 12,
      enrolledCount: 756
    },
    {
      id: 6,
      title: "FPGA Implementation Techniques",
      description: "Learn practical techniques for efficient FPGA implementation",
      level: "Intermediate",
      duration: "5 weeks",
      image: "https://www.eetasia.com/wp-content/uploads/sites/2/2023/02/FPGA-board-1024x570.jpg",
      topics: [
        "FPGA Architecture Overview",
        "Synthesis Optimization",
        "Timing Constraints",
        "Static Timing Analysis",
        "Clock Domain Crossing",
        "Resource Utilization",
        "Design for Debug"
      ],
      prerequisites: [1, 2],
      instructor: "Prof. Emily Rodriguez",
      exercises: 10,
      enrolledCount: 1245
    },
    {
      id: 7,
      title: "Arithmetic Circuit Design",
      description: "Master the design of efficient arithmetic circuits for digital systems",
      level: "Intermediate",
      duration: "4 weeks",
      image: "https://www.analog.com/-/media/images/analog-dialogue/en/volume-44/number-2/articles/adders-in-fpgas/adders-fig-01.svg?h=270&hash=F6EA8DA6E67B1E38E8C9A4BC90C5A5EB&la=en",
      topics: [
        "Adders and Subtractors",
        "Multipliers and Optimization",
        "Division Algorithms",
        "Floating-Point Arithmetic",
        "Fixed-Point Arithmetic",
        "DSP Block Utilization",
        "Pipelining for Performance"
      ],
      prerequisites: [1, 2],
      instructor: "Dr. Thomas Lee",
      exercises: 12,
      enrolledCount: 1105
    },
    {
      id: 8,
      title: "Memory Controller Design",
      description: "Learn to design efficient memory controllers for different memory technologies",
      level: "Advanced",
      duration: "5 weeks",
      image: "https://www.synopsys.com/content/dam/synopsys/solutions/interface-ip/images/hbm3-interface-ip-block-diagram-2550x1418.jpg.imgw.850.x.jpg",
      topics: [
        "Memory Technologies Overview",
        "SDRAM Controllers",
        "DDR4/DDR5 Interface Design",
        "Memory Timing Parameters",
        "Arbitration Schemes",
        "Cache Controllers",
        "Memory Testing and Verification"
      ],
      prerequisites: [1, 2, 6],
      instructor: "Prof. Robert Zhang",
      exercises: 9,
      enrolledCount: 785
    },
    {
      id: 9,
      title: "Low Power Design Techniques",
      description: "Master strategies to minimize power consumption in digital designs",
      level: "Advanced",
      duration: "4 weeks",
      image: "https://www.gartner.com/imagesrv/newsroom/images/power-consumption-semiconductor.jpg",
      topics: [
        "Power Consumption Fundamentals",
        "Clock Gating Techniques",
        "Power Gating and Isolation",
        "Multiple Voltage Domains",
        "Dynamic Frequency Scaling",
        "Low Power State Machines",
        "Power Analysis and Optimization"
      ],
      prerequisites: [1, 2, 6],
      instructor: "Dr. Laura Martinez",
      exercises: 8,
      enrolledCount: 692
    },
    {
      id: 10,
      title: "Hardware-Software Co-Design",
      description: "Learn techniques for designing hardware and software components together",
      level: "Advanced",
      duration: "6 weeks",
      image: "https://www.scielo.org.mx/img/revistas/cys/v22n4/2007-9737-cys-22-04-1129-gf1.jpg",
      topics: [
        "SoC Architecture",
        "Embedded Processor Integration",
        "Custom Instructions",
        "Hardware Accelerators",
        "Memory Architecture",
        "Interface Protocols",
        "Debugging Co-designed Systems"
      ],
      prerequisites: [1, 2, 6],
      instructor: "Prof. William Kim",
      exercises: 10,
      enrolledCount: 842
    },
    {
      id: 11,
      title: "High-Speed Interface Design",
      description: "Master the design of high-speed digital interfaces for modern systems",
      level: "Expert",
      duration: "6 weeks",
      image: "https://media.springernature.com/lw685/springer-static/image/art%3A10.1007%2Fs42835-020-00405-w/MediaObjects/42835_2020_405_Fig1_HTML.png",
      topics: [
        "High-Speed Signaling Fundamentals",
        "SerDes Architecture",
        "PCIe Interface Design",
        "Signal Integrity",
        "Equalization Techniques",
        "Clock and Data Recovery",
        "Jitter Analysis and Mitigation"
      ],
      prerequisites: [1, 2, 6, 8],
      instructor: "Dr. Richard Taylor",
      exercises: 8,
      enrolledCount: 574
    },
    {
      id: 12,
      title: "Design for Testability",
      description: "Learn techniques to make digital designs easily testable",
      level: "Intermediate",
      duration: "4 weeks",
      image: "https://www.doulos.com/media/1083/scan-based-testing-figure.png",
      topics: [
        "DFT Fundamentals",
        "Scan Chain Design",
        "ATPG Principles",
        "Boundary Scan (JTAG)",
        "Built-In Self-Test (BIST)",
        "Memory Testing",
        "DFT for SoC Designs"
      ],
      prerequisites: [1, 2],
      instructor: "Prof. Sandra Patel",
      exercises: 9,
      enrolledCount: 653
    },
    {
      id: 13,
      title: "Formal Verification Techniques",
      description: "Master mathematical methods to prove design correctness",
      level: "Expert",
      duration: "5 weeks",
      image: "https://www.design-reuse.com/news_img/1622_formal-verification-in-chip-design.jpg",
      topics: [
        "Formal Verification Fundamentals",
        "Property Specification",
        "SystemVerilog Assertions (SVA)",
        "Formal Property Verification",
        "Equivalence Checking",
        "Model Checking",
        "Formal Coverage Analysis"
      ],
      prerequisites: [1, 3, 4],
      instructor: "Dr. Alan Wilson",
      exercises: 7,
      enrolledCount: 489
    },
    {
      id: 14,
      title: "Advanced SystemVerilog Features",
      description: "Explore advanced language features and design patterns in SystemVerilog",
      level: "Expert",
      duration: "6 weeks",
      image: "https://media.springernature.com/lw685/springer-static/image/art%3A10.1007%2Fs00542-020-04951-1/MediaObjects/542_2020_4951_Fig1_HTML.png",
      topics: [
        "Advanced Data Types",
        "Interfaces and Virtual Interfaces",
        "Design Patterns in SystemVerilog",
        "Anonymous Programs",
        "Parameterization Techniques",
        "Assertion-Based Verification",
        "SystemVerilog DPI"
      ],
      prerequisites: [1, 4],
      instructor: "Prof. Mark Johnson",
      exercises: 11,
      enrolledCount: 512
    },
    {
      id: 15,
      title: "Error Detection and Correction",
      description: "Learn techniques for implementing reliable communications in digital systems",
      level: "Intermediate",
      duration: "4 weeks",
      image: "https://www.researchgate.net/publication/351638232/figure/fig3/AS:1024095551283201@1621360723372/Hardware-implementation-of-the-LDPC-decoder-with-the-optimized-architecture.png",
      topics: [
        "Error Control Coding Basics",
        "Parity and Checksum",
        "CRC Design and Implementation",
        "Hamming Codes",
        "Reed-Solomon Codes",
        "LDPC Codes",
        "Hardware Implementation Techniques"
      ],
      prerequisites: [1, 7],
      instructor: "Dr. Christine Moore",
      exercises: 8,
      enrolledCount: 723
    },
    {
      id: 16,
      title: "Advanced Finite State Machines",
      description: "Master complex state machine design techniques and optimizations",
      level: "Advanced",
      duration: "5 weeks",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Finite_state_machine_example_with_comments.svg/1200px-Finite_state_machine_example_with_comments.svg.png",
      topics: [
        "Hierarchical State Machines",
        "One-Hot vs. Encoded FSMs",
        "State Minimization",
        "Multi-Clock Domain FSMs",
        "Safe State Machine Design",
        "FSM with Datapath",
        "Formal Verification of FSMs"
      ],
      prerequisites: [1, 2],
      instructor: "Prof. Jennifer Adams",
      exercises: 10,
      enrolledCount: 894
    },
    {
      id: 17,
      title: "Digital Signal Processing with FPGAs",
      description: "Implement efficient DSP algorithms on FPGAs using Verilog",
      level: "Advanced",
      duration: "7 weeks",
      image: "https://www.allaboutcircuits.com/uploads/articles/introduction-to-fpga-external-ram-for-a-digital-signal-processing-circuit-aac-fet.jpg",
      topics: [
        "DSP Fundamentals for Hardware",
        "FIR Filter Implementation",
        "IIR Filter Design",
        "FFT Architectures",
        "Polyphase Filters",
        "DSP48 Block Utilization",
        "Streaming DSP Implementations"
      ],
      prerequisites: [1, 6, 7],
      instructor: "Dr. Andrew Parker",
      exercises: 12,
      enrolledCount: 756
    },
    {
      id: 18,
      title: "Microprocessor Design",
      description: "Design a complete RISC microprocessor from scratch",
      level: "Expert",
      duration: "8 weeks",
      image: "https://www.elprocus.com/wp-content/uploads/2023/02/RISC-Processor.png",
      topics: [
        "CPU Architecture Fundamentals",
        "Single-Cycle RISC Processor",
        "Multi-Cycle Implementation",
        "Pipelined Processor Design",
        "Hazard Resolution",
        "Branch Prediction",
        "Memory Hierarchy"
      ],
      prerequisites: [1, 2, 6, 7, 10],
      instructor: "Prof. Daniel Wright",
      exercises: 14,
      enrolledCount: 612
    },
    {
      id: 19,
      title: "NOC and Interconnect Design",
      description: "Master techniques for designing efficient on-chip communication networks",
      level: "Expert",
      duration: "6 weeks",
      image: "https://www.mdpi.com/electronics/electronics-10-02697/article_deploy/html/images/electronics-10-02697-g002.png",
      topics: [
        "SoC Interconnect Fundamentals",
        "Bus Architectures",
        "Crossbar Switch Design",
        "Network-on-Chip Topologies",
        "Routing Algorithms",
        "Flow Control Mechanisms",
        "QoS in On-Chip Networks"
      ],
      prerequisites: [1, 2, 6, 10],
      instructor: "Dr. Michelle Lin",
      exercises: 9,
      enrolledCount: 423
    },
    {
      id: 20,
      title: "AXI Protocol Implementation",
      description: "Design and implement AXI-compliant interfaces for SoC integration",
      level: "Advanced",
      duration: "5 weeks",
      image: "https://www.design-reuse.com/news_img/20211115_2.png",
      topics: [
        "AXI Protocol Overview",
        "AXI-Lite Implementation",
        "Full AXI4 Interface Design",
        "AXI Stream Interface",
        "AXI Interconnect",
        "AXI Clock Domain Crossing",
        "AXI Performance Optimization"
      ],
      prerequisites: [1, 2, 6, 10],
      instructor: "Prof. Gregory Evans",
      exercises: 10,
      enrolledCount: 518
    },
    {
      id: 21,
      title: "Hardware Security",
      description: "Learn techniques to protect hardware designs from security threats",
      level: "Advanced",
      duration: "5 weeks",
      image: "https://www.mdpi.com/electronics/electronics-09-00097/article_deploy/html/images/electronics-09-00097-g001.png",
      topics: [
        "Hardware Security Fundamentals",
        "Side-Channel Attacks",
        "Physical Unclonable Functions (PUFs)",
        "Secure Boot and Authentication",
        "Hardware Trojans",
        "Cryptographic Hardware",
        "Design Obfuscation"
      ],
      prerequisites: [1, 2, 6],
      instructor: "Dr. Nicholas Rivera",
      exercises: 8,
      enrolledCount: 675
    },
    {
      id: 22,
      title: "Mixed-Signal Verification",
      description: "Master techniques for verifying designs with analog and digital components",
      level: "Expert",
      duration: "6 weeks",
      image: "https://www.truenorth-compliance.com/wp-content/uploads/2019/11/mixed-signal.jpg",
      topics: [
        "Mixed-Signal Design Concepts",
        "AMS Extensions in Verilog-AMS",
        "Real Number Modeling",
        "Digital Control of Analog Circuits",
        "Data Converters (ADC/DAC)",
        "PLL Verification",
        "Mixed-Signal Testbenches"
      ],
      prerequisites: [1, 3, 4],
      instructor: "Prof. Diana Scott",
      exercises: 9,
      enrolledCount: 384
    },
    {
      id: 23,
      title: "RISC-V Processor Design",
      description: "Implement a complete RISC-V processor with advanced features",
      level: "Expert",
      duration: "10 weeks",
      image: "https://www.cnx-software.com/wp-content/uploads/2020/10/RISC-V-VegaFEmicro.jpg",
      topics: [
        "RISC-V ISA Fundamentals",
        "Base Integer Instructions (RV32I)",
        "Pipeline Implementation",
        "Hazard Resolution",
        "Branch Prediction",
        "Memory Hierarchy",
        "Extension Support (M, F, C)"
      ],
      prerequisites: [1, 2, 6, 7, 10, 18],
      instructor: "Dr. Brian Miller",
      exercises: 15,
      enrolledCount: 542
    },
    {
      id: 24,
      title: "High-Level Synthesis",
      description: "Learn to design hardware using high-level programming languages",
      level: "Intermediate",
      duration: "5 weeks",
      image: "https://www.aldec.com/images/content/articles/hls_flow.png",
      topics: [
        "HLS Fundamentals",
        "C/C++ for Hardware Design",
        "Interfaces and Protocols",
        "Loop Optimizations",
        "Memory Architecture",
        "Timing and Resource Constraints",
        "Verification of HLS Designs"
      ],
      prerequisites: [1, 2, 6],
      instructor: "Prof. Rebecca Torres",
      exercises: 11,
      enrolledCount: 867
    }
  ];

  // Filter modules based on search and filters
  const filteredModules = modules.filter(module => {
    const matchesSearch = module.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         module.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         module.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || module.level === categoryFilter;
    const matchesLevel = levelFilter === 'all' || module.level === levelFilter;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  // Get unique categories and levels for filter options
  const categories = [...new Set(modules.map(module => module.level))];
  const levels = [...new Set(modules.map(module => module.level))];

  // Pagination logic
  const modulesPerPage = 6;
  const pagesCount = Math.ceil(filteredModules.length / modulesPerPage);
  const displayedModules = filteredModules.slice(
    (page - 1) * modulesPerPage,
    page * modulesPerPage
  );

  return (
    <Box className="container page-container">
      <Typography variant="h3" component="h1" gutterBottom color="primary">
        VeriGeek Learning Modules
      </Typography>
      <Typography variant="subtitle1" paragraph sx={{ mb: 4 }}>
        Browse our comprehensive collection of Verilog modules designed to take you from beginner to expert. Each module contains theory, examples, and hands-on exercises.
      </Typography>

      {/* Search and Filters */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Search Modules"
            placeholder="Search by title, description, or topics"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="category-filter-label">Category</InputLabel>
            <Select
              labelId="category-filter-label"
              id="category-filter"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              label="Category"
              startAdornment={
                <InputAdornment position="start">
                  <FilterList />
                </InputAdornment>
              }
            >
              <MenuItem value="all">All Categories</MenuItem>
              {categories.map(category => (
                <MenuItem key={category} value={category}>{category}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="level-filter-label">Level</InputLabel>
            <Select
              labelId="level-filter-label"
              id="level-filter"
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              label="Level"
              startAdornment={
                <InputAdornment position="start">
                  <FilterList />
                </InputAdornment>
              }
            >
              <MenuItem value="all">All Levels</MenuItem>
              {levels.map(level => (
                <MenuItem key={level} value={level}>{level}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Results info */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="body2" color="text.secondary">
          Showing {displayedModules.length} of {filteredModules.length} modules
        </Typography>
      </Box>

      {/* Modules Grid */}
      {displayedModules.length > 0 ? (
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {displayedModules.map(module => (
            <Grid item xs={12} sm={6} md={4} key={module.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'translateY(-8px)', boxShadow: 6 } }}>
                <CardActionArea component={Link} to={`/modules/${module.id}`}>
                  <CardMedia
                    component="img"
                    height="160"
                    image={module.image}
                    alt={module.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h3" gutterBottom noWrap>
                      {module.title}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                      <Chip 
                        label={module.level} 
                        size="small" 
                        sx={{ 
                          backgroundColor: module.level === 'Beginner' ? '#e3f2fd' : 
                                          module.level === 'Intermediate' ? '#fff8e1' : '#fbe9e7',
                          color: module.level === 'Beginner' ? '#0277bd' : 
                                module.level === 'Intermediate' ? '#ff8f00' : '#e64a19',
                          fontWeight: 500,
                          borderRadius: '4px'
                        }} 
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {module.description}
                    </Typography>
                    <Box sx={{ mt: 1, mb: 2 }}>
                      {module.topics.slice(0, 3).map((topic, index) => (
                        <Chip
                          key={index}
                          label={topic}
                          size="small"
                          sx={{ mr: 0.5, mb: 0.5, backgroundColor: 'rgba(106, 13, 173, 0.08)', fontSize: '0.7rem' }}
                        />
                      ))}
                      {module.topics.length > 3 && (
                        <Chip
                          label={`+${module.topics.length - 3} more`}
                          size="small"
                          sx={{ mb: 0.5, backgroundColor: 'rgba(106, 13, 173, 0.04)', fontSize: '0.7rem' }}
                        />
                      )}
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        ⭐ {module.rating} ({module.students})
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {module.lessons} lessons • {module.exercises} exercises
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', my: 8 }}>
          <Typography variant="h6">
            No modules found matching your criteria
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search or filters
          </Typography>
        </Box>
      )}

      {/* Pagination */}
      {pagesCount > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination 
            count={pagesCount} 
            page={page} 
            onChange={(event, value) => setPage(value)}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Box>
  );
};

export default Modules; 