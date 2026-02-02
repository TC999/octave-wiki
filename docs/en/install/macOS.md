# macOS

For the latest version of GNU Octave there are currently **no** installer files (e.g. DMG installer) available.

However, using the [Homebrew package manager](https://brew.sh/), one can simply install and update Octave on macOS for all latest Apple Silicon architectures (M1 and newer).

[![Info icon.svg](wiki/images/thumb/a/ae/Info_icon.svg/26px-Info_icon.svg.png)](File%253AInfo_icon.svg.html)

**GNU Octave 10.3.0** is the current stable release.

## Contents

+   [1 Homebrew](#Homebrew)
+   [2 Create a launcher app with the Script Editor](#Create_a_launcher_app_with_the_Script_Editor)
+   [3 Alternative Package Managers](#Alternative_Package_Managers)
    +   [3.1 Anaconda](#Anaconda)
    +   [3.2 MacPorts](#MacPorts)
+   [4 See also](#See_also)
+   [5 Footnotes](#Footnotes)

## Homebrew

→ *Link to [Octave package](https://formulae.brew.sh/formula/octave) there.*

**Install GNU Octave using Homebrew:**

Follow the [Homebrew installation instructions](https://brew.sh/).

It is advised to install the **Command Line Tools** type in the [Terminal App](https://support.apple.com/guide/terminal/welcome/mac) before Homebrew:

```
 sudo xcode-select --install
```

A window will pop out to guide the installation.

Then, come back to the [Terminal App](https://support.apple.com/guide/terminal/welcome/mac) type:

```
 brew update
 brew upgrade
 brew install octave
 
 octave --gui
```

In case of trouble try `brew doctor`, see the [Homebrew Troubleshooting Guide](https://docs.brew.sh/Troubleshooting).

To start the Octave GUI without typing commands in Terminal every time, please create a launcher app with the Script Editor as described below.

## Create a launcher app with the Script Editor

For example Homebrew installs Octave to /usr/local/bin/octave (or /opt/homebrew/bin/octave on Apple Silicon) by default. From the [Terminal](https://support.apple.com/guide/terminal/open-or-quit-terminal-apd5265185d-f365-44cb-8b09-71a064a42125/mac) application you can enter the command `which octave` to find out the exact location.

If you know the installation location, open the [Script Editor](https://support.apple.com/guide/script-editor) application and write the following text in the editor window if you wish to start the Octave GUI by default:

```
do shell script "/usr/local/bin/octave --gui"
```

For Apple Silicon based systems, use the following script:

```
do shell script "/opt/homebrew/bin/octave --gui"
```

Then, in Script Editor, select File>Export. Export As: Octave (or whatever the non-conflicted name you want); File Format: Application (so that it can be run by Finder); Options: Run only; Code sign: Sign to run locally (to avoid annoying asking for permission to access folder each time). Then, you can find and run the GUI application in the Finder.

If you want to start the Octave command-line interface (CLI), enter instead:

```
tell application "Terminal"
 do script "/usr/local/bin/octave; exit"
end tell
```

or if Octave is in your default path:

```
tell application "Terminal"
 do script "`which octave`; exit"
end tell
```

Finally:

+   With the script open in the Script Editor app on your Mac, choose "File > Export".
+   In the menu that appears, select "Application" from the "File format" menu, then navigate to the "Applications" folder and save your script there as "Octave.app"

To change the application icon:

+   Open [this link](File%253AIcon.png.html "File:Icon.png") in a web browser, right-click and select "copy image".
+   Select "Octave.app" in the Finder, then press command-i to bring up the file info dialog.
+   In the file info dialog, select the icon (in the top left) and press command-v to paste the Octave icon over it.

## Alternative Package Managers

*Instead of Homebrew, the following package managers can be used to install Octave on macOS:*

### Anaconda

→ *Link to [Octave package](https://anaconda.org/conda-forge/octave) there.*

Follow the [Anaconda installation instructions](https://docs.anaconda.com/anaconda/install/mac-os/).

In the [Terminal App](https://support.apple.com/guide/terminal/welcome/mac) type:

```
 conda create --name octave
 conda activate octave
 conda install -c conda-forge octave
 
 octave --gui
```

**Note that the use of the option `--gui` shown above is actually unsupported in the context shown** (as of 2023 March 31). Expect failure:

```
 octave: GUI features missing or disabled in this build
```

Please refer to Octave contributor [ngam's response](https://github.com/conda-forge/octave-feedstock/issues/102#issuecomment-1598020613) to [issue #102 at conda-forge/octave-feedstock](https://github.com/conda-forge/octave-feedstock/issues/102). This note is put here to prevent further user frustration. The original author of this wiki page seems to be unaware of this problem and cannot be located to address this discrepant instruction.

### MacPorts

→ *Link to [Octave package](https://github.com/macports/macports-ports/blob/master/math/octave/Portfile) there.*

Follow the [MacPorts installation instructions](https://www.macports.org/install.php).

In the [Terminal App](https://support.apple.com/guide/terminal/welcome/mac) type:

```
 sudo port selfupdate
 sudo port upgrade outdated
 sudo port install octave
 
 octave --gui
```

## See also

+   [Octave for macOS (outdated)](Octave_for_macOS_\(outdated\).html "Octave for macOS (outdated)") contains old installation instructions.

## Footnotes

[Categories](Special%253ACategories.html "Special:Categories"):

+   [Installation](Category%253AInstallation.html "Category:Installation")
+   [Macintosh platform](Category%253AMacintosh_platform.html "Category:Macintosh platform")