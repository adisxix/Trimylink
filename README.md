# Trimylink

Trimylink is a modern, full-featured URL shortener and link management platform designed to help users trim, track, and optimize their web links. Built with React and powered by a Supabase cloud database, Trimylink simplifies the process of creating custom, memorable short links that can easily replace long, cluttered URLs. Beyond basic URL shortening, the platform features a comprehensive real-time statistics dashboard that tracks total clicks, geographic location data, and device distribution metrics for every active link. Users can quickly generate and download high-quality QR codes for their short links, delete inactive or outdated redirections, and organize everything under a streamlined personal workspace. With a focus on modern user experience, Trimylink integrates user authentication (sign-up, login, and profile customization including avatar uploads) to ensure that each user's links and analytics remain secure and private. The platform is designed with a premium, responsive interface that works seamlessly on desktop and mobile browsers alike. Whether you are a content creator looking to track link performance, a business sharing marketing campaigns, or an individual simplifying your sharing experience, Trimylink provides a powerful, robust, and completely cloud-deployable solution for link analytics.

---

## 🚀 Key Features

- **Custom & Random Short Links**: Shorten URLs with automatically generated random alphanumeric strings, or create personalized custom aliases (e.g., `trimylink.vercel.app/my-site`).
- **Real-Time Click Analytics**: Monitor your short links with comprehensive metrics including total clicks over time.
- **Geographic & Device Tracking**: Interactive charts showing the physical location (country/city) of visitors and the devices (desktop/mobile/tablet) used to click the links.
- **Dynamic QR Code Generation**: Automatically generates a downloadable QR code for every shortened link to bridge the gap between offline and online sharing.
- **Secure Authentication**: Built-in user authentication (sign up, sign in, log out) powered by Supabase Auth with support for user profile details and custom avatar uploads.
- **Responsive Premium UI**: Sleek dark mode design styled with Vanilla CSS and responsive layouts optimized for all viewport sizes.
- **One-Click Actions**: Quickly copy link endpoints, download QR codes, or delete links from your personal workspace.

---

## 🛠️ Tech Stack

- **Frontend Core**: React 19 (JavaScript)
- **Styling & Theme**: CSS (TailwindCSS framework with animations)
- **Routing**: React Router DOM v7 (supports layouts, route protection, and dynamic parameter parsing)
- **Database & Authentication**: Supabase (Cloud Postgres, Supabase Auth, and Supabase Storage for files)
- **Charts**: Recharts (for rendering location and device graphs)
- **Icons**: Lucide React
- **Validation**: Yup (schema validation for forms)
- **QR Code Engine**: React QRCode Logo

---

## 📂 Project Structure

```text
Trimylink - URL Shortener/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI elements (link cards, charts, UI dialogs)
│   │   └── ui/             # Form inputs, buttons, and dialog base components
│   ├── db/                 # Database API calls (Supabase integration)
│   │   ├── apiAuth.js      # Auth signup, login, profile updates
│   │   ├── apiClicks.js    # Fetch and record clicks
│   │   ├── apiUrls.js      # Create, delete, and fetch short links
│   │   └── supabase.js     # Supabase client initialization
│   ├── hooks/              # Custom React hooks (useFetch wrapper)
│   ├── layouts/            # Page layouts (header, footer, content container)
│   ├── pages/              # Main app pages (landing, auth, dashboard, redirect, stats)
│   ├── utils/              # Utility functions
│   ├── App.css             # Main styling rules
│   ├── App.jsx             # React router configuration and layouts mounting
│   ├── context.jsx         # User Authentication state provider
│   └── main.jsx            # Application mount point
├── .env                    # Local environment variables
├── package.json            # Application dependencies and script tasks
└── vercel.json             # Vercel SPA redirect/rewrite rules
```

---

## ⚙️ Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/adisxix/Trimylink.git
   cd "Trimylink - URL Shortener"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root folder of the project and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-supabase-url.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-anon-key
   ```

4. Run the local development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

---

## 🗄️ Supabase Schema Configuration

To run this project, configure the following tables and buckets in your Supabase project:

### 1. Database Tables

#### `urls` Table
- `id` (int8, primary key, identity)
- `title` (text)
- `original_url` (text)
- `short_url` (text)
- `custom_url` (text, nullable)
- `user_id` (uuid, references `auth.users`)
- `qr` (text)
- `created_at` (timestamptz)

#### `clicks` Table
- `id` (int8, primary key, identity)
- `url_id` (int8, references `urls.id` on delete cascade)
- `device` (text)
- `city` (text)
- `country` (text)
- `created_at` (timestamptz)

### 2. Row Level Security (RLS) Policies
* **`urls` Table**:
  - `SELECT`: Enable read access for **all users** (public / anonymous reads) so redirections function correctly.
  - `INSERT` / `UPDATE` / `DELETE`: Enable access for **authenticated users only** where `auth.uid() = user_id`.
* **`clicks` Table**:
  - `INSERT`: Enable insert access for **all users** (public / anonymous writes) so guest clicks can be registered.
  - `SELECT`: Enable read access for **authenticated users** whose `user_id` matches the owner of the referenced URL.

### 3. Storage Buckets
Create the following buckets under **Storage** and mark them as **Public**:
* **`qrs`**: Used to upload and store generated QR code images.
* **`profile_pic`**: Used to upload user avatar pictures during signup.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](file:///c:/Users/adsha/Desktop/Aditya/REACT%20JS/Projects/Trimylink%20-%20URL%20Shortener/LICENSE) file for details.

