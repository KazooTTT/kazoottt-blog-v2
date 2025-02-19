import { siteConfig } from "@/site.config";
import { collectionDateSort } from "@/utils/date";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";

export const GET = async () => {
	const notes = await getCollection("note");
	const sortedNotes = notes.sort(collectionDateSort);
	const parser = new MarkdownIt();

	return rss({
		customData: `<follow_challenge>
		<feedId>75113012474671104</feedId>
		<userId>62156866798228480</userId>
	</follow_challenge>`,
		title: siteConfig.title,
		description: siteConfig.description,
		site: import.meta.env.SITE,
		items: sortedNotes.map((post) => {
			return {
				title: post.data.title,
				description: post.data.description ?? "",
				pubDate: post.data.date,
				link: `notes/${post.id}/`,
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
			};
		}),
	});
};
