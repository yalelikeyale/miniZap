const access_key = localStorage.getItem('access_key')

function loadClients(data){
	console.log(data)
	let newRow = false;
	let rowCount = 0;
	for(i=0;i<data.length;i++){
		if(!(newRow)){
			let cardHtml = `<div class="col-4">
			                    <div class="card text-white bg-primary mb-3" data-id="${data[i]._id}" style="max-width: 18rem;">
			                        <div class="card-header">
			                          <span class="comp-name">${data[i].company}</span>
			                        </div>
			                        <div class="card-body">
			                          <h5 class="js-connection">Segment:<button type="button" data-id="${data[i]._id}" class="btn btn-outline-success add-connect">Add Connection</button></h5>
			                          <h5 class="js-orders-today">Orders: 2</h5>
			                          <h5 class="js-rev-today">Revenue: 499.98</h5>
			                        </div>
			                    </div>
			                </div>`
			$(`.row[data-index="${rowCount}"]`).append(cardHtml)
			if((i+1)%3===0){
				newRow = true
				rowCount++;
			}
		} else {
			let rowHtml = `<div data-index="${rowCount}" class="row"></div>`
			$('.container').append(rowHtml)
			let cardHtml = `<div class="col-4">
			                    <div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
			                        <div class="card-header">
			                          <span class="comp-name">${data[i].company}</span>
			                        </div>
			                        <div class="card-body">
			                          <h5 class="js-connection">Segment:<button type="button" data-id="${data[i]._id}" class="btn btn-outline-success add-connect">Add Connection</button></h5>
			                          <h5 class="js-orders-today">Orders: 2</h5>
			                          <h5 class="js-rev-today">Revenue: 499.98</h5>
			                        </div>
			                    </div>
			                </div>`
			console.log('New Row True: '+`.row[data-index="${rowCount}"]`)
			$(`.row[data-index="${rowCount}"]`).append(cardHtml)
			newRow = false;
		}
	}
}

if((access_key)){
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

$('.container').on('click','.add-connect', function(e){
	let client_id = $(this).data('id')
	localStorage.setItem('client_id',client_id)
	window.location = `../profiles/${client_id}/account`
})











