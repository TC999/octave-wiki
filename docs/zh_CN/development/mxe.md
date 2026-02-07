# MXE

[MXE-Octave](https://hg.octave.org/mxe-octave) 于 2012 年从 [MXE 项目](https://mxe.cc/) 分支出来，在以下场景中用于构建 Octave 非常有用[\[1\]](#cite_note-1)：

1.  为 MS Windows（另请参阅 [Windows 安装程序](Windows_Installer.html "Windows Installer")）和其他平台进行交叉编译。
2.  在过时的 Linux 系统上构建 Octave（例如，只有旧的 GCC 版本可用）。
3.  在没有 root 权限的情况下构建 Octave。

![警告图标](../../assets/warning/26px-Warning_icon.svg.png)

**如果您的系统已经提供了新版本的 GCC 和其他所需的构建依赖项，那么 MXE-Octave 就<u>不是</u>构建 Octave 的最佳选择。** 其他安装选项请参阅 [安装](../install "Category:Installation")。

## 目录

+   [1 编译 MXE-Octave 示例](#编译-mxe-octave-示例)
    +   [1.1 准备](#准备)
    +   [1.2 配置](#配置)
    +   [1.3 构建](#构建)
    +   [1.4 用 OpenBLAS 替换参考 BLAS 库](#用-openblas-替换参考-blas-库)
    +   [1.5 运行](#运行)
+   [2 已知问题](#已知问题)
    +   [2.1 gnuplot](#gnuplot-1)
    +   [2.2 在旧系统上的构建错误](#在旧系统上的构建错误)
+   [3 参考文献](#参考文献)

### 编译 MXE-Octave 示例

#### 准备

1.  [安装 MXE Octave 的所有依赖项](Windows_Installer.md#Installing_requirements_of_MXE_Octave "Windows Installer")。
2.  确定安装目录（例如 ~/mxe-octave）。
3.  `cd ~`
4.  `hg clone [https://hg.octave.org/mxe-octave](https://hg.octave.org/mxe-octave) mxe-octave`
5.  `cd mxe-octave`
6.  `./bootstrap`

#### 配置

要获取配置选项的完整列表及其简短说明，请键入 `./configure --help`。另请参阅下面的[已知问题](#已知问题)。

```bash
./configure \
    --prefix=$HOME/mxe-octave \
    --enable-native-build \
    --enable-octave=release \
    --enable-64 \
    --enable-binary-packages \
    --enable-devel-tools \
    --enable-fortran-int64 \
    --enable-lib64-directory \
    --enable-openblas \
    --enable-pic-flag \
    --disable-system-fontconfig \
    --disable-system-gcc \
    --disable-system-opengl \
    --disable-system-x11-libs \
    --with-ccache \
    gnu-linux
```

#### 构建

`make -j3 JOBS=2 all openblas` 请根据您的需求调整变量 `-j`（并行包构建）和 `JOBS`（并行构建任务）的值。

#### 用 OpenBLAS 替换参考 BLAS 库

通常，与参考 BLAS 库相比，使用 [OpenBLAS](https://www.openblas.net/) 库可以获得更快的矩阵向量运算速度。

1.  `cd ~/mxe-octave/usr/lib`
2.  `mv libblas.so libblas.so.reference`
3.  `ln -s libopenblas.so libblas.so`

#### 运行

1.  MXE-Octave 将位于 ~/mxe-octave/usr/bin
2.  将命令 `octave` 作为别名添加到您的 .bashrc 文件中：`alias octave=~/mxe-octave/usr/bin/octave`
3.  键入 `octave` 启动 MXE-Octave。

### 已知问题

#### gnuplot

MXE-Octave 构建的 gnuplot 不支持基于 cairo 的终端和 lua/tikz 终端。如果您想使用这些功能，请准备具有这些功能的 gnuplot，然后在 Octave 命令提示符下键入

```bash
 >> gnuplot_binary /usr/bin/gnuplot
```

#### 在旧系统上的构建错误

在一些较旧的系统上，如果遇到构建错误，考虑添加以下配置选项可能会有所帮助：

+   `--disable-docs`
+   `--disable-java`

### 参考文献

1.  [↑](#cite_ref-1) 由 [jwe](User%253AJwe.html "User:Jwe") 撰写的 [MXE-Octave README](https://hg.octave.org/mxe-octave/file/6836b2f08479/README) 文本。

[分类](Special%253ACategories.html "Special:Categories")：

+   [构建](Category%253ABuilding.html "Category:Building")