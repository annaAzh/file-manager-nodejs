import {createBrotliCompress, createBrotliDecompress} from 'zlib';
import { OPERATION_FAILED } from '../constants/constants.js';
import { resolve, basename } from 'path';
import { isExistFile } from '../utils/checkisExistFile.js';
import { isExistDirectory } from '../utils/checkIsDirectory.js';
import { promisify } from 'util';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream';
import { coloredOutput, colors } from '../utils/coloredOutput.js';

const promisifiedPipeline = promisify(pipeline);
const COMPRESS_EXTENSION = '.br';

export const compressFile = async(pathToFile, pathToDestination, flag = 'compress') => {
  try {
    const resolvedPathFrom = resolve(pathToFile);
    await isExistFile(resolvedPathFrom);

    const compressedFileName = basename(resolvedPathFrom) + COMPRESS_EXTENSION;
    const decompessedFileName = basename(resolvedPathFrom, COMPRESS_EXTENSION);

    const fileName = flag === 'compress' ? compressedFileName: decompessedFileName;

    const resolvedPathTo = resolve(pathToDestination);
    await isExistDirectory(resolvedPathTo);

    const compressionOperation = flag === 'compress' ? createBrotliCompress() : createBrotliDecompress();

    const readStream = createReadStream(resolvedPathFrom);
    const writeStream = createWriteStream(resolve(resolvedPathTo, fileName));

    await promisifiedPipeline(readStream, compressionOperation, writeStream);
    process.stdout.write(coloredOutput(`File was ${flag}ed`, colors.green));
  } catch (error) {
    throw new Error(OPERATION_FAILED);
  }
}