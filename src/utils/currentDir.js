import {cwd} from 'process';

export const getCurrentWorkingDir = () => {
  return cwd();
}