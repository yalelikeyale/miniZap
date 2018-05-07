const access_key = localStorage.getItem('access_key')

if(!(access_key)){
	window.location = '../index.html'
}

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