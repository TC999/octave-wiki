# macOS

目前，针对 GNU Octave 的最新版本，**没有**可用的安装文件（例如 DMG 安装程序）。

然而，使用 [Homebrew 包管理器](https://brew.sh/)，可以轻松在 macOS 上安装和更新 Octave，支持所有最新的 Apple Silicon 架构（M1 及更新版本）。

![信息图标](../../assets/info/26px-Info_icon.svg.png)

**GNU Octave 10.3.0** 是当前的稳定版本。

## 目录

+   [1 Homebrew](#Homebrew)
+   [2 使用脚本编辑器创建启动器应用](#使用脚本编辑器创建启动器应用)
+   [3 替代包管理器](#替代包管理器)
    +   [3.1 Anaconda](#Anaconda)
    +   [3.2 MacPorts](#MacPorts)
+   [4 另见](#另见)
+   [5 脚注](#脚注)

## Homebrew

→ *链接到 [Octave 包](https://formulae.brew.sh/formula/octave)。*

**使用 Homebrew 安装 GNU Octave：**

按照 [Homebrew 安装说明](https://brew.sh/) 操作。

建议在安装 Homebrew 之前，在 [终端应用](https://support.apple.com/guide/terminal/welcome/mac) 中安装 **命令行工具**：

```bash
 sudo xcode-select --install
```

安装向导窗口将弹出并引导完成安装。

然后，返回到 [终端应用](https://support.apple.com/guide/terminal/welcome/mac)，输入：

```bash
 brew update
 brew upgrade
 brew install octave
 
 octave --gui
```

如果遇到问题，请尝试 `brew doctor`，参阅 [Homebrew 故障排除指南](https://docs.brew.sh/Troubleshooting)。

为了避免每次都在终端中输入命令启动 Octave GUI，请按照下文描述使用脚本编辑器创建启动器应用。

## 使用脚本编辑器创建启动器应用

例如，Homebrew 默认将 Octave 安装到 /usr/local/bin/octave（或在 Apple Silicon 上为 /opt/homebrew/bin/octave）。您可以通过 [终端](https://support.apple.com/guide/terminal/open-or-quit-terminal-apd5265185d-f365-44cb-8b09-71a064a42125/mac) 应用输入命令 `which octave` 来查找确切位置。

如果您知道安装位置，打开 [脚本编辑器](https://support.apple.com/guide/script-editor) 应用，并在编辑器窗口中输入以下文本（如果希望默认启动 Octave GUI）：

```bash
do shell script "/usr/local/bin/octave --gui"
```

对于基于 Apple Silicon 的系统，使用以下脚本：

```bash
do shell script "/opt/homebrew/bin/octave --gui"
```

然后，在脚本编辑器中，选择 文件>导出。导出为：Octave（或任何不冲突的名称）；文件格式：应用程序（以便可以通过 Finder 运行）；选项：仅运行；代码签名：本地签名（以避免每次访问文件夹时弹出权限请求）。然后，您可以在 Finder 中找到并运行 GUI 应用程序。

如果您希望启动 Octave 命令行界面（CLI），请改为输入：

```bash
tell application "Terminal"
 do script "/usr/local/bin/octave; exit"
end tell
```

或者，如果 Octave 在您的默认路径中：

```bash
tell application "Terminal"
 do script "`which octave`; exit"
end tell
```

最后：

+   在 Mac 上的脚本编辑器应用中打开脚本，选择“文件 > 导出”。
+   在出现的菜单中，从“文件格式”菜单中选择“应用程序”，然后导航到“应用程序”文件夹并将脚本保存为“Octave.app”。

要更改应用程序图标：

+   在 Web 浏览器中打开[此链接](File%253AIcon.png.html "文件:Icon.png")，右键单击并选择“复制图像”。
+   在 Finder 中选择“Octave.app”，然后按 command-i 打开文件信息对话框。
+   在文件信息对话框中，选择图标（左上角）并按 command-v 粘贴 Octave 图标。

## 替代包管理器

*除了 Homebrew，还可以使用以下包管理器在 macOS 上安装 Octave：*

### Anaconda

→ *链接到 [Octave 包](https://anaconda.org/conda-forge/octave)。*

按照 [Anaconda 安装说明](https://docs.anaconda.com/anaconda/install/mac-os/) 操作。

在 [终端应用](https://support.apple.com/guide/terminal/welcome/mac) 中输入：

```bash
 conda create --name octave
 conda activate octave
 conda install -c conda-forge octave
 
 octave --gui
```

**请注意，上述上下文中使用 `--gui` 选项实际上不受支持**（截至 2023 年 3 月 31 日）。可能会出现以下错误：

```bash
 octave: GUI features missing or disabled in this build
```

请参阅 Octave 贡献者 [ngam 的回复](https://github.com/conda-forge/octave-feedstock/issues/102#issuecomment-1598020613) 和 [conda-forge/octave-feedstock 的问题 #102](https://github.com/conda-forge/octave-feedstock/issues/102)。此注释旨在防止用户进一步感到沮丧。此 wiki 页面的原作者似乎未意识到此问题，且无法联系以解决此不一致的说明。

### MacPorts

→ *链接到 [Octave 包](https://github.com/macports/macports-ports/blob/master/math/octave/Portfile)。*

按照 [MacPorts 安装说明](https://www.macports.org/install.php) 操作。

在 [终端应用](https://support.apple.com/guide/terminal/welcome/mac) 中输入：

```bash
 sudo port selfupdate
 sudo port upgrade outdated
 sudo port install octave
 
 octave --gui
```

## 另见

+   [适用于 macOS 的 Octave（已过时）](Octave_for_macOS_\(outdated\).html "适用于 macOS 的 Octave（已过时）") 包含旧的安装说明。

## 脚注

[分类](Special%253ACategories.html "特殊:分类")：

+   [安装](Category%253AInstallation.html "分类:安装")
+   [Macintosh 平台](Category%253AMacintosh_platform.html "分类:Macintosh 平台")