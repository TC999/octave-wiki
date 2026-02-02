# Android

## Contents

+   [1 Termux](#Termux)
    +   [1.1 Direct Octave installation](#Direct_Octave_installation)
    +   [1.2 Via some GNU/Linux distribution](#Via_some_GNU/Linux_distribution)
+   [2 GNURoot Octave](#GNURoot_Octave)
+   [3 Octave app in Google Play](#Octave_app_in_Google_Play)

## Termux

[Termux](https://termux.com) is a Terminal Emulator for Android. You can install it from [F-Droid](https://f-droid.org/repository/browse/?fdid=com.termux) (preferred) or [Play store](https://play.google.com/store/apps/details?id=com.termux) (deprecated). You don't need a rooted device to use Octave with Termux.

### Direct Octave installation

You can directly install Octave in Termux using the repository by [its-pointless](https://github.com/its-pointless/gcc_termux).

```shell
pkg install wget
wget https://its-pointless.github.io/setup-pointless-repo.sh
sh setup-pointless-repo.sh
pkg install octave
```

[OpenBLAS](https://www.openblas.net/) is installed as a dependency, and this method provides much better performance compared to Octave installed inside a GNU/Linux distro running in Termux. By default, Octave only plots with ASCII characters in the terminal.

For graphical plots, [install](https://wiki.termux.com/wiki/Graphical_Environment#Desktop_environment_.28XFCE.29) a graphical environment like xfce, and use octave with a vnc server. Only the graphics toolkit "gnuplot" is known to work in this method.

[![](https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Octave_in_Termux.png/330px-Octave_in_Termux.png)](File%253AOctave_in_Termux.png.html)

[](File%253AOctave_in_Termux.png.html "Enlarge")

GNU Octave running directly in Termux

### Via some GNU/Linux distribution

Inside Termux in Android, you can install a GNU/Linux distribution like Debian, Ubuntu, Arch or Alpine. Note that Alpine consumes relatively less disk space. Octave can be installed as described in [Octave for GNU/Linux](Octave_for_GNU/Linux.html "Octave for GNU/Linux") from the distribution's respective package manager.

To use Octave's graphical capabilities, one needs to install a desktop environment, and a VNC server in the GNU/Linux distro, and one also needs to install a separate VNC viewer app in the Android phone (can be installed from Play Store/F-Droid). On many android devices, only the graphics toolkit "gnuplot" is known to work. Several apps (e.g. [Anlinux](https://github.com/EXALAB/AnLinux-App), [Andronix](https://andronix.app/)) are available to easily install the Linux distribution of your choice, and setting up the desktop environment. Refer to the [Andronix docs](https://docs.andronix.app/vnc/vnc-basics) for an overview of setting up the VNC server.

**Optimizing performance**: Installing [OpenBLAS](https://github.com/xianyi/OpenBLAS/wiki/Precompiled-installation-packages/) (with the distribution's package manager) to replace the system's BLAS libraries may tremendously increase the performance of Octave.

## GNURoot Octave

The Android app [GNURoot Octave](https://play.google.com/store/apps/details?id=com.gnuroot.octave) in the Google play store is built and maintained by Corbin Champion. However, note that these repositories have not been updated for several years. It is not part of the GNU Octave project. Thus please use the following GitHub pages for questions and bug reports:

+   [https://github.com/corbinlc/GNURootDebian](https://github.com/corbinlc/GNURootDebian)
+   [https://github.com/corbinlc/octave4android](https://github.com/corbinlc/octave4android)

The implementation has been done in close cooperation with the Octave developers and makes use of the Octave source code without essential changes. Thus, it is fully compatible with the versions of Octave on other platforms.

Some probably outdated build instructions for the older "octave4android" app:

+   [https://lists.gnu.org/archive/html/octave-maintainers/2013-10/msg00406.html](https://lists.gnu.org/archive/html/octave-maintainers/2013-10/msg00406.html)

## Octave app in Google Play

**Unlike the other methods, this requires buying an app (released under GPL-3) from Google Play**.

The Octave app built and maintained by Userland Technologies [\[1\]](https://play.google.com/store/apps/details?id=tech.ula.octave) in the Google Play Store is the full featured and professionally supported GNU Octave running on your phone. It runs off of their UserLAnd platform which does not require root to your device. Userland Tech has pre-installed GNU Octave so the user has a seamless "desktop" experience on their phone. The application is open source and any bug reports or questions can be posted at their github at: [https://github.com/CypherpunkArmory/octave](https://github.com/CypherpunkArmory/octave)

[Category](Special%253ACategories.html "Special:Categories"):

+   [Installation](Category%253AInstallation.html "Category:Installation")