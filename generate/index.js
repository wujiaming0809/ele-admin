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
const { vueTemplate } = require('./template');
const { apiTemplate } = require('./api');
const { routerTemplate } = require('./router');

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

// 递归创建目录
const mkDirs = (directory, callback) => {
  const exists = fs.existsSync(directory);
  if (exists) {
    callback();
  } else {
    mkDirs(path.dirname(directory), () => {
      fs.mkdirSync(directory);
      callback();
    });
  }
};

const dotExistDirectoryCreate = directory => new Promise((resolve) => {
  mkDirs(directory, () => {
    resolve(true);
  });
});

log('请输入要生成的页面组件的名称，会放在 view/目录下');
let componentName = '';
process.stdin.on('data', async (chunk) => {
  // 组件名称
  const inputName = String(chunk).trim().toString();
  // 创建路径（文件夹）
  const componentPath = resolve('../src/views', inputName);
  const apiPath = resolve('../src/api', inputName);
  // 创建文件
  const vueFile = resolve(componentPath, 'index.vue');
  const apiFile = resolve(apiPath, `${inputName}.js`);
  const routerFile = resolve('../src/router', `${inputName}.js`);
  // 判断文件夹是否存在
  const hasComponentExists = fs.existsSync(componentPath);
  const hasApiExists = fs.existsSync(apiPath);
  const hasRouterExists = fs.existsSync(routerFile);
  if (hasComponentExists) {
    errorLog(`${inputName} - vue文件已存在，请重新输入`);
  } else if (hasApiExists) {
    errorLog(`${inputName} - api文件已存在，请重新输入`);
  } else if (hasRouterExists) {
    errorLog(`${inputName} - router文件已存在，请重新输入`);
  } else {
    log(`正在生成组件目录${componentPath}`);
    log(`正在生成api目录${apiPath}`);
    await dotExistDirectoryCreate(componentPath);
    await dotExistDirectoryCreate(apiPath);
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
    log(`正在生成 api 文件 ${apiFile}`);
    await generateFile(apiFile, apiTemplate(componentName));
    log(`正在生成 路由 文件 ${routerFile}`);
    await generateFile(routerFile, routerTemplate(componentName));
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
