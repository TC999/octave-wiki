# Enable large arrays: Build octave such that it can use arrays larger than 2Gb.

![Info icon.svg](../../assets/info/26px-Info_icon.svg.png)

The following only applies to systems that have 64-bit pointers (64bit architecture).

Starting with Octave 4.4.0, 64-bit indexing is the default for targets with 64-bit pointers. You can override that default by specifying `--disable-64` when configuring Octave.

However, if the configure script determines that the BLAS library uses 32-bit integers, then operations using the following libraries are limited to arrays with dimensions that are smaller than 2^31 elements:

+   BLAS
+   LAPACK
+   QRUPDATE
+   SuiteSparse
+   ARPACK

Additionally, the following libraries use "int" internally, so maximum problem sizes are always limited:

+   glpk
+   Qhull

Useful information and projects are listed below in the [See also](#See_also) section.

To determine the integer size of the BLAS library used by Octave, the following code can be executed:

```matlab
clear all;
N = 2^31;
## The following line requires about 8 GB of RAM!
a = b = ones (N, 1, "single");
c = a' * b
```

If the BLAS library uses **32-bit integers**, an error will be thrown:

```bash
error: integer dimension or index out of range for Fortran INTEGER type
```

Otherwise, if the BLAS library uses **64-bit integers**, the result is:

```matlab
c = 2^31 = 2147483648
```

Note that the test case above usually requires twice the memory, if `a` and `b` are not assigned by `a = b = ...`. Note further, that the data type "single" has a precision of about 23 binary bits. In this particular example no rounding errors occur.

### Versions prior to Octave 4.4

On previous versions of Octave, the default is that the size of a single Octave array cannot have more than approximately 2^31 elements, even on systems that use 64-bit pointers. This is because array indices were limited to 32-bit signed integers by default. Trying to create one will produce the following error:

```bash
>> a = zeros (1024*1024*1024*3, 1, 'int8');
error: out of memory or dimension too large for Octave's index type
```

You will obtain this error even if your system has enough RAM to create this array (3 GB in the above case).

To use arrays with more than (approximately) 2 31 {\\displaystyle 2^{31}} ![{\displaystyle 2^{31}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/65fb13d646608c3de85493707c2dfdfb06345198) elements, Octave has to be configured with the option `--enable-64`. This option is experimental and you are (as always) encouraged to submit bug reports if you find a problem. With this option, Octave will use internally 64-bit integers for array dimensions and indexing. However, **all numerical libraries** used by Octave will need to use also 64-bit integers for array dimensions and indexing, and in most cases they need to be compiled from source.

### See also

+   [GNU Octave manual](https://octave.org/doc/interpreter/Compiling-Octave-with-64_002dbit-Indexing.html) -- Details on how to compile some of Octave's library dependencies for 64-bit indices.
+   [MXE](MXE.html "MXE") (M Cross Environment) which takes care to compile Octave's library dependencies for 64-bit indices.

Two more lightweight solutions compared to [MXE](MXE.html "MXE") to compile Octave's library dependencies for 64-bit indices.

+   [https://gitlab.com/mtmiller/octave-blas64-builder](https://gitlab.com/mtmiller/octave-blas64-builder)
+   [https://github.com/octave-de/GNU-Octave-enable-64](https://github.com/octave-de/GNU-Octave-enable-64)

[Category](Special%253ACategories.html "Special:Categories"):

+   [Building](Category%253ABuilding.html "Category:Building")