import {createReadStream} from 'fs';
import { OPERATION_FAILED } from '../constants/constants.js';
import { isExistFile } from '../utils/checkisExistFile.js';
import { resolve } from 'path';


export const catOperation = async (pathToFile) => {
  try {
    const resolvedPath = resolve(pathToFile);
    await isExistFile(resolvedPath);

    const readStream = createReadStream(resolve(pathToFile));
    const writeStream = process.stdout;
    readStream.pipe(writeStream);
    
    readStream.on('end', () => {
      process.stdout.write('\n');
    })

  } catch {
    throw new Error(OPERATION_FAILED);
  }
}