


$('document').ready(function() {
	
	//https://en.wikipedia.org/wiki/Special:Random
	

	var endpoint = "https://en.wikipedia.org/w/api.php";
	var links = [];
	var titles = [];
	var par = [];
	
	// function for request
	function wiki(endpoint, links, titles,par) {
			//Show results in page
			var search = document.getElementById('bar').value;
			search = encodeURI(search);
			var uri = endpoint + "?" + "action=opensearch&search=" + search + "&format=json";
			console.log(uri);
			$.ajax({
				type: 'GET',
				url: uri,
				dataType: 'jsonp',
				success: function(data,status) {
					titles = data[1];
					par = data[2];
					links = data[3];
					console.log("inside");
					for(var i = 0; i < titles.length; i++) {
						$('#list').append('<div id="' + titles[i].replace(/\s/g, '') + '" href = "' + links[i] + '" class="result">' + 
						'<a href="' + links[i] + '">' + titles[i] + '</a>' +
						'<p>' + par[i] + '</p>' +
						'</div> <!-- End of ' + titles[i].replace(/\s/g, '') + ' -->');
				}
			}
		});
		$('#search-btn').unbind('click');
	}
	
	
		
	
	// select the target node
	var target = document.getElementById('list');
	
	// create an observer instance
	var observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			console.log(mutation);
			console.log(mutation.addedNodes[0]);
			mutation.addedNodes[0].addEventListener('click', function() {
				var wiki_page = mutation.addedNodes[0].attributes[1].value;
				window.open(wiki_page);
			});
			mutation.addedNodes[0].addEventListener('mouseover', function() {
				$(this).addClass('side');
			});
			mutation.addedNodes[0].addEventListener('mouseout', function() {
				$(this).removeClass('side');
			});
		});
	});
	
	// Mutation Observer, instructions found at https://developer.mozilla.org/el/docs/Web/API/MutationObserver
	
	// configuration of the observer
	var config = {childList: true};
	
	// pass in the target node, as well as the observer options
	observer.observe(target, config);
	
	
		
	$("#random-btn").click(function() {
		//open random article
		window.open("https://en.wikipedia.org/wiki/Special:Random");
	});
	
	
	$("#search-btn").click(wiki(endpoint, links, titles,par));
	
	$("#page-btn").click(function() {
		window.open(wiki_page);
	});
	
	$('#bar').keypress(function(e) {
		if(e.which == 13) {
			wiki(endpoint, links, titles, par);
			$(this).unbind('keypress');
		}
	});
	
	
});


/*
 * $('[id^=res]').click(function() {
		console.log("done");
		console.log($(this).children("a").attr('href'));
	});
	
 */

/*$.get(uri,null,function(json){
		console.log(json);
		},'json');
*/