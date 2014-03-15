#Esther Weeks Homework 3 - CS171
##Problem 2 - Questions

###1.
Data Types:

	* Year- Uses astronomical year numbering, so years have a negative number if they are
	below year 0. Years increase by varying incriments. 
	Type: number: int or float. Could also be parsed as a date... but probably just
	as easy to work with ints on this. 
	
	
	* Sources for data - Where the data came from, name, year and link when available. 
	Type: String
	
	* Population- In whole numbers. Some on chart are a range, for example 1,000,000 to 10,000,000,
	but it seems, not the ones we will be working with. 
	Type: Int or float.
	
	Data is in html tags, not in a file, like JSON or CSV, with which we have been working.
	To get just the data it will require different types of data processing. Data will have
	to be pulled from the html tags, to get the data we need. In addition, it may be easier 
	to pull down just the data we need from the site, instead of all of it. 
	

###2.
	Selection for second row in the Wikipedia table: 
	$("tbody tr:nth-child(2)")
	$("tbody tr").eq(1)
	
	All table rows that are not the header row:
	$("tbody tr").not("tbody tr:nth-child(1)")
	$("tbody tr").not("first")