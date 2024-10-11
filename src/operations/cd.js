import { isExistDirectory } from '../utils/checkIsDirectory.js';
import { OPERATION_FAILED } from '../constants/constants.js';
import { chdir } from 'process';
import { resolve } from 'path';

export const cdOperation = async (path, currentDirectory) => {
  try {
    isExistDirectory(path);
    chdir(resolve(currentDirectory, path));
  } catch {
    throw new Error(OPERATION_FAILED);
  }
}