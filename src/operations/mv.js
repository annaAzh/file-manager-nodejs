import { createReadStream, createWriteStream } from 'fs';
import { rm } from 'fs/promises';
import { OPERATION_FAILED } from '../constants/constants.js';
import { basename, resolve } from 'path';
import { isExistFile } from '../utils/checkisExistFile.js';
import { isExistDirectory } from '../utils/checkIsDirectory.js';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { coloredOutput, colors } from '../utils/coloredOutput.js';

export const moveFile = async (pathToFile, pathToNewDir) => {
  const promisifiedPipeline = promisify(pipeline);

  try {
    const resolvedPath = resolve(pathToFile);
    await isExistFile(resolvedPath);

    const directorePath = resolve(pathToNewDir);
    await isExistDirectory(directorePath);

    const fileName = basename(resolvedPath);

    const destinationPath = resolve(directorePath, fileName);
    const readStream = createReadStream(resolvedPath);
    const writeStream = createWriteStream(resolve(destinationPath));
    
    await promisifiedPipeline(readStream, writeStream);

    await rm(resolvedPath);
    process.stdout.write(coloredOutput(`File was moved`, colors.green));
  
  } catch {
    throw new Error(OPERATION_FAILED);
  }
}