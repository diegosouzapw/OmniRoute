<script lang="ts">
type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
  type Size = 'sm' | 'md' | 'lg';

  let {
    variant = 'primary' as Variant,
    size = 'md' as Size,
    disabled = false,
    type = 'button' as 'button' | 'submit' | 'reset',
    onclick,
    children,
  } = $props<{
    variant?: Variant;
    size?: Size;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    onclick?: (e: MouseEvent) => void;
    children?: any;
  }>();

  const base = 'inline-flex items-center justify-center font-semibold rounded transition disabled:opacity-50 disabled:cursor-not-allowed';
  const sizes: Record<Size, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  const variants: Record<Variant, string> = {
    primary: 'text-white',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };

const cls = $derived(`{base} {sizes[size]} {variants[variant]}`);
  const style = $derived(variant === 'primary' ? 'background: var(--grad-brand)' : '');
</script>