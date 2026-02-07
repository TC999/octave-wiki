# 开发

*本页面包含对 Octave 开发者有用的页面链接。*

## 目录

+   [1 💡 入门指南 🔰](#💡_入门指南_🔰)
+   [2 🔬 Octave 开发](#🔬_Octave_开发)
    +   [2.1 🛠️ 构建](#🛠️_构建)
        +   [2.1.1 🔧 工具](#🔧_工具)
    +   [2.2 ⚖️ 测试](#⚖️_测试)
    +   [2.3 🐞 调试](#🐞_调试)
    +   [2.4 🎉 发布](#🎉_发布)
    +   [2.5 🎯 未来版本的目标](#🎯_未来版本的目标)
        +   [2.5.1 jwe 的优先事项](#jwe_的优先事项)
            +   [2.5.1.1 重大新功能](#重大新功能)
            +   [2.5.1.2 内部改进](#内部改进)
            +   [2.5.1.3 其他](#其他)
+   [3 💡 项目构想与进行中的工作](#💡_项目构想与进行中的工作)
+   [4 其他](#其他_2)

# 💡 入门指南 🔰

+   [开发者常见问题（FAQ）](faq.md "Developer FAQ") —— 从此处开始。
+   [Octave 贡献指南](guide/contribute.md "Contribution guidelines")
    +   [C++ 编码风格指南](guide/C++_style.md "C++ style guide")
    +   [Octave 编码风格指南](guide/Octave_style.md "Octave style guide")
    +   [帮助文本编写规范](guide/Help_text_style.md "Help text style guide")
    +   [提交信息编写规范](guide/Commit_message.md "Commit message guidelines")

# 🔬 Octave 开发

![Info icon.svg](../../assets/info/26px-Info_icon.svg.png)

**参加我们的下一场[线上开发者会议](Meet.html "Meet")** 🙂💬（参见[所有往期会议](Category%253AMeetings.html "Category:Meetings")）

## 🛠️ [构建](build "Category:Building")

+   [构建](building.md "Building") —— 从源代码构建 Octave 的通用说明。
    +   [在 Microsoft Windows 上构建](./build_on_Windows.md "Building on Microsoft Windows")
    +   [在 Ubuntu 虚拟机上构建](./build_on_ubuntu-vm.md "Building on Ubuntu Virtual Machine")
+   [持续构建](continuous_build.md "Continuous Build") —— 使用 [Buildbot](https://buildbot.net/) 检查代码变更。
+   [MXE](mxe.md "MXE") —— 交叉编译至 MS Windows 平台。
+   [大数组支持](enable_large_arrays.md "Enable large arrays: Build octave such that it can use arrays larger than 2Gb.") —— 构建支持超过 2GB 大小数组的 Octave。

### 🔧 工具

+   [Mercurial](mercurial.md "Mercurial") —— 如何使用 Octave 的版本控制系统，创建补丁（变更集）。
+   [Doxygen](doxygen.md "Doxygen") —— C++ 文件的文档生成工具。
+   [ccache](https://ccache.samba.org/) —— 加速 Octave 编译的方法。
+   [编辑器](Category%253AEditors.html "Category:Editors") —— 支持 Octave 语法高亮的编辑器列表。

## ⚖️ [测试](Category%253ATesting.html "Category:Testing")

+   [测试](Tests.html "Tests")
+   [M 文件的 BIST 测试](BIST_for_m-files.html "BIST for m-files")
+   [C++ 文件的 BIST 测试](Add_BIST_tests_for_octave_functions_written_in_C++.html "Add BIST tests for octave functions written in C++")

## 🐞 调试

+   [调试 Octave](Debugging_Octave.html "Debugging Octave") —— 如何使用 [gdb](https://www.gnu.org/software/gdb/) 获取堆栈跟踪信息。
+   [查找内存泄漏](Finding_Memory_Leaks.html "Finding Memory Leaks") —— 如何使用 [valgrind](https://www.valgrind.org/)。

## 🎉 [发布](Category%253AReleases.html "Category:Releases")

+   下一个次要版本将是 **GNU Octave 10.3.0**（距离上一次主要版本发布几个月后）。
+   下一个主要版本将是 **[GNU Octave 10.1.0](10.1_Release_Checklist.html "10.1 Release Checklist")**（预计于 2025 年初发布）。
+   [发布历史](Release_History.html "Release History")
+   [旧版发布清单](Category%253AReleases.html "Category:Releases")
+   “每日构建”版 Octave 可在 [https://nightly.octave.org](https://nightly.octave.org) 获取。

## 🎯 未来版本的目标

根据 [2020 年 10 月 27 日线上开发者会议](Online_Developer_Meeting_$2020-10-27$.html "Online Developer Meeting (2020-10-27)") 的讨论，本维基章节用于列出下一版本可能的目标。虽然任何人都可以编辑维基内容，但**本节专为活跃开发者设立，并非用于提交愿望清单或功能请求的地方**。请为您的想法/优先事项创建子章节。

### jwe 的优先事项

*另见 [JWE 项目构想](JWE_Project_Ideas.html "JWE Project Ideas")，了解部分条目的更多详情。*

#### 重大新功能

+   兼容的 `arguments` 代码块（[已有部分工作](https://savannah.gnu.org/bugs/?func=detailitem&item_id=59405)；需在函数调用时执行相应操作）
+   兼容的局部函数（local functions）
+   兼容的 `string` 类
    +   定义类本身（[初步实现](https://github.com/apjanke/octave-tablicious/inst)？）
    +   从双引号字符串构造 `string` 对象（此转换过程较为痛苦）
+   兼容的 `table` 类（[初步实现](https://github.com/apjanke/octave-tablicious)？）
+   创建 HDF5 函数的底层接口
    +   利用该 HDF5 底层接口支持 MATLAB 基于 HDF5 的 MAT 文件格式
    +   支持保存和加载所有类型的函数句柄
    +   支持保存和加载 [classdef](Classdef.html "Classdef") 对象
+   实现 `import` 功能

#### 内部改进

+   重构/重写处理加载路径（load path）的代码
+   重构/重写 `exist` 和 `which` 函数
+   重构函数对象（function objects）
+   替换 GUI 中的[终端控件](GUI_terminal_widget.html "GUI terminal widget")
+   编写基于栈的字节码解释器，避免在求值代码时产生深度嵌套的函数调用
+   实现 JIT（即时）编译器
+   将更多代码移入 `octave` 命名空间
+   尽可能消除可变的类成员数据
+   消除单例（singleton）对象
+   是否使用 `classdef` 实现句柄图形（handle graphics）？

#### 其他

+   修复 bug，尤其是与兼容性相关的问题
+   处理已提交补丁的未关闭 bug 报告 —— 尽可能多地审查、采纳或拒绝这些补丁并关闭对应报告

# 💡 [项目构想](Category%253AProject_Ideas.html "Category:Project Ideas") 与进行中的工作

+   [小型项目](Short_projects.html "Short projects") —— 适合初学者参与 Octave 开发的良好起点。
+   [Summer of Code - 入门指南](Summer_of_Code_-_Getting_Started.html "Summer of Code - Getting Started") —— GSoC、SOCIS 等项目的创意页面。
+   [项目](Projects.html "Projects") —— 诸多值得实现的功能构想。
    +   [Classdef](Classdef.html "Classdef") —— 使用 `classdef` 定义自定义数据类型。
    +   [JIT](JIT.html "JIT") —— 为 Octave 实现即时编译器。
    +   [GUI 终端控件](GUI_terminal_widget.html "GUI terminal widget") —— 关于新一代增强型终端控件的构想。
    +   [国际化字符支持](International_Characters_Support.html "International Characters Support") —— 在您自己的语言环境中使用 Octave。
    +   [Pythonic](Pythonic.html "Pythonic") —— 从 Octave 中直接调用 Python 函数。

<!----
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
-->