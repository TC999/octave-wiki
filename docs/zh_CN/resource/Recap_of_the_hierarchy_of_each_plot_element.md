# 绘图元素层级结构回顾

Octave 的目标是尽可能与 MATLAB 兼容，因此其图形功能也与 MATLAB 非常相似。在 Octave 中，首先要选择的是 `graphics_toolkit()`（图形工具包）。截至 2015 年 9 月，Octave 提供了三种可用的绘图后端（图形工具包）：

+   `'qt'`（自 Octave 4.0 起为默认选项）和 `'fltk'` 均基于相同的 OpenGL 渲染引擎。
+   `'gnuplot'` 工具包则使用 [Gnuplot](http://www.gnuplot.info) 软件包。

你可以根据自己的绘图需求尝试所有这些工具包，看看哪一种最适合你的问题。某些图形问题（如字体错误、缺少上下标、线型不正确等）通常只出现在某一个特定的 `graphics_toolkit` 中，因此切换到另一个工具包可能会解决问题。一般来说，基于 OpenGL 的工具包（如 `'qt'` 和 `'fltk'`）比 `'gnuplot'` 快得多；但另一方面，由于 `'gnuplot'` 更加成熟，其输出的图像（无论是位图还是矢量格式）通常更美观，更适合用于出版物。

一幅图形由多种对象组成（如图形窗口、坐标轴、线条、图像等），每个对象都具有一组有用的属性（如下文所述）。这些图形对象按照以下层级结构组织：

+   **root（根对象）**：最底层的对象，主要包含与屏幕描述相关的属性。
+   **figure（图形窗口）**：代表一个图形窗口，是 root 对象的子对象。
+   **axes（坐标轴）**：代表一组 x、y（以及 z）坐标轴，是 figure 对象的子对象。
+   **line（线条）**：代表曲线，是 axes（或 hggroup，见下文）对象的子对象。基本的 `plot(...)` 函数通常使用 line 对象绘制曲线。
+   **patch（面片）**：代表非结构化曲面，是 axes（或 hggroup）对象的子对象。当你需要绘制二维非结构化曲面并精细控制其颜色时，会使用 patch。
+   **image（图像）**：代表一个二维像素阵列，是 axes（或 hggroup）对象的子对象。
+   **surface（曲面）**：代表结构化曲面，是 axes（或 hggroup）对象的子对象。由四边形单元组成的结构化网格通常用 surface 表示。
+   **text（文本）**：代表文本标签，是 axes（或 hggroup）对象的子对象。
+   **hggroup（句柄图形组）**：用于将多个图形对象组合在一起的便利对象。其中一个重要特性是，hggroup 的 `'visible'`（可见性）属性会同时作用于其所有子对象（如 line、text 等）的可见性。

用于创建上述对象的底层函数与其对象同名。这些函数都会返回一个唯一的句柄（类型为 double 的变量），后续可通过 `set(h, PROPERTY, VALUE)` 来修改该对象的属性。

---

通常，我们会使用更高层的函数，例如下面的例子：



这会为你绘制出正弦波的一部分。除了通过 `'b'` 强制指定线条颜色为蓝色外，Octave 使用了所有默认的标准属性（如线宽、字体等）。

在深入探讨层级结构和如何修改属性之前，我们先让情况变得更复杂一些：

```matlab
graphics_toolkit ("gnuplot");
figure (1)
x = 0:0.1:3;
y = sin (x);
p = plot (x, y, "b");
figure (2)
subplot (2, 1, 1);
r = plot (x, y.^2, "og");
subplot (2, 1, 2);
q = plot (x, x.^2, "k");
```

+   此时你的屏幕上会弹出两个窗口：figure 1 和 figure 2。它们的句柄就是整数形式的图形编号（此处为 1 和 2）。
+   figure 2 内部包含两个 axes（坐标轴）对象。若要访问这些坐标轴的属性，可以保存 `subplot` 函数返回的句柄，例如：`hax = subplot (2,1,1)`。
+   实际的曲线 `y = sin(x).^2` 和 `y = x.^2` 是 line 对象，可以通过各自的句柄 `p` 和 `r` 进行调整。

假设你想修改 figure 1 中曲线的线宽：

```matlab
figure (1)
set (p, "linewidth", 3)
```

你也可以通过句柄查询另外两条曲线的颜色：

```matlab
get (q, "color")
get (r, "color")
```

这将分别返回黑色（RGB: [0,0,0]）和绿色（RGB: [0,1,0]）的 RGB 值。

查看 line 对象的所有属性：

```matlab
get (q)
```

其中有些属性是只读的，有些则只能取有限的几个值。你也可以查看哪些属性可以修改及其允许的取值：

```matlab
set (q)
```

然后，你可以将任何不符合你审美的属性修改为其他值（具体可选值请参阅 [官方手册](http://www.gnu.org/software/octave/doc/interpreter/)）：

```matlab
set (p, "marker", "*")
```

在某个 `axes` 对象中添加文本，可使用：

```matlab
text (2, 0.8, "HERE");
```

但注意：这段代码现在会被插入到 figure 1 中，**这可能并不是你预期的结果**。

所有低层和高层绘图函数默认都在“当前图形”（current figure）的“当前坐标轴”（current axes）中绘图。你可以通过以下命令获取它们的句柄：

```matlab
hfig = gcf (); # 返回当前图形的句柄
hax = gca ();  # 返回当前坐标轴的句柄
```

若要在 figure 2 中绘图，你可以先将其设为当前图形，例如：

```matlab
figure (2) # 现在 figure 2 成为当前图形，验证一下：
get (0, "currentfigure")
haxes = get (gcf (), "children") # 获取所有坐标轴句柄
set (gcf (), "currentaxes", haxes(2)) # 将第二个坐标轴设为当前
text (1.0, 0.5, "THIS IS WHAT I WANTED")
```

或者，你也可以显式指定要在哪个父对象中绘制文本：

```matlab
haxes = get (2, "children") # 获取 figure 2 中的所有坐标轴句柄
text (1.0, 0.5, "THIS IS WHAT I WANTED", "parent", haxes (2))
```

[分类](Special%253ACategories.html "Special:Categories"):

+   [教程](Category%253ATutorials.html "Category:Tutorials")