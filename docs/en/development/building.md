# Building

> This article provides general information about **building GNU Octave** from source (on Unix-like systems).

+   *If you just want to **install GNU Octave**, see [Category:Installation](../install "Category:Installation").*
+   *For **MS Windows**, read [Building on Microsoft Windows](build_on_Windows.md "Building on Microsoft Windows") and [Windows Installer](windows_installer.md "Windows Installer").*
+   *For **macOS**, read [Octave for macOS](../install/macOS.md "Octave for macOS").*

## Contents

+   [1 General steps](#General_steps)
+   [2 Dependencies](#Dependencies)
    +   [2.1 Build tools](#Build_tools)
    +   [2.2 Documentation tools](#Documentation_tools)
    +   [2.3 External tools and libraries](#External_tools_and_libraries)
+   [3 Tweaks](#Tweaks)
    +   [3.1 Install Octave in home directory](#Install_Octave_in_home_directory)
    +   [3.2 Uninstall](#Uninstall)
    +   [3.3 Large array support](#Large_array_support)
+   [4 See also](#See_also)
+   [5 Footnotes](#Footnotes)

## General steps

1.  Install all [build dependencies](#Dependencies) (see below).
2.  Getting the Octave sources ...

(A) ... from the development repository (requires also [Mercurial](https://www.mercurial-scm.org/))

```bash
  hg clone https://www.octave.org/hg/octave && \
  cd octave                                  && \
  ./bootstrap
```

(B) ... from a release

```bash
wget https://ftpmirror.gnu.org/octave/octave-10.3.0.tar.gz && \
tar -xzf octave-10.3.0.tar.gz                               && \
cd octave-10.3.0
```

3\. Configure, build, check, and install Octave

```bash
mkdir .build                            && \
cd    .build                            && \
./../configure --prefix=$HOME/my_octave && \ [1]
make -j2                                && \ [2]
make check                              && \
make install
```

## Dependencies

Most of the dependencies given in this section can be very conveniently installed on many [GNU/Linux](../install/Linux.md "Octave for GNU/Linux") systems.

![Info icon.svg](../../assets/info/26px-Info_icon.svg.png)

For a quick way to install the required dependencies, see:

+   [Debian / Ubuntu](../install/debian.md#The_right_way "Octave for Debian systems")
+   [Arch Linux](../install/ArchLinux.md "Octave for Arch Linux")
+   [Fedora / RedHat / CentOS](../install/RedHat.md "Octave for Red Hat Linux systems")

Dependencies marked with green background are **required** for building Octave. All other tools and libraries are recommended/optional, but very useful features (like the GUI, plotting, etc.) are likely to be disabled.

### Build tools

| Dependency | Description | License / Copyright |
| --- | --- | --- |
| [Autoconf](https://www.gnu.org/software/autoconf) | Software configuration | GNU GPL v3.0 |
| [Automake](https://www.gnu.org/software/automake) | Makefile generator | GNU GPL v3.0 |
| [C++, C, and Fortran compilers](https://gcc.gnu.org) | Compiling the source code | GNU GPL v3.0 |
| [GNU Make](https://www.gnu.org/software/make) | Makefile processor | GNU GPL v3.0 |
| [Libtool](https://www.gnu.org/software/libtool) | Dependency of automake | Free Software Foundation |
| Unix utilities: gawk, gperf, less, ncurses | Miscellaneous tasks | GNU GPL v3.0 |
| [Bison](https://www.gnu.org/software/bison) | Parser generator | GNU GPL v3.0 |
| [Flex](https://www.gnu.org/software/flex) | Lexical analyzer | The Flex project |

### Documentation tools

| Dependency | Description | License / Copyright |
| --- | --- | --- |
| [epstool](http://www.ghostgum.com.au/software/epstool.htm) | Epstool is a utility to create or extract preview images in EPS files, fix bounding boxes and convert to bitmaps. | GNU GPL v2.0 |
| [FTGL](https://www.freetype.org) | Portable font engine to perform font rendering for Octave’s OpenGL-based graphics functions. | GNU GPL v2.0 |
| [GL2PS](http://geuz.org/gl2ps) | GL2PS is a C library providing high quality vector output for any OpenGL application. | GNU LGPL v2.0 |
| [Texi2HTML](https://www.nongnu.org/texi2html) | Perl script which converts Texinfo source files to HTML output. | GNU GPL v3.0 |
| [Texinfo](https://www.gnu.org/software/texinfo) | Documentation system that uses a single source to produce both on-line information and printed output. | GNU GPL v3.0 |
| [TeX Live](https://www.tug.org/texlive/) | TeX document production system including all the major TeX-related programs, macro packages, and fonts that are free software. | Freely redistributable as defined by the Free Software Foundation |

### External tools and libraries

| Dependency | Description | License / Copyright |
| --- | --- | --- |
| [BLAS](https://www.netlib.org/blas) | Basic Linear Algebra Subroutine library | Free - proper attribution request |
| [LAPACK](https://netlib.org/lapack) | Linear Algebra Package | Free - proper attribution request |
| [PCRE](https://www.pcre.org) | Perl Compatible Regular Expression library | Free |
| [GNU Readline](https://www.gnu.org/software/readline) | Command-line editing library | GNU GPL v3.0 |
| [ARPACK-NG](https://github.com/opencollab/arpack-ng) | Solution of large-scale eigenvalue problems | BSD like - various authors |
| [cURL](https://curl.haxx.se) | Library for transferring data with URL syntax | Free Software -- main author |
| [FFTW3](http://www.fftw.org) | Library for computing discrete Fourier transforms | MIT -- GNU GPL v2.0 |
| [FLTK](https://www.fltk.org) | Portable GUI toolkit | GNU GPL v2.0 with static linking exception |
| [fontconfig](https://www.freedesktop.org/wiki/Software/fontconfig) | Library for configuring and customizing font access | Provided "as is" -- various authors |
| [FreeType](https://www.freetype.org) | Portable font engine | compatible with GNU GPL v3.0 |
| [GL2PS](https://www.geuz.org/gl2ps/) | OpenGL to PostScript printing library | GNU GPL v2.0 |
| [GLPK](https://www.gnu.org/software/glpk) | GNU Linear Programming Kit | GNU GPL v3.0 |
| [gnuplot](http://www.gnuplot.info) | Interactive graphics program | Provided "as is" -- various authors |
| Magick++, e.g. [GraphicsMagick++](http://www.graphicsmagick.org) | Image processing library | various -- integrates many third-party libs |
| [HDF5](https://www.hdfgroup.org/solutions/hdf5) | Library for manipulating portable data files | BSD - like |
| JDK, e.g. [OpenJDK](https://www.hdfgroup.org/solutions/hdf5) | Java programming language compiler and libraries | GNU GPL v2.0 |
| [OpenGL](https://www.opengl.org) | API for portable 2D and 3D graphics | Free specs -- license is driver dependent |
| [PortAudio](http://www.portaudio.com/) | Audio I/O library | Free software -- specific |
| [Qhull](http://www.qhull.org) | Computational geometry library | Free software -- specific |
| [QRUPDATE](http://sourceforge.net/projects/qrupdate) | QR factorization updating library | GNU GPL v3.0 |
| [QScintilla](https://riverbankcomputing.com/software/qscintilla) | Source code highlighter and manipulator; a Qt port of Scintilla | GNU GPL v3.0 |
| [Qt](https://www.qt.io/) | Widget toolkit for creating graphical user interfaces | GNU LGPL v3.0 |
| [RapidJSON](https://rapidjson.org/) | A fast JSON parser/generator for C++ with both SAX/DOM style API | MIT license |
| [SuiteSparse](http://faculty.cse.tamu.edu/davis/suitesparse.html) | Sparse matrix factorization library | Main author |
| [SUNDIALS IDA](https://computing.llnl.gov/projects/sundials/ida) | SUite of Nonlinear and DIfferential/ALgebraic equation Solvers - Initial value problems for Differential-Algebraic equation (DAE) systems | BSD 3-Clause |
| [zlib](https://zlib.net) | Data compression library | Provided "as is" -- various authors |

## Tweaks

### Install Octave in home directory

To install multiple versions of GNU Octave on one system, it is recommended to use the `--prefix` option of the `configure` script. With this option one can determine a custom installation directory, preferably within your user's home directory, to avoid elevated installation privileges. One does not "clutter" the system by running `sudo make install` and the custom build Octave can coexist with, for example, your Linux distribution installation of Octave.

In order to start the custom build of Octave almost as convenient as the Linux distribution installation of Octave, one can create an alias within .bashrc:

```bash
echo "alias myoctave='$HOME/my_octave/bin/octave'" >> ~/.bashrc
```

Then update your .bashrc without doing logout and login:

```bash
source $HOME/.bashrc
```

If you simply enter `octave`, you'll start your Linux distribution installation of Octave. But when you enter `myoctave`, you'll start your custom build of Octave inside your home directory.

### Uninstall

1.  If you still have the .build folder, just run `make uninstall` from it.
2.  Just delete the install folder, e.g. `rm -rf $HOME/my_octave`.

In any case, don't forget to remove any created *alias* entries in ~/.bashrc.

### Large array support

*Main article: [Enable large arrays: Build octave such that it can use arrays larger than 2Gb.](Enable_large_arrays%253A_Build_octave_such_that_it_can_use_arrays_larger_than_2Gb..html "Enable large arrays: Build octave such that it can use arrays larger than 2Gb.")*

## See also

+   [`README`](https://hg.savannah.gnu.org/hgweb/octave/file/tip/README) and [`/etc/HACKING.md`](https://hg.savannah.gnu.org/hgweb/octave/file/tip/etc/HACKING.md) in the development repository.
+   [https://octave.org/doc/interpreter/Installation.html](https://octave.org/doc/interpreter/Installation.html)
+   [MXE](mxe.md "MXE") -- a more customized Octave build including many self-compiled tools.

## Footnotes

1.  [↑](#cite_ref-1) `--prefix` determines the installation location, see the [Tweaks section](#Install_Octave_in_home_directory) for details. For more information about configuration options, type `./../configure --help`.
2.  [↑](#cite_ref-2) Depending on your system and processor count, use a larger number of parallel jobs, e.g. `-j8`.

[Category](Special%253ACategories.html "Special:Categories"):

+   [Building](Category%253A "Category:Building")