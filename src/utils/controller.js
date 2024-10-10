import {join, resolve} from 'path';
import { chdir } from 'process';
import { INVALID_INPUT, OPERATION_FAILED } from '../constants/constants.js';
import {getCurrentWorkingDir} from './currentDir.js';
import { getHomeDir } from './homeDir.js';

export const controller = (line) => {
  const [command, ...args] = line.trim().split(' ');

  try {
    switch(command) {
      case 'up': {
        if (getCurrentWorkingDir() === getHomeDir()) {
          return process.stdout.write(INVALID_INPUT);
        }
        const pathAbove = join(getCurrentWorkingDir(), '..');
        chdir(pathAbove);
        break;
      }
      case 'cd': {
        chdir(resolve(getCurrentWorkingDir(), args[0]));
        break;
      } 
      case '.exit': {
        process.exit(0);
      } 
      default: {
        throw new Error(INVALID_INPUT);
      }
    }
  } catch (error) {
    if (error.message === INVALID_INPUT) {
      return process.stdout.write(INVALID_INPUT);
    } else {
      return process.stdout.write(OPERATION_FAILED);
    }
  }
}