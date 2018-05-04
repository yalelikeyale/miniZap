'use strict';

const mongoose = require('mongoose');

const clientsSchema = new mongoose.Schema({
  company:  {type: String, required: true}
});

clientsSchema.methods.serialize = function() {
  return {
    company_token: this._id
  };
}

const Clients = mongoose.model('clients', clientsSchema);

module.exports = {Clients};