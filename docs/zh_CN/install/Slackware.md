# Slackware

## 在 Slackware 上构建 Octave

GNU Octave 包含在 [SlackBuilds 仓库](http://www.slackbuilds.org)中，该仓库包含多个软件包的构建脚本。[SlackBuilds 使用指南](http://slackbuilds.org/howto/)页面详细描述了如何使用这些脚本。

[Octave 的构建脚本](https://slackbuilds.org/repository/15.0/academic/octave/)有一些依赖项，这些依赖项不会自动解析，具体列在 Octave 构建脚本的 [README 文件](https://slackbuilds.org/slackbuilds/15.0/academic/octave/README)中。这些依赖项包括：

+   [BLAS](https://slackbuilds.org/repository/15.0/libraries/blas/)
+   [LAPACK](https://slackbuilds.org/repository/15.0/libraries/lapack/)

请注意，还有一些可选的依赖项，例如 [GraphicsMagick](https://slackbuilds.org/repository/15.0/graphics/GraphicsMagick/)。另一个更通用的依赖项列表可以在 [构建](Building.html "构建") wiki 页面中找到。

[分类](Special%253ACategories.html "特殊:分类")：

+   [构建](Category%253ABuilding.html "分类:构建")
+   [安装](Category%253AInstallation.html "分类:安装")
+   [GNU/Linux](Category%253AGNU/Linux.html "分类:GNU/Linux")