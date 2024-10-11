import { access, constants } from 'fs/promises';

export const isExistFile = async (path) => {
  const result = await access(path, constants.F_OK).then(() => true).catch(() => false);
  if (!result) {
    throw new Error(OPERATION_FAILED);
  }
}