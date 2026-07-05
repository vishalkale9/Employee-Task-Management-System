import { useState, useEffect } from 'react';
import { api } from '../api/axios';
import { Bell, Check } from 'lucide-react';
import toast from 'react-hot-toast';

export const Notifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);

  const fetchNotifications = async () => {
    try {
      const res = await api.get('/notifications');
      setNotifications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAsRead = async (id: number) => {
    try {
      await api.put(`/notifications/${id}/read`);
      fetchNotifications();
    } catch (err) {
      toast.error('Failed to mark notification as read');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow mt-8 border border-gray-200 max-w-3xl mx-auto">
      <div className="flex items-center gap-2 mb-6 border-b pb-4">
        <Bell className="text-blue-600 w-6 h-6" />
        <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
      </div>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No notifications yet.</p>
        ) : (
          notifications.map((notif) => (
            <div 
              key={notif.id} 
              className={`p-4 rounded-lg border flex justify-between items-center transition ${notif.isRead ? 'bg-gray-50 border-gray-100 opacity-75' : 'bg-blue-50 border-blue-100 shadow-sm'}`}
            >
              <div>
                <p className={`text-sm md:text-base ${notif.isRead ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>
                  {notif.message}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(notif.createdAt).toLocaleString()}
                </p>
              </div>
              
              {!notif.isRead && (
                <button 
                  onClick={() => markAsRead(notif.id)}
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition"
                  title="Mark as read"
                >
                  <Check className="w-5 h-5" />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
