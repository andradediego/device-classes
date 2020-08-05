// jQuery(function($){	
// 	$("#ip-replacement-cost").mask("999999.99");
// });

$(function() {
	// block update button
	blockUpdateButton();

	// add new object general
	$('.btn-new').on('click', function (e) {
		$('#row-forms, #btn-create').removeClass('hide-element');
		$('#row-objects, #btn-update').addClass('hide-element');	
		
		displayFields($(this));

		e.preventDefault();
	});


	// update object
	$('.btn-update').on('click', function (e) {
		$('#row-forms, #btn-update').removeClass('hide-element');
		$('#row-objects, #btn-create').addClass('hide-element');
		displayFields($(this));

		let index;
		let item;

		if ($(this).hasClass('video-device')) {
			index = parseInt($('#data-video-device').attr('data-index'));
			item = videoDevices[index];

			$('#ip-replacement-cost').val(item.replacementCost);
			$('#ip-supplier-name').val(item.supplierName);
			$('#ip-serial-number').val(item.serialNumber);
			$('#ip-enabled').val(item.status ? 'yes' : 'no');

			$('#ip-resolution').val(item.resolution);
			$('#ip-type').val(item.type);

		} else if ($(this).hasClass('hard-disk-device')) {
			index = parseInt($('#data-hard-disk-device').attr('data-index'));
			item = hardDiskDevices[index];

			$('#ip-replacement-cost').val(item.replacementCost);
			$('#ip-supplier-name').val(item.supplierName);
			$('#ip-serial-number').val(item.serialNumber);
			$('#ip-enabled').val(item.status ? 'yes' : 'no');

			$('#ip-size').val(item.size);
			$('#ip-transfer-rate').val(item.transferRate);
		
			$('#ip-platter-size').val(item.platterSize);
			$('#ip-number-of-platters').val(item.numberOfPlatters);
			
		} else if ($(this).hasClass('ssd-device')) {
			index = parseInt($('#data-ssd-device').attr('data-index'));
			item = ssdDevices[index];

			$('#ip-replacement-cost').val(item.replacementCost);
			$('#ip-supplier-name').val(item.supplierName);
			$('#ip-serial-number').val(item.serialNumber);
			$('#ip-enabled').val(item.status ? 'yes' : 'no');

			$('#ip-size').val(item.size);
			$('#ip-transfer-rate').val(item.transferRate);

			$('#ip-type-ssd').val(item.type),
			$('#ip-wear-leveling').val(item.wearLeveling ? 'yes' : 'no');
		}

		blockUpdateButton();
		e.preventDefault();
	});

	$('.btn-prev').on('click', function (e) {		
		if ($(this).hasClass('video-device')) {
			checkFirstItem ('video-device', videoDevices);			

		} else if ($(this).hasClass('hard-disk-device')) {
			checkFirstItem ('hard-disk-device', hardDiskDevices);
			
		} else if ($(this).hasClass('ssd-device')) {
			checkFirstItem ('ssd-device', ssdDevices);
		}

		e.preventDefault();
	});


	$('.btn-next').on('click', function (e) {
	
		if ($(this).hasClass('video-device')) {
			checkLastItem('video-device', videoDevices);			

		} else if ($(this).hasClass('hard-disk-device')) {
			checkLastItem('hard-disk-device', hardDiskDevices);
			
		} else if ($(this).hasClass('ssd-device')) {
			checkLastItem('ssd-device', ssdDevices);

		}

		e.preventDefault();
	});


	// create new object form
	$('#btn-create').on('click', (e) => {
		let device = $('#row-forms').attr('data-form-active');

		switch (device) {
			case 'video-device':
				videoDevices.push(
					//(replacementCost, supplierName, serialNumber, resolution, type)
					new VideoDevice(
						parseFloat($('#ip-replacement-cost').val()),
						$('#ip-supplier-name').val(),
						$('#ip-serial-number').val(),
						$('#ip-resolution').val(),
						$('#ip-type').val()
					)
				);

				setupData(videoDevices, 'video-device');
				break;

			case 'hard-disk-device':
				hardDiskDevices.push(					
					new HardDisk(
						// (replacementCost, supplierName, serialNumber, size, transferRate, platterSize, numberOfPlatters)
						parseFloat($('#ip-replacement-cost').val()),
						$('#ip-supplier-name').val(),
						$('#ip-serial-number').val(),
						
						$('#ip-size').val(),
						$('#ip-transfer-rate').val(),
		
						$('#ip-platter-size').val(),
						parseInt($('#ip-number-of-platters').val())
					)
				);

				setupData(hardDiskDevices, 'hard-disk-device');
				break;

			case 'ssd-device':
				ssdDevices.push(					
					new SSD(
						// (replacementCost, supplierName, serialNumber, size, transferRate, type, wearLeveling)
						parseFloat($('#ip-replacement-cost').val()),
						$('#ip-supplier-name').val(),
						$('#ip-serial-number').val(),
						
						$('#ip-size').val(),
						$('#ip-transfer-rate').val(),
		
						$('#ip-type-ssd').val(),
						$('#ip-wear-leveling').val() == 'yes' ? true : false
					)
				);

				setupData (ssdDevices, 'ssd-device');
				break;
		}
		$('#btn-cancel').trigger('click');
		e.preventDefault();
	});

	// update item on form
	$('#btn-update').on('click', (e) => {
		let device = $('#row-forms').attr('data-form-active');
		let index;
		let item;
		switch (device) {
			case 'video-device':
				index = $('#data-video-device').attr('data-index');
				item = videoDevices[index];

				item.replacementCost = parseFloat($('#ip-replacement-cost').val());
				item.supplierName = $('#ip-supplier-name').val();
				item.serialNumber = $('#ip-serial-number').val();
				$('#ip-enabled').val() == 'yes' ? item.enabled() : item.disabled();

				item.resolution = $('#ip-resolution').val();
				item.type = $('#ip-type').val();

				updateValuesPanel(item, $('#prot-video-device'), $('#data-video-device'), videoDevices.indexOf(item));
				break;
			case 'hard-disk-device':
				index = $('#data-hard-disk-device').attr('data-index');
				item = hardDiskDevices[index];

				item.replacementCost = parseFloat($('#ip-replacement-cost').val());
				item.supplierName = $('#ip-supplier-name').val();
				item.serialNumber = $('#ip-serial-number').val();
				$('#ip-enabled').val() == 'yes' ? item.enabled() : item.disabled();

				item.size = $('#ip-size').val();
				item.transferRate = $('#ip-transfer-rate').val();

				item.platterSize = $('#ip-platter-size').val();
				item.numberOfPlatters = parseInt($('#ip-number-of-platters').val());				

				updateValuesPanel(item, $('#prot-hard-disk-device'), $('#data-hard-disk-device'), hardDiskDevices.indexOf(item));				
				
				break;
			case 'ssd-device':
				index = $('#data-ssd-device').attr('data-index');
				item = ssdDevices[index];

				item.replacementCost = parseFloat($('#ip-replacement-cost').val());
				item.supplierName = $('#ip-supplier-name').val();
				item.serialNumber = $('#ip-serial-number').val();
				$('#ip-enabled').val() == 'yes' ? item.enabled() : item.disabled();

				item.size = $('#ip-size').val();
				item.transferRate = $('#ip-transfer-rate').val();

				item.type = $('#ip-type-ssd').val();
				item.wearLeveling = $('#ip-wear-leveling').val() == 'yes' ? true : false;

				updateValuesPanel(item, $('#prot-ssd-device'), $('#data-ssd-device'), ssdDevices.indexOf(item));
				break;
		}
		
		$('#btn-cancel').trigger('click');
		e.preventDefault();
	});

	// cancel form
	$('#btn-cancel').on('click', (e) => {
		$('#row-objects').removeClass('hide-element');	
		$('#row-forms').addClass('hide-element');

		// default values
		$('#ip-replacement-cost').val('');
		$('#ip-supplier-name').val('');
		$('#ip-serial-number').val('');						
		$('#ip-enabled').val('yes');

		$('#ip-resolution').val('');
		$('#ip-type').val('LCD');
		
		$('#ip-size').val('');
		$('#ip-transfer-rate').val('');
		
		$('#ip-platter-size').val('');
		$('#ip-number-of-platters').val('');

		$('#ip-type-ssd').val('Flash');
		$('#ip-wear-leveling').val('yes');

		blockUpdateButton();
		e.preventDefault();
	})
});

