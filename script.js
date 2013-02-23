$(document).ready(function() {
	console.log("go")

	var pageWidth = $("#header").width();
	var tileWidth = $(".project").width();

	if ( pageWidth > 1100 ) {
		var numTiles = Math.floor(pageWidth / tileWidth);

		$("#projects").width(numTiles * tileWidth + 40);
	}
})