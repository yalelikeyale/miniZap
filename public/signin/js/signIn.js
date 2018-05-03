function storeToken(data){
	console.log('success ' + JSON.stringify(data))
}

$('#submit').on('click', function(e){
	const username = $('#username').val()
	const password = $('#password').val()
	const creds = {
		username:username,
		password:password
	}
	const payload = {
		url:'localhost:8080/login',
		dataType:'json',
		data:creds,
		error:function(error){
			console.log('error ' + JSON.stringify(error));
		},
		success:storeToken
	}
	$.post(payload)
})