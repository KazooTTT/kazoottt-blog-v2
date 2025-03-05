import type { AllItem, NoteItem, PostItem } from "@/types";
import { collectionDateSort } from "@/utils/date";
import { type CollectionEntry, getCollection } from "astro:content";

/**
 * @description: 添加分类作为前缀
 * @param {CollectionEntry} posts
 */
const addCategoryAsPrefix = (posts: CollectionEntry<"post" | "note">[]) => {
	return posts.map((post) => {
		return {
			...post,
			data: {
				...post.data,
				title: post.data?.category
					? `[${post.data?.category}] ${post.data.title}`
					: post.data.title,
			},
		};
	});
};

export const getDateSortByCreateTime = (post: CollectionEntry<"post" | "note">) => {
	return post.data.date ?? post.data.data_created ?? post.data.date_modified ?? new Date();
};

export const getDateSortByUpdateTime = (post: CollectionEntry<"post" | "note">) => {
	return post.data.date_modified ?? post.data.date ?? post.data.data_created ?? new Date();
};

/** filter out draft posts based on the environment */
export async function getAllPosts(): Promise<PostItem[]> {
	const posts = await getCollection("post", ({ data }) => {
		return import.meta.env.PROD ? !data.draft : true;
	});
	return (addCategoryAsPrefix(posts) as CollectionEntry<"post">[]).map((item) => {
		return {
			...item,
			dateToCmp: getDateSortByCreateTime(item),
		};
	});
}

export async function getAllFixedToTopPosts() {
	const posts = await getAllPosts();
	return posts.filter((post) => post.data.fixedToTop);
}

export async function getAllNotes(): Promise<NoteItem[]> {
	const notes = await getCollection("note");
	return (addCategoryAsPrefix(notes) as NoteItem[]).map((item) => {
		return { ...item, dateToCmp: getDateSortByCreateTime(item) };
	});
}

export async function getAllCollectionPosts() {
	const posts = await getAllPosts();
	const notes = await getAllNotes();
	const allPosts = [...posts, ...notes];
	const allPostsSortedByDate = allPosts.sort(collectionDateSort);
	return allPostsSortedByDate;
}

/** groups posts by year (based on option siteConfig.sortPostsByUpdatedDate), using the year as the key
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 */
export function groupPostsByYear(posts: AllItem[]) {
	return posts.reduce<Record<string, AllItem[]>>((acc, post) => {
		const year = getDateSortByCreateTime(post).getFullYear();
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
export function getAllTags(posts: AllItem[]) {
	return posts.flatMap((post) => [...post.data.tags]);
}

/** returns all unique tags created from posts
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 *  */
export function getUniqueTags(posts: AllItem[]) {
	return [...new Set(getAllTags(posts))];
}

/** returns a count of each unique tag - [[tagName, count], ...]
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 *  */
export function getUniqueTagsWithCount(posts: AllItem[]): [string, number][] {
	return [
		...getAllTags(posts).reduce(
			(acc, t) => acc.set(t, (acc.get(t) ?? 0) + 1),
			new Map<string, number>(),
		),
	].sort((a, b) => b[1] - a[1]);
}

/** Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so. */
export function getAllCategories(posts: AllItem[]): string[] {
	return posts.map((post) => post.data.category ?? "未分类");
}

/** Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so. */
export function getUniqueCategories(posts: AllItem[]): string[] {
	return [...new Set(getAllCategories(posts))];
}

/** Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so. */
export function getUniqueCategoriesWithCount(posts: AllItem[]): Array<[string, number]> {
	return [
		...getAllCategories(posts).reduce(
			(acc, t) => acc.set(t, (acc.get(t) || 0) + 1),
			new Map<string, number>(),
		),
	].sort((a, b) => b[1] - a[1]);
}
