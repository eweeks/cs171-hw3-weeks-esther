##Problem 2 Design Studio Questions:

###Explain why you chose the design you implemented.

Looking through my sketches, the first sketch I made simply showed the average line, and
the datapoints for the sources, and then draws in the line for a source on hover. This is
a nice idea, and for some data sets would work well. The challenge with this data set, however,
is the spread of the data. The data points at the end of the chart are very close together,
and the estimates become stacked on top of each other. Scales could be changed
so they don't over lap as much, but then you often loose the nice overview of the whole
graph. Playing around with doing log scales or power scales had potential, and many in
our design studio session seemed to feel this was the way to go, but my initial experiments
with this didn't work out so well, so I abandoned this for the time being. I felt like to 
successfully use these, more research into how they work and are calculated was needed,
(It's been a lot time since I've had a stats class) and I decided this maybe was straying
from the objective of the assignment, and my time was better spent else where. Additionally,
and most importantly, I felt there was a way to better represent the data. The main problem
 with this design is it does not do the best job of showing the absolute and relative differences 
 between the estimates. Granted, it does show this to some extent but it's not as easy to see 
 the amounts, and it does not show the percentage of difference. I felt the other designs did
a better job of representing this.

My second sketch, was dividing out the estimates for each year, allowing for an easier
comparison of how each sources estimate varies for that specific year. I like this idea,
but you also loose the overview display of the graph which I felt was also important.

The last sketch, tries to combine the overview graph with a detail view, like a bar chart.
It draws the average line for the graph, and on a tooltip, shows the detail view for each year, 
not the whole spread of the data. My initial sketch for the detail shows a bar chart 
representing the population numbers, with a red line to represent the average population
estimate for that year. Visually, this allows you to see if each source's population
estimate falls above or below the average, and approximately by how much. I liked this 
design because it starts out with the broad overview graph and then allows the viewer to
explore the data more to get additional information and details. Because of the tooltip,
you can still see the overview graph and the detail at the same time, and it is easy to 
move between the years with just a mouseover. I decided to differentiate the interpolated data
by changing the opacity on the bar's color. Lighter means it was interpolated, darker means
it wasn't. The scaling on the overview chart is still challenging, but it is easier to 
work with when just doing the average instead of all the sources on it. My big concern with
this visualization, is showing the percent difference for each year. Right now, I'm just
calculating those numbers and printing them on the top of the tooltip, but I feel this isn't
the most effective way to do so, and would like to find a way to visually represent this as well.
I would like to have an additional option that would draw a chart showing this percentages as well.

After having finished the brush section of the problem set, I was very tempted to try
and implement that with this visual as well, I like how its interaction works, and could
see it complementing this data very well. 