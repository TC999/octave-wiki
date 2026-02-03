# Recap of the hierarchy of each plot element

Octave aims at being compatible with Matlab as much as possible, so the graphics part is very similar too to Matlab. In Octave the first choice to make is the `graphics_toolkit ()`. There are currently (sep. 2015) 3 available plotting back-ends (graphics toolkits):

+   'qt' (the default since Octave 4.0) and 'fltk' both rely on the same OpenGl based rendering engine.
+   'gnuplot' toolkit uses the [Gnuplot](http://www.gnuplot.info) software package.

You might want to try to test all of them for your plotting aims to see which solves your problem. Some graphics problems (wrong font, missing sub/superscript, wrong line style, etc) relate specifically to one graphics\_toolkit in Octave, so you might want to try the other one. In general OpenGl based toolkits are much faster than 'gnuplot'. On the other hand, as 'gnuplot' is more mature, the printed outputs (in raster or vector formats) are much more good looking and generally suitable for publication.

A plot is composed of various objects (figure window, axes, lines, images ...) which all feature a set of useful properties as we will see below. The graphics objects are organized according to the following hierarchy:

+   root: the base object. Mainly features properties related to screen description.
+   figure: represents a figure windows. Figures are children of the root object.
+   axes: represents a set of x, y (,z) axes. Axes are children of figure objects.
+   line: represents curves. Lines are children of axes (or hggroup, see below) objects. This is typically what is used by the basic `plot (...)` function to draw curves.
+   patch: represents unstructured surface. Patches are children of axes (or hggroup, see below) objects. Patches are used when one wants to draw 2 dimensional unstructured surfaces and have fine control over their color.
+   image: represents a 2D set of pixels. Images are children of axes (or hggroup, see below) objects.
+   surface: represents structured surfaces. Surfaces are children of axes (or hggroup, see below) objects. Structured meshes made of quads are generally represented using surfaces.
+   text: represents a text label. Texts are children of axes (or hggroup, see below) objects.
+   hggroup: convenience object to group graphics objects. Among others useful properties, the 'visible' property of and hggroup acts on the visibility of all its children objects (line, text, ...)

The law level functions that are used to create the above objects have the same name as the object. They all return a unique handle (a variable of type double) that can be further used to change the object properties using `set (h, POPERTY, VALUE)`.

  
In general one would use higher level function such as in the example below::

<table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f2fff2; border: solid 1px #bfffbf;"><tbody><tr><td><div style="font-size:13px" class="mw-highlight mw-highlight-lang-octave mw-content-ltr" dir="ltr"><pre><span></span> <span class="nb">graphics_toolkit</span> <span class="p">(</span><span class="s">"qt"</span><span class="p">);</span>
 <span class="n">x</span> <span class="p">=</span> <span class="mi">0</span><span class="p">:</span><span class="mf">0.1</span><span class="p">:</span><span class="mi">3</span><span class="p">;</span>
 <span class="n">y</span> <span class="p">=</span> <span class="nb">sin</span> <span class="p">(</span><span class="n">x</span><span class="p">);</span>
 <span class="n">p</span> <span class="p">=</span> <span class="nb">plot</span> <span class="p">(</span><span class="n">x</span><span class="p">,</span> <span class="n">y</span><span class="p">,</span> <span class="s">"b"</span><span class="p">);</span>
</pre></div></td></tr></tbody></table>

  
This should get you a plot of a part of a sine wave. Octave has used all standard properties like line widths, fonts, etc, except for the line color which was forced to be blue (via the `'b'`).

Before going into the hierarchy and how to change things, let's make things more complicated:

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

+   You now have 2 windows that popped up on your screen: figure 1 and figure 2. Their handle is the integer figure number (1 and 2 here)
+   figure 2 has two axes objects inside. In order to have access to those axes properties one could have stored its handle, returned by the subplot function, e.g. `hax = subplot (2,1,1)`
+   the actual curves `y = sin (x) .^2` and `y = x.^2` are line objects that can be tuned using their repsective handles `p` and `r`.

So let's say you want to change the line thickness of the curve in figure 1:

```matlab
figure (1)
set (p, "linewidth", 3)
```

You can get the color of the two other plots by referring to their handles:

```matlab
get (q, "color")
get (r, "color")
```

Which will give you the RGB code for black (0,0,0) and green (0,1,0).

Have a look at all the properties of line objects:

```matlab
get (q)
```

Some of those properties are read-only, while others have a limited set of allowed values. You may also want to look at modifiable properties and their allowed values:

```matlab
set (q)
```

And `set` anything that is not to your taste to something else (for what's available see the [manual](http://www.gnu.org/software/octave/doc/interpreter/)).

```matlab
set (p, "marker", "*")
```

Adding `text()` inside an `axes()` object is done by

```matlab
text (2, 0.8, "HERE");
```

... but it now is inserted in figure 1, which *might NOT be what you anticipated*.

All low and high level plotting functions draw by default on the 'currentfigure' in the 'currentaxes' for which the handles can be retrieved using:

```matlab
hfig = gcf (); # returns a handle to the current figure
hax = gca ();  # returns a handle to the current axes
```

In order to change the current figure/axes and draw in figure 2 you may either make them current using the the figure `figure (NFIG)` function:

```matlab
figure (2) # figure 2 is now the current, let's check
get (0, "currentfigure")
haxes = get (gcf (),"children") # retrieve all axes handles
set (gcf (), "currentaxes", haxes(2)) # set the second axes current
text (1.0, 0.5, "THIS IS WHAT I WANTED")
```

... or explicitly specify the parent object in which you would like to draw the text:

```matlab
haxes = get (2, "children") # retrieve all axes handles
text (1.0, 0.5, "THIS IS WHAT I WANTED", "parent", haxes (2))
```

[Category](Special%253ACategories.html "Special:Categories"):

+   [Tutorials](Category%253ATutorials.html "Category:Tutorials")