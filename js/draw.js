paper.install(window);

function initCanvas(canvasName) {
  paper.setup(canvasName);
  const canvas = document.getElementById(canvasName)
  context = canvas.getContext('2d');
      // Create a simple drawing tool:
}

function initDrawer(canvasName, strokeColor, strokeWidth, boldStrokeColor, fillColor, 
  numClones, visiblePath, scaleFactor, style, golden, isFractal, blend, 
  offset, fadeType, outline, dashed, filled, bgColor, UISupport, UITag) {
    
    function removePath(){
      console.log("called")
      path.remove();
    }

    function removeGroup(){
      console.log("called")
      group.remove();
    }


    var tool = new paper.Tool();
    var path;
    var renderStyle = style;
    var canvas = document.getElementById(canvasName);
    group = new paper.Group();
    circleGroup = new paper.Group(); 

    // Define properties here based on params
    initStyles = {
      "sColor" : strokeColor,
      "sWidth" : strokeWidth,
      "bStroke" : boldStrokeColor,
      "fillColor" : fillColor,
      "iterations" : numClones,
      "vPathBool" : visiblePath,
      "sFactor" : scaleFactor,
      "renderStyle" : style,
      "goldenBool" : golden,
      "fractalBool" : isFractal,
      "blendStyle" : blend,
      "offsetType" : offset,
      "faded" : fadeType,
      "outlined" : outline,
      "dashType" : dashed,
      "filledBool" : filled,
      "exportBgColor" : bgColor 
    }
    console.log(initStyles);

   

    var invertedColor = invertColor(initStyles.sColor);
    subtleShapes = {
      strokeColor: initStyles.sColor,
      //strokeWidth: 0.487
      strokeWidth: initStyles.sWidth / 4,
      opacity: 0.33
    }

    fractal = {
      strokeColor: initStyles.sColor,
      //strokeWidth: 0.487
      strokeWidth: 0.8888,
      opacity: 0.66
    }

    boldShapes = {
      strokeColor: initStyles.bStroke,
      //strokeWidth: 0.487
      strokeWidth: initStyles.sWidth * 3.33
    }

    regShapes = {
      strokeColor: initStyles.sColor,
      strokeWidth: initStyles.sWidth,
    }

    pathOutline = {
        strokeWidth: initStyles.sWidth * (12 * initStyles.sFactor),
    };

    paintColor = {
      fillColor: initStyles.fillColor,
    }

    // Define a mousedown and mousedrag handler
    tool.onMouseDown = function(event) {
        if (fractalized == true) {
          project.clear();
          fractalized = false;
          circleGroup = new paper.Group(); 
          group = new paper.Group();
      }
      path = new paper.Path({
        parent: group
      });
      circleArea = new paper.Path.Circle({
        center: (event.point),
        radius: 33.3,
        fillColor: initStyles.fillColor,
        parent: circleGroup

      })
      circleArea.visible = false;
      path.strokeColor = initStyles.sColor;
      path.add(event.point);
      console.log("started")
    }


    tool.onMouseDrag = function(event) {
      path.add(event.point);
      console.log("dragged to" + path);
      path.smooth();
      path.strokeJoin = 'miter'
      path.strokeWidth = initStyles.sWidth;
      
      /* DRAW STRAIGHT... NEED FIX
      if(event.modifiers.shift) {
        path.strokeWidth = initStyles.sWidth * 2;
      }*/
      //path.visible = false;
      
    }

    tool.onMouseUp = (event) => {
      //path.visible = true;
      path.simplify();
      
    }
      /*for (var i = 0; i < clones; i++) {
        var clonedPath = path.clone();
        clonedPath.position.x += 1.33 * i;
        clonedPath.position.y -= 1.33 * i;
        clonedPath.rotate(angle * i * (angle / sfactor), path.bounds.topLeft); }*/
        
        //clonedPath.blendMode = 'negation'
        //xor
        //screen
        //negation
        //none 
    

  
        //console.log(shapeGroup[i])
        //view.onFrame = (onMouseUp) => {
       // Each frame, rotate the path by 3 degrees:
          //var shape = new paper.Group(shapeGroup[i]);

          //group.rotate(0.4933);
          //group.position.x += 1.33;
          //group.position.y += -0.88;
          //group.scale(1.004) 
          //group.opacity = 0.88;
      
      //}
      //keyPath.add(position);
    

    

  

    // The amount we will move when one of the keys is pressed:

    //step = 20;
    bKeyToggled = false;
    //rKeyToggled = false;
    fractalized = false;
    fKeyToggled = false;
    pKeyToggled = false;
    oKeyToggled = false;
    shiftKeyToggled = false;
    
    tool.onKeyDown = (event) => {

      if(event.key == 'o') {
         if (fractalized == true) {
        return;
      }
          fractalGroup = new paper.Group();

          var clones = initStyles.iterations;
          var sfactor = initStyles.sFactor;

          if (initStyles.goldenBool) { var sfactor = initStyles.sFactor * 1.618033988749894848204586834365638117720}
          var angle = 360 / (clones * (1 / sfactor));

          /* Inner Spirals */
          for(i = 0; i < Math.round(clones * 0.25); i++) {
            clonedPath = group.clone();
            fractalGroup.addChild(clonedPath);
            clonedPath.dashArray = [0];
            clonedPath.scale(sfactor / i);
            if (initStyles.offsetType == "slight") {
              clonedPath.position.x -= i * Math.PI * Math.pow(sfactor, Math.PI * i);
              clonedPath.position.y -= i * Math.PI * Math.pow(sfactor, Math.PI * i);
            }
            if (initStyles.offsetType == "pi") {
              clonedPath.position.x -= i * Math.PI * sfactor
              clonedPath.position.y -= i * Math.PI * sfactor
            }
            if (initStyles.offsetType == "fib") {
              clonedPath.position.x -= fibonacci(i) / Math.PI * (i) * sfactor;
              clonedPath.position.y -= fibonacci(i) / Math.PI * (i) * sfactor;
            }

            if (initStyles.faded) {
              clonedPath.strokeWidth = clones / (window.innerWidth * window.innerHeight) - i * sfactor;
            }

             if (initStyles.dashType == "dashed-rotate") {
              clonedPath.dashArray = [3, angle * i];
            }

            if (initStyles.dashType == "dashed-fade") {
              clonedPath.dashArray = [3, i / 2];
            }
            if (initStyles.dashType == "dashed") {
              clonedPath.dashArray = [3, Math.PI * initStyles.sWidth];
            }

            if (initStyles.dashType == "dotted") {
              clonedPath.dashArray = [strokeWidth, Math.PI * initStyles.sWidth];
            }


            if (initStyles.dashType == "dotted-fade") {
              clonedPath.dashArray = [initStyles.sWidth, i / 2];
            }
             if (initStyles.dashType == "dotted-rotate") {
              clonedPath.dashArray = [initStyles.sWidth, angle * i];
            }
            
            if (initStyles.blendStyle) {
              clonedPath.blendMode = initStyles.blendStyle;
            }

            if (initStyles.renderStyle == 'rainbow') {
              path.strokeColor = "black";
              clonedPath.strokeColor = initStyles.sColor;
              clonedPath.strokeColor.hue += (2 * angle * i)  // RAINBOW
            }

            if (initStyles.renderStyle == 'consistent') {
              path.strokeColor = initStyles.sColor;
              clonedPath.strokeColor = initStyles.sColor;  // SoftRainbow
            }

            if (initStyles.renderStyle == 'normal') {
              clonedPath.strokeColor = initStyles.sColor;
            }
            if (initStyles.renderStyle == 'inverted') {
              clonedPath.strokeColor = invertedColor;
            }

            if (initStyles.renderStyle == 'negative') {
              path.strokeColor = invertedColor;
              clonedPath.strokeColor = initStyles.bStroke;
            }

            if (initStyles.renderStyle == 'negativeRainbow') {
              clonedPath.strokeColor.hue += (2 * angle * i) 
              path.strokeColor = invertedColor;
            }

             if (initStyles.filledBool) {
              clonedPath.fillColor = initStyles.fillColor;
              clonedPath.fillColor.hue = Math.random() * 360;
            }

            //clonedPath.position.x = circleArea.center + 3.14 * i;
            //clonedPath.position.y += circleArea.center + 3.14 * i;
            clonedPath.rotate(-angle * i * (angle / sfactor), (circleArea.center));
            /*if (isFractal) {
              var newScale = clonedPath.scale;
              var fractalclonedPath = clonedPath.clone();
              for(i = 0; i < clones; i++) {
                fractalGroup.addChild(fractalclonedPath);
                fractalclonedPath.scale(sfactor / i / Math.pow(sfactor, i));
                fractalclonedPath.rotate(-angle * i * (angle / sfactor), circleArea.center)
              }
            }  *///path.bounds.topLeft
          }

          /* Outer Spirals */
          for(i = 0; i < clones; i++) {
            clonedPath = group.clone();
            fractalGroup.addChild(clonedPath);
            clonedPath.dashArray = [0];
            clonedPath.scale(sfactor * i);
            clonedPath.strokeColor = initStyles.sColor;
            if (initStyles.offsetType == "slight") {
              clonedPath.position.x += i * Math.PI * Math.pow(sfactor, Math.PI * i);
              clonedPath.position.y += i * Math.PI * Math.pow(sfactor,  Math.PI * i);
            }

            if (initStyles.offsetType == "pi") {
              clonedPath.position.x += i * Math.PI * sfactor;
              clonedPath.position.y += i * Math.PI * sfactor;
            }
            if (initStyles.renderStyle == 'rainbow') {
              path.strokeColor = "black";
              clonedPath.strokeColor = initStyles.sColor;
              clonedPath.strokeColor.hue += (2 * angle * i)  // RAINBOW
            }

            if (initStyles.renderStyle == 'consistent') {
              path.strokeColor = strokeColor;
              clonedPath.strokeColor = initStyles.sColor;  // SoftRainbow
            }

            if (initStyles.renderStyle == 'normal') {
              clonedPath.strokeColor = initStyles.sColor;;
            }
            if (initStyles.renderStyle == 'inverted') {
              clonedPath.strokeColor = invertedColor;
            }

            if (initStyles.renderStyle == 'negative') {
              path.strokeColor = invertedColor;
              clonedPath.strokeColor = initStyles.bStroke;
            }

            if (initStyles.renderStyle == 'negativeRainbow') {
              clonedPath.strokeColor.hue += (2 * angle * i) 
              path.strokeColor = invertedColor;
            }

            if (initStyles.faded) {
              clonedPath.strokeWidth = 1 / (clones / window.innerWidth + i * sfactor);
            }
            if (initStyles.blendStyle) {
              clonedPath.blendMode = initStyles.blendStyle;
            }

         
            if (initStyles.dashType == "dashed-rotate") {
              clonedPath.dashArray = [3, angle * i]
            }

            if (initStyles.dashType == "dashed-fade") {
              clonedPath.dashArray = [3, i / 2]
            }
            if (initStyles.dashType == "dashed") {
              clonedPath.dashArray = [3, Math.PI * initStyles.sWidth]
            }

            if (initStyles.dashType == "dotted") {
              clonedPath.dashArray = [initStyles.sWidth, Math.PI * initStyles.sWidth]
            }


            if (initStyles.dashType == "dotted-fade") {
              clonedPath.dashArray = [initStyles.sWidth, i / 2]
            }
             if (initStyles.dashType == "dotted-rotate") {
              clonedPath.dashArray = [initStyles.sWidth, angle * i]
            }
            
            if (initStyles.offsetType == "fib") {
              clonedPath.position.x += fibonacci(i) / Math.PI * (i) * sfactor
              clonedPath.position.y += fibonacci(i) / Math.PI * (i) * sfactor
            }
      
            if (initStyles.filledBool) {
              clonedPath.fillColor = initStyles.fillColor;
              clonedPath.fillColor.hue += Math.random() * 360;
            }

            clonedPath.rotate(angle * i * (angle / sfactor), (circleArea.center));  //path.bounds.topLeft

            if (initStyles.fractalBool) {
              for(j = 0; j < clones; j++) {
                fractalclonedPath = clonedPath.clone();
                fractalGroup.addChild(fractalclonedPath);
                fractalclonedPath.scale((sfactor * j) / i);
                fractalclonedPath.rotate(angle * j * (angle / sfactor), clonedPath.position)
              }
            }          
            } 

            if (initStyles.outlined == "normal") {
              path.strokeColor = '#000000';
              path.strokeWidth = 3 * initStyles.sWidth;
            }
            if (initStyles.outlined == "normal-inherit") {
              path.strokeColor = initStyles.sColor;
              path.strokeWidth = 3 * initStyles.sWidth;
            }


             if (initStyles.outlined == "light") {
              path.strokeColor = '#000000';
              path.strokeWidth = initStyles.sWidth;
            }
           
            if (initStyles.outlined == "light-inherit") {
              path.strokeColor = initStyles.sColor;
              path.strokeWidth = initStyles.sWidth;
            }
            if (initStyles.outlined == "lighter") {
              path.strokeColor = '#000000';
              path.strokeWidth = 1 / initStyles.sWidth * sfactor;
            }
           
            if (initStyles.outlined == "lighter-inherit") {
              path.strokeColor = initStyles.sColor;
              path.strokeWidth = 1 / initStyles.sWidth * sfactor;
            }
            fractalGroup.visible = true;
            path.visible = initStyles.vPathBool;
            fractalized = true; 
       
       }

      if(event.key == 'shift') {
        if(shiftKeyToggled == false && pKeyToggled == false) {
          shiftKeyToggled = true;
          fractalGroup.visible = false;
          path.visible = false;

        } if (shiftKeyToggled == false && pKeyToggled == true) {
          shiftKeyToggled = true;
          fractalGroup.visible = false;
          path.visible = true;
          pKeyToggled = false;
        }
        else if (shiftKeyToggled == true && pKeyToggled == false) {
          shiftKeyToggled = false;
          fractalGroup.visible = true;
          path.visible = true;  
        }
        else if (shiftKeyToggled == true && pKeyToggled == true) {
          shiftKeyToggled = false;
          fractalGroup.visible = true;
          path.visible = false;
          pKeyToggled = false;  
        } 
      
      }

      if(event.key == "z") {
        view.scale(1.17, view.center);
      }
      if(event.key == "x") {
        view.scale(0.83, view.center);
      }

      if(event.key == 'c'){
        group.remove();
        clonedPath.remove();
        fractalGroup.remove();
        project.clear();
        console.log("Canvas Cleared!");
        group = new paper.Group();
        circleGroup = new paper.Group(); 
        fractalized = false;
      }

     /* if(event.key == 'r'){
        if (rKeyToggled == false) {
          view.onFrame = (event) => {
            group.rotate(2); 
          }
          rKeyToggled = true;
        }
        else if (rKeyToggled == true) {
          view.onFrame = (event) => {
            group.rotate(0);
          }
          rKeyToggled = false;
        }
      }*/

     if(event.key == 'b'){
        if (bKeyToggled == false) {
          view.onFrame = (event) => {
            group.style = boldShapes;
            if (fractalized == true) {
              fractalGroup.style = boldShapes}
            }
            bKeyToggled = true
      }
        else if (bKeyToggled == true) {
          view.onFrame = (event) => {
            group.style = regShapes;
            if (fractalized == true) {
              fractalGroup.style = fractal}
            }
          bKeyToggled = false;
      }
    }
    if(event.key == 'f') {
        if (fKeyToggled == false) {
          group.fillColor = initStyles.fillColor;
          if (fractalized == true) {
              fractalGroup.fillColor = initStyles.fillColor;
            }
            fKeyToggled = true;
        }
      
        else if (fKeyToggled == true) {
          group.fillColor = "transparent";
          if (fractalized == true) {
            fractalGroup.fillColor = "transparent";
          }
          fKeyToggled = false;  
      }  
    }

    if (event.key == 'p') {
      if (pKeyToggled == false) {
          path.visible = true;
          pKeyToggled = true;
        } else if (pKeyToggled == true) {
          path.visible = false;
          pKeyToggled = false;
        }
    }

     /* SVG EXPORT IS BUGGY */
     
     document.getElementById("downloadToSVG").onclick = function(){
     var bgExport = new Path.Rectangle({
       point: [0, 0],
       size: [canvas.width / 2, canvas.height / 2],
       selected: false
     });

     bgExport.sendToBack();
     bgExport.fillColor = "transparent";
     //exportGroup.addChild(fractalGroup);
     //exportGroup.addChild(group)
     fileName = "Shape.svg"
     var url = "data:image/svg+xml;utf8," + encodeURIComponent(paper.project.exportSVG({asString:true}));
     var serializer = new XMLSerializer();
     var svg = paper.project.exportSVG();
     var svg_string = serializer.serializeToString(svg);

     var blob = new Blob(
        [svg_string],
        {type: "image/svg+xml;charset="+svg.characterSet}
      );
     saveAs(blob, fileName);

     bgExport.remove();
    } 

    PNGbutton = document.getElementById("downloadToPNG");
      PNGbutton.onclick = function(){
      canvas.style.backgroundColor = "transparent";

      if (bgColor || bgColor != 'transparent') {
       var bgExport = new Path.Rectangle({
         point: [0, 0],
         size: [canvas.width / 2, canvas.height / 2],
         selected: false,
         fillColor: bgColor
       });
       bgExport.sendToBack();
     }

     paper.view.draw();
     var filename = "Shape.png"
     var exportImg = new Image();
     exportImg.src ='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';

     context.drawImage(exportImg, 0,0);

     canvas.toBlob(function(blob) {
     saveAs(blob, filename);
     }, "image/png");
     canvas.style.backgroundColor = "white";

    if (bgColor || bgColor != 'transparent') {
     bgExport.remove();
    }}

    }

    if (UISupport) {
        var uiButton = document.getElementById(UITag); // Update prop button for now... later make dynamic
        console.log("Added UI!")
        uiButton.addEventListener('click', function(){
        console.log("Updated Properties!")
        console.log(currentProperties());
        project.clear();
        group = new paper.Group();
        circleGroup = new paper.Group(); 

        /* Consider a clear canvas button */

        initStyles = {
          "sColor" : getValues('strokeColor'), //Specified form id for stroke color... etc.
          "sWidth" : getValues('strokeWidth'),
          "bStroke" : getValues('boldStrokeColor'),
          "fillColor" : getValues('fillColor'),
          "iterations" : getValues('loops'),
          "vPathBool" : getValues('visiblePath'),
          "sFactor" : getValues('sfactor'),
          "renderStyle" : getValues('loopMode'),
          "goldenBool" : getValues('golden'),
          "fractalBool" : getValues('fractalBool'),
          "blendStyle" : getValues('blendStyle'),
          "offsetType" : getValues('offset'),
          "faded" : getValues('fade'),
          "outlined" : "light",
          "dashType" : getValues('loopMaterialShape'),
          "filledBool" : false,
          "exportBgColor" : getValues('bgColor')
        };

      UIFrame = document.getElementById(UISupport);
      UIFrame.addEventListener("keypress", hideUI);
      var uiHidden = false;
      function hideUI(event){
        keyCode = event.keyCode;
          if (keyCode == 104 && uiHidden == false) {
            UIFrame.style.opacity = "0";
            uiHidden = true;
            console.log("UI is now hidden. Press H to toggle");

          }
          else if (keyCode == 104 && uiHidden == true)  {
            UIFrame.style.opacity = "1";
            uiHidden = false;
            console.log("UI is visible");
          }
      }

      var invertedColor = invertColor(initStyles.sColor);
      subtleShapes = {
      strokeColor: initStyles.sColor,
      //strokeWidth: 0.487
      strokeWidth: initStyles.sWidth / 4,
      opacity: 0.33
    }

    fractal = {
      strokeColor: initStyles.sColor,
      //strokeWidth: 0.487
      strokeWidth: 0.8888,
      opacity: 0.66
    }

    boldShapes = {
      strokeColor: initStyles.bStroke,
      //strokeWidth: 0.487
      strokeWidth: initStyles.sWidth * 3.33
    }

    regShapes = {
      strokeColor: initStyles.sColor,
      strokeWidth: initStyles.sWidth,
    }

    pathOutline = {
        strokeWidth: initStyles.sWidth * (12 * initStyles.sFactor),
    };

    paintColor = {
      fillColor: initStyles.fillColor,
    }

    // Define a mousedown and mousedrag handler
    tool.onMouseDown = function(event) {
        if (fractalized == true) {
          project.clear();
          fractalized = false;
          circleGroup = new paper.Group(); 
          group = new paper.Group();
      }

      path = new paper.Path({
        parent: group
      });
      circleArea = new paper.Path.Circle({
        center: (event.point),
        radius: 33.3,
        fillColor: initStyles.fillColor,
        parent: circleGroup

      })
      circleArea.visible = false;
      path.strokeColor = initStyles.sColor;
      path.add(event.point);
      console.log("started")
    }


    tool.onMouseDrag = function(event) {
      path.add(event.point);
      console.log("dragged to" + path);
      path.smooth();
      path.strokeJoin = 'miter'
      path.strokeWidth = initStyles.sWidth;
      
      /* DRAW STRAIGHT... NEED FIX
      if(event.modifiers.shift) {
        path.strokeWidth = initStyles.sWidth * 2;
      }*/
      //path.visible = false;
      
    }

    tool.onMouseUp = (event) => {
      //path.visible = true;
      path.simplify();
      
    }
      /*for (var i = 0; i < clones; i++) {
        var clonedPath = path.clone();
        clonedPath.position.x += 1.33 * i;
        clonedPath.position.y -= 1.33 * i;
        clonedPath.rotate(angle * i * (angle / sfactor), path.bounds.topLeft); }*/
        
        //clonedPath.blendMode = 'negation'
        //xor
        //screen
        //negation
        //none 
    

  
        //console.log(shapeGroup[i])
        //view.onFrame = (onMouseUp) => {
       // Each frame, rotate the path by 3 degrees:
          //var shape = new paper.Group(shapeGroup[i]);

          //group.rotate(0.4933);
          //group.position.x += 1.33;
          //group.position.y += -0.88;
          //group.scale(1.004) 
          //group.opacity = 0.88;
      
      //}
      //keyPath.add(position);
    
    // The amount we will move when one of the keys is pressed:

    //step = 20;
    bKeyToggled = false;
    //rKeyToggled = false;
    fractalized = false;
    fKeyToggled = false;
    pKeyToggled = false;
    oKeyToggled = false;
    shiftKeyToggled = false;
    
    tool.onKeyDown = (event) => {

      if(event.key == 'o') {
         if (fractalized == true) {
        return;
      }
          fractalGroup = new paper.Group();

          var clones = initStyles.iterations;
          var sfactor = initStyles.sFactor;

          if (initStyles.goldenBool) { var sfactor = initStyles.sFactor * 1.618033988749894848204586834365638117720}
          var angle = 360 / (clones * (1 / sfactor));

          /* Inner Spirals */
          for(i = 0; i < Math.round(clones * 0.25); i++) {
            clonedPath = group.clone();
            fractalGroup.addChild(clonedPath);
            clonedPath.dashArray = [0];
            clonedPath.scale(sfactor / i);
            if (initStyles.offsetType == "slight") {
              clonedPath.position.x -= i * Math.PI * Math.pow(sfactor, Math.PI * i);
              clonedPath.position.y -= i * Math.PI * Math.pow(sfactor, Math.PI * i);
            }
            if (initStyles.offsetType == "pi") {
              clonedPath.position.x -= i * Math.PI * sfactor
              clonedPath.position.y -= i * Math.PI * sfactor
            }
            if (initStyles.offsetType == "fib") {
              clonedPath.position.x -= fibonacci(i) / Math.PI * (i) * sfactor;
              clonedPath.position.y -= fibonacci(i) / Math.PI * (i) * sfactor;
            }

            if (initStyles.faded) {
              clonedPath.strokeWidth = clones / (window.innerWidth * window.innerHeight) - i * sfactor;
            }

             if (initStyles.dashType == "dashed-rotate") {
              clonedPath.dashArray = [3, angle * i];
            }

            if (initStyles.dashType == "dashed-fade") {
              clonedPath.dashArray = [3, i / 2];
            }
            if (initStyles.dashType == "dashed") {
              clonedPath.dashArray = [3, Math.PI * initStyles.sWidth];
            }

            if (initStyles.dashType == "dotted") {
              clonedPath.dashArray = [strokeWidth, Math.PI * initStyles.sWidth];
            }


            if (initStyles.dashType == "dotted-fade") {
              clonedPath.dashArray = [initStyles.sWidth, i / 2];
            }
             if (initStyles.dashType == "dotted-rotate") {
              clonedPath.dashArray = [initStyles.sWidth, angle * i];
            }
            
            if (initStyles.blendStyle) {
              clonedPath.blendMode = initStyles.blendStyle;
            }

            if (initStyles.renderStyle == 'rainbow') {
              path.strokeColor = "black";
              clonedPath.strokeColor = initStyles.sColor;
              clonedPath.strokeColor.hue += (2 * angle * i)  // RAINBOW
            }

            if (initStyles.renderStyle == 'consistent') {
              path.strokeColor = initStyles.sColor;
              clonedPath.strokeColor = initStyles.sColor;  // SoftRainbow
            }

            if (initStyles.renderStyle == 'normal') {
              clonedPath.strokeColor = initStyles.sColor;
            }
            if (initStyles.renderStyle == 'inverted') {
              clonedPath.strokeColor = invertedColor;
            }

            if (initStyles.renderStyle == 'negative') {
              path.strokeColor = invertedColor;
              clonedPath.strokeColor = initStyles.bStroke;
            }

            if (initStyles.renderStyle == 'negativeRainbow') {
              clonedPath.strokeColor.hue += (2 * angle * i) 
              path.strokeColor = invertedColor;
            }

             if (initStyles.filledBool) {
              clonedPath.fillColor = initStyles.fillColor;
              clonedPath.fillColor.hue = Math.random() * 360;
            }

            //clonedPath.position.x = circleArea.center + 3.14 * i;
            //clonedPath.position.y += circleArea.center + 3.14 * i;
            clonedPath.rotate(-angle * i * (angle / sfactor), (circleArea.center));
            /*if (isFractal) {
              var newScale = clonedPath.scale;
              var fractalclonedPath = clonedPath.clone();
              for(i = 0; i < clones; i++) {
                fractalGroup.addChild(fractalclonedPath);
                fractalclonedPath.scale(sfactor / i / Math.pow(sfactor, i));
                fractalclonedPath.rotate(-angle * i * (angle / sfactor), circleArea.center)
              }
            }  *///path.bounds.topLeft
          }

          /* Outer Spirals */
          for(i = 0; i < clones; i++) {
            clonedPath = group.clone();
            fractalGroup.addChild(clonedPath);
            clonedPath.dashArray = [0];
            clonedPath.scale(sfactor * i);
            clonedPath.strokeColor = initStyles.sColor;
            if (initStyles.offsetType == "slight") {
              clonedPath.position.x += i * Math.PI * Math.pow(sfactor, Math.PI * i);
              clonedPath.position.y += i * Math.PI * Math.pow(sfactor,  Math.PI * i);
            }

            if (initStyles.offsetType == "pi") {
              clonedPath.position.x += i * Math.PI * sfactor;
              clonedPath.position.y += i * Math.PI * sfactor;
            }
            if (initStyles.renderStyle == 'rainbow') {
              path.strokeColor = "black";
              clonedPath.strokeColor = initStyles.sColor;
              clonedPath.strokeColor.hue += (2 * angle * i)  // RAINBOW
            }

            if (initStyles.renderStyle == 'consistent') {
              path.strokeColor = strokeColor;
              clonedPath.strokeColor = initStyles.sColor;  // SoftRainbow
            }

            if (initStyles.renderStyle == 'normal') {
              clonedPath.strokeColor = initStyles.sColor;;
            }
            if (initStyles.renderStyle == 'inverted') {
              clonedPath.strokeColor = invertedColor;
            }

            if (initStyles.renderStyle == 'negative') {
              path.strokeColor = invertedColor;
              clonedPath.strokeColor = initStyles.bStroke;
            }

            if (initStyles.renderStyle == 'negativeRainbow') {
              clonedPath.strokeColor.hue += (2 * angle * i) 
              path.strokeColor = invertedColor;
            }

            if (initStyles.faded) {
              clonedPath.strokeWidth = 1 / (clones / window.innerWidth + i * sfactor);
            }
            if (initStyles.blendStyle) {
              clonedPath.blendMode = initStyles.blendStyle;
            }

         
            if (initStyles.dashType == "dashed-rotate") {
              clonedPath.dashArray = [3, angle * i]
            }

            if (initStyles.dashType == "dashed-fade") {
              clonedPath.dashArray = [3, i / 2]
            }
            if (initStyles.dashType == "dashed") {
              clonedPath.dashArray = [3, Math.PI * initStyles.sWidth]
            }

            if (initStyles.dashType == "dotted") {
              clonedPath.dashArray = [initStyles.sWidth, Math.PI * initStyles.sWidth]
            }


            if (initStyles.dashType == "dotted-fade") {
              clonedPath.dashArray = [initStyles.sWidth, i / 2]
            }
             if (initStyles.dashType == "dotted-rotate") {
              clonedPath.dashArray = [initStyles.sWidth, angle * i]
            }
            
            if (initStyles.offsetType == "fib") {
              clonedPath.position.x += fibonacci(i) / Math.PI * (i) * sfactor
              clonedPath.position.y += fibonacci(i) / Math.PI * (i) * sfactor
            }
      
            if (initStyles.filledBool) {
              clonedPath.fillColor = initStyles.fillColor;
              clonedPath.fillColor.hue += Math.random() * 360;
            }

            clonedPath.rotate(angle * i * (angle / sfactor), (circleArea.center));  //path.bounds.topLeft

            if (initStyles.fractalBool) {
              for(j = 0; j < clones; j++) {
                fractalclonedPath = clonedPath.clone();
                fractalGroup.addChild(fractalclonedPath);
                fractalclonedPath.scale((sfactor * j) / i);
                fractalclonedPath.rotate(angle * j * (angle / sfactor), clonedPath.position)
              }
            }          
            } 

            if (initStyles.outlined == "normal") {
              path.strokeColor = '#000000';
              path.strokeWidth = 3 * initStyles.sWidth;
            }
            if (initStyles.outlined == "normal-inherit") {
              path.strokeColor = initStyles.sColor;
              path.strokeWidth = 3 * initStyles.sWidth;
            }


             if (initStyles.outlined == "light") {
              path.strokeColor = '#000000';
              path.strokeWidth = initStyles.sWidth;
            }
           
            if (initStyles.outlined == "light-inherit") {
              path.strokeColor = initStyles.sColor;
              path.strokeWidth = initStyles.sWidth;
            }
            if (initStyles.outlined == "lighter") {
              path.strokeColor = '#000000';
              path.strokeWidth = 1 / initStyles.sWidth * sfactor;
            }
           
            if (initStyles.outlined == "lighter-inherit") {
              path.strokeColor = initStyles.sColor;
              path.strokeWidth = 1 / initStyles.sWidth * sfactor;
            }
            fractalGroup.visible = true;
            path.visible = initStyles.vPathBool;
            fractalized = true; 
       
       }

      if(event.key == 'shift') {
        if(shiftKeyToggled == false && pKeyToggled == false) {
          shiftKeyToggled = true;
          fractalGroup.visible = false;
          path.visible = false;

        } if (shiftKeyToggled == false && pKeyToggled == true) {
          shiftKeyToggled = true;
          fractalGroup.visible = false;
          path.visible = true;
          pKeyToggled = false;
        }
        else if (shiftKeyToggled == true && pKeyToggled == false) {
          shiftKeyToggled = false;
          fractalGroup.visible = true;
          path.visible = true;  
        }
        else if (shiftKeyToggled == true && pKeyToggled == true) {
          shiftKeyToggled = false;
          fractalGroup.visible = true;
          path.visible = false;
          pKeyToggled = false;  
        } 
      
      }

      if(event.key == "z") {
        view.scale(1.17, view.center);
      }
      if(event.key == "x") {
        view.scale(0.83, view.center);
      }

      if(event.key == 'c'){
        group.remove();
        clonedPath.remove();
        fractalGroup.remove();
        project.clear();
        console.log("Canvas Cleared!")
        group = new paper.Group();
        circleGroup = new paper.Group(); 
        fractalized = false;
      }

     /* if(event.key == 'r'){
        if (rKeyToggled == false) {
          view.onFrame = (event) => {
            group.rotate(2); 
          }
          rKeyToggled = true;
        }
        else if (rKeyToggled == true) {
          view.onFrame = (event) => {
            group.rotate(0);
          }
          rKeyToggled = false;
        }
      }*/

     if(event.key == 'b'){
        if (bKeyToggled == false) {
          view.onFrame = (event) => {
            group.style = boldShapes;
            if (fractalized == true) {
              fractalGroup.style = boldShapes}
            }
            bKeyToggled = true
      }
        else if (bKeyToggled == true) {
          view.onFrame = (event) => {
            group.style = regShapes;
            if (fractalized == true) {
              fractalGroup.style = fractal}
            }
          bKeyToggled = false;
      }
    }
    if(event.key == 'f') {
        if (fKeyToggled == false) {
          group.fillColor = initStyles.fillColor;
          if (fractalized == true) {
              fractalGroup.fillColor = initStyles.fillColor;
            }
            fKeyToggled = true;
        }
      
        else if (fKeyToggled == true) {
          group.fillColor = "transparent";
          if (fractalized == true) {
            fractalGroup.fillColor = "transparent";
          }
          fKeyToggled = false;  
      }  
    }

    if (event.key == 'p') {
      if (pKeyToggled == false) {
          path.visible = true;
          pKeyToggled = true;
        } else if (pKeyToggled == true) {
          path.visible = false;
          pKeyToggled = false;
        }
    }

     /* SVG EXPORT IS BUGGY */
     
     document.getElementById("downloadToSVG").onclick = function(){
     var bgExport = new Path.Rectangle({
       point: [0, 0],
       size: [canvas.width / 2, canvas.height / 2],
       selected: false
     });

     bgExport.sendToBack();
     bgExport.fillColor = "transparent";
     //exportGroup.addChild(fractalGroup);
     //exportGroup.addChild(group)
     fileName = "Shape.svg"
     var url = "data:image/svg+xml;utf8," + encodeURIComponent(paper.project.exportSVG({asString:true}));
     var serializer = new XMLSerializer();
     var svg = paper.project.exportSVG();
     var svg_string = serializer.serializeToString(svg);

     var blob = new Blob(
        [svg_string],
        {type: "image/svg+xml;charset="+svg.characterSet}
      );
     saveAs(blob, fileName);

     bgExport.remove();
    } 

    PNGbutton = document.getElementById("downloadToPNG");
      PNGbutton.onclick = function(){
      canvas.style.backgroundColor = "transparent";

      if (bgColor || bgColor != 'transparent') {
       var bgExport = new Path.Rectangle({
         point: [0, 0],
         size: [canvas.width / 2, canvas.height / 2],
         selected: false,
         fillColor: bgColor
       });
       bgExport.sendToBack();
     }

     paper.view.draw();
     var filename = "Shape.png"
     var exportImg = new Image();
     exportImg.src ='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';

     context.drawImage(exportImg, 0,0);

     canvas.toBlob(function(blob) {
     saveAs(blob, filename);
     }, "image/png");
     canvas.style.backgroundColor = "white";

    if (bgColor || bgColor != 'transparent') {
     bgExport.remove();
    }}

    }}

)}}



