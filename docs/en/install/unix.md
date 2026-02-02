# FreeBSD

*Are you looking for [GNU/Linux](Linux.md "Octave for GNU/Linux") systems?*

For other Unix systems you may have to [build Octave from source](Building.html "Building").

## Contents

+   [1 FreeBSD](#FreeBSD)
+   [2 OpenBSD](#OpenBSD)
+   [3 Android](#Android)
+   [4 References](#References)
+   [5 See also](#See_also)

## FreeBSD

The easiest way to obtain GNU Octave is to install the precompiled package as root user:

```bash
  pkg install octave
```

Another possibility is to build Octave from source via Ports[\[1\]](#cite_note-1). Make sure you have your Port tree updated. Check [FreeBSD documentation](https://www.freebsd.org/doc/en_US.ISO8859-1/books/handbook/ports.html) about how to do that. Then, as root, type:

```bash
  cd /usr/ports/math/octave 
  make install clean 
```

Some [Octave Forge](Octave_Forge.html "Octave Forge") packages can be installed in the same way:

```bash
  pkg install octave-forge
```

or via Ports[\[2\]](#cite_note-2).

## OpenBSD

The easiest way to obtain GNU Octave is to install the precompiled package as root user:

```bash
  pkg_add octave
```

Another possibility is to build Octave from source via Ports[\[3\]](#cite_note-3).

## Android

*Main article: [Octave for Android](Octave_for_Android.html "Octave for Android")*

## References

1.  [↑](#cite_ref-1) [https://svnweb.freebsd.org/ports/head/math/octave](https://svnweb.freebsd.org/ports/head/math/octave)
2.  [↑](#cite_ref-2) [https://svnweb.freebsd.org/ports/head/math/octave-forge](https://svnweb.freebsd.org/ports/head/math/octave-forge)
3.  [↑](#cite_ref-3) [http://openports.se/math/octave](http://openports.se/math/octave)

## See also

+   [Octave for GNU/Linux](Octave_for_GNU/Linux.html "Octave for GNU/Linux")

[Category](Special%253ACategories.html "Special:Categories"):

+   [Installation](Category%253AInstallation.html "Category:Installation")