// Import module data
import verilogFundamentals from './modules/verilogFundamentals';
import riscvProcessor from './modules/riscvProcessor';

// Define all modules
const modules = [
  verilogFundamentals,
  riscvProcessor
];

// Function to get module by ID
export const getModuleById = (id) => {
  return modules.find(module => module.id === id) || null;
};

// Export all modules
export default modules; 