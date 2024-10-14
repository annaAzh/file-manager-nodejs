import readline from 'readline';
import { greetingUser } from './utils/args.js';
import {changeCurrentDir} from './utils/homeDir.js'
import {getCurrentWorkingDir} from './utils/currentDir.js';
import {controller} from './controller.js';
import { coloredOutput, colors } from './utils/coloredOutput.js';

const startFileMasnager = () => {

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  const userName = greetingUser();
  changeCurrentDir();

  
  rl.on('line', async (line) => {
      await controller(line);
      process.stdout.write(coloredOutput(`You are currently in ${getCurrentWorkingDir()}`, colors.yellow));
  });
  
  rl.on('SIGINT', () => {
    rl.close();
  })
  
  rl.on('close', () => {
    process.stdout.write(`Thank you for using File Manager, ${userName}, goodbye!\n`)
    process.exit(0);
  })

  process.on('exit', () => {
    rl.close();
  })
  
}



startFileMasnager();