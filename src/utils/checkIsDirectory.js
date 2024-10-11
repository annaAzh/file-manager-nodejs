import { access, constants } from 'fs/promises';

export const isExistDirectory = async (path) => {
  return await access(path, constants.R_OK).then(() => true).catch(() => false);
}