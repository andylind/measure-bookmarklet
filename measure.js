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

    getMousePosition = function(e) {
	    var x = e.pageX,
		    y = e.pageY;
        document.Show.MouseX.value = x;
        document.Show.MouseY.value = y;
    };
    
    loadToolbar = function (){
        if (!document.getElementById("measure-toolbar")){
            loadCSS('measure-toolbar-css', 'http://localhost:8000/measure.css');
        }
        document.onmousemove = getMousePosition;

        if (!document.getElementById("measure-toolbar")){
            var measureToolbar = document.createElement('div');
            measureToolbar.id = "measure-toolbar";
            document.body.appendChild(measureToolbar);
            document.getElementById("measure-toolbar").innerHTML = '<div id="measure-toolbar-header">Measure</div><div id="measure-toolbar-close"><a id="measure-toolbar-close-link" href="#">x</a></div><br><br><div><form name="Show">&nbsp;X:&nbsp;<input type="text" name="MouseX" value="0" size="4"><br>&nbsp;Y:&nbsp;<input type="text" name="MouseY" value="0" size="4"><br></form></div>';
            document.getElementById("measure-toolbar-close-link").setAttribute('onclick', 'measurebookmarklet.removeToolbar()');
        }
    };
    
    return {
        loadToolbar: loadToolbar,
        removeToolbar: removeToolbar
    };
}());

measurebookmarklet.loadToolbar();
