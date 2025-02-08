import { getAllPosts } from "@/data/post";
import { siteConfig } from "@/site.config";
import { collectionDateSort } from "@/utils/date";
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
		title: siteConfig.title,
		description: siteConfig.description,
		site: import.meta.env.SITE,
		items: sortedPosts.map((post) => {
			return {
				title: post.data.title,
				description: post.data.description ?? "",
				pubDate: post.data.date,
				link: `posts/${post.id}/`,
				content: post.body
					? sanitizeHtml(parser.render(post.body), {
							allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
							textFilter: function (text: string) {
								return text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F\uFFF0-\uFFFF]/g, "");
							},
						})
					: "",
				author: siteConfig.author,
				category: post.data?.category,
			};
		}),
	});
};
