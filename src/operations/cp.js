import { createReadStream, createWriteStream } from 'fs';
import { OPERATION_FAILED } from '../constants/constants.js';
import { basename, resolve } from 'path';
import { isExistFile } from '../utils/checkisExistFile.js';
import { isExistDirectory } from '../utils/checkIsDirectory.js';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { coloredOutput, colors } from '../utils/coloredOutput.js';

export const copyFile = async (pathToFile, pathToNewDir) => {

  const promisifiedPipeline = promisify(pipeline);

  try {
    const resolvedPath = resolve(pathToFile);
    await isExistFile(resolvedPath);

    const directorePath = resolve(pathToNewDir);
    await isExistDirectory(directorePath);

    const fileName = basename(resolvedPath);

    const readStream = createReadStream(resolvedPath);
    const writeStream = createWriteStream(resolve(directorePath, fileName));

    await promisifiedPipeline(readStream, writeStream);
    process.stdout.write(coloredOutput(`File was copied`, colors.green));
  
  } catch {
    throw new Error(OPERATION_FAILED);
  }
}