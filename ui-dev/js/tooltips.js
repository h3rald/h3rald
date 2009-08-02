var dark_tip = { 
		style: { background:'#222222',
						 color: '#cccccc',
						 border: {
						 	width: 1,
							radius: 6,
							color: '#222222'
						 },
						 tip: true },
		position: {
			corner: {
			target: 'center',
			tooltip: 'bottomLeft'
			}
		}
};

var extended_tip = {
	hide: {when: 'mouseout', fixed: true}, 
	style: { background:'#222222',
						 color: '#cccccc',
						 width: 600,
						 border: {
						 	width: 1,
							radius: 6,
							color: '#222222'
						 },
						 tip: true },
	position: {
		corner: {
		target: 'center',
		tooltip: 'bottomLeft'
		}
	}
}
