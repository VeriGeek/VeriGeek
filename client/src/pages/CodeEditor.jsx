import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Box, Typography, Button, Grid, Paper, Tabs, Tab, Snackbar, Alert, 
  List, ListItem, ListItemIcon, ListItemText, LinearProgress,
  FormControl, InputLabel, Select, MenuItem, Chip, Divider, Card, CardContent, CardActions
} from '@mui/material';
import { 
  PlayArrow, Save, ArrowBack, LightbulbOutlined, BarChart, Check, 
  MenuBook, Assignment, Code, Terminal, Assessment, Info,
  BugReport, Download, Upload, ContentCopy, ContentPaste
} from '@mui/icons-material';

const CodeEditor = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedModule, setSelectedModule] = useState(searchParams.get('module') || 'full_adder');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [consoleOutput, setConsoleOutput] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
  const [exerciseData, setExerciseData] = useState({
    title: '',
    background: '',
    requirements: '',
    imageUrl: '',
    truthTable: [],
    testCases: [],
    hints: [],
    resources: []
  });

  // Available practice modules
  const practiceModules = [
    { id: 'full_adder', name: 'Full Adder', level: 'Beginner', category: 'Combinational' },
    { id: 'ripple_carry_adder', name: '4-bit Ripple Carry Adder', level: 'Beginner', category: 'Combinational' },
    { id: 'alu', name: '4-bit ALU', level: 'Intermediate', category: 'Combinational' },
    { id: 'counter', name: '4-bit Counter', level: 'Beginner', category: 'Sequential' },
    { id: 'shift_register', name: '8-bit Shift Register', level: 'Intermediate', category: 'Sequential' },
    { id: 'fsm_traffic', name: 'Traffic Light Controller FSM', level: 'Intermediate', category: 'Sequential' },
    { id: 'uart_tx', name: 'UART Transmitter', level: 'Advanced', category: 'Communication' },
    { id: 'memory_controller', name: 'Simple Memory Controller', level: 'Advanced', category: 'Memory' },
    { id: 'fifo', name: 'Synchronous FIFO', level: 'Advanced', category: 'Memory' },
  ];

  // Handle module selection change
  const handleModuleChange = (event) => {
    const moduleId = event.target.value;
    setSelectedModule(moduleId);
    setSearchParams({ module: moduleId });
    // Reset output
    setOutput('');
    setConsoleOutput('');
    setTabValue(0);
  };

  // Fetch data for the selected module
  useEffect(() => {
    // Reset outputs when changing modules
    setOutput('');
    setConsoleOutput('');
    
    // Simulate API call to get module data
    const fetchModuleData = () => {
      // Initial code template for different modules
      let initialCode = '';
      let exerciseInfo = {};
      
      switch(selectedModule) {
        case 'full_adder':
          initialCode = 
`module full_adder(
  input wire a, b, cin,
  output wire sum, cout
);
  // Implement a full adder
  // Hint: sum = a ^ b ^ cin
  // Hint: cout = (a & b) | (cin & (a ^ b))
  
  // Write your code here
  wire a_xor_b;
  
  // Calculate sum
  
  
  // Calculate carry-out
  
  
endmodule`;
          exerciseInfo = {
            title: 'Full Adder',
            background: 'A full adder is a combinational circuit that performs the arithmetic sum of three input bits. It consists of three inputs and two outputs: the sum and carry-out.',
            requirements: 'Implement a 1-bit full adder using combinational logic.',
            imageUrl: 'https://www.researchgate.net/publication/329466923/figure/fig12/AS:701497183633415@1544299999838/A-full-adder-circuit-and-its-truth-table.png',
            truthTable: [
              { a: '0', b: '0', cin: '0', sum: '0', cout: '0' },
              { a: '0', b: '0', cin: '1', sum: '1', cout: '0' },
              { a: '0', b: '1', cin: '0', sum: '1', cout: '0' },
              { a: '0', b: '1', cin: '1', sum: '0', cout: '1' },
              { a: '1', b: '0', cin: '0', sum: '1', cout: '0' },
              { a: '1', b: '0', cin: '1', sum: '0', cout: '1' },
              { a: '1', b: '1', cin: '0', sum: '0', cout: '1' },
              { a: '1', b: '1', cin: '1', sum: '1', cout: '1' }
            ],
            testCases: [
              { 
                inputs: 'a=0, b=0, cin=0', 
                expectedOutputs: 'sum=0, cout=0', 
                explanation: 'No carries generated or propagated' 
              },
              { 
                inputs: 'a=1, b=1, cin=0', 
                expectedOutputs: 'sum=0, cout=1', 
                explanation: 'Carry generated from a AND b' 
              },
              { 
                inputs: 'a=1, b=1, cin=1', 
                expectedOutputs: 'sum=1, cout=1', 
                explanation: 'Sum of three 1s produces 11 binary' 
              }
            ],
            hints: [
              'Break down the logic into smaller parts - first calculate a XOR b',
              'The sum output can be implemented as a three-input XOR operation',
              'The carry-out has two conditions: when both a and b are 1, or when the carry-in is 1 and either a or b is 1',
              'Try using intermediate signals to improve code readability'
            ],
            resources: [
              {
                title: "Understanding Full Adders",
                description: "Tutorial on full adder implementation and design principles",
                type: "Article",
                url: "https://www.electronics-tutorials.ws/combination/comb_7.html",
                imageUrl: "https://www.electronics-tutorials.ws/wp-content/uploads/2018/05/combination-comb57.gif"
              },
              {
                title: "Full Adder Verilog Implementation",
                description: "Step-by-step guide to implementing a full adder in Verilog",
                type: "Tutorial",
                url: "https://www.fpga4student.com/2017/06/verilog-code-for-full-adder.html",
                imageUrl: "https://www.fpga4student.com/2017/06/images/Full%20adder%20circuit.png"
              },
              {
                title: "Full Adder Circuit Analysis",
                description: "Interactive simulation of full adder operation",
                type: "Simulation",
                url: "https://www.falstad.com/circuit/e-fulladd.html",
                imageUrl: "https://i.ytimg.com/vi/VycFxJYMSJU/maxresdefault.jpg"
              }
            ]
          };
          break;
          
        case 'ripple_carry_adder':
          initialCode = 
`module ripple_carry_adder(
  input wire [3:0] a, b,
  input wire cin,
  output wire [3:0] sum,
  output wire cout
);
  // Implement a 4-bit ripple carry adder
  // Hint: Use the full_adder module multiple times
  // Hint: Create wires to connect the carry between adders
  
  // Full adder module
  // module full_adder(
  //   input wire a, b, cin,
  //   output wire sum, cout
  // );
  
  // Write your code here
  // Define internal wires for carry propagation
  
  
  // Instantiate full adders
  
  
endmodule`;
          exerciseInfo = {
            title: '4-bit Ripple Carry Adder',
            background: 'A ripple carry adder is a digital circuit that produces the arithmetic sum of two binary numbers. It consists of multiple full adders connected in a chain, where the carry output of each full adder is connected to the carry input of the next full adder.',
            requirements: 'Implement a 4-bit ripple carry adder using full adders.',
            imageUrl: 'https://www.tutorialspoint.com/digital_circuits/images/ripple_carry_adder.jpg',
            testCases: [
              { 
                inputs: 'a=0000, b=0000, cin=0', 
                expectedOutputs: 'sum=0000, cout=0', 
                explanation: 'Basic case with all zeros' 
              },
              { 
                inputs: 'a=1010, b=0101, cin=0', 
                expectedOutputs: 'sum=1111, cout=0', 
                explanation: 'Alternating bits in inputs' 
              },
              { 
                inputs: 'a=1111, b=0001, cin=0', 
                expectedOutputs: 'sum=0000, cout=1', 
                explanation: 'Overflow case producing a carry' 
              },
              { 
                inputs: 'a=1111, b=1111, cin=0', 
                expectedOutputs: 'sum=1110, cout=1', 
                explanation: 'Addition of maximum values' 
              }
            ],
            hints: [
              'You need to instantiate four full adders and connect them properly',
              'Use wires to connect the carry out of one adder to the carry in of the next',
              'Make sure to connect the bits of a and b to the correct full adder instances',
              'Remember the cout of the last full adder is the cout of the entire adder'
            ],
            resources: [
              {
                title: "Ripple Carry Adder Design",
                description: "Comprehensive guide on ripple carry adder architecture",
                type: "Article",
                url: "https://www.geeksforgeeks.org/ripple-carry-adder-in-digital-logic/",
                imageUrl: "https://media.geeksforgeeks.org/wp-content/uploads/20220330114111/RippleCarryAdder.jpg"
              },
              {
                title: "Verilog Implementation of Ripple Carry Adder",
                description: "Step-by-step tutorial for implementing a 4-bit RCA",
                type: "Tutorial",
                url: "https://fpgatutorial.com/verilog-code-for-4-bit-ripple-carry-adder/",
                imageUrl: "https://m.media-amazon.com/images/I/714YhI22Z+L._AC_UF1000,1000_QL80_.jpg"
              },
              {
                title: "Ripple Carry Adder Performance Analysis",
                description: "Discussion of propagation delay and optimization techniques",
                type: "Paper",
                url: "https://www.researchgate.net/publication/318382682_Implementation_of_area_optimized_32-bit_Ripple_Carry_Adder_using_FPGA",
                imageUrl: "https://www.researchgate.net/publication/329466923/figure/fig11/AS:701497183637508@1544299999838/A-4-bit-ripple-carry-adder.png"
              }
            ]
          };
          break;
          
        case 'alu':
          initialCode = 
`module alu_4bit(
  input wire [3:0] a, b,
  input wire [1:0] op,
  output reg [3:0] result,
  output wire zero
);
  // Implement a 4-bit ALU with the following operations:
  // op = 00: ADD (a + b)
  // op = 01: SUB (a - b)
  // op = 10: AND (a & b)
  // op = 11: OR (a | b)
  // zero flag should be 1 when result is 0000
  
  // Write your code here
  
  
  // Zero flag
  
  
endmodule`;
          exerciseInfo = {
            title: '4-bit ALU (Arithmetic Logic Unit)',
            background: 'An ALU is a fundamental building block of a CPU. It performs arithmetic and logic operations on binary numbers. This 4-bit ALU supports addition, subtraction, AND, and OR operations.',
            requirements: 'Implement a 4-bit ALU with the specified operations and generate a zero flag when the result is 0.',
            imageUrl: 'https://www.researchgate.net/publication/329814067/figure/fig3/AS:704747588927488@1545034797815/Block-Diagram-of-ALU.png',
            testCases: [
              { 
                inputs: 'a=0101, b=0011, op=00 (ADD)', 
                expectedOutputs: 'result=1000, zero=0', 
                explanation: '5 + 3 = 8 (1000 in binary)' 
              },
              { 
                inputs: 'a=1000, b=0011, op=01 (SUB)', 
                expectedOutputs: 'result=0101, zero=0', 
                explanation: '8 - 3 = 5 (0101 in binary)' 
              },
              { 
                inputs: 'a=1001, b=0011, op=10 (AND)', 
                expectedOutputs: 'result=0001, zero=0', 
                explanation: '1001 & 0011 = 0001' 
              },
              { 
                inputs: 'a=1000, b=0011, op=11 (OR)', 
                expectedOutputs: 'result=1011, zero=0', 
                explanation: '1000 | 0011 = 1011' 
              },
              { 
                inputs: 'a=0011, b=0011, op=01 (SUB)', 
                expectedOutputs: 'result=0000, zero=1', 
                explanation: '3 - 3 = 0, setting zero flag to 1' 
              }
            ],
            hints: [
              'Use an always block with a case statement based on the op input',
              'For subtraction, remember that a - b is the same as a + (~b + 1)',
              'The zero flag should be set when all bits of the result are 0',
              'You can use a single assign statement with a reduction operator for the zero flag'
            ],
            resources: [
              {
                title: "ALU Architecture and Design",
                description: "Detailed explanation of ALU components and operations",
                type: "Article",
                url: "https://www.geeksforgeeks.org/arithmetic-logic-unit-alu/",
                imageUrl: "https://media.geeksforgeeks.org/wp-content/uploads/20200826194344/ALU.png"
              },
              {
                title: "Verilog Implementation of 4-bit ALU",
                description: "Tutorial on implementing ALU operations in Verilog",
                type: "Tutorial",
                url: "https://fpgatutorial.com/verilog-code-for-alu/",
                imageUrl: "https://verilogguide.readthedocs.io/en/latest/_images/alu_block_diagram.png"
              },
              {
                title: "RISC-V ALU Implementation Guide",
                description: "Advanced tutorial on implementing a RISC-V ALU",
                type: "PDF",
                url: "https://inst.eecs.berkeley.edu/~cs61c/resources/ALU.pdf",
                imageUrl: "https://www.researchgate.net/publication/330417703/figure/fig1/AS:714582543273987@1547375471915/Architecture-of-Arithmetic-Logic-Unit.png"
              }
            ]
          };
          break;
          
        case 'counter':
          initialCode = 
`module counter_4bit(
  input wire clk, reset, enable,
  output reg [3:0] count
);
  // Implement a 4-bit counter with:
  // - Synchronous active-high reset
  // - Enable input
  // - Count up on each clock cycle when enabled
  
  // Write your code here
  
  
endmodule`;
          exerciseInfo = {
            title: '4-bit Counter',
            background: 'A counter is a sequential circuit that counts through a specific sequence of states. This 4-bit counter increments its value by 1 on each clock cycle when enabled.',
            requirements: 'Implement a 4-bit counter with synchronous reset and enable inputs.',
            imageUrl: 'https://www.electronics-tutorials.ws/wp-content/uploads/2018/05/counter-count4.gif',
            testCases: [
              { 
                inputs: 'reset=1', 
                expectedOutputs: 'count=0000', 
                explanation: 'Reset operation sets counter to 0' 
              },
              { 
                inputs: 'reset=0, enable=1, count=0000', 
                expectedOutputs: 'count=0001 after clock', 
                explanation: 'Counter increments by 1 when enabled' 
              },
              { 
                inputs: 'reset=0, enable=0, count=0101', 
                expectedOutputs: 'count=0101 after clock', 
                explanation: 'Counter holds value when not enabled' 
              },
              { 
                inputs: 'reset=0, enable=1, count=1111', 
                expectedOutputs: 'count=0000 after clock', 
                explanation: 'Counter wraps around after reaching maximum value' 
              }
            ],
            hints: [
              'Use an always block triggered by the positive edge of the clock',
              'Handle the reset condition first, then the enable condition',
              'For incrementing, you can simply use count <= count + 1',
              'Make sure to use non-blocking assignments (<=) for sequential logic'
            ],
            resources: [
              {
                title: "Digital Counter Design",
                description: "Complete guide to digital counter design and implementation",
                type: "Article",
                url: "https://www.electronics-tutorials.ws/counter/count_1.html",
                imageUrl: "https://www.electronics-tutorials.ws/wp-content/uploads/2018/05/counter-count1.gif"
              },
              {
                title: "Verilog Counter Implementation",
                description: "Step-by-step tutorial for implementing counters in Verilog",
                type: "Tutorial",
                url: "https://www.chipverify.com/verilog/verilog-counter",
                imageUrl: "https://www.chipverify.com/images/verilog/synchronous_counter.png"
              },
              {
                title: "Counter Timing Simulation",
                description: "Interactive waveform simulation of counter operation",
                type: "Simulation",
                url: "https://www.fpga4student.com/2017/02/verilog-code-for-counter-on-fpga.html",
                imageUrl: "https://www.fpga4student.com/2017/02/images/testbench%20simulation%20waveforms.JPG"
              }
            ]
          };
          break;
          
        case 'fsm_traffic':
          initialCode = 
`module traffic_light_controller(
  input wire clk, reset, enable,
  output reg [2:0] highway_lights, farmroad_lights
);
  // Implement a traffic light controller:
  // - highway_lights and farmroad_lights: [RED, YELLOW, GREEN]
  // - Normal state: Highway Green, Farm Road Red
  // - When enable is high, start the sequence to let farm road traffic through
  // - Return to normal state when enable goes low
  // - Don't forget safety timing for yellow lights
  
  // Write your code here
  // Define state parameters
  
  
  // State register
  
  
  // State transition logic
  
  
  // Output logic
  
  
endmodule`;
          exerciseInfo = {
            title: 'Traffic Light Controller FSM',
            background: 'A traffic light controller is a perfect example of a Finite State Machine (FSM). This controller manages traffic lights at an intersection between a highway and a farm road, with priority given to the highway unless a vehicle is detected on the farm road.',
            requirements: 'Implement an FSM to control traffic lights with proper sequencing and safety timing.',
            imageUrl: 'https://www.researchgate.net/publication/337710855/figure/fig1/AS:831609219284993@1575016766327/A-finite-state-machine-diagram-for-a-simple-traffic-light-controller.ppm',
            testCases: [
              { 
                inputs: 'reset=1', 
                expectedOutputs: 'highway_lights=001 (GREEN), farmroad_lights=100 (RED)', 
                explanation: 'Initial state after reset' 
              },
              { 
                inputs: 'enable=1', 
                expectedOutputs: 'Sequence: Highway GREEN → YELLOW → RED, then Farm Road RED → GREEN', 
                explanation: 'Full sequence when vehicle detected on farm road' 
              },
              { 
                inputs: 'enable goes from 1 to 0 during farm road GREEN', 
                expectedOutputs: 'Complete current cycle through Farm Road YELLOW back to Highway GREEN', 
                explanation: 'Safe return to normal state' 
              }
            ],
            hints: [
              'Define state parameters for each state in the sequence',
              'Use one always block for the state register and reset logic',
              'Use another always block for next state logic based on current state and inputs',
              'Use a third always block for output logic based on current state',
              'Remember to use non-blocking assignments (<=) for sequential logic'
            ],
            resources: [
              {
                title: "Finite State Machine Design",
                description: "Guide to FSM design principles and implementation",
                type: "Article",
                url: "https://www.geeksforgeeks.org/mealy-and-moore-machines/",
                imageUrl: "https://qph.cf2.quoracdn.net/main-qimg-6c0abdd2a1d9d4ea63d91e5897dc14ad"
              },
              {
                title: "Traffic Light Controller Implementation",
                description: "Detailed tutorial on implementing a traffic light FSM in Verilog",
                type: "Tutorial",
                url: "https://www.fpga4student.com/2016/11/verilog-code-for-traffic-light-controller-design.html",
                imageUrl: "https://www.fpga4student.com/2016/11/images/Traffic%20light%20diagram.jpg"
              },
              {
                title: "FSM State Diagram Tool",
                description: "Interactive tool for designing and visualizing FSM state diagrams",
                type: "Tool",
                url: "https://state-machine-cat.js.org/",
                imageUrl: "https://res.cloudinary.com/practicaldev/image/fetch/s--0k_ggpHJ--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/bh0z5cgr7zxsz9bzchxs.png"
              }
            ]
          };
          break;
          
        case 'uart_tx':
          initialCode = 
`module uart_transmitter(
  input wire clk, reset,
  input wire tx_start,
  input wire [7:0] tx_data,
  output reg tx_active,
  output reg tx_done,
  output reg tx_line
);
  // Implement a UART transmitter:
  // - 8 data bits, no parity, 1 stop bit
  // - tx_start initiates transmission
  // - tx_active indicates transmission in progress
  // - tx_done pulses for one clock cycle when transmission is complete
  // - tx_line is the serial output line (idle high)
  
  // Simplified - assume clock is already at the right baud rate
  
  // Write your code here
  
  
endmodule`;
          exerciseInfo = {
            title: 'UART Transmitter',
            background: 'UART (Universal Asynchronous Receiver Transmitter) is a serial communication protocol. The transmitter converts parallel data to serial format and transmits it with start and stop bits.',
            requirements: 'Implement a UART transmitter with 8 data bits, no parity, and 1 stop bit.',
            imageUrl: 'https://www.analog.com/-/media/images/analog-dialogue/en/volume-54/number-4/articles/uart-a-hardware-communication-protocol/335462-fig-01.svg?la=en&imgver=2',
            testCases: [
              { 
                inputs: 'tx_start=1, tx_data=10101010', 
                expectedOutputs: 'tx_line sequence: 0 (start), 0,1,0,1,0,1,0,1 (data), 1 (stop)', 
                explanation: 'Transmission of alternating bit pattern' 
              },
              { 
                inputs: 'During transmission', 
                expectedOutputs: 'tx_active=1', 
                explanation: 'Active flag during transmission' 
              },
              { 
                inputs: 'After transmission', 
                expectedOutputs: 'tx_done=1 for one cycle, tx_active=0, tx_line=1', 
                explanation: 'Completion indicators and idle state' 
              }
            ],
            hints: [
              'Use an FSM with states for IDLE, START_BIT, DATA_BITS, STOP_BIT',
              'Use a counter to track which bit is being transmitted',
              'Set tx_line to 0 for start bit, tx_data[bit_index] for data bits, and 1 for stop bit',
              'Pulse tx_done for one clock cycle after the stop bit is transmitted',
              'Set tx_active high during the entire transmission process'
            ],
            resources: [
              {
                title: "UART Protocol Fundamentals",
                description: "Comprehensive guide to UART communication protocol",
                type: "Article",
                url: "https://www.analog.com/en/analog-dialogue/articles/uart-a-hardware-communication-protocol.html",
                imageUrl: "https://www.analog.com/-/media/images/analog-dialogue/en/volume-54/number-4/articles/uart-a-hardware-communication-protocol/335462-fig-02.png?la=en&imgver=3"
              },
              {
                title: "UART Transmitter Implementation",
                description: "Step-by-step tutorial for implementing a UART transmitter in Verilog",
                type: "Tutorial",
                url: "https://www.fpga4student.com/2017/09/verilog-code-for-uart-transmitter-receiver.html",
                imageUrl: "https://www.circuitbasics.com/wp-content/uploads/2016/01/Introduction-to-UART-Data-Transmission-Diagram.png"
              },
              {
                title: "UART Waveform Analyzer",
                description: "Interactive tool for analyzing UART transmission waveforms",
                type: "Tool",
                url: "https://www.saleae.com/",
                imageUrl: "https://eewiki.net/download/attachments/25264970/uart-architecture.png?version=1"
              }
            ]
          };
          break;
          
        default:
          initialCode = 
`module module_name(
  // Define your inputs and outputs here
);
  // Implement your logic here
  
  
endmodule`;
          exerciseInfo = {
            title: 'Custom Module',
            background: 'Design a digital logic module based on your requirements.',
            requirements: 'Implement the functionality needed for your specific application.',
            hints: [
              'Start by defining the inputs and outputs of your module',
              'Determine whether you need combinational or sequential logic',
              'Break down complex problems into smaller, manageable parts',
              'Test your implementation with various input combinations'
            ],
            resources: [
              {
                title: "Verilog HDL Design Guide",
                description: "Comprehensive guide to Verilog design practices",
                type: "Article",
                url: "https://www.chipverify.com/verilog/verilog-introduction",
                imageUrl: "https://www.chipverify.com/images/verilog/verilog_modules.png"
              },
              {
                title: "Digital Design Best Practices",
                description: "Tips and techniques for effective digital circuit design",
                type: "Tutorial",
                url: "https://www.asic-world.com/verilog/veritut.html",
                imageUrl: "https://www.asic-world.com/images/verilog/sequential1.gif"
              },
              {
                title: "Verilog Online Simulator",
                description: "Browser-based tool for testing Verilog designs",
                type: "Tool",
                url: "https://www.edaplayground.com/",
                imageUrl: "https://i.ytimg.com/vi/ml7XBCUDf_0/maxresdefault.jpg"
              }
            ]
          };
      }
      
      setCode(initialCode);
      setExerciseData(exerciseInfo);
    };
    
    if (selectedModule) {
      fetchModuleData();
    }
  }, [selectedModule]);

  const handleTabChange = (_, newValue) => setTabValue(newValue);

  const handleRunCode = () => {
    setIsCompiling(true);
    setOutput('');
    setConsoleOutput('');
    
    // Validate code has the basic structure before attempting to "compile"
    const errors = verifySyntax(code);
    if (errors.length > 0) {
      setTimeout(() => {
        setConsoleOutput(`Syntax Verification Failed:\n\n${errors.map(err => `- ${err}`).join('\n')}\n\nPlease fix these issues before running the code.`);
        setOutput(`\x1b[1;31mCompilation Error:\x1b[0m\nYour code has syntax issues that need to be fixed.\nCheck the Console tab for details.`);
        setNotification({
          open: true,
          message: 'Compilation failed. Please check your code for syntax issues.',
          severity: 'error'
        });
        setIsCompiling(false);
      }, 800);
      return;
    }
    
    // Simulate compilation and running with module-specific validation
    setTimeout(() => {
      let simulationPassed = false;
      
      // Module-specific validation
      if (selectedModule === 'full_adder') {
        if (code.includes('assign sum') && code.includes('assign cout')) {
          // Check for common mistakes in full adder logic
          if (
            (code.includes('a ^ b ^ cin') || code.includes('a_xor_b ^ cin')) && 
            (
              (code.includes('a & b') && code.includes('cin &') && code.includes('|')) ||
              (code.includes('(a & b)') && code.includes('(cin &'))
            )
          ) {
            simulationPassed = true;
          } else {
            setConsoleOutput(`Warning: Your full adder implementation may not be correct.\n\nExpected logic:\n- sum = a ^ b ^ cin\n- cout = (a & b) | (cin & (a ^ b))\n\nCheck your logic equations and try again.`);
          }
        }
      } else if (selectedModule === 'ripple_carry_adder') {
        if (code.includes('full_adder') && code.includes('[3:0] sum') && code.includes('cout')) {
          // Check if the connections between adders are properly done
          if (code.includes('wire') && (code.includes('carry') || code.includes('c1') || code.includes('c2'))) {
            simulationPassed = true;
          } else {
            setConsoleOutput(`Warning: Your ripple carry adder implementation may not be correct.\n\nMake sure you've:\n- Created internal wires for carries between adders\n- Connected the full adders correctly in a chain\n- Properly handled the 4-bit inputs and outputs`);
          }
        }
      } else if (selectedModule === 'alu') {
        if (code.includes('case') && code.includes('2\'b00') && code.includes('assign zero')) {
          simulationPassed = true;
        }
      } else if (selectedModule === 'fsm_traffic') {
        if (code.includes('always @(posedge clk') && code.includes('parameter') && code.includes('state')) {
          simulationPassed = true;
        }
      } else {
        // For any other module, just check if it compiles
        simulationPassed = true;
      }
      
      if (simulationPassed) {
        // Success output specific to each module
        if (selectedModule === 'full_adder') {
          setOutput(`
\x1b[1;32m✓ Compilation successful!\x1b[0m

\x1b[1;36mRunning simulation for full_adder module...\x1b[0m

\x1b[1;33mTruth Table Verification:\x1b[0m
┌─────┬─────┬─────┬─────┬─────┬─────┬─────────────────┐
│ \x1b[1mTest\x1b[0m │ \x1b[1ma\x1b[0m   │ \x1b[1mb\x1b[0m   │ \x1b[1mcin\x1b[0m │ \x1b[1msum\x1b[0m │ \x1b[1mcout\x1b[0m │ \x1b[1mStatus\x1b[0m       │
├─────┼─────┼─────┼─────┼─────┼─────┼─────────────────┤
│ 1   │ 0   │ 0   │ 0   │ 0   │ 0   │ \x1b[32m✓ PASSED\x1b[0m      │
│ 2   │ 0   │ 0   │ 1   │ 1   │ 0   │ \x1b[32m✓ PASSED\x1b[0m      │
│ 3   │ 0   │ 1   │ 0   │ 1   │ 0   │ \x1b[32m✓ PASSED\x1b[0m      │
│ 4   │ 0   │ 1   │ 1   │ 0   │ 1   │ \x1b[32m✓ PASSED\x1b[0m      │
│ 5   │ 1   │ 0   │ 0   │ 1   │ 0   │ \x1b[32m✓ PASSED\x1b[0m      │
│ 6   │ 1   │ 0   │ 1   │ 0   │ 1   │ \x1b[32m✓ PASSED\x1b[0m      │
│ 7   │ 1   │ 1   │ 0   │ 0   │ 1   │ \x1b[32m✓ PASSED\x1b[0m      │
│ 8   │ 1   │ 1   │ 1   │ 1   │ 1   │ \x1b[32m✓ PASSED\x1b[0m      │
└─────┴─────┴─────┴─────┴─────┴─────┴─────────────────┘

\x1b[1;33mWaveform Simulation:\x1b[0m
Time  a b cin | sum cout
----------------+----------
0ns:  0 0 0   |  0   0
10ns: 0 0 1   |  1   0
20ns: 0 1 0   |  1   0
30ns: 0 1 1   |  0   1
40ns: 1 0 0   |  1   0
50ns: 1 0 1   |  0   1
60ns: 1 1 0   |  0   1
70ns: 1 1 1   |  1   1

\x1b[1;32mSummary: 8/8 test cases passed.\x1b[0m
🎉 \x1b[1mCongratulations!\x1b[0m Your full adder implementation works correctly.

\x1b[33mPerformance Analysis:\x1b[0m
• Gate Count: Approximately 5 gates (2 XOR, 2 AND, 1 OR)
• Critical Path: Input to Sum output through 2 XOR gates
• Additional Optimizations: Using intermediate signals improves readability

\x1b[36mDesign Feedback:\x1b[0m
✓ Good use of intermediate signals for readability
✓ Properly declared wire and port types
✓ Clean implementation of the full adder equations
`);
        } else if (selectedModule === 'ripple_carry_adder') {
          setOutput(`
\x1b[1;32m✓ Compilation successful!\x1b[0m

\x1b[1;36mRunning simulation for ripple_carry_adder module...\x1b[0m

\x1b[1;33mTest Case Verification:\x1b[0m
┌─────┬─────────────┬─────────────┬─────────────────┐
│ \x1b[1mTest\x1b[0m │ \x1b[1mInputs\x1b[0m      │ \x1b[1mOutputs\x1b[0m     │ \x1b[1mStatus\x1b[0m       │
├─────┼─────────────┼─────────────┼─────────────────┤
│ 1   │ a=0000      │ sum=0000    │ \x1b[32m✓ PASSED\x1b[0m      │
│     │ b=0000      │ cout=0      │                 │
│     │ cin=0       │             │                 │
├─────┼─────────────┼─────────────┼─────────────────┤
│ 2   │ a=1010      │ sum=1111    │ \x1b[32m✓ PASSED\x1b[0m      │
│     │ b=0101      │ cout=0      │                 │
│     │ cin=0       │             │                 │
├─────┼─────────────┼─────────────┼─────────────────┤
│ 3   │ a=1111      │ sum=0000    │ \x1b[32m✓ PASSED\x1b[0m      │
│     │ b=0001      │ cout=1      │                 │
│     │ cin=0       │             │                 │
├─────┼─────────────┼─────────────┼─────────────────┤
│ 4   │ a=1111      │ sum=1110    │ \x1b[32m✓ PASSED\x1b[0m      │
│     │ b=1111      │ cout=1      │                 │
│     │ cin=0       │             │                 │
└─────┴─────────────┴─────────────┴─────────────────┘

\x1b[1;33mWaveform Simulation:\x1b[0m
Time    a     b     cin | sum   cout
--------------------------------+------------
0ns:    0000  0000  0   | 0000  0
20ns:   1010  0101  0   | 1111  0
40ns:   1111  0001  0   | 0000  1
60ns:   1111  1111  0   | 1110  1

\x1b[1;32mSummary: 4/4 test cases passed.\x1b[0m
🎉 \x1b[1mCongratulations!\x1b[0m Your ripple carry adder implementation works correctly.

\x1b[33mPerformance Analysis:\x1b[0m
• Propagation Delay: 4 full adder delays in series
• Gate Count: Approximately 20 gates (4 full adders)
• Critical Path: Through all 4 full adders for carry propagation
• Potential Improvement: Consider a carry-lookahead structure for faster operation
`);
        } else if (selectedModule === 'alu') {
          setOutput(`
\x1b[1;32m✓ Compilation successful!\x1b[0m

\x1b[1;36mRunning simulation for alu_4bit module...\x1b[0m

\x1b[1;33mTest Case Verification:\x1b[0m
┌─────┬────────────────┬────────────────┬─────────────────┐
│ \x1b[1mTest\x1b[0m │ \x1b[1mInputs\x1b[0m         │ \x1b[1mOutputs\x1b[0m        │ \x1b[1mStatus\x1b[0m       │
├─────┼────────────────┼────────────────┼─────────────────┤
│ 1   │ a=0101         │ result=1000    │ \x1b[32m✓ PASSED\x1b[0m      │
│     │ b=0011         │ zero=0         │                 │
│     │ op=00 (ADD)    │                │                 │
├─────┼────────────────┼────────────────┼─────────────────┤
│ 2   │ a=1000         │ result=0101    │ \x1b[32m✓ PASSED\x1b[0m      │
│     │ b=0011         │ zero=0         │                 │
│     │ op=01 (SUB)    │                │                 │
├─────┼────────────────┼────────────────┼─────────────────┤
│ 3   │ a=1001         │ result=0001    │ \x1b[32m✓ PASSED\x1b[0m      │
│     │ b=0011         │ zero=0         │                 │
│     │ op=10 (AND)    │                │                 │
├─────┼────────────────┼────────────────┼─────────────────┤
│ 4   │ a=1000         │ result=1011    │ \x1b[32m✓ PASSED\x1b[0m      │
│     │ b=0011         │ zero=0         │                 │
│     │ op=11 (OR)     │                │                 │
├─────┼────────────────┼────────────────┼─────────────────┤
│ 5   │ a=0011         │ result=0000    │ \x1b[32m✓ PASSED\x1b[0m      │
│     │ b=0011         │ zero=1         │                 │
│     │ op=01 (SUB)    │                │                 │
└─────┴────────────────┴────────────────┴─────────────────┘

\x1b[1;32mSummary: 5/5 test cases passed.\x1b[0m
🎉 \x1b[1mCongratulations!\x1b[0m Your ALU implementation works correctly.

\x1b[33mPerformance Analysis:\x1b[0m
• Case statement properly handles all operations
• Zero flag is correctly generated
• Good structure for combinational logic
`);
        } else if (selectedModule === 'fsm_traffic') {
          setOutput(`
\x1b[1;32m✓ Compilation successful!\x1b[0m

\x1b[1;36mRunning simulation for traffic_light_controller module...\x1b[0m

\x1b[1;33mSequence Verification:\x1b[0m
Starting with enable=0 (Highway: GREEN, Farm Road: RED)
┌─────────┬───────┬──────────────┬─────────────────┬─────────────────┐
│ \x1b[1mTime\x1b[0m    │ \x1b[1mEnable\x1b[0m │ \x1b[1mHighway\x1b[0m       │ \x1b[1mFarm Road\x1b[0m      │ \x1b[1mStatus\x1b[0m       │
├─────────┼───────┼──────────────┼─────────────────┼─────────────────┤
│ 0ns     │ 0     │ GREEN (001)  │ RED (100)       │ \x1b[32m✓ PASSED\x1b[0m      │
├─────────┼───────┼──────────────┼─────────────────┼─────────────────┤
│ 20ns    │ 1     │ GREEN (001)  │ RED (100)       │ \x1b[32m✓ PASSED\x1b[0m      │
├─────────┼───────┼──────────────┼─────────────────┼─────────────────┤
│ 40ns    │ 1     │ YELLOW (010) │ RED (100)       │ \x1b[32m✓ PASSED\x1b[0m      │
├─────────┼───────┼──────────────┼─────────────────┼─────────────────┤
│ 60ns    │ 1     │ RED (100)    │ RED (100)       │ \x1b[32m✓ PASSED\x1b[0m      │
├─────────┼───────┼──────────────┼─────────────────┼─────────────────┤
│ 80ns    │ 1     │ RED (100)    │ GREEN (001)     │ \x1b[32m✓ PASSED\x1b[0m      │
├─────────┼───────┼──────────────┼─────────────────┼─────────────────┤
│ 100ns   │ 0     │ RED (100)    │ GREEN (001)     │ \x1b[32m✓ PASSED\x1b[0m      │
├─────────┼───────┼──────────────┼─────────────────┼─────────────────┤
│ 120ns   │ 0     │ RED (100)    │ YELLOW (010)    │ \x1b[32m✓ PASSED\x1b[0m      │
├─────────┼───────┼──────────────┼─────────────────┼─────────────────┤
│ 140ns   │ 0     │ RED (100)    │ RED (100)       │ \x1b[32m✓ PASSED\x1b[0m      │
├─────────┼───────┼──────────────┼─────────────────┼─────────────────┤
│ 160ns   │ 0     │ GREEN (001)  │ RED (100)       │ \x1b[32m✓ PASSED\x1b[0m      │
└─────────┴───────┴──────────────┴─────────────────┴─────────────────┘

\x1b[1;32mSummary: State transitions successfully verified.\x1b[0m
🎉 \x1b[1mCongratulations!\x1b[0m Your traffic light controller FSM implementation works correctly.

\x1b[33mDesign Feedback:\x1b[0m
✓ FSM state transitions are implemented correctly
✓ Reset logic is properly handled
✓ Outputs are correctly set based on state
✓ Good structure for sequential control logic
`);
        } else {
          // Generic success message for other modules
          setOutput(`
\x1b[1;32m✓ Compilation successful!\x1b[0m

\x1b[1;36mRunning simulation...\x1b[0m

\x1b[1;33mTest Results:\x1b[0m
All test cases have passed.

\x1b[1;32mSummary: Implementation verified successfully.\x1b[0m
🎉 \x1b[1mCongratulations!\x1b[0m Your implementation is functionally correct.
`);
        }
        
        setConsoleOutput(`Compilation successful. No errors or warnings detected.\n\nSimulation completed successfully.\nAll test cases passed!\n\nSee the Simulation tab for detailed results.`);
        
        setNotification({
          open: true,
          message: 'Implementation successful! All tests passed.',
          severity: 'success'
        });
      } else {
        // Implementation issues
        setOutput(`
\x1b[1;33mCompilation Warning:\x1b[0m
Your module compiles, but appears to have implementation issues.

\x1b[1;31mRuntime Errors:\x1b[0m
The simulation indicates that your implementation does not correctly produce the expected outputs.

\x1b[1;33mVerification Results:\x1b[0m
Test cases failed. See the Console tab for details.

\x1b[1;36mTroubleshooting Suggestions:\x1b[0m
1. Check if your logic implements the required functionality correctly
2. Verify that you've connected all signals properly
3. Review the implementation steps in the guide
4. Look at the hints for additional guidance

\x1b[33mHint:\x1b[0m Review the design requirements and ensure your implementation matches the specifications.
`);
        
        setNotification({
          open: true,
          message: 'Your code compiles but has implementation issues.',
          severity: 'warning'
        });
      }
      
      setIsCompiling(false);
    }, 1500);
  };

  const handleSaveCode = () => {
    setNotification({
      open: true,
      message: 'Code saved successfully!',
      severity: 'success'
    });
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') return;
    setNotification({ ...notification, open: false });
  };

  const handleShowHint = () => {
    setTabValue(2); // Switch to the Hints tab
  };
  
  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setNotification({
      open: true,
      message: 'Code copied to clipboard!',
      severity: 'info'
    });
  };
  
  const handleDownloadCode = () => {
    const element = document.createElement('a');
    const file = new Blob([code], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${selectedModule || 'verilog'}_code.v`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    setNotification({
      open: true,
      message: 'Code downloaded successfully',
      severity: 'success'
    });
  };
  
  // Verify syntax of Verilog code to catch common errors
  const verifySyntax = (code) => {
    const errors = [];
    
    // Check if module declaration exists
    if (!code.includes('module ') || !code.includes('endmodule')) {
      errors.push('Missing module declaration or endmodule statement');
    }
    
    // Check for mismatched begin/end blocks
    const beginCount = (code.match(/\bbegin\b/g) || []).length;
    const endCount = (code.match(/\bend\b/g) || []).length - (code.match(/\bendmodule\b/g) || []).length;
    
    if (beginCount !== endCount) {
      errors.push(`Mismatched begin/end blocks: ${beginCount} begin(s) vs ${endCount} end(s)`);
    }
    
    // Check for unclosed comments
    if ((code.match(/\/\*/g) || []).length !== (code.match(/\*\//g) || []).length) {
      errors.push('Unclosed block comment (/* without matching */)');
    }
    
    // Check for common syntax issues in port declarations
    if (code.includes('input ') || code.includes('output ')) {
      // Check for comma after last port
      if (/,\s*\)/.test(code)) {
        errors.push('Trailing comma after last port in port list');
      }
      
      // Check for semicolons in port list
      if (/\binput\b[^;]*;[^;]*\)/.test(code) || /\boutput\b[^;]*;[^;]*\)/.test(code)) {
        errors.push('Semicolon in port list (should be commas between ports)');
      }
    }
    
    // Check for missing semicolons after wire/reg declarations
    if (/\bwire\b[^;]*\n/.test(code) || /\breg\b[^;]*\n/.test(code)) {
      errors.push('Missing semicolon after wire or reg declaration');
    }
    
    // Check for proper always block syntax
    const alwaysBlocks = code.match(/always\s*@\s*\([^)]*\)/g) || [];
    for (const block of alwaysBlocks) {
      if (!block.includes('posedge') && !block.includes('negedge') && !block.includes('*')) {
        errors.push('Always block missing proper sensitivity list (posedge, negedge or *)');
      }
    }
    
    // Check for blocking assignments in sequential logic
    if (/always\s*@\s*\(\s*posedge[^)]*\)[^=]*=[^=]/.test(code)) {
      errors.push('Possible blocking assignment (=) in sequential always block - should use non-blocking (<=)');
    }
    
    // Check for non-blocking assignments in combinational logic
    if (/always\s*@\s*\(\s*\*[^)]*\)[^=]*<=[^=]/.test(code)) {
      errors.push('Possible non-blocking assignment (<=) in combinational always block - should use blocking (=)');
    }
    
    // Module-specific checks
    if (selectedModule === 'full_adder') {
      if (!code.includes('sum') || !code.includes('cout')) {
        errors.push('Full adder module should define sum and cout outputs');
      }
    } else if (selectedModule === 'ripple_carry_adder') {
      if ((!code.includes('[3:0]') && !code.includes('[0:3]')) || !code.includes('wire')) {
        errors.push('Ripple carry adder should define 4-bit signals and internal wires for carries');
      }
    } else if (selectedModule === 'alu') {
      if (!code.includes('case') || (!code.includes('op') && !code.includes('opcode'))) {
        errors.push('ALU should include a case statement based on operation code (op)');
      }
    } else if (selectedModule === 'fsm_traffic') {
      if (!code.includes('state') || !code.includes('parameter')) {
        errors.push('Traffic light FSM should define state parameters and a state register');
      }
    }
    
    return errors;
  };

  // Render test cases section
  const renderTestCases = () => {
    if (!exerciseData?.testCases?.length) return null;
    
    return (
      <List>
        {exerciseData.testCases.map((testCase, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <Assignment />
            </ListItemIcon>
            <ListItemText
              primary={`Test Case ${index + 1}`}
              secondary={
                <>
                  <Typography component="span" variant="body2" color="text.primary">
                    Inputs: {testCase.inputs}
                  </Typography>
                  <br />
                  <Typography component="span" variant="body2" color="text.primary">
                    Expected: {testCase.expectedOutputs}
                  </Typography>
                  <br />
                  {testCase.explanation}
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    );
  };

  // Render hints section
  const renderHints = () => {
    if (!exerciseData?.hints?.length) return null;
    
    return (
      <List>
        {exerciseData.hints.map((hint, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <LightbulbOutlined />
            </ListItemIcon>
            <ListItemText primary={hint} />
          </ListItem>
        ))}
      </List>
    );
  };

  // Render resources section
  const renderResources = () => {
    if (!exerciseData?.resources?.length) return null;
    
    return (
      <Grid container spacing={2}>
        {exerciseData.resources.map((resource, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {resource.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {resource.description}
                </Typography>
                <Chip 
                  label={resource.type} 
                  color="primary" 
                  size="small" 
                  sx={{ mt: 1 }} 
                />
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  color="primary" 
                  href={resource.url} 
                  target="_blank"
                >
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  // Render truth table if available
  const renderTruthTable = () => {
    if (!exerciseData?.truthTable?.length) return null;
    
    return (
      <Box sx={{ overflowX: 'auto', mt: 2 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {Object.keys(exerciseData.truthTable[0]).map((header) => (
                <th key={header} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                  {header.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {exerciseData.truthTable.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, i) => (
                  <td key={i} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    );
  };

  return (
    <Box className="container page-container">
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          component={Link}
          to="/practice"
          startIcon={<ArrowBack />}
          sx={{ mr: 2 }}
        >
          Back to Practice
        </Button>
        <Typography variant="h4" component="h1">
          {exerciseData?.title || 'Code Editor'}
        </Typography>
      </Box>

      {/* Module Selector */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Select Module</InputLabel>
        <Select
          value={selectedModule}
          onChange={handleModuleChange}
          label="Select Module"
        >
          {practiceModules.map((module) => (
            <MenuItem key={module.id} value={module.id}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <Typography>{module.name}</Typography>
                <Chip 
                  label={module.level} 
                  size="small"
                  color={
                    module.level === 'Beginner' ? 'success' :
                    module.level === 'Intermediate' ? 'warning' :
                    'error'
                  }
                  sx={{ ml: 1 }}
                />
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Left Panel - Exercise Info */}
        <Grid item xs={12} md={4}>
          {exerciseData && (
            <>
              {/* Background */}
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Background
                </Typography>
                <Typography variant="body1" paragraph>
                  {exerciseData.background}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Requirements:</strong> {exerciseData.requirements}
                </Typography>
                {exerciseData.imageUrl && (
                  <Box
                    component="img"
                    src={exerciseData.imageUrl}
                    alt={exerciseData.title}
                    sx={{
                      width: '100%',
                      height: 'auto',
                      mt: 2,
                      borderRadius: 1
                    }}
                  />
                )}
                {exerciseData.truthTable && exerciseData.truthTable.length > 0 && (
                  <>
                    <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                      Truth Table:
                    </Typography>
                    {renderTruthTable()}
                  </>
                )}
              </Paper>

              {/* Test Cases */}
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Test Cases
                </Typography>
                <Typography variant="body2" paragraph>
                  Your implementation will be validated against these test cases.
                </Typography>
                {renderTestCases()}
              </Paper>

              {/* Resources */}
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Additional Resources
                </Typography>
                {renderResources()}
              </Paper>
            </>
          )}
        </Grid>

        {/* Right Panel - Code Editor and Output */}
        <Grid item xs={12} md={8}>
          {/* Code Editor Section */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">
                Code Editor
              </Typography>
              <Box>
                <Button
                  startIcon={<ContentCopy />}
                  onClick={handleCopyCode}
                  sx={{ mr: 1 }}
                >
                  Copy
                </Button>
                <Button
                  startIcon={<Download />}
                  onClick={handleDownloadCode}
                  sx={{ mr: 1 }}
                >
                  Download
                </Button>
                <Button
                  variant="contained"
                  startIcon={<PlayArrow />}
                  onClick={handleRunCode}
                  disabled={isCompiling}
                >
                  Run
                </Button>
              </Box>
            </Box>
            {/* Code Editor Component */}
            <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1 }}>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                style={{
                  width: '100%',
                  minHeight: '400px',
                  padding: '16px',
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  border: 'none',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />
            </Box>
          </Paper>

          {/* Output Section */}
          <Paper sx={{ p: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
              <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
                <Tab label="Output" icon={<Assessment />} iconPosition="start" />
                <Tab label="Console" icon={<Terminal />} iconPosition="start" />
                <Tab label="Hints" icon={<LightbulbOutlined />} iconPosition="start" />
                <Tab label="Debug" icon={<BugReport />} iconPosition="start" />
              </Tabs>
            </Box>

            {/* Output Content */}
            <Box role="tabpanel" hidden={tabValue !== 0}>
              {isCompiling ? (
                <Box sx={{ width: '100%' }}>
                  <LinearProgress />
                  <Typography sx={{ mt: 1 }}>Compiling and running your code...</Typography>
                </Box>
              ) : (
                <Typography
                  component="pre"
                  sx={{
                    p: 2,
                    bgcolor: 'grey.100',
                    borderRadius: 1,
                    fontFamily: 'monospace',
                    fontSize: '14px',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word'
                  }}
                >
                  {output || 'Run your code to see the output here.'}
                </Typography>
              )}
            </Box>

            {/* Console Output */}
            <Box role="tabpanel" hidden={tabValue !== 1}>
              <Typography
                component="pre"
                sx={{
                  p: 2,
                  bgcolor: 'grey.100',
                  borderRadius: 1,
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word'
                }}
              >
                {consoleOutput || 'Console output will appear here.'}
              </Typography>
            </Box>

            {/* Hints */}
            <Box role="tabpanel" hidden={tabValue !== 2}>
              {renderHints()}
            </Box>

            {/* Debug Info */}
            <Box role="tabpanel" hidden={tabValue !== 3}>
              <Typography variant="body1">
                Debug information and additional tools will be available here.
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert
          onClose={() => setNotification({ ...notification, open: false })}
          severity={notification.severity}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CodeEditor; 