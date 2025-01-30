class Entry {
	displayed;
	brightness;
	
	constructor(id, displayed = true, brightness = 50) {
		this.id = id;
		this.displayed = displayed;
		this.brightness = brightness;
	}
	
	set setBrightness(val) {
		this.brightness = val;
	}
}

export default Entry;