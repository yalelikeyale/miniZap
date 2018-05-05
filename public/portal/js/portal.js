const access_key = localStorage.getItem('access_key')

function loadClients(data){
	data.forEach(item=>{
		let liCompany = `<button class="dropdown-item" data-company="${item._id}" type="button">${item.company}</button>`
		$('.dropdown-menu').append(liCompany);
	})
}

if((access_key)){
   console.log('in portal js')
   const payload = {
		url:'http://localhost:8080/clients',
		headers:{
			'Authorization':`Bearer ${access_key}`
		},
		error:function(error){
			console.log('error ' + JSON.stringify(error));
		},
		success:loadClients
	}
	$.get(payload)
}

$('.dropdown-menu').on('click', '.dropdown-item',function(e){
	let comp_id = $(this).data('company')
	let comp_name = $(this).text()
	localStorage.setItem(comp_name, comp_id)
	window.location = `../profiles/${comp_id}/client`
})