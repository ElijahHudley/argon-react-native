const Article = require("../models/ArticleModel");
const { body,validationResult } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const auth = require("../middlewares/jwt");
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);


// title: 'Is makeup one of your daily esse …',
// 	image: 'https://images.unsplash.com/photo-1519368358672-25b03afee3bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2004&q=80',
// 	cta: 'View article',
// 	horizontal: false,
// 	full: false,
// 	category: articles.audio

// Article Schema
function ArticleData(data) {
	this.id = data._id;
	this.title= data.title;
	this.cta = data.cta;
	this.category = data.category;
	this.createdAt = data.createdAt;
}

/**
 * Article List.
 * 
 * @returns {Object}
 */
exports.articleList = [
	auth,
	function (req, res) {
		try {
			Article.find({user: req.user._id},"_id title cta category createdAt").then((articles)=>{
				if(articles.length > 0){
					return apiResponse.successResponseWithData(res, "Operation success", articles);
				}else{
					return apiResponse.successResponseWithData(res, "Operation success", []);
				}
			});
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * Article Detail.
 * 
 * @param {string}      id
 * 
 * @returns {Object}
 */
exports.articleDetail = [
	auth,
	function (req, res) {
		if(!mongoose.Types.ObjectId.isValid(req.params.id)){
			return apiResponse.successResponseWithData(res, "Operation success", {});
		}
		try {
			Article.findOne({_id: req.params.id, user: req.user._id},"_id title cta category createdAt").then((article)=>{
				if(article !== null){
					let articleData = new ArticleData(article);
					return apiResponse.successResponseWithData(res, "Operation success", articleData);
				}else{
					return apiResponse.successResponseWithData(res, "Operation success", {});
				}
			});
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * Article store.
 * 
 * @param {string}      title 
 * @param {string}      description
 * @param {string}      isbn
 * 
 * @returns {Object}
 */
exports.articleStore = [
	auth,
	body("title", "Title must not be empty.").isLength({ min: 1 }).trim(),
	body("cta", "Description must not be empty.").isLength({ min: 1 }).trim(),
	body("category", "Category must not be empty").isLength({ min: 1 }).trim().custom((value,{req}) => {
		return Article.findOne({category : value,user: req.user._id}).then(article => {
			if (article) {
				return Promise.reject("Article already exist with this ISBN no.");
			}
		});
	}),
	body("*").escape(),
	(req, res) => {
		try {
			const errors = validationResult(req);
			var article = new Article(
				{ title: req.body.title,
					user: req.user,
					cta: req.body.cta,
					category: req.body.category
				});

			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}
			else {
				//Save article.
				article.save(function (err) {
					if (err) { return apiResponse.ErrorResponse(res, err); }
					let articleData = new ArticleData(article);
					return apiResponse.successResponseWithData(res,"Article add Success.", articleData);
				});
			}
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * Article update.
 * 
 * @param {string}      title 
 * @param {string}      description
 * @param {string}      isbn
 * 
 * @returns {Object}
 */
exports.articleUpdate = [
	auth,
	body("title", "Title must not be empty.").isLength({ min: 1 }).trim(),
	body("cta", "CTA must not be empty.").isLength({ min: 1 }).trim(),
	body("category", "Category must not be empty").isLength({ min: 1 }).trim().custom((value,{req}) => {
		return Article.findOne({isbn : value,user: req.user._id, _id: { "$ne": req.params.id }}).then(article => {
			if (article) {
				return Promise.reject("Article already exist with this CATEGORY no.");
			}
		});
	}),
	body("*").escape(),
	(req, res) => {
		try {
			const errors = validationResult(req);
			var article = new Article(
				{ title: req.body.title,
					cta: req.body.cta,
					category: req.body.category,
					_id:req.params.id
				});

			if (!errors.isEmpty()) {
				return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
			}
			else {
				if(!mongoose.Types.ObjectId.isValid(req.params.id)){
					return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
				}else{
					Article.findById(req.params.id, function (err, foundArticle) {
						if(foundArticle === null){
							return apiResponse.notFoundResponse(res,"Article not exists with this id");
						}else{
							//Check authorized user
							if(foundArticle.user.toString() !== req.user._id){
								return apiResponse.unauthorizedResponse(res, "You are not authorized to do this operation.");
							}else{
								//update article.
								Article.findByIdAndUpdate(req.params.id, article, {},function (err) {
									if (err) { 
										return apiResponse.ErrorResponse(res, err); 
									}else{
										let articleData = new ArticleData(article);
										return apiResponse.successResponseWithData(res,"Article update Success.", articleData);
									}
								});
							}
						}
					});
				}
			}
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

/**
 * Article Delete.
 * 
 * @param {string}      id
 * 
 * @returns {Object}
 */
exports.articleDelete = [
	auth,
	function (req, res) {
		if(!mongoose.Types.ObjectId.isValid(req.params.id)){
			return apiResponse.validationErrorWithData(res, "Invalid Error.", "Invalid ID");
		}
		try {
			Article.findById(req.params.id, function (err, foundArticle) {
				if(foundArticle === null){
					return apiResponse.notFoundResponse(res,"Article not exists with this id");
				}else{
					//Check authorized user
					if(foundArticle.user.toString() !== req.user._id){
						return apiResponse.unauthorizedResponse(res, "You are not authorized to do this operation.");
					}else{
						//delete article.
						Article.findByIdAndRemove(req.params.id,function (err) {
							if (err) { 
								return apiResponse.ErrorResponse(res, err); 
							}else{
								return apiResponse.successResponse(res,"Article delete Success.");
							}
						});
					}
				}
			});
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];