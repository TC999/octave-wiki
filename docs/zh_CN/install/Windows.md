# Microsoft Windows

*本文介绍如何在 Windows 上使用预编译的 Octave 安装程序；有关如何构建的说明，请参阅 [Windows Installer](Windows_Installer.html "Windows Installer")。*

> ![Info icon](../../assets/info/26px-Info_icon.svg.png)
>
> **Octave 最新版本（10.3.0，于 2025 年 9 月 23 日发布）** 的 Windows 安装程序可从 [https://ftpmirror.gnu.org/gnu/octave/windows/](https://ftpmirror.gnu.org/gnu/octave/windows/) 获取。

除非有特定功能或需求需要使用旧版本软件，否则建议用户使用最新版本。下面提供了特定版本的说明和安装注意事项。

**注意：** 从 8.3.0 版本开始，**Octave 项目不再发布 32 位 Windows 版本的二进制文件**。32 位 Windows Octave 二进制文件的替代来源是使用 [MSYS2](#GNU_Octave_in_MSYS2 "Octave for Microsoft Windows")。

**注意：** 从 4.4.1 版本开始，**Octave 不再支持 Windows XP**。可能有一些解决方法可以让 Octave 在命令行模式下安装和运行（参见 Bug [#54662](https://savannah.gnu.org/bugs/?54662)），但维护者无法对此提供超出已记录内容的支持和故障排除。

## 目录

+   [1 Microsoft Windows 安装程序](#Installers_for_Microsoft_Windows)
    +   [1.1 Octave 软件包](#Octave_Packages)
        +   [1.1.1 预安装的软件包](#Pre-installed_Packages)
        +   [1.1.2 软件包安装和更新](#Package_Installation_and_Update)
+   [2 MSYS2 中的 GNU Octave](#GNU_Octave_in_MSYS2)
+   [3 cygwin 上的 GNU Octave](#GNU_Octave_on_cygwin)
    +   [3.1 cygwin 注意事项](#Notes_for_cygwin)
+   [4 一般信息](#General_info)
+   [5 另请参阅](#See_also)

# Microsoft Windows 安装程序

在 Microsoft Windows 上安装 GNU Octave 最简单的方法是使用 [MXE](http://hg.octave.org/mxe-octave/) 构建版本。对于当前版本，可以在 [https://octave.org/download](https://octave.org/download) 的 Windows 选项卡下找到 64 位安装程序和 zip 压缩包（.zip 和 .7z 格式）。

+   对于可执行文件（.exe）安装程序：用户只需运行下载的文件并按照屏幕上的安装提示进行操作即可。建议安装路径不包含非 ASCII 字符。程序的快捷方式将自动创建，安装后脚本将自动运行。但在某些系统上，您可能需要在首次运行 Octave 之前运行 post-install.bat 文件，以减少由于 Windows 字体缓存导致的绘图延迟，并使预安装的软件包对系统可见。

+   对于 7z/zip 压缩包：

1.  将文件内容解压缩到硬盘上的目录中（例如 C:\\Octave）。路径中不建议使用空格或非 ASCII 字符，可能会导致程序错误。
2.  手动为主安装目录中的 octave-launch.exe 文件创建快捷方式。（右键单击该文件，选择"创建快捷方式"，然后将新快捷方式移动到所需位置。）
3.  如果需要仅命令行的 Octave 实例，用户可以按照上述方法创建另一个快捷方式，右键单击该快捷方式，选择"属性"，并在"目标"字段的末尾添加 `--no-gui`。
4.  重要提示：在首次运行 Octave 之前运行 post-install.bat 文件，以减少由于 Windows 字体缓存导致的绘图延迟，并使预安装的软件包对系统可见。
5.  exe 安装程序会提示您选择要使用的基本线性代数子程序（BLAS）库，并创建 BLAS 切换程序的快捷方式。7z/zip 压缩包默认使用 [Reference BLAS](https://netlib.org/blas)。[OpenBLAS](https://www.openblas.net) 也可用，对某些用户来说可能更可取。想要更改 BLAS 库的 7z/zip 压缩包用户可以手动运行位于 /mingw64/bin/blas\_switch.exe 的切换程序。

+   注意：7.1.0 之前的版本使用 .vbs 和 .bat 文件启动 Octave。octave.bat 文件仍然可在 \\mingw32\\bin 或 \\mingw64\\bin 中找到（具体取决于安装的 Octave 版本），供需要它来启动的用例使用。

## Octave 软件包

与许多软件程序一样，Octave 使用*软件包*来选择性地扩展和修改其功能。这些软件包可以使用内置的软件包管理程序 'pkg' 进行安装和加载。（请注意，Octave 不会自动加载已安装的软件包，必须由用户在 Octave 中手动加载。）

Octave 维护一个系统级（或*全局*）软件包列表和一个用户特定（或*本地*）软件包列表。在 Windows 10 和 11 中，默认情况下本地软件包位于 C:\\Users\\%USERNAME%\\octave\\。（如果 \\octave 文件夹尚不存在，将在首次安装\\更新软件包时创建。）全局软件包存储在 %OCTAVE\_HOME%\\mingw64\\share\\octave\\packages\\ 中，可供机器上的所有用户使用。可以通过在 Octave 命令行中输入以下命令来查找系统上的特定位置：

```bash
  >> pkg local_list
  >> pkg global_list
```

6.1.0 之前的 Windows 版 Octave 默认始终对全局软件包进行更改，除非用户另有指定。现在默认在所有平台上遵循相同的行为，所有软件包更新和安装都将根据用户是否以管理员权限运行来应用于本地或全局软件包位置（在 Windows 上，这通常通过以管理员权限帐户运行或使用"以管理员身份运行"选项启动 Octave 来完成）。或者，某些 pkg 命令选项可以强制 octave 尝试使用本地或全局软件包。

### 预安装的软件包

官方 Windows 版本的所有版本都包含一组预构建的 [Octave Forge](Octave_Forge.html "Octave Forge") 软件包。如果您按照上述安装说明进行操作，则可以通过在 Octave 命令提示符下输入以下命令来显示软件包列表：

```bash
  >> pkg list
```

例如，安装到 C:\\Octave 的 10.1.0 版本包含的预安装全局软件包的输出为：

```
            包名        | 版本     | 安装位置
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

请注意，上面显示的包含软件包存储在 Octave 安装文件夹内的默认*全局软件包位置*中。如果之前使用其他 Windows 版本安装了任何"本地"软件包，它们也可能出现在本地位置的列表中。建议卸载并重新安装任何此类软件包，以保证与当前版本的 octave 的兼容性。

如果从 zip 或 7z 压缩包安装了 Octave 且未运行 post-install.bat 文件，则可能看不到列出的任何软件包。在这种情况下，您需要运行：

```bash
  >> pkg rebuild
```

这将强制 octave 在设置的位置查找*本地*和*全局*软件包，以重新填充可用软件包列表。请注意，如果两个位置都存在相同的软件包，则"本地"软件包始终优先。

**注意**：Windows 捆绑包包含用于 symbolic 软件包的最小版本 Python。该版本的 Python 不打算用于其他任何用途。如果您想在 Octave 中将 Python 用于其他用途（例如，用于 pythonic 软件包），请安装完整的 Python 发行版并设置必要的环境变量（PYTHON，...？）。

### 软件包安装和更新

所有软件包都可以通过运行以下命令更新到最新版本：

```bash
  >> pkg update
```

可以通过运行以下命令安装其他软件包：

```bash
  >> pkg install -forge <package_name>
```

要手动安装新的或更新的软件包版本，可以从 [Octave Forge 网站](https://octave.sourceforge.io/packages.php) 下载软件包文件到工作目录，并使用以下命令安装：

```bash
  >> pkg install package_file_name.tar.gz
```

请注意，上述所有命令将根据用户的管理员访问级别执行*本地*或*全局*软件包安装。例如，如果使用非提升权限的用户帐户为全局软件包找到更新，则更新版本将安装到*本地*软件包位置，而全局软件包位置中的旧版本保持不变。可以通过使用 \-global 选项调用 install 命令来更改此行为。从 Octave 7.1.0 开始，\-global 选项也适用于 pkg update 命令。例如：

```bash
  >> pkg install -forge -global <package_name>
```

```bash
  >> pkg update -global
```

有关安装单个 Octave Forge 软件包的详细说明，请参见 [https://octave.sourceforge.io/packages.php](https://octave.sourceforge.io/packages.php)。

# MSYS2 中的 GNU Octave

[MSYS2](https://www.msys2.org/) 是一组工具和库，提供了一个易于使用的环境，用于构建、安装和运行原生 Windows 软件。GNU Octave 在 MSYS2 中作为 [软件包](https://packages.msys2.org/base/mingw-w64-octave) 提供。

在 Windows 上使用 Octave 的最佳（推荐）方法是使用提供的安装程序（见上文）。但对于某些特殊要求，MSYS2 打包的 Octave 版本可能是更好的解决方案。这些特殊要求可能包括：

+   用户可能想要使用依赖于 MXE Octave 中未包含的第三方软件包的 Octave 软件包（例如，依赖于原生 Windows Python 安装的 Pythonic 软件包）。
+   用户可能需要比 MXE Octave 中包含的软件包更新版本的功能。
+   ...

MSYS2 遵循滚动发布周期。因此，其软件包很可能比 Windows 版 Octave 安装程序中包含的软件包更新。它包含一个（有效的）软件包管理器（`pacman`），提供了安装比 Windows 版 Octave 安装程序中可能包含的范围更广的软件包的选项。

要在 MSYS2 中使用 Octave，请按照 [他们的说明](https://www.msys2.org/#installation) 安装 MSYS2 环境。在 `bash` shell 中（例如从开始菜单使用“MSYS2 MinGW 64-bit”），通过 `pacman -Syu` 更新安装。之后，安装与您的环境（以及您正在使用的 shell）匹配的 Octave 版本，例如 `pacman -S mingw-w64-x86_64-octave`。

这将安装（除其他外）Octave 的主要可执行文件 `octave-gui`（与 Qt 链接，即包括“qt”图形工具包和 GUI）、`octave-cli`（未与 Qt 链接，即仅“fltk”和“gnuplot”图形工具包且没有 GUI），以及包装器可执行文件 `octave`，它根据使用的命令行开关分派到前面的可执行文件之一。可以在 MSYS2 的 `bash` shell 中使用 `octave --gui` 启动 Octave GUI，使用 `octave` 启动命令行界面（CLI）。

# [cygwin](https://cygwin.com/) 上的 GNU Octave

+   **维护者：** Marco Atzeri
+   **最新版本：** 2024-01-26

+   最新软件包：

octave-8.4.0-1

其在 cygwin 邮件列表上的公告 [\[1\]](https://cygwin.com/pipermail/cygwin-announce/2024-January/011503.html)

大多数 Octave Forge 软件包都有各自的 cygwin 软件包。

完整的 cygwin 软件包列表可在此处获得 [\[2\]](https://cygwin.com/packages/)

截至 2024-01-26，有 51 个 forge 软件包可用。

+   安装方法：

运行 setup-x86\_64.exe（用于 cygwin 64 位）并在 Math 类别中选择它们。

所有软件包依赖项也将被安装。

图形基于 X，要绘图，您需要在 xterm（或类似）中启动 octave。

我建议安装"xinit"、"xlaunch"和"gnuplot"。这些软件包将提取所有功能性的 Xserver。

否则，唯一的图形将是 ASCII 艺术 ;-)

## cygwin 注意事项

+   要从 cygwin 源软件包构建 GNU Octave，您需要安装“cygport”和相关的开发库

```bash
tar -xf octave-8.4.0-1-src.tar.xz 
cygport octave.cygport almostall
```

有关更多信息，请参阅 /usr/share/doc/cygport/html/manual/toc\_index.html 中的 cygport 文档。

# 一般信息

请注意，GNU Octave 主要在 GNU/Linux 和其他符合 [POSIX](https://en.wikipedia.org/wiki/POSIX) 的系统上开发。GNU Octave 到 Microsoft Windows 的移植使用不同的方法来获取大部分原始 Octave 并使其适应 Microsoft Windows 的特性（例如动态库、文件路径、权限、环境变量、GUI 系统等）。请记住这一点，如果您得到意外的结果，不要惊慨。邮件列表上有很多关于调整 Octave 安装的建议。用于 Windows 的 GNU Octave 独立移植版本使用 [MinGW](http://mingw.org) 或 Microsoft Visual Studio 开发环境（3.6 或之前版本）独立编译。

# 另请参阅

+   [Octave for Microsoft Windows (outdated)](Octave_for_Microsoft_Windows_\(outdated\).html "Octave for Microsoft Windows (outdated)") 获取较旧的说明。

[分类](Special%253ACategories.html "Special:Categories"):

+   [安装](Category%253AInstallation.html "Category:Installation")
+   [构建](Category%253ABuilding.html "Category:Building")
+   [Microsoft Windows](Category%253AMicrosoft_Windows.html "Category:Microsoft Windows")