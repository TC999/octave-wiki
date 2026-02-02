# OpenSUSE

## Contents

+   [1 Installation](#Installation)
    +   [1.1 The science repository](#The_science_repository)
+   [2 Octave Forge packages](#Octave_Forge_packages)
+   [3 Linear algebra libraries](#Linear_algebra_libraries)
+   [4 Image export and import](#Image_export_and_import)
+   [5 Bug reporting](#Bug_reporting)
+   [6 See also](#See_also)

### Installation

Octave binary packages are provided from the OSS repository of all recent openSUSE versions. Octave can be installed using [One Click Install](https://software.opensuse.org/package/octave), YaST, or the zypper command:

```bash
  zypper install octave
```

It is recommended to additionally install the development files. They are required, for installing [Octave Forge](#Octave_Forge_packages) packages outside openSUSE's OSS repository or to create applications using Octave.

```bash
  zypper install octave-devel
```

#### The science repository

If you want to use **latest stable version of Octave**, you can obtain the binary packages via [One Click Install](https://software.opensuse.org/download.html?project=science&package=octave) from the science repository.

To add the science repository manually, use the zypper commands (`<openSUSE_version>` is for example `openSUSE_Leap_15.1`):

```bash
  zypper addrepo http://download.opensuse.org/repositories/science/<openSUSE_version>/science.repo
  zypper refresh
```

And to install Octave from the science repository type:

```bash
  zypper install --from science octave
```

### Octave Forge packages

[Octave Forge](Octave_Forge.html "Octave Forge") binary packages are provided from the OSS and science repository. You can list all available packages by the zypper command:

```bash
  zypper search octave-forge*
```

### Linear algebra libraries

openSUSE uses reference BLAS and LAPACK implementations by default, but ATLAS or OpenBLAS are usually much faster. You can switch it by update-alternatives mechanism:

```bash
  /usr/sbin/update-alternatives --config libblas.so.3
```

```bash
  /usr/sbin/update-alternatives --config liblapack.so.3
```

Example:

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

See [linear algebra libraries page](https://en.opensuse.org/openSUSE:Science_Linear_algebra_libraries) at openSUSE wiki for more information.

### Image export and import

GraphicsMagick++ library from openSUSE repositories was compiled with quantum depth 16 which limits reading and writing images to 16 bit. See more details on [GraphicsMagick](GraphicsMagick.html "GraphicsMagick") wiki page.

### Bug reporting

You can report openSUSE specific bugs by pressing "Report Bug" button on [OBS Octave page](https://build.opensuse.org/package/show/science/octave) (openSUSE bugzilla account required).

### See also

+   [https://en.opensuse.org/Octave](https://en.opensuse.org/Octave)

[Categories](Special%253ACategories.html "Special:Categories"):

+   [GNU/Linux](Category%253AGNU/Linux.html "Category:GNU/Linux")
+   [Installation](Category%253AInstallation.html "Category:Installation")