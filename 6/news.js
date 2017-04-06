function addNews() {
	const url = 'https://newsapi.org/v1/articles?source=bbc-news&apiKey=efe29ce93f8b4cb4883b9472808b2372';
	fetch(url)
		.then(
			function(response) {
				if(response.status != 200) {
					console.log('Sorry, something went wrong. Status Code: ' +  
          			response.status);
          			return;
				}
				return response.json();
			}
		)
		.then(function(json) {
			let content = "";
			let articles = json.articles;
			articles.map(el => {
				content += "<div class='news'>" +
							`<div class='title'>${el.title}</div>` +
							`<div class='description'>${el.description}</div>` +
							`<div class='url'><a class='link' href='${el.url}'>Read more...</a></div>`
				content += (el.urlToImage) ? `<div><img  class='img' src='${el.urlToImage}'/></div></div>` : "</div>";
			});
			document.getElementById('content').innerHTML = content;
		})
		.catch(function(err) {
			console.log('Error o_O', err);
		});
}