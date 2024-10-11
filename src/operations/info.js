import os from 'os';
import { OPERATION_FAILED, INVALID_INPUT } from '../constants/constants.js';

export const operationInfo = (arg) => {
  try {
    switch (arg.slice(2)) {
      case 'EOL': {
        console.log(JSON.stringify(os.EOL))
        break;
      }
      case 'cpus': {
        const cpusLength = os.cpus().length;
        const cpusInfo = os.cpus().map(({model, speed}) => ({model, speed}));
        console.table(cpusInfo);
        console.log(`Amount of CPUS - ${cpusLength}`);
        break;
      }
      case 'homedir': {
        console.log(os.homedir())
        break;
      }
      case 'username': {
        console.log(os.userInfo().username)
        break;
      }
      case 'architecture': {
        console.log(os.arch())
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