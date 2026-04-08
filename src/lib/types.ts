export type PostMeta = {
	slug: string;
	title: string;
	description: string;
	date: string;
	tags: string[];
	readingTime: string;
	cover?: string;
	published: boolean;
	searchableText?: string;
};

export type Post = PostMeta & {
	html: string;
};
