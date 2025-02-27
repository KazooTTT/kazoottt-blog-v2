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
	return b.data.date.getTime() - a.data.date.getTime();
}

const datePriorityForNote = ["date", "date_modified", "data_created"];

export function collectionModifiedDateSort(
	a: CollectionEntry<"post" | "note">,
	b: CollectionEntry<"post" | "note">,
) {
	let dateA: Date = new Date(),
		dateB: Date = new Date();
	datePriorityForNote.forEach((key) => {
		if (a.data[key as keyof typeof a.data]) {
			dateA = a.data[key as keyof typeof a.data] as Date;
		}
		if (b.data[key as keyof typeof b.data]) {
			dateB = b.data[key as keyof typeof b.data] as Date;
		}
	});

	return dateB.getTime() - dateA.getTime();
}
