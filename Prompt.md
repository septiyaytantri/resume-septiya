Build a modern portfolio + resume website with blog and admin dashboard using:

Framework: Next.js (App Router, latest version)
Styling: Tailwind CSS
Database: PostgreSQL (or MySQL)
ORM: Prisma
Auth: NextAuth / custom JWT auth with bcrypt
Deployment ready (Vercel friendly)
🎨 FRONTEND (PUBLIC WEBSITE)

Gunakan semua spesifikasi design sebelumnya + tambahkan:

🌐 Routing
/ → Landing Page (Portfolio)
/blog → List Blog
/blog/[slug] → Detail Blog
/login → Admin Login
/admin → Dashboard
/admin/blog → CRUD Blog
🧱 STRUKTUR FOLDER (BEST PRACTICE NEXT.JS)
/app
  /(public)
    page.tsx
    blog/
      page.tsx
      [slug]/page.tsx

  /(auth)
    login/page.tsx

  /(admin)
    admin/
      layout.tsx
      page.tsx
      blog/
        page.tsx
        create/page.tsx
        edit/[id]/page.tsx

/components
  ui/
  layout/
  blog/
  dashboard/

/lib
  db.ts
  auth.ts
  utils.ts

/prisma
  schema.prisma

/styles
  globals.css

/middleware.ts
🗄️ DATABASE DESIGN (PRISMA)
📌 PROMPT DB SCHEMA

Design a clean and scalable database schema for:

1. Admin (Authentication)
id
name
email (unique)
password (bcrypt hashed)
created_at
2. Blog
id
title
slug (unique)
content (rich text / HTML)
excerpt
thumbnail
status (draft / published)
published_at
created_at
updated_at
3. Category (Optional but recommended)
id
name
slug
4. Tag
id
name
slug
5. BlogTag (Many-to-Many)
blog_id
tag_id
💡 PRISMA SCHEMA EXAMPLE
model Admin {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
}

model Blog {
  id          String   @id @default(uuid())
  title       String
  slug        String   @unique
  content     String
  excerpt     String?
  thumbnail   String?
  status      String   @default("draft")
  publishedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  tags        BlogTag[]
}

model Tag {
  id    String @id @default(uuid())
  name  String
  slug  String @unique

  blogs BlogTag[]
}

model BlogTag {
  id     String @id @default(uuid())
  blog   Blog  @relation(fields: [blogId], references: [id])
  blogId String

  tag    Tag   @relation(fields: [tagId], references: [id])
  tagId  String
}
🔐 AUTH SYSTEM (BCRYPT + PROTECTION)
📌 PROMPT AUTH

Implement authentication system with:

Password hashing using bcrypt
Login via email + password
Session using JWT or NextAuth
Protect all /admin/* routes using middleware
Redirect unauthenticated users to /login
💡 LOGIN FLOW
User input email + password
Compare with bcrypt hash
Generate session/token
Store in cookie (httpOnly)
Middleware check for /admin
🧩 MIDDLEWARE
// middleware.ts
import { NextResponse } from "next/server"

export function middleware(req) {
  const token = req.cookies.get("token")

  if (!token && req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return NextResponse.next()
}
🔑 LOGIN PAGE DESIGN
Centered card
White background
Maroon button
Input:
Email
Password
Button: "Login"
Clean minimal UI
🧑‍💻 ADMIN DASHBOARD
📌 PROMPT DASHBOARD UI

Design a simple and elegant admin dashboard with:

Layout
Sidebar (left)
Topbar (minimal)
Content area
Sidebar Menu
Dashboard
Blog
Logout
Dashboard Page
Welcome message
Stats cards:
Total Blog
Published
Draft
Blog Management Page
Table list:
Title
Status
Created Date
Action (Edit, Delete)
Button: "Create Blog"
Create/Edit Blog Page

Form:

Title
Slug (auto generate)
Thumbnail upload
Excerpt
Content (rich text editor, e.g. TipTap / Editor.js)
Tags (multi select)
Status (Draft / Publish)

Button:

Save Draft
Publish
🎨 ADMIN DESIGN STYLE
Clean dashboard style
White background
Maroon accent
Card-based UI
Table modern (rounded, shadow)
Buttons:
Primary: maroon
Secondary: outline
✍️ BLOG FRONTEND
📌 BLOG LIST
Grid 3 column
Card:
Image
Title
Excerpt
Read more
📌 BLOG DETAIL
Large title
Author (optional: Septiya)
Date
Content (formatted)
Tags below
⚙️ API STRUCTURE
/api/auth/login
/api/blog
/api/blog/[id]
🔥 EXTRA BEST PRACTICES
Slug auto generate from title
SEO:
meta title
meta description
Use loading skeleton
Image optimization (Next Image)
Validation (Zod)
🧠 FINAL GOAL

The result should feel like:

🔥 Professional portfolio
✍️ Personal blog system
🧑‍💻 Simple CMS
🚀 Production-ready