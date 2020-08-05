class Device {
	
	constructor(replacementCost, supplierName, serialNumber) {
		this._replacementCost = replacementCost;
		this._supplierName = supplierName;
		this._serialNumber = serialNumber;
		this._status = false;
	}
	
	set replacementCost(replacementCost){
		this._replacementCost = replacementCost;
	}
	
	get replacementCost(){
		return this._replacementCost;
	}


	set supplierName(supplierName){
		this._supplierName = supplierName;
	}
	
	get supplierName(){
		return this._supplierName;
	}


	set serialNumber(serialNumber){
		this._serialNumber = serialNumber;
	}
	
	get serialNumber(){
		return this._serialNumber;
	}

	get status(){
		return this._status;
	}

	enabled() {
		 this._status = true;
	}

	disabled() {
		this._status = false;
 	}
}


class VideoDevice extends Device {

	constructor(replacementCost, supplierName, serialNumber, resolution, type) {
		super(replacementCost, supplierName, serialNumber);
		this._resolution = resolution;
		this._type = type;
	}	

	set resolution(resolution){
		this._resolution = resolution;
	}
	
	get resolution(){
		return this._resolution;
	}

	set type(type){
		this._type = type;
	}
	
	get type(){
		return this._type;
	}
	
}


class DiskDevice extends Device {

	constructor(replacementCost, supplierName, serialNumber, size, transferRate) {
		super(replacementCost, supplierName, serialNumber);
		this._size = size;
		this._transferRate = transferRate;
	}	

	set size(size){
		this._size = size;
	}
	
	get size(){
		return this._size;
	}

	set transferRate(transferRate){
		this._transferRate = transferRate;
	}
	
	get transferRate(){
		return this._transferRate;
	}
	
}


class HardDisk extends DiskDevice {

	constructor(replacementCost, supplierName, serialNumber, size, transferRate, platterSize, numberOfPlatters) {
		super(replacementCost, supplierName, serialNumber, size, transferRate);
		this._platterSize = platterSize;
		this._numberOfPlatters = numberOfPlatters;
	}	

	set platterSize(platterSize){
		this._platterSize = platterSize;
	}
	
	get platterSize(){
		return this._platterSize;
	}

	set numberOfPlatters(numberOfPlatters){
		this._numberOfPlatters = numberOfPlatters;
	}
	
	get numberOfPlatters(){
		return this._numberOfPlatters;
	}
	
}


class SSD extends DiskDevice {

	constructor(replacementCost, supplierName, serialNumber, size, transferRate, type, wearLeveling) {
		super(replacementCost, supplierName, serialNumber, size, transferRate);
		this._type = type;
		this._wearLeveling = wearLeveling;
	}	

	set type(type){
		this._type = type;
	}
	
	get type(){
		return this._type;
	}

	set wearLeveling(wearLeveling){
		this._wearLeveling = wearLeveling;
	}
	
	get wearLeveling(){
		return this._wearLeveling;
	}
	
}