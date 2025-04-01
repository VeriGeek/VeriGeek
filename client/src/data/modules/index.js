/**
 * Module Index
 * 
 * This file exports all module content data.
 */

import { verilogFundamentals } from './verilogFundamentals';
// Import other modules as they are created
// import { sequentialCircuitDesign } from './sequentialCircuitDesign';
// import { advancedTestbenchTechniques } from './advancedTestbenchTechniques';
// etc.

// Export all modules in an array
export const allModules = [
  verilogFundamentals,
  // Add other modules as they are created
];

// Export a function to get a module by ID
export const getModuleById = (id) => {
  // Convert id to number if it's a string
  const moduleId = typeof id === 'string' ? parseInt(id, 10) : id;
  return allModules.find(module => module.id === moduleId);
}; 