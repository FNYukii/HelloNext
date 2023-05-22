type Post = {

	slug: string;
	frontMatter: {
		[key: string]: any;
	};
	content: string;
}

export default Post