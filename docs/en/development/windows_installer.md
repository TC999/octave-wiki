# Windows Installer

*This article is about how to make the Microsoft Windows installer; if you'd like just to use the installer, see [Octave for Microsoft Windows](Octave_for_Microsoft_Windows.html "Octave for Microsoft Windows").*

GNU Octave is primarily developed on GNU/Linux and other POSIX compliant systems. There have been many efforts in the past to build ports of GNU Octave for Microsoft Windows. This page contains instructions about creating a MS Windows installer using [mxe-octave](MXE.html "MXE") (a fork of [MXE](http://mxe.cc/)). This means, **the MS Windows installer is [cross-compiled](https://en.wikipedia.org/wiki/Cross_compiler) using a GNU/Linux system**.

## Contents

-   [1 Creating the MS Windows Installer](#Creating_the_MS_Windows_Installer)
    -   [1.1 General steps](#General_steps)
    -   [1.2 Step details](#Step_details)
        -   [1.2.1 ./configure](#./configure)
        -   [1.2.2 make](#make)
    -   [1.3 Build installers for Octave development versions](#Build_installers_for_Octave_development_versions)
    -   [1.4 Remarks](#Remarks)
    -   [1.5 Troubleshooting](#Troubleshooting)
-   [2 Testing using virtual machines](#Testing_using_virtual_machines)
-   [3 Footnotes](#Footnotes)

## Creating the MS Windows Installer

### General steps

1.  Reassure you have the package libffi-dev installed or the Python build will silently be incomplete
2.  Install the MXE build requirements.[\[1\]](#cite_note-1)
3.  `hg clone [https://hg.octave.org/mxe-octave](https://hg.octave.org/mxe-octave)`[\[2\]](#cite_note-2)
4.  `cd mxe-octave`
5.  `./bootstrap` (Among other things, the `bootstrap` script creates the `configure` script for the next step.)
6.  `./configure`
7.  `make all nsis-installer`

### Step details

#### `./configure`

The current Microsoft Windows installers are build in three "flavors": for common 64- and 32-bit systems (**"w64"** and **"w32"**) and for 64-bit systems exceeding 32 GB of main memory to store large data structures (**"w64-64"**).

| "w64" (recommended) | "w64-64" | "w32" |
| --- | --- | --- |
| 
```bash
./configure                        \
  --enable-devel-tools             \
  --enable-binary-packages         \
  --with-ccache                    \
  --enable-octave=<octave version>
```

 | 

```bash
./configure                        \
  --enable-devel-tools             \
  --enable-binary-packages         \
  --with-ccache                    \
  --enable-octave=<octave version> \
  --enable-fortran-int64
```

 | 

```bash
./configure                        \
  --enable-devel-tools             \
  --enable-binary-packages         \
  --with-ccache                    \
  --enable-octave=<octave version> \
  --disable-windows-64
```

 |

The individual options have the following meaning (see also `./configure --help`):

-   `--enable-devel-tools`: Include gdb and an MSYS shell in the binary.
    -   If you seriously want to work with gdb, you need `--disable-strip-dist-files` as configure option to keep debug symbols in the installed binaries for debugging on MS Windows. Beware as the total Octave distribution will be > 2 GB, the max. size for an NSIS installer. Your only options are to make 7z-dist, zip-dist or tar-dist installers.
-   `--enable-binary-packages`: Cross-compile binary modules in [Octave Forge](Octave_Forge.html "Octave Forge") packages. This saves time when installing them once the installation runs on Microsoft Windows. Furthermore, some packages require patches to cross-compile successfully (or with current Octave versions). Those additional patches would be missing when compiling the original packages from Octave Forge on Windows later on. Some Octave Forge packages require a working Octave during compilation. Therefore, the correct version(!) of Octave must be installed on the host system.
-   `--with-ccache`: The usage of [ccache](https://ccache.dev/) may speed up repetitive compilation drastically.
-   `--enable-octave=<octave version>`: Build a specific version of GNU Octave, which can be one of:
    -   `release` use src/release-octave.mk, download and build the latest GNU Octave release.
    -   `stable` or `default` uses src/stable-octave.mk or src/default-octave.mk, respectively. This builds from a self-created distribution tarball from the "stable" or "default" development branch of GNU Octave. See [below](#Build_installers_for_Octave_development_versions) for details.
-   `--disable-windows-64`: Build for 32-bit MS Windows.
-   `--enable-fortran-int64`: Use 64-bit integers in Fortran code and especially in numerical library code. This option only affects the size of integers used in Fortran code like the BLAS and LAPACK libraries. On 64-bit systems, Octave always uses 64-bit integers for indexing and basic array operations. See [Enable large arrays](Enable_large_arrays%253A_Build_octave_such_that_it_can_use_arrays_larger_than_2Gb..html "Enable large arrays: Build octave such that it can use arrays larger than 2Gb.") for details.
-   `--disable-system-opengl`: Include software OpenGL libraries. This might help when working with buggy graphics card drivers, but might be slower than hardware accelerated rendering.
-   `--with-pkg-dir=../mxe-octave-pkg`: If you are working with several build trees, you can share a common package directory.

#### `make`

-   Use `make all 7z-dist`, `make all tar-dist` or `make all zip-dist` instead of `make all nsis-installer` if you want to build just an archive of the files to install on MS Windows instead of an installer wizard.
-   By default, packages will be built one at a time **without parallelization**. You may use `make JOBS=4` (choose a number other than 4 that is appropriate for your system) to build each individual package in parallel.
    -   **Avoid using the `-j` option for `make`:** Using `-j` enables building packages in parallel, which can mess up the mxe build system. Use this option with care! Another pitfall is the example `make -j4 JOBS=4`, which can result in as many as 16 jobs running at once.
-   Include gdb in the installer by running `make gdb` before making the `nsis-installer` target.

### Build installers for Octave development versions

1.  Build the "stable" or "default" Octave development branch on Linux (in separate source and build trees) including your favorite modifications and patches. Octave must be configured with Java support. How to do this depends on your Linux distribution, see [Building](building.md "Building").
2.  Verify that Octave runs fine in Linux (for example using `make check` and by trying to run your build `./run-octave --gui`).
3.  Create a distribution archive called **"octave-<version>.tar.lz"** in the top build directory with `make dist-lzip DIST_IGNORE_HG_STATE=1`. `lzip` needs to be available for this step. (On Debian-like systems, it can be installed with `apt-get install lzip`).
4.  Move or copy **"octave-<version>.tar.lz"** to the <mxe-octave build>/pkg folder (or create a symbolic link to it).
5.  Follow the [general steps](#General_steps) and ensure the configuration with either of `--enable-octave=stable` or `--enable-octave=default`.
6.  Move the final installer in <mxe-octave build>/dist to some Microsoft Windows machine (USB thumb drive, LAN copy, whatever) and install it "as usual". If you created an archive, using `make all 7z-dist` for example, you'll have to manually create the desktop and start menu shortcuts (for GNU Octave and the MSYS-shell).

For next builds, mxe-octave is already configured and all dependencies have been built so the only thing to do is to create a new **"octave-<version>.tar.lz"** and repeating the steps above. This should be much faster than the first run. If the new **"octave-<version>.tar.lz"** is not build and ignored, try the following:

```bash
touch src/default-octave.mk
```

If you've renamed **"octave-<version>.tar.lz"**, be sure it matches with the package name in src/default-octave.mk.

### Remarks

-   If you have several MXE-Octave build dirs (for e.g., stable and several development versions, or build trees for 32bit and 64bit Windows targets), it is possible to point to a common pkg directory using the configure flag `--with-pkg-dir=path_to_common_pkg_directory`. That way downloading the packages for each build tree can be avoided. Thus, potentially saving a lot of downloading bandwidth.
-   As of late December 2015, [MXE-Octave allows out-of-tree builds](https://hg.octave.org/mxe-octave/rev/0962acdde3be). This makes it easier to build separate Octave versions with the same MXE-Octave tree.
-   To keep MXE-Octave up-to-date, from time to time run the following commands in the MXE-Octave repository:

```bash
hg -v pull
hg -v update
```

-   However, some package updates might need a clean build tree. If an incremental build fails after an update, consider running `make clean` or starting with a fresh clone, see [General steps](#General_steps).
-   In the mean time, you might want to regularly clean up <mxe-octave build dir>/log to save disk space. The logs are of informational value only and are not needed after the build completes. They can safely be deleted.
-   It can happen that you meet problems with Java. To build Octave with Java support built-in, MXE-Octave needs:
    -   A Java JDK (Java Development Kit) on the **build** system. In other words, the javac (Java compiler) and jar (Java archiver) executables should be in the PATH-system-variable.
    -   Java include files for MS Windows. They should reside in <mxe-octave build dir>/usr/x86\_64-w64-mingw32/include/java/win32 or <mxe-octave build dir>/usr/i686-w64-mingw32/include/java/win32, respectively. If they are not present, MXE-Octave downloads them automatically. However, this might fail occasionally (e.g. if the server cannot be reached). On a multi-boot system, a solution (note: dirty hack warning!) is symlinking to the MS Windows include files on the MS Windows partition from the MXE-Octave location. (Don't do this unless you are sure what you are doing.)

### Troubleshooting

-   The error message displayed by `make` is simply the last lines of the log file. This may truncate the actual error message. Find the full error messages in the <mxe-octave build>/log directory.
-   Sometimes running `make` a second time without changing anything will fix the problem. In particular, `autotools` rebuilds some files in the first call `make`, which may cause the second call of `make` to succeed.
-   If it is building Octave that failed, the source will be left in <mxe-octave build>/tmp-default-octave and it is possible to run "configure && make" in that directory.
-   The configuration will be for the target system, not your own. In particular, if you have not installed all of the packages that mxe-octave installs, then your configuration will be different. However, some configuration variables will differ even if you have the same packages, and some compiler features may be available on the host system that are not available in cross-compile mode.
-   A possible causes for build failure is having files in your local source or build directory that are not listed in the module.mk files; these are not copied into the dist archive.
-   Sometimes mxe-octave builds fail at "libmng". This may be due to a race condition related to disk I/O when using a fast SSD harddisk. A way to get past this is by specifying "make nsis-installer JOBS=1", if required repeatedly (sometimes 5 or 6 times), interrupting the build in the next step/dependency once "libmng" has been built fine, and restarting with "make nsis-installer JOBS=<higher number>". As of December 2015 it is only libmng that has this issue.

## Testing using virtual machines

Microsoft provides several virtual machine (e.g. VirtualBox) disk images of MS Windows for about one month of testing

-   [https://developer.microsoft.com/en-us/windows/downloads/virtual-machines](https://developer.microsoft.com/en-us/windows/downloads/virtual-machines)
-   [https://developer.microsoft.com/en-us/microsoft-edge/tools/vms](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms) (primarily meant for testing the MS-Edge browser)

The license (given on that page) for these images does not limit the use of these images. So it is perfectly possible to also test GNU Octave.

The key idea is to create a shared folder inside the virtual machine to the mxe-octave build directory. It is advised to make it read-only. Either install (or unpack) Octave into MS Windows 10, or create a shortcut to octave.vbs in the <mxe-octave build dir>/dist/octave subdirectory on the Linux side.

Some advantages:

-   No dedicated MS Windows machine or rebooting from Linux is needed;
-   The latest MS Windows 10 version is always available;
-   Building the installer archives (zip, 7z, ...) isn't needed. One can interrupt the build process after the local installation of Octave has been made in the dist/octave subdirectory of mxe-octave, i.e., when the message "generating installer" (or "zip...") is shown. This saves about 10-15 minutes. Of course one can also use the common distribution formats for the virtual MS Windows machine.

Hints:

-   It is possible to adapt mxe-octave/binary-dist-rules.mk to have a consistent name for the <mxe-octave build dir>/dist/octave subdirectory (i.e., without time/date/bitwidth suffixes). This way, in MS Windows the shortcut doesn't need adaptation after each cross-build action. Maybe it would be better if mxe-octave/binary-dist-rules.mk had a rule to create a symlink <mxe-octave build dir>/dist/octave pointing to the latest cross-build.
-   The image expires after 30 days. But if you make a VirtualBox snapshot before starting the VM the first time, you can revert to that snapshot (essentially, the image will last longer). This way, you also won't need to uninstall Octave each time before installing a new build.

## Footnotes

1.  [↑](#cite_ref-1) The requirements for each system are listed in the repository [https://hg.octave.org/mxe-octave/file/tip/index.html](https://hg.octave.org/mxe-octave/file/tip/index.html). Start with the second step to read the index.html file on your local machine.
2.  [↑](#cite_ref-2) Use `hg clone [https://hg.octave.org/mxe-octave](https://hg.octave.org/mxe-octave) <name of mxe-octave build dir>` to choose another directory.
<!---
[Categories](Special%253ACategories.html "Special:Categories"):

-   [Building](Category%253ABuilding.html "Category:Building")
-   [Microsoft Windows](Category%253AMicrosoft_Windows.html "Category:Microsoft Windows")-->