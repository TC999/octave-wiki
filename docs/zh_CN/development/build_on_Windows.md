# 在 Microsoft Windows 上构建

> 本页面面向有兴趣为 Octave 贡献代码的新开发者。如果您只想安装 Octave，请参阅 [安装类别](../../install "Category:Installation")。

> 有关在 Linux 上构建 Octave 的通用说明，请阅读 [构建](building.md "Building")。

## 目录

+   [1 为 Octave 做贡献](#为_Octave_做贡献)
+   [2 构建 Octave](#构建_Octave)
    +   [2.1 虚拟机](#虚拟机)
    +   [2.2 Windows Subsystem for Linux](#Windows_Subsystem_for_Linux)
    +   [2.3 原生构建 (MSYS2)](#原生构建_\(MSYS2\))
+   [3 脚注](#脚注)

# 为 Octave 做贡献

Octave 的开发主要在 Linux 上进行。但如果您运行的是 Windows，您仍然可以为 Octave 做贡献。

（不仅限于 Windows）最简单的贡献方式可能是修改或添加 .m 文件。

如果您发现了一些想要修复或改进的地方，请查看 [bug 跟踪器](https://savannah.gnu.org/bugs/?group=octave)。它可能已经在开发版本或（未发布的）稳定版本中被修复。

Octave 的版本控制在位于 [https://www.octave.org/hg/octave](https://www.octave.org/hg/octave) 的 [Mercurial](mercurial.md "Mercurial") 代码库中进行。

Windows 上有多个 Mercurial 客户端。其中 [TortoiseHg](https://tortoisehg.bitbucket.io/download/index.html) 能与 Windows 资源管理器良好集成，并提供易于学习的用户界面。使用该软件创建 Mercurial 补丁也相当容易。这是向 Octave 贡献代码的首选方式。

# 构建 Octave

如果您想贡献 C++ 文件的更改，或者对测试最新的开发版本或（未发布的）稳定版本感兴趣，您可以从源代码构建 Octave。

使用 MSYS2 shell 在 Windows 上原生构建 Octave 似乎是可能的。（请注意，这可能需要一些时间。）也可以使用虚拟机或微软的 Windows Subsystem for Linux 在 Windows 机器上构建 Octave。使用虚拟机是目前在 Windows 机器上构建 Octave 的推荐方式。

在 Windows 上原生构建 Octave 是实验性的！创建 Octave Windows 二进制文件的唯一受支持方式是使用 MXE Octave 进行交叉构建（[Windows 安装程序](windows_installer.md "Windows Installer")）。

## 虚拟机

大多数 Octave 的开发者运行的是 Debian 或 Ubuntu [\[1\]](#cite_note-1)。因此，如果您遇到问题，这些 Linux 发行版可能是您最有可能获得帮助的。以下主要关注 Ubuntu。

[VMWare Player](https://www.vmware.com/products/workstation-player.html) 对于非商业用途是免费的（无需费用）。

网络上有很多提供免费完整 Linux 虚拟机镜像的来源。其中之一是 [osboxes.org](https://www.osboxes.org/)。您可以从 [他们的网站](https://www.osboxes.org/ubuntu/#ubuntu-20-04-vmware) 下载适用于 VMWare Player 的 Ubuntu 镜像。下载完成后，解压镜像文件。

您还需要一个 .vmx 文件才能使用 VMWare Player 启动虚拟机。要创建一个包含最小设置的 .vmx 文件，请打开一个文本编辑器，将以下内容保存为您下载的虚拟机镜像旁边的名为 Ubuntu.vmx 的文件：

**文件：** Ubuntu.vmx

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

将带有 Ubuntu.vmdk 的那一行更改为您刚刚下载的 Ubuntu 镜像的实际文件名。

您可以双击刚刚创建的 .vmx 文件来启动虚拟机。

在 VMWare Player 的虚拟机设置中更改要分配给虚拟机的内存量或处理器数量。

从 osboxes 下载的虚拟机的登录数据是：  
用户名：osboxes  
密码：osboxes.org

一旦您启动了虚拟机并登录，就可以继续操作，就像您 [原生运行 Ubuntu](../install/Debian.md#The_right_way "Octave for Debian systems") 一样。

## Windows Subsystem for Linux

Windows Subsystem for Linux (WSL) 在其第一个版本中对于严肃的开发来说并不十分理想。许多缺点（如极其缓慢的"fork"和"stat"操作）已在与 Windows 10 Update 2004 一起发布的 WSL2 中得到修复。

要在 Windows 上安装 WSL2，请遵循 [微软的说明](https://docs.microsoft.com/en-us/windows/wsl/install-win10)。

WSL2 基本上是一个运行 Linux 内核的虚拟机，但它与 Windows 集成得更紧密。不过它也有一些限制（见下文）。

同样，您可以从几种不同的 Linux 发行版中进行选择。但出于前面提到的原因，您应该选择 Ubuntu。

一旦您登录到 WSL 上的 Ubuntu，就可以继续操作，就像您 [原生运行 Ubuntu](../install/Debian.md#The_right_way "Octave for Debian systems") 一样。

WSL（或 WSL2）不包含 X 服务器。Linux 上的 X 服务器对于向用户呈现程序窗口是必需的。因此，默认情况下，WSL 只是一个命令行界面。您可以通过开始菜单中的"Ubuntu"快捷方式启动该命令行界面。

如果您想运行 Octave GUI，可以安装一个 X 服务器。有多个可供选择。其中之一是 [VcXsrv](https://sourceforge.net/projects/vcxsrv/files/latest/download)。启动 VcXsrv 时，选择"Multiple Windows"、"Start no client"，取消选中"Native opengl"，并选中"Disable access control"以便能够从 WSL 使用 X 服务器。此外，将以下行追加到 WSL Ubuntu 主目录中的 .bashrc 文件：

```bash
export DISPLAY=$(awk '/nameserver / {print $2; exit}' /etc/resolv.conf 2>/dev/null):0
export LIBGL_ALWAYS_INDIRECT=1
```

您可以通过共享路径 "\\\\wsl$\\Ubuntu\\home\\用户名\\.bashrc" 访问该文件（其中"Ubuntu"是您安装的发行版名称，"用户名"是该发行版上的您的用户名）。

由于基本缺乏图形用户界面（即使通过 X 服务器有所缓解），不建议初学者使用 WSL(2)。

## 原生构建 (MSYS2)

Octave 也可以使用 MSYS2 shell 在 Windows 上原生编译。

要在 Windows 上设置原生构建环境，请按照 [其网站](https://www.msys2.org/) 上的说明下载并安装 MSYS2。

使用 "MSYS2 MinGW 64bit" shell 来构建 Octave。

以下命令可用于在 MSYS2 中安装必要和可选的构建及运行时依赖项：

```bash
pacman -S base-devel mingw-w64-x86_64-autotools mingw-w64-x86_64-cc mingw-w64-x86_64-fc mingw-w64-x86_64-gperf mingw-w64-x86_64-openblas mingw-w64-x86_64-pcre2 \
  mingw-w64-x86_64-arpack mingw-w64-x86_64-curl mingw-w64-x86_64-fftw mingw-w64-x86_64-fltk mingw-w64-x86_64-gl2ps mingw-w64-x86_64-glpk mingw-w64-x86_64-ghostscript mingw-w64-x86_64-gnuplot mingw-w64-x86_64-graphicsmagick mingw-w64-x86_64-hdf5 mingw-w64-x86_64-libsndfile mingw-w64-x86_64-portaudio mingw-w64-x86_64-qhull mingw-w64-x86_64-qrupdate mingw-w64-x86_64-qscintilla mingw-w64-x86_64-qt5-base mingw-w64-x86_64-qt5-imageformats mingw-w64-x86_64-qt5-svg mingw-w64-x86_64-qt5-tools mingw-w64-x86_64-rapidjson mingw-w64-x86_64-suitesparse mingw-w64-x86_64-sundials \
  git mercurial mingw-w64-x86_64-ccache mingw-w64-x86_64-icoutils mingw-w64-x86_64-librsvg texinfo \
  unzip zip
```

使用 ccache 是可选的。它可以加快编译时间，但需要数 GiB 的可用磁盘空间来存储其缓存。如果磁盘空间有限，可以跳过此步骤。要将 ccache 辅助脚本的路径前置到 PATH 变量的前面，请在您的 MSYS2 $HOME 目录中的 .bash\_profile 文件末尾附近添加以下行：

```bash
export PATH="/mingw64/lib/ccache/bin:$PATH"
```

此外，在您的 MSYS2 $HOME 目录中的 .bash\_profile 文件中添加以下行，以允许从 perl 脚本成功调用程序：

```bash
export PERL5SHELL="bash -l -c"
```

与安装构建依赖项一样，这只需要做一次。

要从开发源代码构建，请检出 Mercurial 代码库并运行引导脚本：

```bash
hg clone https://www.octave.org/hg/octave
cd octave
./bootstrap
```

创建一个子目录以避免在源代码树中构建：

```bash
mkdir -p .build
cd .build
```

使用以下标志进行配置：

```bash
../configure \
  --disable-docs \
  gl_cv_have_weak=no
```

并使用以下命令构建：

```bash
make all -j8
```

Windows 没有 shebang 机制来使用任意解释器执行脚本。但是 MSYS2 中的 `makeinfo` 程序是作为 perl 脚本实现的。作为一种变通方法，告诉 Octave 使用 `perl` 解释器来解释该文件。例如，您可以运行以下命令将其追加到全局启动文件中：

```bash
echo 'makeinfo_program (sprintf ("%s && cd %s/../usr/bin && perl makeinfo", OCTAVE_HOME ()(1:2), OCTAVE_HOME ()));' >> "${MINGW_PREFIX}/share/octave/site/m/startup/octaverc"
```

这只需要做一次。

MSYS2 中 graphicsmagick 库的一个重定位问题可能导致 Octave 在某些命令上崩溃，除非它被安装到默认位置。为避免这些可能的崩溃，请在使用 Octave 之前（在 .build 的 MSYS2 shell 中）安装它：

```bash
make install
```

Windows 的库查找机制要求以下可执行文件必须安装在与它们所依赖的库相同的文件夹中。这可以通过在"正确"的位置创建指向这些可执行文件的符号链接来实现：

```bash
ln -sf /mingw64/libexec/octave/7.0.0/exec/x86_64-w64-mingw32/octave-gui.exe /mingw64/bin/octave-gui.exe
ln -sf /mingw64/libexec/octave/7.0.0/exec/x86_64-w64-mingw32/octave-svgconvert.exe /mingw64/bin/octave-svgconvert.exe
```

这些符号链接仅在构建 GUI 时才需要（即未禁用 Qt）。对于 Octave 7 或更高版本，此步骤不再是必需的。

此时，可以在 MSYS2/MINGW64 shell 中使用命令 `octave --gui` 启动 Octave 的 GUI。

如果您想从 CMD shell（或使用批处理脚本）启动 Octave，可以使用以下命令（假设 MSYS2 已安装在其默认位置）：

```batch
set PATH=C:\msys64\mingw64\bin;C:\msys64\usr\bin;%PATH%
set MSYSTEM=MINGW64
set TERM=cygwin
set GNUTERM=wxt
set GS=gs.exe
set PERL5SHELL=bash -l -c
octave-gui --gui
```

如果 Octave 是在没有 GUI 的情况下构建的，则不会有 octave-gui 可执行文件。在这种情况下，请将最后一行替换为 `octave-cli`。

# 脚注

1.  [↑](#cite_ref-1) https://lists.gnu.org/archive/html/octave-maintainers/2020-02/msg00014.html

[分类](Special%253ACategories.html "Special:Categories"):

+   [Microsoft Windows](Category%253AMicrosoft_Windows.html "Category:Microsoft Windows")
+   [构建](Category%253ABuilding.html "Category:Building")