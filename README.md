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
    An awesome README template to jumpstart your projects!
    <br />
    <a href="https://github.com/yiren1/bmaps"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/yiren1/bmaps">View Demo</a>
    ·
    <a href="https://github.com/yiren1/bmaps/issues">Report Bug</a>
    ·
    <a href="https://github.com/yiren1/bmaps/issues">Request Feature</a>
  </p>
</p>

## About The Project

[![Product Name Screen Shot][product-screenshot]](images/screenshot.png)

该项目参考 [gmaps-example](https://github.com/tridium/gmaps-example)，展示了如何将百度地图 JavaScript API 通过 bajaux Web Widget 的形式集成到 Niagara 中。

### Built With

This section should list any major frameworks that you built your project using. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

- [bootstrap](https://getbootstrap.com)
- [bajascript](https://jquery.com)
- [bajaux](https://laravel.com)

<!-- GETTING STARTED -->

## Getting Started

### Installation

1. 在使用前，需要先从百度地图开发平台申请密钥 [application key(ak)](http://lbsyun.baidu.com/apiconsole/key?application=key)
2. Clone the repo

```sh
git clone https://github.com/yiren1/bmaps.git
```

3. Build Gradle

4. Enter your API in properties

## Usage

从 palette 里找到 bmaps 模块：

- 在该 Widget 的 View Binding 里配置好 NEQL 语句查找出所有打上 **m:geoCoord** 标签的点
- infoWindow 会显示该点的信息以及该点子节点的信息
- 点击地图上的配置好的点会弹出一个信息窗口：
  - 显示出该点下所有标记为 SUMMARY 的 slot
  - 同时会订阅相应点的变化
  - 点击窗口上链接会转向该点

### Properties

需要配置好下列三个参数才能看到百度地图：

- ak:
- position: 百度地图中心点坐标
- zoom: 默认缩放级别 15

可选配置：

- footprint: 启用后会在浏览器控制台打印出百度地图上鼠标点击处的百度坐标，默认未启用
- icon: 配置中心点坐标处的图标，类似`/ord/file:^tridium.png`
- show3D: if true show 3d map
- alwaysSubscribeAllPoints, if true widget will automatically subscribe all points that is related,
  this might slow performance if there are a lot of points. If false, after user close any info window, widget will unsubscribeAll since we do not need to watch any changes after the window is closed. This is useful if the user want to see the icon change when alarm status is changed for any child component

## Original Author

胡耀辉 (Hans)

- Senior Software Engineer, Tridium AP
- [yaohui.hu@tridium.com](mailto:yaohui.hu@tridium.com)

## Contributors

任毅

- software engineer intern, Tridium AP

## License

[Tridium Open Source License](LICENSE)

## Details

[Niagara 与 GIS 系统的集成](Integrate-Niagara-with-GIS.pdf)

分享于 2019 Tridium 中国合作伙伴峰会开发培训

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/yiren1/bmaps.svg?style=flat-square
[contributors-url]: https://github.com/yiren1/bmaps/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/yiren1/bmaps.svg?style=flat-square
[forks-url]: https://github.com/yiren1/bmaps/graphs/forks

<!-- [stars-shield]:
[stars-url]:
[issues-shield]:
[issues-url]:
[license-shield]:
[license-url]:
[linkedin-url]:  -->

[product-screenshot]: images/screenshot.png
