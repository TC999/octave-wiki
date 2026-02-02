# FAQ

## Contents

+   [1 How can I get involved in Octave development?](#How_can_I_get_involved_in_Octave_development?)
+   [2 How can I contribute code to Octave?](#How_can_I_contribute_code_to_Octave?)
+   [3 How can I find which source file implements a given command?](#How_can_I_find_which_source_file_implements_a_given_command?)
    +   [3.1 m-file functions](#m-file_functions)
    +   [3.2 built-in functions](#built-in_functions)

## How can I get involved in Octave development?

+   **Be around. Be social.**
    
    Participate in our [Discourse Forum](https://octave.discourse.group/). Find things about Octave you don't like, and start thinking about how to fix them. **Please do not just send a message listing your skills and offering to help.**
    
    Many people who now contribute to Octave first spent some time observing the community communication before they started to delve into the code. A good way to learn Octave is to understand the problems other people are having with it, so being helpful in Discourse not only helps Octave as a whole, but it also prepares you to become a better Octave contributor.
    

+   **Kill the bugs.**
    
    Accurate bug reporting is also very useful. Find and report [bugs](http://bugs.octave.org/), making an attempt to diagnose them. Eventually, you will also know how to fix them. If you want to help with bug reports or patches, subscribe to the [bug tracker mailing list](https://lists.gnu.org/mailman/listinfo/octave-bug-tracker). You'll get updates on all bug activity, and you can jump in when you see something you can help with.
    

+   **Getting hands dirty.**
    
    See [#How can I contribute code to Octave?](#How_can_I_contribute_code_to_Octave?) below. We lack volunteers and **we do need your help**, but because of that, we also lack the time to provide good guidance and mentoring. If there is a specific short-term project you would like to work on, say so, and **just do it**. Then ask for help or advice when you're doing it. It is a lot more important that you do something that you're actually interested on than something we suggested because it only matches your skills.
    

+   **Octave needs more documentation.**
    
    If you like documenting software or have great ideas for Octave, please get in contact with us. Additionally, see [Project - Documentation](Project_-_Documentation.html "Project - Documentation") for details.
    

+   **Need inspiration?**
    
    Look at our [projects](Projects.html "Projects"), [short projects](Short_projects.html "Short projects"), and [Summer of Code - Getting Started](Summer_of_Code_-_Getting_Started.html "Summer of Code - Getting Started") if you need specific inspiration for coding tasks that we would like to get done.
    

## How can I contribute code to Octave?

In general you can contribute code to Octave in form of **patches (changesets)**. Those have to be uploaded to the [bug](https://savannah.gnu.org/bugs/?group=octave) or [patch](https://savannah.gnu.org/patch/?group=octave) tracker.

+   In [Building](Building.html "Building") is described, how you get and build the latest Octave source code on your system.
+   In [Mercurial](Mercurial.html "Mercurial") we describe, how you create a patch (changeset) from your modifications.
+   Our [Contribution guidelines](Contribution_guidelines.html "Contribution guidelines") should be read and followed as well, to ensure acceptance of your contribution.

## How can I find which source file implements a given command?

Use Octave's [`which`](https://www.octave.org/doc/interpreter/XREFwhich.html) command.

### m-file functions

```octave
>> which help
```

```
 'help' is a function from the file /some/path/m/help/help.m
```

In this case, the desired function is a m-file, one can simply edit it inside the GUI, just type:

```octave
>> edit help
```

### built-in functions

Some functions are already compiled (a.k.a. *built-in functions*), for example:

```octave
>> which addpath
```

```
 'addpath' is a built-in function from the file libinterp/corefcn/load-path.cc
```

This function is to be found in Octave's source code, in this case at [libinterp/corefcn/load-path.cc](https://hg.savannah.gnu.org/hgweb/octave/file/b33d4fbce33e/libinterp/corefcn/load-path.cc#l2355). Open the respective file with an editor of your choice and search for the pattern " `(addpath,`".

[Categories](Special%253ACategories.html "Special:Categories"):

+   [Development](. "Category:Development")
+   [FAQ](Category%253AFAQ.html "Category:FAQ")