# 软件包

[![](../../assets/100px-Octave-flower.svg.png)](Category%253AOctave_Forge.html "Category:Octave_Forge")

[Octave Forge](Category%253AOctave_Forge.html "Category:Octave Forge") 徽标。

*这是适用于 GNU Octave 的软件包和代码列表。*

Octave [软件包](https://octave.org/doc/latest/Packages.html) 通过特定的有用功能扩展了 GNU Octave 的功能，任何人都可以开发和分发。目前有两套 Octave 软件包集合：

+   [https://packages.octave.org](https://packages.octave.org)
+   [Octave Forge](Category%253AOctave_Forge.html "Category:Octave Forge") （旧版）

## 目录

+   [1 关于 Octave 软件包](#关于_Octave_软件包)
+   [2 需要自定义安装的自由及开源代码](#需要自定义安装的自由及开源代码)
+   [3 商业软件](#商业软件)
+   [4 另请参阅](#另请参阅)

## 关于 Octave 软件包

Octave 软件包的格式和要求在 [GNU Octave 手册](https://octave.org/doc/latest/Creating-Packages.html) 中有详细说明。还有一个 [示例软件包](https://github.com/gnu-octave/pkg-example)。

Octave 软件包可以使用 [`pkg`](https://www.octave.org/doc/interpreter/XREFpkg.html) 工具进行安装。以下两个示例演示了如何安装 [示例软件包](https://github.com/gnu-octave/pkg-example)：（1）在下载发行版压缩包后安装，以及（2）直接从 URL 安装。

1.  `pkg install pkg-example-1.0.0.tar.gz`
2.  `pkg install [https://github.com/gnu-octave/pkg-example/archive/1.0.0.tar.gz](https://github.com/gnu-octave/pkg-example/archive/1.0.0.tar.gz)`

如果您创建了自己的软件包，可以将其添加到 [Octave 软件包](https://github.com/gnu-octave/packages/blob/master/CONTRIBUTING.md) 索引中。

列在 [Octave 软件包](https://gnu-octave.github.io/packages/) 索引中的软件包可以使用 `-forge` 标志安装，例如：

+   `pkg install -forge image`

Octave Forge 索引是一个旧版项目，不再接受新的软件包。现有的软件包通过 [Octave 软件包](https://gnu-octave.github.io/packages/) 索引进行引用。

## 需要自定义安装的自由及开源代码

这些代码需要按照各自网站上的说明进行安装。

| 名称 | 描述 | 链接 |
| --- | --- | --- |
| GeoPDEs | 用于等几何分析研究和教学的开源自由软件包，用 Octave 编写并完全兼容 Matlab。GeoPDEs 软件包为实施和测试求解偏微分方程的新等几何方法提供了一个通用且灵活的框架。 | [https://github.com/rafavzqz/geopdes/](https://github.com/rafavzqz/geopdes/) [https://rafavzqz.github.io/geopdes/](https://rafavzqz.github.io/geopdes/) |
| go-redis | Redis 客户端 | [https://github.com/markuman/go-redis](https://github.com/markuman/go-redis) |
| LIBSVM, LIBLINEAR | 用于支持向量机/机器学习分类、回归和分布估计问题的库。使用 C++ 编写，并提供 Octave 接口。 | [https://www.csie.ntu.edu.tw/~cjlin/libsvm/](https://www.csie.ntu.edu.tw/~cjlin/libsvm/) [https://www.csie.ntu.edu.tw/~cjlin/liblinear/](https://www.csie.ntu.edu.tw/~cjlin/liblinear/) |
| ltfat | 大型时频分析工具箱®。 | [https://ltfat.github.io/](https://ltfat.github.io/) |
| mex-sqlite3 | 访问 sqlite3 数据库。 | [https://github.com/rmartinjak/mex-sqlite3](https://github.com/rmartinjak/mex-sqlite3) |
| octave-network-toolbox | Octave 中的一套图/网络分析函数。 | [https://aeolianine.github.io/octave-networks-toolbox/](https://aeolianine.github.io/octave-networks-toolbox/) |
| [sci cosim](Sci_cosim.html "Sci cosim") | Scilab 协同仿真软件包。 | [https://github.com/amromanov/sci\_cosim](https://github.com/amromanov/sci_cosim) |
| shogun | Shogun 机器学习工具箱®。 | [https://github.com/shogun-toolbox/shogun](https://github.com/shogun-toolbox/shogun) |
| vlfeat | VLFeat 开源库实现了流行的计算机视觉算法，包括 HOG、SIFT、MSER、k-means、分层 k-means、聚合信息瓶颈、SLIC 超像素和快速移位。 | [https://github.com/vlfeat/vlfeat](https://github.com/vlfeat/vlfeat) [https://www.vlfeat.org/](https://www.vlfeat.org/) |
| epanet-octave | epanet-octave 开源库是一个封装器，包含一些脚本，用于调用 Epanet 工具包。其函数经过调整以提高在 GNU Octave 中的可用性（例如，允许向量作为 Epanet 工具包函数的输入）。仍在开发中。 | [https://forja.cica.es/projects/epanet-octave/](https://forja.cica.es/projects/epanet-octave/) |
| mexopencv | OpenCV 库的 mex 函数集合和开发工具包。 | [https://github.com/kyamagu/mexopencv/](https://github.com/kyamagu/mexopencv/) [https://kyamagu.github.io/mexopencv/](https://kyamagu.github.io/mexopencv/) |
| gpml | 用于机器学习的 Gaussian Processes（高斯过程）。 | [https://gitlab.com/hnickisch/gpml-matlab/](https://gitlab.com/hnickisch/gpml-matlab/) [http://gaussianprocess.org/gpml/code/matlab/doc/](http://gaussianprocess.org/gpml/code/matlab/doc/) |
| ekfukf | 卡尔曼滤波和平滑。 | [https://github.com/kakila/ekfukf/](https://github.com/kakila/ekfukf/) |

## 商业软件

| 名称 | 描述 | 链接 |
| --- | --- | --- |
| FEATool | [FEATool Multiphysics](https://www.featool.com/multiphysics/) 是一款商业专有的有限元法（FEM）工具箱，用于使用有限元法对物理和工程应用进行建模和仿真。FEATool 具有易于使用的图形用户界面（GUI）以及完全集成的 CAD、几何工具、自动网格生成器和求解器。 | [https://www.featool.com/](https://www.featool.com/) |

## See also

+   [Octave manual - Creating packages](https://octave.org/doc/latest/Creating-Packages.html)
+   [Octave package example](https://github.com/gnu-octave/pkg-example)
+   [Category:User Codes](Category%253AUser_Codes.html "Category:User Codes")
<!--
## Subcategories

This category has only the following subcategory.

### O

+   [Octave Forge](Category%253AOctave_Forge.html "Category:Octave Forge")

## Pages in category "Packages"

The following 11 pages are in this category, out of 11 total.

### A

+   [Arduino package](Arduino_package.html "Arduino package")
+   [Audio package](Audio_package.html "Audio package")

### D

+   [Dicom package](Dicom_package.html "Dicom package")

### I

+   [Instrument control package](Instrument_control_package.html "Instrument control package")

### N

+   [NDpar package](NDpar_package.html "NDpar package")

### P

+   [Pythonic](Pythonic.html "Pythonic")

### S

+   [Sci cosim](Sci_cosim.html "Sci cosim")
+   [Sockets package](Sockets_package.html "Sockets package")
+   [Statistics package](Statistics_package.html "Statistics package")

### W

+   [Windows package](Windows_package.html "Windows package")

### Z

+   [Zeromq package](Zeromq_package.html "Zeromq package")

[Category](Special%253ACategories.html "Special:Categories"):

+   [Contents](Category%253AContents.html "Category:Contents")
-->