# SYNU 一键教务系统评价脚本

## 简介

该油猴（Tampermonkey）脚本专为 **SYNU（沈阳师范大学）** 的一键教务系统评价设计，用户可以通过此脚本自动填写评价内容并点击保存按钮。脚本将在页面上添加一个按钮，点击后自动完成以下操作：

1. 自动填写教务系统的评价表格（选择“良好”和“优秀”）。
2. 完成评价后，自动点击页面中的保存按钮，提交评价。

## 功能

- **自动填写评价内容**：根据规则，自动为每个选项填充“良好”或“优秀”。
- **自动提交**：在填写完成后，脚本会模拟点击保存按钮（`id="Button1"`），完成评价的提交。
- **自定义按钮**：脚本会在页面中添加一个按钮，点击后触发自动填写和保存操作。

## 安装步骤

### 1. 安装 Tampermonkey 扩展

首先，你需要安装 Tampermonkey 扩展，这是一个管理油猴脚本的浏览器插件。

- [Tampermonkey 官网](https://www.tampermonkey.net/) 下载安装适合你浏览器的版本。

### 2. 添加脚本

1. 在浏览器中打开 Tampermonkey 仪表盘（点击浏览器右上角的 Tampermonkey 图标，选择 "仪表盘"）。
2. 点击 "新建脚本" 按钮，进入脚本编辑器。
3. 将以下脚本粘贴到编辑器中：

```javascript
// ==UserScript==
// @name         SYNU 一键教务系统评价
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  自动填写教务系统评价并点击保存按钮
// @author       你的名字
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 确保脚本只在父页面中运行，避免在iframe中创建按钮
    if (window !== window.top) return; // 如果当前窗口是嵌套在iframe中，就直接退出

    // 检查按钮是否已经存在
    if (document.getElementById('myCustomButton')) return;

    // 创建按钮
    const button = document.createElement('button');
    button.id = 'myCustomButton';  // 给按钮添加一个唯一的id
    button.textContent = '执行操作';
    button.style.position = 'fixed';
    button.style.top = '10px';
    button.style.right = '10px';
    button.style.zIndex = '10000';
    button.style.backgroundColor = '#4CAF50';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.padding = '10px 20px';
    button.style.cursor = 'pointer';
    button.style.borderRadius = '5px';
    button.style.display = 'flex';
    button.style.alignItems = 'center';  // 垂直居中
    button.style.justifyContent = 'center';  // 水平居中
    button.style.fontSize = '16px';  // 调整字体大小

    // 将按钮添加到页面
    document.body.appendChild(button);

    // 按钮点击事件
    button.addEventListener('click', () => {
        try {
            // 操作iframe中的内容
            const iframe = document.getElementById("iframeautoheight");
            if (iframe && iframe.contentWindow) {
                const itable = iframe.contentWindow.document.getElementById("trPjs");
                const irows = itable.getElementsByTagName("select");
                for (let i = 0; i < irows.length; i++) {
                    if (i % 11 === 0) {
                        irows[i].value = "良好";
                    } else {
                        irows[i].value = "优秀";
                    }
                }

                // 找到并点击保存按钮（Button1）
                const button1 = iframe.contentWindow.document.getElementById('Button1');
                if (button1) {
                    button1.click();  // 模拟点击保存按钮
                } else {
                    console.error('未找到保存按钮');
                }
            } else {
                console.error('无法找到指定的iframe');
            }
        } catch (error) {
            console.error('执行过程中发生错误:', error);
        }
    });
})();
```

4. 保存脚本。

### 3. 启用脚本

确保脚本已经启用，并在你需要执行的教务系统页面上生效。你可以在 Tampermonkey 仪表盘中查看脚本是否处于启用状态。

## 使用说明

1. **运行脚本**：打开 **SYNU 教务系统评价页面**，脚本会在页面右上角生成一个名为 "执行操作" 的按钮。
2. **点击按钮**：点击该按钮后，脚本将自动：
   - 填充评价表格中的 `select` 元素，选项分别为“良好”和“优秀”。
   - 查找并点击 `id="Button1"` 的保存按钮，提交表单。

## 注意事项

- **iframe 兼容性**：请确保目标页面包含 `id="iframeautoheight"` 的 `iframe` 元素，并且 `iframe` 中有 `id="trPjs"` 的表格。脚本将基于这些元素来操作页面。
- **按钮不可见问题**：如果脚本未能找到 `Button1` 按钮，请确保该按钮存在并具有正确的 `id`。
- **动态加载页面**：如果目标页面是通过 JavaScript 动态加载内容的，脚本可能需要等页面加载完成后才能正确运行，可以通过延时执行或监听 DOM 变化来解决。

## 许可

该脚本是开源的，用户可以根据需要进行修改和分发。


### 说明：
- **功能简介**：简要描述脚本的功能，特别说明是针对 SYNU 教务系统评价的自动填写和提交脚本。
- **安装步骤**：为用户提供了详细的步骤，说明如何安装并启用脚本。
- **使用说明**：简要说明脚本的工作原理和如何使用自定义按钮触发操作。
- **注意事项**：提醒用户目标页面的结构要求，以及如何解决可能遇到的问题。
