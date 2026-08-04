"use client";

interface ProxyCheckboxCellProps {
  checked: boolean;
  onChange: () => void;
  label: string;
}

export function ProxyCheckboxCell({ checked, onChange, label }: ProxyCheckboxCellProps) {
  return (
    <td className="py-2 pr-2 w-8">
      <input
        type="checkbox"
        className="accent-blue-500 w-4 h-4 cursor-pointer"
        checked={checked}
        onChange={onChange}
        aria-label={label}
      />
    </td>
  );
}
