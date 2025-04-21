let _fps;

p5.prototype.createFPS = function({
	n = 60,
	showMinMax = false,
	showTarget = false,
	element = null,
	position = [10,10],
	label = "FPS ",
	dark = false,
	border = false,
}={}) {
	if(!element) {
		element = createSpan(label);
		element.style("font-family", "monospace");
	}

	if(position) {
		element.position(...position);
	}
	if(dark) {
		element.style("color", "white");
		element.style("background", "black");
	}
	if(border) element.style("border", "1px solid");

	_fps = {
		element,
		label,
		n,
		showMinMax,
		showTarget,
		samples: [],
		sum: 0,
		avg: NaN,
		min: Infinity,
		max: -Infinity,
	};

	return _fps;
};

p5.prototype.updateFPS = function(fps=null) {
	if(!fps) fps = _fps;

	const sample = frameRate();
	fps.samples.push(sample);
	fps.sum += sample;

	let recalcMin=false, recalcMax=false;
	if(fps.samples.length > fps.n) {
		const removed = fps.samples.shift();
		fps.sum -= removed;
		if(fps.showMinMax) {
			if(Math.abs(removed-fps.min) < 0.01) recalcMin = true;
			if(Math.abs(removed-fps.max) < 0.01) recalcMax = true;
		}
	}

	if(recalcMin || recalcMax) {
		let min=Infinity, max=-Infinity;
		for(let i=0; i<fps.samples.length; i++) {
			const s = fps.samples[i];
			if(s < min) min = s;
			if(s > max) max = s;
		}
		if(recalcMin) fps.min = min;
		if(recalcMax) fps.max = max;
	}

	if(fps.showMinMax) {
		if(sample < fps.min) fps.min = sample;
		if(sample > fps.max) fps.max = sample;
	}

	fps.avg = fps.sum / fps.samples.length;

	let html = fps.label ?? "";
	if(fps.showMinMax) {
		html += `${floor(fps.min)}-${round(fps.avg)}-${ceil(fps.max)}`;
	} else {
		html += round(fps.avg);
	}
	if(fps.showTarget) html += `/${getTargetFrameRate()}`;
	fps.element.html(html);
};
