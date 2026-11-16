// Helpers shared by the proof, features and pricing blocks (package C). Layout only; copy always goes through Text/Opt.
import { useId } from 'react';
import { Check } from 'lucide-react';
import { Text, type MediaValue, type PropPath } from '../../editing';
import { cn } from '../../lib/utils';
import { Eyebrow, Opt, useEditing } from './kit';

/** Id for aria-labelledby when the heading exists; undefined when the title is empty (the section then has no name). */
export function useHeadingId(title: string | undefined) {
  const id = useId();
  const editing = useEditing();
  return title || editing ? id : undefined;
}

/** Section header where every part may be empty. Renders nothing at all when it has no content outside the editor. */
export function Heading({
  base = [], id, eyebrow, title, description, align = 'left', className,
}: { base?: PropPath; id?: string; eyebrow?: string; title?: string; description?: string; align?: 'left' | 'center'; className?: string }) {
  const editing = useEditing();
  if (!eyebrow && !title && !description && !editing) return null;
  return (
    <div className={cn('max-w-kh-narrow', align === 'center' && 'mx-auto text-center', className)}>
      <Eyebrow path={[...base, 'eyebrow']} value={eyebrow} />
      <div id={id}>
        <Opt path={[...base, 'title']} value={title} as="h2" className="text-kh-title font-semibold" placeholder="Title" />
      </div>
      <Opt path={[...base, 'description']} value={description} className={cn('mt-4 max-w-kh-lead text-kh-lead text-kh-muted', align === 'center' && 'mx-auto')} placeholder="Description" />
    </div>
  );
}

/** True when a media value will render a real image (not the placeholder). */
export const hasImage = (m: MediaValue) => !!m.src && /^(https:\/\/|\/(?!\/))/.test(m.src);

/** Check-marked list item. */
export function CheckItem({ path, value, className }: { path: PropPath; value: string; className?: string }) {
  return (
    <li className={cn('flex items-start gap-3 text-kh-small', className)}>
      <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-kh-accent-ink" strokeWidth={2.25} />
      <Text path={path} value={value} as="span" />
    </li>
  );
}
