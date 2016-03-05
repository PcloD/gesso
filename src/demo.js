define(["Gesso"], function(Gesso) {

    var gesso = Gesso.create();

    gesso.backgroundColor = "lightblue";
    gesso.fps = 30;

    var offset = 0;
    gesso.onRender = function() {
        // note that context, width, height, etc. can be accessed via "this", 
        // as the function is scoped to the gesso instance.
        this.context.beginPath();
        for(var i = 0; i < this.width; i++) {
            this.context.lineTo(i, 
                this.height / 2 - Math.sin(i * 0.01) * this.height * 0.3 + 
                Math.cos(i * 0.2 + offset) * 40);
        }
        this.context.stroke();
        offset -= 0.5;
    };

    gesso.play();
    gesso.togglePlayOnClick(true);



});