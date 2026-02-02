# GNU/Linux

## Contents

+   [1 Distributions](#Distributions)
    +   [1.1 Arch Linux](#Arch_Linux)
    +   [1.2 Debian and Debian-based (such as Ubuntu)](#Debian_and_Debian-based_\(such_as_Ubuntu\))
    +   [1.3 Fedora](#Fedora)
    +   [1.4 Gentoo](#Gentoo)
    +   [1.5 openSUSE and SUSE Linux Enterprise](#openSUSE_and_SUSE_Linux_Enterprise)
    +   [1.6 Red Hat Enterprise/CentOS](#Red_Hat_Enterprise/CentOS)
    +   [1.7 Slackware](#Slackware)
+   [2 Distribution independent](#Distribution_independent)
    +   [2.1 Anaconda](#Anaconda)
    +   [2.2 Docker / Podman / Singularity](#Docker_/_Podman_/_Singularity)
        +   [2.2.1 mtmiller's version](#mtmiller's_version)
    +   [2.3 Flatpak](#Flatpak)
    +   [2.4 Guix](#Guix)
    +   [2.5 Homebrew on Linux](#Homebrew_on_Linux)
    +   [2.6 MXE](#MXE)
    +   [2.7 Snap](#Snap)
    +   [2.8 Spack](#Spack)
+   [3 Building from source](#Building_from_source)
    +   [3.1 See also](#See_also)

# Distributions

The recommended way for installing Octave on GNU/Linux systems is via each distribution's package installation system. If this is for some reason not possible, or the available Octave version too old, consider using a [distribution independent](#Distribution_independent) approach described below or [build Octave from source](../Building.html "Building").

## Arch Linux

*Main article: [Octave for Arch Linux](../Octave_for_Arch_ "Octave for Arch Linux")*

```
pacman -S octave
```

## Debian and Debian-based (such as Ubuntu)

*Main article: [Octave for Debian systems](../Octave_for_Debian_systems.html "Octave for Debian systems")*

```
apt install octave
apt install octave-dev  # development files; liboctave-dev in older releases
```

## Fedora

*Main article: [Octave for Red Hat Linux systems](../Octave_for_Red_Hat_Linux_systems.html "Octave for Red Hat Linux systems")*

```
dnf install octave
dnf install octave-devel  # development files
```

## Gentoo

```
emerge --ask sci-mathematics/octave
```

## openSUSE and SUSE Linux Enterprise

*Main article: [Octave for openSUSE](../Octave_for_openSUSE.html "Octave for openSUSE")*

```
zypper install octave
zypper install octave-devel  # development files
```

## Red Hat Enterprise/CentOS

*Main article: [Octave for Red Hat Linux systems](../Octave_for_Red_Hat_Linux_systems.html "Octave for Red Hat Linux systems")*

```
yum install epel-release
yum install octave
yum install octave-devel  # development files
```

If the above does not work, follow [these instructions](https://fedoraproject.org/wiki/EPEL#How_can_I_use_these_extra_packages.3F) to set up your system to install packages from EPEL.

## Slackware

*Main article: [Octave for Slackware](../Octave_for_Slackware.html "Octave for Slackware")*

# Distribution independent

Using a distribution independent approach is particularly useful if you have an older GNU/Linux distribution or if you do not have root access on your system. A common drawback of this approach is, that these solutions are running in some kind of sandbox. Thus limitations in the communication with the underlying system may exist. For example, executing system binaries outside the sandbox might be impossible.

## Anaconda

+   More info: [https://anaconda.org/conda-forge/octave](https://anaconda.org/conda-forge/octave)

```
 conda create --name octave
 conda activate octave
 conda install -c conda-forge octave
```

## Docker / Podman / Singularity

+   More info: [https://hub.docker.com/r/gnuoctave/octave](https://hub.docker.com/r/gnuoctave/octave)
+   Development: [https://github.com/gnu-octave/docker](https://github.com/gnu-octave/docker)

```
docker pull docker.io/gnuoctave/octave:10.3.0
podman pull docker.io/gnuoctave/octave:10.3.0
```

```
singularity pull docker://gnuoctave/octave:10.3.0
```

### mtmiller's version

+   More info: [https://hub.docker.com/r/mtmiller/octave](https://hub.docker.com/r/mtmiller/octave)
+   Development: [https://gitlab.com/mtmiller/docker-octave](https://gitlab.com/mtmiller/docker-octave)

```
docker pull docker.io/mtmiller/octave
```

## Flatpak

+   More info: [https://flathub.org/apps/details/org.octave.Octave](https://flathub.org/apps/details/org.octave.Octave)
+   Development: [https://github.com/flathub/org.octave.Octave](https://github.com/flathub/org.octave.Octave)

```
flatpak install flathub org.octave.Octave
```

## Guix

+   More info: [https://packages.guix.gnu.org/packages/octave/9.1.0/](https://packages.guix.gnu.org/packages/octave/9.1.0/)

```
guix install octave
```

## Homebrew on Linux

"Homebrew on Linux" was formerly a fork known as Linuxbrew. It is possible to install the current release of Octave or the development version and any needed dependencies within your home directory.

+   More info: [https://docs.brew.sh/Homebrew-on-Linux](https://docs.brew.sh/Homebrew-on-Linux)
+   Development: [https://formulae.brew.sh/formula/octave](https://formulae.brew.sh/formula/octave)

```
brew install octave
```

## MXE

+   More info: [MXE](../MXE.html "MXE")
+   Development: [https://hg.octave.org/mxe-octave](https://hg.octave.org/mxe-octave)

## Snap

+   More info: [https://snapcraft.io/octave](https://snapcraft.io/octave)
+   Development: [https://github.com/octave-snap/octave-snap](https://github.com/octave-snap/octave-snap)

```
snap install octave
```

If you want to use a nightly snapshot build of the development branch of Octave, install from the *edge* channel

```
snap install --edge octave
```

## Spack

+   More info: [https://spack.readthedocs.io/](https://spack.readthedocs.io/)
+   Development: [https://github.com/spack/spack/blob/develop/var/spack/repos/builtin/packages/octave/package.py](https://github.com/spack/spack/blob/develop/var/spack/repos/builtin/packages/octave/package.py)

```
spack install octave
```

# Building from source

*Main article: [Building](../Building.html "Building")*

## See also

+   [Octave for other Unix systems](../Octave_for_other_Unix_systems.html "Octave for other Unix systems")

Retrieved from "[https://wiki.octave.org/wiki/index.php?title=Octave\_for\_GNU/Linux&oldid=15446](https://wiki.octave.org/wiki/index.php?title=Octave_for_GNU/Linux&oldid=15446)"

[Categories](../Special%253ACategories.html "Special:Categories"):

+   [Installation](../Category%253AInstallation.html "Category:Installation")
+   [GNU/Linux](../Category%253AGNU/ "Category:GNU/Linux")