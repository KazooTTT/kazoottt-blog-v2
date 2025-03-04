import type { CollectionEntry } from "astro:content";
import { siteConfig } from "@/site.config";

export function getFormattedDate(
	date: Date | undefined,
	options?: Intl.DateTimeFormatOptions,
): string {
	if (date === undefined) {
		return "Invalid Date";
	}

	return new Intl.DateTimeFormat(siteConfig.date.locale, {
		...(siteConfig.date.options as Intl.DateTimeFormatOptions),
		...options,
	}).format(date);
}

export function collectionDateSort(
	a: CollectionEntry<"post" | "note">,
	b: CollectionEntry<"post" | "note">,
) {
	const getDate = (entry: CollectionEntry<"post" | "note">): Date => {
		if (entry.data.date) return entry.data.date;
		if (entry.data.data_created) return entry.data.data_created;
		if (entry.data.date_modified) return entry.data.date_modified;
		return new Date();
	};

	return getDate(b).getTime() - getDate(a).getTime();
}
