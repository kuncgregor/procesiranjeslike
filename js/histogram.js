let graf = new Chart("rdec", {
	type: "bar",
	data: {
		labels: ["0-50", "51-100", "101-150", "151-200", "201-255"],
		datasets: [{
			backgroundColor: "red"
		},
		{
			backgroundColor: "lime"
		},
		{
			backgroundColor: "blue"
		}]
	},
	options: {
		legend: { display: false },
	}
});

let histogramVrednosti = [
	[0,0,0,0,0],
	[0,0,0,0,0],
	[0,0,0,0,0]
]

function posodobiHistogram(hv){
	let img = ctx.getImageData(0, 0, canvas.width, canvas.height);
	let data = img.data;

	hv = [
		[0,0,0,0,0],
		[0,0,0,0,0],
		[0,0,0,0,0]
	]

	for(let i = 0; i < data.length; i += 4){
		for(let b = 0; b < 3; b++){
			if(data[i+b] < 51) {
				hv[b][0]++;
			}
			else if(data[i+b] < 101) {
				hv[b][1]++;
			}
			else if(data[i+b] < 151) {
				hv[b][2]++;
			}
			else if(data[i+b] < 201) {
				hv[b][3]++;
			}
			else {
				hv[b][4]++;
			}
		}
	}
	
	for(let b = 0; b < 3; b++){
		graf.data.datasets[b].data = hv[b];
	}
	graf.update();
}