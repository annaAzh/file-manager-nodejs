import os from 'os';
import { chdir } from 'process';
import {OPERATION_FAILED} from '../constants/constants.js';
import {getCurrentWorkingDir} from './currentDir.js';

export const getHomeDir = () => {
  return os.homedir();
}


export const changeCurrentDir = async() => {
  const homeDir = getHomeDir();
  try {
    chdir(homeDir);
    process.stdout.write(`You are currently in ${getCurrentWorkingDir()}\n`)
  } catch {
    throw new Error(OPERATION_FAILED);
  }
}