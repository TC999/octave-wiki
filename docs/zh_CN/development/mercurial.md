# Mercurial

[Mercurial](https://www.mercurial-scm.org)（有时称为 `hg`）是用于 Octave 开发的源代码管理系统。

任何人都可以**运行、复制、分发、研究、修改和改进**[\[1\]](#cite_note-1) 位于主仓库 [https://www.octave.org/hg/octave](https://www.octave.org/hg/octave) 中的 Octave 源代码。使用 Mercurial 获取 Octave 的最新版本：

```bash
hg clone https://www.octave.org/hg/octave
```

## 目录

+   [1 工作流程参考](#工作流程参考)
+   [2 教程](#教程)
+   [3 创建并提交补丁（变更集）](#创建并提交补丁（变更集）)
+   [4 给 SoC 学生的 Mercurial 技巧](#给-soc-学生的-mercurial-技巧)
    +   [4.1 使用书签](#使用书签)
    +   [4.2 与主仓库保持同步](#与主仓库保持同步)
    +   [4.3 准备代码审查](#准备代码审查)
+   [5 Mercurial 配置示例](#mercurial-配置示例)
+   [6 使用 TortoiseHg 的技巧](#使用-tortoisehg-的技巧)
    +   [6.1 启用 "mq" 扩展](#启用-"mq"-扩展)
    +   [6.2 将变更重新设置到当前最新提交](#将变更重新设置到当前最新提交)
+   [7 脚注](#脚注)
+   [8 外部链接](#外部链接)

## 工作流程参考

本节提供几个常用的 Mercurial 命令和操作序列。

+   初始克隆：
    
    ```bash
    hg clone https://hg.savannah.gnu.org/hgweb/octave/
    ```
    

然后您可以运行 bootstrap、configure、make，可能还需要运行 make check 和 make install。

+   要定期更新，可以执行：
    
    ```bash
    hg pull -u
    ```
    
    或者
    
    ```bash
    hg pull && hg update
    ```
    

+   要创建*本地克隆*，可以从您计算机上的主 Octave 仓库克隆到另一个目录，像这样：
    
    ```bash
    hg clone octave myfeature
    ```
    
    这会将 Octave 目录克隆到一个名为 "myfeature" 的新目录中。您需要先 cd 到正确的目录。然后您可以 cd 到新目录并运行 bootstrap、configure、make。为了防止重新下载 gnulib，如果需要，您可以使用 configure 选项 `--with-gnulib-prefix=DIR` 来指定第一个 Octave 目录的 gnulib 路径。

x 最佳实践是为您处理的每个功能或错误修复创建一个新的克隆目录，或者使用 [Mercurial Queues](https://hgbook.red-bean.com/read/managing-change-with-mercurial-queues.html)。这两种方法都使从错误中恢复变得更容易。

+   要在稳定分支上工作而不是默认分支，请创建一个名为 "stable" 的本地克隆，然后 cd 进入其中并执行：
    
    ```bash
    hg update stable
    ```
    

+   要传阅进行中的错误修复：首先 cd 到相关的本地克隆，然后编辑相关文件，验证它能构建，然后执行：
    
    ```bash
    hg diff > /tmp/my.wip.patch
    ```
    
    然后将该文件上传到错误跟踪器的讨论中。如果补丁足够小，您也可以使用 `+verbatim+`...`-verbatim-` 标签将其复制粘贴到错误讨论中。接受错误讨论中的反馈并迭代您的补丁。

+   当您准备好提交修复时，首先从 Savannah 拉取并更新您的主 Octave 目录，然后拉取并更新您的本地克隆。然后再次构建以确保没有破坏任何东西。然后执行：
    
    ```bash
    hg commit
    ```
    
    并为您的更改输入摘要和说明。退出编辑器，在提示时保存。再次构建，以便您的构建获得最新的 hg id。键入：
    
    ```bash
    hg export > /tmp/my.patch
    ```
    
    并将该文件上传到错误讨论中。等待维护者以您的名义应用它，然后如果您在您的主 Octave 目录中执行：
    
    ```bash
    hg in
    ```
    
    它会显示为传入的更改。执行 pull 和 up 来获取它，然后在您各个克隆目录中执行 pull 和 up 以在那里获取它。

+   要将更改从稳定分支合并到默认分支：
    
    ```bash
    hg merge stable
    ```
    
    最好仅在已经位于默认分支上的本地克隆中运行此命令。这样，位于稳定分支上的本地克隆就不必在合并前切换分支。

+   要推送到仓库，如果您对该仓库有推送权限，您可以使用以下命令查看将要推送的内容：
    
    ```bash
    hg out
    ```
    
    然后如果您满意，您可以执行：
    
    ```bash
    hg push
    ```
    

## 教程

Joel Spolsky 的 Mercurial 教程：[https://hginit.github.io/01.html](https://hginit.github.io/01.html)

[![信息图标](../../assets/info/26px-Info_icon.svg.png)](File%253AInfo_icon.svg.html)

[TortoiseHg](https://tortoisehg.bitbucket.io/) 是 Mercurial 的图形用户界面，特别推荐给初次使用源代码管理系统的用户。支持 Linux、macOS 和 MS Windows。

## 创建并提交补丁（变更集）

如果您想分享您的修改，例如修复一个讨厌的**错误 #42424**，您不能直接将您的更改提交到 Octave 的主仓库。您必须生成一个**补丁（或变更集）**，以便其他 Octave 开发者可以将其包含到 Octave 的源代码中。

1.  获取 Octave（或某个 Octave 包）的最新版本
    
    ```bash
    hg clone https://www.octave.org/hg/octave
    ```
    
    或者如果已经克隆过
    
    ```bash
    hg pull && hg update
    ```
    
2.  进行您的更改（修复错误 #42424）并保存。**确保您的更改不会引入新的错误！** 因此，建议在继续之前[构建 Octave](Building.html "Building")并[运行 Octave 的测试套件](Tests.html "Tests")。  
    
    [![警告图标](../../assets/warning/26px-Warning_icon.svg.png)](File%253AWarning_icon.svg.html)
    
    请遵循 C/C++ 或 Octave 代码文件的[贡献指南](Contribution_guidelines.html "Contribution guidelines")！
    
3.  提交您的更改
    
    ```bash
    hg commit
    ```
    
    Mercurial 将打开您的默认编辑器[\[2\]](#cite_note-2)并要求您输入提交信息。请遵循[提交信息指南](Commit_message_guidelines.html "Commit message guidelines")，例如：
    
    ```text
    help.m: 优先显示相关主题（错误 #42424）
    
    * scripts/help/help.m: 描述您所做的更改以优先显示相关主题。
      最大行宽为 80 个字符。
    ```
    
4.  导出更改
    
    ```bash
    hg export -r tip -o bug42424.patch
    ```
    
    最终用于提交的补丁将如下所示
    
    **文件:** bug42424.patch
    
    ```diff
    # HG changeset patch
    # User Awesome Hacker <awesome@hacker.com>
    # Date 1591780091 -32400
    #      Wed Jun 10 18:08:11 2020 +0100
    # Node ID 68c698c4f2fd98bf2d48234bd1da99e91763114f
    # Parent  f5c9bb5955e7c9fddef5c3c3f115201e11b43b79
    
    help.m: 优先显示相关主题（错误 #42424）
    
    * scripts/help/help.m: 描述您所做的更改以优先显示相关主题。
      最大行宽为 80 个字符。
    
    diff -r f5c9bb5955e7 -r 68c698c4f2fd scripts/help/help.m
    --- a/scripts/help/help.m	Tue Jun 09 14:11:13 2020 -0700
    +++ b/scripts/help/help.m	Wed Jun 10 18:08:11 2020 +0900
    @@ -99,7 +99,7 @@ function retval = help (name)
         endif
     
         ## 获取帮助文本
    -    [text, format] = get_help_text (name);
    +    [text, format] = get_better_help_text (name);
     
         ## 根据帮助文本格式采取相应操作
         switch (lower (format))
    ```
    
5.  将 bug42424.patch 上传到[错误](https://savannah.gnu.org/bugs/?group=octave)或[补丁](https://savannah.gnu.org/patch/?group=octave)跟踪器。如果您的补丁文件大于上传限制，您可以在上传前压缩它。请使用自由格式！

## 给 SoC 学生的 Mercurial 技巧

本节旨在为从事新 Octave 功能开发的[夏季编程](Summer_of_Code.html "Summer of Code")学生提供一些技巧。

学生应随着工作进展在公共仓库中发布他们的成果。在本节中，我们以 `public.server.org/octave` 为例。

### 使用书签

[书签](https://www.mercurial-scm.org/wiki/Bookmarks)对于标识一系列提交很有用。它们是[命名分支](https://www.mercurial-scm.org/wiki/NamedBranches)的一种"轻量级"解决方案，例如，命名分支不会自动更新。要创建书签 `my-gsoc`，请使用：

```bash
hg clone https://www.octave.org/hg/octave
hg bookmark my-gsoc
```

要使书签在公共仓库中可见，请使用：

```bash
hg push --bookmark ssh://student@public.server.org/octave
```

### 与主仓库保持同步

在学生开发进行的同时，Octave 的开发并未停滞。Octave 的主仓库也在更新。可以使用以下命令将这些更新获取到学生克隆的主仓库中：

```bash
hg pull https://www.octave.org/hg/octave   # 获取最新的远程 "tip"
hg update -r my-gsoc                       # 激活书签 "my-gsoc"
hg merge tip                               # 将 "tip" 合并到 "my-gsoc" 中
hg commit -m "maint: merge default to my-gsoc"
hg push ssh://student@public.server.org/octave
```

### 准备代码审查

在中期或最终审查时（或导师要求时），学生应准备他们的代码以供审查，并可能包含到主仓库中。

1.  创建完整的更改日志
    
    ```bash
    hg log --template=changelog --no-merges --user student-name
    ```
    
    如果学生遵循了[提交信息指南](Commit_message_guidelines.html "Commit message guidelines")，那么输出将是下一步提交信息的一个良好起点。可能需要进行一些手动后处理：
    +   每个被修改的文件应仅出现一次。
    +   不要提及已撤销的提交。
2.  准备一个包含所有应提交审查的代码的单一补丁（变更集）
    
    ```bash
    hg pull https://www.octave.org/hg/octave   # 获取远程 "tip" 和 "@"
    hg update -r @                             # 激活书签 "@"
    hg merge my-gsoc                           # 将 "my-gsoc" 合并到 "@"
    hg commit
    hg export -r tip -o mid-term-review.patch
    ```
    
    文件 mid-term-review.patch 可以上传到[补丁跟踪器](https://savannah.gnu.org/patch/?group=octave)。  
    最后，`"tip"` 和 Octave 开发者用来指向最新远程变更集的书签 `"@"` 之间存在细微差别。通常两者都指代完全相同的变更集，可以互换使用。

## Mercurial 配置示例

将以下文件放在您的主目录中，例如 /home/username/.hgrc。

**文件:** .hgrc

```ini
[ui]
username = 您的名字 <your@email>

[extensions]
color =
histedit =
pager =
rebase =
strip =

[pager]
pager = LESS='FSRX' less
attend = help, annotate, cat, diff, export, glog, log, outgoing, incoming

[diff]
showfunc = True

[color]
mode = terminfo

## 自定义颜色
color.gray = 244
color.orange = 202
color.lightyellow = 191
color.darkorange = 220
color.brightyellow = 226

status.modified = magenta bold
status.added = green bold
status.removed = red bold
status.deleted = cyan bold
status.unknown = gray bold
status.ignored = gray bold

## 每个标签的颜色
log.branch = cyan
log.summary = lightyellow
log.description = lightyellow
log.bookmark = green
log.tag = darkorange
log.graph = blue

## 每个阶段（phase）的颜色
changeset.secret = blue bold
changeset.draft  = red bold
changeset.public = orange

desc.here = bold blue_background

[bookmarks]
track.current = True

[alias]
glog = log --graph
top  = log --graph -l
```

## 使用 TortoiseHg 的技巧

TortoiseHg 是用于 Mercurial 仓库的多平台图形用户界面。它允许使用上下文菜单和工具栏按钮执行许多 hg 操作。这可能使习惯使用 Mercurial 变得更容易。

### 启用 "mq" 扩展

"mq" 扩展允许在（本地）变更集提交后对其进行修改。它还允许将变更重新设置到新的父节点或完全移除变更。"mq" 扩展*不*允许修改已推送的变更。

要在 TortoiseSVN 中激活 "mq" 扩展，请打开设置，在全局设置选项卡上选择"扩展"，并激活"mq"旁边的复选框。

该扩展最有用的功能可能是更新现有的变更集。为此，在相应变更集的右键菜单中选择"修改历史" -> "导入到 MQ"。更新一些本地文件或更改提交信息后，点击"QRefresh"按钮。通过在相应变更集的右键菜单中选择"修改历史" -> "完成补丁"来完成补丁。

### 将变更重新设置到当前最新提交

有时上游仓库的更改可能需要将变更集重新设置到新的父节点。有几种方法可以实现这一点。这里描述的方法可能不是最优雅的。欢迎任何编辑进行补充。

移除并提交：

1.  从上游仓库拉取更改。
2.  在更新到新最新提交之前，通过右键菜单选择"修改历史" -> "移除..."来移除本地更改。在对话框中，选择"在移除期间不修改工作副本 (-k/--keep)"。
3.  更新到新的最新提交（可能需要逐步进行）。
4.  在"全新的"变更集中提交本地更改。这样做的缺点是可能会丢失任何提交信息。但它通常有效，即使其他方法失败。

取消应用并重新应用：

1.  从上游仓库拉取更改。
2.  在更新到新最新提交之前，通过在右键菜单中选择"修改历史" -> "导入到 MQ"将本地变更集导入到 mq。
3.  您可能希望用本地更改刷新变更集。
4.  通过右键菜单中选择"修改历史" -> "取消应用补丁"来取消应用补丁。如果本地仓库中有其他未提交的更改，您可能希望事先在右键菜单的"修改历史" -> "MQ 选项"对话框中选择"容忍无冲突的本地更改 (--keep-changes)"。
5.  更新到新的最新提交。
6.  在修订版本图上选择之前未应用的补丁，并使用右键菜单中的"重新应用补丁"选项重新应用它。这样做的好处是提交信息将被保留。但如果上游仓库的更改导致补丁不兼容，重新应用补丁可能会失败。

重新设置：

1.  从上游仓库拉取更改。
2.  选择您想要重新设置的本地变更集。
3.  按住 Ctrl 键并选择应作为本地变更集新父节点的变更集（可能是新的最新提交）。
4.  右键单击新父节点的变更集并选择"重新设置..."。
5.  默认设置通常是可以的。此过程的优点是提交信息将被保留，并且通常会自动解决冲突。但如果存在任何未提交的本地更改，则无效。

## 脚注

1.  [↑](#cite_ref-1) [https://www.gnu.org/philosophy/free-sw.en.html](https://www.gnu.org/philosophy/free-sw.en.html)
2.  [↑](#cite_ref-2) 要设置您的默认 Mercurial 编辑器，请阅读 [https://www.mercurial-scm.org/wiki/editor](https://www.mercurial-scm.org/wiki/editor)。

## 外部链接

+   [https://hginit.com/](https://hginit.com/) -- Mercurial 教程
+   [https://www.mercurial-scm.org/wiki/Tutorial](https://www.mercurial-scm.org/wiki/Tutorial) -- Mercurial 教程
+   [https://www.mercurial-scm.org/wiki/QuickStart](https://www.mercurial-scm.org/wiki/QuickStart) -- Mercurial 快速入门
+   [https://tortoisehg.bitbucket.io/](https://tortoisehg.bitbucket.io/) -- TortoiseHg 是 Mercurial 的图形界面（Linux、macOS、MS Windows）

[分类](Special%253ACategories.html "Special:Categories")：

+   [开发](Category%253ADevelopment.html "Category:Development")