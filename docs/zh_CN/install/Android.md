# Android

## 目录

+   [1 Termux](#Termux)
    +   [1.1 直接安装 Octave](#直接安装_Octave)
    +   [1.2 通过某些 GNU/Linux 发行版](#通过某些_GNU/Linux_发行版)
+   [2 GNURoot Octave](#GNURoot_Octave)
+   [3 Google Play 中的 Octave 应用](#Google_Play_中的_Octave_应用)

## Termux

[Termux](https://termux.com) 是一个适用于 Android 的终端模拟器。您可以从 [F-Droid](https://f-droid.org/repository/browse/?fdid=com.termux)（推荐）或 [Play 商店](https://play.google.com/store/apps/details?id=com.termux)（已弃用）安装它。使用 Termux 和 Octave 不需要设备 root 权限。

### 直接安装 Octave

您可以通过 [its-pointless](https://github.com/its-pointless/gcc_termux) 的仓库直接在 Termux 中安装 Octave。

```shell
pkg install wget
wget https://its-pointless.github.io/setup-pointless-repo.sh
sh setup-pointless-repo.sh
pkg install octave
```

[OpenBLAS](https://www.openblas.net/) 会作为依赖项安装，此方法相比在 Termux 中运行 GNU/Linux 发行版内安装的 Octave 性能更佳。默认情况下，Octave 仅在终端中以 ASCII 字符绘图。

若需图形化绘图，请[安装](https://wiki.termux.com/wiki/Graphical_Environment#Desktop_environment_.28XFCE.29)如 xfce 的图形环境，并结合 vnc 服务器使用 Octave。目前已知仅 "gnuplot" 图形工具包在此方法中可用。

[![](https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Octave_in_Termux.png/330px-Octave_in_Termux.png)](File%253AOctave_in_Termux.png.html)

[](File%253AOctave_in_Termux.png.html "放大")

GNU Octave 直接运行于 Termux 中

### 通过某些 GNU/Linux 发行版

在 Android 的 Termux 中，您可以安装如 Debian、Ubuntu、Arch 或 Alpine 等 GNU/Linux 发行版。需要注意的是，Alpine 占用的磁盘空间相对较少。Octave 可通过发行版的包管理器按照[适用于 GNU/Linux 的 Octave](Octave_for_GNU/Linux.html "适用于 GNU/Linux 的 Octave")中的描述进行安装。

若需使用 Octave 的图形功能，需在 GNU/Linux 发行版中安装桌面环境和 VNC 服务器，并在 Android 手机上安装单独的 VNC 查看器应用（可从 Play 商店/F-Droid 安装）。在许多 Android 设备上，目前已知仅 "gnuplot" 图形工具包可用。多个应用（如 [Anlinux](https://github.com/EXALAB/AnLinux-App)、[Andronix](https://andronix.app/)）可帮助您轻松安装所需的 Linux 发行版并设置桌面环境。有关设置 VNC 服务器的概述，请参考 [Andronix 文档](https://docs.andronix.app/vnc/vnc-basics)。

**优化性能**：通过发行版的包管理器安装 [OpenBLAS](https://github.com/xianyi/OpenBLAS/wiki/Precompiled-installation-packages/) 替换系统的 BLAS 库，可能会显著提升 Octave 的性能。

## GNURoot Octave

Android 应用 [GNURoot Octave](https://play.google.com/store/apps/details?id=com.gnuroot.octave) 可在 Google Play 商店中找到，由 Corbin Champion 构建和维护。然而，请注意这些仓库已多年未更新。它并非 GNU Octave 项目的一部分。因此，请使用以下 GitHub 页面提交问题和错误报告：

+   [https://github.com/corbinlc/GNURootDebian](https://github.com/corbinlc/GNURootDebian)
+   [https://github.com/corbinlc/octave4android](https://github.com/corbinlc/octave4android)

该实现与 Octave 开发者密切合作完成，并在未进行重要更改的情况下使用了 Octave 源代码。因此，它与其他平台上的 Octave 版本完全兼容。

一些可能已过时的旧版 "octave4android" 应用的构建说明：

+   [https://lists.gnu.org/archive/html/octave-maintainers/2013-10/msg00406.html](https://lists.gnu.org/archive/html/octave-maintainers/2013-10/msg00406.html)

## Google Play 中的 Octave 应用

**与其他方法不同，此方法需要从 Google Play 购买一个应用（根据 GPL-3 发布）。**

由 Userland Technologies 构建和维护的 Octave 应用 [\[1\]](https://play.google.com/store/apps/details?id=tech.ula.octave) 可在 Google Play 商店中找到，它是一个功能齐全且专业支持的 GNU Octave，可在您的手机上运行。它基于 UserLAnd 平台运行，无需 root 您的设备。Userland Tech 已预安装 GNU Octave，因此用户可在手机上获得无缝的 "桌面" 体验。该应用是开源的，任何错误报告或问题可在其 GitHub 页面提交：[https://github.com/CypherpunkArmory/octave](https://github.com/CypherpunkArmory/octave)

[分类](Special%253ACategories.html "特殊:分类")：

+   [安装](Category%253AInstallation.html "分类:安装")