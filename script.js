$(document).ready(function() {
	resizer();

	$(window).resize(function() {
		resizer();
	});
});

var resizer = function() {
	var pageWidth = $("#header").width();
	var margin = parseInt( $(".project").css("margin-left") ) + parseInt( $(".project").css("margin-right") );
	var tileWidth = $(".project").width() + margin + 5;

	if ( pageWidth >= 980 ) {
		var numTiles = Math.floor(pageWidth / tileWidth);

		$("#projects").width( (numTiles * tileWidth) );
	} else {
		$("#projects").width( pageWidth - 20 );
	}
}