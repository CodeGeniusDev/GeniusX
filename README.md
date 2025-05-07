# CodeGeniusBot

A simple chatbot built with React, powered by the Gemini API, and styled with Tailwind CSS. This project, developed by CodeGenius.Dev, allows users to interact with an AI chatbot for conversational responses. The app is live at [https://geniusbot-three.vercel.app/](https://geniusbot-three.vercel.app/).

## Features

- Real-time chat with the Gemini API (using the `gemini-1.5-flash` model).
- Clean and responsive UI styled with Tailwind CSS.
- Markdown support for chat responses using `react-markdown`.
- Deployed on Vercel for easy access.

## Tech Stack

- **Frontend**: React
- **Styling**: Tailwind CSS
- **API**: Gemini API (`@google/generative-ai`)
- **Markdown Rendering**: `react-markdown`
- **Deployment**: Vercel

## Prerequisites

- Node.js (v16 or higher) and npm installed.
- A Gemini API key from Google AI Studio.

## Installation

1. **Clone the Repository** (if you have it in a Git repo, or skip if you’re working locally):

   ```bash
   git clone https://github.com/CodeGeniusDev/codegeniuschat.git
   cd gemini-chatbot
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Install Tailwind CSS and Dependencies**:

   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

4. **Configure Tailwind CSS**:

   - Update `tailwind.config.js`:
     ```javascript
     /** @type {import('tailwindcss').Config} */
     module.exports = {
       content: ["./src/**/*.{js,jsx,ts,tsx}"],
       theme: {
         extend: {},
       },
       plugins: [],
     };
     ```
   - Update `src/index.css`:
     ```css
     @tailwind base;
     @tailwind components;
     @tailwind utilities;
     ```

5. **Set Up the Gemini API Key**:
   - Replace the API key in `src/App.js` with your own:
     ```javascript
     const genAI = new GoogleGenerativeAI("YOUR_GEMINI_API_KEY");
     ```
   - **Note**: For production, move the API key to a backend server or use environment variables for security.

## Usage

1. **Run the App Locally**:

   ```bash
   npm start
   ```

   This will start the app at `http://localhost:3000`.

2. **Interact with the Chatbot**:
   - Type a message in the input field and press "Send" (or hit Enter).
   - The chatbot will respond using the Gemini API.

## Deployment

The app is deployed on Vercel at [https://geniusbot-three.vercel.app/](https://geniusbot-three.vercel.app/). To deploy your own version:

1. **Install the Vercel CLI**:

   ```bash
   npm install -g vercel
   ```

2. **Deploy to Vercel**:

   ```bash
   vercel
   ```

   - Follow the prompts:
     - Log in with GitHub.
     - Set up and deploy the project (`y`).
     - Choose the scope (`code-genius` or your preferred scope).
     - Link to existing project? (`n`).
     - Project name: `codegeniusbot` (or your preferred name).
     - Accept the default directory (`./`).

3. **Access the Live App**:
   - Vercel will provide a URL (e.g., `https://codegeniusbot.vercel.app`).

## Security Notes

- The Gemini API key is currently hardcoded in `src/App.js`, which is insecure for production. The key has been exposed in development and should be revoked after testing. Generate a new key in Google AI Studio.
- For production, move the API key to a backend server (e.g., Node.js with Express) or use a secure client-side solution like Firebase with Vertex AI.
- Store sensitive keys in environment variables on the backend, not in the client-side code.

## Troubleshooting

- **Tailwind CSS Not Working**:
  - Ensure `tailwind.config.js` includes the correct `content` paths.
  - Verify `index.css` has the Tailwind directives.
  - Restart the development server (`npm start`) after making changes.
- **Gemini API Errors**:
  - **403 (Invalid Key)**: Revoke the exposed key and generate a new one.
  - **429 (Rate Limit)**: Wait and retry if you’ve exceeded the free tier limits.
  - **500 (Server Error)**: Retry after a delay—it’s a server-side issue.

## Future Improvements

- Add a backend server to securely handle API requests.
- Implement a clear chat button to reset the conversation.
- Add dark mode with a theme toggle.
- Persist chat history in local storage.

## License

This project is for educational purposes and developed by CodeGenius.Dev. Contact `hafizabdullahabbad@gmail.com` for inquiries.
