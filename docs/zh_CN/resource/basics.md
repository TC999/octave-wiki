以下是 Octave 基本用法的中文翻译：

# 基础知识

有关运算符含义的详细说明，请参阅 [GNU Octave 手册](https://octave.org/doc/interpreter/Operator-Index.html)。

## 目录

+   [1 最基础的内容](#The_very_basics)
+   [2 向量与矩阵](#Vectors_and_matrices)
+   [3 图形绘制](#Graphics)
+   [4 脚本与函数](#Scripts_and_functions)
+   [5 编程要素](#Programming_elements)
+   [6 参见](#See_also)

### 最基础的内容

`+`、`-`、`*`、`/`、`^`、[`pi`](https://www.octave.org/doc/interpreter/XREFpi.html)（圆周率）、[`I`](https://www.octave.org/doc/interpreter/XREFI.html)（虚数单位）、[`e`](https://www.octave.org/doc/interpreter/XREFe.html)（自然对数的底）、[`inf`](https://www.octave.org/doc/interpreter/XREFinf.html)（无穷大）、[`eps`](https://www.octave.org/doc/interpreter/XREFeps.html)（机器精度）、[`sin`](https://www.octave.org/doc/interpreter/XREFsin.html)（正弦）、[`cos`](https://www.octave.org/doc/interpreter/XREFcos.html)（余弦）、[`tan`](https://www.octave.org/doc/interpreter/XREFtan.html)（正切）、[`exp`](https://www.octave.org/doc/interpreter/XREFexp.html)（指数函数）、[`log`](https://www.octave.org/doc/interpreter/XREFlog.html)（自然对数）、[`log10`](https://www.octave.org/doc/interpreter/XREFlog10.html)（以10为底的对数）、[`abs`](https://www.octave.org/doc/interpreter/XREFabs.html)（绝对值）、[`sqrt`](https://www.octave.org/doc/interpreter/XREFsqrt.html)（平方根）、[`sign`](https://www.octave.org/doc/interpreter/XREFsign.html)（符号函数）、[`round`](https://www.octave.org/doc/interpreter/XREFround.html)（四舍五入）、[`ceil`](https://www.octave.org/doc/interpreter/XREFceil.html)（向上取整）、[`floor`](https://www.octave.org/doc/interpreter/XREFfloor.html)（向下取整）、[`fix`](https://www.octave.org/doc/interpreter/XREFfix.html)（向零取整）、`=`（赋值）、`,`（列分隔符）、`;`（行分隔符或抑制输出）、[`who`](https://www.octave.org/doc/interpreter/XREFwho.html)（列出当前变量）、[`clear`](https://www.octave.org/doc/interpreter/XREFclear.html)（清除变量）、[`help`](https://www.octave.org/doc/interpreter/XREFhelp.html)（获取帮助）、[`lookfor`](https://www.octave.org/doc/interpreter/XREFlookfor.html)（按关键字搜索帮助）

```matlab
x = pi, y = floor (sin (x)), z = log (exp (2013)), z / inf
```

### 向量与矩阵

`:`（冒号操作符）、`.*`（逐元素乘法）、`./`（逐元素除法）、`.^`（逐元素幂运算）、`'`（共轭转置）、`.'`（非共轭转置）、`\`（左除，用于求解线性方程组）、[`length`](https://www.octave.org/doc/interpreter/XREFlength.html)（向量长度）、[`numel`](https://www.octave.org/doc/interpreter/XREFnumel.html)（元素总数）、[`size`](https://www.octave.org/doc/interpreter/XREFsize.html)（矩阵维度）、[`zeros`](https://www.octave.org/doc/interpreter/XREFzeros.html)（全零矩阵）、[`ones`](https://www.octave.org/doc/interpreter/XREFones.html)（全一矩阵）、[`eye`](https://www.octave.org/doc/interpreter/XREFeye.html)（单位矩阵）、[`diag`](https://www.octave.org/doc/interpreter/XREFdiag.html)（对角矩阵或提取对角线）、[`rand`](https://www.octave.org/doc/interpreter/XREFrand.html)（随机矩阵）、[`det`](https://www.octave.org/doc/interpreter/XREFdet.html)（行列式）、[`trace`](https://www.octave.org/doc/interpreter/XREFtrace.html)（迹）、[`inv`](https://www.octave.org/doc/interpreter/XREFinv.html)（矩阵求逆）、[`lu`](https://www.octave.org/doc/interpreter/XREFlu.html)（LU 分解）、[`eig`](https://www.octave.org/doc/interpreter/XREFeig.html)（特征值与特征向量）、[`cond`](https://www.octave.org/doc/interpreter/XREFcond.html)（条件数）、[`expm`](https://www.octave.org/doc/interpreter/XREFexpm.html)（矩阵指数）

```matlab
x = 1:5, x(:), x(2:4), A = [11 12; 21, 22], A(1,1:end)
```

### 图形绘制

[`plot`](https://www.octave.org/doc/interpreter/XREFplot.html)（二维线图）、[`semilogx`](https://www.octave.org/doc/interpreter/XREFsemilogx.html)（x 轴对数坐标图）、[`semilogy`](https://www.octave.org/doc/interpreter/XREFsemilogy.html)（y 轴对数坐标图）、[`loglog`](https://www.octave.org/doc/interpreter/XREFloglog.html)（双对数坐标图）、[`contour`](https://www.octave.org/doc/interpreter/XREFcontour.html)（等高线图）、[`quiver`](https://www.octave.org/doc/interpreter/XREFquiver.html)（矢量场图）、[`surf`](https://www.octave.org/doc/interpreter/XREFsurf.html)（三维曲面图）、[`mesh`](https://www.octave.org/doc/interpreter/XREFmesh.html)（三维网格图）、[`meshgrid`](https://www.octave.org/doc/interpreter/XREFmeshgrid.html)（生成网格坐标）、[`xlabel`](https://www.octave.org/doc/interpreter/XREFxlabel.html)（x 轴标签）、[`ylabel`](https://www.octave.org/doc/interpreter/XREFylabel.html)（y 轴标签）、[`zlabel`](https://www.octave.org/doc/interpreter/XREFzlabel.html)（z 轴标签）、[`title`](https://www.octave.org/doc/interpreter/XREFtitle.html)（标题）、[`grid`](https://www.octave.org/doc/interpreter/XREFgrid.html)（显示网格）、[`axis`](https://www.octave.org/doc/interpreter/XREFaxis.html)（设置坐标轴范围）、[`hold`](https://www.octave.org/doc/interpreter/XREFhold.html)（保持图形）、[`subplot`](https://www.octave.org/doc/interpreter/XREFsubplot.html)（子图）、[`figure`](https://www.octave.org/doc/interpreter/XREFfigure.html)（新建图形窗口）、[`print`](https://www.octave.org/doc/interpreter/XREFprint.html)（保存或打印图形）

```matlab
t = 0:0.01*pi:21*pi; x = sin (t).*(exp (cos (t)) - 2*cos (4*t) + sin (t/12).^5); y = cos (t).*(exp (cos (t)) - 2*cos (4*t) + sin (t/12).^5); plot(x, y)
```

### 脚本与函数

`@`（匿名函数句柄）、`function`（定义函数）、`return`（返回）、[`nargin`](https://www.octave.org/doc/interpreter/XREFnargin.html)（输入参数个数）、[`nargout`](https://www.octave.org/doc/interpreter/XREFnargout.html)（输出参数个数）、[`varargin`](https://www.octave.org/doc/interpreter/XREFvarargin.html)（可变输入参数）、[`varargout`](https://www.octave.org/doc/interpreter/XREFvarargout.html)（可变输出参数）、[`feval`](https://www.octave.org/doc/interpreter/XREFfeval.html)（函数求值）、[`eval`](https://www.octave.org/doc/interpreter/XREFeval.html)（执行字符串中的命令）

```matlab
f = @(x) x.^2, f(1:10)

function v = cossum (x, n) v = cumsum (repmat (cos (x), 1, n));
```

### 编程要素

`==`（等于）、`>`（大于）、`<`（小于）、`>=`（大于等于）、`<=`（小于等于）、`!=`（不等于）、`|`（逻辑或，逐元素）、`||`（逻辑或，短路）、`&`（逻辑与，逐元素）、`&&`（逻辑与，短路）、`!` 或 `~`（逻辑非）、`if`（条件判断）、`else`（否则）、`elseif`（否则如果）、`for`（循环）、`while`（当型循环）、`end`（结束语句块）、`break`（跳出循环）、`continue`（跳过本次循环）、`pause`（暂停执行）

```matlab
for i = 1:5 if (i < 3) disp (i) else disp (i^2) endif endfor
```

## 参见

+   [Fotios Kasolis 编写的 GNU Octave 速查卡](https://lists.gnu.org/archive/html/help-octave/2013-01/pdfoEurT8AZ7Z.pdf)

[分类](Special%253ACategories.html "Special:Categories"):

+   [教程](Category%253ATutorials.html "Category:Tutorials")