// const airtable = require('airtable')

// const Airtable = function Constructor(user_settings) {
// 	this.api_key = user_settings.api_key
// 	this.base_key = user_settings.base_key
// };

// const airtableObj = new Airtable({"api_key":process.env.airtable_key,"base_key":process.env.airtable_base})
// const base = new airtable({apiKey: Destination.api_key}).base(Destination.base_key);

// Destination.prototype.create = function(){
// 	let baseKeys;
// 	base('Example').select({
// 		maxRecords:1,
// 		view:"Main View"
// 	}).firstPage(function(err,records){
// 		if(err){
// 			console.error(err);
// 			reject(err);
// 		}
// 		baseKeys = Object.keys(records)
// 		console.log(baseKeys)
// 	});
// }

// module.exports = {airtableObj}