import {join, resolve} from 'path';
import { chdir } from 'process';
import { INVALID_INPUT, OPERATION_FAILED } from '../constants/constants.js';
import {getCurrentWorkingDir} from './currentDir.js';
import { getHomeDir } from './homeDir.js';
import { readDir } from './operations/readDir.js';

export const controller = async(line) => {
  const [command, ...args] = line.trim().split(' ');
  const currentDirectory = getCurrentWorkingDir();

  try {
    switch(command) {
      case 'up': {
        if (currentDirectory === getHomeDir()) {
          return process.stdout.write(INVALID_INPUT);
        }
        const pathAbove = join(currentDirectory, '..');
        chdir(pathAbove);
        break;
      }
      case 'cd': {
        chdir(resolve(currentDirectory, args[0]));
        break;
      } 
      case 'ls': {
        await readDir(currentDirectory);
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