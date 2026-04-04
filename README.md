# Achievers Academy Platform 🎓

A modern, responsive, and minimalist educational management platform built for Achievers Academy. This application serves as an admission and fee portal for students and parents while providing a secured management dashboard for teachers.

## UI

<img width="1898" height="866" alt="Screenshot 2026-04-04 130247" src="https://github.com/user-attachments/assets/280138a5-1df9-4208-970f-e6855534990a" />

<img width="1900" height="868" alt="Screenshot 2026-04-04 130258" src="https://github.com/user-attachments/assets/bb93ba57-8154-44a4-b311-a6d9f205cdf8" />

<img width="1901" height="869" alt="Screenshot 2026-04-04 130308" src="https://github.com/user-attachments/assets/fba84a4c-b79a-443a-99b3-f8b5f319fcde" />

<img width="1896" height="872" alt="Screenshot 2026-04-04 130320" src="https://github.com/user-attachments/assets/ef8a53a2-7ab2-4468-812c-86bc8eb6cf4b" />

<img width="1901" height="865" alt="Screenshot 2026-04-04 130350" src="https://github.com/user-attachments/assets/ab71a231-3bd3-450b-8057-714c1780e1e9" />

<img width="1908" height="866" alt="Screenshot 2026-04-04 130400" src="https://github.com/user-attachments/assets/cb943a17-94d5-4425-80e9-e5e0bb610546" />

<img width="1915" height="866" alt="Screenshot 2026-04-04 130409" src="https://github.com/user-attachments/assets/35cd4c87-cde8-4a91-8006-59cb3539afa4" />

<img width="1896" height="865" alt="Screenshot 2026-04-04 130420" src="https://github.com/user-attachments/assets/38063776-b1fa-4927-9ce7-6d428e76e95b" />



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
