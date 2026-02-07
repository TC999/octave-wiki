# 构建

*本文提供关于从源代码**构建 GNU Octave**的通用信息（适用于类 Unix 系统）。*

+   *如果您只想**安装 GNU Octave**，请参阅 [安装类别](../install "Category:Installation")。*
+   *对于 **MS Windows**，请阅读 [在 Microsoft Windows 上构建](build_on_Windows.md "Building on Microsoft Windows") 和 [Windows 安装程序](Windows_Installer.md "Windows Installer")。*
+   *对于 **macOS**，请阅读 [用于 macOS 的 Octave](../install/macOS.md "Octave for macOS")。*

## 目录

+   [1 通用步骤](#通用步骤)
+   [2 依赖项](#依赖项)
    +   [2.1 构建工具](#构建工具)
    +   [2.2 文档工具](#文档工具)
    +   [2.3 外部工具和库](#外部工具和库)
+   [3 调整建议](#调整建议)
    +   [3.1 在 home 目录中安装 Octave](#在_home_目录中安装_Octave)
    +   [3.2 卸载](#卸载)
    +   [3.3 大数组支持](#大数组支持)
+   [4 另请参阅](#另请参阅)
+   [5 脚注](#脚注)

## 通用步骤

1.  安装所有[构建依赖项](#依赖项)（见下文）。
2.  获取 Octave 源代码...

(A) ... 从开发仓库获取（还需要 [Mercurial](https://www.mercurial-scm.org/)）

```bash
  hg clone https://www.octave.org/hg/octave && \
  cd octave                                  && \
  ./bootstrap
```

(B) ... 从发布版本获取

```bash
wget https://ftpmirror.gnu.org/octave/octave-10.3.0.tar.gz && \
tar -xzf octave-10.3.0.tar.gz                               && \
cd octave-10.3.0
```

3\. 配置、构建、测试和安装 Octave

```bash
mkdir .build                            && \
cd    .build                            && \
./../configure --prefix=$HOME/my_octave && \ [1]
make -j2                                && \ [2]
make check                              && \
make install
```

## 依赖项

本节给出的大多数依赖项可以在许多 [GNU/Linux](Octave_for_GNU/Linux.html "Octave for GNU/Linux") 系统上非常方便地安装。

![信息图标.svg](../../assets/info/26px-Info_icon.svg.png)

有关快速安装所需依赖项的方法，请参阅：

+   [Debian / Ubuntu](../install/debian.md#The_right_way "Octave for Debian systems")
+   [Arch Linux](../install/ArchLinux.md "Octave for Arch Linux")
+   [Fedora / RedHat / CentOS](../install/RedHat.md "Octave for Red Hat Linux systems")

标记为绿色背景的依赖项是构建 Octave 所**必需的**。所有其他工具和库是推荐的/可选的，但如果缺少，很有用功能（如 GUI、绘图等）可能会被禁用。

### 构建工具

| 依赖项 | 描述 | 许可证 / 版权 |
| --- | --- | --- |
| [Autoconf](https://www.gnu.org/software/autoconf) | 软件配置 | GNU GPL v3.0 |
| [Automake](https://www.gnu.org/software/automake) | Makefile 生成器 | GNU GPL v3.0 |
| [C++、C 和 Fortran 编译器](https://gcc.gnu.org) | 编译源代码 | GNU GPL v3.0 |
| [GNU Make](https://www.gnu.org/software/make) | Makefile 处理器 | GNU GPL v3.0 |
| [Libtool](https://www.gnu.org/software/libtool) | automake 的依赖项 | Free Software Foundation |
| Unix 工具：gawk, gperf, less, ncurses | 杂项任务 | GNU GPL v3.0 |
| [Bison](https://www.gnu.org/software/bison) | 解析器生成器 | GNU GPL v3.0 |
| [Flex](https://www.gnu.org/software/flex) | 词法分析器 | The Flex project |

### 文档工具

| 依赖项 | 描述 | 许可证 / 版权 |
| --- | --- | --- |
| [epstool](http://www.ghostgum.com.au/software/epstool.htm) | Epstool 是一个用于在 EPS 文件中创建或提取预览图像、修复边界框并转换为位图的实用程序。 | GNU GPL v2.0 |
| [FTGL](https://www.freetype.org) | 可移植字体引擎，用于为 Octave 基于 OpenGL 的图形函数执行字体渲染。 | GNU GPL v2.0 |
| [GL2PS](http://geuz.org/gl2ps) | GL2PS 是一个 C 库，为任何 OpenGL 应用程序提供高质量的矢量输出。 | GNU LGPL v2.0 |
| [Texi2HTML](https://www.nongnu.org/texi2html) | 将 Texinfo 源文件转换为 HTML 输出的 Perl 脚本。 | GNU GPL v3.0 |
| [Texinfo](https://www.gnu.org/software/texinfo) | 使用单一源文件生成在线信息和打印输出的文档系统。 | GNU GPL v3.0 |
| [TeX Live](https://www.tug.org/texlive/) | TeX 文档生成系统，包括所有主要的与 TeX 相关的程序、宏包和作为自由软件的字体。 | 可根据自由软件基金会定义自由再分发 |

### 外部工具和库

| 依赖项 | 描述 | 许可证 / 版权 |
| --- | --- | --- |
| [BLAS](https://www.netlib.org/blas) | 基础线性代数子程序库 | 免费 - 要求恰当署名 |
| [LAPACK](https://netlib.org/lapack) | 线性代数包 | 免费 - 要求恰当署名 |
| [PCRE](https://www.pcre.org) | Perl 兼容正则表达式库 | 免费 |
| [GNU Readline](https://www.gnu.org/software/readline) | 命令行编辑库 | GNU GPL v3.0 |
| [ARPACK-NG](https://github.com/opencollab/arpack-ng) | 大规模特征值问题求解 | BSD 风格 - 多位作者 |
| [cURL](https://curl.haxx.se) | 使用 URL 语法传输数据的库 | 自由软件 -- 主要作者 |
| [FFTW3](http://www.fftw.org) | 计算离散傅里叶变换的库 | MIT -- GNU GPL v2.0 |
| [FLTK](https://www.fltk.org) | 可移植 GUI 工具包 | GNU GPL v2.0（静态链接例外） |
| [fontconfig](https://www.freedesktop.org/wiki/Software/fontconfig) | 配置和自定义字体访问的库 | 按"原样"提供 -- 多位作者 |
| [FreeType](https://www.freetype.org) | 可移植字体引擎 | 与 GNU GPL v3.0 兼容 |
| [GL2PS](https://www.geuz.org/gl2ps/) | OpenGL 到 PostScript 打印库 | GNU GPL v2.0 |
| [GLPK](https://www.gnu.org/software/glpk) | GNU 线性编程工具包 | GNU GPL v3.0 |
| [gnuplot](http://www.gnuplot.info) | 交互式图形程序 | 按"原样"提供 -- 多位作者 |
| Magick++，例如 [GraphicsMagick++](http://www.graphicsmagick.org) | 图像处理库 | 多种 -- 集成了许多第三方库 |
| [HDF5](https://www.hdfgroup.org/solutions/hdf5) | 操作可移植数据文件的库 | BSD 风格 |
| JDK，例如 [OpenJDK](https://www.hdfgroup.org/solutions/hdf5) | Java 编程语言编译器和库 | GNU GPL v2.0 |
| [OpenGL](https://www.opengl.org) | 用于可移植 2D 和 3D 图形的 API | 免费规范 -- 许可证取决于驱动程序 |
| [PortAudio](http://www.portaudio.com/) | 音频 I/O 库 | 自由软件 -- 具体规定 |
| [Qhull](http://www.qhull.org) | 计算几何库 | 自由软件 -- 具体规定 |
| [QRUPDATE](http://sourceforge.net/projects/qrupdate) | QR 分解更新库 | GNU GPL v3.0 |
| [QScintilla](https://riverbankcomputing.com/software/qscintilla) | 源代码高亮和操作工具；Scintilla 的 Qt 移植版 | GNU GPL v3.0 |
| [Qt](https://www.qt.io/) | 用于创建图形用户界面的小部件工具包 | GNU LGPL v3.0 |
| [RapidJSON](https://rapidjson.org/) | 用于 C++ 的快速 JSON 解析器/生成器，支持 SAX/DOM 两种风格的 API | MIT 许可证 |
| [SuiteSparse](http://faculty.cse.tamu.edu/davis/suitesparse.html) | 稀疏矩阵分解库 | 主要作者 |
| [SUNDIALS IDA](https://computing.llnl.gov/projects/sundials/ida) | 非线性和微分/代数方程求解器套件 - 微分代数方程 (DAE) 系统的初值问题 | BSD 3-Clause |
| [zlib](https://zlib.net) | 数据压缩库 | 按"原样"提供 -- 多位作者 |

## 调整建议

### 在 home 目录中安装 Octave

要在一个系统上安装多个版本的 GNU Octave，建议使用 `configure` 脚本的 `--prefix` 选项。使用此选项可以确定一个自定义的安装目录，最好在用户主目录内，以避免需要提升的安装权限。这样不会通过运行 `sudo make install` 来"弄乱"系统，并且自定义构建的 Octave 可以与系统自带的 Octave（例如您的 Linux 发行版安装的 Octave）共存。

为了使自定义构建的 Octave 像发行版安装的 Octave 一样方便启动，可以在 .bashrc 中创建一个别名：

```bash
echo "alias myoctave='$HOME/my_octave/bin/octave'" >> ~/.bashrc
```

然后在不注销和重新登录的情况下更新您的 .bashrc：

```bash
source $HOME/.bashrc
```

如果您简单地输入 `octave`，您将启动 Linux 发行版安装的 Octave。但是当您输入 `myoctave` 时，您将启动您在主目录内的自定义构建的 Octave。

### 卸载

1.  如果您仍然拥有 .build 文件夹，只需从中运行 `make uninstall`。
2.  直接删除安装文件夹，例如 `rm -rf $HOME/my_octave`。

在任何情况下，别忘了删除在 ~/.bashrc 中创建的任何*别名*条目。

### 大数组支持

*主条目：[启用大数组：构建 Octave 使其能够使用大于 2GB 的数组。](enable_large_arrays.md "Enable large arrays: Build octave such that it can use arrays larger than 2Gb.")*

## 另请参阅

+   开发仓库中的 [`README`](https://hg.savannah.gnu.org/hgweb/octave/file/tip/README) 和 [`/etc/HACKING.md`](https://hg.savannah.gnu.org/hgweb/octave/file/tip/etc/HACKING.md)。
+   [https://octave.org/doc/interpreter/Installation.html](https://octave.org/doc/interpreter/Installation.html)
+   [MXE](MXE.html "MXE") -- 一个更定制化的 Octave 构建，包括许多自编译的工具。

## 脚注

1.  [↑](#cite_ref-1) `--prefix` 确定安装位置，详情请参阅[调整建议部分](#在_home_目录中安装_Octave)。有关配置选项的更多信息，请输入 `./../configure --help`。
2.  [↑](#cite_ref-2) 根据您的系统和处理器核心数量，使用更多的并行作业数，例如 `-j8`。

[分类](Special%253ACategories.html "Special:Categories"):

+   [构建](Category%253A "Category:Building")