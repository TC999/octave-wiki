# 项目

以下列表总结了 Octave 希望实现的功能或错误修复。此列表并非详尽无遗——还有许多其他可能的好项目，但它们可能已经被实现，或者其中一些想法目前可能不再被认为是好主意。

![信息图标](../assets/info/26px-Info_icon.svg.png)

如果您从未为 Octave 贡献过代码，我们建议从[开发者常见问题](development/faq.md "开发者常见问题")开始。

+   Google Summer of Code 学生，另请参阅 [Summer of Code - 入门指南](Summer_of_Code_-_Getting_Started.html "Summer of Code - 入门指南")。
+   如果您在寻找小型项目，请参阅[短期项目](Short_projects.html "短期项目")。

## 目录

+   [1 数值计算](#数值计算)
    +   [1.1 实现一维抛物-椭圆型偏微分方程初边值问题的求解器](#实现一维抛物-椭圆型偏微分方程初边值问题的求解器)
    +   [1.2 实现一维非线性边值问题的求解器](#实现一维非线性边值问题的求解器)
    +   [1.3 核心 Octave 中的 Matlab 兼容 ODE 求解器](#核心_Octave_中的_Matlab_兼容_ODE_求解器)
    +   [1.4 高精度算术计算](#高精度算术计算)
    +   [1.5 改进 logm、sqrtm、funm](#改进_logm_sqrtm_funm)
    +   [1.6 改进稀疏线性系统的迭代方法](#改进稀疏线性系统的迭代方法)
+   [2 图形界面/集成开发环境](#图形界面集成开发环境)
    +   [2.1 图形界面变量编辑器和属性检查器](#图形界面变量编辑器和属性检查器)
    +   [2.2 Sisotool：创建闭环控制系统调节的图形设计工具（控制包）](#Sisotool_创建闭环控制系统调节的图形设计工具_控制包)
+   [3 稀疏矩阵](#稀疏矩阵)
    +   [3.1 SPQR 接口](#SPQR_接口)
+   [4 字符串](#字符串)
+   [5 其他数据类型](#其他数据类型)
+   [6 输入/输出](#输入输出)
+   [7 解释器](#解释器)
    +   [7.1 改进 JIT 编译](#改进_JIT_编译)
    +   [7.2 改进内存管理](#改进内存管理)
    +   [7.3 实现 classdef 类](#实现_classdef_类)
    +   [7.4 改进 MPI 包](#改进_MPI_包)
+   [8 图形](#图形)
    +   [8.1 非 OpenGL 渲染器](#非_OpenGL_渲染器)
    +   [8.2 LaTeX 标记](#LaTeX_标记)
+   [9 历史记录](#历史记录)
+   [10 配置与安装](#配置与安装)
+   [11 文档](#文档)
+   [12 测试](#测试)
+   [13 编程](#编程)
+   [14 其他](#其他)
+   [15 营销与社区](#营销与社区)
    +   [15.1 改进 Windows 二进制打包](#改进_Windows_二进制打包)
    +   [15.2 改进 macOS 二进制打包](#改进_macOS_二进制打包)
+   [16 性能](#性能)
+   [17 Octave 包管理](#Octave_包管理)
+   [18 首选项](#首选项)
+   [19 性能分析器增强](#性能分析器增强)
+   [20 错误](#错误)
+   [21 Matlab 兼容性](#Matlab_兼容性)
    +   [21.1 缺失的函数](#缺失的函数)
    +   [21.2 不同名称的函数](#不同名称的函数)

# 数值计算

+   使用 C++11 `<random>` 库进行随机数生成。编写 Octave 函数（rand、randi、randn、rande）与 C++ API 的链接。像 Matlab 一样实现 RandStream 对象。

+   改进 logm 和 sqrtm（参见此讨论帖：http://octave.1599824.n4.nabble.com/matrix-functions-td3137935.html）

+   在 sum() 中使用成对或分块加法来减轻数值误差，而不会造成显著的性能损失（[成对求和](https://en.wikipedia.org/wiki/Pairwise_summation)），参见错误报告 [#61143](https://savannah.gnu.org/bugs/?61143) 了解之前的讨论。

+   审阅这篇 2009 年论文（[https://epubs.siam.org/doi/pdf/10.1137/080738490](https://epubs.siam.org/doi/pdf/10.1137/080738490)）中关于 xsum（高精度求和）的算法实现。现有实现使用的是 2005 年的论文。

+   改进复数映射函数。参见 W. Kahan，《复数初等函数的分支切割，或无事生非的符号位》（收录于《数值分析的现状》，Iserles 和 Powell 编，Clarendon Press，牛津，1987）了解显式三角公式。参见 [#8172](https://savannah.gnu.org/patch/?8172) 了解之前的尝试。

+   使 gamma() 等函数在极端参数或其他未定义情况下返回正确的 IEEE Inf 或 NaN 值。

+   改进 sqp。

+   修复 CollocWt? 以处理拉盖尔多项式。使其易于扩展到其他多项式类型。

+   为 colloc 添加可选参数，使其不仅限于勒让德多项式。

+   将 rand、eye、xpow、xdiv 等函数移到矩阵类中。

+   改进 ODE、DAE 类的设计。

+   评估非均匀采样和非平稳时间序列的谐波和互相关，如 [http://www.jstatsoft.org/v11/i02](http://www.jstatsoft.org/v11/i02) 所述（其中包含与 R 接口的 C 代码）。（此功能现已在 [lssa](http://octave.sourceforge.net/lssa/index.html) 包中部分实现。）

## 实现一维抛物-椭圆型偏微分方程初边值问题的求解器

该项目将提供一个类似于 Matlab 函数 pdepe 的一维抛物-椭圆型偏微分方程初边值问题求解器。一个很好的起点是[线法](http://en.wikipedia.org/wiki/Method_of_lines)，您可以在[此处](http://en.wikibooks.org/wiki/Partial_Differential_Equations/Method_of_Lines)和[此处](http://www.scholarpedia.org/article/Method_of_lines)找到更多详细信息，而示例实现可以在[此处](http://www.scholarpedia.org/article/Method_of_Lines/Example_Implementation)找到。此外，[此页面](http://www.pdecomp.net/)提供了一些有用的资料。

## 实现一维非线性边值问题的求解器

该项目将通过添加适当的误差估计器来完成 odepkg 包中已有的 bvp4c 求解器的初始版本实现，并将实现与 Matlab 兼容的 bvp5c 求解器版本。有关要实现的方法的详细信息可以在关于 bvp4c 的[这篇论文](http://dx.doi.org/10.1145/502800.502801)和关于 bvp5c 的[这篇论文](http://www.jnaiam.net/new/uploads/files/014dde86eef73328e7ab674d1a32aa9c.pdf)中找到。更多详细信息可在[此书](http://books.google.it/books/about/Nonlinear_two_point_boundary_value_probl.html?id=s_pQAAAAMAAJ&redir_esc=y)中找到。

## 核心 Octave 中的 Matlab 兼容 ODE 求解器

+   改进 IDE/DAE 求解器中稀疏雅可比矩阵的处理 **（2021-01-21 仍是问题吗？参见错误 [#55905](https://savannah.gnu.org/bugs/?55905)。）**
    +   目前，在 IDA 包装函数 `__ode15__` 中，组装稀疏雅可比矩阵时使用了过于保守的内存分配估计，实际上为完整雅可比矩阵分配了足够的空间，然后释放多余的内存。修复此问题的初始补丁已发布在跟踪器上，要将其集成到 Octave 中，必须将其泛化以支持 SUNDIALS 的早期版本。
    +   目前，用户以 Octave 稀疏矩阵格式传递的雅可比矩阵被复制到 SUNDIALS 自己的稀疏矩阵格式中。SUNDIALS 的新版本（5.x 或更高）支持让用户自己处理线性代数数据结构和方法，从而消除了复制的需要。利用此功能将改善求解器在内存占用和速度方面的性能。
    +   另请参阅 [SUNDIALS 发布历史](https://computing.llnl.gov/projects/sundials/release-history)。
+   实现与 Matlab 兼容的 "deval" 版本。

## 高精度算术计算

Octave 使用的线性代数 Fortran 库采用单精度（32 位）和双精度（64 位）浮点数。当矩阵条件数低于 1e-16 时，许多操作会停止：此类矩阵被认为是病态的。有些情况下这还不够，例如涉及化学浓度范围从 10^4 到 10^34 的模拟。有多种方法可以提高数值分辨率，例如使用 GFortran 中可用的 128 位四精度数。一个更简单的选择是在 Gnu MPL 任意精度库之上构建接口，该库在 gcc 内部使用，并且应该在 gcc 运行的任何平台上都可用。这种方法已在 MatLab 下以 mptoolbox 的名称提供，并获得 BSD 许可证。作者友好地提供了最新版本的副本，并同意将其移植到 Octave 下并以 GPL v3.0 重新分发。

架构包括一个实现 "mp"（多精度）对象的 Octave 类接口。算术运算通过 MEX 文件转发给 MPL。这对最终用户完全透明，除了显示数字时。此实现需要在 Octave 下移植和测试。

## 改进 logm、sqrtm、funm

此处的目标是实现一些与矩阵函数相关的缺失 Matlab 函数，如[矩阵指数](https://en.wikipedia.org/wiki/Matrix_exponential)。关于此问题有[一般性讨论](https://lists.gnu.org/archive/html/help-octave/2010-12/msg00322.html)和关于一个从未启动的 GSOC 项目的[讨论帖](https://octave.1599824.n4.nabble.com/Re-GSOC-16-Improvements-to-sqrtm-logm-and-funm-td4675180.html)（以及[可用的 funm.m 代码](https://github.com/RickOne16/matrix)）。可用算法和开源实现的一个良好起点是 Higham 和 Deadman 的["矩阵函数软件目录"](http://eprints.maths.manchester.ac.uk/2102/1/catalog.pdf)。截至 2025 年 12 月，一个可用的 funm.m 已实现，并将随 Octave 11 的发布而可用（参见[错误 #67741](https://savannah.gnu.org/bugs/?67741)和[此 Discourse 讨论帖](https://octave.discourse.group/t/implementation-of-funm/7040/6)）。不过，仍有改进空间。

## 改进稀疏线性系统的迭代方法

GNU Octave 目前为稀疏线性系统提供以下 Krylov 子空间方法：pcg（对称正定矩阵）和 pcr（厄米特矩阵），bicg、bicgstab、cgs、gmres 和 qmr（一般矩阵）。其中一些（pcr、qmr）的描述及其错误消息未对齐。此外，它们有相似的代码块（例如输入检查），这些可以一次性写在通用函数中。该项目的第一步可能是修订和同步代码，从已合并到 Octave 的 [SOCIS2016](https://socis16octave-improveiterativemethods.blogspot.com/) 项目开始（变更集 [6266e321ef22](http://hg.savannah.gnu.org/hgweb/octave/rev/6266e321ef22)）。

在 Matlab 中，有一些额外的方法可用：minres 和 symmlq（对称矩阵），bicgstabl（一般矩阵），lsqr（最小二乘）。该项目的第二步可以是实现这些缺失的函数。

[Yousef Saad 的参考书籍](https://www-users.cs.umn.edu/~saad/IterMethBook_2ndEd.pdf)可在线获取。

# 图形界面/集成开发环境

+   Søren Hauberg 建议我们需要能够执行以下操作的 C++ 代码：
    +   确定一行代码是否可以完全解析，即对于 "plot (x, y);" 返回 true，但对于 "while (true)" 返回 false。
    +   评估一行代码并将输出作为字符串返回（最好如果能提供三个字符串：输出、警告和错误）。
    +   查询已定义的变量，即获取当前定义变量的列表。如果能告诉您自上次检查变量以来是否有任何变化，将获得额外加分（也可以通过信号完成）。
+   允许并排编辑
    +   允许多个编辑器窗口，以便可以在图形界面内并排编辑源文件。
    +   在编辑器中添加垂直窗口分割器，以便在底部输入时可以在顶部看到初始化代码。
    +   确保任何特定文件一次只在一个标签页中打开！

## 图形界面变量编辑器和属性检查器

Octave 有一个变量编辑器的初步实现：一个类似电子表格的工具，用于快速编辑和可视化变量。项目的第一阶段将是学习该实现是如何完成的。

凭借获得的知识，项目的第二部分将是实现属性检查器。这是一个类似电子表格的界面，用于显示存在的大量图形属性，这些属性在每个对象基础上都不同。目标不仅是简洁地显示现有属性，还要提供合理的用户界面来更改它们。例如，布尔属性应该能够通过双击切换；单选属性应该有一个仅包含支持选项的下拉列表；可以修改的其他属性应该内置约束（例如，Linewidth 必须是标量，而 Position 必须是 1x4 向量）。轻松访问属性的文档也很重要。

作为参考，Matlab 有类似的属性检查器（https://www.mathworks.com/help/matlab/ref/inspect.html）。

## Sisotool：创建闭环控制系统调节的图形设计工具（[控制包](Control_package.html "控制包")）

在调节 SISO 反馈系统时，能够抓取极点或零点并通过鼠标拖动它们来移动它们是非常有帮助的。当它们移动时，软件必须更新所有绘制的线条。应该能够显示各种图形（rlocus、bode、step、impulse 等），并在鼠标移动时使它们都动态变化。补偿器的参数必须显示和更新。最近，在 [GSoC 2018](Summer_of_Code.html#GSoC_2018 "Summer of Code") 期间完成了一些实现，详情请参见 https://eriveltongualter.github.io/GSoC2018/final.html。

# 稀疏矩阵

[Bateman & Adler](http://arxiv.org/abs/cs.MS/0604006) 的论文是理解稀疏矩阵实现的好读物。

+   改进 [`sprandsym`](https://www.octave.org/doc/interpreter/XREFsprandsym.html) 的 Matlab 兼容性。

+   在 idx_vector 类中实现稀疏逻辑索引，以便像 `a = sprandn (1e6, 1e6, 1e-6); a(a<1) = 0;` 这样的操作不会导致内存溢出。

+   其他缺失的函数
    +   lsqr
    +   minres
    +   symmlq

## SPQR 接口

Octave 实现了稀疏矩阵的 QR 分解，但它使用较旧的 "CXSPARSE" 库来完成。这导致了根本性问题，包括此处记录的段错误（错误 [#51950](https://savannah.gnu.org/bugs/?51950) 和 [#57033](https://savannah.gnu.org/bugs/?57033)）。该项目的目标是为 SQPR 库的 API 编程接口 http://faculty.cse.tamu.edu/davis/suitesparse.html。这是 Matlab 用于此目的的相同库。

+   使用基于 CSPARSE cs_dmsol.m 的想法改进 QR 分解函数

+   通过用 SPQR 代码替换 CXSPARSE 代码来改进 QR 分解，并使线性求解基于此新代码为病态矩阵返回 2-范数解

# 字符串

+   考虑让 octave_print_internal() 为不可打印字符打印某种文本表示，而不是直接将其发送到终端。（但不要对 fprintf 这样做！）

+   考虑将 `string_fill_char` 的默认值从 SPC 更改为 NUL。

# 其他数据类型

+   混合类型操作的模板函数。

+   转换其他函数以用于浮点类型，包括 quad、dasrt、daspk 等。

# 输入/输出

+   使 fread 和 fwrite 适用于复数数据。基于 Iostreams 的这些函数版本也会很好，如果您正在处理它们，支持其他大小规范（integer*2 等）也会很好。

+   将一些 pr-output 内容移到 liboctave。

+   将切换到压缩存储的临界点设为用户首选项变量，默认值为 8192。

+   如果没有足够的磁盘空间可用则发出警告（我认为处理数据写入的代码中没有足够的错误检查）。

+   使任意输入和输出流能够像 iostreams 可以绑定在一起的方式一样绑定在一起。

+   扩展 `imwrite` 选项。这应该不会太难实现，因为它封装在 GraphicsMagick 周围。

+   扩展 Octave 函数以处理太大而无法装入 RAM 的存储数组，类似于可用的 R [包](http://www.bigmemory.org/)。

+   编写 `xmlread` 和 `xmlwrite`。这可以使用 [Xerces C++ 接口](http://xerces.apache.org/xerces-c/)完成，这显然也是 [Matlab 使用的](http://octave.1599824.n4.nabble.com/xml-in-octave-td4663034.html)。（？这些函数已在 io 包中实现多年；将其作为核心 Octave 函数将引入对 Java 的依赖（通过 xerces 库），而这并不是核心开发人员想要的……）。

+   为 .mat 文件实现 hdf5（参见[此讨论帖](http://octave.1599824.n4.nabble.com/Reading-Matlab-td4650158.html)），这可能是启用保存 classdef 类的必要步骤。

# 解释器

解释器是用 C++ 编写的，没有文档。有许多可能与之相关的项目。

**所需技能**：*非常好的* C 和 C++ 知识，可能还需要理解 [GNU bison](http://en.wikipedia.org/wiki/Gnu_bison) 和 [flex](http://en.wikipedia.org/wiki/Flex_lexical_analyser)。理解如何制作编译器和解释器，以及能够理解和使用性能分析器和调试器，可能是基本技能。

+   允许自定义调试提示符。

+   修复解析器，使

```cpp
  if (expr) 'this is a string' end
```

被解析为 IF expr STRING END。*（参见邮件列表上的[此帖](https://lists.gnu.org/archive/html/octave-maintainers/2014-03/msg00087.html)）*

+   清理 input.cc 中处理用户输入的函数（目前似乎有一些不必要的代码重复，而且看起来过于复杂）。

+   考虑允许将任意属性列表附加到任何变量。这可能是处理当前可以用 `document` 添加的帮助字符串的更通用方式。

+   允许更多命令行选项作为内置变量访问（--echo-commands 等）。

+   使解释器运行更快。

+   允许数组索引的任意下限。

+   改进递归函数调用的性能。

+   改进 ignore_function_time_stamp 的工作方式，以允许按单个目录或函数进行选择。

+   添加一个命令行选项，告诉 Octave 仅进行语法检查而不执行语句。

+   清理 symtab 和变量相关内容。

+   解析器文件的输入流类——必须管理 flex 的缓冲区和全局变量设置的上下文。

+   使解析器进行更多语义检查，在编译函数时出错后继续，等等。

+   使 LEXICAL_ERROR 具有 parse_error() 要打印的错误消息的值？

+   添加一个运行时别名机制，允许像 alias fun function_with_a_very_long_name 这样的事情，以便可以通过 `fun` 调用 `function_with_a_very_long_name`。

+   允许以更紧凑的方式编写变量的局部更改，而不是目前使用 unwind_protect 的方式。例如，

```cpp
      function f ()
          local prefer_column_vectors = something;
          ...
      endfunction
```

将等效于

```cpp
       function f ()
          save_prefer_column_vectors = prefer_column_vectors;
          unwind_protect
             prefer_column_vectors = something;
             ...
          unwind_protect_cleanup
              prefer_column_vectors = save_prefer_column_vectors;
          end_unwind_protect
       endfunction
```

+   修复所有函数文件以检查虚假输入（输入参数数量或类型错误，输出参数数量错误）。

+   更一致地处理内置函数的选项。

+   分配和释放内存花费了太多时间。可以做些什么来提高性能？

```
 对诸如 dim_vectors 之类的东西使用移动构造函数而不是复制构造函数，这些东西只是为了初始化 Array 或 Matrix 对象而重复创建的。
```

+   Fortran 代码的错误输出很难看。应该做些什么使其看起来更好。

+   如果能将 Fortran 例程的输出通过分页器传递会很好。

+   尝试在解析器中识别公共子表达式。

+   考虑使其能够用类似 [](e1, e2) 的语法指定空矩阵。当然，至少其中一个表达式必须为零……

+   [Matrix::fortran_vec()](Matrix::fortran_vec()) 真的有必要吗？

+   重写 whos 和 symbol_record_info 类。编写一个提供所有基本信息的内置函数，然后将 who 和 whos 编写为 M 文件。

+   在支持 matherr() 的系统上，使用户能够启用警告消息的打印。

+   使其能够标记变量和函数为只读。

+   使其能够编写一个函数，该函数获取对内存中矩阵的引用并更改一个或多个元素，而无需生成数据的第二个副本。

+   如果可用，使用 nanosleep 而不是 usleep？显然，在 Solaris 系统上，nanosleep 比 usleep 更受青睐。

## 改进 JIT 编译

Octave 的解释器在某些循环上非常慢。最近，得益于 Max Brister 的工作，在 [LLVM](http://llvm.org) 中为 GSoC 2012 实现了即时编译器（JITC）的初步实现。该项目包括理解 Max 的当前实现并扩展它，以便函数和指数（例如 2^z）可以与 JITC 一起编译。这需要编译器、C++、LLVM 以及 Octave 或 Matlab 语言的知识。能够快速获得这些知识的优秀学生也可以被考虑。Max 本人将指导该项目。[此处](http://planet.octave.org/octconf2012/jit.pdf)是 Max 关于其当前实现的 OctConf 2012 演示文稿。另请参阅 [JIT](JIT.html "JIT")。

## 改进内存管理

从解释器的性能分析来看，似乎花费了大量时间分配和释放内存。更好的内存管理算法可能会提供一些改进。

## 实现 classdef 类

Matlab 有两种类：旧式 @classes 和新式 classdef。Octave 仅完全实现了旧式。4.0 版本中对 classdef 类有部分支持，请参阅 [classdef 状态页面](Classdef.html "Classdef") 了解尚未实现的内容。这里的工作不规律，classdef 是[一个](http://www.mathworks.com/help/matlab/matlab_oop/method-attributes.html)[非常](http://www.mathworks.com/help/matlab/events-sending-and-responding-to-messages.html)[复杂的](http://www.mathworks.com/help/matlab/enumeration-classes.html)东西，要完全实现。一个成功的项目将是实现足够的 classdef 以支持大多数基本用法。熟悉 Matlab 当前的 classdef 支持将是一个巨大的优势。Michael Goffioul 和 jwe 可以指导此项目。

尽管当前的 Octave 代码库中已有大量的 classdef 支持，但仍有许多领域未实现或需要改进。我想到的主要有：

+   支持事件
+   支持枚举
+   支持 "import"（这需要对 Octave 内部，特别是符号表有很好的理解）
+   改进多重继承和方法解析
+   遵守和计算 "Sealed" 属性
+   支持方法句柄

## 改进 MPI 包

Octave Forge 的 [MPI 包](http://octave.sourceforge.net/mpi/index.html) 是用于并行计算的基本 MPI 函数的包装器。它通过将 MPI 函数调用包装在简单的 DLD 函数中来实现，这些函数将 Octave 的数据类型映射到 MPI 派生数据类型。提议的项目涉及改进和扩展 Octave MPI 包，例如：

+   Octave MPI 应用程序目前只能在批处理模式下运行，添加在交互式 Octave 会话中启动作业并收集其输出的能力。
+   实现非阻塞通信的函数（MPI_Isend、MPI_Irecv）
+   实现一对多（广播、分散）、多对一（归约、收集）和多对多（全归约、全收集）通信例程

# 图形

+   正确处理 DISPLAY 未设置的情况。提供 --no-window-system 或 --nodisplay (?) 选项。提供 --display=DISPLAY 选项？这将如何与 gnuplot 一起工作（即，我们如何知道 gnuplot 是否需要 X 显示来显示图形）？

+   实现基于 Cairo 的 2D 专用图形渲染器，支持 PS/PDF/SVG 输出（用于打印）。

+   在 'imagesc' 绘图上，还根据鼠标位置报告矩阵值，并在鼠标移动时更新。

+   添加类似于 Matlab [Mapping 工具箱](https://www.mathworks.com/help/map/functionlist.html) 的地图创建功能，以包含在 Octave Forge [mapping 包](https://sourceforge.net/p/octave/mapping) 中。

+   添加数据光标以跟踪图形中的数据值。

## 非 OpenGL 渲染器

除了原始的 gnuplot 后端，Octave 还包含一个基于 OpenGL 的渲染器，用于高级和更强大的 3D 绘图。然而，OpenGL 并不完全适合仅 2D 的绘图，其他方法可能会产生更好的图形。该项目的目标是为仅 2D 的绘图实现一个替代的图形渲染器（尽管 3D 绝对不是重点，但将新的图形渲染器扩展以支持基本的 3D 功能也应该被考虑）。没有必须使用特定工具包/库，但自然的候选者是：

+   [Qt](http://qt.nokia.com)：图形界面目前是用 Qt 编写的
+   [Cairo](http://en.wikipedia.org/wiki/Cairo_%28software%29)：这个库被广泛使用，以提供支持 PS/PDF/SVG 输出的高质量图形而闻名。

## LaTeX 标记

OpenGL 渲染器中的绘图文本对象（如标题、标签、文本...）仅支持纯文本和 TeX。后者由 TeX 语言的非常有限的子集组成。另一方面，LaTeX 格式支持预期提供完整的 LaTeX 功能。可以使用各种方法：

+   使用外部 LaTeX 引擎：这是最直接的，但它需要用户安装 LaTeX 发行版并设置 Octave 以使用它。
+   使用支持 LaTeX 语法的外部库，例如 [JLaTeXMath](https://github.com/opencollab/jlatexmath) 一个显示 LaTeX 代码的 Java API，[qtmathjax](https://github.com/nathancarter/qtmathjax) 一个在后台网页中执行 MathJax 的基于 Qt 的库。
+   实现我们自己的 LaTeX 解析器和渲染器。matplotlib 项目[已经在 Python 中完成了这一点](http://matplotlib.sourceforge.net/users/usetex.html)，可以作为如何在 Octave 中执行此操作的示例。还有 [JKQtPlotter](https://github.com/jkriege2/JKQtPlotter)，一个基于 Qt 的绘图应用程序，它在 C++ 中实现了自己的 LaTeX 解析器/渲染器。

# 历史记录

+   添加一个选项，允许将脚本文件中的输入保存在历史列表中。

+   history 命令应该接受两个数字参数，以指示要显示、保存或读取的历史条目范围。

+   如果历史列表未更改，避免写入历史文件。

+   如果无法打开历史文件进行写入，避免权限错误。

+   修复历史问题——如果多个进程正在写入同一历史文件，是否会发生核心转储？

# 配置与安装

+   Makefile 更改：
    +   消除 for 循环
    +   定义 shell 命令或消除它们
    +   整合目标

+   创建仅文档的发行版？

# 文档

*请参阅 [项目 - 文档](Project_-_Documentation.html "项目 - 文档")。*

# 测试

+   改进测试集：[[1]](http://octave.1599824.n4.nabble.com/template/NamlServlet.jtp?macro=user_nodes&user=370633)
    +   各种函数的测试。最好每个函数都有一个对应的测试文件（见下文）
    +   逐元素运算符的测试：+ - .* ./ .\ .^ | & < <= == >= > != !
        +   幂运算符的彻底测试，包括边界情况和奇怪的组合，如复数 .^ 范围。
    +   布尔运算符的测试：&& ||
    +   其他运算符的测试：* / \ ' .'
    +   来自错误报告的测试。
    +   索引赋值的测试。需要考虑以下内容：
        +   Fortran 风格索引
        +   零一索引
        +   空矩阵赋值以及调整大小的值赋值
    +   所有内部函数的测试。

+   实现一个覆盖率工具，用于收集覆盖率数据并生成 m 文件函数和脚本的代码覆盖率报告。这对 Octave 开发以及希望为其自己的函数和脚本获取代码覆盖率报告的用户非常有用。

+   为绘图和图形函数实现测试，这些函数目前可能只有基本的输入检查和/或供人工检查的演示。可能创建探测大多数此类函数创建和返回的句柄属性的测试，以便可以检查测试绘图的正确特征大小/位置等。

我们离为每个函数都有一个测试还很远，所以在尝试获得 100% 语句覆盖率的深度之前，重点应该放在获得覆盖的广度上。截至 2015 年 12 月，1020 个 m 文件中有 202 个没有测试。其中一些将是具有演示的绘图函数，但这留下了足够的功能来成为一个有趣的项目。截至 2015 年 12 月，有 485 个 C++ 函数实例需要测试。

Octave 编译后，运行 `make check` 构建目标将运行完整的测试套件，并在构建目录中生成一个名为 test/fntests.log 的文件，其中包含结果的摘要。在文件末尾是未找到测试的所有函数的列表。摘录发布在[缺失测试的文件](Files_missing_tests.html "缺失测试的文件")页面。如果您不是自己构建 Octave，可以通过在 Octave 提示符下执行 `__run_test_suite__` 命令在已安装的二进制副本上运行测试套件。在这种情况下，fntests.log 文件将写入当前目录。

C++ 文件中编写的函数也需要测试。有关说明和实例列表，请参阅 [为 Octave 的 C++ 函数添加 BIST 测试](Add_BIST_tests_for_octave_functions_written_in_C++.html "为 Octave 的 C++ 函数添加 BIST 测试")。

另请参阅 [持续构建#覆盖率报告](Continuous_Build.html#Coverage_Report "持续构建")。

# 编程

+   为缺失的运算符提供更好的错误消息？

+   消除 pt-exp.cc、pt-const.cc 和 ov.cc 中的重复枚举。

+   在 liboctave 级别处理 octave_print_internal() 内容。然后 octave_value 类可以只调用底层类的 print() 方法。

+   尽可能消除对 octave_value 对象类型的显式检查，以便用户定义的类型在更多情况下自动执行正确的操作。

+   仅在实际需要 config.h 的文件中包含它，而不是在每个 .cc 文件中都包含它。不幸的是，这可能不太容易弄清楚。

+   GNU 编码标准：
    +   向 Makefiles 添加 `Makefile` 目标。
    +   在 #else 和 #endif 预处理器命令上添加注释。
    +   将错误消息格式更改为在所有地方都符合标准。

+   消除更多全局变量。

+   将 procstream 移到 liboctave。

+   在更多地方使用引用和类。

+   在各种 _options 函数之间共享更多代码。

+   在 Octave 发出的所有警告和错误中使用非空标识符，请参阅 [简单项目#其他](Easy_projects.html#Miscellaneous "简单项目")。

+   减少 liboctave 中的数据类型数量。

+   使用模板和现代 C++ 重新实现运算符。当前系统在模板之前发展，广泛使用宏来定义标量<->标量、标量<->矩阵、标量<->浮点数等之间的交互。
    +   在 liboctave 中，要处理的目录是 liboctave/operators
    +   在 libinterp 中，要处理的目录是 libinterp/operators
    +   在 libinterp 中，还有 libinterp/corefcn 中的 xpow.cc、xdiv.cc

# 其他

+   实现一些进程间通信的函数：bind、accept、connect、gethostbyname 等。（此功能已在 octave sockets 包中可用，将其移到核心 Octave 的目的是什么？）

+   透明处理超大文件的能力：Juhana K Kouhia <kouhia@nic.funet.fi> 写道：
    
    如果我有一个大小为 400 Mbytes 的一维信号数据，那么我处理它的选择是什么：
    
    +   我必须分割数据
    +   Octave 有自己的虚拟内存，我不必担心分割。
    
    如果我分割数据，那么我容易编写的处理程序将变得难以编写。
    
    如果可能，我希望在 Octave 中有虚拟内存系统，即用户将所有大文件视为一个大数组或类似的东西。可以有几种用户可选的模型来执行虚拟内存，具体取决于用户拥有的数据类型（1d、2d）以及处理它们的顺序（流或随机访问）。
    

+   与 gdb 的接口。Michael Smolsky <fnsiguc@weizmann.weizmann.ac.il> 写道：
    
    我在想一个工具，它可能对我数值模拟工作非常有用。它是 gdb 和 octave 之间的互连。我们经常在我们的 fortran 或 c 代码中管理非常大的数据数组，这些数据可能在算法开发阶段借助 octave 进行研究。假设你正在编码，比如说，波动方程。并想要调试代码。如果能够从正在开发的代码内存中挑选一些数组，对其进行 fft 并查看作为谱密度对数-对数绘图的图像，那就太好了。我现在面临着类似的问题。为了避免高昂的 c 开发成本，我在 matlab/octave 中开发，然后重写到 c 中。如果我能直接从调试器将 c 数组卸载到 octave 中，研究它，也许用方便的 matlab/octave 语法更改一些[许多]值，类似于 `a(:,51:250)=zeros(100,200)`，然后将其存回我的 c 代码内存中，那将会容易得多。
    

+   为 Octave 类型实现 gdb 扩展。Octave 有 `etc/gdbinit` 文件，其中有一些显示 Octave 类型内容的基本支持。添加更多扩展，以便更容易调试 octave_values 和其他 Octave 类型。

+   向 lgrind 添加定义，使其支持 Octave。（有关 lgrind 的更多信息，请参见 http://www.tex.ac.uk/tex-archive/support/lgrind/。）

+   空间统计，包括协方差图估计和克里金法——也许通过 [gstat](http://www.gstat.org/) 的接口？

+   miscellaneous 包中的 [units](http://octave.sourceforge.net/miscellaneous/function/units.html) 函数通过解析对 GNU units 的调用来工作。通过用 C++ 编写它并包含其库 "units.h"，可以使其更加健壮。

# 营销与社区

+   使 Octave 网站/[项目基础设施](Project_Infrastructure.html "项目基础设施")更易于维护。

+   使新来者更容易贡献。

+   有关营销想法，请参阅 [Apache Open Office 营销简介](https://openoffice.apache.org/orientation/intro-marketing.html)

+   帮助设计用户或[开发者调查](https://www.openoffice.org/marketing/ooocon2006/presentations/wednesday_c10.pdf)

+   帮助准备和交付关于 Octave 的演示和[出版物](Publications_about_Octave.html "关于 Octave 的出版物")，并在学院和大学中展示。

## 改进 Windows 二进制打包

我们目前能够构建并提供 [Windows 安装程序](Windows_Installer.html "Windows 安装程序")。构建过程涉及在 Linux 系统上使用 [MXE](http://mxe.cc/) 项目的分支进行交叉编译，以构建 Octave 及其所有依赖项。任何改进此过程以使其更容易或更快，或改进安装程序本身或 Windows 用户的安装体验的想法都将受到欢迎。

**所需技能**：GNU 构建系统、Makefile、configure 文件、追踪库依赖项、如何使用编译器的知识。不需要 m 脚本或 C++，除了理解 [C++ 编译模型](http://david.rothlis.net/c/compilation_model/)。

## 改进 macOS 二进制打包

我们希望能够轻松生成 macOS 的二进制包。现在，这样做既困难又乏味。大多数 OS X 用户使用基于源代码的包管理器（如 Homebrew 或 MacPorts）安装 Octave。任何帮助我们构建二进制包的方法都将受到欢迎。所需的知识是理解 macOS 中构建二进制文件的工作原理。我们当前为 Windows 构建二进制文件的方法是从 GNU 系统使用 [MXE](http://mxe.cc/) 进行交叉编译，类似的方法可能对 OS X 可行（[GUB](http://lilypond.org/gub/)？）。

有一个名为 ["Octave.app"](http://octave-app.org) 的第三方项目，它创建并分发 Octave 的 macOS 构建作为 Mac 应用程序包。它建立在 Homebrew 和一组自定义的 Octave 相关 Homebrew 公式之上。

**所需技能**：GNU 构建系统、Makefile、configure 文件、追踪库依赖项、如何使用编译器的知识。如果您选择处理 GUB，将需要 Python。不需要 m 脚本或 C++，除了理解 [C++ 编译模型](http://david.rothlis.net/c/compilation_model/)。

# 性能

+   使 `parfor` 正常工作将加快代码开发和执行，因为现在多核架构已经很普遍。参见[此处](http://octave.1599824.n4.nabble.com/Parfor-td4630575.html)和[此处](http://stackoverflow.com/questions/24970519/how-to-use-parallel-for-loop-in-octave-or-scilab)。也许可以调整 [parallel](Parallel_package.html "并行包") 和 [mpi](http://octave.sourceforge.net/mpi/index.html) 包中的现有代码来实现这一点。
+   为 Octave 开发性能基准测试（解释器、加载/保存、绘图等，但不包括底层库如 BLAS 或 LAPACK 的简单测试）。可以定期运行此基准测试，以确保开发过程中的更改不会引入性能回归。

# Octave 包管理

[包](Packages.html "包")是 Octave 的扩展。要使这些扩展与 Octave 一起工作，有一个函数 [`pkg`](https://www.octave.org/doc/interpreter/XREFpkg.html)，它几乎完成了所有工作。此函数有一些限制，用当前代码库很难实现，很可能需要完全重写。重写包管理器的一个重要步骤是 Andrew Janke 的 ["packajoozle" 项目](https://github.com/apjanke/octave-packajoozle/)。

计划的改进包括：

+   从仓库安装和更新（hg 和 git）
+   自动处理依赖项
+   轻松加载、更新或检查特定包版本
+   管理 C++ 源代码中包的测试和演示
+   对依赖项更灵活，例如，依赖于特定的 Octave 构建选项或依赖于多个包中的一个
+   支持多版本包
+   支持多 Octave 安装
+   支持系统范围和用户安装的包
+   测试包（`pkg test <package-name>`）
+   从 https://octave.sourceforge.io/ 改进元数据获取（`pkg list -forge`）

+   创建一个允许包弃用函数的系统，就像在核心中一样。可能性包括：
    +   让 pkg 接受包内的 deprecated 目录并将其添加到搜索路径。这些目录中的函数必须与核心 deprecated 中的函数一样处理
    +   PKG_ADD 可用于破解此问题。包开发人员仍然必须在函数代码中实际编写警告，但这允许将函数放在单独的目录中，这样他们就不会在下次发布时忘记删除它们
    +   包开发人员还可以使用 Make 等工具从实际上具有更复杂结构（包括 deprecated 目录）的东西创建*普通*包
+   让 pkg 通过下载和安装依赖项自动解析它们
+   允许下载和安装同一包的多个版本
+   默认情况下使包稍微更详细一些（具体是什么？）
+   使 pkg 更像 apt-get（这是指 apt-get 的哪些具体功能？）
+   使 pkg 支持多个 src 目录
    +   带有 makefile 的子目录和顶级 make 命令：`cd <subdir>` && ${MAKE}... 作为替代方案可以吗？
+   使 pkg 能够提供额外的 configure 和 make 标志，对发行版有用，包括 make 的 -j（pkg 现在自动传递 --jobs=N，CFLAGS 和 CXXFLAGS 环境变量已经受到尊重，还缺少什么？）

该项目的主要目标是使 [`pkg`](https://www.octave.org/doc/interpreter/XREFpkg.html) 更加用户友好，并使其成为促进第三方参与 Octave 的工具。然而，当前的 [`pkg`](https://www.octave.org/doc/interpreter/XREFpkg.html) 还执行一些可能不应该由它执行的维护功能。相反，应该为开发人员创建一个包含此类工具的包。要有效地进行此增强，需要重构当前的 `pkg` 代码（参见 ["packajoozle" 项目](https://github.com/apjanke/octave-packajoozle/)）。

许多这些问题已在其他语言中得到解决。熟悉其他语言如何处理此问题将有助于想出优雅的解决方案。在某些情况下，有标准要遵循。例如，freedesktop.org 发布了关于文件应该放在哪里的规范（[基本目录规范](http://standards.freedesktop.org/basedir-spec/basedir-spec-latest.html)），Windows 似乎有自己的标准。有关更多详细信息，请参阅错误 [#36477](https://savannah.gnu.org/bugs/?36477) 和 [#40444](https://savannah.gnu.org/bugs/?40444)。

此外，包名称可能很容易开始冲突。一种可怕的解决方法是通过选择越来越复杂的包名称来避免，这些名称不暗示包的用途。一种选择是像 Perl 6 那样提供 "Authority" 类别。嵌套包也是为专业主题提供包的简单方法（想想 `image::morphology`）。新的 [`pkg`](https://www.octave.org/doc/interpreter/XREFpkg.html) 现在会考虑所有这些，或允许以后实现它们。阅读[未完成的计划](OEP%253Apkg.html "OEP:pkg")了解更多详细信息。

# 首选项

Octave 有几个用于管理用户首选项的函数。许多函数使用持久变量而不是依赖首选项功能。

+   函数 `edit ()` 包含一个用作其个人首选项集的持久结构。这些都可以移到编辑器的用户首选项组中。
    +   "EDITOR"
    +   "HOME"
    +   "AUTHOR"
    +   "EMAIL"
    +   "LICENSE"
    +   "MODE"
    +   "EDITINPLACE"
+   `savepath ()` 函数修改启动脚本（rcfile），`~/.octaverc` 并插入命令以允许下一次会话以相同的路径开始。相反，可以为启动项创建用户首选项，并可以添加用户指定路径的首选项。也许应该使用两个路径首选项。一个用于应在核心路径之前的元素，另一个用于应在核心路径之后的元素。还可以添加启动目录首选项，以允许用户指定 Octave 应在何处开始下一次会话。
    +   "PREPATH"
    +   "POSTPATH"
    +   "STARTUPDIR"
+   还可以添加绘图的首选项组。对于想要覆盖默认值的用户，默认终端的首选项会很有用。还可以添加默认 `graphicstoolkit` 的首选项。
    +   GNUPLOTTERM
    +   GRAPHICSTOOLKIT
+   打印的首选项组可以包括默认打印机、ghostscript 命令的首选项，以及可能的其他参数，如方向和分辨率。
    +   PRINTER
    +   GHOSTSCRIPTCOMMAND
    +   ORIENTATION
    +   RESOLUTION
+   搜索 m 文件中 `persistent` 的使用应该会找到其他使用首选项的机会。

# 性能分析器增强

Octave 有一个内置的 [`profiler`](https://www.octave.org/doc/interpreter/XREFprofile.html)，这要归功于 [Daniel Kraft 在 2011 年 GSOC 项目中的成功](Summer_of_Code.html#GSoC_2011 "Summer of Code")。但它确实需要：

+   更好的粒度：
    +   它在代码的每个级别聚合对函数的所有调用，无法知道对函数的哪个调用可能更"昂贵"。
    +   它将所有非函数调用开销聚合到花在"self"上的时间中，而没有向用户进一步详细说明可能导致该开销的原因。
    +   将花费的时间/函数调用计数与行号关联起来将是一个巨大的优势。
+   更好的界面。
    +   当前的 CLI 工具擅长确定花在函数调用上的时间，提供 [`profshow`](https://www.octave.org/doc/interpreter/XREFprofshow.html) 的摘要输出和允许您深入代码层次的交互式提示 [`profexplore`](https://www.octave.org/doc/interpreter/XREFprofexplore.html)。但这受到上述聚合限制的影响。
    +   性能分析器是在 Octave 4.0 发布稳定的 Octave 图形界面之前编写的。该图形界面现在包含一个内置的编辑器，带有与解释器的钩子。将性能分析器输出更好地集成到 Octave 图形界面将是一个重要的功能改进。（当前的图形界面集成仅限于一个指示灯，显示性能分析器正在运行。）
    +   增强功能不仅限于使用当前的 Octave 图形界面/编辑器。任何帮助用户将执行时间与代码位置联系起来的功能都会很好。

# 错误

总有错误要修复。[错误跟踪器](https://savannah.gnu.org/bugs/?group=octave)是寻找需要帮助的 task 的好地方。另请参阅 [短期项目#错误](Short_projects.html#Bugs "短期项目")。

# Matlab 兼容性

## 缺失的函数

MATLAB 中有某些已知在 Octave 中缺失的函数。

一个列表在函数 `__unimplemented.m__` 的源中提供，子函数 missing_functions；它可以在 Octave 图形界面中编辑或在 [[2]](http://hg.savannah.gnu.org/hgweb/octave/file/default/scripts/help/__unimplemented__.m#l547) 浏览。

还为[几个包](Category%253AMissing_functions.html "类别：缺失的函数")保留了列表。

还可以查看现有的 [FOSS](http://en.wikipedia.org/wiki/Free_and_open-source_software "wikipedia:Free and open-source software") 实现，从 FreeMat 和 Scilab（对于更兼容的语言）到 R 或 Scipy 或 Julia（对于不太兼容的版本）。显然，查看 Matlab 实现是不可以的，因为这不是[自由软件](http://en.wikipedia.org/wiki/Free_software "wikipedia:Free software")！

## 不同名称的函数

许多 Octave Forge 函数执行与 Matlab 包中的函数相同的功能。然而，它们通常以不同的名称存在或具有不兼容的 API。通常修复此问题只需更改它们的名称、交换输入参数的顺序。至少，这些函数的列表会很有帮助。

[类别](Special%253ACategories.html "特殊：类别")：

+   [开发](Category%253ADevelopment.html "类别：开发")
+   [项目想法](Category%253AProject_Ideas.html "类别：项目想法")