var spreadsheetID = '1Ae_OFtVjZS57_N4m9KVvnAuIqFw3RdPdTA-5I26cNLU';
var url = 'https://spreadsheets.google.com/feeds/list/' + spreadsheetID + '/od6/public/values?alt=json';

$.getJSON(url, function(data) {
 
  var entry = data.feed.entry;
  var best = '';
  var hardest = '';
  var color = '';

  $(entry).each(function(){
  	best = this.gsx$best.$t;
  	hardest = this.gsx$hardest.$t;
  	color = this.gsx$color.$t;

    $('.best').append('<p style="color:' + color + '">' + best + '</p>');
    $('.hardest').append('<p style="color:' + color + '">' + hardest + '</p>');
  });
 
});
 