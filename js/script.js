/**
 *	
 * Copyright (C) 2013 
 * author : Danilo Teixeira
 *
 */

!function( w, d ) {

	var persiana = d.querySelector("#persiana");
	var widthPersiana = persiana.offsetWidth;
	var janela = persiana.parentNode;
	var lengthSlice = 20;
	var widthSlice = widthPersiana / lengthSlice ;
	var hoverControl = false;
	var background = 0;
	var backgroundSize = janela.offsetWidth;
	var changeBackground = false;
	var rotatationSpeed = 5;
	var rotation = 0;
	var images = [];

	function init() {

		d.addEventListener("mouseover", mouseHover, false);
		w.addEventListener("mousewheel", mouseWheel, false);

		createSlice();
		createControl();
		searchImages();
		
		janela.style.background = "url(" + images[0] + ")";
		janela.style.backgroundSize = backgroundSize + "px";

	}

	function createSlice() {

		for( i = 0; i < lengthSlice; i++ ) {

			slicePervicana = d.createElement("div");
			slicePervicana.className = "slice";

			slicePervicana.setAttribute("style", "width:" + widthSlice  + "px;");

			persiana.appendChild(slicePervicana);

		}

	}

	function createControl() {

		var control = d.createElement("div");
		control.id = "control";

		persiana.appendChild(control);

	}

	function searchImages() {

		img  = janela.querySelectorAll("img");

		for( i = 0; i < img.length; i++ ) {
			images.push(img[i].src);
			img[i].style.display = "none";
		}
		
	}

	function backgroundJanela() {

		if( changeBackground ) {

			if( background >= images.length ) background = 0;

			janela.style.background = "url(" + images[background] + ")";
			janela.style.backgroundSize = backgroundSize + "px";

			background++;
			changeBackground = false;

		}
		
	}

	function rotateSlice(rotation) {

		var slices = [].slice.call( d.querySelectorAll(".slice") );
		
		slices.forEach( function(element, i) {
			element.style.WebkitTransform = "rotateY(" + rotation + "deg) perspective(800px)";
		} );

	}

	function mouseHover(e) {

		if( e.target.id == "control" ) {
			hoverControl = true;
		} else {
			hoverControl = false;
		}

	}

	function mouseWheel(e) { 

		if( !hoverControl ) return;

		e.preventDefault();
		
		var wheel = e.wheelDelta;
		

		if( wheel < 0) {

			if( rotation <= -82 ) {
				changeBackground = true;
				return;
			}

			rotation -= rotatationSpeed;

			rotateSlice(rotation);

		} else {

			if( rotation >= 0 ) {
				backgroundJanela();
				return;
			}

			rotation += rotatationSpeed;
		
			rotateSlice(rotation);

		}

	}

	init();

}( window, document );