# Continuous Build

GNU Octave uses [Buildbot](https://buildbot.net/) to build and test the current development version on multiple systems in a number of different configurations.

![Info icon.svg](../../assets/info/26px-Info_icon.svg.png)

The current status of the builds may be found at [https://buildbot.octave.org/#/waterfall](https://buildbot.octave.org/#/waterfall).

## Contents

+   [1 Systems and Configurations](#Systems_and_Configurations)
+   [2 Setup and run a Buildbot Worker](#Setup_and_run_a_Buildbot_Worker)
    +   [2.1 ccache](#ccache)
    +   [2.2 Space Requirements](#Space_Requirements)
+   [3 Continuous Deployment of Octave for Linux](#Continuous_Deployment_of_Octave_for_Linux)
    +   [3.1 Edge channel of Octave Snap App](#Edge_channel_of_Octave_Snap_App)
+   [4 Continuous Deployment of Octave for Windows](#Continuous_Deployment_of_Octave_for_Windows)
    +   [4.1 Freshly brewed Octave](#Freshly_brewed_Octave)
    +   [4.2 GitHub build artifacts](#GitHub_build_artifacts)
+   [5 External links](#External_links)

# Systems and Configurations

The following systems and configurations are currently covered for Octave builds:

| Builder ID | Hg Version | System | Compiler | Build Options | Frequency |
| --- | --- | --- | --- | --- | --- |
| clang-4.0-debian | default | Debian Testing | Clang 4.0 |  | Any Change |
| stable-clang-4.0-debian | stable | Debian Testing | Clang 4.0 |  | Any Change |
| clang-5.0-debian | default | Debian Testing | Clang 5.0 |  | Any Change |
| stable-clang-5.0-debian | stable | Debian Testing | Clang 5.0 |  | Any Change |
| clang-fedora | default | Fedora (current release) | Clang (system default) |  | Any Change |
| stable-clang-fedora | stable | Fedora (current release) | Clang (system default) |  | Any Change |
| clang-osx (currently inactive) | default | OS X | Clang |  | Any Change |
| gcc-7-debian | default | Debian Testing | GCC 7 |  | Any Change |
| gcc-7-lto-debian | default | Debian Testing | GCC 7 | Enable link time optimization | Any Change |
| gcc-fedora | default | Fedora (current release) | GCC (system default) |  | Any Change |
| gcc-lto-fedora | default | Fedora (current release) | GCC (system default) | Enable link time optimization | Any Change |
| no-extras-debian | default | Debian Testing | GCC (system default) | Disable all optional dependencies | Any Change |
| stable-no-extras-debian | stable | Debian Testing | GCC (system default) | Disable all optional dependencies | Any Change |

And for mxe-octave:

| Builder ID | Hg Version | Build System | Host System | Compiler | Build Options | Frequency |
| --- | --- | --- | --- | --- | --- | --- |
| mxe-native-all-on-debian | default | Debian Testing | Debian | GCC (mxe-octave default) | GNU Linux, build all dependencies | Daily |
| mxe-native-on-debian | default | Debian Testing | Debian | GCC (system default) | GNU Linux, use system compiler, fontconfig, and X11 libraries | Daily |
| w32-on-debian | default | Debian Testing | Windows | GCC (mxe-octave default) | Windows 32 | Daily |
| w32-stable-on-debian | stable | Debian Testing | Windows | GCC (mxe-octave default) | Windows 32 | Daily |
| w32-release-on-debian | release (tarball) | Debian Testing | Windows | GCC (mxe-octave default) | Windows 32 | Daily |
| w64-32-on-debian | default | Debian Testing | Windows | GCC (mxe-octave default) | Windows 64 | Daily |
| w64-32-stable-on-debian | stable | Debian Testing | Windows | GCC (mxe-octave default) | Windows 64 | Daily |
| w64-32-release-on-debian | release (tarball) | Debian Testing | Windows | GCC (mxe-octave default) | Windows 64 | Daily |
| w64-64-on-debian | default | Debian Testing | Windows | GCC (mxe-octave default) | Windows 64, 64-bit indexing | Daily |
| w64-64-stable-on-debian | stable | Debian Testing | Windows | GCC (mxe-octave default) | Windows 64, 64-bit indexing | Daily |
| w64-64-release-on-debian | release (tarball) | Debian Testing | Windows | GCC (mxe-octave default) | Windows 64, 64-bit indexing | Daily |

# Setup and run a Buildbot Worker

Your system may be behind a firewall. It does not have to have a distinct public IP address.

To support Octave development and run a Buildbot Worker, you must do the following:

+   Contact the [Octave Maintainers on Discourse](https://octave.discourse.group/c/maintainers/7) to let us know that you wish to provide a system to use as a Buildbot Worker. We will give you a `WORKERNAME` and a **secret** `PASSWORD` to configure your Buildbot Worker.
+   Install buildbot. Packages exist for most distributions. See the buildbot docs for other options. You should create a separate user account with no special privileges that will run buildbot.
+   Decide for a `BASEDIR`. For example, if the home directory for the buildbot user is /var/lib/buildbot and your `WORKERNAME` is set to `'debian-x86_64'` , then `BASEDIR` might be /var/lib/buildbot/worker/debian-x86\_64.
+   `MASTERHOST` is `buildbot.octave.org` and `PORT` is `9989`.
+   Create the configuration
    
    ```bash
    buildbot-worker create-worker BASEDIR MASTERHOST:PORT WORKERNAME PASSWORD
    ```
    
+   Run buildbot on the worker system, preferably by starting it automatically when your system boots. It should be running with the buildbot user ID.
    
    ```bash
    buildbot-worker start BASEDIR
    ```
    

## ccache

You may also want to set up **ccache** to work with buildbot (strongly recommended to speed up builds). If you create a directory ~/buildbot/bin, it will be added to the execution PATH when the Buildbot Master runs commands on the Buildbot Worker. This directory can have symbolic links like the following:

```bash
cc       -> /usr/bin/ccache
c++      -> /usr/bin/ccache
gcc      -> /usr/bin/ccache
gfortran -> /usr/bin/ccache
```

They should point to the actual location of ccache if it is not in /usr/bin.

## Space Requirements

Building Octave takes a significant amount of disk space. With debugging symbols, you may need several GB for each build, plus room for ccache (possibly 50GB) if you use it. If you use a cache size that is larger than the default, you'll need to specify that in the .ccache/ccache.conf file using a line like

```bash
max_size = 50G
```

If the directory containing the build and ccache directories doesn't have sufficient space, then these directory names may point to a separate partition that does have enough space available.

# Continuous Deployment of Octave for Linux

## Edge channel of Octave Snap App

The "edge" channel of Octave's Snap App is built from the current version of the stable branch. That means it contains changes that are likely to be included in the next minor release of Octave.

It can be download from the [Snap Store](https://snapcraft.io/octave) selecting "latest/edge" from the dropdown menu.

# Continuous Deployment of Octave for Windows

## Freshly brewed Octave

Unreleased versions of Octave for Windows are available from [nightly.octave.org](https://nightly.octave.org/#/download). These are installers built with MXE Octave very similarly how the "official" Octave for Windows is built. They can be installed just like the "official" versions of Octave for Windows.

Available variants include versions built from the release branch of MXE Octave built for Windows 64-bit (with 32-bit or 64-bit Fortran indexing size). Additionally, one variant is built from the default branch of MXE Octave (more up-to-date dependencies).

All of these versions are built from the stable branch of Octave. That means they contain changes that are likely to be included in the next minor release of Octave.

Unreleased versions might be more unstable than released versions. But they might also contain fixes for bugs that haven't been released yet.

## GitHub build artifacts

Build artifacts are available for versions of Octave for MINGW64 from the CI running on the mirror of Octave on GitHub. These artefacts can be downloaded from the bottom of the [workflow logs](https://github.com/gnu-octave/octave/actions) for builds from the default branch of Octave. After downloading the build artifact, extract the `.zip` file to an empty folder (e.g., `C:\Octave\test`).

The default branch of Octave contains changes that are likely to be included in the next major release of Octave. Some functionality of Octave on the default branch might be broken. But it will likely contain new features that aren't yet included in the newest released version of Octave.

These artifacts are built with MSYS2. So, MSYS2 must be installed to be able to run the artifact. MSYS2 can be downloaded from their [website](https://www.msys2.org/). After installing MSYS2, open a MINGW64 shell (the blue icon), update MSYS2 and install the necessary dependencies with (the second command must be executed in one single line):

```bash
 pacman -Syu
 pacman -S --needed mingw-w64-x86_64-gcc-libgfortran mingw-w64-x86_64-arpack mingw-w64-x86_64-curl mingw-w64-x86_64-fftw mingw-w64-x86_64-fltk mingw-w64-x86_64-ghostscript mingw-w64-x86_64-gl2ps mingw-w64-x86_64-glpk mingw-w64-x86_64-gnuplot mingw-w64-x86_64-graphicsmagick mingw-w64-x86_64-hdf5 mingw-w64-x86_64-libsndfile mingw-w64-x86_64-portaudio mingw-w64-x86_64-qhull mingw-w64-x86_64-qrupdate mingw-w64-x86_64-qscintilla mingw-w64-x86_64-qt5-tools mingw-w64-x86_64-sundials mingw-w64-x86_64-suitesparse
```

After that, `cd` to the directory with the extracted content of the `.zip` file. (It should be one single file named `octave.tar.gz`.) For the exemplary folder from above, that would be:

```bash
 cd /c/Octave/test
```

Extract the tarball and add the `bin` directory to the system search PATH:

```bash
 tar -xvzf octave.tar.gz
 export PATH=/c/Octave/test/mingw64/bin:$PATH
```

After that, it should be possible to start that "nightly" version with the command `octave --gui` from the same shell.

# External links

+   [Buildbot configuration repository](https://hg.octave.org/octave-buildbot/) for [https://buildbot.octave.org/](https://buildbot.octave.org/)
+   [Buildbot configuration](https://github.com/gnu-octave/octave-buildbot) for [https://nightly.octave.org/](https://nightly.octave.org/)

[Category](Special%253ACategories.html "Special:Categories"):

+   [Building](Category%253ABuilding.html "Category:Building")