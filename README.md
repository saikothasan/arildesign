# Tech Blog Platform

A modern, responsive tech blog platform built with Next.js 13, TypeScript, and Tailwind CSS. Features server-side rendering, dynamic routing, and a clean, professional design.

## Features

- 🚀 Built with Next.js 13 App Router
- 💻 TypeScript for type safety
- 🎨 Tailwind CSS for styling
- 🌙 Dark mode support
- 📱 Fully responsive design
- 🔍 Search functionality
- 🏷️ Category-based navigation
- 📝 Markdown blog posts
- 💬 Comments system
- 📊 Pagination
- 📱 Mobile-friendly navigation
- 📧 Newsletter subscription
- 🔗 Social sharing
- 📑 Table of contents
- 📰 RSS feed

## Tech Stack

- [Next.js 13](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [React Markdown](https://github.com/remarkjs/react-markdown)
- [Gray Matter](https://github.com/jonschlinkert/gray-matter)

## Getting Started

### Prerequisites

- Node.js 16.8 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/saikothasan/arildesign.git
cd arildesign
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your environment variables:
```env
NEXT_PUBLIC_VERCEL_URL=http://localhost:3000
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
arildesign/
├── app/                    # Next.js 13 app directory
│   ├── api/               # API routes
│   ├── category/          # Category pages
│   ├── posts/            # Individual post pages
│   ├── search/           # Search page
│   └── page.tsx          # Home page
├── components/           # React components
├── content/             # Markdown blog posts
│   └── posts/
├── lib/                 # Utility functions
├── public/             # Static assets
└── styles/            # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Writing Blog Posts

Create new blog posts by adding Markdown files to the `content/posts` directory. Each post should include frontmatter with the following fields:

```markdown
---
title: "Your Post Title"
date: "2024-02-13"
category: "Category Name"
excerpt: "Brief description of your post"
author:
  name: "Author Name"
  image: "/authors/author-image.jpg"
image: "/images/post-image.jpg"
---

Your post content here...
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
