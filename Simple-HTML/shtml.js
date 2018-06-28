
window.onerror = function(error) {
  if (error.split(' ')[1] === 'DOMException:') {
  	console.warn('Make sure that your <script></script> tag below your <s-html></s-html> tag!')
  }
};
class SHTML {
	constructor() { 
	}
	create(html) {
		/*Appends HTML (as text) to the body*/
		document.body.innerHTML += html;
	}
	css(css) {
		document.body.innerHTML += `<style>${css}</style>`
	}
	js(js) {
		document.body.innerHTML += `<script>${js}</script>`
	}
	importjs(url) {
		document.body.innerHTML += `<script src='${url}'></script>`
	}
	importcss(url) {
		document.body.innerHTML += `<link rel='stylesheet' href='${url}'></link>`
	}
	select(selector) {
		/*Selects element*/
		var elem = {}
		elem.selector = document.querySelector(selector);
		elem.append = html =>{
			/*Appends HTML (as text) to the selected element*/
			elem.selector.innerHTML+=html;
			return elem
		}
		elem.html = (nhtml=elem.selector) => {
			/*Returns/Sets the HTML of the selected element*/
			if (!(nhtml === elem.selector)) {
				elem.selector.innerHTML = nhtml;
			}
			return elem.selector;

		}
		elem.text = (ntxt=elem.selector.textContent)=>{
			if (!(ntxt === elem.selector.textContent)) {
				elem.selector.textContent = ntxt;
			}
			return elem.selector.textContent;
		}
		return elem
	}
	build(content=`<script>var shtml = new SHTML()</script>`,title='Test',path='shtml.js') {
		var bhtml;
		bhtml = `
		<html style='margin:0;padding:0;' id='shtml'>
		<head>
			<title>${title}</title>
		</head>
		<body style='margin:0;padding:0;'>
			${content}
			
			<script src='${path}'></script>
		</body>
		</html>
	`		
	document.getElementsByTagName('html')[0].innerHTML = bhtml;
	}

}

class SHTMLelement extends HTMLElement {
	constructor(header=true) {
		super();
		this.user_html = this.innerHTML;
		this.innerHTML = '';
		if (header) {
			this.setAttribute('style','width:100%;height:100%;background:#eee;margin:0;padding:0;')
			let d = document.createElement('div');
			d.setAttribute(`style`,`border-bottom:2px solid #d8d8d8;text-align:center;`);
			d.innerHTML = `<h1 style='font-fmily:sans-serif;font-size:2em;'>Doc (Simple-HTML)</h1>`
			this.appendChild(d);
		}
		this.innerHTML += `<div style="font-fmily:sans-serif;text-align:center;font-size:1em">${this.user_html}</div>`;


	}
	create(html) {
		/*Appends HTML (as text) to the body*/
		this.innerHTML += html;
	}
	css(css) {
		this.innerHTML += `<style>${css}</style>`
	}
	js(js) {
		this.innerHTML += `<script>${js}</script>`
	}
	importjs(url) {
		this.innerHTML += `<script src='${url}'></script>`
	}
	importcss(url) {
		this.innerHTML += `<link rel='stylesheet' href='${url}'></link>`
	}
	select(selector='s-html') {
		/*Selects element*/
		var elem = {}
		elem.selector = document.querySelector(selector);
		elem.append = html =>{
			/*Appends HTML (as text) to the selected element*/
			elem.selector.innerHTML+=html;
			return elem
		}
		elem.html = (nhtml=elem.selector) => {
			/*Returns/Sets the HTML of the selected element*/
			if (!(nhtml === elem.selector)) {
				elem.selector.innerHTML = nhtml;
			}
			return elem.selector;

		}
		elem.text = (ntxt=elem.selector.textContent)=>{
			if (!(ntxt === elem.selector.textContent)) {
				elem.selector.textContent = ntxt;
			}
			return elem.selector.textContent;
		}
		return elem
	}

}

window.customElements.define('s-html',SHTMLelement);
