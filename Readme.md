# Jiten Mohanty | Frontend Developer Portfolio

![Portfolio Screenshot](public/og-image.jpg)

Welcome to the portfolio of **Jiten Mohanty**, a dedicated **Full-Stack Web Developer** with expertise in **React.js, Next.js, Node.js**, and modern web technologies. This portfolio showcases projects, skills, and experiences demonstrating hands-on work in both frontend and backend development.

---

## 🚀 Portfolio Features

- **Fully Responsive Design** – Optimized for desktop, tablet, and mobile devices.
- **Animated Background** – Interactive particle background powered by **Three.js**.
- **Dynamic Theming** – Light & dark mode supported using `next-themes`.
- **Smooth Scrolling** – Scroll-to-top functionality and smooth navigation.
- **Interactive UI Components** – Hero, About, Skills, Projects, Contact sections.
- **Toast Notifications** – Real-time feedback using custom Toaster component.
- **SEO Optimized** – Metadata and Open Graph tags included for better discoverability.

---

## 🛠 Tech Stack

- **Frontend:** React.js, Next.js (App Router), Tailwind CSS, TypeScript  
- **Backend:** Node.js, Express.js (for backend APIs if needed)  
- **3D/Animation:** Three.js for interactive particle background  
- **State Management:** React Context API  
- **Theming:** `next-themes` for light/dark mode support  
- **Deployment:** Vercel (production-ready, SSR + client rendering)  
- **Other Tools:** Google Fonts (Inter), EmailJS (for contact form)

---

## 📂 Project Structure

├── app
│ ├── layout.tsx # Root layout with ThemeProvider & animated background
│ ├── page.tsx # Home page importing Hero, About, Skills, Projects, Contact
│ └── globals.css # Global styles
├── components
│ ├── animated-background.tsx
│ ├── hero.tsx
│ ├── about.tsx
│ ├── skills.tsx
│ ├── projects.tsx
│ ├── contact.tsx
│ ├── footer.tsx
│ ├── scroll-to-top.tsx
│ ├── ClientNavbar.tsx
│ ├── theme-provider.tsx
│ └── ui
│ └── toaster.tsx
├── public
│ ├── og-image.jpg # Open Graph preview image
│ └── other assets
├── package.json
└── README.md



---

## 🌟 Key Components

### `AnimatedBackground`
- Custom 3D particle animation using **Three.js**
- Interactive with mouse movement
- Fully client-side to prevent SSR mismatches

### `ThemeProvider`
- Manages light/dark mode
- Uses `next-themes` for system preference detection
- Prevents hydration mismatches with `suppressHydrationWarning`

### Hero, About, Skills, Projects, Contact
- Modular sections for a clean portfolio layout
- Responsive design with Tailwind CSS
- Each section is a **client component** where necessary

---

## 📈 Features in Action

- **Dark/Light Mode:** Automatic system preference detection
- **Scroll-to-Top:** Smoothly navigates back to top
- **Toaster Notifications:** For real-time feedback
- **3D Background:** Dynamic particle animation that reacts to mouse movement

---

## ⚡ Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/jitenmohanty/portfolio.git
cd portfolio

## ⚡ Installation & Setup

```markdown

⚡ Installation & Setup
1. Clone the repository

```bash
git clone https://github.com/jitenmohanty/portfolio.git

cd portfolio
```

2. Install dependencies

```bash
npm install
```

3. Run locally

```bash
npm run dev
```
Open http://localhost:3000
 to view the portfolio.

4. Build for production

```bash
npm run build
npm start
```

📌 Notes

All client-only components (like `AnimatedBackground`) use "use client" to prevent SSR hydration errors.

Dynamic values like `window`, `Date.now()`, and `Math.random()` are used only in `useEffect` hooks to ensure consistent server-client rendering.

Metadata is optimized for SEO with Open Graph, keywords, and description fields.

🔗 Live Demo

https://jitenmohanty.vercel.app

📫 Contact

Email: your.email@example.com

LinkedIn: linkedin.com/in/jitenmohanty

GitHub: github.com/jitenmohanty

🎯 Goals

Showcase frontend skills using modern frameworks

Demonstrate understanding of SSR, client-side rendering, and hydration issues

Highlight interactive UI, animations, and performance optimization

⚙️ Future Improvements

Add blog section powered by Markdown or CMS

Integrate contact form with serverless backend

Implement multilingual support

Add more portfolio projects dynamically from JSON or API
```
