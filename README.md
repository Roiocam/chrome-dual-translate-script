# 谷歌网页翻译双语支持油猴脚本

让 Chrome 原生的网页翻译支持双语功能。

## 使用说明

1. Chrome 安装[油猴插件]('https://www.tampermonkey.net/') 或者谷歌[应用商店]('https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=zh-CN')
2. 添加新的脚本
3. 将 [script.js](./script.js) 的内容粘贴到编辑器中, 并保存
4. 启用该脚本
5. 打开任意外语网站, 右键翻译网页

## Feature

### 1. 正文换行双语

![正文](/img/content.png)

### 2. 超链接行内双语

![超链接](/img/link.png)

### 3. 单元素列表行内双语

![列表](/img/tab-single.png)

### 4. 多元素列表换行双语

![多元素列表](/img/tab-multiple.png)


## 网站匹配规则

- `doc.***.***/`  如 Akka 文档
- `docs.***.***/` 如 Spring 文档
- `****/documentation/` 如 Kafka 文档
- `***/***/docs/` 如 Flink 文档
- `***/docs/` 如 Lightbend 文档
- `***/*-doc/` 如 Tomcat 文档
- `*/guide` 如 ElasticSearch
- Stack Overflow
- Hacker News
- ...待补充

## 书签版（无需安装油猴）

将下面内容复制保存到书签, 在需要转换的网站上点击书签即可。

```url
javascript:(function()%7Bfor%20(const%20node%20of%20document.querySelectorAll('p'))%20%7B%0A%20%20%20%20const%20copy%20%3D%20document.createElement(node.nodeName)%3B%0A%20%20%20%20copy.textContent%20%3D%20node.textContent%3B%0A%20%20%20%20node.parentElement.insertBefore(copy%2C%20node.nextElementSibling)%3B%0A%20%20%20%20node.setAttribute('translate'%2C%20'no')%3B%0A%7D%7D)()%3B
```


## 参考原理

https://meta.appinn.net/t/topic/22432

