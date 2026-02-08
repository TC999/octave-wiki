# Development

> This page contains links to pages of interest to Octave developers.

## Contents

+   [1 💡 Getting started 🔰](#💡_Getting_started_🔰)
+   [2 🔬 Octave development](#🔬_Octave_development)
    +   [2.1 🛠️ Building](#🛠️_Building)
        +   [2.1.1 🔧 Tools](#🔧_Tools)
    +   [2.2 ⚖️ Testing](#⚖️_Testing)
    +   [2.3 🐞 Debugging](#🐞_Debugging)
    +   [2.4 🎉 Releasing](#🎉_Releasing)
    +   [2.5 🎯 Goals for upcoming releases](#🎯_Goals_for_upcoming_releases)
        +   [2.5.1 jwe priorities](#jwe_priorities)
            +   [2.5.1.1 Large New Features](#Large_New_Features)
            +   [2.5.1.2 Internal Improvements](#Internal_Improvements)
            +   [2.5.1.3 Other](#Other)
+   [3 💡 Project ideas and work in progress](#💡_Project_ideas_and_work_in_progress)
+   [4 Other](#Other_2)

# 💡 Getting started 🔰

+   [Developer FAQ](faq.md "Developer FAQ") -- Start here.
+   [Contribution guidelines](guide/contribute.md "Contribution guidelines") for Octave
    +   [C++ style guide](guide/C++_style.md "C++ style guide")
    +   [Octave style guide](guide/Octave_style.md "Octave style guide")
    +   [Help text style guide](guide/Help_text_style.md "Help text style guide")
    +   [Commit message guidelines](guide/Commit_message.md "Commit message guidelines")

# 🔬 Octave development

![Info icon.svg](../../assets/info/26px-Info_icon.svg.png)

**Attend our next [Online Developer Meeting](Meet.html "Meet")** 🙂💬 (See [all previous meetings](Category%253AMeetings.html "Category:Meetings"))

## 🛠️ [Building](build "Category:Building")

+   [Building](building.md "Building") -- General information how to build Octave from source.
    +   [Building on Microsoft Windows](./build_on_Windows.md "Building on Microsoft Windows")
    +   [Building on Ubuntu Virtual Machine](./build_on_ubuntu-vm.md "Building on Ubuntu Virtual Machine")
+   [Continuous Build](continuous_build.md "Continuous Build") -- Check changes with [Buildbot](https://buildbot.net/).
+   [MXE](mxe.md "MXE") -- Cross-compiling to MS Windows.
+   [Large array support](enable_large_arrays.md "Enable large arrays: Build octave such that it can use arrays larger than 2Gb.")

### 🔧 Tools

+   [Mercurial](mercurial.md "Mercurial") -- How to use Octave's version control scheme, creating patches (changesets).
+   [Doxygen](doxygen.md "Doxygen") -- Documentation for C++ files
+   [ccache](https://ccache.samba.org/) -- How to compile Octave faster.
+   [Editors](Category%253AEditors.html "Category:Editors") -- A list of editors supporting Octave syntax highlighting.

## ⚖️ [Testing](Category%253ATesting.html "Category:Testing")

+   [Tests](Tests.html "Tests")
+   [BIST for m-files](BIST_for_m-files.html "BIST for m-files")
+   [BIST for C++ files](Add_BIST_tests_for_octave_functions_written_in_C++.html "Add BIST tests for octave functions written in C++")

## 🐞 Debugging

+   [Debugging Octave](Debugging_Octave.html "Debugging Octave") -- How to use [gdb](https://www.gnu.org/software/gdb/) to obtain stack traces.
+   [Finding Memory Leaks](Finding_Memory_Leaks.html "Finding Memory Leaks") -- How to use [valgrind](https://www.valgrind.org/).

## 🎉 [Releasing](Category%253AReleases.html "Category:Releases")

+   The next minor release will be **GNU Octave 10.3.0** (a few months major release).
+   The next major release will be [**GNU Octave 10.1.0**](10.1_Release_Checklist.html "10.1 Release Checklist") (early 2025).
+   [Release History](Release_History.html "Release History")
+   [Old release checklists](Category%253AReleases.html "Category:Releases")
+   "Nightly" Octave releases on [https://nightly.octave.org](https://nightly.octave.org)

## 🎯 Goals for upcoming releases

As discussed in the [Online Developer Meeting (2020-10-27)](Online_Developer_Meeting_\(2020-10-27\).html "Online Developer Meeting (2020-10-27)"), this wiki section is for a list of possible goals for the next release. Although anyone may edit the wiki, **this section is intended for active developers, not a place to dump wishlist items or feature requests**. Please create a subsection for your ideas/priorities.

### jwe priorities

*See also [JWE Project Ideas](JWE_Project_Ideas.html "JWE Project Ideas") for additional info about some of these items.*

#### Large New Features

+   Compatible arguments block ([some work has been done](https://savannah.gnu.org/bugs/?func=detailitem&item_id=59405); need to execute actions when functions are called)
+   Compatible local functions
+   Compatible string class
    +   Define class itself (\[[initial implementation](https://github.com/apjanke/octave-tablicious/inst)?)
    +   Construct strings objects from double quoted strings (painful transition).
+   Compatible table class ([initial implementation](https://github.com/apjanke/octave-tablicious)?)
+   Create a low-level interface to HDF5 functions
    +   Support Matlab's HDF5-based MAT file format using the proposed low-level interface to HDF5 functions
    +   Allow all types of function handles to be saved and loaded
    +   Allow [classdef](Classdef.html "Classdef") objects to be saved and loaded
+   Make import feature work

#### Internal Improvements

+   Refactor/rewrite code for handling load path
+   Refactor/rewrite exist and which functions
+   Refactor function objects
+   Replace the [terminal widget in the GUI](GUI_terminal_widget.html "GUI terminal widget")
+   Write stack-based byte-code interpreter that doesn't result in deeply nested function calls to evaluate code
+   JIT compiler
+   Move more code inside octave namespace
+   Eliminate mutable class data where possible
+   Eliminate singleton objects
+   Use classdef for handle graphics?

#### Other

+   Bug fixes, especially those related to compatibility issues
+   Work through the open bug reports for which patches have been submitted - review/apply/reject and close as many of these reports as possible

# 💡 [Project ideas](Category%253AProject_Ideas.html "Category:Project Ideas") and work in progress

+   [Short projects](Short_projects.html "Short projects") -- Good starting point to get into the Octave development.
+   [Summer of Code - Getting Started](Summer_of_Code_-_Getting_Started.html "Summer of Code - Getting Started") -- Ideas page for GSoC, SOCIS, ... projects.
+   [Projects](Projects.html "Projects") -- Many things that would be nice to have done.
    +   [Classdef](Classdef.html "Classdef") -- Define own data types using `classdef`.
    +   [JIT](JIT.html "JIT") -- Just in time compiler for Octave.
    +   [GUI terminal widget](GUI_terminal_widget.html "GUI terminal widget") -- Ideas about a new improved terminal widget.
    +   [International Characters Support](International_Characters_Support.html "International Characters Support") -- Using Octave in your own language.
    +   [Pythonic](Pythonic.html "Pythonic") -- Calling Python functions directly from Octave.

# Other

+   [Project Infrastructure](Project_Infrastructure.html "Project Infrastructure")

## Subcategories

This category has the following 7 subcategories, out of 7 total.

### B

+   [Building](Category%253Abuild/building.md "Category:Building")

### M

+   [Meetings](Category%253AMeetings.html "Category:Meetings")
+   [Missing functions](Category%253AMissing_functions.html "Category:Missing functions")

### P

+   [Project Ideas](Category%253AProject_Ideas.html "Category:Project Ideas")

### R

+   [Releases](Category%253AReleases.html "Category:Releases")

### S

+   [Summer of Code](Category%253ASummer_of_Code.html "Category:Summer of Code")

### T

+   [Testing](Category%253ATesting.html "Category:Testing")

## Pages in category "Development"

The following 23 pages are in this category, out of 23 total.

### A

+   [Add BIST tests for octave functions written in C++](Add_BIST_tests_for_octave_functions_written_in_C++.html "Add BIST tests for octave functions written in C++")

### B

+   [BIST for m-files](BIST_for_m-files.html "BIST for m-files")

### C

+   [C++ style guide](C++_style_guide.html "C++ style guide")
+   [Classdef](Classdef.html "Classdef")
+   [Commit message guidelines](Commit_message_guidelines.html "Commit message guidelines")
+   [Contribute](Contribute.html "Contribute")

### D

+   [Debugging Octave](Debugging_Octave.html "Debugging Octave")
+   [Developer FAQ](Developer_FAQ.html "Developer FAQ")
+   [Doxygen](Doxygen.html "Doxygen")

### F

+   [Finding Memory Leaks](Finding_Memory_Leaks.html "Finding Memory Leaks")

### G

+   [GUI terminal widget](GUI_terminal_widget.html "GUI terminal widget")

### H

+   [Help text style guide](Help_text_style_guide.html "Help text style guide")

### I

+   [International Characters Support](International_Characters_Support.html "International Characters Support")

### J

+   [JIT](JIT.html "JIT")

### M

+   [Mercurial](Mercurial.html "Mercurial")

### O

+   [Octave style guide](Octave_style_guide.html "Octave style guide")
+   [Openlibm](Openlibm.html "Openlibm")

### P

+   [Project Infrastructure](Project_Infrastructure.html "Project Infrastructure")
+   [Projects](Projects.html "Projects")
+   [Publications about Octave](Publications_about_Octave.html "Publications about Octave")
+   [Pythonic](Pythonic.html "Pythonic")

### S

+   [Short projects](Short_projects.html "Short projects")

### T

+   [Tests](Tests.html "Tests")

[Category](Special%253ACategories.html "Special:Categories"):

+   [Contents](Category%253AContents.html "Category:Contents")