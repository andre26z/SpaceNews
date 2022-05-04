"use strict";

const boxpesquisa = document.querySelector(".search");
const pesquisa = document.querySelector(".input");
const listanoticias = document.querySelector(".news-list");
const defaultdata = new Intl.DateTimeFormat("pt-BR");

boxpesquisa.addEventListener("submit", busca);

function busca(e) {
	listanoticias.innerHTML = "";
	e.preventDefault();
	let topico = pesquisa.value;
	(async function () {
		try {
			const url = await fetch(
				`https://api.spaceflightnewsapi.net/v3/articles?title_contains=${topico}&_limit=100`
			);
			const jsondata = await url.json();
			console.log(jsondata);
			for (const noticias of jsondata) {
				console.log(noticias);
			}

			jsondata.forEach((article) => {
				let li = document.createElement("li");
				let a = document.createElement("a");
				let label = document.createElement("label");
				let img = document.createElement("img");
				img.src = article.imageUrl;
				let data = new Date(article.publishedAt);
				let datacorreta = defaultdata.format(data);
				console.log(datacorreta);
				a.setAttribute("href", article.url);
				a.setAttribute("target", "_blank");
				a.textContent = article.title;
				label.textContent = " publicado em: " + "" + datacorreta;
				li.appendChild(a);
				listanoticias.appendChild(li);
				listanoticias.appendChild(img);
				listanoticias.appendChild(label);
			});
		} catch (e) {
			console.log("error");
		}
	})();

    // const limit = function maxsearch() {


        
    // }

}
