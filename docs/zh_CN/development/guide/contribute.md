# 贡献指南

## 目录

+   [1 错误报告与补丁提交](building.md#错误报告与补丁提交)
    +   [1.1 贡献者协议](building.md#贡献者协议)
+   [2 从开发源代码构建](building.md#从开发源代码构建)
+   [3 编码风格](building.md#编码风格)
    +   [3.1 C/C++ 指南](building.md#c/c++-指南)
    +   [3.2 Octave 指南](building.md#octave-指南)
    +   [3.3 帮助文本风格](building.md#帮助文本风格)
    +   [3.4 Fortran 指南](building.md#fortran-指南)
    +   [3.5 M4 指南](building.md#m4-指南)
    +   [3.6 维基指南](building.md#维基指南)

## 错误报告与补丁提交

+   错误和补丁应分别提交至 Octave 的[错误](https://savannah.gnu.org/bugs/?func=additem&group=octave)跟踪器和[补丁](https://savannah.gnu.org/patch/?func=additem&group=octave)跟踪器。

+   贡献补丁的最佳方式是创建一个 Mercurial 变更集。
    +   学习如何使用 [Mercurial](../mercurial.md "Mercurial")。
    +   [提交信息指南](./contribute.md "Commit message guidelines")。

### 贡献者协议

通过向本项目提交补丁，即表示您同意以下条件：

+   您的贡献将根据 GNU GPL 第 3 版或任何后续版本的条款发布。

+   您的贡献必须是独立作品，或衍生自可以根据 GPL 条款发布的代码。**在任何情况下，都不得基于来自 Matlab 或其他您可能有权查看的非自由代码**。

+   在 Octave 源代码中，所有文件都标有版权声明，内容为“Copyright (C) YYYY-YYYY The Octave Project Developers”。此版权声明用于减轻维护源文件中版权信息的负担，而非减少或抹去对贡献者的认可。关于已进行的更改和做出更改者的详细信息，保存在 Octave 源代码的修订历史中。

+   如果您希望，您将被列为 Octave 文档中的贡献者。

## 从开发源代码构建

*参见 [构建](../building.md "Building")。*

## 编码风格

除了 C++ 和 Octave 语言（m 文件）外，Octave 的源代码还包括用 C、Fortran、M4、Perl、Unix shell、AWK、Texinfo 和 TeX 编写的文件。使用这些其他语言时没有太多规则需要遵循；其中一些规则总结如下。无论如何，黄金法则是：如果您修改源文件，请尽量遵循您在该文件或其他类似文件中可以发现的约定。

### C/C++ 指南

*参见 [C++ 风格指南](C++_style.md "C++ style guide")。对于 C 语言，您应遵循所有适用的 C++ 规则。*

### Octave 指南

*参见 [Octave 风格指南](Octave_style.md "Octave style guide")。*

### 帮助文本风格

*参见 [帮助文本风格指南](Help_text_style.md "Help text style guide")。*

### Fortran 指南

如果您修改 Fortran 文件，您应保持在 Fortran 77 范围内，并允许使用常见的扩展，如 `END DO`。目前，我们希望确保能够使用 gfortran 编译器编译所有源代码，并且尽可能不使用特殊标志。这通常意味着非传统编译器也能接受这些源代码。

### M4 指南

M4 宏语言主要用于 Autoconf 配置文件。在贡献这些文件时，您应遵循正常的 M4 规则。一些 M4 文件来自外部来源，即 [Autoconf 存档](https://www.gnu.org/software/autoconf-archive/)。

### 维基指南

+   请尽量将新页面归入已有的分类树中。
+   如果您必须创建新分类，请明智地选择名称和位置（尽量靠近 Wikipedia 的分类方案）。
+   对于链接别名，不要创建新页面然后重定向到另一个页面，而是使用管道链接。有关管道链接的更多信息，请参见[此处](https://www.mediawiki.org/wiki/Help:Links)。
+   唯一且只有一个根分类是 [Category:Contents](Category%253AContents.html "Category:Contents")。所有其他分类都必须指向它（通过一个或多个子分类）。
+   新页面标题以大写字母开头，其余部分小写（专有名词、城市名等除外）。

[分类](Special%253ACategories.html "Special:Categories"):

+   [开发](Category%253ADevelopment.html "Category:Development")