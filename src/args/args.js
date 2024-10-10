import {argv} from 'process';
import {DEFAULT_USER} from '../constants/constants.js';

export const greetingUser = () => {
  let username;

  argv.slice(2).forEach((arg) => {
    if (arg.startsWith('--username') && arg.split('=')[1]) {
      username = arg.split('=')[1];
      return;
    } else {
      username = DEFAULT_USER;
      return;
    }
  });
  process.stdout.write(`Welcome to the File Manager, ${username}!]\n`);
  return username;
};
