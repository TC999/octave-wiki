# Debian Systems

+   *This article addresses the [installation](Category%253AInstallation.html "Category:Installation") and [Building](../development/build/building.md "Building") of GNU Octave on Debian, and Debian-based distributions such as Ubuntu.*

## Contents

+   [1 Installing Octave](#Installing_Octave)
+   [2 Building Octave from source](#Building_Octave_from_source)
    +   [2.1 Install dependencies](#Install_dependencies)
        +   [2.1.1 The easy way (but likely incorrect)](#The_easy_way_\(but_likely_incorrect\))
        +   [2.1.2 The right way](#The_right_way)
    +   [2.2 Configuration](#Configuration)
        +   [2.2.1 Java](#Java)
        +   [2.2.2 HDF5](#HDF5)
        +   [2.2.3 Sundials](#Sundials)
+   [3 See also](#See_also)

## Installing Octave

Binary packages for GNU Octave and many [Octave Forge](Octave_Forge.html "Octave Forge") packages are provided by all versions of Debian and Ubuntu. These are the most well-tested binaries available and should work best for most users. To install them, run:

```
sudo apt-get install octave
```

In Debian and Ubuntu the "complete" GNU Octave software is split over multiple packages. To obtain the complete features of Octave, install additionally

+   `octave-doc`, `octave-info`, and `octave-htmldoc` for the documentation;
+   `octave-dev` (`liboctave-dev` in older Debian/Ubuntu) for the octave development header files and mkoctfile (required to install Octave Forge packages); and
+   `octave-dbg` for the debugging symbols.

Many Octave packages are also distributed by Debian and Ubuntu. These are tested to work the best with the respective Octave version. Install them via:

```
sudo apt-get install octave-control octave-image octave-io octave-optim octave-signal octave-statistics
```

Up to 2018, the [GNU Octave Team](https://launchpad.net/~octave) on Launchpad actively maintained a PPA providing more up to date packages of Octave. These were backported from Debian unstable and were useful for older Ubuntu installations (up to Xenial Xerus 16.04). To set up your system to install these packages, run:

```
sudo apt-add-repository ppa:octave/stable
sudo apt-get update
sudo apt-get install octave
```

## Building Octave from source

*For general build instructions, see [Building](../development/build/building.md "Building").*

The *only* tricky part is to install the Octave build dependencies. Once that is solved, one can easily follow the [general build instructions](../development/build/building.md "Building"). See [below](#Configuration) for some Debian and Ubuntu specific configuration options.

### Install dependencies

Note that different Debian and Ubuntu versions may have slightly different package names but their differences should be pretty small, mostly limited to version numbers.

#### The easy way (but likely incorrect)

This approach is *only* suitable if you are building from source the *same* version that your Linux distribution already has packaged.

The easy way to install *most* of the necessary dependencies is to `sudo apt-get build-dep octave`. This will install all packages necessary to build and prepare a Debian package for the octave version available on your system repositories. However:

+   will install unnecessary packages related to the building of a Debian package;
+   may miss some new dependencies;
+   may install packages that are no longer octave dependencies.

#### The right way

The right way is to install all the dependencies listed on the [Building](../development/build/building.md#Dependencies "Building") wiki page. One can either search for the respective packages manually on

+   [https://packages.debian.org](https://packages.debian.org)
+   [https://packages.ubuntu.com](https://packages.ubuntu.com)

or, for the sake of convenience, use some "one-liner" to install them:

+   **Ubuntu 24.04 (LTS)**

```
sudo apt install gcc g++ autoconf automake bison dvipng epstool fig2dev flex gfortran gnuplot-x11 gperf gzip icoutils libarpack2-dev libopenblas-dev libcurl4-gnutls-dev libfftw3-dev libfltk1.3-dev libfontconfig1-dev libfreetype-dev libgl1-mesa-dev libgl2ps-dev libglpk-dev libgraphicsmagick++1-dev libhdf5-dev liblapack-dev libosmesa6-dev libpcre2-dev libqhull-dev libqscintilla2-qt5-dev libqrupdate-dev libreadline-dev librsvg2-bin libsndfile1-dev libsuitesparse-dev libsundials-dev libtool libxft-dev make openjdk-11-jdk perl portaudio19-dev pstoedit qtbase5-dev qttools5-dev qttools5-dev-tools rapidjson-dev rsync tar texinfo texlive-latex-extra zlib1g-dev
```

Or to build the GUI with Qt6 (Octave 9 or later):

```
sudo apt install gcc g++ autoconf automake bison dvipng epstool fig2dev flex gfortran gnuplot-x11 gperf gzip icoutils libarpack2-dev libopenblas-dev libcurl4-gnutls-dev libfftw3-dev libfltk1.3-dev libfontconfig1-dev libfreetype-dev libgl1-mesa-dev libgl2ps-dev libglpk-dev libgraphicsmagick++1-dev libhdf5-dev liblapack-dev libosmesa6-dev libpcre2-dev libqhull-dev libqscintilla2-qt6-dev libqrupdate-dev libreadline-dev librsvg2-bin libsndfile1-dev libsuitesparse-dev libsundials-dev libtool libxft-dev make openjdk-11-jdk perl portaudio19-dev pstoedit qt6-5compat-dev qt6-base-dev qt6-tools-dev qt6-base-dev-tools rapidjson-dev rsync tar texinfo texlive-latex-extra zlib1g-dev
```

(Some of these packages might only be needed when building from a repository checkout.)

+   **Ubuntu 22.04 (LTS)**

```
sudo apt install gcc g++ autoconf automake bison dvipng epstool fig2dev flex gfortran gnuplot-x11 gperf gzip icoutils libarpack2-dev libbison-dev libopenblas-dev libcurl4-gnutls-dev libfftw3-dev libfltk1.3-dev libfontconfig1-dev libfreetype6-dev libgl1-mesa-dev libgl2ps-dev libglpk-dev libgraphicsmagick++1-dev libhdf5-dev liblapack-dev libosmesa6-dev libpcre3-dev libqhull-dev libqscintilla2-qt5-dev libqrupdate-dev libreadline-dev librsvg2-bin libsndfile1-dev libsuitesparse-dev libsundials-dev libtool libxft-dev make openjdk-8-jdk perl portaudio19-dev pstoedit qtbase5-dev qttools5-dev qttools5-dev-tools rapidjson-dev rsync tar texinfo texlive-latex-extra zlib1g-dev
```

(Some of these packages might only be needed when building from a repository checkout.)

+   **Ubuntu 20.04 (LTS)**

```
sudo apt-get install gcc g++ gfortran make libopenblas-dev liblapack-dev libpcre3-dev libarpack2-dev libcurl4-gnutls-dev epstool libfftw3-dev fig2dev libfltk1.3-dev libfontconfig1-dev libfreetype6-dev libgl2ps-dev libglpk-dev libreadline-dev gnuplot-x11 libgraphicsmagick++1-dev libhdf5-dev openjdk-11-jdk libsndfile1-dev llvm-dev texinfo libgl1-mesa-dev pstoedit portaudio19-dev libqhull-dev libqrupdate-dev libsuitesparse-dev texlive-latex-extra libxft-dev zlib1g-dev autoconf automake bison flex gperf gzip icoutils librsvg2-bin libtool perl rsync tar qtbase5-dev qttools5-dev qttools5-dev-tools libqscintilla2-qt5-dev libsundials-dev rapidjson-dev
```

[KaKiLa](User%253AKaKiLa.html "User:KaKiLa") ([talk](https://wiki.octave.org/wiki/index.php?title=User_talk:KaKiLa&action=edit&redlink=1 "User talk:KaKiLa (page does not exist)")) 03:34, 17 June 2020 (PDT) lpr conflict with cups-bsd

+   **Ubuntu 19.10**

```
sudo apt-get install gcc g++ gfortran make libopenblas-dev liblapack-dev libpcre3-dev libarpack2-dev libcurl4-gnutls-dev epstool libfftw3-dev fig2dev libfltk1.3-dev libfontconfig1-dev libfreetype6-dev libgl2ps-dev libglpk-dev libreadline-dev gnuplot-x11 libgraphicsmagick++1-dev libhdf5-dev openjdk-8-jdk libsndfile1-dev llvm-dev lpr texinfo libgl1-mesa-dev pstoedit portaudio19-dev libqhull-dev libqrupdate-dev libsuitesparse-dev texlive-latex-extra texlive-libxft-dev zlib1g-dev autoconf automake bison flex gperf gzip icoutils librsvg2-bin libtool perl rsync tar qtbase5-dev qttools5-dev qttools5-dev-tools libqscintilla2-qt5-dev libsundials-dev
```

+   **Ubuntu 18.04 (LTS)**

```
sudo apt-get install gcc g++ gfortran make libopenblas-dev liblapack-dev libpcre3-dev libarpack2-dev libcurl4-gnutls-dev epstool libfftw3-dev transfig libfltk1.3-dev libfontconfig1-dev libfreetype6-dev libgl2ps-dev libglpk-dev libreadline-dev gnuplot-x11 libgraphicsmagick++1-dev libhdf5-serial-dev openjdk-8-jdk libsndfile1-dev llvm-dev lpr texinfo libgl1-mesa-dev pstoedit portaudio19-dev libqhull-dev libqrupdate-dev libqscintilla2-dev libsuitesparse-dev texlive texlive-generic-recommended libxft-dev zlib1g-dev autoconf automake bison flex gperf gzip icoutils librsvg2-bin libtool perl rsync tar qtbase5-dev qttools5-dev qttools5-dev-tools libqscintilla2-qt5-dev
```

+   **Ubuntu 16.04 (LTS)**

```
sudo apt-get install gcc g++ gfortran make libopenblas-dev liblapack-dev libpcre3-dev libarpack2-dev libcurl4-gnutls-dev epstool libfftw3-dev transfig libfltk1.3-dev libfontconfig1-dev libfreetype6-dev libgl2ps-dev libglpk-dev libreadline-dev gnuplot-x11 libgraphicsmagick++1-dev libhdf5-serial-dev openjdk-8-jdk libsndfile1-dev llvm-dev lpr texinfo libgl1-mesa-dev libosmesa6-dev pstoedit portaudio19-dev libqhull-dev libqrupdate-dev libqscintilla2-dev libqt4-dev libqtcore4 libqtwebkit4 libqt4-network libqtgui4 libqt4-opengl-dev libsuitesparse-dev texlive libxft-dev zlib1g-dev autoconf automake bison flex gperf gzip icoutils librsvg2-bin libtool perl rsync tar
```

+   **Debian 13 (trixie)**

```
sudo apt install gcc g++ gfortran make libopenblas-dev liblapack-dev libpcre2-dev libarpack2-dev libcurl4-gnutls-dev epstool libfftw3-dev fig2dev libfltk1.3-dev libfontconfig1-dev libfreetype-dev libgl2ps-dev libglpk-dev libreadline-dev gnuplot libgraphicsmagick++1-dev libhdf5-dev openjdk-21-jdk libsndfile1-dev llvm-dev texinfo libgl1-mesa-dev libosmesa6-dev pstoedit portaudio19-dev libjack-jackd2-dev libqhull-dev libqrupdate-dev libqt5core5t64 qtbase5-dev qttools5-dev qttools5-dev-tools libqscintilla2-qt5-dev libsuitesparse-dev texlive texlive-latex-extra libxft-dev zlib1g-dev autoconf automake bison flex gperf gzip icoutils librsvg2-bin libtool perl rsync tar libsundials-dev git
```

+   **Debian 10**

```
sudo apt-get install gcc g++ gfortran make libopenblas-dev liblapack-dev libpcre3-dev libarpack2-dev libcurl4-gnutls-dev epstool libfftw3-dev fig2dev libfltk1.3-dev libfontconfig1-dev libfreetype6-dev libgl2ps-dev libglpk-dev libreadline-dev gnuplot libgraphicsmagick++1-dev libhdf5-dev openjdk-11-jdk libsndfile1-dev llvm-dev texinfo libgl1-mesa-dev libosmesa6-dev pstoedit portaudio19-dev libjack-jackd2-dev libqhull-dev libqrupdate-dev libqt5core5a qtbase5-dev qttools5-dev qttools5-dev-tools libqscintilla2-qt5-dev libsuitesparse-dev texlive texlive-latex-extra libxft-dev zlib1g-dev autoconf automake bison flex gperf gzip icoutils librsvg2-bin libtool perl rsync tar libsundials-dev git
```

+   **Debian 9**

```
sudo apt-get install gcc g++ gfortran make libopenblas-dev liblapack-dev libpcre3-dev libarpack2-dev libcurl4-gnutls-dev epstool libfftw3-dev transfig libfltk1.3-dev libfontconfig1-dev libfreetype6-dev libgl2ps-dev libglpk-dev libreadline-dev gnuplot libgraphicsmagick++1-dev libhdf5-serial-dev openjdk-8-jdk libsndfile1-dev llvm-dev texinfo libgl1-mesa-dev libosmesa6-dev pstoedit portaudio19-dev libjack-jackd2-dev libqhull-dev libqrupdate-dev libqscintilla2-dev libqt4-dev libqtcore4 libqtwebkit4 libqt4-network libqtgui4 libqt4-opengl-dev libsuitesparse-dev texlive libxft-dev zlib1g-dev autoconf automake bison flex gperf gzip icoutils librsvg2-bin libtool perl rsync tar
```

+   **Debian 8**

```
sudo apt-get install gcc g++ gfortran make libopenblas-dev liblapack-dev libpcre3-dev libarpack2-dev libcurl4-gnutls-dev epstool libfftw3-dev transfig libfltk1.3-dev libfontconfig1-dev libfreetype6-dev libgl2ps-dev libglpk-dev libreadline-dev gnuplot libgraphicsmagick++1-dev libhdf5-serial-dev openjdk-7-jdk libsndfile1-dev llvm-dev lpr texinfo libgl1-mesa-dev libosmesa6-dev pstoedit portaudio19-dev libqhull-dev libqrupdate-dev libqscintilla2-dev libqt4-dev libqtcore4 libqtwebkit4 libqt4-network libqtgui4 libqt4-opengl-dev libsuitesparse-dev texlive libxft-dev zlib1g-dev autoconf automake bison flex gperf gzip icoutils librsvg2-bin libtool perl rsync tar
```

  

![Warning icon.svg](../../assets/warning/26px-Warning_icon.svg.png)

+   The Debian repositoriy has several libraries for dealing with HDF data files. The recommended is `libhdf5-serial-dev`. However, the [msh package](https://octave.sourceforge.io/msh/index.html) requires [gmsh](http://www.geuz.org/gmsh/) which is incompatible with it.
+   The GraphicsMagick++ library (libgraphicsmagick++1-dev) on the Debian repositories was compiled with quantum 8 which limits reading images to 8 bit. The solution is to recompile [GraphicsMagick](GraphicsMagick.html "GraphicsMagick") with quantum 16 or 32 before building Octave.
+   For debian9 using openjdk-9-jdk (even providing `JAVA_HOME`) could \*not\* be used for the java interface! Use openjdk-8-jdk instead.
+   When configure decides to use QT5 instead of QT4, make might fail because lrelease is missing (see [bug 50580](https://savannah.gnu.org/bugs/?50580)). It can be fixed by installing `qttools5-dev-tools`

### Configuration

Some Debian and Ubuntu specific configure tweaks are listed below:

#### Java

Autodetection for Java should work well on Debian-based systems. A specific Java version can be specified by passing `JAVA_HOME` to configure, for example

```
./configure JAVA_HOME=/usr/lib/jvm/java-7-openjdk-amd64
```

#### HDF5

On current versions of Debian and Ubuntu, you may get the following warning when building an older version of Octave from source:

```
HDF5 library not found.  Octave will not be able to save or load HDF5 data files.
```

The problem is that there are multiple versions of the hdf5 package. Octave was written with the serial version in mind but it is likely to work with the others (OpenMPI and Mpich). Due to the naming scheme done in Debian, it may be required to specify the location of the libraries. See bug [#38928](https://savannah.gnu.org/bugs/?38928) for details (starting with comment #19) but basically, use the following when running configure:

```
./configure --with-hdf5-includedir=/usr/include/hdf5/serial --with-hdf5-libdir=/usr/lib/$(dpkg-architecture -qDEB_HOST_MULTIARCH)/hdf5/serial
```

On older versions of Debian and Ubuntu, where only one flavor of the HDF5 library could be installed at a time, you may need to build Octave against one of the MPI-enabled flavors. On these older systems, configuring Octave like this may work:

```
./configure CPPFLAGS="-I/usr/include/mpi -DMPICH_SKIP_MPICXX -DOMPI_SKIP_MPICXX"
```

#### Sundials

On recent Debian and Ubuntu releases whose Sundials version (in `libsundials-dev`) is 3.1, a configure flag needs to be passed for `ode15i` and `ode15s` to be compiled with support for sparse Jacobians (bug [#55937](https://savannah.gnu.org/bugs/?55937)), as follows:

```
./configure CPPFLAGS="-I/usr/include/suitesparse"
```

## See also

+   [MXE](MXE.html "MXE") -- a more customized Octave build including many self-compiled tools.

[Categories](Special%253ACategories.html "Special:Categories"):

+   [Building](Category%253A../development/build/building.md "Category:Building")
+   [Installation](Category%253AInstallation.html "Category:Installation")
+   [GNU/Linux](Category%253AGNU/Linux.html "Category:GNU/Linux")