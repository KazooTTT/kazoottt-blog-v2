import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

function removeDupsAndLowerCase(array: string[]) {
	return [...new Set(array.map((str) => str.toLowerCase()))];
}

// 辅助函数：处理各种格式的日期
function processDate(val: string | number | Date): Date {
	// 如果是数字（如20250225），转换为字符串并格式化
	if (typeof val === "number") {
		const numStr = val.toString();
		// 假设格式为YYYYMMDD
		if (numStr.length === 8) {
			const year = numStr.substring(0, 4);
			const month = numStr.substring(4, 6);
			const day = numStr.substring(6, 8);
			return new Date(`${year}-${month}-${day}`);
		}
	}
	// 其他情况直接使用Date构造函数
	return new Date(val);
}

const baseSchema = z.object({
	title: z.string(),
});

const post = defineCollection({
	loader: glob({ base: "./src/content/post", pattern: "**/*.{md,mdx}" }),
	schema: () =>
		baseSchema.extend({
			description: z.string().optional().nullable(),
			draft: z.boolean().default(false),
			banner: z.string().optional(),
			tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
			date: z.union([z.string(), z.number(), z.date()]).transform(processDate),
			date_modified: z
				.union([z.string(), z.number(), z.date()])
				.optional()
				.transform((val) => (val ? processDate(val) : undefined)),
			data_created: z
				.union([z.string(), z.number(), z.date()])
				.optional()
				.transform((val) => (val ? processDate(val) : undefined)),
			category: z.string().optional().nullable(),
			fixedToTop: z.boolean().optional().default(false),
		}),
});

const note = defineCollection({
	loader: glob({ base: "./src/content/note", pattern: "**/*.{md,mdx}" }),
	schema: baseSchema.extend({
		description: z.string().optional().nullable(),
		date: z.union([z.string(), z.number(), z.date()]).transform(processDate),
		date_modified: z
			.union([z.string(), z.number(), z.date()])
			.optional()
			.transform((val) => (val ? processDate(val) : undefined)),
		data_created: z
			.union([z.string(), z.number(), z.date()])
			.optional()
			.transform((val) => (val ? processDate(val) : undefined)),
		tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
	}),
});

export const collections = { post, note };
