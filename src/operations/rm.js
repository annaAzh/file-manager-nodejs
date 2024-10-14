import { rm } from 'fs/promises';
import { OPERATION_FAILED } from '../constants/constants.js';
import { resolve } from 'path';
import { isExistFile } from '../utils/checkisExistFile.js';
import { coloredOutput, colors } from '../utils/coloredOutput.js';

export const removeFile = async (pathToFile) => {

  try {
    const resolvedPath = resolve(pathToFile);
    await isExistFile(resolvedPath);
    await rm(resolvedPath);
    process.stdout.write(coloredOutput(`File was removed`, colors.green));
  } catch {
    throw new Error(OPERATION_FAILED);
  }
}