function tellFreeCell() {
	m = findFreeCell();
	alert(m[0] + '-' + m[1]);
}

function findFreeCell() {
	for (var i = 0; i < 4; i++) {
		for (j = 0; j < 4; j++) {
			if(document.getElementById('table').rows[i].cells[j].innerHTML == '') {
				m = [i,j];
				return m;
			}
		}
	}
}

function moveDown() {
	m = findFreeCell();
	var i = m[0];
	var j = m[1];
	if(i>0) {
		document.getElementById('table').rows[i].cells[j].innerHTML = document.getElementById('table').rows[i-1].cells[j].innerHTML;
		document.getElementById('table').rows[i-1].cells[j].innerHTML = '';
	} 
}

function moveUp() {
	m = findFreeCell();
	var i = m[0];
	var j = m[1];
	if(i<3) {
		document.getElementById('table').rows[i].cells[j].innerHTML = document.getElementById('table').rows[i+1].cells[j].innerHTML;
		document.getElementById('table').rows[i+1].cells[j].innerHTML = '';
	} 
}

function moveRight() {
	m = findFreeCell();
	var i = m[0];
	var j = m[1];
	if(j<3) {
		document.getElementById('table').rows[i].cells[j].innerHTML = document.getElementById('table').rows[i].cells[j+1].innerHTML;
		document.getElementById('table').rows[i].cells[j+1].innerHTML = '';
	} 
}

function moveLeft() {
	m = findFreeCell();
	var i = m[0];
	var j = m[1];
	if(j>0) {
		document.getElementById('table').rows[i].cells[j].innerHTML = document.getElementById('table').rows[i].cells[j-1].innerHTML;
		document.getElementById('table').rows[i].cells[j-1].innerHTML = '';
	} 
}

addEventListener('keydown', function(event) {
	if(event.keyCode == 39) {
		moveLeft();
	}
});

addEventListener('keydown', function(event) {
	if(event.keyCode == 38) {
		moveUp();
	}
});

addEventListener('keydown', function(event) {
	if(event.keyCode == 37) {
		moveRight();
	}
});

addEventListener('keydown', function(event) {
	if(event.keyCode == 40) {
		moveDown();
	}
});

function mix() {
	for (var i = 0; i < 100; i++) {
		var c = Math.random();
		if(c < 0.25) {
			moveDown();
		} else if(c < 0.5) {
			moveRight();
		} else if(c < 0.75) {
			moveUp();
		} else {
			moveLeft();
		}
	}
}