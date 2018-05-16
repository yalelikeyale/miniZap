
function storeToken(data){
	localStorage.setItem('access_key',data.token)
	//redirect
	window.location = '../portal/index.html'
}

$('#submit').on('click', function(e){
	e.preventDefault()
	const username = $('.js-username').val()
	const password = $('.js-password').val()
	const creds = {
		username,
		password
	}
	console.log(creds)
	const payload = {
		url:'https://dry-chamber-24837.herokuapp.com/login',
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