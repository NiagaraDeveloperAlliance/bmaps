# bmaps

## Introduction

该项目参考 [gmaps-example](https://github.com/tridium/gmaps-example)，展示了如何将百度地图 JavaScript API 通过 bajaux Web Widget 的形式集成到 Niagara 中。

## Author

胡耀辉 (Hans)

- Senior Software Engineer, Tridium AP
- [yaohui.hu@tridium.com](mailto:yaohui.hu@tridium.com)

## Overview

从 palette 里找到 bmaps 模块：

* 在该 Widget 的 View Binding 里配置好 NEQL 语句查找出所有打上 **n:geoCoord** 标签的点
* 如果该点处于报警状态，那么相应的会显示出报警图标
* 点击地图上的配置好的点会弹出一个信息窗口：
  * 显示出该点下所有标记为 SUMMARY 的 slot
  * 同时会订阅相应点的变化
  * 点击窗口上链接会转向该点

## Properties

需要配置好下列三个参数才能看到百度地图：

* ak: 在使用前，需要先从百度地图开发平台申请密钥 [ak](http://lbsyun.baidu.com/apiconsole/key?application=key)
* position: 百度地图中心点坐标
* zoom: 默认缩放级别15

可选配置：

* footprint: 启用后会在浏览器控制台打印出百度地图上鼠标点击处的百度坐标，默认未启用
* icon: 配置中心点坐标处的图标，类似`/ord/file:^tridium.png`

## License

[Tridium Open Source License](LICENSE)

## Details

[Niagara与GIS系统的集成](<Integrate-Niagara-with-GIS.pdf>)

分享于 2019 Tridium 中国合作伙伴峰会开发培训