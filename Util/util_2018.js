/*
	Author: stavzog,
	Name: Util.js
	Do you like it?
	tell me in the issues tab!
*/

var utilities = {
	nxtDay: ()=> {
		let week = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
		let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec']
		let currentDate = new Date()
		let day = week[currentDate.getUTCDay()+1];
		let date = currentDate.getUTCDate()+1;
		let month = months[currentDate.getUTCMonth()];
		let year = currentDate.getFullYear();
		let hours = currentDate.getUTCHours();
		let mins = currentDate.getUTCMinutes();
		let secs = currentDate.getUTCSeconds();
		let tomorrow = day +', '+date+' '+month+' '+year+' '+hours+':'+mins+':'+secs+' UTC';
		return tomorrow;
	},
	generateID: ()=>{
		let chars = '0123456789abcdefghijklmABCDEFGHIJKLM';
		let id = '';
		for (let i = 0; i < 7; i++) {
			id+=chars.charAt(Math.floor(Math.random()*chars.length-1));
		}
		return id;
	},
	cookie: {
		set:(key,val)=>{
			let expday = utilities.nxtDay()
			document.cookie = key + "=" + val + ";" + expday + ";path=/";
		},
		get:()=>{
			if (document.cookie.length!=0) {
				return document.cookie.split('=')[1];
			}
		},
		delete:key=>{
			document.cookie = `${key}=; expires=Tue, 08 Dec 2000 01:00:00 UTC;path=/`
		}
	},
	URLparams: {
		get: name=>{
			var url = new URL(window.location);
			console.log(url.searchParams)
			return url.searchParams.get(name);
		},
		set: (key,val)=>{
			// let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' +`${key}=${val}`;
			// window.history.replaceState(null,null,newurl)
			var url = new URL(window.location);
			url.searchParams.append(key,val);
			history.replaceState(null,null,url);
		},
		check: name=>{
			if (window.location.search.indexOf(name)<0) {
				return false
			} else {
				return true
			}
		},
		update: (key,val) => {
			var url = new URL(window.location);
			url.searchParams.set(key,val);
			history.replaceState(null,null,url);
		}
	},
	select:selector => {
		var elem = document.querySelector(selector);
		var hide = ()=>{
			elem.style.display = 'none';
		}
		var show = ()=>{
			elem.style.display = 'none';
		}
		var toggle = ()=>{
			if (elem.style.display === 'none') {
				elem.style.display = 'block';
			} else {
				elem.style.display = 'none';
			}
		}
		var append = html => {
			elem.innerHTML += html;
		}
		var on = (type,callback) => {
			elem['on'+type] = callback;
		}
	},
	keypressed: run => {
		// document.onkeypress = (evt) =>	{
		// 	run;
		// }
		setInterval(document.addEventListener('keypress',run),20);
	}

}
const util = utilities;

class Canvas {
	constructor(width,height) {
		this.width = width;
		this.height = height;
		this.canvas;
		this.ctx;
	}
	render() {
		document.body.innerHTML +='<canvas id="util-cnv"></canvas>'
		this.canvas = document.getElementById('util-cnv');
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.ctx = this.canvas.getContext('2d');
		this.color;
	}
	color(color='#333333') {
		this.color = color;
		this.ctx.fillStyle = this.color;
		this.ctx.fillRect(0,0,this.width,this.height);
	}
	sprite(x,y,width,height, color='#fff') {
		return new Sprite(x,y,width,height,color,this.canvas)
	}
	get element() {
		return this.canvas;
	}
	clear() {
		this.ctx.fillStyle = this.color;
		this.ctx.fillRect(0,0,this.width,this.height);
	}
	loop(content) {
		setInterval(()=>{
			this.clear()
			content();
		},20);
	}
}

class Sprite {
	constructor(x,y,width,height,color,cnv) {
		this.x = x;
		this.y = y;
		this.speedx = 0;
		this.speedy = 0;
		this.w = width;
		this.h = height;
		this.color = color;
		this.cnv = cnv;
		this.ctx = this.cnv.getContext('2d');
	}
	render() {
		this.ctx.fillStyle = this.color;
		this.ctx.fillRect(this.x,this.y,this.w,this.h);
	}
	move(speedx,speedy=0) {
		if (this.touchingEdge()===false) {
			this.speedx+=speedx;
			this.speedy+=speedy;
		}

	}
	update() {
		this.x+=this.speedx;
		this.y+=this.speedy;
		this.speedx*=0;
		this.speedy*=0;
		this.ctx.fillStyle = this.color;
		this.ctx.fillRect(this.x,this.y,this.w,this.h);
	}
	touchingEdge() {
		if ((this.x > (this.cnv.width-this.w) || this.x < 0 || this.y > (this.cnv.height-this.h) || this.y < 0)) {
			return true
		} else {
			return false;
		}
	}
	gravity(speed=0.2) {
		if (this.touchingEdge()===false) {
			this.speedy += speed;
		}
	}
}
