resizer();

$(window).resize(function() {
	resizer();
});

var resizer = function() {
	var pageWidth = $("#header").width();

	if ( pageWidth >= 980 ) {
		var margin = parseInt( $(".project").css("margin-left") ) + parseInt( $(".project").css("margin-right") );
		var tileWidth = $(".project").width() + margin + 5;
		var numTiles = Math.floor(pageWidth / tileWidth);

		$("#projects").width( (numTiles * tileWidth) );
	} else {
		$("#projects").width( pageWidth - 20 );
	}
}