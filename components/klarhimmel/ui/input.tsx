import { forwardRef, useContext, useId, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from 'react';
import { cn } from '../lib/utils';
import { EditingContext } from '../editing';
import { nameEmptied } from './button';

// Never under 16 px: iPhone Safari zooms into a smaller field on tap (a style with a 15 px body would do it to every form).
const field =
  'w-full rounded-kh border border-kh-line-strong bg-kh-surface px-3 text-[length:max(16px,var(--kh-text-body))] text-kh-ink shadow-kh-1 transition-[border-color] duration-(--kh-dur) ' +
  'placeholder:text-kh-muted hover:border-kh-muted focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-(--kh-focus) ' +
  'disabled:cursor-not-allowed disabled:bg-kh-surface-2 disabled:text-kh-muted aria-[invalid=true]:border-kh-danger';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input({ className, ...rest }, ref) {
  return <input ref={ref} className={cn(field, 'min-h-11', className)} {...rest} />;
});

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(function Textarea({ className, rows = 5, ...rest }, ref) {
  return <textarea ref={ref} rows={rows} className={cn(field, 'resize-y py-2.5 leading-normal', className)} {...rest} />;
});

/** Label + control + hint/error, ids wired for assistive tech. */
export function Field({
  label,
  hint,
  error,
  labelHidden,
  children,
  className,
}: {
  label: ReactNode;
  /** The label is read by assistive tech but not drawn: for a field whose context already says what it is. */
  labelHidden?: boolean;
  hint?: ReactNode;
  error?: ReactNode;
  children: (p: { id: string; 'aria-describedby'?: string; 'aria-invalid'?: true }) => ReactNode;
  className?: string;
}) {
  const id = useId();
  const editing = !!useContext(EditingContext);
  const desc = error || hint ? `${id}-d` : undefined;
  if (!editing && nameEmptied(label)) return null; // an emptied label: the field is not drawn
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className={labelHidden ? 'sr-only' : 'text-kh-small font-medium text-kh-ink'}>
        {label}
      </label>
      {children({ id, 'aria-describedby': desc, 'aria-invalid': error ? true : undefined })}
      {(error || hint) && (
        <p id={desc} className={cn('text-kh-small', error ? 'text-kh-danger' : 'text-kh-muted')}>
          {error || hint}
        </p>
      )}
    </div>
  );
}
