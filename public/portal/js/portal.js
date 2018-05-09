const access_key = localStorage.getItem('access_key')

function refreshPage(data){
	location.reload()
}

function loadClients(data){
	console.log(data)
	let newRow = false;
	let rowCount = 0;
	for(i=0;i<data.length;i++){
		if(!(newRow)){
			let cardHtml = `<div class="col-4">
			                    <div class="card text-white bg-primary mb-3" data-id="${data[i]._id}" style="max-width: 18rem;">
			                        <div class="card-header">
			                          <span class="comp-name">Name: ${data[i].company}</span><button type="button" class="btn btn-light right" data-toggle="modal" data-target="#editModal">Edit</button>
			                          <div>
			                              <span>ID: ${data[i]._id}</span>
			                          </div>
			                        </div>
			                        <div class="card-body">
			                          <h5 class="js-connection">Segment:<button type="button" data-id="${data[i]._id}" class="btn btn-outline-success add-connect">Add Connection</button></h5>
			                          <h5 class="js-orders-today">Orders: 2</h5>
			                          <h5 class="js-rev-today">Revenue: 499.98</h5>
			                          <div class="button-wrapper">
			                              <button type="button" class="btn btn-light trash right" data-toggle="modal" data-target="#trashModal">
			                                  <i class="fas fa-trash-alt"></i>
			                              </button>
			                          </div>
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
			                          <span class="comp-name">Name: ${data[i].company}</span><button type="button" class="btn btn-light right" data-toggle="modal" data-target="#editModal">Edit</button>
				                      <div>
			                              <span>Client ID: ${data[i]._id}</span>
			                          </div>
			                        </div>
			                        <div class="card-body">
			                          <h5 class="js-connection">Segment:<button type="button" data-id="${data[i]._id}" class="btn btn-outline-success add-connect">Add Connection</button></h5>
			                          <h5 class="js-orders-today">Orders: 2</h5>
			                          <h5 class="js-rev-today">Revenue: 499.98</h5>
			                          <div class="button-wrapper">
			                              <button type="button" class="btn btn-light trash right" data-toggle="modal" data-target="#trashModal">
			                                 <i class="fas fa-trash-alt"></i>
			                              </button>
			                          </div>
			                        </div>
			                    </div>
			                </div>`
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

$('.add-client').on('submit',function(e){
	console.log('in add new client event listener function')
	e.preventDefault()
	const company = $(this).find('#new-company').val()
	console.log(company)
    const payload = {
		url:'http://localhost:8080/clients',
		headers:{
			'Authorization':`Bearer ${access_key}`
		},
		data:{company},
		dataType:'json',
		error:function(error){
			console.log('error ' + JSON.stringify(error));
		},
		success:refreshPage
	}
	$.post(payload)
})

$('.btn.delete').click(function(e){
	e.preventDefault()
	const _id = $('#delete-id').val()
	console.log(_id)
	if(_id){
	    const payload = {
			url:`http://localhost:8080/clients/${_id}`,
			method:'DELETE',
			headers:{
				'Authorization':`Bearer ${access_key}`
			},
			error:function(error){
				console.log('error ' + JSON.stringify(error));
			},
			success:refreshPage
		}
		$.ajax(payload)
	}
})

$('.btn.edit').click(function(e){
	e.preventDefault()
	const company = $('#update-name').val()
	const _id = $('#update-id').val()
	console.log(_id, company)
	if(_id && company){
	    const payload = {
			url:`http://localhost:8080/clients/${_id}`,
			method:'PUT',
			headers:{
				'Authorization':`Bearer ${access_key}`
			},
			data:{company},
			dataType:'json',
			error:function(error){
				console.log('error ' + JSON.stringify(error));
			},
			success:refreshPage
		}
		$.ajax(payload)
	}
})










