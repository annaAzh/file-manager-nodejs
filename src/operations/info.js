import os from 'os';
import { OPERATION_FAILED, INVALID_INPUT } from '../constants/constants.js';
import { coloredOutput, colors } from '../utils/coloredOutput.js';

export const operationInfo = (arg) => {
  try {
    switch (arg.slice(2)) {
      case 'EOL': {
        process.stdout.write(coloredOutput(JSON.stringify(os.EOL), colors.green));
        break;
      }
      case 'cpus': {
        const cpusLength = os.cpus().length;
        const cpusInfo = os.cpus().map(({model, speed}) => ({model, speed}));
        console.table(cpusInfo);
        process.stdout.write(coloredOutput(`Amount of CPUS - ${cpusLength}`, colors.green));
        break;
      }
      case 'homedir': {
        process.stdout.write(coloredOutput(os.homedir(), colors.green));
        break;
      }
      case 'username': {
        process.stdout.write(coloredOutput(os.userInfo().username, colors.green));
        break;
      }
      case 'architecture': {
        process.stdout.write(coloredOutput(os.arch(), colors.green));
        break;
      }
      default: {
        throw new Error(INVALID_INPUT);
      }
    }
    
  } catch (error) {
    if (error.message === INVALID_INPUT) {
      throw new Error(INVALID_INPUT);
    }
    throw new Error(OPERATION_FAILED);
  }
}