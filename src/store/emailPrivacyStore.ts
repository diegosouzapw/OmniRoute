"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface EmailPrivacyState {
  /** When true, all email addresses are shown in full (unmasked). Default: false (masked). */
  emailsVisible: boolean;
  /** Set the global email visibility state. */
  setEmailsVisible: (visible: boolean) => void;
}

const useEmailPrivacyStore = create<EmailPrivacyState>()(
  persist(
    (set) => ({
      emailsVisible: false,
      setEmailsVisible: (visible) => set({ emailsVisible: visible }),
    }),
    {
      name: "omniroute-email-privacy",
    }
  )
);

export default useEmailPrivacyStore;
