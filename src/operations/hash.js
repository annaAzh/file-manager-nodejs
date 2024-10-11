import {resolve} from 'path';
import {createHash} from 'crypto';
import {createReadStream} from 'fs';
import { OPERATION_FAILED } from "../constants/constants.js";
import { isExistFile } from "../utils/checkisExistFile.js";

export const operationHash = async (pathToFile) => {
  try {
    const resolvedPath = resolve(pathToFile);
    await isExistFile(resolvedPath);

    const hash = createHash('sha256');
    const stream = createReadStream(resolvedPath);

    stream.on('data', (data) => {
        hash.update(data);
    });
    
    stream.on('end', () => {
        console.log(hash.digest('hex'));
    });

  } catch {
    throw new Error(OPERATION_FAILED);
  }
}