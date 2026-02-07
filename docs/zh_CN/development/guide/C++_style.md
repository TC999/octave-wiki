# C++ 风格指南

GNU Octave 的大部分代码是用 C++ 编写的。本文档详细说明了 GNU Octave 项目所使用的 C++ 风格。

作为 GNU 项目的一部分，Octave 遵循 [GNU 编码标准](https://www.gnu.org/prep/standards/standards.html#Writing-C)。

另请参阅 GNU Octave 的 [Octave 风格指南](Octave_style_guide.html "Octave style guide")，了解如何编写 m 文件。

## 目录

+   [1 格式化](#格式化)
    +   [1.1 行长度](#行长度)
    +   [1.2 缩进](#缩进)
        +   [1.2.1 函数、类、结构体、枚举](#函数、类、结构体、枚举)
        +   [1.2.2 控制结构（if、while...）](#控制结构（if、while...）)
        +   [1.2.3 Switch 语句](#switch-语句)
        +   [1.2.4 #ifdef 指令](##ifdef-指令)
        +   [1.2.5 拆分长表达式](#拆分长表达式)
        +   [1.2.6 可选的大括号](#可选的大括号)
    +   [1.3 指针和引用的样式](#指针和引用的样式)
    +   [1.4 函数和模板的样式](#函数和模板的样式)
    +   [1.5 杂项](#杂项)
    +   [1.6 函数头](#函数头)
    +   [1.7 类声明](#类声明)
    +   [1.8 命名空间](#命名空间)
        +   [1.8.1 其他准则](#其他准则)
+   [2 命名](#命名)
    +   [2.1 成员变量](#成员变量)
    +   [2.2 类变量](#类变量)
    +   [2.3 文件名](#文件名)
+   [3 头文件](#头文件)
    +   [3.1 Include 顺序](#include-顺序)
+   [4 C++ 特性](#c++-特性)
    +   [4.1 引用](#引用)
    +   [4.2 new/delete](#new/delete)
    +   [4.3 lambda 表达式](#lambda-表达式)
    +   [4.4 std::string](#std::string)
    +   [4.5 auto](#auto)
    +   [4.6 C++ 风格类型转换](#c++-风格类型转换)
    +   [4.7 C++17 特性](#c++17-特性)
    +   [4.8 C++20、C++23、C++26 特性](#c++20、c++23、c++26-特性)
+   [5 Doxygen](#doxygen)
    +   [5.1 Doxygen 风格指南](#doxygen-风格指南)
+   [6 注释](#注释)
    +   [6.1 FIXME 注释](#fixme-注释)

## 格式化

### 行长度

没有固定的行长度限制。一般来说，力求清晰和可读性，并运用您自己的判断。

每个人都可以访问超过 80 列的显示器，但即便如此，过长的行可能难以阅读。然而，将逻辑上是一个单元的代码保持在同一行确实可以提高可读性。

### 缩进

+   仅使用空格，每次缩进使用 2 个空格。
+   禁止使用制表符。

#### 函数、类、结构体、枚举

定义代码块起始和结束的大括号应单独成行。

大括号不应缩进，即它们与 `class` 等关键字保持在同一缩进级别。

代码块主体应缩进。

请注意，类访问说明符 `public`、`protected`、`private` 不缩进。

示例：

```cpp
class MatrixType
{
public:
  enum matrix_type
  {
    Unknown = 0,
    Full,
    Rectangular
  };

}
```

#### 控制结构（if、while...）

缩进时，缩进控制结构（如 `if`、`while` 等）后的语句。

如果是复合语句，*同时*缩进大括号和语句主体（这样主体会获得*两个*缩进级别的缩进）。

示例：

```cpp
if (have_args)
  {
    idx.push_back (first_args);
    have_args = false;
  }
else
  idx.push_back (make_value_list (args, arg_nm, tmp));
```

如果有嵌套的 `if` 语句，请使用额外的大括号来增加清晰度。

#### Switch 语句

*同时*缩进大括号和 switch 语句的主体（这样主体会获得*两个*缩进级别的缩进）。

但是，`case` 语句不进行双重缩进，而是与第一个大括号对齐。

```cpp
switch (info)
  {
  case -1:
    {
      cout << "function failed\n";
      return false;
    }

  case 0:
    return true;
  }
```

#### #ifdef 指令

缩进跟在条件预处理指令（如 `#ifdef` 或 `#else`）后面的代码。

示例

```cpp
#if defined (HAVE_CONFIG_H)
#  include "config.h"
#endif
```

如果看起来更好，'#' 字符也可以放在指令旁边，而不是留在第 1 列。

#### 拆分长表达式

拆分长表达式时，续行应以运算符而非标识符开头。如果拆分发生在括号内，续行应与包围拆分的*最内层括号后*的第一个字符对齐。示例：

```cpp
SVD::type type = ((nargout == 0 || nargout == 1)
                  ? SVD::sigma_only
                  : (nargin == 2) ? SVD::economy : SVD::std);
```

#### 可选的大括号

即使没有必要，也可以考虑在多行表达式周围添加额外的大括号以提高可读性。同样，如果能够提高清晰度，可以在任何地方添加额外的大括号。

### 指针和引用的样式

指针的声明中，'\*' 字符应紧挨着变量*名*。

```cpp
unsigned int *pointer_variable;
```

但是，引用的 '&' 字符应紧挨着变量*类型*。

```cpp
unsigned int& reference_variable;
```

### 函数和模板的样式

函数名与输入参数列表的开括号 '(' 之间**必须始终有一个空格**。

```cpp
myfunction (input1, input2);
```

实例化的模板或函数名与类型列表的开尖括号 '<' 之间**不应有空格**。

```cpp
Array<double> work (dim_vector (lwork, 1));
return static_cast<octave_idx_type> (x);
```

### 杂项

取反运算符应在运算符与其目标之间留一个空格，例如 `! A`。

### 函数头

通常，在非头文件中，按以下格式设置函数头：

```cpp
static bool
matches_patterns (const string_vector& patterns, int pat_idx,
                  int num_pat, const std::string& name)
```

函数的返回类型和任何修饰符在第一行指定。第二行的函数名应从第 1 列开始，多行参数列表应与开括号后的第一个字符对齐。函数定义和函数调用时，都应在左开括号前和逗号后加上空格。

对于头文件或类定义中，不将返回类型与函数头的其余部分分开可能看起来更好。请运用您自己的判断。

### 类声明

访问说明符（`public`、`protected`、`private`）应始终明确写出，而不是依赖 C++ 语言对特定对象的默认值（例如，"`class`" = "`private`"）。

在一个类中，不同的访问块应按 1) `public`、2) `protected`、3) `private` 的顺序出现。

在一个访问块内，成员函数（方法）应在成员变量之前指定。如果同时存在成员函数和成员变量，请使用

```
   //--------
```

在两个部分之间进行视觉分隔。

### 命名空间

所有代码都应位于 `octave` 命名空间内或其下的命名空间中（但这可能没有必要。除非获得创建子空间的许可，否则只使用一个 `octave` 命名空间）。命名空间应使用特殊宏 `OCTAVE_BEGIN_NAMESPACE(XXX)` 和 `OCTAVE_END_NAMESPACE(XXX)` 开始和结束。使用这些宏放入命名空间的代码无需缩进。

示例

<table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f2fff2; border: solid 1px #bfffbf;"><tbody><tr><td style="background-color: #c1ffc1; border: solid 1px #a0ffa0; border-bottom: 1px solid #888; font-size: 0.9em"><b>代码：</b> 命名空间宏的使用</td></tr><tr><td><div class="mw-highlight mw-highlight-lang-cpp mw-content-ltr" dir="ltr"><pre><span></span><span class="n">OCTAVE_BEGIN_NAMESPACE</span><span class="p">(</span><span class="n">octave</span><span class="p">)</span><span class="w"></span>
<span class="n">OCTAVE_BEGIN_NAMESPACE</span><span class="p">(</span><span class="n">math</span><span class="p">)</span><span class="w"></span>

<span class="k">template</span><span class="w"> </span><span class="o">&lt;</span><span class="k">typename</span><span class="w"> </span><span class="nc">T</span><span class="o">&gt;</span><span class="w"></span>
<span class="kt">void</span><span class="w"></span>
<span class="n">umfpack_report_control</span><span class="w"> </span><span class="p">(</span><span class="k">const</span><span class="w"> </span><span class="kt">double</span><span class="w"> </span><span class="o">*</span><span class="n">Control</span><span class="p">);</span><span class="w"></span>

<span class="n">OCTAVE_END_NAMESPACE</span><span class="p">(</span><span class="n">math</span><span class="p">)</span><span class="w"></span>
<span class="n">OCTAVE_END_NAMESPACE</span<span class="p">(</span><span class="n">octave</span><span class="p">)</span><span class="w"></span>
</pre></div></td></tr></tbody></table>

如果必须使用裸命名空间指令（偶尔在 Qt 代码中需要），则命名空间内的代码应缩进。

<table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f2fff2; border: solid 1px #bfffbf;"><tbody><tr><td style="background-color: #c1ffc1; border: solid 1px #a0ffa0; border-bottom: 1px solid #888; font-size: 0.9em"><b>代码：</b> 裸命名空间使用</td></tr><tr><td><div class="mw-highlight mw-highlight-lang-cpp mw-content-ltr" dir="ltr"><pre><span></span><span class="c1">// 注意缩进，并且函数没有定义为 "octave::math::foo:foo"</span>
<span class="k">namespace</span><span class="w"> </span><span class="nn">octave</span><span class="w"></span>
<span class="p">{</span><span class="w"></span>
<span class="w">  </span><span class="k">namespace</span><span class="w"> </span<span class="nn">math</span><span class="w"></span>
<span class="w">  </span><span class="p">{</span><span class="w"></span>
<span class="w">    </span><span class="n">foo</span><span class="o">::</span><span class="n">foo</span><span class="w"> </span><span class="p">(...)</span><span class="w"></span>
<span class="w">    </span><span class="p">{</span><span class="w"></span>
<span class="w">      </span><span class="p">...;</span><span class="w"></span>
<span class="w">    </span><span class="p">}</span><span class="w"></span>
<span class="w">  </span><span class="p">}</span><span class="w"></span>
<span class="p">}</span><span class="w"></span>
</pre></div></td></tr></tbody></table>

#### 其他准则

+   不要使用 `using XXX;` 指令
+   不要在 `std::` 命名空间中声明任何内容

## 命名

尽可能使用小写名称。对于由 1-2 个字母组成的变量名，大写是可接受的。不要使用混合大小写（又称驼峰命名法）的名称。

### 成员变量

成员变量应尽可能使用前缀 "m\_"。

### 类变量

类变量应尽可能使用前缀 "s\_"（代表 "static"）。

### 文件名

与 m 文件一样，包含类的 C++ 源文件的文件名应与文件中定义的类的名称相匹配。例如，"password.h" 定义了 "password" 类，而不是 "passwd.h"，后者是 "password" 的常见缩写。

## 头文件

### Include 顺序

在源文件（非头文件）中，按以下顺序包含头文件，每个部分之间用空行分隔：

1.  config.h
2.  C 头文件的 C++ 包装器（cstdlib、cassert 等）
3.  C++ 标准库头文件（iostream、list、map 等）
4.  其他库头文件（glpk.h、curl.h 等，应使用 `#if defined (HAVE_FOO_H)` 保护，因为它们可能在构建系统中缺失）
5.  Octave 的 liboctave 头文件
6.  Octave 的 libinterp 头文件
7.  Octave 的 libgui 头文件

其他 POSIX 头文件（sys/types.h、unistd.h 等）不应直接包含在 Octave 源代码中。为了可移植性，请使用包装函数。您需要的任何东西很可能已经作为 gnulib 提供的函数或头文件的包装器存在。请参阅 liboctave/wrappers 中的文件。这是必要的，因为尽管 gnulib 在可移植性方面很棒，但它通常不能很好地与 C++ 配合使用。

同样，Windows 头文件不应直接包含在 Octave 源代码中。应使用以操作系统无关的方式提供所需功能的包装器。这几乎总是可能的，并且 Octave 源代码中有许多示例。

除非有特定原因，否则每组头文件应按字母顺序排列。唯一需要特殊处理的情况是 oct-parse.in.yy 文件，并且该文件中有相关注释。

头文件/库有一个严格的排序规则**必须**遵守。这些规则**没有例外**：

+   liboctave/wrappers 中的函数只能使用来自 gnulib、标准库或操作系统相关库的头文件和符号。它们**不得**使用来自 liboctave、libinterp 或 libgui 其他部分的任何头文件或符号。
+   liboctave**不得**使用来自 libinterp 或 libgui 的任何头文件或符号。它必须在没有解释器或 GUI 的情况下完全正常工作。
+   libinterp**不得**使用来自 libgui 的任何头文件或符号。它必须在没有 GUI 的情况下完全正常工作。

尽可能使头文件独立于其他头文件。

头文件**不得**包含 config.h。相反，它们应首先包含 octave-config.h。

头文件不应使用任何 "#if defined (HAVE\_FEATURE)" 条件语句。目前并非完全如此，但我们几乎做到了。**不得添加新的条件语句。**

## C++ 特性

### 引用

当传递将被子程序更改的变量时，请使用引用，而不是 C 风格的传递指针方法。

| 好 | 不好 |
| --- | --- |
| 
```c++
void foo (int& a_ref)
{
  // foo 改变了 `a_ref` 的内容
  a_ref = a_ref + 1;
}

void bar ()
{
  int a = 42;
  foo (a);
}
```



 | 

```c++
void foo (int *a_ptr)
{
  // foo 改变了 `a_ptr` 的内容
  *a_ptr = *aptr + 1;
}

void bar ()
{
  int a = 42;
  foo (&a);
}
```



 |

当传递体积较大但不会在子程序中更改（只读）的变量时，请使用 `const` 引用。这有助于避免程序有限的堆栈容量溢出，同时仍确保强制执行只读访问。

| 好 | 不好 |
| --- | --- |
| 
```c++
void foo (const std::string& str_ref)
{
  // foo 不改变 `str_ref` 的内容
}

void bar ()
{
  std::string str ("这是一个很大的变量，但作为引用，当传递给子程序 foo() 时，它在堆栈上只占 8 个字节");
  foo (str);
}
```



 | 

```c++
void foo (std::string str_copy)
{
  // foo 不改变 `str_copy` 的内容
}

void bar ()
{
  std::string str ("这是一个很大的变量，将被复制到堆栈上，并作为临时变量传递给子程序 foo()");
  foo (str);
}
```



 |

### new/delete

将使用 `new` 分配内存的指针应使用 C++ 字面量 `nullptr` 初始化，而不是数值 0 或宏 `NULL`。

`delete` 关键字接受 `nullptr`，程序员不应在 `delete` 周围加上 `if (ptr)` 保护。

| 好 | 不好 |
| --- | --- |
| 
```c++
delete ptr;
```



 | 

```c++
if (ptr)
  delete ptr;
```



 |

### lambda 表达式

当从周围函数中捕获变量时，应明确列出被捕获的变量，而不是依赖默认的按值捕获（`[=]`）或按引用捕获（`[&]`）。这更清楚地表达了程序员的意图，并使代码更易于理解。

### std::string

当需要空字符串时，使用 `""`，而不是用 `std::string ()` 创建一个空的字符串对象。

### auto

只有在有助于可读性和局部变量的情况下才允许使用 `auto`。

+   切勿对类成员使用 auto。
+   除非类型确实模糊不清，否则不要使用 `auto`。
+   在 for 循环中使用 `auto` 时注意拷贝问题。除非处理 `int` 等简单类型，否则应通过引用传递并使用 `const`。有关更多详细信息，请参阅维护者邮件列表中的 ['auto' uses and for-range loops](http://lists.gnu.org/archive/html/octave-maintainers/2016-06/msg00144.html)。

### C++ 风格类型转换

始终使用四种 C++ 长风格类型转换形式（`static_cast`、`dynamic_cast`、`reinterpret_cast`、`const_cast`）中的一种，而不是 C 风格形式（类型转换 `(new_type) variable` 或函数形式 `new_type (variable)`）。

### C++17 特性

[构建 Octave](Building.html "Building") 需要兼容 C++17 的编译器。请充分利用所有 C++17 特性。

### C++20、C++23、C++26 特性

尽量避免使用 C++20、C++23 和 C++26 特性。Octave 在旧系统上广泛构建和使用，我们希望它们能够使用最新版本的 Octave。在这样的系统中构建最新的编译器并非易事，因此限制必须由 Octave 承担。

如果使用 C++20、C++23 或 C++26 特性的实现非常有益，请通过 `configure` 功能检测使其可选，或者在没有该特性的情况下也实现替代代码。无论如何，请通过 [Discourse](https://octave.discourse.group/c/maintainers/7) 与 Octave 维护者联系。

```cpp
#if defined (HAVE_THIS_C14_FEATURE)
  // 真正需要它的代码
#else
  // 没有它时的替代代码
#endif
```

## Doxygen

Doxygen 文档在开发 octave 时非常有帮助，但当前状态还有很大的改进空间。有关 Octave 中 Doxygen 的更多信息，请参阅 [Doxygen](Doxygen.html "Doxygen")。

### Doxygen 风格指南

Doxygen 允许多种注释风格。为了在整个项目中保持一致性，应应用以下规则：

+   对于 Doxygen 注释，仅使用 `//!`，而不是 `/*! ... */`，无论块注释大小如何
+   对于任何 [Doxygen 特殊命令](https://www.stack.nl/~dimitri/doxygen/manual/commands.html)，使用 `@`
+   尽可能少使用格式化。限制使用 [Markdown](https://www.stack.nl/~dimitri/doxygen/manual/markdown.html)，避免使用 HTML 标记。
+   **不要**使用 `@brief` 命令，第一句话将自动用作摘要描述。
+   第一句话应简要描述函数的作用并以句号结尾。
+   在 Doxygen 注释和函数定义之间留一个空行。

正确使用 Doxygen 的示例如下：

```cpp
//! 对其参数做一些有趣的事情。
//!
//! 带有**粗体**特殊命令的长注释。
//!
//! @param some_param 确实应该弄清楚要做什么。
//! @param another_param 对 @p some_param 做一些很酷的事情。
//!
//! 以及一些使用语法高亮的示例：
//!
//! @code{.cc}
//! double v = 1.0;
//! int n = 2;
//! some_function (v, n);
//! @endcode

void
some_function (double some_param, int another_param)
{
  // ...
}
```

## 注释

### FIXME 注释

对于可能需要进一步关注的地方，首选的注释标记是使用 `FIXME:` 注释。

[分类](Special%253ACategories.html "Special:Categories")：

+   [开发](Category%253ADevelopment.html "Category:Development")