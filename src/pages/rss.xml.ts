import { getAllPosts } from "@/data/post";
import { siteConfig } from "@/site.config";
import { collectionDateSort, convertToBeijingTime } from "@/utils/date";
import rss from "@astrojs/rss";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";

export const GET = async () => {
	const posts = await getAllPosts();
	const sortedPosts = posts.sort(collectionDateSort);
	const parser = new MarkdownIt();

	return rss({
		customData: `<follow_challenge>
		<feedId>75113012474671104</feedId>
		<userId>62156866798228480</userId>
	</follow_challenge>`,
		title: siteConfig.rssConfig.blogTitle,
		description: siteConfig.rssConfig.blogDescription,
		site: import.meta.env.SITE,
		items: sortedPosts.map((post) => {
			const tagStr = post.data.tags.reduce((acc, tag) => {
				return `${acc}#${tag} `;
			}, "");
			return {
				title: post.data.title,
				description: (post.data.description ?? "") + "\t" + tagStr,
				pubDate: convertToBeijingTime(post.dateToCmp),
				link: `posts/${post.id}/`,
				content: post.body
					? sanitizeHtml(
							parser
								.render(post.body)
								.replace(/<img\s+src="\/images\//g, `<img src="${import.meta.env.SITE}images/`),
							{
								allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
								textFilter: function (text: string) {
									return text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F\uFFF0-\uFFFF]/g, "");
								},
							},
						)
					: "",
				author: siteConfig.author,
				categories: post.data?.category ? [post.data.category] : [],
			};
		}),
	});
};
