# Push Notifications Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement a push notification reminder system with creative game-themed messages and customizable timing, persisting settings in Supabase.

**Architecture:** 
- **Frontend (Vercel):** Permission request UI, subscription management, and Service Worker push handler.
- **Backend (Render):** Express API to save subscriptions and a `node-cron` job to trigger randomized notifications based on user-selected time slots.
- **Database (Supabase):** Store user preferences in `profiles` and subscription tokens in `push_subscriptions`.

**Tech Stack:** `web-push`, `node-cron`, Service Workers, Supabase, Express.

---

### Task 1: Environment & Database Setup

**Files:**
- Modify: `.env` (Vercel & Render)
- Database: Supabase SQL Editor

**Step 1: Instructions for VAPID Key Generation**
Run this command in your local terminal to generate the keys:
```bash
npx web-push generate-vapid-keys
```
**Step 2: Add keys to Environment Variables**
- Add `VITE_VAPID_PUBLIC_KEY` to Vercel and Render.
- Add `VAPID_PRIVATE_KEY` and `VAPID_SUBJECT` (mailto:your@email.com) to Render only.

**Step 3: Update Supabase Schema**
Run the following SQL in Supabase:
```sql
-- Update profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS notification_settings JSONB DEFAULT '{"enabled": false, "slots": ["09:00", "13:00", "18:00", "21:00"]}';

-- Create push_subscriptions table
CREATE TABLE IF NOT EXISTS push_subscriptions (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, subscription)
);
```

### Task 2: Service Worker Push Handler

**Files:**
- Modify: `public/sw.js`

**Step 1: Add push event listener**
Implement the `push` and `notificationclick` events in `public/sw.js`.

### Task 3: Backend Push API & Scheduler

**Files:**
- Modify: `server.js`
- Create: `src/services/NotificationService.js` (logic for backend)

**Step 1: Setup web-push in `server.js`**
Configure `web-push` with VAPID keys and add an endpoint `/api/notifications/subscribe`.

**Step 2: Implement Cron Job**
Use `node-cron` to check user time slots every hour and send random notifications from the predefined list of creative messages.

### Task 4: Frontend Settings UI

**Files:**
- Modify: `src/components/SettingsModal.tsx`
- Modify: `src/App.tsx`

**Step 1: Add Notification UI to SettingsModal**
- Add a toggle for "Push Reminders".
- Add multi-select buttons for the time slots (09:00, 13:00, 18:00, 21:00).

**Step 2: Logic to handle Permission & Subscription**
Implement the `subscribeToPush` function that triggers when the user enables notifications.

---

### Verification & Testing
1. **Manual Test**: Verify permissions can be requested and granted.
2. **Local Push**: Simulate push events in DevTools.
3. **Backend Test**: Verify that the cron job identifies the correct users and sends messages.