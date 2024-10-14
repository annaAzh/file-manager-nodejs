import os from 'os';
import { chdir } from 'process';
import {OPERATION_FAILED} from '../constants/constants.js';
import {getCurrentWorkingDir} from './currentDir.js';
import {parse} from 'path';
import { coloredOutput, colors } from './coloredOutput.js';

export const getHomeDir = () => {
  return os.homedir();
}

export const getRootDirectory = () => {
  return parse(process.cwd()).root;
}


export const changeCurrentDir = async() => {
  const homeDir = getHomeDir();
  try {
    chdir(homeDir);
    process.stdout.write(coloredOutput(`You are currently in ${getCurrentWorkingDir()}`, colors.yellow))
  } catch {
    throw new Error(OPERATION_FAILED);
  }
}