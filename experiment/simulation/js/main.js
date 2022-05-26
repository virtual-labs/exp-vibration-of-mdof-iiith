//Your JavaScript goes in here

document.addEventListener('DOMContentLoaded', function(){

	const playButton = document.getElementById('play');
	const pauseButton = document.getElementById('pause');
	const restartButton = document.getElementById('restart');

	pauseButton.addEventListener('click', function() { window.clearTimeout(tmHandle); });
	playButton.addEventListener('click', function() { window.clearTimeout(tmHandle); tmHandle = setTimeout(draw, 1000 / fps); });
	restartButton.addEventListener('click', function() {restart();});

	function restart() 
	{ 
		window.clearTimeout(tmHandle); 

		bldg = [
			[[startx, height], [endx, height], [endx, 2 * height], [startx, 2 * height]],
			[[startx, 2 * height], [endx, 2 * height], [endx, 3 * height], [startx, 3 * height]],
			[[startx, 3 * height], [endx, 3 * height], [endx, 4 * height], [startx, 4 * height]]
		];

		ground = [
			[startx - 300, 4 * height + 40],
			[startx - 250, 4 * height - 40],
			[endx + 300, 4 * height - 40],
			[endx + 250 , 4 * height + 40],
		];

		a = -1 * m1 * m2 * m3;
		b = m1 * m2 * k3 + m1 * m3 * (k2 + k3) + m2 * m3 * (k1 + k2);
		c = k2 * k2 * m3 - m1 * k3 * (k3 + k2) - m2 * (k1 + k2) * k3 - m3 * (k1+ k2) * (k2 + k3) + m1 * k3 * k3;
		d = (k1 + k2) * (k2 + k3) * (k3) - k2 * k2 * k3 - k3 * k3 * (k1 + k2);

		lambda = CubicSolve(a, b, c, d);
		lambda.sort();

		if(mode == 1)
		{
			dirn = [1, 1, 1];
			speed = [1, 2, 3];
			timec = lambda[0].real;
		}
		else if(mode == 2)
		{
			dirn = [1, -1, -1];
			timec = lambda[1].real;
			speed = [1, 2, 1];
		}
		else
		{
			dirn = [1, -1, 1];
			timec = lambda[2].real;
		}

		timeperiod = 2 * Math.PI;
		root = Math.sqrt(timec);
		timeperiod /= root;
		timeperiod *= 50;

		tmHandle = window.setTimeout(draw, 1000 / fps); 
	}

	const slider_mass1 = document.getElementById("mass1");
	const output_mass1 = document.getElementById("demo_mass1");
	output_mass1.innerHTML = slider_mass1.value; // Display the default slider value

	slider_mass1.oninput = function() {
		output_mass1.innerHTML = this.value;
		m1 = Number(document.getElementById("mass1").value);
		restart();
	};

	const slider_mass2 = document.getElementById("mass2");
	const output_mass2 = document.getElementById("demo_mass2");
	output_mass2.innerHTML = slider_mass2.value; // Display the default slider value

	slider_mass2.oninput = function() {
		output_mass2.innerHTML = this.value;
		m2 = Number(document.getElementById("mass2").value);
		restart();
	};

	const slider_mass3 = document.getElementById("mass3");
	const output_mass3 = document.getElementById("demo_mass3");
	output_mass3.innerHTML = slider_mass3.value; // Display the default slider value

	slider_mass3.oninput = function() {
		output_mass3.innerHTML = this.value;
		m3 = Number(document.getElementById("mass3").value);
		restart();
	};

	const slider_stiffness1 = document.getElementById("stiffness1");
	const output_stiffness1 = document.getElementById("demo_stiffness1");
	output_stiffness1.innerHTML = slider_stiffness1.value; // Display the default slider value

	slider_stiffness1.oninput = function() {
		output_stiffness1.innerHTML = this.value;
		k1 = Number(document.getElementById("stiffness1").value);
		restart();
	};

	const slider_stiffness2 = document.getElementById("stiffness2");
	const output_stiffness2 = document.getElementById("demo_stiffness2");
	output_stiffness2.innerHTML = slider_stiffness2.value; // Display the default slider value

	slider_stiffness2.oninput = function() {
		output_stiffness2.innerHTML = this.value;
		k2 = Number(document.getElementById("stiffness2").value);
		restart();
	};

	const slider_stiffness3 = document.getElementById("stiffness3");
	const output_stiffness3 = document.getElementById("demo_stiffness3");
	output_stiffness3.innerHTML = slider_stiffness3.value; // Display the default slider value

	slider_stiffness3.oninput = function() {
		output_stiffness3.innerHTML = this.value;
		k3 = Number(document.getElementById("stiffness3").value);
		restart();
	};

	const slider_mode = document.getElementById("mode");
	const output_mode = document.getElementById("demo_mode");
	output_mode.innerHTML = slider_mode.value; // Display the default slider value

	slider_mode.oninput = function() {
		output_mode.innerHTML = this.value;
		mode = Number(document.getElementById("mode").value);
		restart();
	};

	function updateGround(ground, chg)
	{
		ground.forEach(g => {
			g[0] += chg;
		});
	}

	function drawGround(ctx, ground)
	{
		ctx.save();
		ctx.fillStyle = "pink";
		ctx.beginPath();
		ctx.moveTo(ground[0][0], ground[0][1]);

		for(let i = 0; i < ground.length; ++i)
		{
			const next = (i + 1) % ground.length;
			ctx.lineTo(ground[next][0], ground[next][1]);
		}

		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		ctx.restore();
	}

	let height = 120;

	let m1 = 2250;
	let m2 = 2250;
	let m3 = 2250;
	let k1 = 10364000;
	let k2 = 10364000;
	let k3 = 10364000;

	let a = -1 * m1 * m2 * m3;
	let b = m1 * m2 * k3 + m1 * m3 * (k2 + k3) + m2 * m3 * (k1 + k2);
	let c = k2 * k2 * m3 - m1 * k3 * (k3 + k2) - m2 * (k1 + k2) * k3 - m3 * (k1 + k2) * (k2 + k3) + m1 * k3 * k3;
	let d = (k1 + k2) * (k2 + k3) * (k3) - k2 * k2 * k3 - k3 * k3 * (k1 + k2);

	lambda = CubicSolve(a, b, c, d);
	lambda.sort();

	let timec = 1;
	let mode = 1;

	const canvas = document.getElementById("main");
	canvas.width = 1200;
	canvas.height = 600;
	const ctx = canvas.getContext("2d");

	const fill = "#A9A9A9";
	const border = "black";
	const lineWidth = 1.5;

	const fps = 20;
	let dirn = [];
	let speed = [];

	if(mode == 1)
	{
		dirn = [1, 1, 1];
		speed = [1, 2, 3];
		timec = lambda[0].real;
	}
	else if(mode == 2)
	{
		dirn = [1, -1, -1];
		timec = lambda[1].real;
		speed = [1, 2, 1];
	}
	else
	{
		dirn = [1, -1, 1];
		timec = lambda[2].real;
	}
	let timeperiod = 2 * Math.PI;
	let root = Math.sqrt(timec);
	timeperiod /= root;
	timeperiod *= 50;

	const startx = 500;
	const endx = 700;
	const thickness = 10;

	let bldg = [
		[[startx, height], [endx, height], [endx, 2 * height], [startx, 2 * height]],
		[[startx, 2 * height], [endx, 2 * height], [endx, 3 * height], [startx, 3 * height]],
		[[startx, 3 * height], [endx, 3 * height], [endx, 4 * height], [startx, 4 * height]]
	];

	let ground = [
		[startx - 300, 4 * height + 40],
		[startx-250, 4 * height - 40],
		[endx + 300, 4 * height - 40],
		[endx + 250 , 4 * height + 40],
	];

	function draw()
	{
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = fill;
		ctx.lineWidth = lineWidth;
		ctx.lineCap = "round";
		ctx.lineJoin = "round";

		if(dirn[0] == -1)
		{
			updateGround(ground, speed[0] / timeperiod);
		}
		else
		{
			updateGround(ground, -1 * speed[0] / timeperiod);
		}

		drawGround(ctx, ground);

		for(let k = 2; k >= 0; k--)
		{
			let v = bldg[k];
			let prev = bldg[k + 1];

			if(dirn[k] == -1)
			{
				v[0][0] -= speed[2 - k] / timeperiod;
				v[1][0] -= speed[2 - k] / timeperiod; 
				v[2][0] += speed[2 - k] / timeperiod;  
				v[3][0] += speed[2 - k] / timeperiod;  
			}

			else
			{
				v[0][0] += speed[2 - k] / timeperiod;  
				v[1][0] += speed[2 - k] / timeperiod;  
				v[2][0] -= speed[2 - k] / timeperiod;  
				v[3][0] -= speed[2 - k] / timeperiod;  
			}

			if(k != 2)
			{
				v[2][0] = prev[1][0];
				v[3][0] = prev[0][0];
			}

			if(k == 0) 
			{
				const rel = Math.abs(v[3][0] - v[0][0]);
				const deviation = 10;
				if(rel >= deviation) 
				{
					dirn[0] *= -1;
					dirn[1] *= -1;
					dirn[2] *= -1;
				}
			}

			ctx.beginPath();
			ctx.moveTo(v[0][0], v[0][1]);

			for(let i = 0; i < v.length; ++i)
			{
				const next = (i + 1) % v.length;
				ctx.lineTo(v[next][0], v[next][1]);
			}

			ctx.closePath();
			ctx.fill();
			ctx.font = "30px Arial";
			ctx.fillStyle = "black";
			ctx.fillText(k + 1, v[3][0] + 90, 190 + k * 120);
			ctx.stroke();

			ctx.fillStyle = fill;
			// upper curved area
			ctx.save();

			bldg[k] = v;
		}

		tmHandle = window.setTimeout(draw, 1000 / fps);
	}

	let tmHandle = window.setTimeout(draw, 1000 / fps);
})

