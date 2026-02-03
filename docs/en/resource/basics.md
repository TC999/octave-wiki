# Basics

For the meaning of operators, see the [GNU Octave manual](https://octave.org/doc/interpreter/Operator-Index.html).

## Contents

+   [1 The very basics](#The_very_basics)
+   [2 Vectors and matrices](#Vectors_and_matrices)
+   [3 Graphics](#Graphics)
+   [4 Scripts and functions](#Scripts_and_functions)
+   [5 Programming elements](#Programming_elements)
+   [6 See also](#See_also)

### The very basics

`+` , `-` , `*` , `/` , `^` , [`pi`](https://www.octave.org/doc/interpreter/XREFpi.html) , [`I`](https://www.octave.org/doc/interpreter/XREFI.html) , [`e`](https://www.octave.org/doc/interpreter/XREFe.html) , [`inf`](https://www.octave.org/doc/interpreter/XREFinf.html) , [`eps`](https://www.octave.org/doc/interpreter/XREFeps.html) , [`sin`](https://www.octave.org/doc/interpreter/XREFsin.html) , [`cos`](https://www.octave.org/doc/interpreter/XREFcos.html) , [`tan`](https://www.octave.org/doc/interpreter/XREFtan.html) , [`exp`](https://www.octave.org/doc/interpreter/XREFexp.html) , [`log`](https://www.octave.org/doc/interpreter/XREFlog.html) , [`log10`](https://www.octave.org/doc/interpreter/XREFlog10.html) , [`abs`](https://www.octave.org/doc/interpreter/XREFabs.html) , [`sqrt`](https://www.octave.org/doc/interpreter/XREFsqrt.html) , [`sign`](https://www.octave.org/doc/interpreter/XREFsign.html) , [`round`](https://www.octave.org/doc/interpreter/XREFround.html) , [`ceil`](https://www.octave.org/doc/interpreter/XREFceil.html) , [`floor`](https://www.octave.org/doc/interpreter/XREFfloor.html) , [`fix`](https://www.octave.org/doc/interpreter/XREFfix.html) , `=` , `,` , `;` , [`who`](https://www.octave.org/doc/interpreter/XREFwho.html) , [`clear`](https://www.octave.org/doc/interpreter/XREFclear.html) , [`help`](https://www.octave.org/doc/interpreter/XREFhelp.html) , [`lookfor`](https://www.octave.org/doc/interpreter/XREFlookfor.html)

```matlab
x = pi, y = floor (sin (x)), z = log (exp (2013)), z / inf
```

### Vectors and matrices

`:` , `.*` , `./` , `.^` , `'` , `.'` , `\` , [`length`](https://www.octave.org/doc/interpreter/XREFlength.html) , [`numel`](https://www.octave.org/doc/interpreter/XREFnumel.html) , [`size`](https://www.octave.org/doc/interpreter/XREFsize.html) , [`zeros`](https://www.octave.org/doc/interpreter/XREFzeros.html) , [`ones`](https://www.octave.org/doc/interpreter/XREFones.html) , [`eye`](https://www.octave.org/doc/interpreter/XREFeye.html) , [`diag`](https://www.octave.org/doc/interpreter/XREFdiag.html) , [`rand`](https://www.octave.org/doc/interpreter/XREFrand.html) , [`det`](https://www.octave.org/doc/interpreter/XREFdet.html) , [`trace`](https://www.octave.org/doc/interpreter/XREFtrace.html) , [`inv`](https://www.octave.org/doc/interpreter/XREFinv.html) , [`lu`](https://www.octave.org/doc/interpreter/XREFlu.html) , [`eig`](https://www.octave.org/doc/interpreter/XREFeig.html) , [`cond`](https://www.octave.org/doc/interpreter/XREFcond.html) , [`expm`](https://www.octave.org/doc/interpreter/XREFexpm.html)

```matlab
x = 1:5, x(:), x(2:4), A = [11 12; 21, 22], A(1,1:end)
```

### Graphics

[`plot`](https://www.octave.org/doc/interpreter/XREFplot.html) , [`semilogx`](https://www.octave.org/doc/interpreter/XREFsemilogx.html) , [`semilogy`](https://www.octave.org/doc/interpreter/XREFsemilogy.html) , [`loglog`](https://www.octave.org/doc/interpreter/XREFloglog.html) , [`contour`](https://www.octave.org/doc/interpreter/XREFcontour.html) , [`quiver`](https://www.octave.org/doc/interpreter/XREFquiver.html) , [`surf`](https://www.octave.org/doc/interpreter/XREFsurf.html) , [`mesh`](https://www.octave.org/doc/interpreter/XREFmesh.html) , [`meshgrid`](https://www.octave.org/doc/interpreter/XREFmeshgrid.html) , [`xlabel`](https://www.octave.org/doc/interpreter/XREFxlabel.html) , [`ylabel`](https://www.octave.org/doc/interpreter/XREFylabel.html) , [`zlabel`](https://www.octave.org/doc/interpreter/XREFzlabel.html) , [`title`](https://www.octave.org/doc/interpreter/XREFtitle.html) , [`grid`](https://www.octave.org/doc/interpreter/XREFgrid.html) , [`axis`](https://www.octave.org/doc/interpreter/XREFaxis.html) , [`hold`](https://www.octave.org/doc/interpreter/XREFhold.html) , [`subplot`](https://www.octave.org/doc/interpreter/XREFsubplot.html) , [`figure`](https://www.octave.org/doc/interpreter/XREFfigure.html) , [`print`](https://www.octave.org/doc/interpreter/XREFprint.html)

```matlab
t = 0:0.01*pi:21*pi; x = sin (t).*(exp (cos (t)) - 2*cos (4*t) + sin (t/12).^5); y = cos (t).*(exp (cos (t)) - 2*cos (4*t) + sin (t/12).^5); plot(x, y)
```

### Scripts and functions

`@` , `function` , `return` , [`nargin`](https://www.octave.org/doc/interpreter/XREFnargin.html) , [`nargout`](https://www.octave.org/doc/interpreter/XREFnargout.html) , [`varargin`](https://www.octave.org/doc/interpreter/XREFvarargin.html) , [`varargout`](https://www.octave.org/doc/interpreter/XREFvarargout.html) , [`feval`](https://www.octave.org/doc/interpreter/XREFfeval.html) , [`eval`](https://www.octave.org/doc/interpreter/XREFeval.html)

```matlab
f = @(x) x.^2, f(1:10)

function v = cossum (x, n) v = cumsum (repmat (cos (x), 1, n));
```

### Programming elements

`==` , `>` , `<` , `>=` , `<=` , `!=` , `|` , `||` , `&` , `&&` , `!` , `~` , `if` , `else` , `elseif` , `for` , `while` , `end` , `break` , `continue` , `pause`

```matlab
for i = 1:5 if (i < 3) disp (i) else disp (i^2) endif endfor
```

## See also

+   [GNU OCTAVE CARD by Fotios Kasolis](https://lists.gnu.org/archive/html/help-octave/2013-01/pdfoEurT8AZ7Z.pdf)

[Category](Special%253ACategories.html "Special:Categories"):

+   [Tutorials](Category%253ATutorials.html "Category:Tutorials")