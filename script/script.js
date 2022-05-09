"use strict";

document.addEventListener("DOMContentLoaded", function () {
	window.addEventListener("scroll", function () {
		if (window.scrollY > 50) {
			document.getElementById("navbar_top").classList.add("fixed-top");
			navbar_height = document.querySelector('.navbar');
			document.body.style.paddingTop = navbar_height;
		} else {
			document.getElementById("navbar_top").classList.remove("fixed-top");
			document.body.style.paddingTop = 0;
		}
	});
});
const boxpesquisa = document.querySelector(".search");
const pesquisa = document.querySelector(".input");
const listanoticias = document.querySelector(".gallery");
const defaultdata = new Intl.DateTimeFormat("pt-BR");
boxpesquisa.addEventListener("submit", busca);

function getdata() {
	let datapesquisa = document.querySelector("#pesquisapordata").value;
	console.log(datapesquisa);
	return datapesquisa;
}
console.log(getdata());

function getlimit() {
	let limite = document.getElementById("select").value;
	return limite;
}
getlimit();
console.log(getlimit());

function busca(e) {
	listanoticias.innerHTML = "";
	e.preventDefault();
	let topico = pesquisa.value;

	(async function () {
		try {
			let url = `https://api.spaceflightnewsapi.net/v3/articles?title_contains=${topico}&_limit=${getlimit()}`;

			if (getdata()) {
				url =
					url +
					`&publishedAt_lt=${getdata()}T23:59:59.999Z`;
				// `&publishedAt_gt=${getdata()}T00:00:00.000Z&publishedAt_lt=${getdata()}T23:59:59.999Z`;
			}

			const req = await fetch(url);
			const jsondata = await req.json();
			console.log(jsondata);
			for (const noticias of jsondata) {
				console.log(noticias);
			}

			jsondata.forEach((article) => {
				let card = document.createElement("div");
				let a = document.createElement("a");
				let titulo = document.createElement("h2");
				let img = document.createElement("img");
				let label = document.createElement("label");
				img.src = article.imageUrl;
				let bgimage = img.src;
				let data = new Date(article.publishedAt);
				let datacorreta = defaultdata.format(data);

				card.setAttribute("class", "gallery-card");
				card.setAttribute("style", "background-image: url(" + bgimage + ")");
				a.setAttribute("href", article.url);
				a.setAttribute("target", "_blank");
				a.setAttribute("class", "gallery-card-btn");

				a.textContent = article.title;
				label.textContent = " publicado em: " + "" + datacorreta;

				listanoticias.appendChild(titulo);
				listanoticias.appendChild(card);
				card.appendChild(a);
				card.appendChild(label);
			});
		} catch (e) {
			console.log("error");
		}
	})();
}
