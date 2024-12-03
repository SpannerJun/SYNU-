# 自定义按钮脚本

## 简介

这个油猴（Tampermonkey）脚本允许用户在指定网页上添加一个自定义按钮。当点击该按钮时，脚本将执行以下操作：
1. 修改嵌套在 `iframe` 中的表单元素的值。
2. 查找并自动点击页面中的保存按钮（`Button1`）。

该脚本特别适用于需要自动化操作的网页，例如批量修改表单内容并提交。

## 功能

- **自动填充表单内容**：根据一定的规则（如每11个 `select` 元素设置为不同的值），自动修改页面中的表单选项。
- **自动提交表单**：执行完上述操作后，脚本会自动点击保存按钮（`id="Button1"`）以提交表单。
- **自定义按钮**：脚本会在页面上添加一个固定位置的按钮，点击该按钮时触发以上操作。

## 安装步骤

### 1. 安装 Tampermonkey 扩展

首先，你需要安装 Tampermonkey 扩展，这是一款流行的浏览器插件，用于管理和运行油猴脚本。

- [Tampermonkey 官网](https://www.tampermonkey.net/) 下载安装适用于你浏览器的版本。

### 2. 创建并添加脚本

1. 在浏览器中打开 Tampermonkey 仪表盘（点击浏览器右上角的 Tampermonkey 图标，选择 "仪表盘"）。
2. 点击 "新建脚本" 按钮，进入编辑器。
3. 将以下脚本粘贴到编辑器中：

```javascript
// ==UserScript==
// @name         自定义按钮脚本
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  在页面上添加一个按钮，执行特定操作并点击保存按钮
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

4. 点击保存按钮。

### 3. 启用脚本

确保脚本已经启用，并且在你需要执行的页面上生效。你可以在 Tampermonkey 仪表盘查看脚本是否处于启用状态。

## 使用说明

1. **运行脚本**：进入你需要操作的页面，脚本会在页面右上角生成一个名为 "执行操作" 的按钮。
2. **点击按钮**：点击该按钮后，脚本将：
   - 更新页面中的 `select` 元素的选项。
   - 查找并点击 `id="Button1"` 的保存按钮，提交表单。

## 注意事项

- **iframe 兼容性**：确保目标页面包含一个 `id="iframeautoheight"` 的 `iframe` 元素，且该 `iframe` 内部有 `id="trPjs"` 的表格，脚本将基于这些元素来操作页面。
- **按钮不可见问题**：如果脚本无法找到保存按钮（`Button1`），请确保目标页面中存在该按钮并具有正确的 `id`。
- **动态加载页面**：如果目标页面通过 JavaScript 动态加载内容，可能需要在页面完全加载后运行脚本，可以通过延时执行或观察 DOM 变化来解决。

## 许可

这个脚本是开源的，可以根据需要进行修改和分发。

### 说明：
- **功能简介**：简要描述脚本的功能，包括它执行的操作。
- **安装步骤**：提供了如何安装和配置 Tampermonkey 扩展并添加脚本的详细步骤。
- **使用说明**：简要说明如何使用脚本和点击按钮。
- **注意事项**：提醒用户需要确保网页结构和元素的存在，以确保脚本的正常运行。
