import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const caseStudies = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/case-studies" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    tags: z.array(z.string()),
    order: z.number(),
    ndaNote: z.string().optional(),
    role: z.string(),
    scope: z.string(),
    collaboration: z.string(),
    status: z.string(),
    showcaseItems: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    ),
  }),
});

export const collections = {
  "case-studies": caseStudies,
};
