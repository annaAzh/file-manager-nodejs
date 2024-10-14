import path, { dirname } from 'path';
import { resolve } from 'path';
import { getCurrentWorkingDir } from './currentDir.js';
import { getHomeDir } from './homeDir.js';

export const handlePath = (pathValue) => {

  pathValue = pathValue.trim();
  if (
    (pathValue.startsWith('"') && pathValue.endsWith('"')) ||
    (pathValue.startsWith("'") && pathValue.endsWith("'"))
  ) {
    pathValue = pathValue.slice(1, -1);
  }

  if (path.isAbsolute(pathValue)) {
    return pathValue;
  } else {
    return join(getCurrentWorkingDir(), pathValue);
  }
}


export const parsePath = (line) => {
  let path = line.trim();

  if (path.startsWith('--')) {
    return path;
  }

  if (path === '.' || path === './') {
    return getCurrentWorkingDir();
  }

  if (path === '..' || path === '../') {
    return dirname(getCurrentWorkingDir());
  }

  if (path.startsWith('"') && path.endsWith('"') || path.startsWith("'") && path.endsWith("'")) {
    path = path.slice(1, -1);
  } 

  if (path.startsWith('~')) {
    return getHomeDir();
  }

  if (path.startsWith('/') || path.startsWith('\\')) {
    return path;
  }

  if (path.startsWith('./') || path.startsWith('../') || path.startsWith('-') || path.startsWith('.')) {
    return resolve(getCurrentWorkingDir(), path);
  }

  return resolve(getCurrentWorkingDir(), path);
}