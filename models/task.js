var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

taskSchema = Schema({
	created_by: { type: Schema.Types.ObjectId, ref: 'users' },
	todo: String
});

module.exports = mongoose.model('tasks',taskSchema);