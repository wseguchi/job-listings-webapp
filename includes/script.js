let data;

document.addEventListener("DOMContentLoaded", function(e) {

	async function getDataAsync() {
		let response = await fetch('data.json');
		data = await response.json();
		return data;
	}

	getDataAsync()
		.then(data => loadMainDiv());
});

function loadMainDiv() {

	for (let i = 0; i < data.length; i++) {

		// Inject HTML into Main DIV
		document.getElementById('main').innerHTML += `<div id="${data[i].id}" class="card" data-role="${data[i].role.toLowerCase()}" data-level="${data[i].level.toLowerCase()}" data-language="languages" data-tools="tools"> <div class="card-description"> <div class="cd-img"> <img src="${data[i].logo}"> </div> <div class="cd-header"> <div class="cd-h-company-name">${data[i].company}</div> </div> <div class="cd-main">${data[i].position}</div> <div class="cd-bottom"> <div class="cd-b-date">${data[i].postedAt}</div> <div class="circle">&#9679;</div> <div class="cd-b-type">${data[i].contract}</div> <div class="circle">&#9679;</div> <div clas="cd-b-place">${data[i].location}</div> </div> </div> <div class="card-labels"></div> </div>`;

		// 'NEW' sticker
		if (data[i].new === true) {
			document.getElementsByClassName('cd-header')[i].innerHTML += '<div class="cd-h-new">New!</div>';
		};

		// 'FEATURED' sticker and left border
		if (data[i].featured === true) {
			document.getElementsByClassName('cd-header')[i].innerHTML += '<div class="cd-h-featured">Featured</div>';
			document.getElementsByClassName('card')[i].classList.add('featured');

		};

		// Label - Role
		document.getElementsByClassName('card-labels')[i].innerHTML += '<div class="label" onclick="getDataInfo(\'role\', \'' + data[i].role.toLowerCase() + '\')">' + data[i].role + '</div>';

		// Label - Level
		document.getElementsByClassName('card-labels')[i].innerHTML += '<div class="label" onclick="getDataInfo(\'level\', \'' + data[i].level.toLowerCase() + '\')">' + data[i].level + '</div>';

		// Label - Languages
		var languagesList = '';
		for (lang of data[i].languages) {
			languagesList = languagesList + lang.toLowerCase() + ' ';
			document.getElementsByClassName('card-labels')[i].innerHTML += '<div class="label" onclick="getDataInfo(\'language\', \'' + lang.toLowerCase() + '\')">' + lang + '</div>';
		};
		document.getElementsByClassName('card')[i].setAttribute('data-language', languagesList.trim());

		// Label - Tools
		var toolsList = '';
		for (tool of data[i].tools) {
			toolsList = toolsList + tool.toLowerCase() + ' ';
			document.getElementsByClassName('card-labels')[i].innerHTML += '<div class="label" onclick="getDataInfo(\'tools\', \'' + tool.toLowerCase() + '\')">' + tool + '</div>';
		};
		document.getElementsByClassName('card')[i].setAttribute('data-tools', toolsList.trim());
	};


}

function getDataInfo(dataType, dataValue) {
	var cardList = document.querySelectorAll('[data-' + dataType + ']');
	for (var card of cardList) {
		attribute = card.getAttribute('data-' + dataType);
		attributeList = attribute.split(' ');
		if (!attributeList.includes(dataValue)) {
			card.classList.add(dataType + '-inactive');
		}
	}
	document.getElementById('filter').classList.add('filter-box-transition');
	addLabeltoFilterBox(dataType, dataValue);
}


function clearAllFilters() {
	var inactiveDivs = document.getElementsByClassName('card');
	for (var div of inactiveDivs) {
		div.classList.remove('role-inactive');
		div.classList.remove('level-inactive');
		div.classList.remove('language-inactive');
		div.classList.remove('tools-inactive');
	}

	var container = document.getElementById('filter_labels_id');
	container.replaceChildren();
	document.getElementById('filter').classList.remove('filter-box-transition');
}


function addLabeltoFilterBox(dataType, dataValue) {
	var labelList = document.querySelectorAll('[data-f-' + dataType + '=' + dataValue + ']');
	if (labelList.length == 0) {
		if (dataValue == 'css' || dataValue == 'html') {
			var newLabel = '<div class="fl-button" data-f-' + dataType + '="' + dataValue + '" onclick="removeFilterAndLabel(\'' + dataType + '\', \'' + dataValue + '\')"><div class="fl-text">' + dataValue.toUpperCase() + '</div><div class="fl-close"><img src="./images/icon-remove.svg"></div></div>';
			document.getElementById('filter_labels_id').innerHTML += newLabel;
		} else {
			var newLabel = '<div class="fl-button" data-f-' + dataType + '="' + dataValue + '" onclick="removeFilterAndLabel(\'' + dataType + '\', \'' + dataValue + '\')"><div class="fl-text">' + dataValue + '</div><div class="fl-close"><img src="./images/icon-remove.svg"></div></div>';
			document.getElementById('filter_labels_id').innerHTML += newLabel;
		}
	}
}

function removeFilterAndLabel(dataType, dataValue) {
	console.log('Label clicado: ' + dataValue);

	var labelList = document.querySelectorAll('[data-f-' + dataType + ']');
	console.log('labelList: ' + labelList);

	var labelAttributeList = [];
	for (var label of labelList) {
		var attribute = label.getAttribute('data-f-' + dataType);
		labelAttributeList.push(attribute);
	}

	console.log('labelAtributeList: ' + labelAttributeList);
	var filteredLabelAttributeList = labelAttributeList.filter(function(e) {
		return e !== dataValue
	});
	console.log('atributeList removido valor clicado: ' + filteredLabelAttributeList);
	console.log(filteredLabelAttributeList.length);

	var cardList = document.getElementsByClassName('card');
	console.log('cardList:');
	console.log(cardList);

	for (var card of cardList) {

		console.log('Início do for!!! --------------------------')

		var cardAttribute = card.getAttribute('data-' + dataType);
		console.log('cardAttribute: ' + cardAttribute);

		var cardAttributeList = cardAttribute.split(' ');
		console.log('cardAttributeList: ' + cardAttributeList);

		// NOW: filteredLabelAttributeList x cardAttributeList!

		if (filteredLabelAttributeList.length > 0) {
			for (flAtt of filteredLabelAttributeList) {
				console.log('For dentro do For >>>');
				console.log('flAtt: ' + flAtt);
				console.log('cardAttributeList: ' + cardAttributeList);
				if (cardAttributeList.includes(flAtt)) {
					card.classList.remove(dataType + '-inactive');
				} else {
					card.classList.add(dataType + '-inactive');
				}
			}
		} else {
			if (!cardAttributeList.includes(dataValue)) {
				card.classList.remove(dataType + '-inactive');
			}
		}
	}

	var elementList = document.querySelectorAll('[data-f-' + dataType + '=' + dataValue + ']');
	for (var element of elementList) {
		element.remove();
	}

	if (document.getElementById('filter').textContent.trim() == 'Clear') {
		document.getElementById('filter').classList.remove('filter-box-transition');
	}
}

tippy('#filter', {
	content: 'Click on the lables to filter results!',
	offset: [-10, -100],
	placement: 'top-end',
	arrow: false,
	theme: 'green',
	showOnCreate: true,
	trigger: 'manual'
});