# Octave Style Guide

A lot of GNU Octave is written in the Octave language itself. This document details the Octave style used by the GNU Octave project.

Being part of the GNU project, Octave inherits the [GNU coding standards](https://www.gnu.org/prep/standards/standards.html#Writing-C). However, those were written with C in mind and can't always apply to Octave code.

See also the GNU Octave [C++ style guide](C++_style_guide.html "C++ style guide").

## Contents

+   [1 Formatting](#Formatting)
    +   [1.1 Line Length](#Line_Length)
    +   [1.2 Indentation](#Indentation)
    +   [1.3 Whitespace](#Whitespace)
        +   [1.3.1 Function Calls](#Function_Calls)
        +   [1.3.2 Indexing Expressions](#Indexing_Expressions)
        +   [1.3.3 Matrix Definition](#Matrix_Definition)
        +   [1.3.4 Arithmetic Operators](#Arithmetic_Operators)
+   [2 Error messages](#Error_messages)
+   [3 Naming](#Naming)
    +   [3.1 General naming functions](#General_naming_functions)
    +   [3.2 Function names](#Function_names)
    +   [3.3 Variable names](#Variable_names)
+   [4 Quoted Strings](#Quoted_Strings)
+   [5 ending blocks](#ending_blocks)
+   [6 ! operator](#!_operator)
+   [7 Comments](#Comments)
    +   [7.1 \# or %](##_or_%)
    +   [7.2 Block and Inline comment](#Block_and_Inline_comment)
    +   [7.3 Commenting out code](#Commenting_out_code)
    +   [7.4 %! for test and demo blocks](#%!_for_test_and_demo_blocks)
    +   [7.5 FIXME notes](#FIXME_notes)

## Formatting

### Line Length

There is no fixed line length. In general, strive for clarity and readability and use your own judgement.

Everyone has access to monitors with more than 80 columns, but even so, exceptionally long lines can be hard to read. However, keeping code together on a line that is logically one unit does improve readability.

### Indentation

Use only spaces, and indent 2 spaces at a time.

Absolutely **do not use tabs** in your code. You should probably set your editor to emit spaces when you hit the tab key.

### Whitespace

##### Function Calls

When calling functions, put spaces after commas and before the calling parentheses, like this:

```matlab
x = max (sin (y + 3), 2);
```

An exception are matrix or cell constructors:

```matlab
[sin(x), cos(x)]
{sin(x), cos(x)}
```

Here, putting spaces after `sin`, `cos` would result in a parse error.

##### Indexing Expressions

For indexing expressions, do *not* put a space after the identifier (this differentiates indexing and function calls nicely). The space after a comma is not necessary if index expressions are simple, i.e., you may write

```
A(:,i,j)
```

but

```
A([1:i-1;i+1:n], XI(:,2:n-1))
```

##### Matrix Definition

When constructing matrices, prefer using the comma rather than the space to distinguish between columns.

```
  M = [1, 2, 3
       4, 5, 6];
```

However, if the matrix is large or the indentation makes it clear then the comma may be dropped.

```
  prices = [ 1.01  2.02  3.03
            44.04 55.05  6.06];
```

There is no need to include semicolons to define rows when a newline is used instead.

##### Arithmetic Operators

Do include spaces around all binary arithmetic operators, for example

```
  x = 1 / (1 + y) ^ 2;
```

An exception is for extremely simple expressions like

```
n+1
```

In particular, simple expressions used as an argument to a function or as part of an indexing expression usually look better without extra spacing. For example, you may write

```
  x(1:end-1)
```

Another exception is for complex arithmetic expressions. It *may* improve readability to omit spaces around higher precedence operators, for example

```
  z = cat (dim, (x2.*y3 - x3.*y2), (x3.*y1 - x1.*y3), (x1.*y2 - x2.*y1));
```

## Error messages

When you encounter an error condition, call the function `error` (or `print_usage`). The `error` and `print_usage` functions do not return.

It is customary to prefix the error message with the name of the function that generated it. For example:

```
error ("my_cool_function: input A must be a matrix");
```

Because the function call to `error` is one code unit, prefer keeping the message on one line even if the message itself is long.

Octave has several functions that produce error messages according to the Octave guidelines. Consider using `inputParser` and `validateattributes`.

## Naming

Use lowercase names if possible. Uppercase is acceptable for variable names consisting of 1-2 letters. Do not use mixed case (a.k.a. CamelCase) names.

Function names must be lowercase. Function names are global, so choose them wisely.

### General naming functions

### Function names

For most public functions we are limited by Matlab compatibility. Use whatever name Matlab chose.

For functions that are not present in Matlab, favor the use of underscores. For example, `base64_decode`, `common_size`, or `compare_versions`.

There are exceptions to this:

Matching C functions

If the function exists elsewhere with a common name, use it. For example, `dup2`, `waitpid`, `printf`, `argv`, or `getopt`.

Matching similar functions

If there are similarly named functions, consider using same style. For example, `fftconvn` and `histthresh`, match the naming of `fftconv2` and `graythresh`.

### Variable names

Avoid reusing the names of other functions as local variable names. For example, avoid naming local variables `abs`, `log`, or `pow`. These names might be used later to try to call the function of that name, but instead will refer to a local variable, leading to very confusing errors.

An exception is the use of `i` and `j` as loop indices. If a function has nothing to do with complex arithmetic, it is common and acceptable to use `i` and `j` as local variables in for loops.

## Quoted Strings

Always use double quotes for strings and characters rather than the Matlab single quote convention. Both quote types are accepted by Octave, but double quoted strings are interpreted slightly differently (see [Strings](https://www.gnu.org/software/octave/doc/interpreter/Strings.html) in the manual for details).

**Do:**

```
a = "Hello, world";
b = "x";
disp ("This \"string\" contains a\nnewline");
```

**Don't:**

```
s = 'Hello, world';
if (x(1) == 'c')
  disp ('Don''t quote one character this way, even if you''re a C programmer');
endif
```

There are a few edge cases where single quoted strings may be preferable, and are permitted as exceptions under this style guide.

String containing double quotes

A string that contains many double quote characters itself, where escaping all of them with backslashes becomes inconvenient, may be easier with single quotes.

String containing backslashes

A string that contains literal backslashes, in particular a regular expression pattern, where doubly escaping certain character sequences is both inconvenient and harder to read, is usually better done with single quotes.

Argument interpreted differently

A string argument to the regexp family of functions may be interpreted differently depending on whether it is a double quoted or single quoted string. Certain escape sequences are interpreted only in a single quoted string for Matlab compatibility.

## ending blocks

Always use a specific end-of-block statement (like `endif`, `endswitch`) rather than the generic `end`.

Enclose the condition of an `if`, `while`, `until`, or `switch` statement in parentheses, as in C:

```
if (isvector (a))
  s = sum (a);
endif
```

Do not do this, however, with the iteration counter portion of a `for` statement. Write:

```
for i = 1:n
  b(i) = sum (a(:,i));
endfor
```

## ! operator

+   The Octave operator `!` should be used for logical negation, rather than `~`.
+   The negation operator is written with a space between the operator and its target, e.g., `! A`.
+   For comparisons use `!=` instead of `~=`.

## Comments

### \# or %

Always use `#` to write comments for Octave code. Only use `%` if code must run in a dual Matlab/Octave environment.

Absolutely do not use `%#` or mix `%` and `#` in the same file.

### Block and Inline comment

Use a single `#` for inline comments. Use double `##` for block comments.

Comments that start with a single sharp-sign, `#`, are used to explain the code on the same line as the comment itself. These comments should all be aligned to the same column to the right of the source code. In the Emacs mode for Octave, the `M-;` (@code{indent-for-comment}) command automatically inserts such a `#` in the right place, or aligns such a comment if it is already present. Example:

```
C = 2 * pi * r;    # formula for circumference of a circle
```

Comments that start with a double sharp-sign, `##`, are stand-alone comments that occupy an entire line. These comments should be aligned to the same level of indentation as the code. Such comments usually describe the purpose of the following lines or the state of the program at that point. Example:

```
## Calculate area and volume of a sphere
A = 4 * pi * r^2;
V = 4/3 * pi * r^3;
```

### Commenting out code

Do not comment code out. If the code is no longer used, remove it. We use version control, we can always bring it back.

### %! for test and demo blocks

Any demos or Built-In Self Tests (BIST) using the `%!demo` or `%!test` syntax should begin two lines after the `endfunction` keyword. Demo blocks should be listed before test blocks.

See the section Writing tests on the [Tests](Tests.html "Tests") page.

### FIXME notes

The preferred comment mark for places that may need further attention is with `FIXME:` comments.

[Category](Special%253ACategories.html "Special:Categories"):

+   [Development](Category%253ADevelopment.html "Category:Development")