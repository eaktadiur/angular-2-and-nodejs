var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('../models/user');

var schema = new Schema({
    content: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

schema.post('remove', function(doc) {
    var deletedMessage = doc;
    User.findById(doc.user, function(err, doc) {
        doc.messages.pull(deletedMessage);
        doc.save();
    });
});

module.exports = mongoose.model('Message', schema);