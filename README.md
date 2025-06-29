# 🏦 Horizon Bank App

A modern, responsive, and secure banking dashboard built with Next.js, Tailwind CSS, and Plaid API. Horizon simulates a digital banking experience where users can sign up, log in, connect their bank accounts via Plaid, and visualize their financial data in real time — all with beautiful animations and clean UI.

## 🚀 Live Preview
> _This app is under active development by [Marcos Sanchez](https://www.linkedin.com/in/marcos-web-dev/)._  
Use this demo account to explore:

Email: holamundo@gmail.com
Password: holamundo

markdown
Copiar
Editar

---

## 🌟 Features

✅ **Authentication System**  
– Sign up and sign in forms powered by React Hook Form and Zod validation  
– Password-protected access to dashboard  
– Animated UI with Framer Motion

✅ **Bank Account Integration via Plaid**  
– Real-time secure connection to mock bank accounts  
– OAuth flow using `react-plaid-link`  
– Token management and public-to-access exchange

✅ **Responsive Dashboard**  
– Sidebar and mobile navigation  
– Real-time balance overview  
– User profile and bank account cards  
– Animated charts with Doughnut breakdown

✅ **Clean UI & Developer UX**  
– Modular components (`Sidebar`, `MobileNav`, `AuthForm`, `PlaidLink`, etc.)  
– Tailwind CSS + custom styles  
– Developer-friendly structure with `/components`, `/lib`, and `/constants`

---

## 🛠 Tech Stack

- **Frontend**: Next.js 13 (App Router), React 18, Tailwind CSS, Framer Motion  
- **Backend**: Server Actions (`/lib/actions`), Node.js  
- **Bank Integration**: Plaid API  
- **Forms & Validation**: React Hook Form, Zod  
- **Authentication**: Custom logic using secure API routes  
- **Charts**: Chart.js (via `DoughnutChart`)  
- **State & Navigation**: React hooks, Next Navigation API

---

## 📦 Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/marcosSanchez-dev/bank_app.git
   cd bank_app
Install dependencies

bash
Copiar
Editar
npm install
# or
yarn
Create .env file
Add your environment variables for Plaid and other services.

bash
Copiar
Editar
PLAID_CLIENT_ID=your_client_id
PLAID_SECRET=your_secret
PLAID_ENV=sandbox
Run the development server

bash
Copiar
Editar
npm run dev
Open in browser
Go to http://localhost:3000

📂 Folder Structure
bash
Copiar
Editar
/app
  /sign-in
  /sign-up
  /dashboard
/components
  AuthForm.tsx
  MobileNav.tsx
  Sidebar.tsx
  TotalBalanceBox.tsx
  PlaidLink.tsx
/lib
  /actions
  /utils
💡 Future Improvements
Transaction history with filtering

Budget and expense tracking

Notification system

OAuth provider (Google, GitHub)
