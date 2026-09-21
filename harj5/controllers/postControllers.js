const Post = require("../models/Post");

exports.getAllPosts = async (req, res, next) => {
	try {
		const [posts, _] = await Post.findAll();
		res.status(200).json({ count: posts.length, posts });
	} catch (error) {
		console.log(error);
		next(error);
	}
};

exports.getPostById = async (req, res, next) => {
	try {
		let postId = Number(req.params.id);
		let [post, _] = await Post.findById(postId);
		res.status(200).json({ post: post[0] });
	} catch (error) {
		console.log(error);
		next(error);
	}
};

exports.createNewPost = async (req, res, next) => {
	try {
		let { title, body } = req.body;
		let post = new Post(title, body);
		post = await post.save();
		res.status(201).json({ message: "Post created" });
	} catch (error) {
		console.log(error);
		next(error);
	}
};

exports.updatePost = async (req, res, next) => {
	try {
		let postId = Number(req.params.id);
		let { title, body } = req.body;
		let post = new Post(title, body);
		post.id = postId;

		post = await post.update();
		res.status(200).json({ message: "Post updated" });
	} catch (error) {
		console.log(error);
		next(error);
	}
};

exports.deletePost = async (req, res, next) => {
	try {
		let postId = Number(req.params.id);
		let post = new Post();
		post.id = postId;

		await post.delete();
		res.status(200).json({ message: "Post deleted" });
	} catch (error) {
		console.log(error);
		next(error);
	}
};
