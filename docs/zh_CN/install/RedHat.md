# Red Hat Linux 系统

适用于基于 RedHat 的发行版，例如 RedHat、CentOS、Fedora、Scientific Linux 等。

## 目录

+   [1 通用 RedHat](#通用_RedHat)
+   [2 CentOS](#CentOS)
    +   [2.1 准备安装 Octave](#准备安装_Octave)
    +   [2.2 从源码编译 Octave](#从源码编译_Octave)
    +   [2.3 使用 snap 安装](#使用_snap_安装)
+   [3 Redhat Enterprise Linux 工作站 6.4-2.6.32-358](#Redhat_Enterprise_Linux_工作站_6.4-2.6.32-358)

### 通用 RedHat

测试过 Fedora 33，但未完全测试。

```bash
  dnf install libtool make automake autoconf gcc gcc-devel \
  g++ g++-devel gcc-fortran gawk gperf less ncurses
```

测试过 Fedora 20，但未完全测试。

```bash
  yum install gcc gcc-c++ kernel-devel make mercurial libtool libtool-ltdl-devel libtool-ltdl autoconf cmake lapack-devel \
  lapack pcre-devel readline-devel readline fftw-devel glpk-devel suitesparse suitesparse-devel gnuplot libcurl-devel zlib-devel \
  flex texlive gperf fltk-devel qhull-devel hdf5-devel gl2ps-devel qrupdate-devel arpack-devel qscintilla-devel llvm-devel qt-devel \
  bison ghostscript-devel librsvg2-tools icoutils texlive-metapost
```

### CentOS

启用 [企业 Linux 的额外软件包 (EPEL)](https://fedoraproject.org/wiki/EPEL)，然后安装 Octave 的依赖开发包：

```bash
   yum -y install yum-utils
   yum-builddep -y octave
   yum -y install qt-devel mercurial gcc-c++ lapack-devel libtool
   yum -y install epstool transfig pstoedit qscintilla-devel
```

CentOS 7 提供的 arpack-devel 包（arpack-devel-3.1.3-2.el7.x86_64）似乎有些过时，因为在 "configure" 步骤中未识别 "seupdate" 例程。这可以通过从 GitHub 安装 arpack 来解决：

```bash
   git clone git@github.com:opencollab/arpack-ng.git
   cd arpack-ng
   ./bootstrap
   ./configure --prefix="some local prefix"
   make; make install
```

截至 2018 年 8 月 20 日的当前版本似乎可以与 CentOS 的 blas-devel 一起正常编译。

##### 准备安装 Octave

除可能的最终安装步骤外，其余步骤无需以 root 身份完成。建议创建一个安装目录，例如 /usr/local/octave/VERSION，这样可以通过删除目录树轻松卸载给定版本。要使用已安装的版本，将 /usr/local/octave/VERSION/bin 添加到 PATH 中。如果使用适当的权限创建 /usr/local/octave/VERSION 目录，则无需以 root 身份安装 Octave。例如：

```bash
   mkdir -p /usr/local/octave/dev
   chown jwe.jwe /usr/local/octave/dev
```

创建 src 和 build 目录：

```bash
   mkdir src build
```

##### 从源码编译 Octave

在 src 目录中检出 Octave 源代码副本

```bash
   cd src
   hg clone http://hg.savannah.gnu.org/hgweb/octave
```

+   引导构建系统

```bash
   cd octave
   ./bootstrap
```

+   在 build 目录中构建 Octave。根据系统选择适当的前缀。-jN 选项并行构建

```bash
   cd ../../build
   ../src/octave/configure --prefix=/usr/local/octave/dev
   make -j6 all
```

+   运行测试套件

```bash
   make check
```

+   如果一切看起来正常（开发版本可能会有一些失败），安装它

```bash
   make install
```

#### 使用 snap 安装

[https://snapcraft.io/install/octave/centos](https://snapcraft.io/install/octave/centos) - 最简单的安装方式。

+   启用 snapd。Snap 可用于 CentOS 7.6+ 和 Red Hat Enterprise Linux 7.6+，来自企业 Linux 的额外软件包 (EPEL) 仓库。可以使用以下命令将 EPEL 仓库添加到系统：

```bash
   sudo yum install epel-release
```

+   现在可以按以下方式安装 Snap：

```bash
   sudo yum install snapd
```

+   安装后，需要启用管理主 snap 通信套接字的 systemd 单元：

```bash
   sudo systemctl enable --now snapd.socket
```

+   要启用经典 snap 支持，输入以下命令以在 /var/lib/snapd/snap 和 /snap 之间创建符号链接：

```bash
   sudo ln -s /var/lib/snapd/snap /snap
```

注销并重新登录，或重新启动系统，以确保 snap 的路径正确更新。

+   安装 Octave。要安装 Octave，只需使用以下命令：

```bash
   sudo snap install octave
```

### Redhat Enterprise Linux 工作站 6.4-2.6.32-358

使用 rpm 安装 Octave 版本：3.4.3

```bash
  yum install gnuplot
```

+   下载并安装 lcms

```bash
  rpm -ivh lcms2-2.8-6.el6.x86_64.rpm
```

+   下载并安装 libwmf

```bash
  rpm -ivh libwmf-lite-0.2.8.4-25.el6_7.x86_64.rpm
```

+   下载并安装 GraphicsMagick 和 GraphicsMagick-c++

```bash
  rpm -ivh GraphicsMagick-1.3.32-1.el6.x86_64.rpm
  rpm -ivh GraphicsMagick-c++-1.3.32-1.el6.x86_64.rpm
```

+   安装 suitesparse

```bash
yum install suitesparse
```

+   安装 fftw3

```bash
  yum install fftw
```

```bash
  yum install glpk
```

+   下载并安装 fltk

```bash
  rpm -ivh fltk-1.1.10-1.el6.x86_64.rpm
```

+   下载并安装 hdf5

```bash
  rpm -ivh hdf5-1.8.5.patch1-10.el6.x86_64.rpm
```

+   下载并安装 qhull

```bash
  rpm -ivh qhull-2003.1-14.el6.x86_64.rpm
```

+   安装 blas

```bash
  yum install blas
```

+   下载并安装 qrupdate

```bash
  rpm -ivh qrupdate-1.1.2-1.el6.x86_64.rpm
```

+   安装 texinfo

```bash
  yum install texinfo
```

+   最后，安装 Octave

```bash
  rpm -ivh octave-3.4.3-2.el6.x86_64.rpm
```

[分类](Special%253ACategories.html "特殊:分类")：

+   [GNU/Linux](Category%253AGNU/Linux.html "分类:GNU/Linux")
+   [安装](Category%253AInstallation.html "分类:安装")