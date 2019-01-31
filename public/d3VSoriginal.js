
var url = './data/olympicWinnersSmall.json';
var xhr = new XMLHttpRequest();

xhr.open('GET', url, true);
xhr.onload = function () {
var table = perspective.worker().table(JSON.parse(xhr.response));
	for (var el of document.getElementsByTagName('perspective-viewer')) {
    	el.load(table);
	}
}

xhr.send(null);