const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({ 
	user: { type: String, required: true },
	do: { type: String, required: true },
	createdAt: {type: Date, default: Date.now}
});

mongoose.model('Log', logSchema);
