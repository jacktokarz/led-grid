class Entry {
	displayed;
	brightness;
	color;
	
	constructor(id, displayed = true, brightness = 80, color = '#fbf9f9') {
		this.id = id;
		this.displayed = displayed;
		this.brightness = brightness;
		this.color = color;
	}
	
	set setBrightness(val) {
		this.brightness = val;
	}
	
	set setColor(val) {
		this.color = val;
	}
}

export default Entry;