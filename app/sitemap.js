export default function sitemap() {
  return [
    {
      url: 'https://bravehearttourandtravel.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://bravehearttourandtravel.com/admin',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.1,
    },
  ]
}