function fibonacci(num){
  var a = 1, b = 0, temp;

  while (num >= 0){
    temp = a;
    a = a + b;
    b = temp;
    num--;
  }

  return b;
}

/* Hex converter from Stack overflow */
function invertColor(hex) {
    hex = hex.replace(/"/g,"")
    console.log(hex)
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    // invert color components
    var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
        g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
        b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
    // pad each with zeros and return
    return '#' + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}


/* Modified Fade In-Out -- Original from Ibu*/
function unfade(element, time) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.01;
    }, time);
}

function fade(element, time) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.0){
            clearInterval(timer);
            element.style.display = 'none';
            element.style.zIndex = "-10";
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.01;
    }, time);
}


const getValues = (id) => {
    elem = document.getElementById(id);
    var value;
    if (elem.type == 'checkbox') {
        if (elem.checked) {
            value = true;
        }
        else {
            value = false;
        }
 
    }
    else if (elem.type != 'checkbox') {
        value = elem.value; 
    }
    return value
};

const currentProperties = () => {
    materialProps = {
        'Stroke Color' : getValues('strokeColor'),
        'Stroke Width' : getValues('strokeWidth'),
        'Secondary Color' : getValues('boldStrokeColor'),
        'Fill Color' : getValues('fillColor'),
        'Iterations' : getValues('loops'),
        'Visible Path' : getValues('visiblePath'), 
        'ScaleFactor' : getValues('sfactor'), 
        'Loop Material' : getValues('loopMode'), 
        'Golden Ratio' : getValues('golden'), 
        'Fractal?': getValues('fractalBool'), 
        'Blend Style' : getValues('blendStyle'),
        'Offset' : getValues('offset'), 
        'Fade' : getValues('fade'), 
        'Style' : getValues('loopMaterialShape'),
        'Export BG Color' : getValues('bgColor'),
    }
    return materialProps
}




