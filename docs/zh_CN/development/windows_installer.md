# Windows 安装程序

> 本文介绍如何制作 Microsoft Windows 安装程序；若您仅想使用安装程序，请参阅 [Octave for Microsoft Windows](../install/Windows.md "Octave for Microsoft Windows")。

GNU Octave 主要在 GNU/Linux 及其他 POSIX 兼容系统上开发。过去已有许多为 Microsoft Windows 构建 GNU Octave 移植版本的努力。本页面包含了使用 [mxe-octave](mxe.md "MXE")（[MXE](http://mxe.cc/) 的一个分支）创建 MS Windows 安装程序的说明。这意味着，**MS Windows 安装程序是使用 GNU/Linux 系统 [交叉编译](https://en.wikipedia.org/wiki/Cross_compiler) 的**。

## 目录

+   [1 创建 MS Windows 安装程序](#创建_MS_Windows_安装程序)
    +   [1.1 通用步骤](#通用步骤)
    +   [1.2 步骤详情](#步骤详情)
        +   [1.2.1 ./configure](#./configure)
        +   [1.2.2 make](#make)
    +   [1.3 为 Octave 开发版本构建安装程序](#为_Octave_开发版本构建安装程序)
    +   [1.4 备注](#备注)
    +   [1.5 故障排除](#故障排除)
+   [2 使用虚拟机测试](#使用虚拟机测试)
+   [3 脚注](#脚注)

## 创建 MS Windows 安装程序

### 通用步骤

1.  确保已安装 libffi-dev 包，否则 Python 构建会静默地不完整。
2.  安装 MXE 构建要求。[\[1\]](#cite_note-1)
3.  `hg clone https://hg.octave.org/mxe-octave`[\[2\]](#cite_ref-2)
4.  `cd mxe-octave`
5.  `./bootstrap`（除其他事项外，`bootstrap` 脚本会为下一步创建 `configure` 脚本。）
6.  `./configure`
7.  `make all nsis-installer`

### 步骤详情

#### `./configure`

当前的 Microsoft Windows 安装程序以三种“版本”构建：针对常见的 64 位和 32 位系统（**"w64"** 和 **"w32"**），以及针对内存超过 32 GB 以存储大型数据结构的 64 位系统（**"w64-64"**）。

| "w64" （推荐） | "w64-64" | "w32" |
| :--- | :--- | :--- |
|`./configure                        \  --enable-devel-tools             \  --enable-binary-packages         \  --with-ccache                    \  --enable-octave=<octave_version>` | `./configure                        \  --enable-devel-tools             \  --enable-binary-packages         \  --with-ccache                    \  --enable-octave=<octave_version> \  --enable-fortran-int64` | `./configure                        \  --enable-devel-tools             \  --enable-binary-packages         \  --with-ccache                    \  --enable-octave=<octave_version> \  --disable-windows-64` |

各个选项含义如下（另见 `./configure --help`）：

+   `--enable-devel-tools`：在二进制文件中包含 gdb 和一个 MSYS shell。
    +   如果您确实想使用 gdb 进行调试，则需要配置选项 `--disable-strip-dist-files`，以在已安装的二进制文件中保留调试符号，以便在 MS Windows 上调试。请注意，这将使 Octave 发行版总大小超过 2 GB，这是 NSIS 安装程序的最大尺寸。您只能选择制作 7z-dist、zip-dist 或 tar-dist 安装程序。
+   `--enable-binary-packages`：交叉编译 [Octave Forge](Octave_Forge.html "Octave Forge") 包中的二进制模块。这可以节省在 Microsoft Windows 上安装后的时间。此外，一些包需要补丁才能成功交叉编译（或与当前 Octave 版本兼容）。如果稍后在 Windows 上编译原始的 Octave Forge 包，这些额外的补丁将会缺失。一些 Octave Forge 包在编译时需要可运行的 Octave。因此，主机系统上必须安装正确版本（！）的 Octave。
+   `--with-ccache`：使用 [ccache](https://ccache.dev/) 可以极大地加速重复编译。
+   `--enable-octave=<octave version>`：构建特定版本的 GNU Octave，可以是以下之一：
    +   `release`：使用 src/release-octave.mk，下载并构建最新的 GNU Octave 发行版。
    +   `stable` 或 `default`：分别使用 src/stable-octave.mk 或 src/default-octave.mk。这会从 GNU Octave “稳定版”或“默认版”开发分支的自创建发行版 tarball 构建。详情见 [下文](#为_Octave_开发版本构建安装程序)。
+   `--disable-windows-64`：为 32 位 MS Windows 构建。
+   `--enable-fortran-int64`：在 Fortran 代码，特别是数值库代码中使用 64 位整数。此选项仅影响 Fortran 代码（如 BLAS 和 LAPACK 库）中使用的整数大小。在 64 位系统上，Octave 始终使用 64 位整数进行索引和基本数组操作。详情参见 [启用大数组](Enable_large_arrays%253A_Build_octave_such_that_it_can_use_arrays_larger_than_2Gb..html "Enable large arrays: Build octave such that it can use arrays larger than 2Gb.")。
+   `--disable-system-opengl`：包含软件 OpenGL 库。这可能有助于处理有问题的显卡驱动程序，但可能比硬件加速渲染慢。
+   `--with-pkg-dir=../mxe-octave-pkg`：如果您使用多个构建树，可以共享一个公共的包目录。

#### `make`

+   如果您只想构建要在 MS Windows 上安装的文件归档，而不是安装向导，请使用 `make all 7z-dist`、`make all tar-dist` 或 `make all zip-dist` 来代替 `make all nsis-installer`。
+   默认情况下，包将**不进行并行化**，一次构建一个。您可以使用 `make JOBS=4`（选择一个适合您系统的数字，不一定是 4）来并行构建每个单独的包。
    +   **避免对 `make` 使用 `-j` 选项**：使用 `-j` 会启用并行构建包，这可能会扰乱 mxe 构建系统。请谨慎使用此选项！另一个陷阱是示例 `make -j4 JOBS=4`，这可能导致最多有 16 个作业同时运行。
+   在制作 `nsis-installer` 目标之前运行 `make gdb`，以在安装程序中包含 gdb。

### 为 Octave 开发版本构建安装程序

1.  在 Linux 上构建“稳定版”或“默认版” Octave 开发分支（在独立的源代码和构建目录中），包括您喜欢的修改和补丁。Octave 必须配置 Java 支持。具体操作取决于您的 Linux 发行版，请参阅 [构建指南](building.md "Building")。
2.  验证 Octave 在 Linux 上运行良好（例如使用 `make check` 并尝试运行您构建的 `./run-octave --gui`）。
3.  在顶层构建目录中使用 `make dist-lzip DIST_IGNORE_HG_STATE=1` 创建一个名为 **`octave-<version>.tar.lz`** 的发行版归档。此步骤需要 `lzip` 可用。（在 Debian 类系统上，可通过 `apt-get install lzip` 安装）。
4.  将 **`octave-<version>.tar.lz`** 移动或复制到 `<mxe-octave 构建目录>/pkg` 文件夹（或创建指向它的符号链接）。
5.  遵循 [通用步骤](#通用步骤)，并确保使用 `--enable-octave=stable` 或 `--enable-octave=default` 之一进行配置。
6.  将 `<mxe-octave 构建目录>/dist` 中的最终安装程序移动到某个 Microsoft Windows 机器（U 盘、局域网拷贝等）并按“常规方式”安装。如果您创建了归档文件（例如使用 `make all 7z-dist`），则需要手动创建桌面和开始菜单快捷方式（针对 GNU Octave 和 MSYS-shell）。

对于后续的构建，mxe-octave 已经配置完成且所有依赖项都已构建，因此唯一需要做的就是创建一个新的 **`octave-<version>.tar.lz`** 并重复上述步骤。这应该比第一次运行快得多。如果新的 **`octave-<version>.tar.lz`** 没有被构建并被忽略，请尝试以下操作：

```bash
touch src/default-octave.mk
```

如果您重命名了 **`octave-<version>.tar.lz`**，请确保它与 src/default-octave.mk 中的包名称匹配。

### 备注

+   如果您有多个 MXE-Octave 构建目录（例如，用于稳定版和多个开发版本，或用于 32 位和 64 位 Windows 目标的构建树），可以使用配置标志 `--with-pkg-dir=path_to_common_pkg_directory` 指向一个公共的 pkg 目录。这样可以避免为每个构建树下载包，从而可能节省大量下载带宽。
+   截至 2015 年 12 月下旬，[MXE-Octave 允许树外构建](https://hg.octave.org/mxe-octave/rev/0962acdde3be)。这使得使用相同的 MXE-Octave 树构建独立的 Octave 版本变得更加容易。
+   为使 MXE-Octave 保持最新，请不时在 MXE-Octave 仓库中运行以下命令：

```bash
hg -v pull
hg -v update
```

+   然而，某些包的更新可能需要一个干净的构建树。如果增量构建在更新后失败，请考虑运行 `make clean` 或重新开始一个全新的克隆，参见 [通用步骤](#通用步骤)。
+   在此期间，您可能希望定期清理 `<mxe-octave 构建目录>/log` 以节省磁盘空间。这些日志仅具有信息价值，构建完成后就不再需要。可以安全地删除它们。
+   有时可能会遇到 Java 相关的问题。要构建内置 Java 支持的 Octave，MXE-Octave 需要：
    +   **构建**系统上安装 Java JDK（Java 开发工具包）。换句话说，javac（Java 编译器）和 jar（Java 归档器）可执行文件应位于 PATH 系统变量中。
    +   MS Windows 的 Java 包含文件。它们应分别位于 `<mxe-octave 构建目录>/usr/x86\_64-w64-mingw32/include/java/win32` 或 `<mxe-octave 构建目录>/usr/i686-w64-mingw32/include/java/win32`。如果它们不存在，MXE-Octave 会自动下载。然而，这有时可能会失败（例如，如果无法访问服务器）。在多启动系统上，一个解决方案（注意：这是脏技巧！）是从 MXE-Octave 位置符号链接到 MS Windows 分区上的 MS Windows 包含文件。（除非您确信自己在做什么，否则不要这样做。）

### 故障排除

+   `make` 显示的错误信息只是日志文件的最后几行。这可能会截断实际的错误信息。请在 `<mxe-octave 构建目录>/log` 目录中查找完整的错误信息。
+   有时在不更改任何内容的情况下第二次运行 `make` 会解决问题。特别是，`autotools` 在第一次调用 `make` 时重建了一些文件，这可能导致第二次调用 `make` 成功。
+   如果是构建 Octave 失败，源代码将保留在 `<mxe-octave 构建目录>/tmp-default-octave` 中，并且可以在该目录中运行 "configure && make"。
+   配置是针对目标系统，而不是您自己的系统。特别是，如果您没有安装 mxe-octave 安装的所有包，那么您的配置将会不同。然而，即使您有相同的包，一些配置变量也会不同，并且某些编译器功能在主机系统上可用，在交叉编译模式下可能不可用。
+   构建失败的一个可能原因是本地源代码或构建目录中存在未在 module.mk 文件中列出的文件；这些文件不会被复制到发行版归档中。
+   有时 mxe-octave 构建会在 `libmng` 处失败。这可能与使用快速 SSD 硬盘时的磁盘 I/O 竞争条件有关。解决此问题的一种方法是指定 `make nsis-installer JOBS=1`，如果需要，可重复多次（有时 5 或 6 次），一旦 `libmng` 构建成功，就在下一步/依赖项中中断构建，然后使用 `make nsis-installer JOBS=<更高数字>` 重新启动。截至 2015 年 12 月，只有 libmng 存在此问题。

## 使用虚拟机测试

Microsoft 提供了多个虚拟机（如 VirtualBox）磁盘映像，用于约一个月的 MS Windows 测试：

+   https://developer.microsoft.com/en-us/windows/downloads/virtual-machines
+   https://developer.microsoft.com/en-us/microsoft-edge/tools/vms （主要用于测试 MS-Edge 浏览器）

这些映像的许可证（在该页面上给出）不限制这些映像的使用。因此，完全可以用它们来测试 GNU Octave。

核心思想是在虚拟机内创建一个指向 mxe-octave 构建目录的共享文件夹。建议将其设为只读。可以在 MS Windows 10 中安装（或解压）Octave，或者在 Linux 端的 `<mxe-octave 构建目录>/dist/octave` 子目录中创建 octave.vbs 的快捷方式。

一些优点：

+   不需要专用的 MS Windows 机器或从 Linux 重启；
+   始终可用的最新 MS Windows 10 版本；
+   无需构建安装程序归档文件（zip、7z 等）。可以在 Octave 的本地安装完成后（即显示“生成安装程序”（或“zip...”）消息时）中断构建过程，该安装位于 mxe-octave 的 dist/octave 子目录中。这节省了大约 10-15 分钟。当然，也可以为虚拟 MS Windows 机器使用常见的发行版格式。

提示：

+   可以调整 mxe-octave/binary-dist-rules.mk，为 `<mxe-octave 构建目录>/dist/octave` 子目录使用一致的名称（即，不带时间/日期/位宽后缀）。这样，在 MS Windows 中，快捷方式在每次交叉构建操作后都不需要调整。也许更好的方式是，让 mxe-octave/binary-dist-rules.mk 有一个规则来创建一个指向最新交叉构建的符号链接 `<mxe-octave 构建目录>/dist/octave`。
+   映像在 30 天后过期。但是，如果您在第一次启动 VM 之前创建 VirtualBox 快照，您可以恢复到该快照（本质上，映像将持续更长时间）。这样，您也无需在安装新构建版本之前每次都卸载 Octave。

## 脚注

1.  [↑](#cite_ref-1) 每个系统的要求在仓库 https://hg.octave.org/mxe-octave/file/tip/index.html 中列出。从第二步开始，在本地机器上阅读 index.html 文件。
2.  [↑](#cite_ref-2) 使用 `hg clone https://hg.octave.org/mxe-octave <mxe-octave 构建目录名>` 来选择另一个目录。

[分类](Special%253ACategories.html "Special:Categories")：

+   [构建](Category%253ABuilding.html "Category:Building")
+   [Microsoft Windows](Category%253AMicrosoft_Windows.html "Category:Microsoft Windows")