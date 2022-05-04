"use strict";

const boxpesquisa = document.querySelector(".search");
const pesquisa = document.querySelector(".input");
const listanoticias = document.querySelector(".news-list");

boxpesquisa.addEventListener("submit", busca);

function busca(e) {
	listanoticias.innerHTML = "";
	e.preventDefault();
	let topico = pesquisa.value;
	(async function () {
		try {
			const url = await fetch(
				`https://api.spaceflightnewsapi.net/v3/articles?title_contains=${topico}%20`
			);
			const jsondata = await url.json();
			console.log(jsondata);
			for (const noticias of jsondata) {
				console.log(noticias);
			}
		} catch (e) {
			console.log("error");
		}
	})();
}


// 	fetch(url)
// 		.then((res) => {
// 			return res.json();
// 		})
// 		.then((data) => {
// 			console.log(data);
// 			data.articles.forEach((article) => {
// 				let li = document.createElement("li");
// 				let a = document.createElement("a");
// 				a.setAttribute("href", article.url);
// 				a.setAttribute("target", "_blank");
// 				a.textContent = article.title;
// 				li.appendChild(a);
// 				listanoticias.appendChild(li);
// 			});
// 			console.log(data.articles);
// 		})
// 		.catch(function (e) {
// 			console.log('erro');
// 		});
// }
