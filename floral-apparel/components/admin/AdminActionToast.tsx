/**
 * Purpose: Shows toast feedback for admin action query params.
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
'use client';

import { useEffect } from 'react';
import toast from 'react-hot-toast';

type AdminActionToastProperties = {
  message?: string;
};

/**
 * Emits a one-time success toast when message is provided.
 * @param props Toast properties.
 */
export function AdminActionToast({ message }: AdminActionToastProperties) {
  useEffect(() => {
    if (message) {
      toast.success(message);
    }
  }, [message]);

  return null;
}
