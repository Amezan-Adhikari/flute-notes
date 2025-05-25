import { blogPosts } from '../data.js';
import { error } from '@sveltejs/kit';

export function load({ params }: any) {
	const { slug } = params;

	const post = blogPosts.find((p) => p.slug === slug);

	if (!post) {
		throw error(404, 'Post not found');
	}

	return {
		post
	};
}
