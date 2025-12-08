# 🧠 MedAssist Codebase Explained

This document provides a deep dive into the **technical architecture** of MedAssist. Use this to explain the code to judges or onboard new team members.

---

## 📂 1. High-Level Project Structure

```
med-assist/
├── app/                        # Next.js App Router (Pages & API)
│   ├── api/medassist/route.ts  # 🧠 THE BRAIN: Backend API Endpoint
│   ├── chat/page.tsx           # 💬 Chat Interface Page
│   ├── page.tsx                # 🏠 Landing Page
│   └── layout.tsx              # Root Layout (Fonts, Global CSS)
├── components/                 # React UI Components
│   ├── ChatInterface.tsx       # 📱 Main Chat Container & Logic
│   ├── MessageComposer.tsx     # 🎤 Input Area (Voice/Text/Image)
│   ├── Navbar.tsx              # 🧭 Navigation Bar
│   ├── FirstAidModal.tsx       # 🩹 Offline First Aid Guide
│   ├── BodyMapModal.tsx        # 🧍 Visual Symptom Selector
│   ├── HealthPostFinder.tsx    # 🏥 Offline Health Center Locator
│   └── HistoryPanel.tsx        # 🕒 Sidebar for Chat History
├── lib/
│   └── utils.ts                # Helper functions (Tailwind class merger)
├── public/                     # Static Assets (Images, Logos)
├── .env.local                  # 🔑 API Keys (ignored by git)
└── package.json                # Dependencies list
```

---

## 🧩 2. Key Components Breakdown

### 🧠 The Backend: `app/api/medassist/route.ts`

This file is the **core intelligence** of the application.

- **What it does:** Receives user input (text/image), processes it with Azure OpenAI, and returns a structured JSON response.
- **Key Logic:**
  - **System Prompt:** A strictly engineered set of rules (`BASE_SYSTEM_PROMPT_RULES`) that forces the AI to be clinical, concise, and structured.
  - **Dynamic Language Prompting:** Detects if the user typed/spoke Nepali (RegEx check `[\u0900-\u097F]`) and injects a rule: _"You MUST respond in Nepali ONLY."_
  - **Vision Support:** If an image is present, it constructs a multimodal payload (`image_url`) for GPT-4o Vision.
  - **JSON Enforcement:** Uses `response_format: { type: "json_object" }` to ensure the AI returns machine-readable data (buttons, urgency levels) instead of plain text.

### 📱 The Frontend Logic: `components/ChatInterface.tsx`

This is the **controller** of the application.

- **State Management:** Uses `useState` to track:
  - `messages` (Current chat conversation)
  - `isListening` / `isSpeaking` (Voice states)
  - `image` (Uploaded file)
- **Voice Integration:**
  - **Input (STT):** Uses the browser's `SpeechRecognition` API. It listens to the microphone and converts speech to text _before_ sending it to the AI.
  - **Output (TTS):** Uses `window.speechSynthesis` to read the AI's response allowed. It dynamically changes valid voices (e.g., trying to find a Nepali or Hindi voice) based on the language.
- **Offline Tools integration:** Manages the visibility of First Aid, Body Map, and Health Finder modals.

### 🎤 The Input: `components/MessageComposer.tsx`

- **Function:** A clean UI wrapper for the text area and action buttons.
- **Features:**
  - **Auto-resizing Textarea:** Expands as you type.
  - **Language Toggle:** Switches the _speech recognition language_ between `en-US` and `ne-NP` (Nepali).
  - **Image Handling:** Hidden file input triggered by the paperclip icon for uploading reports.

### 🩹 Offline Modules (The "Rural" Features)

- **`FirstAidModal.tsx`**: Contains a static JSON object with first aid steps for Snake Bites, Burns, etc. _Works 100% offline._
- **`BodyMapModal.tsx`**: Interactive SVG. Clicking a part (e.g., "Head") sends the text "I have pain in my Head" to the chat.
- **`HealthPostFinder.tsx`**: Static list of health posts organized by district.

---

## 🔄 3. Data Flow: The Lifecycle of a Message

1.  **User Action:** User taps "Mic" and says _"Malai jworo aayo"_ (I have fever).
2.  **Frontend (Browser):**
    - `SpeechRecognition` captures audio -> converts to text "Malai jworo aayo".
    - `MessageComposer` sends this text to `ChatInterface`.
3.  **API Call:** `ChatInterface` POSTs to `/api/medassist`:
    ```json
    { "message": "Malai jworo aayo", "voice_mode": true }
    ```
4.  **Backend (Server):**
    - `route.ts` detects Devanagari/Nepali keywords.
    - Updates System Prompt: _"User speaks Nepali. Respond in Nepali. Ask structured questions."_
    - Calls Azure OpenAI GPT-4o.
5.  **AI Processing:** GPT-4o analyzes symptoms -> Decides next question is about "Duration" -> Formats as MCQ.
6.  **Response:**
    ```json
    {
      "text": "तपाईंलाई कति दिन देखि ज्वरो छ?",
      "ui": { "choices": ["१-२ दिन", "३-४ दिन", "१ हप्ता भन्दा बढी"] },
      "speak": true
    }
    ```
7.  **Frontend Render:**
    - Displays the text bubble.
    - Renders 3 buttons for the choices (MCQ).
    - Auto-plays audio using Text-to-Speech (because `speak: true`).

---

## 🛠️ 4. Tech Stack Justification

- **Next.js:** Chosen for its hybrid ability. We serve the static landing page instantly (great for SEO/Marketing) while handling complex API logic securely on the server side.
- **Tailwind CSS:** Allows us to rapid-prototype the UI and ensure it looks perfect on mobile devices (which 99% of our rural users will use).
- **Azure OpenAI:** We chose Azure over standard OpenAI for **Data Privacy** (HIPAA compliance options) and **Reliability** (SLA guarantees), which are critical for healthcare apps.
- **LocalStorage:** We avoided a complex database (PostgreSQL/MongoDB) for this hackathon version to keep the app **lightweight, fast, and private**. User data stays on their phone.

---

## ❓ 5. Where is the "Magic"?

The "magic" isn't just one thing, it's the **integration**:

- Connecting **Native Browser Voice** -> **AI Intelligence** -> **Visual UI Generation**.
- The system prompt is the _secret sauce_—it prevents the AI from hallucinating or being chatty, effectively turning a General LLM into a **Specialized Medical Device**.