function CubicSolve(a, b, c, d){

	b /= a;
	c /= a;
	d /= a;

	let discrim, q, r, dum1, s, t, term1, r13;

	q = (3.0 * c - (b * b)) / 9.0;
	r = -(27.0 * d) + b * (9.0 * c - 2.0 * (b * b));
	r /= 54.0;

	discrim = q * q * q + r * r;

	let roots = [ {real: 0, i: 0}, {real: 0, i: 0}, {real: 0, i: 0} ];

	term1 = (b / 3.0);

	if (discrim > 0) 
	{ // one root real, two are complex
		s = r + Math.sqrt(discrim);
		s = ((s < 0) ? -Math.pow(-s, (1.0 / 3.0)) : Math.pow(s, (1.0 / 3.0)));
		t = r - Math.sqrt(discrim);
		t = ((t < 0) ? -Math.pow(-t, (1.0 / 3.0)) : Math.pow(t, (1.0 / 3.0)));

		roots[0].real = -term1 + s + t;
		term1 += (s + t) / 2.0;
		roots[2].real = roots[1].real = -term1;
		term1 = Math.sqrt(3.0) * (-t + s) / 2;

		roots[1].i = term1;
		roots[2].i = -term1;
		return roots;
	} // End if (discrim > 0)

	// The remaining options are all real


	if (discrim == 0)
	{ // All roots real, at least two are equal.
		r13 = ((r < 0) ? -Math.pow(-r, (1.0 / 3.0)) : Math.pow(r, (1.0 / 3.0)));
		roots[0].real = -term1 + 2.0 * r13;
		roots[2].real = roots[1].real = -(r13 + term1);
		return roots;
	} // End if (discrim == 0)

	// Only option left is that all roots are real and unequal (to get here, q < 0)
	q = -q;
	dum1 = q * q * q;
	dum1 = Math.acos(r / Math.sqrt(dum1));
	r13 = 2.0 * Math.sqrt(q);

	roots[0].real = -term1 + r13 * Math.cos(dum1 / 3.0);
	roots[1].real = -term1 + r13 * Math.cos((dum1 + 2.0 * Math.PI) / 3.0);
	roots[2].real = -term1 + r13 * Math.cos((dum1 + 4.0 * Math.PI) / 3.0);

	return roots;
} 
