# AI Cover Letter Generator

A modern web application to generate professional cover letters using AI (Google Gemini). Built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- **AI-Powered Generation**: Create tailored cover letters using Google Gemini.
- **Profile Management**: Save your personal info for quick reuse.
- **Work Experience**: Add and manage multiple work experiences.
- **PDF Export**: Download generated letters as PDF.
- **Letter History**: Save and manage previously generated letters.
- **Customizable Tone**: Select your preferred writing tone.
- **Edit & Copy**: Edit generated letters, copy to clipboard, or export.

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/ai-cover-letter-ts.git
   cd ai-cover-letter-ts
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**

   Copy `.env.example` to `.env` and add your Gemini API key:

   ```
   VITE_GEMINI_API_KEY="YOUR_GEMINI_API_KEY_GOES_HERE"
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in browser:**
   Visit [http://localhost:5173](http://localhost:5173)

## Project Structure

```
ai-cover-letter-ts/
├── src/
│   ├── components/      # Reusable UI components
│   ├── lib/             # Hooks, API clients, types, utils
│   ├── pages/           # Main app pages (Create, Saved, Profile, etc.)
│   ├── layout.tsx       # App layout and metadata
│   ├── main.tsx         # App entry point
│   └── index.css        # Tailwind and global styles
├── .env.example         # Example environment variables
├── package.json
├── vite.config.ts
└── README.md
```

## Usage

- **Create Letter**: Fill in your info, job details, and work experience. Click "Generate" to create a cover letter.
- **Profile**: Save your personal info for future use.
- **Saved Letters**: View, edit, export, or delete previously generated letters.

## Environment Variables

- `VITE_GEMINI_API_KEY` – Your Google Gemini API key.

## Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run preview` – Preview production build
- `npm run lint` – Lint code
