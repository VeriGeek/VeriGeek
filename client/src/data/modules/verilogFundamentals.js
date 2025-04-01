/**
 * Verilog Fundamentals Module
 * 
 * This module covers the basics of Verilog HDL and digital design.
 */

// Import chapters
import chapter1 from './verilogChapters/chapter1';

const verilogFundamentals = {
  id: "verilog-fundamentals",
  title: "Verilog Fundamentals",
  description: "Master the basics of Verilog HDL and start your journey in digital design",
  image: "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  level: "Beginner",
  duration: "12 weeks",
  rating: 4.8,
  studentsCount: 3452,
  completed: 0,
  updatedAt: "2023-11-15",
  instructor: {
    name: "Dr. Sarah Johnson",
    avatar: "https://randomuser.me/api/portraits/women/42.jpg",
    bio: "Dr. Sarah Johnson is a seasoned expert in digital design with over 15 years of experience in FPGA development and hardware description languages. She holds a Ph.D. in Computer Engineering from Stanford University and has led numerous projects implementing complex digital systems using Verilog and VHDL. Throughout her career, she has contributed to the development of several industry-standard FPGA toolchains and has published extensively on efficient RTL design techniques.",
    credentials: [
      "Ph.D. in Computer Engineering, Stanford University",
      "Senior FPGA Design Engineer at Xilinx (2008-2015)",
      "Author of 'Practical FPGA Programming' (2017)",
      "IEEE Senior Member"
    ]
  },
  overview: "Welcome to the Verilog Fundamentals course! Verilog is one of the most widely used Hardware Description Languages (HDLs) in the industry for designing digital systems. This comprehensive course takes you from the very basics of Verilog to advanced topics, preparing you for real-world hardware design challenges. Whether you're interested in FPGA development, ASIC design, or simply want to understand how digital hardware is described and implemented, this course will provide you with the knowledge and practical skills you need. Through a combination of theoretical explanations, practical examples, and hands-on projects, you'll gain confidence in writing efficient and synthesizable Verilog code.",
  prerequisites: [
    "Basic understanding of digital logic (AND, OR, NOT gates)",
    "Familiarity with binary number system",
    "Basic programming knowledge in any language is helpful but not required"
  ],
  skills: [
    "Verilog HDL Programming",
    "Digital Circuit Design",
    "RTL Coding",
    "Combinational Logic",
    "Sequential Logic",
    "FSM Design",
    "Testbench Development",
    "Simulation Techniques",
    "FPGA Implementation",
    "Hardware Debugging"
  ],
  chapters: [
    chapter1
    // Add more chapters as they are created
  ],
  exercises: [
    {
      id: "ex1",
      title: "Half Adder Implementation",
      description: "Implement a Half Adder circuit using Verilog dataflow modeling and verify its functionality.",
      difficulty: "Easy",
      type: "Coding",
      points: 50,
      estimatedTime: "45 min",
      completed: false
    },
    {
      id: "ex2",
      title: "4-Bit Counter Design",
      description: "Design a 4-bit synchronous up-counter with active-low reset using behavioral modeling.",
      difficulty: "Medium",
      type: "Coding",
      points: 75,
      estimatedTime: "1.5 hours",
      completed: false
    },
    {
      id: "ex3",
      title: "Traffic Light Controller",
      description: "Implement a simple traffic light controller using FSM design principles.",
      difficulty: "Medium",
      type: "Project",
      points: 100,
      estimatedTime: "3 hours",
      completed: false
    },
    {
      id: "ex4",
      title: "FIFO Buffer Implementation",
      description: "Design a parameterized FIFO buffer with configurable depth and width.",
      difficulty: "Hard",
      type: "Project",
      points: 150,
      estimatedTime: "4 hours",
      completed: false
    }
  ],
  codeExamples: [
    {
      title: "Simple AND Gate",
      code: "module and_gate(\n  input a, b,\n  output y\n);\n  assign y = a & b;\nendmodule"
    },
    {
      title: "D Flip-Flop",
      code: "module d_ff(\n  input clk, reset, d,\n  output reg q\n);\n\n  always @(posedge clk or posedge reset)\n    if (reset)\n      q <= 1'b0;\n    else\n      q <= d;\nendmodule"
    }
  ],
  resources: [
    {
      title: "Verilog Language Reference",
      type: "PDF",
      url: "/resources/verilog_reference.pdf"
    },
    {
      title: "Digital Design with Verilog Cheatsheet",
      type: "PDF",
      url: "/resources/verilog_cheatsheet.pdf"
    }
  ],
  relatedModules: [
    {
      id: "system-verilog",
      title: "SystemVerilog for Verification",
      description: "Learn advanced verification techniques using SystemVerilog.",
      level: "Intermediate"
    },
    {
      id: "fpga-design",
      title: "FPGA Implementation with Verilog",
      description: "Take your Verilog designs to actual FPGA hardware.",
      level: "Intermediate"
    },
    {
      id: "riscv-processor",
      title: "RISC-V Processor Design",
      descript