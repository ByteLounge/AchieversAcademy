# Achievers Academy Platform 🎓

A modern, responsive, and minimalist educational management platform built for Achievers Academy. This application serves as an admission and fee portal for students and parents while providing a secured management dashboard for teachers.

## Features ✨

### User Dashboard (Public)
* **Responsive Landing Page:** Clean UI with course details, timetables, and contact parameters.
* **Student Registration:** Smooth multi-step intake form with built-in client-side PDF generation natively allowing offline printable registration proofs.
* **Fee Payment Gateway:** QR Code integration specifically matched to Achievers Academy's Google Pay configuration (`konuriveena@okhdfcbank`). Users can mock submit transaction IDs that fall into a pending verification queue.
* **Parent Portal:** Simulated mock UI to track daily attendance, examination remarks, and broadcast notices.

### Teacher Dashboard (Admin/Secure)
* **Firebase Authentication Guard:** The entire `/admin` portal is locked by Firebase exclusively to the administrator credential `konuriveena@gmail.com`.
* **Student Directory:** Track incoming candidates through Firestore realtime snapshots.
* **Fee Verification Workflow:** Review pending transactions pushed via the public module. Includes approve/reject mechanisms driving Firestore `updateDocs`.
* **Receipt Engine System:** Instantly generates branded Achievers Academy PDF receipts (incorporating custom SVGs, watermarks, Pacifico scripts) when verifying 10th grade versus standard grade installments.

## Tech Stack 🛠️

- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Custom Vanilla CSS (Responsive variables & Flexbox design systems)
- **Icons:** Lucide React
- **PDF Generation:** `html2canvas` & `jspdf`
- **Backend Auth & DB:** Firebase Authentication & Cloud Firestore (NoSQL)
- **Deployment & Routing Ready:** Designed with a `netlify.toml` enabling SPA client-side router caching.

## Local Development 🚀

1. Clone the repository:
   ```bash
   git clone https://github.com/ByteLounge/AchieversAcademy.git
   ```
2. Navigate into the directory:
   ```bash
   cd AchieversAcademy
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. View the platform live at `http://localhost:5173`. 

## Project Architecture 📂

```text
src/
├── components/
│   ├── admin/      # Secure teacher dashboards (AuthGuard, FeeVerification, StudentManagement)
│   └── user/       # Public-facing modules (Hero, Registration, Payments)
├── lib/            # External integrations (firebase.ts config)
├── utils/          # Global helper libraries (pdfUtils converting DOM -> PDF)
├── pages/          # Primary root rendering (AdminDashboard vs UserDashboard)
└── index.css       # Core design system overriding standard tokens
```

*Designed with ❤️ for Achievers Academy*
