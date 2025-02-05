import { collectionDateSort } from "@/utils/date";
import { type CollectionEntry, getCollection } from "astro:content";

/** filter out draft posts based on the environment */
export async function getAllPosts(): Promise<CollectionEntry<"post">[]> {
	return await getCollection("post", ({ data }) => {
		return import.meta.env.PROD ? !data.draft : true;
	});
}

export async function getAllCollectionPosts() {
	const posts = await getAllPosts();
	const notes = await getCollection("note");
	const allPosts = [...posts, ...notes];
	const allPostsSortedByDate = allPosts.sort(collectionDateSort);
	return allPostsSortedByDate;
}

/** groups posts by year (based on option siteConfig.sortPostsByUpdatedDate), using the year as the key
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 */
export function groupPostsByYear(posts: CollectionEntry<"post">[]) {
	return posts.reduce<Record<string, CollectionEntry<"post">[]>>((acc, post) => {
		const year = post.data.date.getFullYear();
		if (!acc[year]) {
			acc[year] = [];
		}
		acc[year]?.push(post);
		return acc;
	}, {});
}

/** returns all tags created from posts (inc duplicate tags)
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 *  */
export function getAllTags(posts: CollectionEntry<"post">[]) {
	return posts.flatMap((post) => [...post.data.tags]);
}

/** returns all unique tags created from posts
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 *  */
export function getUniqueTags(posts: CollectionEntry<"post">[]) {
	return [...new Set(getAllTags(posts))];
}

/** returns a count of each unique tag - [[tagName, count], ...]
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 *  */
export function getUniqueTagsWithCount(posts: CollectionEntry<"post">[]): [string, number][] {
	return [
		...getAllTags(posts).reduce(
			(acc, t) => acc.set(t, (acc.get(t) ?? 0) + 1),
			new Map<string, number>(),
		),
	].sort((a, b) => b[1] - a[1]);
}

/** Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so. */
export function getAllCategories(posts: Array<CollectionEntry<"post">>): string[] {
	return posts.map((post) => post.data.category ?? "未分类");
}

/** Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so. */
export function getUniqueCategories(posts: Array<CollectionEntry<"post">>): string[] {
	return [...new Set(getAllCategories(posts))];
}

/** Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so. */
export function getUniqueCategoriesWithCount(
	posts: Array<CollectionEntry<"post">>,
): Array<[string, number]> {
	return [
		...getAllCategories(posts).reduce(
			(acc, t) => acc.set(t, (acc.get(t) || 0) + 1),
			new Map<string, number>(),
		),
	].sort((a, b) => b[1] - a[1]);
}
