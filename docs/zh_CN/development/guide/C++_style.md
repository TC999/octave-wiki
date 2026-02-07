# C++ Style Guide

A lot of GNU Octave is written in C++. This document details the C++ style used by the GNU Octave project.

Being part of the GNU project, Octave inherits the [GNU coding standards](https://www.gnu.org/prep/standards/standards.html#Writing-C).

See also the GNU Octave [Octave style guide](Octave_style_guide.html "Octave style guide") for how to write m-files.

## Contents

+   [1 Formatting](#Formatting)
    +   [1.1 Line Length](#Line_Length)
    +   [1.2 Indentation](#Indentation)
        +   [1.2.1 Functions, class, struct, enum](#Functions,_class,_struct,_enum)
        +   [1.2.2 Control structures (if, while, ...)](#Control_structures_\(if,_while,_...\))
        +   [1.2.3 Switch statements](#Switch_statements)
        +   [1.2.4 #ifdef directives](##ifdef_directives)
        +   [1.2.5 Split long expressions](#Split_long_expressions)
        +   [1.2.6 Optional braces](#Optional_braces)
    +   [1.3 Pointer and Reference appearance](#Pointer_and_Reference_appearance)
    +   [1.4 Function and Template appearance](#Function_and_Template_appearance)
    +   [1.5 Miscellaneous](#Miscellaneous)
    +   [1.6 Function headers](#Function_headers)
    +   [1.7 Class declarations](#Class_declarations)
    +   [1.8 Namespace](#Namespace)
        +   [1.8.1 Other Guidelines](#Other_Guidelines)
+   [2 Naming](#Naming)
    +   [2.1 Member Variables](#Member_Variables)
    +   [2.2 Class Variables](#Class_Variables)
    +   [2.3 Filenames](#Filenames)
+   [3 Header Files](#Header_Files)
    +   [3.1 Order of Includes](#Order_of_Includes)
+   [4 C++ features](#C++_features)
    +   [4.1 references](#references)
    +   [4.2 new/delete](#new/delete)
    +   [4.3 lambda expressions](#lambda_expressions)
    +   [4.4 std::string](#std::string)
    +   [4.5 auto](#auto)
    +   [4.6 C++ style casting](#C++_style_casting)
    +   [4.7 C++17 features](#C++17_features)
    +   [4.8 C++20, C++23, C++26 features](#C++20,_C++23,_C++26_features)
+   [5 Doxygen](#Doxygen)
    +   [5.1 Doxygen Style Guide](#Doxygen_Style_Guide)
+   [6 Comments](#Comments)
    +   [6.1 FIXME notes](#FIXME_notes)

## Formatting

### Line Length

There is no fixed line length. In general, strive for clarity and readability and use your own judgement.

Everyone has access to monitors with more than 80 columns, but even so, exceptionally long lines can be hard to read. However, keeping code together on a line that is logically one unit does improve readability.

### Indentation

+   Use only spaces, with 2 spaces per indent.
+   Tabs are prohibited.

#### Functions, class, struct, enum

The curly braces defining the beginning and end of the block should appear on their own line.

The braces should not be indented, i.e., they align at the same indentation level as the keyword such as `class`.

The body of the block is indented.

Note that class access specifiers `public`, `protected`, `private` are not indented.

Example:

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

#### Control structures (if, while, ...)

When indenting, indent the statement after control structures (like `if`, `while`, etc.).

If there is a compound statement, indent *both* the curly braces and the body of the statement (so that the body gets indented by *two* indents).

Example:

```cpp
if (have_args)
  {
    idx.push_back (first_args);
    have_args = false;
  }
else
  idx.push_back (make_value_list (args, arg_nm, tmp));
```

If you have nested `if` statements, use extra braces for extra clarification.

#### Switch statements

Indent *both* the curly braces and the body of the switch statement (so that the body gets indented by *two* indents).

However, the `case` statement is not doubly indented and instead aligns with the first brace.

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

#### #ifdef directives

Indent code that follows a conditional processor directive such as `#ifdef` or `#else`.

Example

```cpp
#if defined (HAVE_CONFIG_H)
#  include "config.h"
#endif
```

The '#' character may also be placed with the directive rather than remaining in column 1 if this looks better.

#### Split long expressions

Split long expressions in such a way that a continuation line starts with an operator rather than identifier. If the split occurs inside braces, continuation should be aligned with the first char after the innermost braces enclosing the split. Example:

```cpp
SVD::type type = ((nargout == 0 || nargout == 1)
                  ? SVD::sigma_only
                  : (nargin == 2) ? SVD::economy : SVD::std);
```

#### Optional braces

Consider putting extra braces around a multi-line expression to make it more readable, even if they are not necessary. Also, do not hesitate to put extra braces anywhere if it improves clarity.

### Pointer and Reference appearance

Declarations of pointers have the '\*' character cuddled with the *name* of the variable.

```cpp
unsigned int *pointer_variable;
```

However, references have the '&' character cuddled with the *type* of the variable.

```cpp
unsigned int& reference_variable;
```

### Function and Template appearance

There must always be **one space** between the name of a function and the opening parenthesis '(' for the input parameter list.

```cpp
myfunction (input1, input2);
```

There should be **no space** between the name of an instantiated template or function and the opening angle bracket '<' for the type list.

```cpp
Array<double> work (dim_vector (lwork, 1));
return static_cast<octave_idx_type> (x);
```

### Miscellaneous

The negation operator is written with a space between the operator and its target, e.g., `! A`.

### Function headers

In general, in non-header files, format function headers like this:

```cpp
static bool
matches_patterns (const string_vector& patterns, int pat_idx,
                  int num_pat, const std::string& name)
```

The return type of the function and any modifiers are specified on the first line. The function name on the second line should start in column 1, and multi-line argument lists should be aligned on the first character after the open parenthesis. Put a space before the left open parenthesis and after commas, for both function definitions and function calls.

For header files, or in class definitions, it may look better not to split the return type from the rest of the function header. Use your own judgement.

### Class declarations

The access specifier (`public`, `protected`, `private`) should always be stated rather than relying on the C++ language defaults for a particular object (for example, "`class`" = "`private`").

Within a class, the different access blocks should appear in the order 1) `public`, 2) `protected`, 3) `private`.

Within an access block, member functions (methods) should be specified before member variables. If there are both member functions and member variables use

```
   //--------
```

between the sections to visually separate the two categories.

### Namespace

All code should be in the `octave` namespace or in a namespace below it (but this is probably unnecessary. Just use the one `octave` namespace unless give permission to create a subspace). Namespaces should start and stop using the special macros `OCTAVE_BEGIN_NAMESPACE(XXX)` and `OCTAVE_END_NAMESPACE(XXX)`. There is no indentation of code that is placed into namespaces using these macros.

Example

<table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f2fff2; border: solid 1px #bfffbf;"><tbody><tr><td style="background-color: #c1ffc1; border: solid 1px #a0ffa0; border-bottom: 1px solid #888; font-size: 0.9em"><b>Code:</b> Use of namespace macros</td></tr><tr><td><div class="mw-highlight mw-highlight-lang-cpp mw-content-ltr" dir="ltr"><pre><span></span><span class="n">OCTAVE_BEGIN_NAMESPACE</span><span class="p">(</span><span class="n">octave</span><span class="p">)</span><span class="w"></span>
<span class="n">OCTAVE_BEGIN_NAMESPACE</span><span class="p">(</span><span class="n">math</span><span class="p">)</span><span class="w"></span>

<span class="k">template</span><span class="w"> </span><span class="o">&lt;</span><span class="k">typename</span><span class="w"> </span><span class="nc">T</span><span class="o">&gt;</span><span class="w"></span>
<span class="kt">void</span><span class="w"></span>
<span class="n">umfpack_report_control</span><span class="w"> </span><span class="p">(</span><span class="k">const</span><span class="w"> </span><span class="kt">double</span><span class="w"> </span><span class="o">*</span><span class="n">Control</span><span class="p">);</span><span class="w"></span>

<span class="n">OCTAVE_END_NAMESPACE</span><span class="p">(</span><span class="n">math</span><span class="p">)</span><span class="w"></span>
<span class="n">OCTAVE_END_NAMESPACE</span><span class="p">(</span><span class="n">octave</span><span class="p">)</span><span class="w"></span>
</pre></div></td></tr></tbody></table>

If bare namespace directives must be used, as occasionally is required in Qt code, then the code within the namespace should be indented.

<table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f2fff2; border: solid 1px #bfffbf;"><tbody><tr><td style="background-color: #c1ffc1; border: solid 1px #a0ffa0; border-bottom: 1px solid #888; font-size: 0.9em"><b>Code:</b> bare namespace usage</td></tr><tr><td><div class="mw-highlight mw-highlight-lang-cpp mw-content-ltr" dir="ltr"><pre><span></span><span class="c1">// Note indentation and that functions are not defined as "octave::math::foo:foo"</span>
<span class="k">namespace</span><span class="w"> </span><span class="nn">octave</span><span class="w"></span>
<span class="p">{</span><span class="w"></span>
<span class="w">  </span><span class="k">namespace</span><span class="w"> </span><span class="nn">math</span><span class="w"></span>
<span class="w">  </span><span class="p">{</span><span class="w"></span>
<span class="w">    </span><span class="n">foo</span><span class="o">::</span><span class="n">foo</span><span class="w"> </span><span class="p">(...)</span><span class="w"></span>
<span class="w">    </span><span class="p">{</span><span class="w"></span>
<span class="w">      </span><span class="p">...;</span><span class="w"></span>
<span class="w">    </span><span class="p">}</span><span class="w"></span>
<span class="w">  </span><span class="p">}</span><span class="w"></span>
<span class="p">}</span><span class="w"></span>
</pre></div></td></tr></tbody></table>

#### Other Guidelines

+   Do not use `using XXX;` directives
+   Do not declare anything on the `std::` namespace

## Naming

Use lowercase names if possible. Uppercase is acceptable for variable names consisting of 1-2 letters. Do not use mixed case (a.k.a. CamelCase) names.

### Member Variables

Member variables should use the prefix "m\_" whenever possible.

### Class Variables

Class variables should use the prefix "s\_" (for "static") whenever possible.

### Filenames

As with m-files, the file name of a C++ source file containing a class should match the name of the class defined within the file. For example, "password.h" defines the class "password" rather than "passwd.h" which is a common abbreviation for "password".

## Header Files

### Order of Includes

In source files (not headers files), use the following order with an empty line between each section:

1.  config.h
2.  The C++ wrappers for C headers (cstdlib, cassert, etc.)
3.  C++ standard library headers (iostream, list, map, etc.)
4.  Other library header files (glpk.h, curl.h, etc., should be protected by `#if defined (HAVE_FOO_H)` since they may be missing on the build system)
5.  Octave's liboctave headers
6.  Octave's libinterp headers
7.  Octave's libgui headers

Other POSIX headers (sys/types.h, unistd.h, etc., should not be included directly into Octave sources. For portability, use a wrapper function. Anything you need is probably already available as a wrapper around a function or header provided by gnulib. See the files in liboctave/wrappers. This is necessary because although gnulib is great for portability, it does not generally work well with C++.

Similarly, Windows headers should not be included directly into Octave sources. Wrappers that provide the needed functionality in an OS-independent way should be used instead. This is almost always possible and there are many examples in the Octave sources.

Each grouping of header files should be alphabetized unless there is some specific reason to not do that. The only case where that is true is in oct-parse.in.yy and there is a comment in the file for that one.

There is a strict ordering of header files/libraries that must be followed. There are **no exceptions** to these rules:

+   The functions in liboctave/wrappers may only use headers and symbols from gnulib, standard libraries, or OS-dependent libraries. They **must not** use any headers or symbols from other parts of liboctave, libinterp, or libgui.
+   liboctave **must not** use any headers or symbols from libinterp or libgui. It must be fully functional without the interpreter or GUI.
+   libinterp **must not** use any headers or symbols from libgui. It must be fully functional without the GUI.

As much as possible, header files should be independent of other header files.

Header files **must not** include config.h. Instead, they should begin by including octave-config.h.

Header files should not use any "#if defined (HAVE\_FEATURE)" conditionals. This is not quite true yet, but we are almost there. **No new conditionals may be added.**

## C++ features

### references

Use references when passing variables that will be changed by a subroutine rather than the C-style method of passing pointers.

| good | bad |
| --- | --- |
| 
```c++
void foo (int& a_ref)
{
  // foo changes content of `a_ref`
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
  // foo changes content of `a_ptr`
  *a_ptr = *aptr + 1;
}

void bar ()
{
  int a = 42;
  foo (&a);
}
```



 |

When passing variables that are large, but will not be changed in a subroutine (read-only), use `const` references. This helps avoid overflowing the finite stack capacity of a program while still ensuring that read-only access is enforced.

| good | bad |
| --- | --- |
| 
```c++
void foo (const std::string& str_ref)
{
  // foo does not change content of `str_ref`
}

void bar ()
{
  std::string str ("This is a large variable, however as a reference it will take up just 8 bytes on the stack when passed to the subroutine foo()");
  foo (str);
}
```



 | 

```c++
void foo (std::string str_copy)
{
  // foo does not change content of `str_copy`
}

void bar ()
{
  std::string str ("This is a large variable that will be copied on to the stack and passed as a temporary variable to the subroutine foo()");
  foo (str);
}
```



 |

### new/delete

Pointers that will be allocated memory with `new` should be initialized with the C++ literal `nullptr`, not the numerical value 0 or the macro `NULL`.

The `delete` keyword accepts `nullptr` and programmers should not put an `if (ptr)` guard around `delete`.

| good | bad |
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

### lambda expressions

When capturing variables from the surrounding function, explicitly list the variables being captured rather than relying on a default capture by value (\`\[=\]\`) or by reference (\`\[&\]\`). This more clearly captures the programmer's intent and makes the code more understandable.

### std::string

When an empty string is required, use `""`, rather than creating an empty string object with `std::string ()`.

### auto

Use of `auto` is allowed only where it helps readability and local variables.

+   Never use auto for class members.
+   Do not use `auto` unless the type really is obscure.
+   Beware of copy when using `auto` in for loops. Pass by reference and use `const` unless you're dealing with simple types such as `int`. See ['auto' uses and for-range loops](http://lists.gnu.org/archive/html/octave-maintainers/2016-06/msg00144.html) on the maintainers mailing list for more details.

### C++ style casting

Always use one of the four C++ long style casting forms (`static_cast`, `dynamic_cast`, `reinterpret_cast`, `const_cast`) rather than C-style forms (type cast `(new_type) variable` or the function form `new_type (variable)`).

### C++17 features

A C++17 compatible compiler is required for [building Octave](Building.html "Building"). Please make use of all C++17 features.

### C++20, C++23, C++26 features

Try to avoid C++20, C++23, and C++26 features. Octave is widely built and used on older systems and we want them to be able to use up to date versions of Octave. Building a recent compiler in such systems is not a trivial task so the limitation must happen in Octave.

If the implementation using a C++20, C++23, or C++26 feature is very beneficial, make it optional via `configure` feature detection or also implement an alternative code in the absence of said feature. In any case, please get in contact with the Octave maintainers on [Discourse](https://octave.discourse.group/c/maintainers/7).

```cpp
#if defined (HAVE_THIS_C14_FEATURE)
  // code that really needs it
#else
  // alternative code in its absence
#endif
```

## Doxygen

Doxygen documentation can be a great help when developing octave however the current state has a lot of room for improvement. For more information about Doxygen in Octave look at [Doxygen](Doxygen.html "Doxygen").

### Doxygen Style Guide

Doxygen allows for a variety of commenting styles. In order to maintain uniformity across the entire project the following rules should be applied:

+   For Doxygen comments use only `//!` and NOT `/*! ... */`, regardless of the size of the block comment
+   Use `@` for any [Doxygen Special Commands](https://www.stack.nl/~dimitri/doxygen/manual/commands.html)
+   Use as little formatting as possible. Restrict to [Markdown](https://www.stack.nl/~dimitri/doxygen/manual/markdown.html) and avoid HTML-markup.
+   Do NOT use the `@brief` command, the first sentence will automatically be used as the summary description.
+   The first sentence should describe briefly what the function does and end with a period.
+   Leave a blank line between the Doxygen comment and function definition.

An example of properly used Doxygen would look like:

```cpp
//! Does something interesting with its arguments.
//!
//! Long comment with **bold** special commands.
//!
//! @param some_param Really should figure out what to do.
//! @param another_param Does something cool with @p some_param.
//!
//! And some example using syntax highlighting:
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

## Comments

### FIXME notes

The preferred comment mark for places that may need further attention is with `FIXME:` comments.

[Category](Special%253ACategories.html "Special:Categories"):

+   [Development](Category%253ADevelopment.html "Category:Development")