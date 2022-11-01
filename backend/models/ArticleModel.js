var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
	title: {type: String, required: true},
	cta: {type: String, required: true},
	category: {type: Number, required: true},
	image: {type: String, required: true},
	horizontal: {type: Boolean, require: false},
	full: {type: Boolean, required: false},
	user: { type: Schema.ObjectId, ref: "User", required: true },
}, {timestamps: true});


module.exports = mongoose.model("Article", ArticleSchema);