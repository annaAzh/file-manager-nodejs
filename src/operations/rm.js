import { rm } from 'fs/promises';
import { OPERATION_FAILED } from '../constants/constants.js';
import { resolve } from 'path';
import { isExistFile } from '../utils/checkisExistFile.js';

export const removeFile = async (pathToFile) => {

  try {
    const resolvedPath = resolve(pathToFile);
    await isExistFile(resolvedPath);
    await rm(resolvedPath);

  } catch {
    throw new Error(OPERATION_FAILED);
  }
}