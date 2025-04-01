const chapter1 = {
  id: 1,
  title: "Introduction to Verilog",
  description: "Learn about Verilog HDL, its history, and its role in digital design",
  estimatedTime: "2 hours",
  completed: false,
  sections: [
    {
      id: "1.1",
      title: "What is Verilog? History & Use-Cases",
      content: `
        <h3>What is Verilog?</h3>
        <p>Verilog is a <strong>Hardware Description Language (HDL)</strong> used to model electronic systems. Unlike traditional programming languages that run sequentially, Verilog is designed to describe hardware that operates in parallel.</p>
        
        <p>Verilog allows engineers to:</p>
        <ul>
          <li>Describe the structure and behavior of digital circuits</li>
          <li>Simulate and verify designs before physical implementation</li>
          <li>Synthesize designs into actual hardware (FPGAs or ASICs)</li>
        </ul>
        
        <h3>History of Verilog</h3>
        <p>Verilog was created by Phil Moorby at Gateway Design Automation in 1984. Here's a brief timeline:</p>
        <ul>
          <li><strong>1984</strong>: Initial development at Gateway Design Automation</li>
          <li><strong>1989</strong>: Cadence Design Systems acquired Gateway</li>
          <li><strong>1990</strong>: Cadence made Verilog available in the public domain</li>
          <li><strong>1995</strong>: IEEE standardized as IEEE 1364-1995 (Verilog-95)</li>
          <li><strong>2001</strong>: Updated to IEEE 1364-2001 (Verilog-2001)</li>
          <li><strong>2005</strong>: Latest version IEEE 1364-2005</li>
          <li><strong>2009</strong>: SystemVerilog (IEEE 1800-2009) incorporated Verilog</li>
        </ul>
        
        <h3>Use Cases</h3>
        <p>Verilog is widely used in the semiconductor and electronic design industry for:</p>
        <ul>
          <li><strong>ASIC Design</strong> - Creating custom integrated circuits</li>
          <li><strong>FPGA Development</strong> - Programming field-programmable gate arrays</li>
          <li><strong>SoC Design</strong> - System-on-Chip integrating processors and peripherals</li>
          <li><strong>Verification</strong> - Creating testbenches to verify hardware functionality</li>
          <li><strong>Prototyping</strong> - Rapid development of hardware prototypes</li>
        </ul>
        
        <p>Many of today's complex digital systems, from smartphone processors to high-performance computing hardware, were designed using Verilog.</p>
      `
    },
    {
      id: "1.2",
      title: "HDL vs Software Programming",
      content: `
        <h3>Hardware Description vs. Software Programming</h3>
        <p>While Verilog syntax may look similar to C programming at first glance, there are fundamental differences in how HDLs work compared to software programming languages:</p>
        
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr style="background-color:#f0f0f0">
            <th>Aspect</th>
            <th>Software Programming (e.g., C/Java)</th>
            <th>Hardware Description (Verilog)</th>
          </tr>
          <tr>
            <td><strong>Execution Model</strong></td>
            <td>Sequential execution of instructions</td>
            <td>Parallel operation of hardware components</td>
          </tr>
          <tr>
            <td><strong>Time Concept</strong></td>
            <td>Implicit, based on instruction sequence</td>
            <td>Explicit timing controls (#, @) representing real hardware delays</td>
          </tr>
          <tr>
            <td><strong>Variables</strong></td>
            <td>Represent memory locations</td>
            <td>Represent actual wires (nets) or storage elements (reg)</td>
          </tr>
          <tr>
            <td><strong>Assignments</strong></td>
            <td>Execute once when reached</td>
            <td>Continuous (always active) or procedural (triggered by events)</td>
          </tr>
          <tr>
            <td><strong>Functions</strong></td>
            <td>Called and return values</td>
            <td>Represent combinational logic, executed in zero simulation time</td>
          </tr>
          <tr>
            <td><strong>End Result</strong></td>
            <td>Machine code instructions for CPU</td>
            <td>Digital logic circuits (gates, flip-flops, etc.)</td>
          </tr>
        </table>
        
        <h3>Key Differences in Thinking</h3>
        <p>When writing Verilog, you need to shift your thinking from algorithmic to hardware-oriented:</p>
        <ul>
          <li><strong>Concurrency</strong>: In software, operations happen one after another. In hardware, multiple operations occur simultaneously.</li>
          <li><strong>Physical Realization</strong>: Each line of Verilog code maps to actual hardware structures.</li>
          <li><strong>Resource Constraints</strong>: Software can often use unlimited memory (virtually). Hardware has fixed resources.</li>
          <li><strong>Clock Domains</strong>: Synchronous hardware operates based on clock signals, requiring careful timing analysis.</li>
        </ul>
        
        <p>Understanding this fundamental difference is crucial for writing effective Verilog code that translates well to actual hardware.</p>
      `
    },
    {
      id: "1.3",
      title: "Simulation vs Synthesis",
      content: `
        <h3>Simulation vs. Synthesis: Understanding the Difference</h3>
        <p>The Verilog development flow involves two distinct processes: <strong>simulation</strong> and <strong>synthesis</strong>. Understanding the difference is essential for effective hardware design.</p>
        
        <h3>Simulation</h3>
        <p>Simulation is the process of <em>verifying functionality</em> by running the design in a software environment.</p>
        
        <p><strong>Key characteristics of simulation:</strong></p>
        <ul>
          <li>Tests the logical correctness of your design</li>
          <li>Operates in a virtual environment</li>
          <li>Can model timing with different levels of accuracy</li>
          <li>Allows debugging with waveforms and print statements</li>
          <li>Supports all Verilog constructs</li>
        </ul>
        
        <p><strong>During simulation:</strong></p>
        <ul>
          <li>Testbenches provide stimuli to the design</li>
          <li>Waveforms show the behavior over time</li>
          <li>System tasks like $display and $monitor provide debug information</li>
          <li>Design flaws can be identified and fixed</li>
        </ul>
        
        <h3>Synthesis</h3>
        <p>Synthesis is the process of <em>translating Verilog code into actual hardware</em> (logic gates).</p>
        
        <p><strong>Key characteristics of synthesis:</strong></p>
        <ul>
          <li>Converts your design into physical hardware elements</li>
          <li>Only supports a subset of Verilog (synthesizable constructs)</li>
          <li>Optimizes for area, power, or speed</li>
          <li>Targets specific technology (FPGA, ASIC library)</li>
          <li>Considers real-world constraints</li>
        </ul>
        
        <p><strong>During synthesis:</strong></p>
        <ul>
          <li>Behavioral descriptions are converted to gates and flip-flops</li>
          <li>Non-synthesizable constructs are ignored</li>
          <li>Logic optimization algorithms are applied</li>
          <li>Technology mapping maps to available resources</li>
        </ul>
        
        <h3>Synthesizable vs. Non-Synthesizable Verilog</h3>
        <p>Not all Verilog code that simulates correctly can be synthesized to hardware:</p>
        
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr style="background-color:#f0f0f0">
            <th>Synthesizable Constructs</th>
            <th>Non-Synthesizable Constructs</th>
          </tr>
          <tr>
            <td>
              <ul>
                <li>module, port declarations</li>
                <li>assign statements</li>
                <li>always blocks (with restrictions)</li>
                <li>if, case statements</li>
                <li>limited for loops (with fixed bounds)</li>
                <li>instantiated modules</li>
                <li>functions (combinational)</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>initial blocks</li>
                <li>time delays (#10)</li>
                <li>wait statements</li>
                <li>fork-join blocks</li>
                <li>non-blocking assignments in combinational logic</li>
                <li>system tasks ($display, $monitor)</li>
                <li>infinite loops</li>
              </ul>
            </td>
          </tr>
        </table>
        
        <p>Understanding which constructs are synthesizable is crucial for writing code that can be implemented in hardware.</p>
      `
    },
    {
      id: "1.4",
      title: "Tools & Simulators (ModelSim, Vivado, etc.)",
      content: `
        <h3>Verilog Design Tools and Simulators</h3>
        <p>A variety of tools are available for Verilog development, each serving different purposes in the design flow.</p>
        
        <h3>Simulators</h3>
        <p>Simulators execute your Verilog code in a virtual environment to verify functionality.</p>
        
        <h4>ModelSim/QuestaSim (Siemens EDA, formerly Mentor Graphics)</h4>
        <ul>
          <li><strong>Features</strong>: Industry-standard simulation, powerful debugging, TCL scripting</li>
          <li><strong>Pros</strong>: Fast simulation, comprehensive debugging tools, broad language support</li>
          <li><strong>Versions</strong>: Commercial version and free ModelSim PE Student Edition</li>
          <li><strong>Use Case</strong>: Professional ASIC/FPGA development</li>
        </ul>
        
        <h4>Icarus Verilog + GTKWave</h4>
        <ul>
          <li><strong>Features</strong>: Open-source Verilog simulator with waveform viewer</li>
          <li><strong>Pros</strong>: Free, cross-platform, good for learning</li>
          <li><strong>Use Case</strong>: Education, small projects, open-source development</li>
        </ul>
        
        <h4>Verilator</h4>
        <ul>
          <li><strong>Features</strong>: Open-source, converts Verilog to optimized C++/SystemC</li>
          <li><strong>Pros</strong>: Extremely fast simulation, good for large designs</li>
          <li><strong>Use Case</strong>: High-performance simulation needs</li>
        </ul>
        
        <h3>Synthesis and Implementation Tools</h3>
        <p>These tools convert Verilog code into actual hardware configurations.</p>
        
        <h4>Xilinx Vivado Design Suite</h4>
        <ul>
          <li><strong>Features</strong>: Complete suite for Xilinx FPGA design, includes simulator</li>
          <li><strong>Pros</strong>: Integrated environment, powerful optimization</li>
          <li><strong>Versions</strong>: Commercial versions and free WebPACK edition</li>
          <li><strong>Use Case</strong>: Designs targeting Xilinx FPGAs</li>
        </ul>
        
        <h4>Intel Quartus Prime</h4>
        <ul>
          <li><strong>Features</strong>: Design software for Intel (formerly Altera) FPGAs</li>
          <li><strong>Pros</strong>: Optimized for Intel devices, includes TimeQuest timing analyzer</li>
          <li><strong>Versions</strong>: Commercial versions and free Lite edition</li>
          <li><strong>Use Case</strong>: Designs targeting Intel FPGAs</li>
        </ul>
        
        <h4>Synopsys Design Compiler</h4>
        <ul>
          <li><strong>Features</strong>: Industry-standard ASIC synthesis tool</li>
          <li><strong>Pros</strong>: Highly optimized results, supports complex designs</li>
          <li><strong>Use Case</strong>: Commercial ASIC development</li>
        </ul>
        
        <h3>Open-Source Tools</h3>
        
        <h4>Yosys Open Synthesis Suite</h4>
        <ul>
          <li><strong>Features</strong>: Open-source RTL synthesis tools</li>
          <li><strong>Pros</strong>: Free, supports various output formats, customizable</li>
          <li><strong>Use Case</strong>: Open-source development, education, research</li>
        </ul>
        
        <h3>Basic Verilog Development Flow</h3>
        <ol>
          <li><strong>Write Code</strong>: Create Verilog modules and testbenches in a text editor or IDE</li>
          <li><strong>Simulate</strong>: Verify functionality using a simulator</li>
          <li><strong>Synthesize</strong>: Convert verified code to gate-level representation</li>
          <li><strong>Implement</strong>: Map to target technology, place and route (for FPGAs)</li>
          <li><strong>Generate Output</strong>: Create programming files (bitstream for FPGAs) or netlists (for ASICs)</li>
        </ol>
        
        <p>For this course, we'll primarily use ModelSim for simulation and Vivado for synthesis examples, but the concepts apply across different tools.</p>
      `
    }
  ],
  examples: [
    {
      id: "example1_1",
      title: "First Verilog Module",
      description: "A simple AND gate implementation showing basic module structure",
      code: `module and_gate(
  input a,    // First input
  input b,    // Second input
  output y    // Output
);
  
  // Continuous assignment - always active
  assign y = a & b;
  
endmodule`,
      explanation: "This example shows the basic structure of a Verilog module. It defines an AND gate with two inputs (a and b) and one output (y). The 'assign' statement creates a continuous assignment that connects the output to the AND operation of the inputs. This is a simple example of dataflow modeling in Verilog."
    },
    {
      id: "example1_2",
      title: "Simulation vs. Synthesis Example",
      description: "Code showing the difference between simulation-only and synthesizable constructs",
      code: `module example(
  input clk,
  input reset,
  input data_in,
  output reg data_out
);
  
  // Synthesizable - sequential logic
  always @(posedge clk or posedge reset) begin
    if (reset)
      data_out <= 1'b0;
    else
      data_out <= data_in;
  end
  
  // NON-synthesizable - simulation only
  initial begin
    $display("Simulation starting...");
    $monitor("At time %t: data_out = %b", $time, data_out);
  end
  
endmodule`,
      explanation: "This example demonstrates both synthesizable and non-synthesizable constructs. The 'always' block with clock and reset is synthesizable and will be converted to a flip-flop. The 'initial' block with $display and $monitor is for simulation only and will be ignored during synthesis. This highlights the distinction between code for testing (simulation) and code for actual hardware implementation (synthesis)."
    }
  ],
  videos: [
    {
      id: "video1_1",
      title: "Introduction to Verilog and Digital Design",
      description: "An overview of Verilog and its role in modern digital design",
      duration: "12:34",
      url: "https://www.youtube.com/watch?v=PJGvZSlsLKs",
      thumbnail: "https://img.youtube.com/vi/PJGvZSlsLKs/0.jpg"
    },
    {
      id: "video1_2",
      title: "Setting Up Your Verilog Development Environment",
      description: "Step-by-step guide to installing and configuring ModelSim for Verilog development",
      duration: "18:21",
      url: "https://www.youtube.com/watch?v=hhtA3PUoNz0",
      thumbnail: "https://img.youtube.com/vi/hhtA3PUoNz0/0.jpg"
    }
  ],
  quiz: {
    title: "Introduction to Verilog Quiz",
    description: "Test your understanding of Verilog basics, history, and development tools",
    questions: [
      {
        id: "q1_1",
        question: "When was Verilog first developed?",
        options: [
          { id: "a", text: "1974" },
          { id: "b", text: "1984" },
          { id: "c", text: "1991" },
          { id: "d", text: "2001" }
        ],
        correctAnswer: "b",
        explanation: "Verilog was first developed in 1984 by Phil Moorby at Gateway Design Automation."
      },
      {
        id: "q1_2",
        question: "Which of the following is NOT a characteristic of Hardware Description Languages?",
        options: [
          { id: "a", text: "Describes hardware behavior" },
          { id: "b", text: "Sequential execution model" },
          { id: "c", text: "Supports concurrency" },
          { id: "d", text: "Can be synthesized to actual hardware" }
        ],
        correctAnswer: "b",
        explanation: "HDLs like Verilog have a concurrent execution model, not sequential like software programming languages. This reflects the parallel nature of hardware."
      },
      {
        id: "q1_3",
        question: "Which of these constructs is NOT synthesizable?",
        options: [
          { id: "a", text: "always @(posedge clk)" },
          { id: "b", text: "assign y = a & b;" },
          { id: "c", text: "initial begin ... end" },
          { id: "d", text: "if-else statements" }
        ],
        correctAnswer: "c",
        explanation: "The 'initial' block is used for simulation only and is not synthesizable to hardware. It's commonly used in testbenches."
      },
      {
        id: "q1_4",
        question: "What is the primary difference between simulation and synthesis in Verilog?",
        options: [
          { id: "a", text: "Simulation is faster than synthesis" },
          { id: "b", text: "Synthesis checks for syntax errors, simulation checks for logical errors" },
          { id: "c", text: "Simulation verifies functionality in a virtual environment, synthesis translates code to hardware" },
          { id: "d", text: "Synthesis is used for FPGA designs, simulation is used for ASIC designs" }
        ],
        correctAnswer: "c",
        explanation: "Simulation runs code in a virtual environment to verify functionality, while synthesis translates Verilog code into actual hardware components like gates and flip-flops."
      },
      {
        id: "q1_5",
        question: "Which of these tools is an open-source Verilog simulator?",
        options: [
          { id: "a", text: "Vivado" },
          { id: "b", text: "ModelSim" },
          { id: "c", text: "Quartus Prime" },
          { id: "d", text: "Icarus Verilog" }
        ],
        correctAnswer: "d",
        explanation: "Icarus Verilog is an open-source Verilog simulator. Vivado and Quartus Prime are FPGA development suites, while ModelSim is a commercial simulator (although it has a free student edition)."
      }
    ]
  }
};

export default chapter1; 