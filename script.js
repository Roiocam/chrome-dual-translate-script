// ==UserScript==
// @name         技术文档双语翻译
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  让谷歌浏览器原生翻译支持双语显示.只会匹配 docs 的结果
// @author       AndyChen
// @include      /^(http(s)?:\/\/)(doc(s)?).*$/
// @match        *://*/documentation/*
// @match        *://*/*/docs/*
// @match        *://*/docs/*
// @match        *://*/*-doc/*
// @match        *://stackoverflow.com/*
// @match        *://news.ycombinator.com/*
// @icon         https://www.google.com/s2/favicons?domain=appinn.net
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    const liChild = ['#text', 'SPAN', 'EM', 'FONT', 'STRONG', 'CODE'];
    // 开发者文档正文支持双语
    for (const node of document.querySelectorAll('p')) {
        const copy = document.createElement(node.nodeName);
        copy.textContent = node.textContent;
        copy.style.opacity = 0.74;
        node.parentElement.insertBefore(copy, node.nextElementSibling);
        node.setAttribute('translate', 'no');
    }
    // 对于链接, 则使用行内元素双语, 适合目录结构
    for (const node of document.querySelectorAll('a')) {
        const content = node.textContent;
        const copy = document.createElement('FONT');
        copy.textContent = ' ' + node.textContent;
        copy.setAttribute('translate', 'yes');
        copy.style.opacity = 0.74;
        node.append(copy);
        node.setAttribute('translate', 'no');
    }
    // 对于标签, 以两种方式区分
    for (const node of document.querySelectorAll('li')) {
        const firstChild = node.childNodes[0];
        // 对于只有一个元素的列表元素, 则为行内双语
        if (node.childNodes.length == 1) {
            if (firstChild.nodeType === Node.TEXT_NODE) {
                const content = node.textContent;
                const copy = document.createElement('FONT');
                copy.textContent = ' ' + node.textContent;
                copy.setAttribute('translate', 'yes');
                copy.style.opacity = 0.74;
                node.append(copy);
                node.setAttribute('translate', 'no');
            } else if (firstChild.nodeName == 'A') {
                // 对于一个元素的超链接，不处理。
            } else if (firstChild.nodeName == 'UL') {
                // 对于一个元素的其他属性，也不处理
             } 
        } else {
            // 对于多个元素, 判断是否为文字类型, 如果是, 添加类似 p 标签的处理
            var flag = true;
            for (const childNode of node.childNodes) {
                if (!liChild.includes(childNode.nodeName)) {
                    flag = false;
                }
            }
            if (flag) {
                const copy = document.createElement(node.nodeName);
                copy.textContent = node.textContent;
                copy.style.opacity = 0.74;
                node.parentElement.insertBefore(copy, node.nextElementSibling);
                node.setAttribute('translate', 'no');
            }
        }

    }
    // 不翻译代码, 如 Netty
    for (const node of document.querySelectorAll('pre')) {
        node.setAttribute('translate', 'no');
    }
})();