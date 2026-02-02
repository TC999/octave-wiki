# Red Hat Linux systems

For RedHat-based distributions like RedHat, CentOS, Fedora, Scientific Linux, ...

## Contents

+   [1 Generic RedHat](#Generic_RedHat)
+   [2 CentOS](#CentOS)
    +   [2.1 Prepare installation of Octave](#Prepare_installation_of_Octave)
    +   [2.2 Compiling Octave from source](#Compiling_Octave_from_source)
    +   [2.3 Installing using snap](#Installing_using_snap)
+   [3 Redhat Enterprise Linux workstation 6.4-2.6.32-358](#Redhat_Enterprise_Linux_workstation_6.4-2.6.32-358)

### Generic RedHat

Tested Fedora 33, but not completely.

```bash
  dnf install libtool make automake autoconf gcc gcc-devel \
  g++ g++-devel gcc-fortran gawk gperf less ncurses
```

Tested Fedora 20, but not completely.

```bash
  yum install gcc gcc-c++ kernel-devel make mercurial libtool libtool-ltdl-devel libtool-ltdl autoconf cmake lapack-devel \
  lapack pcre-devel readline-devel readline fftw-devel glpk-devel suitesparse suitesparse-devel gnuplot libcurl-devel zlib-devel \
  flex texlive gperf fltk-devel qhull-devel hdf5-devel gl2ps-devel qrupdate-devel arpack-devel qscintilla-devel llvm-devel qt-devel \
  bison ghostscript-devel librsvg2-tools icoutils texlive-metapost
```

### CentOS

Enable use of [Extra Packages for Enterprise Linux (EPEL)](https://fedoraproject.org/wiki/EPEL) AND THEN install octave dependencies development packages:

```bash
   yum -y install yum-utils
   yum-builddep -y octave
   yum -y install qt-devel mercurial gcc-c++ lapack-devel libtool
   yum -y install epstool transfig pstoedit qscintilla-devel
```

The arpack-devel package distributed with CentOS 7 (arpack-devel-3.1.3-2.el7.x86\_64) seems a bit old, as routine "seupdate" seems not recognized during the "configure" step. This can be solved by installing arpack from github:

```bash
   git clone git@github.com:opencollab/arpack-ng.git
   cd arpack-ng
   ./bootstrap
   ./configure --prefix="some local prefix"
   make; make install
```

Current release as of Aug. 20th 2018 seems to compile OK with CentOS blas-devel

##### Prepare installation of Octave

The remaining steps do not need to be done as root, except for possibly the final installation step. I recommend you create an installation directory like /usr/local/octave/VERSION so that it is easy to uninstall a given version simply by removing a directory tree. Then to use the installed version, put /usr/local/octave/VERSION/bin in your PATH. If you create the /usr/local/octave/VERSION directory with appropriate permissions, it is not necessary to be root to install Octave. For example,

```bash
   mkdir -p /usr/local/octave/dev
   chown jwe.jwe /usr/local/octave/dev
```

create src and build directories:

```bash
   mkdir src build
```

##### Compiling Octave from source

Check out a copy of the octave sources in the src directory

```bash
   cd src
   hg clone http://hg.savannah.gnu.org/hgweb/octave
```

+   bootstrap the build system

```bash
   cd octave
   ./bootstrap
```

+   build Octave in the build directory. choose whatever prefix is appropriate for your system. the -jN option builds in parallel

```bash
   cd ../../build
   ../src/octave/configure --prefix=/usr/local/octave/dev
   make -j6 all
```

+   Run the test suite

```bash
   make check
```

+   If everything looks OK (a few failures are probably normal for the development version) install it

```bash
   make install
```

#### Installing using snap

[https://snapcraft.io/install/octave/centos](https://snapcraft.io/install/octave/centos) - Easiest way to install.

+   Enable snapd. Snap is available for CentOS 7.6+, and Red Hat Enterprise Linux 7.6+, from the Extra Packages for Enterprise Linux (EPEL) repository. The EPEL repository can be added to your system with the following command:

```bash
   sudo yum install epel-release
```

+   Snap can now be installed as follows:

```bash
   sudo yum install snapd
```

+   Once installed, the systemd unit that manages the main snap communication socket needs to be enabled:

```bash
   sudo systemctl enable --now snapd.socket
```

+   To enable classic snap support, enter the following to create a symbolic link between /var/lib/snapd/snap and /snap:

```bash
   sudo ln -s /var/lib/snapd/snap /snap
```

Either log out and back in again, or restart your system, to ensure snap’s paths are updated correctly.

+   Install octave. To install octave, simply use the following command:

```bash
   sudo snap install octave
```

### Redhat Enterprise Linux workstation 6.4-2.6.32-358

Use the rpms to install octave version: 3.4.3

```bash
  yum install gnuplot
```

+   Download and install lcms

```bash
  rpm -ivh lcms2-2.8-6.el6.x86_64.rpm
```

+   Download and install libwmf

```bash
  rpm -ivh libwmf-lite-0.2.8.4-25.el6_7.x86_64.rpm
```

+   Download GraphicsMagick and GraphicsMagick-c++ and install them

```bash
  rpm -ivh GraphicsMagick-1.3.32-1.el6.x86_64.rpm
  rpm -ivh GraphicsMagick-c++-1.3.32-1.el6.x86_64.rpm
```

+   Install suitesparse

```bash
yum install suitesparse
```

+   Install fftw3

```bash
  yum install fftw
```

```bash
  yum install glpk
```

+   Download and install fltk

```bash
  rpm -ivh fltk-1.1.10-1.el6.x86_64.rpm
```

+   Download and install hdf5

```bash
  rpm -ivh hdf5-1.8.5.patch1-10.el6.x86_64.rpm
```

+   Download and install qhull

```bash
  rpm -ivh qhull-2003.1-14.el6.x86_64.rpm
```

+   Install blas

```bash
  yum install blas
```

+   Download and install qrupdate

```bash
  rpm -ivh qrupdate-1.1.2-1.el6.x86_64.rpm
```

+   Install texinfo

```bash
  yum install texinfo
```

+   Lastly, install octave

```bash
  rpm -ivh octave-3.4.3-2.el6.x86_64.rpm
```

[Categories](Special%253ACategories.html "Special:Categories"):

+   [GNU/Linux](Category%253AGNU/Linux.html "Category:GNU/Linux")
+   [Installation](Category%253AInstallation.html "Category:Installation")