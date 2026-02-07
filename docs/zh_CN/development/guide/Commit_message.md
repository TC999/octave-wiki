# Commit message guidelines

Commit messages for [Mercurial](Mercurial.html "Mercurial") get automatically distilled into GNU Changelog entries. The GNU coding standards have [some guidelines](http://www.gnu.org/prep/standards/html_node/Style-of-Change-Logs.html) for how to write Changelogs, and since Octave is a GNU project, we try to produce Changelogs in this style.

You can see how Mercurial will produce the Changelog-style output with the following command:

```bash
  hg log --template changelog
```

For more options, see [the Mercurial manual](https://www.mercurial-scm.org/repo/hg/help/log).

## Contents

+   [1 Examples](#Examples)
    +   [1.1 One line examples](#One_line_examples)
+   [2 Guidelines](#Guidelines)
    +   [2.1 Wording](#Wording)
    +   [2.2 Body of the commit message](#Body_of_the_commit_message)

## Examples

```
Look for methods before constructors

* symtab.cc (symbol_table::fcn_info::fcn_info_rep::find):
Look for class methods before constructors, contrary to Matlab
documentation.
* test/ctor-vs-method: New directory of test classes.
* test/test_ctor_vs_method.m: New file.
* test/Makefile.am: Include ctor-vs-method/module.mk.
(FCN_FILES): Include test_ctor_vs_method.m in the list.
```

```
Allow abbreviations for optimset and optimget (bug #38999)

* optimset.m, optimget.m: Handle abbreviated keys and warn for
 ambiguous abbreviations. New tests.
```

```
Add format option to ticklabel (bug #34906)

* graphics.cc: Add new functions to support different input arguments to
  xyzticklabel. Add tests.
* graphics.in.h: Define set_xyzticklabel as external function.
```

```
Tag symbols in indexed assignments as variables (bug #39240)

* pt-arg-list.cc (tree_argument_list::variable_names): Also return the
  symbol names from index expressions.
* parser.tst: New test.
```

```
tar, untar, unpack: Add support for BSD tar (bug #53695)

* tar_is_bsd.m: New function.
* tar.m: Use it to determine how to run tar and parse command output.
* unpack.m: Likewise.
```

### One line examples

This examples are the rare cases where only one file is modified and the change is simple enough:

```
maint: Merge stable to default

maint: Merge away accidental head

maint: Strip trailing whitespace from source files

maint: Update gnulib to latest changes

doc: Grammarcheck documentation for 4.2 release

pkg.m4: Update to latest version as released with pkg-config 0.29 (bug #48775)

uigetfile.m: Allow path names as input arg (bug #48828)
```

## Guidelines

The general structure of a commit message should be clear from the examples:

+   After the first line, leave one blank line.
+   Do not end the first line with a period (full stop).
+   Keep it short, no longer than 80 characters.
+   Add the bug number, e.g. `(bug #12345)`, where applicable.
+   Use prefixes where applicable:
    +   `build:` for changes to the build system, for example autoconf or automake files.
    +   `doc:` for changes to the documentation.
    +   `gui:` for changes to the graphical user interface.
    +   `maint:` for reorganization of the sources that do not change the source. Regular merge commits are a prominent example.
    +   `test:` for changes to [Tests](Tests.html "Tests") only, e.g. new/removed BISTs, changed tolerances, etc.

  

### Wording

| bad | good |
| --- | --- |
| "Added function" | "New function" |
| "Changed to return retval" | "Return retval" |
| "Fixed bug" | Write **what** has changed. |

The commit message should describe **what** was changed, not **why** it was changed. Any explanations should appear as comments in the code, particularly if there is something that might not be obvious to someone reading it later.

### Body of the commit message

Each individual file changed by a commit must have its changes enumerated. For changes affecting specific C++ functions, each function name is listed in parentheses. For example

```
* file.cc (class1::function1): Add something.
(function2, function3): Delete something else.
```

For changes affecting specific Octave built-ins, each built-in name is listed in parentheses with an "F" prefix, an implementation detail. For example

```
* data.cc (Fcolumns): Return columns.
```

When the same change is applied to a series of files, or to a set of functions in a single file, the file or function names may be grouped to shorten the commit message. For example:

```
* file1.cc, file2.cc, file3.cc, file4.cc: Include <sys/types.h>.
* memory.cc (function1, function2, function3): Throw error if empty.
```

Each line of the commit message body should also be kept under 80 columns. The GNU standards recommend starting a new line for each parenthesized function, but if the line is short enough, we often avoid an extra newline. For example

```
* file.cc (function1): Add an option.  (function2): Add another option.
```

Only the last file name component is typically needed, since most files have unique names across the entire repository. One notable exception are the `module.mk` files in every directory, they should include the complete directory and file name. For example

```
* doc/interpreter/module.mk (dist_man_MANS): Include foo.1 in the list.
```

Avoid abbreviating or using shell globs or patterns when listing the names of files affected by a change, even when they have the same name with different file extensions. For example

```
* oct-fftw.cc, oct-fftw.h (octave_fftw_version): New function.
```

For m-file and Fortran sources, the function name can be omitted if the file contains only one function. For changes outside of functions or classes, of course the parenthetical (function) or (class::function) specifiers can also be omitted.

[Category](Special%253ACategories.html "Special:Categories"):

+   [Development](Category%253ADevelopment.html "Category:Development")