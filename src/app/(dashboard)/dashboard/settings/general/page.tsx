"use client";

import SystemStorageTab from "../components/SystemStorageTab";
import StorageIntegrityCheckControl from "../components/StorageIntegrityCheckControl";

export default function SettingsStoragePage() {
  return (
    <>
      <StorageIntegrityCheckControl />
      <SystemStorageTab />
    </>
  );
}