function setupData (dataArray, device) {
	let lastObjectAdded = dataArray[dataArray.length - 1];

	$('#ip-enabled').val() == 'yes' ? lastObjectAdded.enabled() : lastObjectAdded.disabled();

	updateValuesPanel(lastObjectAdded, $('#prot-' + device), $('#data-' + device), dataArray.indexOf(lastObjectAdded));
}


// update objects in panel
function updateValuesPanel (item, protype, destination, itemIndex) {
	destination.empty();
	let elementBase = protype.html();
	let objKeys = Object.keys(item);	
	for (let i = 0; i < objKeys.length; i++) {
		let key = objKeys[i].substr(1, objKeys[i].length - 1);
		switch (key) {
			case 'status':
			case 'wearLeveling':
				elementBase = elementBase.split('[' + key + ']').join(item[key] ? 'Yes' : 'No');
				break;
		
			default:
				elementBase = elementBase.split('[' + key + ']').join(item[key]);
				break;
		}

	}

	destination.attr('data-index', itemIndex);
	destination.append(elementBase);
};


// block update button if no objects to update
function blockUpdateButton() {
	if (videoDevices.length == 0) {
		$('button.btn-update.video-device, button.btn-next.video-device, button.btn-prev.video-device')
			.attr('disabled', 'disabled');
	} else {
		$('button.btn-update.video-device, button.btn-next.video-device, button.btn-prev.video-device')
			.removeAttr('disabled');
	}

	if (hardDiskDevices.length == 0) {
		$('button.btn-update.hard-disk-device, button.btn-next.hard-disk-device, button.btn-prev.hard-disk-device')
			.attr('disabled', 'disabled');
	} else {
		$('button.btn-update.hard-disk-device, button.btn-next.hard-disk-device, button.btn-prev.hard-disk-device')
			.removeAttr('disabled');
	}

	if (ssdDevices.length == 0) {
		$('button.btn-update.ssd-device, button.btn-next.ssd-device, button.btn-prev.ssd-device')
			.attr('disabled', 'disabled');
	} else {
		$('button.btn-update.ssd-device, button.btn-next.ssd-device, button.btn-prev.ssd-device')
			.removeAttr('disabled');
	}
}

