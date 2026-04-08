export type PostMeta = {
	slug: string;
	title: string;
	description: string;
	date: string;
	tags: string[];
	readingTime: string;
	cover?: string;
	published: boolean;
};

export type Post = PostMeta & {
	html: string;
};
