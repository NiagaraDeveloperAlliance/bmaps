[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]

<!-- [![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url] -->

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <!-- <a href="https://github.com/yiren1/bmaps">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

  <h3 align="center">bmaps Niagara Widget</h3>

  <p align="center">
    <br />
    <a href="https://github.com/yiren1/bmaps"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/YIREN1/bmaps/about-the-project">View Demo</a>
    ·
    <a href="https://github.com/yiren1/bmaps/issues">Report Bug</a>
    ·
    <a href="https://github.com/yiren1/bmaps/issues">Request Feature</a>
  </p>
</p>

## About The Project

[![Product Name Screen Shot][product-screenshot]]()

该项目参考 [gmaps-example](https://github.com/tridium/gmaps-example)，展示了如何将百度地图 JavaScript API 通过 bajaux Web Widget 的形式集成到 Niagara 中。

### Built With

- [bootstrap](https://getbootstrap.com)
- requirejs
- listjs
- baidu maps
- bajascript
- bajaux

<!-- GETTING STARTED -->

## Getting Started

### Installation

1. apply for a [application key(ak)](http://lbsyun.baidu.com/apiconsole/key?application=key)
2. Clone the repo

```sh
git clone https://github.com/yiren1/bmaps.git
```

3. Build Gradle

4. Enter your ak in properties

## Usage

从 palette 里找到 bmaps 模块：

- 在该 Widget 的 View Binding 里配置好 NEQL 语句查找出所有打上 **m:geoCoord**(坐标string) 标签的点

- 点击地图上的配置好的点会弹出一个信息窗口：
  - 显示出该点下 SUMMARY 需用tags(m:title,m:imageSrc,m:description)
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

## Original Author

胡耀辉 (Hans)

- Senior Software Engineer, Tridium AP
- [yaohui.hu@tridium.com](mailto:yaohui.hu@tridium.com)

## Contributors

任毅

- Software Engineer Intern, Tridium AP

## License

[Tridium Open Source License](LICENSE)

## Details

[Niagara 与 GIS 系统的集成](Integrate-Niagara-with-GIS.pdf)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/yiren1/bmaps.svg?style=flat-square
[contributors-url]: https://github.com/yiren1/bmaps/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/yiren1/bmaps.svg?style=flat-square
[forks-url]: https://github.com/yiren1/bmaps/network/members

<!-- [stars-shield]:
[stars-url]:
[issues-shield]:
[issues-url]:
[license-shield]:
[license-url]:
[linkedin-url]:  -->

[product-screenshot]: images/demo.gif
