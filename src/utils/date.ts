import { getDateSortByUpdateTime } from "@/data/post";
import { siteConfig } from "@/site.config";
import type { AllItem } from "@/types";

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

export function collectionDateSort(a: AllItem, b: AllItem) {
	return b.dateToCmp.getTime() - a.dateToCmp.getTime();
}

export function getLatestUpdatedPost(a: AllItem, b: AllItem) {
	return getDateSortByUpdateTime(b).getTime() - getDateSortByUpdateTime(a).getTime();
}

export function convertToBeijingTime(date: Date) {
	const options = {
		timeZone: "Asia/Shanghai",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	};
	const formatter = new Intl.DateTimeFormat("zh-CN", options as Intl.DateTimeFormatOptions);
	const formattedDate = formatter.format(date);
	return formattedDate;
}
