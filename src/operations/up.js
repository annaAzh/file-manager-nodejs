import { OPERATION_FAILED } from '../constants/constants.js';
import { getHomeDir } from '../utils/homeDir.js';
import { INVALID_INPUT } from '../constants/constants.js';
import { join } from 'path';
import { chdir } from 'process';

export const upOperation = async (currentDirectory) => {
  try {
    if (currentDirectory === getHomeDir()) {
      return process.stdout.write(INVALID_INPUT);
    }
    const pathAbove = join(currentDirectory, '..');
    chdir(pathAbove);
  } catch {
    throw new Error(OPERATION_FAILED);
  }
}