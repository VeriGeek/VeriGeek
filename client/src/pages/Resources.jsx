import React, { useState, useEffect, useCallback } from 'react';
import { 
  Box, Typography, Grid, Paper, Tabs, Tab, Card, CardContent, 
  CardActions, Button, Divider, List, ListItem, ListItemIcon, 
  ListItemText, TextField, InputAdornment, Chip, CircularProgress
} from '@mui/material';
import { 
  MenuBook, Code, YouTube, School, Search, FilterList,
  ImportContacts, Laptop, Link as LinkIcon, DesignServices, Assignment 
} from '@mui/icons-material';

// Custom hook for image preloading
const useImagePreloader = (images) => {
  const [loadedImages, setLoadedImages] = useState({});
  
  useEffect(() => {
    // Create an array of image loading promises
    const imagePromises = Object.entries(images).map(([id, src]) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          setLoadedImages(prev => ({ ...prev, [id]: true }));
          resolve(id);
        };
        img.onerror = () => {
          setLoadedImages(prev => ({ ...prev, [id]: false }));
          reject(id);
        };
      });
    });
    
    // Load all images in parallel
    Promise.allSettled(imagePromises).then(results => {
      console.log('All images processed');
    });
  }, [images]);
  
  return [loadedImages, setLoadedImages];
};

