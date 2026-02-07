# 启用大数组支持：构建能够使用超过 2GB 数组的 Octave

![信息图标](../../assets/info/26px-Info_icon.svg.png)

以下内容仅适用于具有 64 位指针的系统（64 位架构）。

从 Octave 4.4.0 开始，对于具有 64 位指针的目标平台，64 位索引是默认设置。您可以在配置 Octave 时通过指定 `--disable-64` 来覆盖此默认设置。

但是，如果配置脚本确定 BLAS 库使用 32 位整数，那么使用以下库的操作将受限于维度小于 2^31 个元素的数组：

+   BLAS
+   LAPACK
+   QRUPDATE
+   SuiteSparse
+   ARPACK

此外，以下库在内部使用 "int"，因此最大问题规模始终受限：

+   glpk
+   Qhull

有用的信息和项目列在下面的[另请参阅](#另请参阅)部分。

要确定 Octave 使用的 BLAS 库的整数大小，可以执行以下代码：

```matlab
clear all;
N = 2^31;
## 下面这行代码大约需要 8 GB 内存！
a = b = ones (N, 1, "single");
c = a' * b
```

如果 BLAS 库使用**32 位整数**，将抛出错误：

```bash
error: integer dimension or index out of range for Fortran INTEGER type
```

否则，如果 BLAS 库使用**64 位整数**，结果是：

```matlab
c = 2^31 = 2147483648
```

请注意，如果 `a` 和 `b` 不是通过 `a = b = ...` 赋值，上述测试用例通常需要两倍内存。还要注意，"single" 数据类型的精度约为 23 个二进制位。在这个特定示例中不会出现舍入误差。

### Octave 4.4 之前的版本

在早期版本的 Octave 上，默认情况下，即使在使用 64 位指针的系统上，单个 Octave 数组的大小也不能超过大约 2^31 个元素。这是因为默认情况下数组索引被限制为 32 位有符号整数。尝试创建一个更大的数组会产生以下错误：

```bash
>> a = zeros (1024*1024*1024*3, 1, 'int8');
error: out of memory or dimension too large for Octave's index type
```

即使您的系统有足够的 RAM 来创建这个数组（上述情况需要 3 GB），您也会得到此错误。

要使用超过（大约）2^31 个元素的数组，必须使用 `--enable-64` 选项配置 Octave。此选项是实验性的，我们（一如既往地）鼓励您在发现问题时提交错误报告。启用此选项后，Octave 将在内部使用 64 位整数作为数组维度和索引。但是，Octave 使用的**所有数值库**也需要使用 64 位整数作为数组维度和索引，并且在大多数情况下需要从源代码编译。

### 另请参阅

+   [GNU Octave 手册](https://octave.org/doc/interpreter/Compiling-Octave-with-64_002dbit-Indexing.html) -- 关于如何为 64 位索引编译 Octave 部分库依赖项的详细信息。
+   [MXE](mxe.md "MXE")（M 交叉环境），它负责为 64 位索引编译 Octave 的库依赖项。

与 [MXE](mxe.md "MXE") 相比，以下是两个更轻量级的解决方案，用于为 64 位索引编译 Octave 的库依赖项。

+   [https://gitlab.com/mtmiller/octave-blas64-builder](https://gitlab.com/mtmiller/octave-blas64-builder)
+   [https://github.com/octave-de/GNU-Octave-enable-64](https://github.com/octave-de/GNU-Octave-enable-64)

[分类](Special%253ACategories.html "Special:Categories")：

+   [构建](Category%253ABuilding.html "Category:Building")