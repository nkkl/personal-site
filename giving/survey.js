var donorList = [];

var irlDonors = [];
var internetDonors = [];
var strangerDonors = [];

var irlPercentages = [];
var internetPercentages = [];
var strangerPercentages = [];

// grab the data
$.getJSON("https://spreadsheets.google.com/feeds/list/10yl4cQxdHsUh-D9RO8-Brc-YXFDeYJlHq1bvYJJOg3o/od6/public/values?alt=json-in-script&callback=?",
		function(data) {
			// parse JSON and push data into the list of grants
			for (i=0;i<data.feed.entry.length;i++) {
				var entry = data.feed.entry[i];
				var donor = {
					// pull out donor info
					income: entry["gsx$_cn6ca"].$t,
					donation: entry["gsx$_cokwr"].$t,
					friendship: entry["gsx$reallifefriends"].$t
				};

				donorList.push(donor);

				switch (donor.friendship) {
					case 'real life friends':
						irlDonors.push([parseInt(donor.income), parseInt(donor.donation)]);
						irlPercentages.push([parseInt(donor.income), Math.round(10000*parseInt(donor.donation)/parseInt(donor.income))/100]);
						break;
					case 'internet friends':
						internetDonors.push([parseInt(donor.income), parseInt(donor.donation)]);
						internetPercentages.push([parseInt(donor.income), Math.round(10000*parseInt(donor.donation)/parseInt(donor.income))/100]);
						break;
					case 'strangers':
						strangerDonors.push([parseInt(donor.income), parseInt(donor.donation)]);
						strangerPercentages.push([parseInt(donor.income), Math.round(10000*parseInt(donor.donation)/parseInt(donor.income))/100]);
						break;
				}
			}

	graphData();
});

var graphData = function() {
	// main scatterplot
	$('#scatter').highcharts({
		chart: {
			type: 'scatter',
			zoomType: 'xy'
		},
		title: {
			text: 'Donations by Income'
		},
		subtitle: {
			text: 'Source: <a href="http://goo.gl/forms/PVi3bJ2Ii6">personal survey</a>'
		},
		xAxis: {
			title: {
				enabled: true,
				text: 'Income (USD)'
			},
			min: 0,
			startOnTick: true,
			endOnTick: true,
			showLastLabel: true
		},
		yAxis: {
			title: {
				text: 'Donations (USD)'
			},
			min: 0
		},
		legend: {
			layout: 'vertical',
			align: 'left',
			verticalAlign: 'top',
			x: 100,
			y: 70,
			floating: true,
			backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
            borderWidth: 1
		},
		plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: '${point.x} earned, ${point.y} donated'
                }
            }
        },
        series: [{
        	name: 'real life friends',
        	color: 'rgba(255,0,0,.5)',
        	data: irlDonors,
        	marker: {
        		symbol: 'circle'
        	}
        },
        {
        	name: 'internet friends',
        	color: 'rgba(150,0,255,.5)',
        	data: internetDonors,
        	marker: {
        		symbol: 'circle'
        	}
        },
        {
        	name: 'strangers',
        	color: 'rgba(0,0,255,.5)',
        	data: strangerDonors,
        	marker: {
        		symbol: 'circle'
        	}
        }]
	});

	// income percentage donated scatterplot
	$('#percentage').highcharts({
		chart: {
			type: 'scatter',
			zoomType: 'xy'
		},
		title: {
			text: 'Percentage of Income Donated'
		},
		subtitle: {
			text: 'Source: <a href="http://goo.gl/forms/PVi3bJ2Ii6">personal survey</a>'
		},
		xAxis: {
			title: {
				enabled: true,
				text: 'Income (USD)'
			},
			min: 0,
			startOnTick: true,
			endOnTick: true,
			showLastLabel: true
		},
		yAxis: {
			title: {
				text: 'Percentage donated (%)'
			},
			min: 0,
			max: 100
		},
		legend: {
			layout: 'vertical',
			align: 'left',
			verticalAlign: 'top',
			x: 100,
			y: 70,
			floating: true,
			backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
            borderWidth: 1
		},
		plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: '${point.x} earned, {point.y}% donated'
                }
            }
        },
        series: [{
        	name: 'real life friends',
        	color: 'rgba(255,0,0,.5)',
        	data: irlPercentages,
        	marker: {
        		symbol: 'circle'
        	}
        },
        {
        	name: 'internet friends',
        	color: 'rgba(150,0,255,.5)',
        	data: internetPercentages,
        	marker: {
        		symbol: 'circle'
        	}
        },
        {
        	name: 'strangers',
        	color: 'rgba(0,0,255,.5)',
        	data: strangerPercentages,
        	marker: {
        		symbol: 'circle'
        	}
        }]
	});
}