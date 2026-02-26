import { MetadataRoute } from "next";

const BASE = "https://leafready.ca";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE}/en`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          fr: `${BASE}/fr`,
          en: `${BASE}/en`,
          "x-default": `${BASE}/en`,
        },
      },
    },
    {
      url: `${BASE}/fr`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          en: `${BASE}/en`,
          fr: `${BASE}/fr`,
          "x-default": `${BASE}/en`,
        },
      },
    },
    {
      url: `${BASE}/en/support`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
      alternates: {
        languages: {
          fr: `${BASE}/fr/support`,
          en: `${BASE}/en/support`,
          "x-default": `${BASE}/en/support`,
        },
      },
    },
    {
      url: `${BASE}/fr/support`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
      alternates: {
        languages: {
          en: `${BASE}/en/support`,
          fr: `${BASE}/fr/support`,
          "x-default": `${BASE}/en/support`,
        },
      },
    },
    {
      url: `${BASE}/en/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          fr: `${BASE}/fr/faq`,
          en: `${BASE}/en/faq`,
          "x-default": `${BASE}/en/faq`,
        },
      },
    },
    {
      url: `${BASE}/fr/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          en: `${BASE}/en/faq`,
          fr: `${BASE}/fr/faq`,
          "x-default": `${BASE}/en/faq`,
        },
      },
    },
  ];
}
