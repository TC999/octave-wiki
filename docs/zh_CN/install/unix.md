# 其他 Unix 系统

*您是在寻找 [GNU/Linux](Linux.md "Octave for GNU/Linux") 系统吗？*

对于其他 Unix 系统，您可能需要[从源码构建 Octave](Building.html "构建")。

## 目录

+   [1 FreeBSD](#FreeBSD)
+   [2 OpenBSD](#OpenBSD)
+   [3 Android](#Android)
+   [4 参考文献](#参考文献)
+   [5 另见](#另见)

## FreeBSD

获取 GNU Octave 最简单的方法是以 root 用户身份安装预编译包：

```bash
  pkg install octave
```

另一种方法是通过 Ports 从源码构建 Octave
[\[1\]](#cite_note-1)。确保您的 Port 树已更新。有关如何更新，请查看 [FreeBSD 文档](https://www.freebsd.org/doc/en_US.ISO8859-1/books/handbook/ports.html)。然后以 root 用户身份输入：

```bash
  cd /usr/ports/math/octave 
  make install clean 
```

某些 [Octave Forge](Octave_Forge.html "Octave Forge") 包可以通过以下方式安装：

```bash
  pkg install octave-forge
```

或通过 Ports
[\[2\]](#cite_note-2)。

## OpenBSD

获取 GNU Octave 最简单的方法是以 root 用户身份安装预编译包：

```bash
  pkg_add octave
```

另一种方法是通过 Ports 从源码构建 Octave
[\[3\]](#cite_note-3)。

## Android

*主条目: [Octave for Android](Android.md "Octave for Android")*

## 参考文献

1.  [↑](#cite_ref-1) [https://svnweb.freebsd.org/ports/head/math/octave](https://svnweb.freebsd.org/ports/head/math/octave)
2.  [↑](#cite_ref-2) [https://svnweb.freebsd.org/ports/head/math/octave-forge](https://svnweb.freebsd.org/ports/head/math/octave-forge)
3.  [↑](#cite_ref-3) [http://openports.se/math/octave](http://openports.se/math/octave)

## 另见

+   [Octave for GNU/Linux](Octave_for_GNU/Linux.html "Octave for GNU/Linux")

[分类](Special%253ACategories.html "特殊:分类")：

+   [安装](Category%253AInstallation.html "分类:安装")