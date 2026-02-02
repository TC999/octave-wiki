# ArchLinux

## 目录

+   [1 安装 Octave](#安装_Octave)
+   [2 从源码构建 Octave](#从源码构建_Octave)
+   [3 构建文档](#构建文档)
+   [4 另见](#另见)

## 安装 Octave

要在 Arch Linux 上简单安装 GNU Octave 的最新稳定版本，只需以 root 身份执行：

```bash
pacman -S octave
```

使用 [AUR](https://aur.archlinux.org/)，可以安装 Octave 的开发版本，例如 [octave-hg](https://aur.archlinux.org/packages/octave-hg/?comments=all)。如果在构建过程中遇到任何问题，可以在 AUR 的评论中找到一些问题和解决方案。新的依赖项可以从 PKGBUILD 中轻松提取。

## 从源码构建 Octave

*有关通用构建说明，请参阅 [构建](Building.html "构建").*

要在 Arch Linux 上安装 Octave 的构建依赖项，只需以 root 身份执行：

```bash
pacman -S --needed base-devel pcre mercurial gcc-fortran gperf perl rsync transfig arpack curl rapidjson fftw fltk glpk glu graphicsmagick qt6-base qt6-tools hdf5 java-environment qhull qscintilla-qt6 texinfo gnuplot llvm texlive-bin icoutils gl2ps qrupdate 
```

您还需要安装 epstool 包。此包是用户贡献的包，官方仓库中没有提供。相反，它需要从 AUR 安装。有多种方法可以实现这一点，其中一种是使用 yay（一个 AUR 助手）。

安装 yay：

```bash
  pacman -S yay
```

使用 yay 安装 epstool：

```bash
  yay -S epstool
```

## 构建文档

如果您希望构建 Octave 文档，还需安装以下软件包：

```bash
  pacman -S graphviz doxygen
```

## 另见

+   [https://wiki.archlinux.org/index.php/Octave](https://wiki.archlinux.org/index.php/Octave)

[分类](Special%253ACategories.html "特殊:分类")：

+   [构建](Category%253ABuilding.html "分类:构建")
+   [GNU/Linux](Category%253AGNU/Linux.html "分类:GNU/Linux")
+   [安装](Category%253AInstallation.html "分类:安装")