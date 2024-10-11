import {writeFile} from 'fs/promises';
import { OPERATION_FAILED } from '../constants/constants.js';

export const addNewFile = async (pathToFile) => {
  try {
   await writeFile(pathToFile, '');
  } catch {
    throw new Error(OPERATION_FAILED);
  }
}