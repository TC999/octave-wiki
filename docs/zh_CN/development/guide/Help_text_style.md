# Help text style guide

## Contents

+   [1 Guidelines](#Guidelines)
    +   [1.1 First sentence](#First_sentence)
    +   [1.2 Voice](#Voice)
    +   [1.3 Wording](#Wording)
    +   [1.4 Whitespace](#Whitespace)
    +   [1.5 Line length](#Line_length)
    +   [1.6 Variable naming](#Variable_naming)
    +   [1.7 Manual reference](#Manual_reference)
+   [2 TexInfo](#TexInfo)
    +   [2.1 Examples](#Examples)
    +   [2.2 Octave specific macros](#Octave_specific_macros)
        +   [2.2.1 seealso](#seealso)
        +   [2.2.2 deftypefn](#deftypefn)
    +   [2.3 Formatting](#Formatting)
        +   [2.3.1 Formulas](#Formulas)
        +   [2.3.2 Plain-tex missing macros](#Plain-tex_missing_macros)
    +   [2.4 Special inserts](#Special_inserts)
        +   [2.4.1 Escape characters](#Escape_characters)
        +   [2.4.2 Ellipsis (...)](#Ellipsis_\(...\))
        +   [2.4.3 Matlab](#Matlab)

## Guidelines

The first line of the documentation string should consist of a summary of the function.

Subsequent lines may expand the general nature of the function.

After the introduction there should be paragraphs describing the meaning and usage of each input, followed by the meaning and usage of each output.

Finally, there may be more general information such as notes about the algorithm used, references to scientific papers, notes about any incompatibilities with Matlab, etc.

### First sentence

The first sentence of help text should start with a statement that is like a command. For example, the first sentence of `hist`:

```
Produce histogram counts or plots.         # good
Produces histogram counts or plots.        # bad
hist produces histogram counts or plots.   # bad
```

Usually it looks good to do likewise for the rest of the first paragraph. Subsequent paragraphs usually look better if they have proper subjects.

### Voice

Write documentation strings in the active voice, not the passive, and in the present tense, not the future. For instance, use "Return a list containing A and B." instead of "A list containing A and B will be returned."

Avoid using the word "cause" (or its equivalents) unnecessarily. Instead of, "Cause Octave to display text in boldface," just write "Display text in boldface."

### Wording

The documentation string for a variable that is a yes-or-no flag should start with words such as "Nonzero means...", to make it clear that all nonzero values are equivalent and indicate explicitly what zero and nonzero mean.

### Whitespace

Use two spaces between the period marking the end of a sentence and the word which opens the next sentence. This convention has no effect for typeset formats like Tex, but improves the readability of the documentation in fixed-width environments such as the Info reader.

```
there is no correct for sentence spacing.  But we need a convention # good
there is no correct for sentence spacing. But we need a convention  # bad
```

Do not start or end a documentation string with whitespace.

Do not indent subsequent lines of a documentation string so that the text is lined up in the source code with the text of the first line. This looks nice in the source code, but looks bizarre when users view the documentation. Remember that the indentation before the starting double-quote is not part of the string!

### Line length

Format the documentation string so that it fits within an 80-column screen. It is a good idea for most lines to be no wider than 60 characters.

However, rather than simply filling the entire documentation string, you can make it much more readable by choosing line breaks with care. Use blank lines between topics if the documentation string is long.

### Variable naming

When choosing variable names try to adhere to the following guidelines.

| Variable type | Standard names |
| --- | --- |
| vectors | x,y,z,t,w |
| matrices | A,B,M |
| strings | str, s |
| filename | fname |
| cells | c |
| cellstrs | cstr |

### Manual reference

When submitting a function to Octave, a tag for the docstring should be added to some appropriate place in one of the manual's .txi source files (they are all in doc/interpreter/). Find the most appropriate section in the manual and add the following with the related functions:

<table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f2fff2; border: solid 1px #bfffbf;"><tbody><tr><td style="background-color: #c1ffc1; border: solid 1px #a0ffa0; border-bottom: 1px solid #888; font-size: 0.9em"><b>Code:</b> adding tag for function help text in Octave's manual</td></tr><tr><td><pre>+@DOCSTRING(function_name)
</pre></td></tr></tbody></table>

If appropriate, also write some text about the function on the manual for better inclusion into the manual.

  

## TexInfo

This is the preferred format for help text. There is also a comprehensive [TexInfo manual](https://www.gnu.org/software/texinfo/manual/texinfo/).

### Examples

If you give a code example in the documentation written in Texinfo with the `@example` environment, you should be aware that the text within such an environment will not be wrapped. It is recommended that you keep the lines short enough to fit on pages in the generated pdf or ps documents. That means, keep the lines of examples under 60 characters.

### Octave specific macros

#### seealso

Do not use this macro empty as it will create problems with the [generate\_html](https://octave.sourceforge.io/generate_html/index.html) package.

#### deftypefn

This environment will enclose the function help text. It takes as argument the type of function. Typical values are

+   Function File -- for functions in .m files
+   Loadable Function -- for functions in .oct files
+   Accessor method
+   Class property

Besides this environment there is also the alternative `deftypenx` for alternative forms. Typically these are mentioned at the top of the help text, right after the `deftypen` although this is not really necessary. Cases where it's acceptable to have them on other sections would be methods on the help text of a class constructor, since they will not always be on a separate file.

### Formatting

#### Formulas

Do not use the example environment to insert formulas, consider using `@verbatim` instead.
<!--
<table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f2fff2; border: solid 1px #bfffbf;"><tbody><tr><td><pre>@verbatim
           E[Z(i,k) ]
IRL(k) =  ------------
              V(i)
@end verbatim
</pre></td></tr></tbody></table>
-->
However, this will never print as a nice looking mathematical formula that TeX is known for. It is possible to have Tex formulas but then they won't be displayed on HTML or Info (Octave help) so the following can be done:

<!--
<table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f2fff2; border: solid 1px #bfffbf;"><tbody><tr><td><pre>@tex
\def\frac#1#2{{\begingroup#1\endgroup\over#2}}
$$ IRL(k) = \frac{E[Z(i,k)]}{V(i)} $$
@end tex
@ifnottex
@verbatim
           E[Z(i,k) ]
IRL(k) =  ------------
              V(i)
@end verbatim
@end ifnottex
</pre></td></tr></tbody></table>
-->
#### Plain-tex missing macros

When compared to LaTeX, plain TeX is missing some very useful macros for including mathematical notation. The following is a list of their definitions which can be added on a as needed basis:

+   frac

```tex
\def\frac#1#2{{\begingroup#1\endgroup\over#2}}
```

### Special inserts

#### Escape characters

To escape characters in TexInfo, use the character `@`. Only the characters **@**, **{** and **}** need to be escaped.

+   `@@` stands for a single **@** (do not put braces after an `@@` command)
+   `@{` stands for a single **{**
+   `@}` stands for a single **}**

In certain contexts (such as `@acronym` or `@xref`), commas may need to be escaped. In such situations, use `@comma{}`.

#### Ellipsis (...)

Ellipsis are frequently used in octave help text, especially when defining a function API. Use the `@dots{}` rather than three dots.

<table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f2fff2; border: solid 1px #bfffbf;"><tbody><tr><td><pre>@deftypefn  {} {} imhist (@var{I})
@deftypefnx {} {[@var{counts}, @var{x}] =} imhist (@dots{})
</pre></td></tr></tbody></table>

#### Matlab

Sometimes it is needed to mention Matlab in the help text. An example might be to mention that a weird behavior needs to be kept for Matlab compatibility. In such case, small caps should be used. For example, the following is used in the `length` help text:

<table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f2fff2; border: solid 1px #bfffbf;"><tbody><tr><td><pre>For matrix objects, the length is the number of rows or columns, whichever is
greater (this odd definition is used for compatibility with @sc{matlab}).
</pre></td></tr></tbody></table>

[Category](Special%253ACategories.html "Special:Categories"):

+   [Development](Category%253ADevelopment.html "Category:Development")