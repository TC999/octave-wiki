# Building on Microsoft Windows

*This page is directed towards new developers that are interested in contributing to Octave. If you just want to install Octave, see [Category:Installation](../../install "Category:Installation").*

*For general Octave build instructions on Linux, read [Building](building.md "Building").*

## Contents

+   [1 Contributing to Octave](#Contributing_to_Octave)
+   [2 Building Octave](#Building_Octave)
    +   [2.1 Virtual Machine](#Virtual_Machine)
    +   [2.2 Windows Subsystem for Linux](#Windows_Subsystem_for_Linux)
    +   [2.3 Building natively (MSYS2)](#Building_natively_\(MSYS2\))
+   [3 Footnotes](#Footnotes)

# Contributing to Octave

Octave development is done mainly on Linux. But if you are running Windows, you can contribute to Octave nevertheless.

The easiest way to contribute (not only from Windows) is probably by changing or adding .m files.

If you found something you'd like to fix or improve, check out the [bug tracker](https://savannah.gnu.org/bugs/?group=octave). It might have already been fixed in the development or (unreleased) stable version.

Octave is version controlled in a [Mercurial](Mercurial.html "Mercurial") repository at [https://www.octave.org/hg/octave](https://www.octave.org/hg/octave).

There are several Mercurial clients for Windows. One that nicely integrates with the Windows Explorer and that offers an easy to learn user interface is [TortoiseHg](https://tortoisehg.bitbucket.io/download/index.html). It is also quite easy to create Mercurial patches with that software. Those are the preferred way of contributing to Octave.

# Building Octave

If you want to contribute changes to C++ files or are interested in testing the latest development or (unreleased) stable release, you can build Octave from source.

It seems to be possible to build Octave natively on Windows with the MSYS2 shell. (Be aware that this might take some time.) It is also possible to build Octave on Windows machines using virtual machines or Microsoft's Windows Subsystem for Linux. Using VM is the currently recommended way to build Octave on Windows machines.

Building Octave natively on Windows is experimental! The only supported way of creating Windows binaries of Octave is cross-building with MXE Octave ([Windows Installer](windows_installer.md "Windows Installer")).

## Virtual Machine

Most of Octave's developers are running Debian or Ubuntu [\[1\]](#cite_note-1). So these are probably the Linux distributions for which you are most likely to get help if you should run into issues. The following focuses mainly on Ubuntu.

[VMWare Player](https://www.vmware.com/products/workstation-player.html) is free (as in no costs) for non-commercial use.

There are several sources for free complete Linux VM images on the web. One of them is [osboxes.org](https://www.osboxes.org/). You can download an Ubuntu image for VMWare Player from [their side](https://www.osboxes.org/ubuntu/#ubuntu-20-04-vmware). After the download has finished, unzip the image.

You also need a .vmx file to be able to start the Virtual Machine with VMWare Player. To create a .vmx file with minimal settings, open a text editor and save the following to a file called Ubuntu.vmx next to the VM image you downloaded:

**File:** Ubuntu.vmx

```bash
.encoding = "windows-1252"
config.version = "8"
virtualHW.version = "8"
scsi0.present = "TRUE"
scsi0.virtualDev = "lsilogic"
memsize = "2048"
scsi0:0.present = "TRUE"
scsi0:0.fileName = "Ubuntu.vmdk"
ethernet0.present = "TRUE"
ethernet0.virtualDev = "e1000"
displayName = "Ubuntu"
guestOS = "ubuntu-64"
virtualHW.productCompatibility = "hosted"
```

Change the line with Ubuntu.vmdk to the actual file name of the Ubuntu image you just downloaded.

You can start the VM by double-clicking on the .vmx file you just created.

Change the amount of memory or the number of processors you want to assign to the VM in the Virtual Machine settings in VMWare Player.

The login data for VMs downloaded from osboxes is:  
username: osboxes  
password: osboxes.org

Once you started the VM and logged in, continue as if you would run [Ubuntu natively](Octave_for_Debian_systems.html#The_right_way "Octave for Debian systems").

## Windows Subsystem for Linux

The Windows Subsystem for Linux (WSL) was not very interesting for serious development in its first version. Many of the shortcomings (like tediously slow "fork" and "stat") have been fixed in WSL2 which was released together with Windows 10 Update 2004.

To install WSL2 on Windows, follow the [instructions by Microsoft](https://docs.microsoft.com/en-us/windows/wsl/install-win10).

WSL2 is basically a virtual machine running the Linux kernel that is more closely integrated into Windows. But it also has some limitations (see below).

Again it is possible to choose from several different Linux distributions. But for reasons already mentioned, you should choose Ubuntu.

Once you logged in to Ubuntu on WSL, continue as if you would run [Ubuntu natively](Octave_for_Debian_systems.html#The_right_way "Octave for Debian systems").

WSL (or WSL2) does not contain an X server. The X server on Linux is necessary to present program windows to the users. So by default, WSL is only a command line interface. You can start that command line interface with the "Ubuntu" shortcut in the start menu.

If you want to run the Octave GUI, you can install an X server. There are several you can choose from. One of them is [VcXsrv](https://sourceforge.net/projects/vcxsrv/files/latest/download). When you start VcXsrv, choose "Multiple Windows", "Start no client", deselect "Native opengl", and select "Disable access control" to be able to use the X server from WSL. Additionally, append the following lines to your .bashrc file in the home directory on the WSL Ubuntu:

```bash
export DISPLAY=$(awk '/nameserver / {print $2; exit}' /etc/resolv.conf 2>/dev/null):0
export LIBGL_ALWAYS_INDIRECT=1
```

You can access that file via the share "\\\\wsl$\\Ubuntu\\home\\username\\.bashrc" (where "Ubuntu" is the name of the distribution you installed and "username" is your username on that distribution.

Because of the basic lack of a graphical user interface (even if somewhat mitigated with the X server), using WSL(2) is not recommended for beginners.

## Building natively (MSYS2)

Octave can also be compiled natively on Windows with the MSYS2 shell.

To set up a native build environment on Windows, download and install MSYS2 following the instructions on [their website](https://www.msys2.org/).

Use the "MSYS2 MinGW 64bit" shell for building Octave.

The following command can be used to install the necessary and optional build and run-time dependencies in MSYS2:

```bash
pacman -S base-devel mingw-w64-x86_64-autotools mingw-w64-x86_64-cc mingw-w64-x86_64-fc mingw-w64-x86_64-gperf mingw-w64-x86_64-openblas mingw-w64-x86_64-pcre2 \
  mingw-w64-x86_64-arpack mingw-w64-x86_64-curl mingw-w64-x86_64-fftw mingw-w64-x86_64-fltk mingw-w64-x86_64-gl2ps mingw-w64-x86_64-glpk mingw-w64-x86_64-ghostscript mingw-w64-x86_64-gnuplot mingw-w64-x86_64-graphicsmagick mingw-w64-x86_64-hdf5 mingw-w64-x86_64-libsndfile mingw-w64-x86_64-portaudio mingw-w64-x86_64-qhull mingw-w64-x86_64-qrupdate mingw-w64-x86_64-qscintilla mingw-w64-x86_64-qt5-base mingw-w64-x86_64-qt5-imageformats mingw-w64-x86_64-qt5-svg mingw-w64-x86_64-qt5-tools mingw-w64-x86_64-rapidjson mingw-w64-x86_64-suitesparse mingw-w64-x86_64-sundials \
  git mercurial mingw-w64-x86_64-ccache mingw-w64-x86_64-icoutils mingw-w64-x86_64-librsvg texinfo \
  unzip zip
```

Using ccache is optional. It speeds up compilation time but needs several GiB free disk space for its cache. If disk space is an issue, this step can be skipped. To prepend the path to the ccache helper scripts to the front of the PATH variable, add the following line near the end of the .bash\_profile file in your MSYS2 $HOME directory:

```bash
export PATH="/mingw64/lib/ccache/bin:$PATH"
```

Additionally, add the following line to the .bash\_profile file in your MSYS2 $HOME directory to allow successfully calling programs from perl scripts:

```bash
export PERL5SHELL="bash -l -c"
```

Like installing the build dependencies, this has to be done only once.

To build from the development sources, check out the Mercurial repository and run the bootstrap script:

```bash
hg clone https://www.octave.org/hg/octave
cd octave
./bootstrap
```

Create a sub-directory to avoid building in the source tree:

```bash
mkdir -p .build
cd .build
```

Configure with the following flags:

```bash
../configure \
  --disable-docs \
  gl_cv_have_weak=no
```

And build with the following command:

```bash
make all -j8
```

Windows doesn't have a shebang mechanism to execute scripts with an arbitrary interpreter. But the `makeinfo` program in MSYS2 is implemented as a perl script. As a work-around, tell Octave to interpret that file with the `perl` interpreter. You could do that, e.g., by running the following command to append to the global startup file:

```bash
echo 'makeinfo_program (sprintf ("%s && cd %s/../usr/bin && perl makeinfo", OCTAVE_HOME ()(1:2), OCTAVE_HOME ()));' >> "${MINGW_PREFIX}/share/octave/site/m/startup/octaverc"
```

This has to be done only once.

A relocation issue with the graphicsmagick library in MSYS2 might cause Octave to crash on certain commands unless it is installed to the default location. To avoid these possible crashes, install Octave (from the MSYS2 shell in .build) before using it:

```bash
make install
```

Windows' library lookup mechanism requires that the following executables are installed in the same folder like the libraries they depend on. That can be achieved by creating symlinks to these executables in the "correct" location:

```bash
ln -sf /mingw64/libexec/octave/7.0.0/exec/x86_64-w64-mingw32/octave-gui.exe /mingw64/bin/octave-gui.exe
ln -sf /mingw64/libexec/octave/7.0.0/exec/x86_64-w64-mingw32/octave-svgconvert.exe /mingw64/bin/octave-svgconvert.exe
```

These symlinks are only needed when building the GUI (i.e., Qt is not disabled). This step is no longer necessary with Octave 7 or newer.

At this point, Octave's GUI can be started with the command `octave --gui` at the MSYS2/MINGW64 shell.

If you'd like to start Octave from a CMD shell (or with a batch script), the following commands could be used (assuming MSYS2 was installed in its default location):

```batch
set PATH=C:\msys64\mingw64\bin;C:\msys64\usr\bin;%PATH%
set MSYSTEM=MINGW64
set TERM=cygwin
set GNUTERM=wxt
set GS=gs.exe
set PERL5SHELL=bash -l -c
octave-gui --gui
```

If Octave was built without GUI, there won't be an octave-gui executable. In that case, replace the last line with `octave-cli`.

# Footnotes

1.  [↑](#cite_ref-1) [https://lists.gnu.org/archive/html/octave-maintainers/2020-02/msg00014.html](https://lists.gnu.org/archive/html/octave-maintainers/2020-02/msg00014.html)

[Categories](Special%253ACategories.html "Special:Categories"):

+   [Microsoft Windows](Category%253AMicrosoft_Windows.html "Category:Microsoft Windows")
+   [Building](Category%253ABuilding.html "Category:Building")