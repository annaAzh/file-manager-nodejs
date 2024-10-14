import { rename as fsRename } from 'fs/promises';
import { OPERATION_FAILED } from '../constants/constants.js';
import { resolve, dirname } from 'path';
import { isExistFile } from '../utils/checkisExistFile.js';
import { coloredOutput, colors } from '../utils/coloredOutput.js';

export const renameFile = async (pathToFile, newFileName) => {
  try {
    const resolvedPath = resolve(pathToFile);
    await isExistFile(resolvedPath);

   const directorePath = dirname(resolvedPath);
   const pathToRename = resolve(directorePath, newFileName);

    await fsRename(resolvedPath, pathToRename).then(() => process.stdout.write(coloredOutput(`File was renamed`, colors.green)));

  } catch {
    throw new Error(OPERATION_FAILED);
  }
}