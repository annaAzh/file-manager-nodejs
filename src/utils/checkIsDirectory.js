import { access, constants, lstat } from 'fs/promises';

export const isExistDirectory = async (path) => {
  try {
    await access(path, constants.R_OK);
    const stats = await lstat(path);
    return stats.isDirectory();
  } catch {
    return false;
  }
}