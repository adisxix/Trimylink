# Trimylink

Trimylink is a modern, full-featured URL shortener and link management platform designed to help users trim, track, and optimize their web links. Built with React and powered by a Supabase cloud database, Trimylink simplifies the process of creating custom, memorable short links that can easily replace long, cluttered URLs. Beyond basic URL shortening, the platform features a comprehensive real-time statistics dashboard that tracks total clicks, geographic location data, and device distribution metrics for every active link. Users can quickly generate and download high-quality QR codes for their short links, delete inactive or outdated redirections, and organize everything under a streamlined personal workspace.

## Features

- Custom & Random Short Links
- Real Time Click Analytics
- Geographic & Device Tracking
- Dynamic QR Code Generation
- Secure Authentication
- Responsive Premium UI
- One-Click Actions

## Tech Stack

- ReactJS
- Tailwind CSS
- Recharts
- Supabase
- Lucide React Icons
- React QR Code

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

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase anon/public key |


## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.


## 👤 Author

**Aditya Sharma**

- GitHub: [@adisxix](https://github.com/adisxix)

