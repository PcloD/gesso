# gesso

In art, gesso is a white, paint-like substance used to prepare a canvas for painting.

The Gesso library prepares an HTML5 canvas for drawing and animating. Gesso can create a new canvas and add it to the DOM, or can be attached to an existing canvas.

### Usage:

Create a new instance of Gesso with a full screen canvas attached to document.body:
  
  var gesso = Gesso.create();
  
Or create a new instance with a specified size, appended to a specified parent.

  var gesso = Gesso.create(0, 0, 200, 200, someDiv);
  
Attach gesso to an existing canvas by direct reference:

  var gesso = Gesso.attach(myCanvasElement);
  
Attach gesso to an existing canvas by its id:

  var gesso = Gesso.attach("myCanvasId");
  
Draw a square in the center of the canvas:
  
  gesso.context.fillRect(gesso.width / 2 - 50, gesso.height / 2 - 50, 100, 100);
  
Set up for animation:

  var x = 0;
  gesso.onRender = function() {
    this.fillRect(x, this.height / 2, 50, 50);
    x++;
  };
  gesso.play();


