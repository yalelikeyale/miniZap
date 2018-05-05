
const client_id = localStorage.getItem('comp_id')
console.log(client_id)

if(!(client_id)){
	window.location = '../index.html'
}