"use strict";

const boxpesquisa = document.querySelector(".search");
const pesquisa = document.querySelector(".input");
const listanoticias = document.querySelector(".gallery");
const defaultdata = new Intl.DateTimeFormat("pt-BR");

boxpesquisa.addEventListener("submit", busca);

function getlimit() {
	var limite = document.getElementById("select").value;
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
			const url = await fetch(
				`https://api.spaceflightnewsapi.net/v3/articles?title_contains=${topico}&_limit=${getlimit()}`
			);
			const jsondata = await url.json();
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
				// console.log(datacorreta);

				card.setAttribute("class", "gallery-card col-md-2");
				card.setAttribute("style", "background-image: url(" + bgimage + ")");
				a.setAttribute("href", article.url);
				a.setAttribute("target", "_blank");
				a.setAttribute("class", "gallery-card-btn");

				a.textContent = article.title;
				label.textContent = " publicado em: " + "" + datacorreta;

				listanoticias.appendChild(card);
				card.appendChild(a);
				card.appendChild(titulo);
				card.appendChild(label);
			});
		} catch (e) {
			console.log("error");
		}
	})();
}
