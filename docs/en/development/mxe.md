# MXE

[MXE-Octave](https://hg.octave.org/mxe-octave) was forked 2012 from the [MXE project](https://mxe.cc/) and is useful for building Octave in the following scenarios[\[1\]](#cite_note-1):

1.  Cross-compilation for MS Windows (see also [Windows Installer](Windows_Installer.html "Windows Installer")) and other platforms.
2.  Building Octave on outdated Linux systems (e.g. only an old GCC version is available).
3.  Building Octave without root permission.

[![Warning icon.svg](wiki/images/thumb/2/24/Warning_icon.svg/26px-Warning_icon.svg.png)](File%253AWarning_icon.svg.html)

MXE-Octave is **not** the best choice for building Octave, if your system already provides recent versions of GCC and other required build dependencies. See [Category:Installation](Category%253AInstallation.html "Category:Installation") for other install options.

## Contents

+   [1 Example of compiling MXE-Octave](#Example_of_compiling_MXE-Octave)
    +   [1.1 Preparation](#Preparation)
    +   [1.2 Configuration](#Configuration)
    +   [1.3 Build](#Build)
    +   [1.4 Replace reference BLAS by OpenBLAS](#Replace_reference_BLAS_by_OpenBLAS)
    +   [1.5 Run](#Run)
+   [2 Known issues](#Known_issues)
    +   [2.1 gnuplot](#gnuplot)
    +   [2.2 Build errors on older systems](#Build_errors_on_older_systems)
+   [3 References](#References)

### Example of compiling MXE-Octave

#### Preparation

1.  [Install all requirements of MXE Octave](Windows_Installer.html#Installing_requirements_of_MXE_Octave "Windows Installer").
2.  Decide for an installation directory (e.g. ~/mxe-octave).
3.  `cd ~`
4.  `hg clone [https://hg.octave.org/mxe-octave](https://hg.octave.org/mxe-octave) mxe-octave`
5.  `cd mxe-octave`
6.  `./bootstrap`

#### Configuration

For a comprehensive list of configuration options with a short explanation, type `./configure --help`. See also the [known issues](#Known_issues) below.

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

#### Build

`make -j3 JOBS=2 all openblas` Adapt the values of the variables `-j` (parallel package builds) and `JOBS` (parallel build jobs) to your needs.

#### Replace reference BLAS by OpenBLAS

In general using the [OpenBLAS](https://www.openblas.net/) library results in faster matrix-vector operations compared to the reference BLAS library.

1.  `cd ~/mxe-octave/usr/lib`
2.  `mv libblas.so libblas.so.reference`
3.  `ln -s libopenblas.so libblas.so`

#### Run

1.  MXE-Octave will exist in ~/mxe-octave/usr/bin
2.  Add the command `octave` as alias to your .bashrc file: `alias octave=~/mxe-octave/usr/bin/octave`
3.  Start MXE-Octave by typing `octave`.

### Known issues

#### gnuplot

The gnuplot built by MXE-Octave does not support cairo based terminals and lua/tikz terminals. If you want uses those features, prepare gnuplot with those features and type in the Octave command prompt

```bash
 >> gnuplot_binary /usr/bin/gnuplot
```

#### Build errors on older systems

On some older systems, it might be useful to consider adding the configuration options

+   `--disable-docs`
+   `--disable-java`

in case of building errors.

  

### References

1.  [↑](#cite_ref-1) [MXE-Octave README](https://hg.octave.org/mxe-octave/file/6836b2f08479/README) text by [jwe](User%253AJwe.html "User:Jwe").

[Category](Special%253ACategories.html "Special:Categories"):

+   [Building](Category%253ABuilding.html "Category:Building")