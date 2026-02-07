# 持续构建

GNU Octave 使用 [Buildbot](https://buildbot.net/) 在多个系统上以多种不同配置构建和测试当前的开发版本。

![信息图标](../../assets/info/26px-Info_icon.svg.png)

当前的构建状态可通过 [https://buildbot.octave.org/#/waterfall](https://buildbot.octave.org/#/waterfall) 查看。

## 目录

+   [1 系统与配置](#系统与配置)
+   [2 设置并运行 Buildbot 工作节点](#设置并运行-buildbot-工作节点)
    +   [2.1 ccache](#ccache)
    +   [2.2 空间要求](#空间要求)
+   [3 面向 Linux 的 Octave 持续部署](#面向-linux-的-octave-持续部署)
    +   [3.1 Octave Snap 应用的 Edge 频道](#octave-snap-应用的-edge-频道)
+   [4 面向 Windows 的 Octave 持续部署](#面向-windows-的-octave-持续部署)
    +   [4.1 新鲜构建的 Octave](#新鲜构建的-octave)
    +   [4.2 GitHub 构建产物](#github-构建产物)
+   [5 外部链接](#外部链接)

# 系统与配置

当前 Octave 构建涵盖以下系统和配置：

| 构建器 ID | Hg 版本 | 系统 | 编译器 | 构建选项 | 触发频率 |
| --- | --- | --- | --- | --- | --- |
| clang-4.0-debian | default | Debian Testing | Clang 4.0 | | 任何更改 |
| stable-clang-4.0-debian | stable | Debian Testing | Clang 4.0 | | 任何更改 |
| clang-5.0-debian | default | Debian Testing | Clang 5.0 | | 任何更改 |
| stable-clang-5.0-debian | stable | Debian Testing | Clang 5.0 | | 任何更改 |
| clang-fedora | default | Fedora (当前发行版) | Clang (系统默认) | | 任何更改 |
| stable-clang-fedora | stable | Fedora (当前发行版) | Clang (系统默认) | | 任何更改 |
| clang-osx (当前未激活) | default | OS X | Clang | | 任何更改 |
| gcc-7-debian | default | Debian Testing | GCC 7 | | 任何更改 |
| gcc-7-lto-debian | default | Debian Testing | GCC 7 | 启用链接时优化 | 任何更改 |
| gcc-fedora | default | Fedora (当前发行版) | GCC (系统默认) | | 任何更改 |
| gcc-lto-fedora | default | Fedora (当前发行版) | GCC (系统默认) | 启用链接时优化 | 任何更改 |
| no-extras-debian | default | Debian Testing | GCC (系统默认) | 禁用所有可选依赖项 | 任何更改 |
| stable-no-extras-debian | stable | Debian Testing | GCC (系统默认) | 禁用所有可选依赖项 | 任何更改 |

以及针对 mxe-octave 的构建：

| 构建器 ID | Hg 版本 | 构建系统 | 目标系统 | 编译器 | 构建选项 | 触发频率 |
| --- | --- | --- | --- | --- | --- | --- |
| mxe-native-all-on-debian | default | Debian Testing | Debian | GCC (mxe-octave 默认) | GNU Linux，构建所有依赖项 | 每日 |
| mxe-native-on-debian | default | Debian Testing | Debian | GCC (系统默认) | GNU Linux，使用系统编译器、fontconfig 和 X11 库 | 每日 |
| w32-on-debian | default | Debian Testing | Windows | GCC (mxe-octave 默认) | Windows 32 位 | 每日 |
| w32-stable-on-debian | stable | Debian Testing | Windows | GCC (mxe-octave 默认) | Windows 32 位 | 每日 |
| w32-release-on-debian | release (源码包) | Debian Testing | Windows | GCC (mxe-octave 默认) | Windows 32 位 | 每日 |
| w64-32-on-debian | default | Debian Testing | Windows | GCC (mxe-octave 默认) | Windows 64 位 | 每日 |
| w64-32-stable-on-debian | stable | Debian Testing | Windows | GCC (mxe-octave 默认) | Windows 64 位 | 每日 |
| w64-32-release-on-debian | release (源码包) | Debian Testing | Windows | GCC (mxe-octave 默认) | Windows 64 位 | 每日 |
| w64-64-on-debian | default | Debian Testing | Windows | GCC (mxe-octave 默认) | Windows 64 位，64 位索引 | 每日 |
| w64-64-stable-on-debian | stable | Debian Testing | Windows | GCC (mxe-octave 默认) | Windows 64 位，64 位索引 | 每日 |
| w64-64-release-on-debian | release (源码包) | Debian Testing | Windows | GCC (mxe-octave 默认) | Windows 64 位，64 位索引 | 每日 |

# 设置并运行 Buildbot 工作节点

您的系统可能位于防火墙后，并且不需要拥有独立的公网 IP 地址。

为了支持 Octave 开发并运行一个 Buildbot 工作节点，您需要执行以下操作：

+   联系 [Discourse 上的 Octave 维护者](https://octave.discourse.group/c/maintainers/7)，告知我们您希望提供一个系统用作 Buildbot 工作节点。我们将为您提供一个 `WORKERNAME` 和一个用于配置您的 Buildbot 工作节点的 **密钥** `PASSWORD`。
+   安装 buildbot。大多数发行版都有对应的软件包。其他安装选项请参阅 buildbot 文档。您应该创建一个没有特殊权限的单独用户账户来运行 buildbot。
+   确定一个 `BASEDIR`。例如，如果 buildbot 用户的主目录是 /var/lib/buildbot，且您的 `WORKERNAME` 被设置为 `'debian-x86_64'`，那么 `BASEDIR` 可以是 /var/lib/buildbot/worker/debian-x86\_64。
+   `MASTERHOST` 是 `buildbot.octave.org`，`PORT` 是 `9989`。
+   创建配置
    
    ```bash
    buildbot-worker create-worker BASEDIR MASTERHOST:PORT WORKERNAME PASSWORD
    ```
    
+   在工作节点系统上运行 buildbot，最好在系统启动时自动启动。它应该使用 buildbot 用户身份运行。
    
    ```bash
    buildbot-worker start BASEDIR
    ```
    

## ccache

您可能还想设置 **ccache** 以便与 buildbot 一起工作（强烈建议以加快构建速度）。如果您创建目录 ~/buildbot/bin，当 Buildbot 主服务器在 Buildbot 工作节点上执行命令时，该目录会被添加到执行路径 PATH 中。此目录可以包含类似以下符号链接：

```bash
cc       -> /usr/bin/ccache
c++      -> /usr/bin/ccache
gcc      -> /usr/bin/ccache
gfortran -> /usr/bin/ccache
```

如果 ccache 的实际位置不在 /usr/bin，则应指向其实际路径。

## 空间要求

构建 Octave 需要大量的磁盘空间。包含调试符号时，每次构建可能需要数 GB 的空间，如果使用 ccache，可能还需要额外的空间（可能 50GB）。如果您使用的缓存大小大于默认值，则需要在 .ccache/ccache.conf 文件中通过如下行指定：

```bash
max_size = 50G
```

如果包含构建目录和 ccache 目录的分区空间不足，那么可以设置这些目录指向拥有足够可用空间的单独分区。

# 面向 Linux 的 Octave 持续部署

## Octave Snap 应用的 Edge 频道

Octave Snap 应用的 "edge" 频道是基于 Octave 稳定分支的当前版本构建的。这意味着它包含了可能包含在下一个 Octave 次要版本中的更改。

可以从 [Snap Store](https://snapcraft.io/octave) 下载，并从下拉菜单中选择 "latest/edge"。

# 面向 Windows 的 Octave 持续部署

## 新鲜构建的 Octave

可通过 [nightly.octave.org](https://nightly.octave.org/#/download) 获取 Windows 版 Octave 的未发布版本。这些是使用 MXE Octave 构建的安装程序，构建方式与 "官方" Windows 版 Octave 非常相似。它们可以像 "官方" 的 Windows 版 Octave 一样安装。

可用的变体包括从 MXE Octave 的发布分支构建的 Windows 64 位版本（包含 32 位或 64 位 Fortran 索引大小）。此外，还有一个变体是从 MXE Octave 的默认分支构建的（依赖项更前沿）。

所有这些版本都是从 Octave 的稳定分支构建的。这意味着它们包含了可能包含在下一个 Octave 次要版本中的更改。

未发布版本可能比已发布版本更不稳定，但也可能包含尚未发布版本的错误修复。

## GitHub 构建产物

MINGW64 版本的 Octave 构建产物可从 GitHub 上的 Octave 镜像仓库的持续集成（CI）运行中获取。可以从 Octave 默认分支构建的 [工作流日志](https://github.com/gnu-octave/octave/actions) 底部下载这些产物。下载构建产物后，将 `.zip` 文件解压到一个空文件夹（例如 `C:\Octave\test`）。

Octave 的默认分支包含了可能包含在下一个 Octave 主要版本中的更改。默认分支上的 Octave 部分功能可能存在问题，但它很可能包含尚未包含在最新发布版本中的新功能。

这些产物是使用 MSYS2 构建的。因此，必须安装 MSYS2 才能运行该产物。MSYS2 可从其 [官方网站](https://www.msys2.org/) 下载。安装 MSYS2 后，打开一个 MINGW64 终端（蓝色图标），更新 MSYS2 并安装必要的依赖项（第二条命令必须在一行内执行）：

```bash
 pacman -Syu
 pacman -S --needed mingw-w64-x86_64-gcc-libgfortran mingw-w64-x86_64-arpack mingw-w64-x86_64-curl mingw-w64-x86_64-fftw mingw-w64-x86_64-fltk mingw-w64-x86_64-ghostscript mingw-w64-x86_64-gl2ps mingw-w64-x86_64-glpk mingw-w64-x86_64-gnuplot mingw-w64-x86_64-graphicsmagick mingw-w64-x86_64-hdf5 mingw-w64-x86_64-libsndfile mingw-w64-x86_64-portaudio mingw-w64-x86_64-qhull mingw-w64-x86_64-qrupdate mingw-w64-x86_64-qscintilla mingw-w64-x86_64-qt5-tools mingw-w64-x86_64-sundials mingw-w64-x86_64-suitesparse
```

之后，使用 `cd` 命令切换到包含已解压的 `.zip` 文件内容的目录。（应该是一个名为 `octave.tar.gz` 的单独文件。）以上面的示例文件夹为例，命令如下：

```bash
 cd /c/Octave/test
```

解压 tarball 并将 `bin` 目录添加到系统搜索路径 PATH 中：

```bash
 tar -xvzf octave.tar.gz
 export PATH=/c/Octave/test/mingw64/bin:$PATH
```

之后，应该可以从同一个终端通过命令 `octave --gui` 启动这个 "夜间" 版本。

# 外部链接

+   [https://buildbot.octave.org/](https://buildbot.octave.org/) 的 [Buildbot 配置仓库](https://hg.octave.org/octave-buildbot/)
+   [https://nightly.octave.org/](https://nightly.octave.org/) 的 [Buildbot 配置](https://github.com/gnu-octave/octave-buildbot)

[分类](Special%253ACategories.html "Special:Categories")：

+   [构建](Category%253ABuilding.html "Category:Building")