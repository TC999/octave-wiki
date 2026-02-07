# 常见问题解答

## 目录

+   [1 我如何参与 Octave 开发？](#我如何参与-octave-开发？)
+   [2 我如何向 Octave 贡献代码？](#我如何向-octave-贡献代码？)
+   [3 如何找到实现某个命令的源文件？](#如何找到实现某个命令的源文件？)
    +   [3.1 m 文件函数](#m-文件函数)
    +   [3.2 内置函数](#内置函数)

## 我如何参与 Octave 开发？

+   **保持关注，积极交流。**
    
    参与我们的 [Discourse 论坛](https://octave.discourse.group/)。找出您认为 Octave 中不尽如人意的地方，并开始思考如何修复它们。**请不要仅仅发送一条信息列出您的技能并表示愿意提供帮助。**
    
    许多现在为 Octave 做出贡献的人，最初都花了一些时间观察社区的交流，然后才开始深入研究代码。学习 Octave 的一个好方法是理解其他人遇到的问题，因此在 Discourse 上提供帮助不仅有助于整个 Octave 社区，也能让您为成为更好的 Octave 贡献者做好准备。
    

+   **消灭错误。**
    
    准确的错误报告也非常有用。查找并报告[错误](http://bugs.octave.org/)，并尝试诊断它们。最终，您也会知道如何修复它们。如果您想帮助处理错误报告或补丁，请订阅[错误跟踪器邮件列表](https://lists.gnu.org/mailman/listinfo/octave-bug-tracker)。您将获得所有错误活动的更新，并且当您看到可以帮忙的事情时，可以随时加入。
    

+   **动手实践。**
    
    请参阅下面的 [#我如何向 Octave 贡献代码？](#我如何向-octave-贡献代码？)。我们缺乏志愿者，**我们确实需要您的帮助**，但正因为如此，我们也缺乏时间提供良好的指导和辅导。如果您有一个想参与的特定短期项目，请说出来，然后**直接去做**。在做的时候寻求帮助或建议。重要的是您做自己真正感兴趣的事情，而不是仅仅因为符合您的技能而去做我们建议的事情。
    

+   **Octave 需要更多文档。**
    
    如果您喜欢编写软件文档或对 Octave 有很好的想法，请与我们联系。此外，详情请参见[项目 - 文档](Project_-_Documentation.html "Project - Documentation")。
    

+   **需要灵感？**
    
    如果您需要具体的编码任务灵感，可以看看我们的[项目](Projects.html "Projects")、[短期项目](Short_projects.html "Short projects")和[夏季编程 - 入门指南](Summer_of_Code_-_Getting_Started.html "Summer of Code - Getting Started")。
    

## 我如何向 Octave 贡献代码？

通常，您可以以**补丁（变更集）** 的形式向 Octave 贡献代码。这些需要上传到[错误](https://savannah.gnu.org/bugs/?group=octave)或[补丁](https://savannah.gnu.org/patch/?group=octave)跟踪器。

+   [构建](Building.html "Building")部分描述了如何在您的系统上获取和构建最新的 Octave 源代码。
+   在 [Mercurial](Mercurial.html "Mercurial") 中，我们描述了如何从您的修改中创建补丁（变更集）。
+   我们的[贡献指南](Contribution_guidelines.html "Contribution guidelines")也应该阅读并遵守，以确保您的贡献被接受。

## 如何找到实现某个命令的源文件？

使用 Octave 的 [`which`](https://www.octave.org/doc/interpreter/XREFwhich.html) 命令。

### m 文件函数

```matlab
>> which help
```

```bash
'help' 是一个来自 /some/path/m/help/help.m 文件的函数
```

在这种情况下，所需的函数是一个 m 文件，用户可以直接在 GUI 中编辑它，只需键入：

```matlab
>> edit help
```

### 内置函数

有些函数是已经编译好的（也称为*内置函数*），例如：

```matlab
>> which addpath
```

```bash
'addpath' 是一个来自 libinterp/corefcn/load-path.cc 文件的内置函数
```

这个函数可以在 Octave 的源代码中找到，在这个例子中位于 [libinterp/corefcn/load-path.cc](https://hg.savannah.gnu.org/hgweb/octave/file/b33d4fbce33e/libinterp/corefcn/load-path.cc#l2355)。用您选择的编辑器打开相应的文件，并搜索模式 " `(addpath,`"。

[分类](Special%253ACategories.html "Special:Categories"):

+   [开发](. "Category:Development")
+   [FAQ](Category%253AFAQ.html "Category:FAQ")