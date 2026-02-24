import { MetadataRoute } from "next";

const BASE = "https://leafready.ca";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE}/en`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: { fr: `${BASE}/fr`, en: `${BASE}/en` } },
    },
    {
      url: `${BASE}/fr`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: { en: `${BASE}/en`, fr: `${BASE}/fr` } },
    },
    {
      url: `${BASE}/en/support`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
      alternates: { languages: { fr: `${BASE}/fr/support` } },
    },
    {
      url: `${BASE}/fr/support`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
      alternates: { languages: { en: `${BASE}/en/support` } },
    },
    {
      url: `${BASE}/en/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: { fr: `${BASE}/fr/faq`, en: `${BASE}/en/faq` } },
    },
    {
      url: `${BASE}/fr/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: { en: `${BASE}/en/faq`, fr: `${BASE}/fr/faq` } },
    },
  ];
}
