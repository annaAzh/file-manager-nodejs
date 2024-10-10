import readline from 'readline';
import { greetingUser } from './args/args.js';
import {changeCurrentDir} from './utils/homeDir.js'
import {getCurrentWorkingDir} from './utils/currentDir.js'

const startFileMasnager = () => {

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  const userName = greetingUser();
  changeCurrentDir();

  
  rl.on('line', (line) => {
    if (line.trim() === '.exit') {
      rl.close();
    } else {
      process.stdout.write(`You are currently in ${getCurrentWorkingDir()}\n`)
    }
  });
  
  rl.on('SIGINT', () => {
    rl.close();
  })
  
  rl.on('close', () => {
    process.stdout.write(`Thank you for using File Manager, ${userName}, goodbye!\n`)
    process.exit(0);
  })
  
}



startFileMasnager();