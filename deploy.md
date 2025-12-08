# 🚀 How to Deploy MedAssist for Free

This guide will show you how to deploy the **MedAssist** application to the web for free using [Vercel](https://vercel.com/), the creators of Next.js.

## ✅ Prerequisites

1.  A [GitHub](https://github.com/) account.
2.  A [Vercel](https://vercel.com/signup) account (you can sign up using GitHub).
3.  Your **Azure OpenAI API Keys** (from your `.env.local` file).

---

## 📦 Step 1: Push Your Code to GitHub

First, make sure your code is on GitHub. If you haven't done this yet:

1.  **Create a new repository** on GitHub (e.g., named `med-assist`).
2.  Open your terminal in the project folder and run:

```bash
# Initialize git if you haven't
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit"

# Link to your GitHub repo (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/med-assist.git

# Push to GitHub
git push -u origin main
```

_(If you already have the code on GitHub, skip to Step 2.)_

---

## ☁️ Step 2: Import into Vercel

1.  Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **"Add New..."** -> **"Project"**.
3.  You will see a list of your GitHub repositories. Find `med-assist` and click **"Import"**.

---

## 🔑 Step 3: Configure Environment Variables (CRITICAL)

This is the most important step. Your app needs the API keys to work.

1.  In the Vercel import page, look for the **"Environment Variables"** section and expand it.
2.  Add the following variables one by one (copy values from your local `.env.local` file):

| Name                  | Value                                     |
| --------------------- | ----------------------------------------- |
| `GPT_API_KEY`         | `your_actual_api_key`                     |
| `GPT_ENDPOINT`        | `https://your-resource.openai.azure.com/` |
| `GPT_DEPLOYMENT_NAME` | `your_deployment_name` (e.g., gpt-4o)     |

> **Note:** Do NOT wrap values in quotes. Just paste the raw text.

---

## 🚀 Step 4: Deploy

1.  Click the big **"Deploy"** button.
2.  Wait about 1-2 minutes. Vercel will build your application.
3.  Once done, you will see a **"Congratulations!"** screen with fireworks. 🎆

---

## 🌐 Step 5: Test Your Live App

1.  Click on the **Snapshot** image or the **Domain** link provided (e.g., `med-assist-tau.vercel.app`).
2.  Your app is now live!
3.  Test it by sending a message "Hello" to make sure the AI connection is working.

---

## 🔄 Updating Your App

To update your live site, simply **push** changes to GitHub:

```bash
git add .
git commit -m "Fixed a bug"
git push
```

Vercel will detect the push and **automatically redeploy** your new version in seconds.

---

## Troubleshooting

- **AI Not Replying?** Check your Environment Variables in Vercel (Settings -> Environment Variables). Make sure the API Key and Endpoint are correct.
- **Build Failed?** Check the "Logs" tab in Vercel deployment details to see the error.
