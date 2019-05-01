/*
* Version: 0.1.1
* Description: Slider by Matías Maximiliano Simone
* Author name: Matías Maximiliano Simone
* Author url: http://about.me/matias.maximiliano.simone
*/

// Esperamos a la carga de la página para empezar...
$(document).ready(function() {

	// declaramos slider como objeto javascript...
	var slider = {};

	// declaramos el envoltorio del slider como objeto javascript...
	var wrapper = {};

	// Declarando el id para buscar el elemento "ul":
	slider.initQuery = '#slider';

	// Declarando el id para buscar el elemento "div#wrapper":
	slider.initQueryW = '#wrapper';	

	// declarando variables iniciales...
	// seleccionamos el "ul" con jquery

	slider.slider = $(slider.initQuery + " ul,ul" + slider.initQuery);
	
	// seleccionamos el "div#wrapper" con jquery	
	wrapper.wrapper = $(slider.initQueryW + " div,div" + slider.initQueryW);

	// seleccionamos cada uno de sus "li"
	slider.slides = slider.slider.find('li');
	
	// Contamos el numero de "li" y por tanto slides que tenemos
	slider.number = slider.slides.length;
	
	// marcado para saber que slide estamos viendo, actualmente la primera, o sea la 0
	slider.actual = 0;
	
	// altura del slider... luego la calcularemos
	slider.height = 0;

	// anchura del slider... luego la calcularemos
	slider.width = 0;

	// seteamos visibles las flechas del slider
	slider.arrows = true;

	// seteamos un tamaño fijo para el alto del envoltorio del slider
	wrapper.height = 'auto';
	
	// seteamos un tamaño fijo para el ancho del envoltorio del slider
	wrapper.width = 'auto';

	// buscando ancho y alto de <li> máximos para calcular altura y anchura del slider...
	for ( i = 0; i < slider.number; i++) {
		var w = $(slider.slides[i]).width();
		var h = $(slider.slides[i]).height();
		slider.height = (h > slider.height  ) ? h : slider.height;
		slider.width = (w > slider.width  ) ? w : slider.width;
	}

	// formateando el css del <ul> contenedor, la caja del slider...
	slider.slider.css({
		overflow : "hidden",
		width : slider.width,
		height : slider.height,
		position : 'relative'
	});

	// formateando el css del <div> wrapper, el envoltorio del slider
	wrapper.wrapper.css({
		overflow : "hidden",
		width : wrapper.width,
		height : wrapper.height,
		position : 'relative'		
	});


	// colocando en posicion absoluta todos los <li> del slider, para poder ir haciendo las transiciones...
	for (var i = 0; i < slider.number; i++) {
		var sl = $(slider.slides[i]);
		sl.attr('class', sl.attr('class') + " slider-slide-" + i);
		sl.css({
			position : 'absolute',
			left : slider.width * i
		});

	}

	// funcion para moverse a un slide concreto...
	slider.go = function(where) {
		if (where == 'next') {
			slider.actual = (slider.actual < slider.number - 1) ? slider.actual * 1 + 1 : 0;
		} else if (where == 'prev') {
			slider.actual = (slider.actual > 0) ? slider.actual - 1 : slider.number - 1;
		} else {
			slider.actual = where;
		}

		for (var i = 0; i < slider.number; i++) {
			var sl = $(slider.slides[i]);
			sl.animate({
				left : slider.width * (i - slider.actual)
			}, 2000);
		}

	};

	// botones visibles u ocultos
	slider.styleDisplay = 'none';
	if(slider.arrows) {
		slider.styleDisplay = 'block';
	}

	// creando botones de siguiente y anterior...
	$(slider.initQuery).append("<a href='#next' class='slider-prev' style='" + slider.styleDisplay + "'>Anterior</a><a href='#next' class='slider-next' style='" + slider.styleDisplay + "'>Siguiente</a>");

	// asignando el evento a los botones de siguiente y anterior...
	$(slider.initQuery + " .slider-next").click(function() {
		slider.go('next');

		return false;
	});

	$(slider.initQuery + " .slider-prev").click(function() {
		slider.go('prev');

		return false;
	});

	// evento para el link que nos lleva al elemento 6 del slider...
	$('a.ir-al-elemento-6').click(function() {
		slider.go(6);
	});

	// cambiar el 4, por el número de segundos que desees.
	var autoSlider = setInterval(function() {
		slider.go('next');
	}, 4 * 1000);

}); 
