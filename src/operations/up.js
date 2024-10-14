import { OPERATION_FAILED } from '../constants/constants.js';
import { getRootDirectory } from '../utils/homeDir.js';
import { join } from 'path';
import { chdir } from 'process';
import { coloredOutput, colors } from '../utils/coloredOutput.js';

export const upOperation = async (currentDirectory) => {
  try {
    if (currentDirectory === getRootDirectory()) {
      return process.stdout.write(coloredOutput('You are already at the root directory', colors.magenta));
    }

    const pathAbove = join(currentDirectory, '..');
    chdir(pathAbove);
  } catch {
    throw new Error(OPERATION_FAILED);
  }
}