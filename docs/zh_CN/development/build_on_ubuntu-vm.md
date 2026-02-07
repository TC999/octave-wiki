# 在 Ubuntu 虚拟机中构建

本页面介绍如何在 Windows 主机上的 Ubuntu 虚拟机中构建 Octave。实现方式有多种。

除了下面描述的 VirtualBox 方法外，还可以使用 **Windows Subsystem for Linux（WSL）** [$$1$$](https://docs.microsoft.com/en-us/windows/wsl/about)。  
- 在 Windows 10 上可使用 WSL2，但若需图形输出，需在 Windows 上安装 X11 或 VNC 客户端，并在虚拟 Linux 系统中设置虚拟 X11 显示。  
- 在 Windows 11 上则可使用 WSLg，它已内置 X11 客户端并提供即用型 X11 显示环境。  

WSL 和 WSL2 的性能接近原生 Unix 系统。Ubuntu 是 WSL2/WSLg 支持安装的操作系统之一。一旦安装完成，后续构建步骤与使用 VirtualBox 安装的 Ubuntu 系统完全相同。

本页面内容简洁且自成一体，旨在帮助初学者快速上手 Octave 开发。所列依赖库和操作步骤已在 Ubuntu 20.04 上验证通过。

## 目录

+   [1 VirtualBox](#VirtualBox)
+   [2 依赖项](#依赖项)
+   [3 构建目录](#构建目录)
+   [4 调试](#调试)
+   [5 保存与提交补丁](#保存与提交补丁)

# VirtualBox

1\. 创建虚拟机（VM）。

1.  1.  从 [virtualbox.org](https://www.virtualbox.org/) 下载并安装 VirtualBox。
    2.  从 [ubuntu.com](https://ubuntu.com/download/desktop) 下载 Ubuntu Desktop 的 ISO 镜像文件。
    3.  启动 VirtualBox。在“Oracle VM VirtualBox 管理器”中，选择：**Machine → New（机器 → 新建）**。  
        - 名称：`OctaveDev`  
        - 类型：Linux  
        - 版本：Ubuntu (64-bit)  
        将“内存大小”调整为物理内存的一半。例如，若主机有 16384 MB 内存，则设为 8192 MB。  
        在“硬盘”选项中，选择 **“现在创建虚拟硬盘”**，点击 **Create（创建）**。
    4.  在“创建虚拟硬盘”窗口中：  
        - 文件大小：50 GB  
        - 硬盘文件类型：VDI  
        - 存储方式：动态分配（Dynamically allocated）  
        点击 **Create（创建）**。
    5.  返回“Oracle VM VirtualBox 管理器”，选中 `OctaveDev`，点击 **Settings（设置）**。  
        - 在 **System（系统）→ Processor（处理器）** 标签页中，将 CPU 核心数设为主机的一半（例如 8 核主机设为 4 核），以加快编译速度并提升虚拟机响应性。  
        - 在 **Storage（存储）** 中，找到 “Controller: IDE”，选中右侧的 “Empty” 项。  
          在下方 “Attributes（属性）” 区域，点击光盘图标，选择 **“Choose a disk file...（选择磁盘文件...）”**，浏览并选中之前下载的 Ubuntu ISO 文件。点击 **OK**。
    6.  双击新建的虚拟机启动它，按提示安装操作系统。务必设置用户名和密码。本教程使用的用户名为 `ubuntuuser`。
    7.  安装完成后重启 Ubuntu 系统，按 **Ctrl+Alt+T** 打开终端，执行以下命令：
        ```bash
        $ sudo apt-get update
        $ sudo apt-get install gcc make perl
        ```
    8.  在 VirtualBox 菜单中选择 **Devices（设备）→ Insert Guest Additions CD Image...（插入增强功能光盘镜像...）**，按提示完成安装。安装完毕后重启 Ubuntu 系统。

# 依赖项

2\. 安装依赖库。

在 Ubuntu 系统中，按 **Ctrl+Alt+T** 打开终端，执行以下命令（仅在 Ubuntu 24.04 上测试过）：

```bash
$ sudo apt-get update
$ sudo apt-get install build-essential mercurial gcc g++ gfortran make libblas-dev liblapack-dev epstool transfig libglpk-dev libreadline-dev llvm-dev lpr texinfo pstoedit libqhull-dev libqrupdate-dev libsuitesparse-dev texlive libxft-dev autoconf automake bison flex gperf gzip icoutils libtool perl rsync tar libpcre3-dev libarpack2-dev libcurl4-openssl-dev libfftw3-dev libfltk1.3-dev libfontconfig1-dev libfreetype-dev libgl2ps-dev gnuplot-x11 libgraphicsmagick++1-dev libhdf5-dev libsndfile1-dev libgl1-mesa-dev libosmesa6-dev portaudio19-dev zlib1g-dev libegl1-mesa-dev libgles2-mesa-dev libwayland-dev openjdk-21-jdk openjdk-21-jre openjdk-21-jre-headless openjdk-21-jdk-headless qttools5-dev-tools qtbase5-dev qtbase5-dev-tools qttools5-dev libqscintilla2-qt5-dev libqt5opengl5-dev git rapidjson-dev libsundials-dev doxygen texlive-latex-extra graphviz librsvg2-bin
```

3\. Mercurial 配置。

请参考 [Mercurial](Mercurial.html "Mercurial") 页面中 “Example Mercurial configuration（Mercurial 配置示例）” 一节的说明进行配置。

# 构建目录

4\. 设置构建目录。

```bash
$ mkdir -p /home/ubuntuuser/projects/octave_src
$ cd /home/ubuntuuser/projects/octave_src
$ hg clone http://www.octave.org/hg/octave octave
$ cd octave
$ ./bootstrap --force
$ mkdir -p bld_dir; cd bld_dir;
```

5\. 配置构建。

```bash
$ cd /home/ubuntuuser/projects/octave_src/octave/bld_dir
$ rm -rf *
$ ../configure -v --prefix=/home/ubuntuuser/projects/octave_src/octave_install >& configure.out
```

检查是否有库未被 configure 脚本找到：

```bash
$ grep -i "library not found" configure.out
```

6\. 编译。

```bash
$ make -j 4 V=1 >& make.out
```

# 调试

7\. 调试。

> 注意：`--enable-address-sanitizer-flags` 选项会导致构建失败，因此已被移除。  
> 以下步骤参考自 [Debugging Octave](Debugging_Octave.html "Debugging Octave")：

```bash
$ cd /home/ubuntuuser/projects/octave_src/octave
$ mkdir -p dbg_bld_dir; cd dbg_bld_dir;
$ rm -rf *
$ ../configure -v --prefix=/home/ubuntuuser/projects/octave_src/octave_install_dbg FFLAGS=-g CFLAGS=-g CXXFLAGS=-g >& configure.out
$ make -j 4 V=1 >& make.out
$ echo 0 | sudo tee /proc/sys/kernel/yama/ptrace_scope
$ ./run-octave --gui
```

然后在 Octave 命令行中运行以下命令：

```matlab
>> system (sprintf ("gnome-terminal --command 'gdb -p %d'", getpid ()), 0, "async");
```

在新弹出的终端窗口中，依次执行以下 GDB 命令：  
首先关闭分页，然后为所有线程在 `variable_editor::edit_variable` 函数处设置断点（该函数将在另一个线程中被调用），最后输入 `c` 继续运行。

```gdb
(gdb) set pagination off
(gdb) thread apply all break variable_editor::edit_variable
(gdb) c
```

回到 Octave 命令行：

```matlab
>> a = [1 2]
```

仍在 Octave 中，找到 **Workspace（工作区）** 小部件（列出当前所有变量），双击变量 `a`。此时 Octave 界面无反应，但切换到 GDB 窗口会发现程序已在断点处暂停。输入以下命令查看最近 10 层的调用栈：

```gdb
(gdb) backtrace 10
```

若要禁用断点并继续运行程序：

```gdb
(gdb) disable breakpoints
(gdb) c
```

# 保存与提交补丁

8\. 保存您的修改并生成补丁。

若仅修改了一个文件，保存更改如下：

```bash
$ cd /home/ubuntuuser/projects/octave_src/octave
$ hg commit -m "描述您所做的修改。"
$ hg export --git > ../yourwork_date.diff
```

若进行了多次提交，可导出指定范围的修订版本：

```bash
$ hg export --git -r 28648:28649 > ../yourwork_date.diff
```

保存更改并生成补丁的标准方法（参见 [生成变更集的基础知识](https://octave.org/doc/v4.0.1/Basics-of-Generating-a-Changeset.html)）：

```bash
$ cd /home/ubuntuuser/projects/octave_src/octave
$ hg commit -m "描述您所做的修改。"
$ hg export -o ../yourwork_date.diff tip
```

如果添加了二进制文件（如 PNG 图片），请在导出时使用 `--git` 选项：

```bash
$ hg export --git -o ../yourwork_date.diff tip
```