import { INVALID_INPUT, OPERATION_FAILED } from './constants/constants.js';
import { getCurrentWorkingDir } from './utils/currentDir.js'; 
import { readDir, addNewFile, upOperation, cdOperation, catOperation, renameFile, copyFile, moveFile, removeFile, operationInfo, operationHash, compressFile } from './operations/index.js';
import {parsePath} from './utils/paths.js';
import { coloredOutput, colors } from './utils/coloredOutput.js';


export const controller = async(line) => {
  const [command, ...rest] = line.trim().match(/'([^']*)'|"([^"]*)"|([^\s]+)/g).map(arg => arg.replace(/^['"]|['"]$/g, ''));
  const args = rest.length > 0 ? [parsePath(rest[0]), ...rest.slice(1)] : [];

  const currentDirectory = getCurrentWorkingDir();

  try {
    switch(command) {
      case 'up': {
        if (args.length > 0) {
          throw new Error(INVALID_INPUT);
        }
        await upOperation(currentDirectory);
        break;
      }
      case 'cd': { 
        await cdOperation(parsePath(rest[0]), currentDirectory);
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
      case 'rn': {
        const pathToFile = args[0];
        const newFileName = args[1];
        await renameFile(pathToFile, newFileName);
        break;
      }
      case 'cp': {
        const pathToFile = args[0];
        const pathToNewDir = args[1];
        await copyFile(pathToFile, pathToNewDir);
        break;
      }
      case 'mv': {
        const pathToFile = args[0];
        const pathToNewDir = parsePath(args[1]);
        await moveFile(pathToFile, pathToNewDir);
        break;
      }
      case 'rm': {
        const pathToFile = args[0];
        await removeFile(pathToFile);
        break;
      }
      case 'os': {
        await operationInfo(args[0]);
        break;
      }
      case 'hash': {
        const pathToFile = args[0];
        await operationHash(pathToFile);
        break;
      }
      case 'compress': {
        const pathToFile = args[0];
        const pathToDestination = parsePath(args[1]);
        await compressFile(pathToFile, pathToDestination, 'compress');
        break;
      }
      case 'decompress': {
        const pathToFile = args[0];
        const pathToDestination = parsePath(args[1]);
        await compressFile(pathToFile, pathToDestination, 'decompress');
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
      return process.stdout.write(coloredOutput(INVALID_INPUT, colors.magenta));
    } else {
      return process.stdout.write(coloredOutput(OPERATION_FAILED, colors.red));
    }
  }
}