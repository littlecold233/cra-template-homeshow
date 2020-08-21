# Homeshow TypeScript Cra Template

## 定制主题

在使用颜色、边距等变量时，推荐用`useTheme`、`styled-component`两种方式，使用主题中的 token，有利于切换主题的功能的实现

修改 `src/layout/theme.ts` 可以定制当前的默认主题

## 定制项目配置

修改项目中的`config-overrides.js`文件，可以在不eject项目的情况下，修改webpack等配置

详情可以参考 [https://github.com/timarney/react-app-rewired](https://github.com/timarney/react-app-rewired)

## 修改alias

只需要修改`tsconfig.paths.json`里的`paths`内容，即可更改ts和webpack两者的alias配置，非常方便

## SVG图标使用

### 使用图标

项目中的SVG图标是以React组件的形式提供的

```jsx
import { YourIcon } from '@/icons';
<YourIcon fontSize={12} />
```

### 更新图标

找到`package.json`下的`iconfont`字段，更新`cdnUrl`字段，然后执行`yarn icons`命令

`cdnUrl`需要从你的iconfont的项目获取，进入项目中先选择`Symbol`，然后点击**展开在线链接**，复制即可

![iconfont](https://qhstaticssl.kujiale.com/newt/29/image/png/1597985006026/C2CD00EB0E71C2F03294AFAFC8A3599A.png)

## 本地开发

### `yarn start`

启动本地服务

### `yarn build`

构建生产环境的代码

如果构建后希望预览生产环境页面，可以执行以下命令

```sh
yarn build:serve
```
