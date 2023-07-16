This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# photostaduihost

## 🚨 This project is now archived

#### Where to look for examples

- You can find up to date examples of how to use Next.js at https://photostadui-deploy.vercel.app

---

# Next.js PhotoStad Project

This is our final project that uses Next.js.

## Feature

- Authentication via Email and Google Account
- Uses Express combined with Passport JS for authentication and route handling
- Session support with secure HTTP Only cookies and CSRF Tokens
- DaisyUI wth tailwindcss and flowbite with flowbite components for React

  You can see a live demo at **https://photostadui-deploy.vercel.app/**

## Running locally in development mode

To get started, just clone the repository and run `npm install && npm run dev`:

    git clone https://github.com/cstadservice/photostad-ui.git
    npm install
    npm run dev

Note: If you are running on Windows run install --noptional flag (i.e. `npm install --no-optional`) which will skip installing fsevents.

## Building and deploying in production

If you wanted to run this site in production, you should install modules then build the site with `npm run build` and run it with `npm start`:

    npm install
    npm run build
    npm start

You should run `npm run build` again any time you make changes to the site.

Note: If you are already running a webserver on port 8080 (e.g. Macs usually have the Apache webserver running on port 8080) you can still start the example in production mode by passing a different port as an Environment Variable when starting (e.g. `PORT=3000 npm start`)

## Base URL: https://photostadui-deploy.vercel.app/

- Page URL:

1. Home: /
2. About Us: /aboutus
3. Dashboard: /admin/login

-Button

1. Log in: /admin/dashboard

click here: /sendemail
send: /resetpassword

## Base URL: https://photostad-editor.vercel.app/

-Editor URL:

1. Watermark: /watermark
2. Certificate: /generatecertificate

- Button

1. Edit Watermark: /watermark
2. Edit Certificate: /generatecertificate
# photostad-v5