const Resources = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Resource categories
  const categories = ['All', 'Books', 'Tools', 'Videos', 'Courses', 'Papers', 'Communities'];

  // Resources data
  const resources = [
    // Books
    {
      id: 1,
      title: "Digital Design and Computer Architecture: RISC-V Edition",
      author: "Sarah Harris, David Harris",
      description: "Comprehensive textbook covering digital design principles and RISC-V architecture implementation.",
      link: "https://www.amazon.com/Digital-Design-Computer-Architecture-RISC-V/dp/0128200642",
      category: "Books",
      tags: ["Digital Design", "RISC-V", "Computer Architecture"],
      featured: true,
      image: process.env.PUBLIC_URL + '/images/resources/books/digital-design-riscv.jpg'
    },
    {
      id: 2,
      title: "SystemVerilog for Verification",
      author: "Chris Spear, Greg Tumbush",
      description: "A guide to learning the SystemVerilog for hardware verification and comprehensive coverage of the language features.",
      link: "https://www.amazon.com/SystemVerilog-Verification-Learning-Testbench-Language/dp/1461407141",
      category: "Books",
      tags: ["SystemVerilog", "Verification", "HDL"],
      featured: true,
      image: process.env.PUBLIC_URL + '/images/resources/books/systemverilog.jpg'
    },
    {
      id: 3,
      title: "CMOS VLSI Design",
      author: "Neil Weste, David Harris",
      description: "Essential textbook covering CMOS circuit design principles, layout, and system-level considerations.",
      link: "https://www.amazon.com/CMOS-VLSI-Design-Systems-Perspective/dp/0321547748",
      category: "Books",
      tags: ["CMOS", "VLSI", "Circuit Design"],
      featured: false,
      image: process.env.PUBLIC_URL + '/images/resources/books/cmos-vlsi.jpg'
    },
    {
      id: 4,
      title: "Verilog HDL Guide",
      author: "Samir Palnitkar",
      description: "Comprehensive guide to Verilog HDL, covering language basics to advanced design techniques.",
      link: "https://d1.amobbs.com/bbs_upload782111/files_33/ourdev_585395BQ8J9A.pdf",
      category: "Books",
      tags: ["Verilog", "HDL", "Digital Design"],
      featured: false,
      image: process.env.PUBLIC_URL + '/images/resources/books/verilog-guide.jpg'
    },
    {
      id: 5,
      title: "Advanced ASIC Chip Synthesis",
      author: "Himanshu Bhatnagar",
      description: "Practical guide to ASIC design flow using industry-standard tools for synthesis and timing analysis.",
      link: "https://www.amazon.com/Advanced-ASIC-Chip-Synthesis-Publication/dp/0792375688",
      category: "Books",
      tags: ["ASIC", "Synthesis", "Timing Analysis"],
      featured: false,
      image: process.env.PUBLIC_URL + '/images/resources/books/asic-synthesis.jpg'
    },

    // Tools
    {
      id: 6,
      title: "Xilinx Vivado Design Suite",
      author: "Xilinx",
      description: "Industry-standard FPGA design tool for RTL development, synthesis, implementation, and verification.",
      link: "https://www.xilinx.com/products/design-tools/vivado.html",
      category: "Tools",
      tags: ["FPGA", "Synthesis", "Implementation"],
      featured: true,
      image: process.env.PUBLIC_URL + '/images/resources/tools/vivado.jpg'
    },
    {
      id: 7,
      title: "ModelSim FPGA Edition",
      author: "Mentor Graphics",
      description: "Popular HDL simulator for Verilog and VHDL design verification.",
      link: "https://www.intel.com/content/www/us/en/software/programmable/quartus-prime/model-sim.html",
      category: "Tools",
      tags: ["Simulation", "Verification", "FPGA"],
      featured: false,
      image: process.env.PUBLIC_URL + '/images/resources/tools/modelsim.jpg'
    },
    {
      id: 8,
      title: "Synopsys Design Compiler",
      author: "Synopsys",
      description: "Industry-leading logic synthesis tool for transforming RTL into optimized gate-level netlists.",
      link: "https://www.synopsys.com/implementation-and-signoff/rtl-synthesis-test/design-compiler-graphical.html",
      category: "Tools",
      tags: ["Synthesis", "ASIC", "Optimization"],
      featured: true,
      image: process.env.PUBLIC_URL + '/images/resources/tools/synopsys-dc.jpg'
    },
    {
      id: 9,
      title: "Cadence Innovus Implementation System",
      author: "Cadence",
      description: "Advanced physical implementation tool for digital SoC designs with focus on power, performance, and area optimization.",
      link: "https://www.cadence.com/en_US/home/tools/digital-design-and-signoff/soc-implementation-and-floorplanning/innovus-implementation-system.html",
      category: "Tools",
      tags: ["Physical Design", "Place & Route", "Timing"],
      featured: false,
      image: process.env.PUBLIC_URL + '/images/resources/tools/innovus.jpg'
    },
    {
      id: 10,
      title: "Synopsys VCS",
      author: "Synopsys",
      description: "High-performance simulator for Verilog, SystemVerilog, VHDL, and mixed-language designs.",
      link: "https://www.synopsys.com/verification/simulation/vcs.html",
      category: "Tools",
      tags: ["Simulation", "Verification", "UVM"],
      featured: false,
      image: process.env.PUBLIC_URL + '/images/resources/tools/vcs.jpg'
    },

    // Videos
    {
      id: 11,
      title: "Digital Design with Verilog",
      author: "NPTEL",
      description: "Comprehensive course on digital design using Verilog HDL from basic concepts to advanced designs.",
      link: "https://www.youtube.com/playlist?list=PLJ5C_6qdAvBGKh_GssdOLz5SSGwU__3Hh",
      category: "Videos",
      tags: ["Verilog", "Digital Design", "HDL"],
      featured: true,
      image: process.env.PUBLIC_URL + '/images/resources/videos/digital-design-verilog.jpg'
    },
    {
      id: 12,
      title: "SystemVerilog for Verification",
      author: "Verification Guide",
      description: "Tutorial series on SystemVerilog for hardware verification, covering OOP concepts, testbench architecture, and advanced features.",
      link: "https://www.youtube.com/playlist?list=PLxqLblRbXVJ5Qf4lN6v1wL5pJES5bYpMY",
      category: "Videos",
      tags: ["SystemVerilog", "Verification", "UVM"],
      featured: false,
      image: process.env.PUBLIC_URL + '/images/resources/videos/systemverilog-verification.jpg'
    },
    {
      id: 13,
      title: "RISC-V CPU Design",
      author: "Onur Mutlu",
      description: "Comprehensive lectures on CPU architecture and RISC-V processor design from basic concepts to implementation.",
      link: "https://www.youtube.com/playlist?list=PL5Q2soXY2Zi-EXLVgkrbIQrkrISBxCBCY",
      category: "Videos",
      tags: ["RISC-V", "Processor Design", "Architecture"],
      featured: true,
      image: process.env.PUBLIC_URL + '/images/resources/videos/riscv-cpu-design.jpg'
    },

    // Courses
    {
      id: 14,
      title: "VLSI CAD: Logic to Layout",
      author: "University of Illinois",
      description: "A comprehensive course on VLSI design flow from logic synthesis to physical design and layout.",
      link: "https://www.coursera.org/learn/vlsi-cad-logic",
      category: "Courses",
      tags: ["VLSI", "CAD", "Physical Design"],
      featured: true,
      image: process.env.PUBLIC_URL + '/images/resources/courses/vlsi-cad-logic.jpg'
    },
    {
      id: 15,
      title: "Hardware Description Languages for FPGA Design",
      author: "University of Colorado Boulder",
      description: "Course covering HDL design for FPGAs, including Verilog and VHDL implementation techniques.",
      link: "https://www.coursera.org/learn/fpga-hardware-description-languages",
      category: "Courses",
      tags: ["HDL", "FPGA", "Verilog"],
      featured: false,
      image: process.env.PUBLIC_URL + '/images/resources/courses/hardware-description-languages.jpg'
    },
    {
      id: 16,
      title: "Functional Hardware Verification",
      author: "EDA Playground",
      description: "Practical course on SystemVerilog and UVM for functional verification of digital designs.",
      link: "https://www.edaplayground.com/",
      category: "Courses",
      tags: ["Verification", "SystemVerilog", "UVM"],
      featured: false,
      image: process.env.PUBLIC_URL + '/images/resources/courses/functional-hardware-verification.jpg'
    },

    // Papers
    {
      id: 17,
      title: "The RISC-V Instruction Set Manual",
      author: "RISC-V Foundation",
      description: "Official specification of the RISC-V instruction set architecture, covering the base and standard extension instruction sets.",
      link: "https://riscv.org/technical/specifications/",
      category: "Papers",
      tags: ["RISC-V", "ISA", "Specification"],
      featured: true,
      image: process.env.PUBLIC_URL + '/images/resources/papers/riscv-instruction-set-manual.jpg'
    },
    {
      id: 18,
      title: "A Survey of Architectural Approaches for Data Compression in Cache and Main Memory Systems",
      author: "Sparsh Mittal, Jeffrey S. Vetter",
      description: "Comprehensive survey of memory compression techniques in modern computer architectures.",
      link: "https://ieeexplore.ieee.org/document/7556912",
      category: "Papers",
      tags: ["Memory Systems", "Compression", "Architecture"],
      featured: false,
      image: process.env.PUBLIC_URL + '/images/resources/papers/survey-architectural-approaches.jpg'
    },
    {
      id: 19,
      title: "A Survey Of Techniques for Architecting and Managing Asymmetric DRAM Cache",
      author: "Sparsh Mittal",
      description: "Survey of DRAM cache architecture techniques for improving memory system performance.",
      link: "https://arxiv.org/abs/1607.04508",
      category: "Papers",
      tags: ["DRAM", "Cache", "Memory Systems"],
      featured: false,
      image: process.env.PUBLIC_URL + '/images/resources/papers/survey-architecting-managing.jpg'
    },

    // Communities
    {
      id: 20,
      title: "Stack Overflow Hardware",
      author: "Stack Exchange",
      description: "Q&A forum for hardware design, Verilog, VHDL, and FPGA-related questions.",
      link: "https://stackoverflow.com/questions/tagged/verilog",
      category: "Communities",
      tags: ["Q&A", "Verilog", "FPGA"],
      featured: false,
      image: process.env.PUBLIC_URL + '/images/resources/communities/stackoverflow.png'
    },
    {
      id: 21,
      title: "RISC-V International",
      author: "RISC-V",
      description: "The official community and working groups for the RISC-V instruction set architecture.",
      link: "https://riscv.org/",
      category: "Communities",
      tags: ["RISC-V", "ISA", "Open Source"],
      featured: true,
      image: process.env.PUBLIC_URL + '/images/resources/communities/riscv.jpg'
    },
    {
      id: 22,
      title: "r/FPGA",
      author: "Reddit",
      description: "Active community for FPGA designers, students, and hobbyists to discuss projects, tools, and techniques.",
      link: "https://www.reddit.com/r/FPGA/",
      category: "Communities",
      tags: ["FPGA", "Community", "Discussion"],
      featured: true,
      image: process.env.PUBLIC_URL + '/images/resources/communities/reddit.jpg'
    }
  ];

  // Prepare image map for preloading
  const imageMap = resources.reduce((acc, resource) => {
    acc[resource.id] = resource.image;
    return acc;
  }, {});
  
  // Use the custom hook to preload images
  const [loadedImages, setLoadedImages] = useImagePreloader(imageMap);

  // Filter resources based on search and category
  const getFilteredResources = () => {
    let filtered = resources;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(resource => 
        resource.title.toLowerCase().includes(query) ||
        resource.description.toLowerCase().includes(query) ||
        resource.author.toLowerCase().includes(query) ||
        resource.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Filter by category
    if (categoryFilter !== 'All') {
      filtered = filtered.filter(resource => resource.category === categoryFilter);
    }
    
    // Filter by tab
    if (tabValue === 1) {
      // Featured resources
      filtered = filtered.filter(resource => resource.featured);
    }
    
    return filtered;
  };

  const filteredResources = getFilteredResources();
  
  // Function to render resource cards
  const renderResourceCard = (resource) => {
    const isImageLoaded = loadedImages[resource.id];
    
    return (
      <Grid item xs={12} md={6} key={resource.id}>
        <Card elevation={3} sx={{ 
          display: 'flex', 
          height: '100%', 
          overflow: 'hidden', 
          border: '1px solid #eaeaea',
          transition: 'box-shadow 0.3s ease',
          '&:hover': {
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
          }
        }}>
          {/* Fixed size image container to prevent flickering */}
          <Box sx={{ 
            width: '150px', 
            minWidth: '150px',
            height: '180px',
            position: 'relative',
            bgcolor: 'white',
            borderRight: '1px solid #eaeaea',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            {/* Static white background */}
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: 'white',
              zIndex: 0
            }}/>
            
            {/* Loading indicator */}
            {isImageLoaded === undefined && (
              <CircularProgress 
                size={24} 
                sx={{ 
                  position: 'absolute',
                  zIndex: 1,
                  color: 'primary.light'
                }}
              />
            )}
            
            {/* Image or placeholder */}
            {(isImageLoaded !== false) && (
              <Box
                component="img"
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  maxWidth: '130px',
                  maxHeight: '160px',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  opacity: isImageLoaded ? 1 : 0,
                  transition: 'opacity 0.3s ease-in-out',
                  backgroundColor: 'white'
                }}
                src={resource.image}
                alt={resource.title}
                onLoad={(e) => {
                  // Add a small delay before showing the image to ensure smooth transition
                  setTimeout(() => {
                    e.target.style.opacity = 1;
                    if (!loadedImages[resource.id]) {
                      setLoadedImages(prev => ({ ...prev, [resource.id]: true }));
                    }
                  }, 50);
                }}
                onError={(e) => {
                  console.error(`Failed to load image for ${resource.title}: ${resource.image}`);
                  e.target.onerror = null;
                  // Use a more specific fallback image based on resource category
                  const fallbackImage = getFallbackImage(resource.category);
                  e.target.src = fallbackImage;
                  setLoadedImages(prev => ({ ...prev, [resource.id]: false }));
                }}
              />
            )}
            
            {/* Fallback for failed images */}
            {isImageLoaded === false && (
              <Box
                component="img"
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  maxWidth: '130px',
                  maxHeight: '160px',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  backgroundColor: 'white'
                }}
                src={getFallbackImage(resource.category)}
                alt={resource.title}
              />
            )}
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
            <CardContent sx={{ flex: '1 0 auto', pb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                {getResourceLogo(resource.author) && (
                  <Box
                    component="img"
                    src={getResourceLogo(resource.author).src}
                    alt={getResourceLogo(resource.author).alt}
                    sx={{
                      width: 20,
                      height: 20,
                      mr: 1,
                      objectFit: 'contain'
                    }}
                  />
                )}
                <Typography variant="h6" component="div" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                  {resource.title}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                By {resource.author}
              </Typography>
              <Typography variant="body2" paragraph sx={{ 
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
              }}>
                {resource.description}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {resource.tags.map((tag, index) => (
                  <Chip 
                    key={index} 
                    label={tag} 
                    size="small" 
                    sx={{ 
                      backgroundColor: 'rgba(106, 13, 173, 0.08)', 
                      fontSize: '0.7rem',
                      mb: 0.5
                    }} 
                  />
                ))}
              </Box>
            </CardContent>
            <CardActions sx={{ pt: 0 }}>
              <Button 
                size="small" 
                color="primary" 
                href={resource.link} 
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<LinkIcon />}
                variant="contained"
                sx={{ borderRadius: 2 }}
              >
                Visit Resource
              </Button>
            </CardActions>
          </Box>
        </Card>
      </Grid>
    );
  };

  // Resource category icons
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Books': return <MenuBook />;
      case 'Tools': return <DesignServices />;
      case 'Videos': return <YouTube />;
      case 'Courses': return <School />;
      case 'Papers': return <Assignment />;
      case 'Communities': return <Laptop />;
      default: return <ImportContacts />;
    }
  };

  // Get resource platform logo
  const getResourceLogo = (author) => {
    switch(author) {
      case 'Reddit':
        return {
          src: process.env.PUBLIC_URL + '/images/reddit-logo.png',
          alt: 'Reddit Logo'
        };
      case 'Stack Exchange':
        return {
          src: process.env.PUBLIC_URL + '/images/stackoverflow-icon.png',
          alt: 'Stack Overflow Logo'
        };
      case 'RISC-V':
        return {
          src: process.env.PUBLIC_URL + '/images/riscv-logo.png',
          alt: 'RISC-V Logo'
        };
      default:
        return null;
    }
  };

  // Update the getFallbackImage function to use absolute path
  const getFallbackImage = () => {
    // Use absolute path from public directory
    return process.env.PUBLIC_URL + '/images/BACKGROUNDLESS_LOGO.png';
  };

  return (
    <Box className="container page-container">
      <Typography variant="h3" component="h1" gutterBottom color="primary">
        VeriGeek Learning Resources
      </Typography>
      <Typography variant="subtitle1" paragraph sx={{ mb: 4 }}>
        Explore our curated collection of books, tools, videos, courses, and communities to enhance your VLSI design skills
      </Typography>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="All Resources" />
          <Tab label="Featured Resources" />
        </Tabs>
      </Box>

      {/* Search and Filters */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            placeholder="Search resources by title, description, author, or tags"
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
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <FilterList sx={{ mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2" sx={{ mr: 2 }}>Category:</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {categories.map(category => (
                <Chip
                  key={category}
                  label={category}
                  onClick={() => setCategoryFilter(category)}
                  sx={{ 
                    backgroundColor: categoryFilter === category ? 'primary.main' : 'rgba(0, 0, 0, 0.08)',
                    color: categoryFilter === category ? 'white' : 'text.primary',
                    '&:hover': {
                      backgroundColor: categoryFilter === category ? 'primary.dark' : 'rgba(0, 0, 0, 0.12)',
                    }
                  }}
                  size="small"
                />
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Resource Categories */}
      <Box sx={{ mb: 4, display: { xs: 'block', md: 'flex' } }}>
        <Typography variant="body2" sx={{ mr: 2, mb: { xs: 1, md: 0 } }}>
          Quick links:
        </Typography>
        <Grid container spacing={1}>
          {categories.slice(1).map(category => (
            <Grid item key={category}>
              <Button 
                size="small" 
                startIcon={getCategoryIcon(category)}
                variant="outlined"
                sx={{ 
                  borderRadius: 4,
                  textTransform: 'none',
                  mr: 1,
                  backgroundColor: categoryFilter === category ? 'rgba(106, 13, 173, 0.08)' : 'transparent',
                }}
                onClick={() => setCategoryFilter(category)}
              >
                {category}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Results Info */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" color="text.secondary">
          Showing {filteredResources.length} of {resources.length} resources
          {categoryFilter !== 'All' && ` in ${categoryFilter}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </Typography>
      </Box>

      {/* Resource Grid */}
      {filteredResources.length > 0 ? (
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {filteredResources.map(resource => renderResourceCard(resource))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Typography variant="h6">No resources found matching your criteria</Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search or filters
          </Typography>
        </Box>
      )}

      {/* Resource Submission */}
      <Paper sx={{ p: 4, mb: 4, bgcolor: 'rgba(106, 13, 173, 0.04)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {/* Use absolute path for logo */}
          <Box 
            sx={{ 
              height: 48,
              width: 48, 
              mr: 2,
              backgroundImage: `url("${process.env.PUBLIC_URL}/images/BACKGROUNDLESS_LOGO.png")`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              flexShrink: 0
            }}
            aria-label="VeriGeek Logo"
          />
          <Typography variant="h5" gutterBottom sx={{ mb: 0 }}>
            Suggest a Resource
          </Typography>
        </Box>
        <Typography variant="body2" paragraph>
          Know of a great VLSI resource that's not listed here? We'd love to hear your suggestions to help our community grow.
        </Typography>
        <Button variant="contained" color="primary">
          Submit Resource
        </Button>
      </Paper>
    </Box>
  );
};

export default Resources; 