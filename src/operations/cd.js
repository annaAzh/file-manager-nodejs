import { isExistDirectory } from '../utils/checkIsDirectory.js';
import { OPERATION_FAILED } from '../constants/constants.js';
import { chdir } from 'process';
import { handlePath } from '../utils/paths.js';

export const cdOperation = async (path) => {
  try {
    const parsedPath = handlePath(path);
    await isExistDirectory(parsedPath);
    chdir(parsedPath);
  } catch {
    throw new Error(OPERATION_FAILED);
  }
}