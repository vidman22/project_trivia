function call() {

$.ajax({
	url: "https://opentdb.com/api.php?amount=10",
	method: "GET"
}).done(function(response) {
	console.log(response.data);
});

}

$(document).on("click", ".btn", call);