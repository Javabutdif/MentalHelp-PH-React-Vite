import React, { useEffect, useState } from "react";
import { getNotification } from "../../api/patients";
import { getInformationData } from "../../authentication/authentication";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = getInformationData();
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getNotification(user.id);
        setNotifications(response);
        setLoading(false);
      } catch (err) {
        setError("Failed to load notifications");
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 pt-28">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-4">
        <h1 className="text-2xl font-semibold mb-4">Notifications</h1>

        {loading ? (
          <div className="text-center text-blue-500">Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : notifications ? (
          <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <li key={notification.notification_id} className="py-4">
                <div className="text-lg font-medium text-gray-900">
                  {notification.notification_title}
                </div>
                <div className="text-gray-500">{notification.message}</div>
                <div className="text-sm text-gray-400">
                  {new Date(notification.notification_date).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-500">No notifications found</div>
        )}
      </div>
    </div>
  );
};

export default Notification;
