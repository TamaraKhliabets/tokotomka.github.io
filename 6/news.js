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
							`<div class='url'><a href='${el.url}'>Read more...</a></div>` +
							`<div class='img'><img src='${el.urlToImage}' /></div>` +
						   "</div>\n"
			});
			document.getElementById('content').innerHTML = content;
		})
		.catch(function(err) {
			console.log('Error o_O', err);
		});

}

//Response sample
//{"status":"ok","source":"bbc-news","sortBy":"top","articles":[{"author":"BBC News","title":"St Petersburg metro explosion kills 11 in Russia","description":"Eleven people are killed and dozens injured by the explosion on a train between two stations.","url":"http://www.bbc.co.uk/news/world-europe-39481770","urlToImage":"https://ichef.bbci.co.uk/news/1024/cpsprodpb/15864/production/_95446188_mediaitem95445294.jpg","publishedAt":"2017-04-03T19:49:51Z"},{"author":"BBC News","title":"Brexit and Gibraltar: May laughs off Spain 'war' talk","description":"The prime minister says the UK's approach is \"definitely jaw jaw\" rather than \"war war\".","url":"http://www.bbc.co.uk/news/uk-politics-39475127","urlToImage":"https://ichef-1.bbci.co.uk/news/1024/cpsprodpb/27D9/production/_95410201_mediaitem95410200.jpg","publishedAt":"2017-04-03T14:50:48Z"},{"author":"BBC News","title":"Disabled people 'left behind in society', report finds","description":"Single mum Chantal tells her story, as a report says disabled people in the UK are \"left behind\".","url":"http://www.bbc.co.uk/news/uk-39484809","urlToImage":"https://ichef.bbci.co.uk/news/1024/cpsprodpb/0892/production/_95449120_p04yyjk3.jpg","publishedAt":"2017-02-02T12:05:31Z"},{"author":"BBC News","title":"Seven charged over asylum teen attack in Croydon","description":"Reker Ahmed was left fighting for his life after being kicked and punched in Croydon.","url":"http://www.bbc.co.uk/news/uk-england-39479476","urlToImage":"https://ichef-1.bbci.co.uk/news/1024/cpsprodpb/11406/production/_95426607_asylum.jpg","publishedAt":"2017-04-03T18:06:18Z"},{"author":"BBC Sport","title":"David Moyes: FA to ask Sunderland boss to explain himself over 'slap' remark","description":"Sunderland boss David Moyes will be asked by the Football Association to explain himself after telling a BBC reporter she might \"get a slap\".","url":"http://www.bbc.co.uk/sport/football/39484238","urlToImage":"http://ichef.bbci.co.uk/onesport/cps/624/cpsprodpb/E6F3/production/_95432195_moyes_reuters.jpg","publishedAt":"2017-04-03T18:29:36Z"},{"author":"BBC News","title":"Court orders woman to pay £24,500 to private parking company","description":"Carly Mackie ignored hundreds of notices outside her Dundee home, claiming they were unenforceable.","url":"http://www.bbc.co.uk/news/uk-scotland-tayside-central-39478203","urlToImage":"https://ichef-1.bbci.co.uk/news/1024/cpsprodpb/A819/production/_95433034_parking.jpg","publishedAt":"2017-04-03T10:54:25Z"},{"author":"BBC News","title":"Ordnance Survey's 3D digital map of UK offers stunning views","description":"Ordnance Survey launches 3D aerial images to help people plan walks, cycle routes and climbs.","url":"http://www.bbc.co.uk/news/technology-39484635","urlToImage":"https://ichef-1.bbci.co.uk/news/1024/cpsprodpb/A03F/production/_95432014_mediaitem95432013.jpg","publishedAt":"2017-01-03T13:06:12Z"},{"author":"BBC News","title":"Kian Dale: Parents guilty over baby's bath death in Tenbury Wells","description":"Kian Dale's mother tells a court she was \"stupid\" to have left him unsupervised for 15 minutes.","url":"http://www.bbc.co.uk/news/uk-england-hereford-worcester-39482497","urlToImage":"https://ichef.bbci.co.uk/news/1024/cpsprodpb/14658/production/_95444538_drowned-composite_976.jpg","publishedAt":"2017-04-03T14:32:35Z"},{"author":"BBC News","title":"Credit card interest 'could be waived' for longstanding debt","description":"Credit card firms must do more to help millions of customers unable to clear debt, the regulator says.","url":"http://www.bbc.co.uk/news/business-39476895","urlToImage":"https://ichef.bbci.co.uk/news/1024/cpsprodpb/6287/production/_95432252_uptsecpo.jpg","publishedAt":"2017-04-03T12:31:36Z"},{"author":"BBC News","title":"Trump Supreme Court pick Neil Gorsuch faces Senate showdown","description":"Democrats will try to block Neil Gorsuch, leaving Republicans with a \"nuclear option\" to win through.","url":"http://www.bbc.co.uk/news/world-us-canada-39461012","urlToImage":"https://ichef-1.bbci.co.uk/news/1024/cpsprodpb/14141/production/_95414228_tv038719520.jpg","publishedAt":"2017-04-03T18:49:30Z"}]}