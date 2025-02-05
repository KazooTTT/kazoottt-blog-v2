import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

function removeDupsAndLowerCase(array: string[]) {
	return [...new Set(array.map((str) => str.toLowerCase()))];
}

const baseSchema = z.object({
	title: z.string()
});

const post = defineCollection({
	loader: glob({ base: "./src/content/post", pattern: "**/*.{md,mdx}" }),
	schema: () =>
		baseSchema.extend({
			description: z.string().optional().nullable(),
			draft: z.boolean().default(false),
			banner: z.string().optional(),
			tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
			categories: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
			date: z.union([z.string(), z.date()]).transform((val) => new Date(val)),
			date_modified: z.date().optional(),
		}),
});

const note = defineCollection({
	loader: glob({ base: "./src/content/note", pattern: "**/*.{md,mdx}" }),
	schema: baseSchema.extend({
		description: z.string().optional().nullable(),
		date: z.union([z.string(), z.date()]).transform((val) => new Date(val)),
	}),
});


export const collections = { post, note };
