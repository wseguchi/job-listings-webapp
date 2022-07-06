function getDataInfo(dataType, dataValue) {
	cardList = document.querySelectorAll('[data-' + dataType + ']');
	for (card of cardList) {
		attribute = card.getAttribute('data-' + dataType);
		attributeList = attribute.split(' ');
		if (!attributeList.includes(dataValue)) {
			card.classList.add("inactive");
		}
	}
}

function clearAllFilters() {
	inactiveDivs = document.getElementsByClassName('inactive');
	while (inactiveDivs.length > 0) {
		for (div of inactiveDivs) {
			div.classList.remove('inactive');
		}
	}
}