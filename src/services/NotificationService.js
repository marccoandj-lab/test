import webpush from 'web-push';
import cron from 'node-cron';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || ''
);

if (process.env.VITE_VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT || 'mailto:admin@economyswitch.com',
    process.env.VITE_VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );
}

const REMINDER_MESSAGES = [
    { title: 'Circular Economy 🔄', body: 'Your circular economy is slowing down! Come back and close the loop!' },
    { title: 'Market Alert 📈', body: 'Market crash alert! Actually, it is just your capital waiting to be invested.' },
    { title: 'Save the Planet 🌿', body: 'The linear economy is taking over! Save the planet with your sustainable choices!' },
    { title: 'Production Update 🏭', body: 'Your factory is idle! Time to generate some green capital!' },
    { title: 'Turn Waiting 🎲', body: 'A new turn is waiting for you. Will you invest or save?' }
];

export const initNotifications = (app) => {
  // Endpoint to save/update subscription
  app.post('/api/notifications/subscribe', async (req, res) => {
    const { userId, subscription } = req.body;
    
    if (!userId || !subscription) {
      return res.status(400).json({ error: 'Missing userId or subscription' });
    }

    try {
      const { error } = await supabase
        .from('push_subscriptions')
        .upsert({ 
          user_id: userId, 
          subscription: subscription 
        }, { onConflict: 'user_id, subscription' });

      if (error) throw error;
      res.status(200).json({ success: true });
    } catch (err) {
      console.error('Error saving subscription:', err);
      res.status(500).json({ error: 'Failed to save subscription' });
    }
  });

  // Cron job to send reminders every hour
  cron.schedule('0 * * * *', async () => {
    console.log('Running scheduled reminders check...');
    const now = new Date();
    // Get current hour in HH:00 format (e.g., "09:00")
    const currentHourStr = now.getHours().toString().padStart(2, '0') + ':00';

    try {
      // 1. Find users who want reminders at this hour
      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('id, notification_settings')
        .not('notification_settings', 'is', null);

      if (profileError) throw profileError;

      const targetUserIds = profiles
        .filter(p => {
          const settings = p.notification_settings;
          return settings && settings.enabled && settings.slots && settings.slots.includes(currentHourStr);
        })
        .map(p => p.id);

      if (targetUserIds.length === 0) return;

      // 2. Fetch subscriptions for these users
      const { data: subs, error: subError } = await supabase
        .from('push_subscriptions')
        .select('*')
        .in('user_id', targetUserIds);

      if (subError) throw subError;

      // 3. Send notifications
      for (const sub of subs) {
        const randomMsg = REMINDER_MESSAGES[Math.floor(Math.random() * REMINDER_MESSAGES.length)];
        
        webpush.sendNotification(
          sub.subscription,
          JSON.stringify(randomMsg)
        ).catch(err => {
          if (err.statusCode === 404 || err.statusCode === 410) {
            console.log('Subscription expired or removed, deleting from DB');
            supabase.from('push_subscriptions').delete().eq('id', sub.id).then();
          } else {
            console.error('Error sending push notification:', err);
          }
        });
      }
    } catch (err) {
      console.error('Error in cron job:', err);
    }
  });
};
