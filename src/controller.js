import { INVALID_INPUT, OPERATION_FAILED } from './constants/constants.js';
import { getCurrentWorkingDir } from './utils/currentDir.js'; 
import { readDir, addNewFile, upOperation, cdOperation, catOperation } from './operations/index.js';

export const controller = async(line) => {
  const [command, ...args] = line.trim().split(' ');
  const currentDirectory = getCurrentWorkingDir();

  try {
    switch(command) {
      case 'up': {
        await upOperation(currentDirectory);
        break;
      }
      case 'cd': {
        await cdOperation(args[0], currentDirectory);
        break;
      } 
      case 'ls': {
        await readDir(currentDirectory);
        break;
      } 
      case 'cat': {
        await catOperation(args[0]);
        break;
      }
      case 'add': {
        await addNewFile(args[0]);
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