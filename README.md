# bmaps

![product-screenshot](images/demo.gif)

## Introduction

该项目参考 [gmaps-example](https://github.com/tridium/gmaps-example)，展示了如何将百度地图 JavaScript API 通过 bajaux Web Widget 的形式集成到 Niagara 中。

## Original Author

胡耀辉 (Hans)

- Senior Software Engineer, Tridium AP
- [yaohui.hu@tridium.com](mailto:yaohui.hu@tridium.com)

## Contributors

任毅

- Software Engineer Intern, Tridium AP

## Getting Started

### Installation

1. apply for a [application key(ak)](http://lbsyun.baidu.com/apiconsole/key?application=key)
2. Clone the repo

```sh
git clone https://github.com/NiagaraDeveloperAlliance/bmaps.git
```

3. Build Gradle

4. Enter your ak in properties

## Usage

从 palette 里找到 bmaps 模块：

- 在该 Widget 的 View Binding 里配置好 NEQL 语句查找出所有打上 **m:geoCoord**(坐标string) 标签的点

- 点击地图上的配置好的点会弹出一个信息窗口：
  - 显示出该点下 SUMMARY 需用tags(m:title,m:imageSrc,m:description)
  - m:hyperlink 可用于配置title 的跳转(ord 或者 外部链接)
    - 外部链接需要'http://,https://'开头
  - 以及对应子节点的信息
    - 子节点需要配置 relation **from** parent **m:child**
  - 同时会订阅相应点的变化
- 搜索
  - 点击跳转
  - 根据 title 搜索，如果没有 title，根据 displayName
- 初始化
  - 点击 search box 旁的 x 将初始化地图并关闭所有 infowindow

### Properties

需要配置好下列三个参数才能看到百度地图：

- ak:
- position: 百度地图中心点坐标
- zoom: 默认缩放级别 15

可选配置：

- footprint: 启用后会在浏览器控制台打印出百度地图上鼠标点击处的百度坐标，默认未启用
- icon: 配置中心点坐标处的图标，类似`/ord/file:^tridium.png`
- show3D: if true (default) show 3d map
- showAlarmIcon, if true (default) widget will automatically subscribe all points that is related,
  this might slow performance if there are a lot of points. if false, user will not be able to see icon changes in the map, but subscriber will only subscribe corresponding points when the user clicks a marker 

## License

[Tridium Open Source License](LICENSE)

## Details

[Niagara与GIS系统的集成](<Integrate-Niagara-with-GIS.pdf>)

分享于 2019 Tridium 中国合作伙伴峰会开发培训