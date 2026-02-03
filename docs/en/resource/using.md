# Using Octave

First, follow the installation instructions for:

+   [macOS](../install/macOS.md "Octave for macOS")
+   [GNU/Linux](../install/Linux.md "Octave for GNU/Linux") and [other Unix systems](../install/unix.md "Octave for other Unix systems")
+   [Microsoft Windows](../install/Windows.md "Octave for Microsoft Windows")

or consult the [GNU Octave manual](https://www.gnu.org/software/octave/doc/interpreter/Installation.html) to install GNU Octave on your system. Then, start the GNU Octave by clicking the icon in the programs menu or launch the interactive prompt by typing `octave` in a terminal. See the manual page on [running Octave](https://www.gnu.org/software/octave/doc/interpreter/Running-Octave.html).

![](../../assets/using/500px-GNU_Octave_screenshot.png)

<!--[](File%253AGNU_Octave_screenshot.png.html "Enlarge")-->

The GNU Octave graphical user interface (GUI).

## Contents

+   [1 Variable Assignment](#Variable_Assignment)
+   [2 Comments](#Comments)
+   [3 Command evaluation](#Command_evaluation)
+   [4 Elementary math](#Elementary_math)
+   [5 Matrices](#Matrices)
+   [6 Linear Algebra](#Linear_Algebra)
+   [7 Accessing Elements](#Accessing_Elements)
+   [8 Control flow with loops](#Control_flow_with_loops)
+   [9 Vectorization](#Vectorization)
+   [10 Plotting](#Plotting)
+   [11 Strings](#Strings)
+   [12 If-else](#If-else)
+   [13 Getting Help](#Getting_Help)
+   [14 Octave packages](#Octave_packages)
+   [15 Octave User Codes](#Octave_User_Codes)

# Variable Assignment

Assign values to variables with `=` (Note: assignment is *pass-by-value*). Read more [about variables](https://www.gnu.org/software/octave/doc/interpreter/Variables.html).

```matlab
a = 1;
```

# Comments

`#` or `%` start a comment line, that continues to the end of the line. Read more [about comments](https://www.gnu.org/software/octave/doc/interpreter/Comments.html).

# Command evaluation

The output of every command is printed to the console unless terminated with a semicolon `;`. The [disp](https://www.gnu.org/software/octave/doc/interpreter/XREFdisp.html) command can be used to print output anywhere. Use [exit](https://www.gnu.org/software/octave/doc/interpreter/XREFquit.html) or [quit](https://www.gnu.org/software/octave/doc/interpreter/XREFquit.html) to quit the console. Read more [about command evaluation](https://www.gnu.org/software/octave/doc/interpreter/Simple-Examples.html).

```matlab
t = 99 + 1  # prints 't = 100'
```

```text
t =  100
```

```matlab
t = 99 + 1; # nothing is printed
disp(t);
```

```text
 100
```

# Elementary math

Many mathematical operators are available in addition to the standard arithmetic. Operations are floating-point. Read more [about elementary math](https://www.gnu.org/software/octave/doc/interpreter/Arithmetic.html).

```matlab
x = 3/4 * pi;
y = sin (x)
```

```text
y =  0.70711
```

# Matrices

Arrays in Octave are called matrices. One-dimensional matrices are referred to as vectors. Use a space or a comma `,` to separate elements in a row and semicolon `;` to start a new row. Read more [about matrices](https://www.gnu.org/software/octave/doc/interpreter/Linear-Algebra.html).

```matlab
rowVec = [8 6 4]
```

```text
rowVec =
   8   6   4
```

```matlab
columnVec = [8; 6; 4]
```

```text
columnVec =
   8
   6
   4
```

```matlab
mat = [8 6 4; 2 0 -2]
```

```text
mat =
   8   6   4
   2   0  -2
```

```matlab
size(mat)
```

```text
ans =
   2   3
```

```matlab
length(rowVec)
```

```text
ans =  3
```

# Linear Algebra

Many common linear algebra operations are simple to program using Octave’s matrix syntax. Read more [about linear algebra](https://www.gnu.org/software/octave/doc/interpreter/Linear-Algebra.html).

```matlab
columnVec * rowVec
```

```text
ans =
   64   48   32
   48   36   24
   32   24   16
```

```matlab
rowVec * columnVec
```

```text
ans =  116
```

```matlab
columnVec'
```

```text
ans =
   8   6   4
```

# Accessing Elements

Octave is 1-indexed. Matrix elements are accessed as `matrix(rowNum, columnNum)`. Read more [about accessing elements](https://www.gnu.org/software/octave/doc/interpreter/Index-Expressions.html).

```matlab
mat(2,3)
```

```text
ans = -2
```

# Control flow with loops

Octave supports `for` and `while` loops, as well as other control flow structures. Read more [about control flow](https://www.gnu.org/software/octave/doc/interpreter/Statements.html).

```matlab
x = zeros (50,1);
for i = 1:2:100 # iterate from 1 to 100 with step size 2
  x(i) = i^2;
endfor

y = zeros (50,1);
k = 1;
step = 2;
while (k <= 100)
  y(k) = k^2;
  k = k + step;
endwhile
```

# Vectorization

For-loops can often be replaced or simplified using vector syntax. The operators `*`, `/`, and `^` all support element-wise operations writing a dot `.` before the operators. Many other functions operate element-wise by default ([sin](https://www.gnu.org/software/octave/doc/interpreter/XREFsin.html), `+`, `-`, etc.). Read more [about vectorization](https://www.gnu.org/software/octave/doc/interpreter/Vectorization-and-Faster-Code-Execution.html).

```matlab
i = 1:2:100;      # create an array with 50-elements
x = i.^2;         # each element is squared
y = x + 9;        # add 9 to each element
z = y./i;         # divide each element in y by the corresponding value in i
w = sin (i / 10); # take the sine of each element divided by 10
```

# Plotting

The function [plot](https://www.gnu.org/software/octave/doc/interpreter/XREFplot.html) can be called with vector arguments to create 2D line and scatter plots. Read more [about plotting](https://www.gnu.org/software/octave/doc/interpreter/Two_002dDimensional-Plots.html).

```matlab
plot (i / 10, w);
title ('w = sin (i / 10)');
xlabel ('i / 10');
ylabel ('w');
```

![Using octave-1.png](../../assets/using/300px-Using_octave-1.png)

<!--[](File%253AUsing_octave-1.png.html "Enlarge")-->

# Strings

Strings are simply arrays of characters. Strings can be composed using C-style formatting with [sprintf](https://www.gnu.org/software/octave/doc/interpreter/XREFsprintf.html) or [fprintf](https://www.gnu.org/software/octave/doc/interpreter/XREFfprintf.html). Read more [about strings](https://www.gnu.org/software/octave/doc/interpreter/Strings.html).

```matlab
firstString = "hello world";
secondString = "!";
[firstString, secondString] # concatenate both strings
```

```text
ans = hello world!
```

```matlab
fprintf ("%s %.10f \n", "The number is:", 10)
```

```text
The number is: 10.0000000000
```

# If-else

Conditional statements can be used to create branching logic in your code. Read more [in the manual](https://www.gnu.org/software/octave/doc/interpreter/The-if-Statement.html).

```matlab
# Print 'Foo'      if divisible by 7,
#       'Fizz'     if divisible by 3,
#       'Buzz'     if divisible by 5,
#       'FizzBuzz' if divisible by 3 and 5
for i = 1:1:20
  outputString = "";
  if (rem (i, 3) == 0)  # rem is the remainder function
    outputString = [outputString, "Fizz"];
  endif
  if (rem (i, 5) == 0)
    outputString = [outputString, "Buzz"];
  elseif (rem(i,7) == 0)
    outputString = "Foo";
  else
    outputString = outputString;
  endif
  fprintf("i=%g: %s \n", i, outputString);
endfor
```

```text
i=1:  
i=2:  
i=3: Fizz 
i=4:  
i=5: Buzz 
i=6: Fizz 
i=7: Foo 
i=8:  
i=9: Fizz 
i=10: Buzz 
i=11:  
i=12: Fizz 
i=13:  
i=14: Foo 
i=15: FizzBuzz 
i=16:  
i=17:  
i=18: Fizz 
i=19:  
i=20: Buzz
```

# Getting Help

The [help](https://www.gnu.org/software/octave/doc/interpreter/XREFhelp.html) and [doc](https://www.gnu.org/software/octave/doc/interpreter/XREFdoc.html) commands can be invoked at the Octave prompt to print documentation for any function.

```matlab
help plot
doc plot
```

# Octave packages

Community-developed packages can be added from the [Octave Packages](https://gnu-octave.github.io/packages/) website to extend the functionality of Octave’s core library. (Matlab users: Packages act similarly to Matlab’s toolboxes.) The [pkg](https://www.gnu.org/software/octave/doc/interpreter/XREFpkg.html) command is used to manage these packages. For example, to use the image processing library visit its [page on Octave Packages,](https://gnu-octave.github.io/packages/image/) copy the install command and run it in octave

```matlab
pkg install "https://downloads.sourceforge.net/project/octave/Octave%20Forge%20Packages/Individual%20Package%20Releases/image-2.14.0.tar.gz" # install package
pkg load image           # load new functions into workspace
```

[Read more about packages](https://www.gnu.org/software/octave/doc/interpreter/Packages.html).

# Octave User Codes

There are also User Codes available for GNU Octave which are not part of the core program or any of the packages.

[See Category User Codes](Category%253AUser_Codes.html "Category:User Codes").

[Category](Special%253ACategories.html "Special:Categories"):

+   [Tutorials](Category%253ATutorials.html "Category:Tutorials")