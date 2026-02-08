# GNU/Linux

## 目录

+   [1 发行版](#发行版)
    +   [1.1 Arch Linux](#Arch_Linux)
    +   [1.2 Debian 和基于 Debian 的发行版（如 Ubuntu）](#Debian_和基于_Debian_的发行版_如_Ubuntu)
    +   [1.3 Fedora](#Fedora)
    +   [1.4 Gentoo](#Gentoo)
    +   [1.5 openSUSE 和 SUSE Linux Enterprise](#openSUSE_和_SUSE_Linux_Enterprise)
    +   [1.6 Red Hat Enterprise/CentOS](#Red_Hat_Enterprise/CentOS)
    +   [1.7 Slackware](#Slackware)
+   [2 独立于发行版](#独立于发行版)
    +   [2.1 Anaconda](#Anaconda)
    +   [2.2 Docker / Podman / Singularity](#Docker_/_Podman_/_Singularity)
        +   [2.2.1 mtmiller 的版本](#mtmiller_的版本)
    +   [2.3 Flatpak](#Flatpak)
    +   [2.4 Guix](#Guix)
    +   [2.5 Linux 上的 Homebrew](#Linux_上的_Homebrew)
    +   [2.6 MXE](#MXE)
    +   [2.7 Snap](#Snap)
    +   [2.8 Spack](#Spack)
+   [3 从源码构建](#从源码构建)
    +   [3.1 另见](#另见)

# 发行版

在 GNU/Linux 系统上安装 Octave 的推荐方法是通过每个发行版的包安装系统。如果由于某些原因无法这样做，或者可用的 Octave 版本太旧，请考虑使用下面描述的[独立于发行版](#独立于发行版)的方法或[从源码构建 Octave](../development/building.md "构建")。

## Arch Linux

*主条目: [适用于 Arch Linux 的 Octave](ArchLinux.md "适用于 Arch Linux 的 Octave")*

```bash
  pacman -S octave
```

## Debian 和基于 Debian 的发行版（如 Ubuntu）

*主条目: [适用于 Debian 系统的 Octave](Debian.md "适用于 Debian 系统的 Octave")*

```bash
  apt install octave
  apt install octave-dev  # 开发文件；在较旧版本中为 liboctave-dev
```

## Fedora

*主条目: [适用于 Red Hat Linux 系统的 Octave](RedHat.md "适用于 Red Hat Linux 系统的 Octave")*

```bash
  dnf install octave
  dnf install octave-devel  # 开发文件
```

## Gentoo

```bash
  emerge --ask sci-mathematics/octave
```

## openSUSE 和 SUSE Linux Enterprise

*主条目: [适用于 openSUSE 的 Octave](OpenSUSE.md "适用于 openSUSE 的 Octave")*

```bash
  zypper install octave
  zypper install octave-devel  # 开发文件
```

## Red Hat Enterprise/CentOS

*主条目: [适用于 Red Hat Linux 系统的 Octave](RedHat.md "适用于 Red Hat Linux 系统的 Octave")*

```bash
  yum install epel-release
  yum install octave
  yum install octave-devel  # 开发文件
```

如果上述方法无效，请按照[这些说明](https://fedoraproject.org/wiki/EPEL#How_can_I_use_these_extra_packages.3F)设置系统以从 EPEL 安装包。

## Slackware

*主条目: [适用于 Slackware 的 Octave](Slackware.md "适用于 Slackware 的 Octave")*

# 独立于发行版

使用独立于发行版的方法在您使用较旧的 GNU/Linux 发行版或没有系统 root 权限时特别有用。这种方法的一个常见缺点是，这些解决方案运行在某种沙盒中。因此，与底层系统的通信可能存在限制。例如，在沙盒外执行系统二进制文件可能是不可能的。

## Anaconda

+   更多信息: [https://anaconda.org/conda-forge/octave](https://anaconda.org/conda-forge/octave)

```bash
  conda create --name octave
  conda activate octave
  conda install -c conda-forge octave
```

## Docker / Podman / Singularity

+   更多信息: [https://hub.docker.com/r/gnuoctave/octave](https://hub.docker.com/r/gnuoctave/octave)
+   开发: [https://github.com/gnu-octave/docker](https://github.com/gnu-octave/docker)

```bash
  docker pull docker.io/gnuoctave/octave:10.3.0
  podman pull docker.io/gnuoctave/octave:10.3.0
```

```bash
  singularity pull docker://gnuoctave/octave:10.3.0
```

### mtmiller 的版本

+   更多信息: [https://hub.docker.com/r/mtmiller/octave](https://hub.docker.com/r/mtmiller/octave)
+   开发: [https://gitlab.com/mtmiller/docker-octave](https://gitlab.com/mtmiller/docker-octave)

```bash
  docker pull docker.io/mtmiller/octave
```

## Flatpak

+   更多信息: [https://flathub.org/apps/details/org.octave.Octave](https://flathub.org/apps/details/org.octave.Octave)
+   开发: [https://github.com/flathub/org.octave.Octave](https://github.com/flathub/org.octave.Octave)

```bash
  flatpak install flathub org.octave.Octave
```

## Guix

+   更多信息: [https://packages.guix.gnu.org/packages/octave/9.1.0/](https://packages.guix.gnu.org/packages/octave/9.1.0/)

```bash
  guix install octave
```

## Linux 上的 Homebrew

"Linux 上的 Homebrew" 以前是一个名为 Linuxbrew 的分支。可以在您的主目录中安装当前版本的 Octave 或开发版本及任何所需的依赖项。

+   更多信息: [https://docs.brew.sh/Homebrew-on-Linux](https://docs.brew.sh/Homebrew-on-Linux)
+   开发: [https://formulae.brew.sh/formula/octave](https://formulae.brew.sh/formula/octave)

```bash
  brew install octave
```

## MXE

+   更多信息: [MXE](../development/mxe.md "MXE")
+   开发: [https://hg.octave.org/mxe-octave](https://hg.octave.org/mxe-octave)

## Snap

+   更多信息: [https://snapcraft.io/octave](https://snapcraft.io/octave)
+   开发: [https://github.com/octave-snap/octave-snap](https://github.com/octave-snap/octave-snap)

```bash
  snap install octave
```

如果您想使用 Octave 开发分支的每晚快照版本，请从 *edge* 渠道安装

```bash
  snap install --edge octave
```

## Spack

+   更多信息: [https://spack.readthedocs.io/](https://spack.readthedocs.io/)
+   开发: [https://github.com/spack/spack/blob/develop/var/spack/repos/builtin/packages/octave/package.py](https://github.com/spack/spack/blob/develop/var/spack/repos/builtin/packages/octave/package.py)

```bash
  spack install octave
```

# 从源码构建

*主条目: [构建](../development/build/building.md "构建")*

## 另见

+   [适用于其他类 Unix 系统的 Octave](unix.md "适用于其他类 Unix 系统的 Octave")

[分类](../Special%253ACategories.html "特殊:分类")：

+   [安装](../Category%253AInstallation.html "分类:安装")
+   [GNU/Linux](../Category%253AGNU/ "分类:GNU/Linux")