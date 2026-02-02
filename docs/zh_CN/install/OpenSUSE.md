# OpenSUSE

## 目录

+   [1 安装](#安装)
    +   [1.1 科学仓库](#科学仓库)
+   [2 Octave Forge 包](#Octave_Forge_包)
+   [3 线性代数库](#线性代数库)
+   [4 图像导入与导出](#图像导入与导出)
+   [5 错误报告](#错误报告)
+   [6 另见](#另见)

### 安装

Octave 二进制包由所有最新的 openSUSE 版本的 OSS 仓库提供。可以使用 [一键安装](https://software.opensuse.org/package/octave)、YaST 或 zypper 命令安装 Octave：

```bash
  zypper install octave
```

建议额外安装开发文件。它们在安装 openSUSE 的 OSS 仓库之外的 [Octave Forge](#Octave_Forge_包) 包或使用 Octave 创建应用程序时是必需的。

```bash
  zypper install octave-devel
```

#### 科学仓库

如果您想使用 **最新稳定版本的 Octave**，可以通过科学仓库的 [一键安装](https://software.opensuse.org/download.html?project=science&package=octave) 获取二进制包。

要手动添加科学仓库，请使用 zypper 命令（`<openSUSE_version>` 例如为 `openSUSE_Leap_15.1`）：

```bash
  zypper addrepo http://download.opensuse.org/repositories/science/<openSUSE_version>/science.repo
  zypper refresh
```

然后从科学仓库安装 Octave：

```bash
  zypper install --from science octave
```

### Octave Forge 包

[Octave Forge](Octave_Forge.html "Octave Forge") 二进制包由 OSS 和科学仓库提供。您可以通过 zypper 命令列出所有可用包：

```bash
  zypper search octave-forge*
```

### 线性代数库

openSUSE 默认使用参考 BLAS 和 LAPACK 实现，但 ATLAS 或 OpenBLAS 通常更快。您可以通过 update-alternatives 机制切换：

```bash
  /usr/sbin/update-alternatives --config libblas.so.3
```

```bash
  /usr/sbin/update-alternatives --config liblapack.so.3
```

示例：

```bash
There are 4 choices for the alternative libblas.so.3 (providing /usr/lib64/libblas.so.3).

  Selection    Path                             Priority   Status
------------------------------------------------------------
* 0            /usr/lib64/libblas.so.3.4.2       50        auto mode
  1            /usr/lib64/atlas/libsatlas.so.3   20        manual mode
  2            /usr/lib64/atlas/libtatlas.so.3   20        manual mode
  3            /usr/lib64/libblas.so.3.4.2       50        manual mode
  4            /usr/lib64/libopenblasp.so.0      20        manual mode
```

有关更多信息，请参阅 openSUSE wiki 上的 [线性代数库页面](https://en.opensuse.org/openSUSE:Science_Linear_algebra_libraries)。

### 图像导入与导出

openSUSE 仓库中的 GraphicsMagick++ 库是以量化深度 16 编译的，这限制了读取和写入图像为 16 位。有关更多详细信息，请参阅 [GraphicsMagick](GraphicsMagick.html "GraphicsMagick") wiki 页面。

### 错误报告

您可以通过按 [OBS Octave 页面](https://build.opensuse.org/package/show/science/octave)上的“报告错误”按钮报告 openSUSE 特定的错误（需要 openSUSE bugzilla 账户）。

### 另见

+   [https://en.opensuse.org/Octave](https://en.opensuse.org/Octave)

[分类](Special%253ACategories.html "特殊:分类")：

+   [GNU/Linux](Category%253AGNU/Linux.html "分类:GNU/Linux")
+   [安装](Category%253AInstallation.html "分类:安装")