function storeToken(data){
	localStorage.setItem('access_key',data.token)
	//redirect
	// window.location('/dashboard')
}

$('#signin-form').on('submit', function(e){
	e.preventDefault()
	const username = $('#username').val()
	const password = $('#password').val()
	const creds = {
		username,
		password
	}
	console.log(creds)
	const payload = {
		url:'http://localhost:8080/login',
		headers:{
			'Content-Type':'application/json'
		},
		dataType:'json',
		data:JSON.stringify(creds),
		error:function(error){
			console.log('error ' + JSON.stringify(error));
		},
		success:storeToken
	}
	$.post(payload)
})