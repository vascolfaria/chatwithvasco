# **App Name**: vAIsco

## Core Features:

- Chat Interface: Single-page chat interface for recruiters to ask questions.
- AI-Driven Persona: AI-powered responses impersonating Vasco, based on a predefined prompt and context, with the tool reasoning to decide when to include specific information.
- Persona Presentation: Display profile picture, title ('Senior Product Manager'), and a non-AI-like text to simulate a real conversation.
- Real-Time Chat: Real-time message display with clear visual separation between recruiter questions and AI persona responses.
- Loading Indicator: Loading indicator to show when the AI is generating a response.
- Message Limit: Session-based message limit (15 messages per day) managed using cookies. Cookies will keep track of the ammount of message the user has sent in the chat and if they have already reach 15 message no longer be able to send any other.
- API Key Management: Environment variable configuration for API keys (.env for local, secrets manager for production), the key being 'GEMINI_API_KEY'.

## Style Guidelines:

- Primary color: Deep blue (#293B5F) to convey trust, intelligence, and professionalism.
- Background color: Light gray (#E7E8EA), nearly desaturated hue of the primary color, creating a subtle contrast for readability.
- Accent color: Soft violet (#845ef7), analogous to blue, but brighter and more saturated for interactive elements.
- Font: 'Inter', a sans-serif font, is recommended for both headlines and body text, to impart a modern, machined, objective and neutral look. Inter is very suitable for creating an AI agent since it's seen in multiple SaaS websites that are B2B focused.
- Simple, professional icons for user actions (send, clear) in a style consistent with the font choice.
- Clean and intuitive layout with a focus on readability, mimicking popular chat applications.
- Subtle animations for loading indicators and message transitions to provide feedback without distracting the user.