# Debian 系统

+   *本文介绍了在 Debian 及基于 Debian 的发行版（如 Ubuntu）上[安装](Category%253AInstallation.html "分类:安装")和[构建](Building.html "构建") GNU Octave 的方法。*

## 目录

+   [1 安装 Octave](#安装_Octave)
+   [2 从源码构建 Octave](#从源码构建_Octave)
    +   [2.1 安装依赖项](#安装依赖项)
        +   [2.1.1 简单方法（但可能不正确）](#简单方法_但可能不正确)
        +   [2.1.2 正确方法](#正确方法)
    +   [2.2 配置](#配置)
        +   [2.2.1 Java](#Java)
        +   [2.2.2 HDF5](#HDF5)
        +   [2.2.3 Sundials](#Sundials)
+   [3 另见](#另见)

## 安装 Octave

Debian 和 Ubuntu 的所有版本都提供了 GNU Octave 和许多 [Octave Forge](Octave_Forge.html "Octave Forge") 包的二进制包。这些是经过充分测试的二进制文件，应该最适合大多数用户。要安装它们，请运行：

```bash
sudo apt-get install octave
```

在 Debian 和 Ubuntu 中，完整的 GNU Octave 软件被分成多个包。要获得 Octave 的完整功能，还需额外安装：

+   `octave-doc`、`octave-info` 和 `octave-htmldoc` 用于文档；
+   `octave-dev`（在较旧的 Debian/Ubuntu 中为 `liboctave-dev`）用于 Octave 开发头文件和 mkoctfile（安装 Octave Forge 包时需要）；
+   `octave-dbg` 用于调试符号。

许多 Octave 包也由 Debian 和 Ubuntu 分发。这些包经过测试，与相应的 Octave 版本配合使用效果最佳。通过以下命令安装它们：

```bash
sudo apt-get install octave-control octave-image octave-io octave-optim octave-signal octave-statistics
```

截至 2018 年，[GNU Octave 团队](https://launchpad.net/~octave) 在 Launchpad 上积极维护了一个 PPA，提供了更新的 Octave 包。这些包从 Debian 不稳定版回移，对较旧的 Ubuntu 安装（如 Xenial Xerus 16.04）非常有用。要设置系统以安装这些包，请运行：

```bash
sudo apt-add-repository ppa:octave/stable
sudo apt-get update
sudo apt-get install octave
```

## 从源码构建 Octave

*有关通用构建说明，请参阅 [构建](Building.html "构建").*

唯一棘手的部分是安装 Octave 的构建依赖项。一旦解决了这个问题，就可以轻松遵循[通用构建说明](Building.html "构建")。有关一些 Debian 和 Ubuntu 特定的配置选项，请参阅[下文](#配置)。

### 安装依赖项

请注意，不同的 Debian 和 Ubuntu 版本可能有略微不同的包名称，但差异应该很小，主要限于版本号。

#### 简单方法（但可能不正确）

此方法*仅*适用于从源码构建与您的 Linux 发行版已打包的*相同*版本。

安装*大多数*必要依赖项的简单方法是运行 `sudo apt-get build-dep octave`。这将安装构建和准备 octave 版本的 Debian 包所需的所有包。然而：

+   会安装与构建 Debian 包相关的不必要包；
+   可能会遗漏一些新依赖项；
+   可能会安装一些不再是 Octave 依赖项的包。

#### 正确方法

正确的方法是安装 [构建](Building.html#Dependencies "构建") wiki 页面上列出的所有依赖项。可以手动搜索相应的包：

+   [https://packages.debian.org](https://packages.debian.org)
+   [https://packages.ubuntu.com](https://packages.ubuntu.com)

或者，为了方便起见，可以使用一些 "一键式" 命令安装它们：

+   **Ubuntu 24.04 (LTS)**

```bash
sudo apt install gcc g++ autoconf automake bison dvipng epstool fig2dev flex gfortran gnuplot-x11 gperf gzip icoutils libarpack2-dev libopenblas-dev libcurl4-gnutls-dev libfftw3-dev libfltk1.3-dev libfontconfig1-dev libfreetype-dev libgl1-mesa-dev libgl2ps-dev libglpk-dev libgraphicsmagick++1-dev libhdf5-dev liblapack-dev libosmesa6-dev libpcre2-dev libqhull-dev libqscintilla2-qt5-dev libqrupdate-dev libreadline-dev librsvg2-bin libsndfile1-dev libsuitesparse-dev libsundials-dev libtool libxft-dev make openjdk-11-jdk perl portaudio19-dev pstoedit qtbase5-dev qttools5-dev qttools5-dev-tools rapidjson-dev rsync tar texinfo texlive-latex-extra zlib1g-dev
```

或者要使用 Qt6 构建 GUI（Octave 9 或更高版本）：

```bash
sudo apt install gcc g++ autoconf automake bison dvipng epstool fig2dev flex gfortran gnuplot-x11 gperf gzip icoutils libarpack2-dev libopenblas-dev libcurl4-gnutls-dev libfftw3-dev libfltk1.3-dev libfontconfig1-dev libfreetype-dev libgl1-mesa-dev libgl2ps-dev libglpk-dev libgraphicsmagick++1-dev libhdf5-dev liblapack-dev libosmesa6-dev libpcre2-dev libqhull-dev libqscintilla2-qt6-dev libqrupdate-dev libreadline-dev librsvg2-bin libsndfile1-dev libsuitesparse-dev libsundials-dev libtool libxft-dev make openjdk-11-jdk perl portaudio19-dev pstoedit qt6-5compat-dev qt6-base-dev qt6-tools-dev qt6-base-dev-tools rapidjson-dev rsync tar texinfo texlive-latex-extra zlib1g-dev
```

（其中一些包可能仅在从存储库检出时需要。）

+   **Ubuntu 22.04 (LTS)**

```bash
sudo apt install gcc g++ autoconf automake bison dvipng epstool fig2dev flex gfortran gnuplot-x11 gperf gzip icoutils libarpack2-dev libbison-dev libopenblas-dev libcurl4-gnutls-dev libfftw3-dev libfltk1.3-dev libfontconfig1-dev libfreetype6-dev libgl1-mesa-dev libgl2ps-dev libglpk-dev libgraphicsmagick++1-dev libhdf5-dev liblapack-dev libosmesa6-dev libpcre3-dev libqhull-dev libqscintilla2-qt5-dev libqrupdate-dev libreadline-dev librsvg2-bin libsndfile1-dev libsuitesparse-dev libsundials-dev libtool libxft-dev make openjdk-8-jdk perl portaudio19-dev pstoedit qtbase5-dev qttools5-dev qttools5-dev-tools rapidjson-dev rsync tar texinfo texlive-latex-extra zlib1g-dev
```

（其中一些包可能仅在从存储库检出时需要。）

+   **Ubuntu 20.04 (LTS)**

```bash
sudo apt-get install gcc g++ gfortran make libopenblas-dev liblapack-dev libpcre3-dev libarpack2-dev libcurl4-gnutls-dev epstool libfftw3-dev fig2dev libfltk1.3-dev libfontconfig1-dev libfreetype6-dev libgl2ps-dev libglpk-dev libreadline-dev gnuplot-x11 libgraphicsmagick++1-dev libhdf5-dev openjdk-11-jdk libsndfile1-dev llvm-dev texinfo libgl1-mesa-dev pstoedit portaudio19-dev libqhull-dev libqrupdate-dev libsuitesparse-dev texlive-latex-extra libxft-dev zlib1g-dev autoconf automake bison flex gperf gzip icoutils librsvg2-bin libtool perl rsync tar qtbase5-dev qttools5-dev qttools5-dev-tools libqscintilla2-qt5-dev libsundials-dev rapidjson-dev
```

[KaKiLa](User%253AKaKiLa.html "User:KaKiLa") ([talk](https://wiki.octave.org/wiki/index.php?title=User_talk:KaKiLa&action=edit&redlink=1 "User talk:KaKiLa (page does not exist)")) 03:34, 17 June 2020 (PDT) lpr conflict with cups-bsd

+   **Ubuntu 19.10**

```bash
sudo apt-get install gcc g++ gfortran make libopenblas-dev liblapack-dev libpcre3-dev libarpack2-dev libcurl4-gnutls-dev epstool libfftw3-dev fig2dev libfltk1.3-dev libfontconfig1-dev libfreetype6-dev libgl2ps-dev libglpk-dev libreadline-dev gnuplot-x11 libgraphicsmagick++1-dev libhdf5-dev openjdk-8-jdk libsndfile1-dev llvm-dev lpr texinfo libgl1-mesa-dev pstoedit portaudio19-dev libqhull-dev libqrupdate-dev libsuitesparse-dev texlive-latex-extra texlive-libxft-dev zlib1g-dev autoconf automake bison flex gperf gzip icoutils librsvg2-bin libtool perl rsync tar qtbase5-dev qttools5-dev qttools5-dev-tools libqscintilla2-qt5-dev libsundials-dev
```

+   **Ubuntu 18.04 (LTS)**

```bash
sudo apt-get install gcc g++ gfortran make libopenblas-dev liblapack-dev libpcre3-dev libarpack2-dev libcurl4-gnutls-dev epstool libfftw3-dev transfig libfltk1.3-dev libfontconfig1-dev libfreetype6-dev libgl2ps-dev libglpk-dev libreadline-dev gnuplot-x11 libgraphicsmagick++1-dev libhdf5-serial-dev openjdk-8-jdk libsndfile1-dev llvm-dev lpr texinfo libgl1-mesa-dev pstoedit portaudio19-dev libqhull-dev libqrupdate-dev libqscintilla2-dev libsuitesparse-dev texlive texlive-generic-recommended libxft-dev zlib1g-dev autoconf automake bison flex gperf gzip icoutils librsvg2-bin libtool perl rsync tar qtbase5-dev qttools5-dev qttools5-dev-tools libqscintilla2-qt5-dev libsundials-dev
```

+   **Ubuntu 16.04 (LTS)**

```bash
sudo apt-get install gcc g++ gfortran make libopenblas-dev liblapack-dev libpcre3-dev libarpack2-dev libcurl4-gnutls-dev epstool libfftw3-dev transfig libfltk1.3-dev libfontconfig1-dev libfreetype6-dev libgl2ps-dev libglpk-dev libreadline-dev gnuplot-x11 libgraphicsmagick++1-dev libhdf5-serial-dev openjdk-8-jdk libsndfile1-dev llvm-dev lpr texinfo libgl1-mesa-dev libosmesa6-dev pstoedit portaudio19-dev libqhull-dev libqrupdate-dev libqscintilla2-dev libqt4-dev libqtcore4 libqtwebkit4 libqt4-network libqtgui4 libqt4-opengl-dev libsuitesparse-dev texlive libxft-dev zlib1g-dev autoconf automake bison flex gperf gzip icoutils librsvg2-bin libtool perl rsync tar
```

+   **Debian 13 (trixie)**

```bash
sudo apt install gcc g++ gfortran make libopenblas-dev liblapack-dev libpcre2-dev libarpack2-dev libcurl4-gnutls-dev epstool libfftw3-dev fig2dev libfltk1.3-dev libfontconfig1-dev libfreetype-dev libgl2ps-dev libglpk-dev libreadline-dev gnuplot libgraphicsmagick++1-dev libhdf5-dev openjdk-21-jdk libsndfile1-dev llvm-dev texinfo libgl1-mesa-dev libosmesa6-dev pstoedit portaudio19-dev libjack-jackd2-dev libqhull-dev libqrupdate-dev libqt5core5t64 qtbase5-dev qttools5-dev qttools5-dev-tools libqscintilla2-qt5-dev libsuitesparse-dev texlive texlive-latex-extra libxft-dev zlib1g-dev autoconf automake bison flex gperf gzip icoutils librsvg2-bin libtool perl rsync tar libsundials-dev git
```

+   **Debian 10**

```bash
sudo apt-get install gcc g++ gfortran make libopenblas-dev liblapack-dev libpcre3-dev libarpack2-dev libcurl4-gnutls-dev epstool libfftw3-dev fig2dev libfltk1.3-dev libfontconfig1-dev libfreetype6-dev libgl2ps-dev libglpk-dev libreadline-dev gnuplot libgraphicsmagick++1-dev libhdf5-dev openjdk-11-jdk libsndfile1-dev llvm-dev texinfo libgl1-mesa-dev libosmesa6-dev pstoedit portaudio19-dev libjack-jackd2-dev libqhull-dev libqrupdate-dev libqt5core5a qtbase5-dev qttools5-dev qttools5-dev-tools libqscintilla2-qt5-dev libsuitesparse-dev texlive texlive-latex-extra libxft-dev zlib1g-dev autoconf automake bison flex gperf gzip icoutils librsvg2-bin libtool perl rsync tar libsundials-dev git
```

+   **Debian 9**

```bash
sudo apt-get install gcc g++ gfortran make libopenblas-dev liblapack-dev libpcre3-dev libarpack2-dev libcurl4-gnutls-dev epstool libfftw3-dev transfig libfltk1.3-dev libfontconfig1-dev libfreetype6-dev libgl2ps-dev libglpk-dev libreadline-dev gnuplot libgraphicsmagick++1-dev libhdf5-serial-dev openjdk-8-jdk libsndfile1-dev llvm-dev texinfo libgl1-mesa-dev libosmesa6-dev pstoedit portaudio19-dev libjack-jackd2-dev libqhull-dev libqrupdate-dev libqscintilla2-dev libqt4-dev libqtcore4 libqtwebkit4 libqt4-network libqtgui4 libqt4-opengl-dev libsuitesparse-dev texlive libxft-dev zlib1g-dev autoconf automake bison flex gperf gzip icoutils librsvg2-bin libtool perl rsync tar
```

+   **Debian 8**

```bash
sudo apt-get install gcc g++ gfortran make libopenblas-dev liblapack-dev libpcre3-dev libarpack2-dev libcurl4-gnutls-dev epstool libfftw3-dev transfig libfltk1.3-dev libfontconfig1-dev libfreetype6-dev libgl2ps-dev libglpk-dev libreadline-dev gnuplot libgraphicsmagick++1-dev libhdf5-serial-dev openjdk-7-jdk libsndfile1-dev llvm-dev lpr texinfo libgl1-mesa-dev libosmesa6-dev pstoedit portaudio19-dev libqhull-dev libqrupdate-dev libqscintilla2-dev libqt4-dev libqtcore4 libqtwebkit4 libqt4-network libqtgui4 libqt4-opengl-dev libsuitesparse-dev texlive libxft-dev zlib1g-dev autoconf automake bison flex gperf gzip icoutils librsvg2-bin libtool perl rsync tar
```

  

[![Warning icon.svg](wiki/images/thumb/2/24/Warning_icon.svg/26px-Warning_icon.svg.png)](File%253AWarning_icon.svg.html)

+   The Debian repositoriy has several libraries for dealing with HDF data files. The recommended is `libhdf5-serial-dev`. However, the [msh package](https://octave.sourceforge.io/msh/index.html) requires [gmsh](http://www.geuz.org/gmsh/) which is incompatible with it.
+   The GraphicsMagick++ library (libgraphicsmagick++1-dev) on the Debian repositories was compiled with quantum 8 which limits reading images to 8 bit. The solution is to recompile [GraphicsMagick](GraphicsMagick.html "GraphicsMagick") with quantum 16 or 32 before building Octave.
+   For debian9 using openjdk-9-jdk (even providing `JAVA_HOME`) could \*not\* be used for the java interface! Use openjdk-8-jdk instead.
+   When configure decides to use QT5 instead of QT4, make might fail because lrelease is missing (see [bug 50580](https://savannah.gnu.org/bugs/?50580)). It can be fixed by installing `qttools5-dev-tools`

### 配置

以下列出了一些 Debian 和 Ubuntu 特定的配置调整：

#### Java

在基于 Debian 的系统上，Java 的自动检测应该运行良好。可以通过将 `JAVA_HOME` 传递给 configure 来指定特定的 Java 版本，例如：

```bash
./configure JAVA_HOME=/usr/lib/jvm/java-7-openjdk-amd64
```

#### HDF5

在当前版本的 Debian 和 Ubuntu 上，从源码构建较旧版本的 Octave 时，您可能会收到以下警告：

```bash
HDF5 library not found.  Octave will not be able to save or load HDF5 data files.
```

问题在于 hdf5 包有多个版本。Octave 是针对串行版本编写的，但它可能与其他版本（OpenMPI 和 Mpich）一起工作。由于 Debian 的命名方案，可能需要指定库的位置。有关详细信息，请参阅 bug [#38928](https://savannah.gnu.org/bugs/?38928)（从评论 #19 开始），但基本上，在运行 configure 时使用以下命令：

```bash
./configure --with-hdf5-includedir=/usr/include/hdf5/serial --with-hdf5-libdir=/usr/lib/$(dpkg-architecture -qDEB_HOST_MULTIARCH)/hdf5/serial
```

On older versions of Debian and Ubuntu, where only one flavor of the HDF5 library could be installed at a time, you may need to build Octave against one of the MPI-enabled flavors. On these older systems, configuring Octave like this may work:

```bash
./configure CPPFLAGS="-I/usr/include/mpi -DMPICH_SKIP_MPICXX -DOMPI_SKIP_MPICXX"
```

#### Sundials

On recent Debian and Ubuntu releases whose Sundials version (in `libsundials-dev`) is 3.1, a configure flag needs to be passed for `ode15i` and `ode15s` to be compiled with support for sparse Jacobians (bug [#55937](https://savannah.gnu.org/bugs/?55937)), as follows:

```bash
./configure CPPFLAGS="-I/usr/include/suitesparse"
```

## 另见

+   [MXE](MXE.html "MXE") -- 一个更为定制化的 Octave 构建，包括许多自编译工具。

[分类](Special%253ACategories.html "特殊:分类")：

+   [构建](Category%253ABuilding.html "分类:构建")
+   [安装](Category%253AInstallation.html "分类:安装")
+   [GNU/Linux](Category%253AGNU/Linux.html "分类:GNU/Linux")