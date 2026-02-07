# Building on Ubuntu Virtual Machine

This page contains instructions on how to build Octave in an Ubuntu virtual machine in a Windows Host. There are multiple approaches to this.

In addition to the VirtualBox approach described below, it is possible to use the Windows Subsystem for Linux [\[1\]](https://docs.microsoft.com/en-us/windows/wsl/about). On windows 10 wsl2 can be used, which for graphical output requires installing an X11 or VNC client on windows, and setting up a virtual X11 display on the virtual linux system. On windows 11 wslg is available with comes with an integrated X11 client and ready to use X11 display. Wsl and wsl2 have near native unix performance. Ubuntu is one of the available OS-es to install for wsl2/wslg, and once that is installed the instructions as for the Ubuntu installed with VirtualBox apply.

This page is both concise and self-contained to allow beginners to quickly develop code for Octave. The libraries and instructions have been tested in Ubuntu 20.04.

## Contents

+   [1 VirtualBox](Building_on_Ubuntu_Virtual_Machine.html#VirtualBox)
+   [2 Dependencies](Building_on_Ubuntu_Virtual_Machine.html#Dependencies)
+   [3 Build Directory](Building_on_Ubuntu_Virtual_Machine.html#Build_Directory)
+   [4 Debug](Building_on_Ubuntu_Virtual_Machine.html#Debug)
+   [5 Save and Patch](Building_on_Ubuntu_Virtual_Machine.html#Save_and_Patch)

# VirtualBox

1\. Create VM.

1.  1.  Download VirtualBox from [virtualbox.org](https://www.virtualbox.org/), install.
    2.  Download Ubuntu Desktop iso from [ubuntu.com](https://ubuntu.com/download/desktop).
    3.  Start VirtualBox. In 'Oracle VM VirtualBox Manager', Select: Machine -> New. In Name, put: OctaveDev; Type: Linux; Version: Ubuntu (64-bit). Adjust 'Memory size' to half of what is available. For example, if 16384 MB are available, type 8192. In 'Hard disk', select: 'Create a virtual hard disk now'. Click Create.
    4.  In 'Create Virtual Hard Disk' window, under 'File size': 50 GB; 'Hard disk file type': VDI; 'Storage on physical hard disk': Dynamically allocated. Click Create.
    5.  Back to 'Oracle VM VirtualBox Manager', select OctaveDev, click on Settings. In System, select Processor tab. Adjust the number of CPUs to half of what is available, since this will speed up the compilation and responsiveness of the VM. For example, if you have 8 cores, select 4. In Storage, under 'Controller: IDE', select Empty. Under Attributes, click on the disk icon (shown on the right), then select 'Choose a disk file ...'. Browse and select the iso file previously downloaded. Click OK.
    6.  Double click the newly created VM to start it. Follow the prompts to install the operating system. Don't forget to add a username and a password. This tutorial has the username as 'ubuntuuser'.
    7.  After the installation procedure is finished: restart the Ubuntu system, open a terminal by pressing Ctrl+Alt+t. Issue the following commands : $ sudo apt-get update; $sudo apt-get install gcc make perl
    8.  In the VirtualBox window select Devices, then 'Insert Guest Additions CD Image...', and follow the prompts. After the installation is finished, restart the Ubuntu system.

# Dependencies

2\. Install dependencies.

In the Ubuntu system, open a terminal by pressing Ctrl+Alt+t. Issue the following commands (tested only on Ubuntu 24.04):

```bash
   $ sudo apt-get update
   $ sudo apt-get install build-essential mercurial gcc g++ gfortran make libblas-dev liblapack-dev epstool transfig libglpk-dev libreadline-dev llvm-dev lpr texinfo pstoedit libqhull-dev libqrupdate-dev libsuitesparse-dev texlive libxft-dev autoconf automake bison flex gperf gzip icoutils libtool perl rsync tar libpcre3-dev libarpack2-dev libcurl4-openssl-dev libfftw3-dev libfltk1.3-dev libfontconfig1-dev libfreetype-dev libgl2ps-dev gnuplot-x11 libgraphicsmagick++1-dev libhdf5-dev libsndfile1-dev libgl1-mesa-dev libosmesa6-dev portaudio19-dev zlib1g-dev libegl1-mesa-dev libgles2-mesa-dev libwayland-dev openjdk-21-jdk openjdk-21-jre openjdk-21-jre-headless openjdk-21-jdk-headless qttools5-dev-tools qtbase5-dev qtbase5-dev-tools qttools5-dev libqscintilla2-qt5-dev libqt5opengl5-dev git rapidjson-dev libsundials-dev doxygen texlive-latex-extra graphviz librsvg2-bin
```

3\. Mercurial.

From the page [Mercurial](Mercurial.html "Mercurial"), follow the steps under the section 'Example Mercurial configuration'.

# Build Directory

4\. Setup the build directory.

```bash
   $ mkdir -p /home/ubuntuuser/projects/octave_src
   $ cd /home/ubuntuuser/projects/octave_src
   $ hg clone http://www.octave.org/hg/octave octave
   $ cd octave
   $ ./bootstrap --force
   $ mkdir -p bld_dir; cd bld_dir;
```

5\. Configure.

```bash
   $ cd /home/ubuntuuser/projects/octave_src/octave/bld_dir
   $ rm * -r -f; ../configure -v --prefix=/home/ubuntuuser/projects/octave_src/octave_install >& configure.out;
```

To check if any library has not been found by the configure script:

```bash
   $ grep -i "library not found" configure.out
```

6\. Make.

```bash
   $ make -j 4 V=1 >& make.out
```

# Debug

7\. Debugging.

Note: The option ‘--enable-address-sanitizer-flags’ breaks the build, so it was removed. From [Debugging Octave](Debugging_Octave.html "Debugging Octave"):

```bash
   $ cd /home/ubuntuuser/projects/octave_src/octave
   $ mkdir -p dbg_bld_dir; cd dbg_bld_dir;
   $ rm * -r -f; ../configure -v --prefix=/home/ubuntuuser/projects/octave_src/octave_install_dbg FFLAGS=-g CFLAGS=-g CXXFLAGS=-g >& configure.out
   $ make -j 4 V=1 >& make.out
   $ echo 0 | sudo tee /proc/sys/kernel/yama/ptrace_scope
   $ ./run-octave --gui
```

Then run the following command in Octave command line:

```bash
   >> system (sprintf ("gnome-terminal --command 'gdb -p %d'", getpid ()), 0, "async");
```

In the new terminal window that appears: First set pagination off, then apply a breakpoint at the function edit\_variable (which will be hit in another thread from the current one, so apply breakpoint for all threads), then type 'c' to continue.

```bash
   (gdb) set pagination off
   (gdb) thread apply all break variable_editor::edit_variable
   (gdb) c
```

In Octave's command line:

```bash
   >> a = [1 2]
```

Still in Octave, locate the Workspace widget (which lists all the current variables). Double-click on the variable ‘a’. Nothing happens in Octave, but if you switch to gdb, you can see that the program stopped at the breakpoint. Now backtrace 10 to show the calling information:

```bash
   (gdb) backtrace 10
```

To disable breakpoints and continue running the program:

```bash
   (gdb) disable breakpoints
   (gdb) c
```

# Save and Patch

8\. Save your work and send patch.

To save your changes to a single file:

```bash
   $ cd /home/ubuntuuser/projects/octave_src/octave
   $ hg commit -m "Description about the changes you have made."
   $ hg export --git > ../yourwork_date.diff
```

If you have made multiple commits, export all the revisions that you have made:

```bash
   $ hg export --git -r 28648:28649 > ../yourwork_date.diff
```

To save your changes and send a patch ([Basics of Generating a Changeset](https://octave.org/doc/v4.0.1/Basics-of-Generating-a-Changeset.html)):

```bash
   $ cd /home/ubuntuuser/projects/octave_src/octave
   $ hg commit -m "Description about the changes you have made."
   $ hg export -o ../yourwork_date.diff tip
```

If you added binary files such as png files, use --git option in export:

```bash
   $ hg export --git -o ../yourwork_date.diff tip
```