var irlColor = 'rgba(0,0,255,.6)';
var internetColor = 'rgba(0,150,255,.6)';
var strangerColor = 'rgba(0,255,255,.6)';

var donorList = [];

var irlDonors = [];
var internetDonors = [];
var strangerDonors = [];

var irlPercentages = [];
var internetPercentages = [];
var strangerPercentages = [];

var irlIncomeDistribution = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0]; // $0-400k range, by $25000s
var internetIncomeDistribution = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
var strangerIncomeDistribution = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];

var irlDonationDistribution = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0]; // $0-40k range, by $2500s
var internetDonationDistribution = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
var strangerDonationDistribution = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];

var irlPercentageDistribution = [0,0,0,0,0,0,0,0,0,0]; // 0-50% range, by 5s
var internetPercentageDistribution = [0,0,0,0,0,0,0,0,0,0];
var strangerPercentageDistribution = [0,0,0,0,0,0,0,0,0,0];

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

				// percentage of income donated
				var percentage = Math.round(10000*parseInt(donor.donation)/parseInt(donor.income))/100;

				donorList.push(donor);

				// capture relationship
				switch (donor.friendship) {
					case 'real life friends':
						irlDonors.push([parseInt(donor.income), parseInt(donor.donation)]);
						irlPercentages.push([parseInt(donor.income), percentage]);
						// capture income histogram
						irlIncomeDistribution[Math.ceil(donor.income/25000) - 1]++;
						// capture donation histogram
						irlDonationDistribution[Math.ceil(donor.donation/2500) - 1]++;
						// capture percentage histogram
						irlPercentageDistribution[Math.ceil(percentage/5) - 1]++;
						break;
					case 'internet friends':
						internetDonors.push([parseInt(donor.income), parseInt(donor.donation)]);
						internetPercentages.push([parseInt(donor.income), percentage]);
						// capture income histogram
						internetIncomeDistribution[Math.ceil(donor.income/25000) - 1]++;
						// capture donation histogram
						internetDonationDistribution[Math.ceil(donor.donation/2500) - 1]++;
						// capture percentage histogram
						internetPercentageDistribution[Math.ceil(percentage/5) - 1]++;
						break;
					case 'strangers':
						strangerDonors.push([parseInt(donor.income), parseInt(donor.donation)]);
						strangerPercentages.push([parseInt(donor.income), percentage]);
						// capture income histogram
						strangerIncomeDistribution[Math.ceil(donor.income/25000) - 1]++;
						// capture donation histogram
						strangerDonationDistribution[Math.ceil(donor.donation/2500) - 1]++;
						// capture percentage histogram
						strangerPercentageDistribution[Math.ceil(percentage/5) - 1]++;
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
        	color: irlColor,
        	data: irlDonors,
        	marker: {
        		symbol: 'circle'
        	}
        },
        {
        	name: 'internet friends',
        	color: internetColor,
        	data: internetDonors,
        	marker: {
        		symbol: 'circle'
        	}
        },
        {
        	name: 'strangers',
        	color: strangerColor,
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
			text: 'Percentage of Income Donated by Income'
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
        	color: irlColor,
        	data: irlPercentages,
        	marker: {
        		symbol: 'circle'
        	}
        },
        {
        	name: 'internet friends',
        	color: internetColor,
        	data: internetPercentages,
        	marker: {
        		symbol: 'circle'
        	}
        },
        {
        	name: 'strangers',
        	color: strangerColor,
        	data: strangerPercentages,
        	marker: {
        		symbol: 'circle'
        	}
        }]
	});

	// income histogram
    $('#incomehist').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Income (USD)'
        },
        xAxis: {
            categories: ['$0-25k', '$25-50k', '$50-75k', '$75-100k', '$100-125k', '$125-150k', '$150-175k', '$175-200k', '$200-225k', '$225-250k', '$250-275k', '$275-300k', '$300-325k', '$325-350k', '$350-375k', '$375-400k']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'People'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y + '<br/>' +
                    'Total: ' + this.point.stackTotal;
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0,
		        borderWidth: 0,
		        groupPadding: 0,
		        shadow: false,
                stacking: 'normal',
                dataLabels: {
                    enabled: false,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black'
                    },
                }
            }
        },
        series: [
        {
            name: 'strangers',
            color: strangerColor,
            data: strangerIncomeDistribution
        },
        {
            name: 'internet friends',
            color: internetColor,
            data: internetIncomeDistribution
        },
 		{
            name: 'real life friends',
            color: irlColor,
            data: irlIncomeDistribution
        }]
    });

	// donation histogram
    $('#donationhist').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Money Donated (USD)'
        },
        xAxis: {
            categories: ['$0-2.5k', '$2.5-5k', '$5-7.5k', '$7.5-10k', '$10-12.5k', '$12.5-15k', '$15-17.5k', '$17.5-20k', '$20-22.5k', '$22.5-25k', '$25-27.5k', '$27.5-30k', '$30-32.5k', '$32.5-35k', '$35-37.5k', '$37.5-40k']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'People'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y + '<br/>' +
                    'Total: ' + this.point.stackTotal;
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0,
		        borderWidth: 0,
		        groupPadding: 0,
		        shadow: false,
                stacking: 'normal',
                dataLabels: {
                    enabled: false,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black'
                    },
                }
            }
        },
        series: [
        {
            name: 'strangers',
            color: strangerColor,
            data: strangerDonationDistribution
        },
        {
            name: 'internet friends',
            color: internetColor,
            data: internetDonationDistribution
        },
 		{
            name: 'real life friends',
            color: irlColor,
            data: irlDonationDistribution
        }]
    });

	// percentage donated histogram
    $('#percentagehist').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Percentage of Income Donated'
        },
        xAxis: {
            categories: ['0-5%', '5-10%', '10-15%', '15-20%', '20-25%', '25-30%', '30-35%', '35-40%', '40-45%', '45-50%']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'People'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y + '<br/>' +
                    'Total: ' + this.point.stackTotal;
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0,
		        borderWidth: 0,
		        groupPadding: 0,
		        shadow: false,
                stacking: 'normal',
                dataLabels: {
                    enabled: false,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black'
                    },
                }
            }
        },
        series: [
        {
            name: 'strangers',
            color: strangerColor,
            data: strangerPercentageDistribution
        },
        {
            name: 'internet friends',
            color: internetColor,
            data: internetPercentageDistribution
        },
 		{
            name: 'real life friends',
            color: irlColor,
            data: irlPercentageDistribution
        }]
    });
}