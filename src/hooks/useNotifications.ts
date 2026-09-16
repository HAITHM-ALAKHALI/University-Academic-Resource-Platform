import { useState, useMemo, useCallback } from "react";
import {
  initialAdminNotifications,
  type AdminNotificationItem,
} from "../constants/adminNav";

export function useNotifications(
  initialData: AdminNotificationItem[] = initialAdminNotifications
) {
  const [notifList, setNotifList] = useState<AdminNotificationItem[]>(initialData);

  const unreadCount = useMemo(
    () => notifList.filter((n) => !n.read).length,
    [notifList]
  );

  const markAllRead = useCallback(() => {
    setNotifList((prev) => prev.map((item) => ({ ...item, read: true })));
  }, []);

  const markAsRead = useCallback((id: number) => {
    setNotifList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item))
    );
  }, []);

  const removeNotification = useCallback((id: number) => {
    setNotifList((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return {
    notifList,
    setNotifList,
    unreadCount,
    markAllRead,
    markAsRead,
    removeNotification,
  };
}
