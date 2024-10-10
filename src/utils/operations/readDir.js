import { readdir } from 'fs/promises';
import { OPERATION_FAILED } from '../../constants/constants.js';

export const readDir = async (pathToDir) => {

const directories = [];
const filesArr = [];
    try {
        const files = await readdir(pathToDir, { withFileTypes: true });
        files.forEach((file) => {
          if (file.isDirectory()) {
            const element = {name: file.name, type: 'directory'};
            directories.push(element);
          } else {
            const element = {name: file.name, type: 'file'};
            filesArr.push(element);
          }
        });

        const sortedDirectories = directories.sort((a, b) => a.name.localeCompare(b.name));
        const sortedFiles = filesArr.sort((a, b) => a.name.localeCompare(b.name));

        const sortedResult = [...sortedDirectories, ...sortedFiles];
        console.table(sortedResult);
    } catch {
        throw new Error(OPERATION_FAILED);
    }
};
