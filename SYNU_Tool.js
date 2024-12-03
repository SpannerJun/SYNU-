// ==UserScript==
// @name         自定义按钮脚本
// @namespace    https://210-30-208-200.webvpn.synu.edu.cn/
// @version      1.0
// @description  在页面上添加一个按钮，执行特定操作
// @author       SpannerJun
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
    button.style.top = '95px';
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
