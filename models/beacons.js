var mongoose = require('mongoose');

var BeaconSchema = new mongoose.Schema({
    name: { type: String, required: true},
    venue: { type: String, required: true},
    platform: { type: String, required: true},
    active: { type: Boolean, required: true}
});

module.exports = mongoose.model('Beacon', BeaconSchema);