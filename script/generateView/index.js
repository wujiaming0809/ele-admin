/**
 * Created by wujiaming on 2020/3/13
 * */

const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

const resolve = (...file) => path.resolve(__dirname, ...file);
const log = message => console.log(chalk.green(`${message}`));
const successLog = message => console.log(chalk.blue(`${message}`));
const errorLog = error => console.log(chalk.red(`${error}`));

// 导入模板
const { vueTemplate, entryTemplate } = require('./template');

// 生成文件
const generateFile = (path, data) => {
  if (fs.existsSync(path)) {
    errorLog(`${path}文件已存在`);
    return false;
  }
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, 'utf-8', (err) => {
      if (err) {
        errorLog(err.message);
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};

log('请输入要生成的页面组件的名称，会放在 view/目录下');
let componentName = '';
process.stdin.on('data', async (chunk) => {
  // 组件名称
  const inputName = String(chunk).trim().toString();
  // Vue页面组件路径
  const componentPath = resolve('../../src/views', inputName);
  // vue文件
  const vueFile = resolve(componentPath, 'index.vue');
  // 入口文件
  const entryFile = resolve(componentPath, 'entry.js');
  // 判断组件文件夹是否存在
  const hasComponentExists = fs.existsSync(componentPath);
  if (hasComponentExists) {
    errorLog(`${inputName}页面组件已存在，请重新输入`);
  } else {
    log(`正在生成component目录${componentPath}`);
    await dotExistDirectoryCreate(componentPath);
  }
  try {
    // 获取组件名
    if (inputName.includes('/')) {
      const inputArr = inputName.split('/');
      componentName = inputArr[inputArr.length - 1];
    } else {
      componentName = inputName;
    }
    log(`正在生成vue文件${vueFile}`);
    await generateFile(vueFile, vueTemplate(componentName));
    log(`正在生成 entry 文件 ${entryFile}`);
    await generateFile(entryFile, entryTemplate(componentName));
    successLog('生成成功');
  } catch (e) {
    errorLog(e.message);
  }
  process.stdin.emit('end');
});
process.stdin.on('end', () => {
  log('exit');
  process.exit();
});

const dotExistDirectoryCreate = directory => new Promise((resolve) => {
  mkdirs(directory, () => {
    resolve(true);
  });
});
// 递归创建目录
const mkdirs = (directory, callback) => {
  const exists = fs.existsSync(directory);
  if (exists) {
    callback();
  } else {
    mkdirs(path.dirname(directory), () => {
      fs.mkdirSync(directory);
      callback();
    });
  }
};
