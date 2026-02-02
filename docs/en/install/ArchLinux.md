# ArchLinux

## Contents

+   [1 Installing Octave](#Installing_Octave)
+   [2 Building Octave from source](#Building_Octave_from_source)
+   [3 Building the documentation](#Building_the_documentation)
+   [4 See also](#See_also)

## Installing Octave

To simply install the latest stable release of GNU Octave on Arch Linux, just execute (as root):

```bash
pacman -S octave
```

Using [AUR](https://aur.archlinux.org/), one can install a development version of Octave, for example [octave-hg](https://aur.archlinux.org/packages/octave-hg/?comments=all). If you encounter any problems during the build process, some problems and solutions are listed in the comments on AUR. New dependencies are easy to extract from the PKGBUILD.

## Building Octave from source

*For general build instructions, see [Building](Building.html "Building").*

To install the Octave build dependencies on Arch Linux, just execute (as root):

```bash
pacman -S --needed base-devel pcre mercurial gcc-fortran gperf perl rsync transfig arpack curl rapidjson fftw fltk glpk glu graphicsmagick qt6-base qt6-tools hdf5 java-environment qhull qscintilla-qt6 texinfo gnuplot llvm texlive-bin icoutils gl2ps qrupdate 
```

  
You would also need the package epstool. This is a user contributed package, and is not available in the official repositories. Rather, it should be installed from the AUR. There are several methods to do this. One of them is to use yay which is an AUR helper.

Install yay:

```bash
  pacman -S yay
```

Install epstool with yay:

```bash
  yay -S epstool
```

## Building the documentation

If you wish to build the Octave documentation, install the following packets too:

```bash
  pacman -S graphviz doxygen
```

## See also

+   [https://wiki.archlinux.org/index.php/Octave](https://wiki.archlinux.org/index.php/Octave)

[Categories](Special%253ACategories.html "Special:Categories"):

+   [Building](Category%253ABuilding.html "Category:Building")
+   [GNU/Linux](Category%253AGNU/Linux.html "Category:GNU/Linux")
+   [Installation](Category%253AInstallation.html "Category:Installation")