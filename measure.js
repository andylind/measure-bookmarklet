/*
 * Meausre Bookmarklet
 * Copyright 2010 Andrew Lind. All rights reserved
 */

measurebookmarklet = (function(){
    var removeElement,
        removeToolbar,
        loadCSS,
        getMousePosition,
        loadToolbar;
        
    removeElement = function(id){
        var element = undefined;
        if (element = document.getElementById(id)) {     
            element.parentNode.removeChild(element);
         }
         else {
            return false;
         }
    };
    
    removeToolbar = function(){
        removeElement("measure-toolbar");
        removeElement("measure-toolbar-css");
    };
    
    loadCSS = function(id, fileLocation){
        var headID = document.getElementsByTagName("head")[0],         
            cssNode = document.createElement('link');
        cssNode.type = 'text/css';
        cssNode.rel = 'stylesheet';
        cssNode.href = fileLocation;
        cssNode.media = 'screen';
        cssNode.id = id;
        headID.appendChild(cssNode);
    };

    loadToolbar = function (){
        if (!document.getElementById("measure-toolbar")){
            loadCSS('measure-toolbar-css', 'http://localhost:8000/measure.css');

            var measureToolbar = document.createElement('div');
            measureToolbar.id = "measure-toolbar";
            document.body.appendChild(measureToolbar);
            document.getElementById("measure-toolbar").innerHTML = '<div id="measure-toolbar-header">Measure</div><div id="measure-toolbar-close"><a id="measure-toolbar-close-link" href="#">x</a></div><br><br>X:<span id="measure-toolbar-xvalue">0</span<br>Y:<span id="measure-toolbar-yvalue">0</span>';
            document.getElementById("measure-toolbar-close-link").setAttribute('onclick', 'measurebookmarklet.removeToolbar()');
        }
        
        document.onmousemove = function(e) {
	        var x = 0,
		        y = 0;
		    if(e.pageX){
		        x = e.pageX;
		        y = e.pageY;
		    }
		    else{ 
		        x = event.clientX + document.body.scrollLeft;
                y = event.clientY + document.body.scrollTop;
            }
            document.getElementById("measure-toolbar-xvalue").innerHTML = x;
            document.getElementById("measure-toolbar-yvalue").innerHTML = y;
        };
    };
    
    return {
        loadToolbar: loadToolbar,
        removeToolbar: removeToolbar
    };
}());

measurebookmarklet.loadToolbar();
