(function() {
	/**
	 * In art, gesso is a white, paint-like substance used to prepare a canvas for painting.
	 * The Gesso library prepares an HTML5 canvas for drawing and animating.
	 */
	var Gesso = {
		
		canvas: null,
		context: null,
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		parent: null,
		running: false,
		clearFrame: true,
		fps: 60,
		backgroundColor: null,

		////////////////////////////////////////
		// Public
		////////////////////////////////////////

		/**
		 * Creates and prepares a canvas and adds it to the DOM.
		 * x, y, w, h define size and position of created canvas. 
		 * Will default to 0, 0, window.innerWidth, window.innerHeight.
		 * parent is the element the canvas will be appended to. Defaults to document.body.
		 */
		create: function(x, y, w, h, parent) {
			var obj = Object.create(this);
			obj.init(x, y, w, h, parent);
			return obj;
		},

		/**
		 * Attaches the library to an existing canvas.
		 * canvas can be the id of a canvas element or a direct reference to a canvas element.
		 */
		attach: function(canvas) {
			var obj = Object.create(this);
			if(typeof canvas === "string") {
				this.initWithId(canvas);
			} 
			else {
				this.initWithCanvas(canvas);
			}
			return obj;
		},

		/**
		 * Clears the canvas. If backgroundColor is set, canvas is cleared to that color.
		 * Called automatically before onRender if clearFrame is true.
		 */
		clear: function() {
			if(this.backgroundColor) {
				this.context.save();
				this.context.fillStyle = this.backgroundColor;
				this.context.fillRect(0, 0, this.width, this.height);
				this.context.restore();
			}
			else {
				this.context.clearRect(0, 0, this.width, this.height);
			}
		},

		/**
		 * Resizes the canvas.
		 */
		setSize: function(w, h) {
			this.width = this.canvas.width = w;
			this.height = this.canvas.height = h;
		},

		/**
		 * Called when the canvas should be rendered. Override this to provide your own drawing code.
		 */
		onRender: function() {
			// overwrite
		},

		/**
		 * Starts an animation loop. onRender will be called continuously at a rate set by the fps property.
		 */
		play: function() {
			if(!this.running) {
				this.running = true;
				this.render();
			}
		},

		/**
		 * Stops the animation loop.
		 */
		stop: function() {
			this.running = false;
		},

		/**
		 * Toggles the animation loop off and on.
		 */
		togglePlay: function() {
			if(this.running) {
				this.stop();
			}
			else {
				this.play();
			}
		},

		/**
		 * Adds an event listener.
		 */
		on: function(event, callback) {
			if(event === "keyup" || event === "keydown") {
				document.addEventListener(event, callback);
			}
			else {
				this.canvas.addEventListener(event, callback);
			}
		},

		/**
		 * Removes and event listener.
		 */
		off: function(event, callback) {
			if(event === "keyup" || event === "keydown") {
				document.removeEventListener(event, callback);
			}
			else {
				this.canvas.removeEventListener(event, callback);
			}
		},

		/**
		 * Adds a keyup listener for the given keycode.
		 */
		keyup: function(keyCode, callback) {
			document.addEventListener("keyup", function(event) {
				if(event.keyCode === keyCode) {
					callback();
				}
			})
		},

		/**
		 * Adds a keydown listener for the given keycode.
		 */
		keydown: function(keyCode, callback) {
			document.addEventListener("keydown", function(event) {
				if(event.keyCode === keyCode) {
					callback();
				}
			})
		},

		/**
		 * If passed true, will toggle the animation loop off and on when the canvas is clicked.
		 */
		togglePlayOnClick: function(value) {
			if(value) {
				this.on("click", this.togglePlay);
			}
			else {
				this.off("click", this.togglePlay);
			}
		},

		/**
		 * If passed true, will toggle the animation loop off and on when the the space bar is pushed.
		 */
		togglePlayOnSpace: function(value) {
			if(value) {
				this.on("keyup", this.togglePlayOnSpaceHandler);
			}
			else {
				this.off("keyup", this.togglePlayOnSpaceHandler);
			}
		},


		////////////////////////////////////////
		// Internal
		////////////////////////////////////////
		togglePlayOnSpaceHandler: function(event) {
			if(event.keyCode === 32) {
				this.togglePlay();
			}
		},

		init: function(x, y, w, h, parent) {
			this.x = x || 0;
			this.y = y || 0;
			this.parent = parent || document.body;

			this.canvas = document.createElement("canvas");
			this.context = this.canvas.getContext("2d");
			this.width = this.canvas.width = w || window.innerWidth;
			this.height = this.canvas.height = h || window.innerHeight;

			this.canvas.style.display = "block";
			this.canvas.style.position = "absolute";
			this.canvas.style.left = this.x + "px";
			this.canvas.style.top = this.y + "px";

			this.parent.appendChild(this.canvas);
			this.bind();
		},

		bind: function() {
			this.render = this.render.bind(this);
			this.togglePlay = this.togglePlay.bind(this);
			this.togglePlayOnSpaceHandler = this.togglePlayOnSpaceHandler.bind(this);
		},

		initWithId: function(id) {
			var canvas = document.getElementById(id);
			if(!canvas || canvas.tagName.toLowerCase() !== "canvas") {
				throw new Error("The id '" + id + "' does not reference a Canvas element.");
			}
			else {
				this.initWithCanvas(canvas);
			}
		},

		initWithCanvas: function(canvas) {
			if(canvas instanceof HTMLElement && canvas.tagName.toLowerCase() === "canvas") {
				this.canvas = canvas;
				this.width = this.canvas.width;
				this.height = this.canvas.height;
				this.context = this.canvas.getContext("2d");
			}
			else {
				throw new Error("The parameter '" + canvas + "' does not appear to be a Canvas element");
			}
		},

		render: function() {
			if(this.clearFrame) {
				this.clear();
			}
			this.onRender();
			var self = this;
			if(this.running) {
				setTimeout(function() {
					requestAnimationFrame(self.render);
				}, 1000 / this.fps);
			}
		},



	};

	if(typeof define === "function" && define.amd) {
		define(Gesso);
	}
	else {
		window.Gesso = Gesso;
	}


})();