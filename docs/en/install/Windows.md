# Microsoft Windows

*This article is about using pre-built installers of Octave for Windows; for instructions about building it, see [Windows Installer](Windows_Installer.html "Windows Installer").*

> ![Info icon](../../assets/info/26px-Info_icon.svg.png)
>
> Windows installers are available for the latest version of **Octave (10.3.0, released on September 23, 2025)** from [https://ftpmirror.gnu.org/gnu/octave/windows/](https://ftpmirror.gnu.org/gnu/octave/windows/).

Users are encouraged to use the latest version unless a specific feature or requirement that warrants using an older version of the software. Version specific instructions and installation notes are provided below.

**Note:** As of version 8.3.0, **The Octave project no longer distributes binaries for 32-bit versions of Windows**. An alternative source for 32-bit Windows binaries of Octave is using [MSYS2](#GNU_Octave_in_MSYS2 "Octave for Microsoft Windows").

**Note:** As of version 4.4.1, **Octave no longer supports Windows XP**. There may be some workarounds to get Octave installed and running in command line mode (see Bug [#54662](https://savannah.gnu.org/bugs/?54662)), but maintainers cannot provide support and troubleshooting for this beyond what has already been documented.

## Contents

+   [1 Installers for Microsoft Windows](#Installers_for_Microsoft_Windows)
    +   [1.1 Octave Packages](#Octave_Packages)
        +   [1.1.1 Pre-installed Packages](#Pre-installed_Packages)
        +   [1.1.2 Package Installation and Update](#Package_Installation_and_Update)
+   [2 GNU Octave in MSYS2](#GNU_Octave_in_MSYS2)
+   [3 GNU Octave on cygwin](#GNU_Octave_on_cygwin)
    +   [3.1 Notes for cygwin](#Notes_for_cygwin)
+   [4 General info](#General_info)
+   [5 See also](#See_also)

# Installers for Microsoft Windows

The easiest way to install GNU Octave on Microsoft Windows is by using [MXE](http://hg.octave.org/mxe-octave/) builds. For the current release, 64-bit installers and zip archived packages (.zip and .7z formats) can be found at [https://octave.org/download](https://octave.org/download) under the Windows tab.

+   For executable (.exe) installers: the user can simply run the downloaded file and follow the on-screen installation prompts. It is recommended that the installation path does not include non-ASCII characters. Shortcuts to the program will be created automatically and the post-install script will be run automatically. But with some systems, you may have to run the post-install.bat file before running Octave the first time to reduce plot delays due to the Windows font cache and make the pre-installed packages visible to the system.

+   For the 7z/zip archives:

1.  Extract the file content to a directory on the harddrive (such as C:\\Octave). Spaces or non-ASCII characters in the path are discouraged and may cause program errors.
2.  Manually create a shortcut to the octave-launch.exe file in the main installation directory. (Right-click on the file, select 'Create Shortcut', and move the new shortcut to your desired location.)
3.  If a command-line only instance of Octave is desired, the user can create another shortcut as stated above, right-click on the shortcut, select Properties, and add `--no-gui` to the end of the Target field.
4.  IMPORTANT: Run the post-install.bat file before running Octave the first time to reduce plot delays due to the Windows font cache and make the pre-installed packages visible to the system.
5.  The exe installer prompts you to choose which Basic Linear Algebra Subprograms (BLAS) library to use, and creates a shortcut to a BLAS switcher program. The 7z/zip archives default to using [Reference BLAS](https://netlib.org/blas). [OpenBLAS](https://www.openblas.net) is also available, and may be preferable for certain users. 7z/zip archive users wanting to change their BLAS library can manually run the switcher program located at /mingw64/bin/blas\_switch.exe.

+   Note: versions before 7.1.0 used .vbs and .bat files to start Octave. The octave.bat file is still available in \\mingw32\\bin or \\mingw64\\bin, depending on the version of Octave installed, for use cases requiring it for startup.

## Octave Packages

Like many software programs, Octave uses *packages* to optionally extend and modify its capability. These packages can be installed and loaded using the built in package management program 'pkg'. (Note that Octave does not automatically load installed packages, they must be manually loaded from within Octave by the user.)

Octave maintains a system-wide (or *global*) package list, and a user-specific (or *local*) package list. By default in Windows 10 and 11, local packages are located at C:\\Users\\%USERNAME%\\octave\\. (The \\octave folder will be created during the first package install\\update if it is not already present.) The global packages are stored in %OCTAVE\_HOME%\\mingw64\\share\\octave\\packages\\, and are available to all users on the machine. Specific locations on your system can be found by typing the following commands at the Octave command line:

```bash
  >> pkg local_list
  >> pkg global_list
```

Octave versions for Windows prior to 6.1.0 defaulted to always making changes to global packages unless the user specified otherwise. The default is now to follow the same behavior on all platforms, and for all package updates and installations to apply to local or global package locations according to whether or not the user is running with Administrative privileges (on Windows, this is usually accomplished by running as an Administrator privileged account, or starting Octave with the "Run as Administrator" option). Alternatively, some pkg command options can force octave to try to use either the local or global packages.

### Pre-installed Packages

A selection of pre-built, [Octave Forge](Octave_Forge.html "Octave Forge") packages is included with all versions of the official Windows release. If you followed the installation directions above, you can display a list of packages by typing the command below at the Octave command prompt:

```bash
  >> pkg list
```

For example, the output for preinstalled global packages included with version 10.1.0 when installed into C:\\Octave is:

```
   Package Name         | Version | Installation directory
   ---------------------+---------+-----------------------
                 audio  |   2.0.9 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\audio-2.0.9
                biosig  |   2.6.0 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\biosig-2.6.0
               cfitsio  |   0.0.7 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\cfitsio-0.0.7
        communications  |   1.2.7 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\communications-1.2.7
               control  |   4.1.1 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\control-4.1.1
        data-smoothing  |   1.3.0 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\data-smoothing-1.3.0
              database  |   2.4.4 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\database-2.4.4
             dataframe  |   1.2.0 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\dataframe-1.2.0
                 dicom  |   0.6.1 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\dicom-0.6.1
             financial  |   0.5.3 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\financial-0.5.3
   fuzzy-logic-toolkit  |   0.6.1 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\fuzzy-logic-toolkit-0.6.1
                    ga  |  0.10.4 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\ga-0.10.4
               general  |   2.1.3 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\general-2.1.3
         generate_html  |   0.3.3 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\generate_html-0.3.3
              geometry  |   4.1.0 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\geometry-4.1.0
                   gsl  |   2.1.1 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\gsl-2.1.1
                 image  |  2.16.0 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\image-2.16.0
    instrument-control  |   0.9.3 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\instrument-control-0.9.3
              interval  |   3.2.1 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\interval-3.2.1
                    io  |   2.6.4 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\io-2.6.4
        linear-algebra  |   2.2.3 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\linear-algebra-2.2.3
                  lssa  |   0.1.4 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\lssa-0.1.4
                 ltfat  |   2.6.0 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\ltfat-2.6.0
               mapping  |   1.4.2 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\mapping-1.4.2
               matgeom  |   1.2.4 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\matgeom-1.2.4
         miscellaneous  |   1.3.1 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\miscellaneous-1.3.1
                  mqtt  |   0.0.5 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\mqtt-0.0.5
                   nan  |   3.7.0 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\nan-3.7.0
                netcdf  |  1.0.18 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\netcdf-1.0.18
                 nurbs  |   1.4.4 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\nurbs-1.4.4
                   ocs  |   0.1.5 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\ocs-0.1.5
               octproj  |   3.0.2 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\octproj-3.0.2
                 optim  |   1.6.2 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\optim-1.6.2
           optiminterp  |   0.3.7 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\optiminterp-0.3.7
            quaternion  |   2.4.0 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\quaternion-2.4.0
              queueing  |   1.2.8 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\queueing-1.2.8
                signal  |   1.4.6 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\signal-1.4.6
               sockets  |   1.4.1 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\sockets-1.4.1
             sparsersb  |   1.0.9 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\sparsersb-1.0.9
               splines  |   1.3.5 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\splines-1.3.5
            statistics  |   1.7.3 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\statistics-1.7.3
                   stk  |   2.8.1 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\stk-2.8.1
               strings  |   1.3.1 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\strings-1.3.1
                struct  |  1.0.18 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\struct-1.0.18
              symbolic  |   3.2.1 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\symbolic-3.2.1
            tablicious  |   0.4.4 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\tablicious-0.4.4
                   tsa  |   4.6.3 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\tsa-4.6.3
                 video  |   2.1.1 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\video-2.1.1
               windows  |   1.6.5 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\windows-1.6.5
                zeromq  |   1.5.6 | C:\Octave\octave-10.1.0-w64\mingw64\share\octave\packages\zeromq-1.5.6
                                                                                          

```

Note that the included packages shown above are stored in the default *global package location* within the Octave installation folder. If any 'local' packages were previously installed with another version of windows, they might also appear in the list at the local location. It is recommended that any such packages be uninstalled and reinstalled to guarantee compatibility with the current version of octave.

If Octave was installed from a zip or 7z archive and you did not run the post-install.bat file, you may not see any packages listed. In that case you need to run:

```bash
  >> pkg rebuild
```

That will force octave to look for both *local* and *global* packages in the set locations to repopulate the list of available packages. Note that 'local' packages always take precedence if the same package is present in both locations.

**Note**: The Windows bundle includes a minimal version of Python for the symbolic package. That version of Python is not intended to be used for anything else. If you like to use Python for something different in Octave (e.g., for the pythonic package), install a full Python distribution and set the necessary environment variables (PYTHON, ...?).

### Package Installation and Update

All packages can be updated to the latest version by running:

```bash
  >> pkg update
```

Other packages can be installed by running:

```bash
  >> pkg install -forge <package_name>
```

To install a new or updated package version manually, the package file can be downloaded from the [Octave Forge website](https://octave.sourceforge.io/packages.php) to the working directory and can be installed using:

```bash
  >> pkg install package_file_name.tar.gz
```

Note that all of the commands above will perform *local* or *global* package installs according to the user's Administrator access level. E.g., if an update is found for a global package with a non-elevated user account, the updated version will be installed to the *local* package location, leaving the old version intact in the *global* package location. This behavior can be changed by calling the install command with the \-global option. As of Octave 7.1.0 the \-global option also works with the pkg update command. For example:

```bash
  >> pkg install -forge -global <package_name>
```

```bash
  >> pkg update -global
```

Detailed instructions for installing individual Octave Forge packages are given at [https://octave.sourceforge.io/packages.php](https://octave.sourceforge.io/packages.php).

# GNU Octave in MSYS2

[MSYS2](https://www.msys2.org/) is a collection of tools and libraries providing an easy-to-use environment for building, installing and running native Windows software. GNU Octave is available as a [package](https://packages.msys2.org/base/mingw-w64-octave) in MSYS2.

The best (and recommended) way to use Octave on Windows is to use the provided installers (see above). But for some special requirements, the version of Octave packaged by MSYS2 might be the better solution. Those special requirements might include:

+   Users might want to use e.g. Octave packages that depend on third party packages not included in MXE Octave (e.g., the Pythonic package that depends on a native Windows Python installation).
+   Users might need features of newer versions of packages than which are included in MXE Octave.
+   ...

MSYS2 follows a rolling release cycle. So, its packages are most likely more up-to-date than the packages included in Octave's installer for Windows. It includes a (working) package manager (`pacman`) that provides the option to install a much wider range of packages than what can possibly be included in Octave's installer for Windows.

To use Octave in MSYS2, install the MSYS2 environment following [their instructions](https://www.msys2.org/#installation). At the `bash` shell (use e.g. "MSYS2 MinGW 64-bit" from the start menu), update the installation by `pacman -Syu`. After that, install a version of Octave that matches your environment (and the shell you are using), e.g. `pacman -S mingw-w64-x86_64-octave`.

This will install (among others), the main executables of Octave `octave-gui` (linked with Qt, i.e., including the "qt" graphics toolkit and the GUI), `octave-cli` (linked without Qt, i.e., only "fltk" and "gnuplot" graphics toolkits and no GUI), and the wrapper executable `octave` that dispatches to one of the former executables depending on the used command line switches. The Octave GUI can be started with `octave --gui` from MSYS2's `bash` shell, the command line interface (CLI) with `octave`.

# GNU Octave on [cygwin](https://cygwin.com/)

+   **Maintainer:** Marco Atzeri
+   **Latest release:** 2024-01-26

+   Latest packages:

octave-8.4.0-1

Its announce on cygwin mailing list [\[1\]](https://cygwin.com/pipermail/cygwin-announce/2024-January/011503.html)

Most of the Octave Forge packages have each a cygwin package.

Full cygwin package list is available here [\[2\]](https://cygwin.com/packages/)

At 2024-01-26, 51 forge packages were available.

+   To install :

run setup-x86\_64.exe (for cygwin 64 bit) and select them in the Math category.

All the package dependencies will be also installed.

Graphics is based on X and to plot you will need to start octave within xterm (or similar).

I recommend to install "xinit", "xlaunch" and "gnuplot". These packages will pull all the functional Xserver.

Otherwise the only graphics will be ASCII art ;-)

## Notes for cygwin

+   To build GNU Octave from cygwin source package, you need to install "cygport" and the relevant development libraries

```bash
tar -xf octave-8.4.0-1-src.tar.xz 
cygport octave.cygport almostall
```

see cygport documentation at /usr/share/doc/cygport/html/manual/toc\_index.html for further info.

# General info

Be advised that GNU Octave is primarily developed on GNU/Linux and other [POSIX](https://en.wikipedia.org/wiki/POSIX) conform systems. The ports of GNU Octave to Microsoft Windows use different approaches to get most of the original Octave and adapt it to Microsoft Windows idiosyncrasies (e.g. dynamic libraries, file paths, permissions, environment variables, GUI system, etc). Bear this in mind and don't panic if you get unexpected results. There are a lot of suggestions on the mailing lists for tuning your Octave installation. GNU Octave standalone ports for Windows are independently compiled using either the [MinGW](http://mingw.org) or Microsoft Visual Studio development environments (3.6 or before).

# See also

+   [Octave for Microsoft Windows (outdated)](Octave_for_Microsoft_Windows_\(outdated\).html "Octave for Microsoft Windows (outdated)") for older instructions.

[Categories](Special%253ACategories.html "Special:Categories"):

+   [Installation](Category%253AInstallation.html "Category:Installation")
+   [Building](Category%253ABuilding.html "Category:Building")
+   [Microsoft Windows](Category%253AMicrosoft_Windows.html "Category:Microsoft Windows")