//display the proper fields of each form
function displayFields (button) {
	if (button.hasClass('video-device')) {
		$('div.ip-base, div.ip-video-device').removeClass('hide-element');
		$('div.ip-device, div.ip-hard-disk-device, div.ip-ssd-device').addClass('hide-element');

		$('#row-forms').attr('data-form-active', 'video-device');
	} else if (button.hasClass('hard-disk-device')) {			
		$('div.ip-base, div.ip-device, div.ip-hard-disk-device').removeClass('hide-element');
		$('div.ip-video-device, div.ip-ssd-device').addClass('hide-element');

		$('#row-forms').attr('data-form-active', 'hard-disk-device');
	} else if (button.hasClass('ssd-device')) {
		$('div.ip-base, div.ip-device, div.ip-ssd-device').removeClass('hide-element');
		$('div.ip-video-device, div.ip-hard-disk-device').addClass('hide-element');

		$('#row-forms').attr('data-form-active', 'ssd-device');
	}
}


function checkLastItem (device, arrayData) {
	let index = parseInt($('#data-' + device).attr('data-index')) + 1;
			
	if (index < arrayData.length) {
		item = arrayData[index];
		updateValuesPanel(item, $('#prot-' + device), $('#data-' + device), arrayData.indexOf(item));
	} else {
		alert('You have reached the last item!');
	}
}

function checkFirstItem (device, arrayData) {
	let index = parseInt($('#data-' + device).attr('data-index')) - 1;
			
	if (index >= 0 && index < arrayData.length) {
		let item = arrayData[index];
		updateValuesPanel(item, $('#prot-' + device), $('#data-' + device), arrayData.indexOf(item));
	} else {
		alert('You have reached the first item!');
	}
}