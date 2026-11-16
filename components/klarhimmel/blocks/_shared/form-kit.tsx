// Native-form plumbing shared by the form blocks. No fetching, no scripts: attributes and empty containers only.
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Text } from '../../editing';
import { useEditing } from './kit';

export interface FormSettings {
  action?: string;
  method?: 'post' | 'get';
  hidden?: Record<string, string>;
  captcha?: boolean;
  captchaSitekey?: string;
}

/** An action the form may carry: http(s), same-site path or query. Anything else (javascript:, //host, bare words) is dropped. */
const SAFE_ACTION = /^(https?:\/\/|\/(?!\/)|\?)/i;
export const safeAction = (action: string | undefined) => {
  const a = (action ?? '').trim();
  return SAFE_ACTION.test(a) ? a : undefined;
};

/**
 * Props for the <form>. A safe `action` is always written, with `method` post unless set (a form without JS must never fall back to
 * a GET with the message in the URL). An explicit `method` makes it a plain HTML form that submits natively after hydration too;
 * without one the hydrated block cancels the submit and the host wires its own handler. An unsafe action is dropped entirely.
 * In an editor the form never submits.
 */
export function useFormProps({ action, method }: FormSettings) {
  const editing = useEditing();
  const safe = safeAction(action);
  const native = !!(method && safe) && !editing;
  return {
    action: safe,
    method: safe ? (method ?? 'post') : undefined,
    onSubmit: native ? undefined : (e: { preventDefault: () => void }) => e.preventDefault(),
  };
}

/** Hidden inputs (name -> value) and the Turnstile slot. Render inside the <form>, before the submit row. */
export function FormExtras({ hidden, captcha, captchaSitekey }: FormSettings) {
  return (
    <>
      {Object.entries(hidden ?? {}).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      {captcha && <div className="kh-captcha cf-turnstile min-h-16" data-kh-captcha data-sitekey={captchaSitekey || undefined} />}
    </>
  );
}

/** A bare domain or a full address: an optional http(s) scheme, a host with at least one dot, an optional path. Owners type "yourcompany.se"; type=url would refuse it. Written to compile with the v flag browsers use for `pattern`. */
export const DOMAIN_PATTERN = String.raw`(https?://)?([\p{L}\p{N}\-]+\.)+\p{L}{2,}(:\d+)?(/\S*)?`;

/** An address with a dot after the @ ("a@b" is not one), as a pattern the browser enforces without script. */
export const EMAIL_PATTERN = String.raw`[^@\s]+@[^@\s]+\.[^@\s]+`;
export const URL_PATTERN = String.raw`https?://[^\s\/]+\.[^\s]+`; // a / inside a class is escaped so it compiles with the v flag

export const ERROR_WORDS = {
  required: 'Fill in this field.',
  email: 'Enter an email address like name@company.example.',
  url: 'Enter an address that starts with https://, like https://example.com.',
  domain: 'Enter a site address like yourcompany.se.',
};
export type FieldKind = 'email' | 'url' | 'domain' | 'text';

/**
 * Inline per-field errors from the browser's own validation. The `invalid` event is cancelled (no native bubble), the reason is shown
 * under the field, the first bad field gets focus, and typing clears it. Without script the browser's own validation still applies.
 * `idOf(field)` is the id of the control; its error is `idOf(field)-e` (see FieldError).
 */
export function useFieldErrors(words: Record<'required' | 'email' | 'url' | 'domain', string>, idOf: (field: string) => string) {
  const [errs, setErrs] = useState<Record<string, string>>({});
  const fieldProps = (field: string, kind: FieldKind) => ({
    'aria-invalid': errs[field] ? (true as const) : undefined,
    'aria-describedby': errs[field] ? `${idOf(field)}-e` : undefined,
    onInvalid: (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.preventDefault();
      const el = e.currentTarget;
      setErrs((x) => ({ ...x, [field]: el.validity.valueMissing || kind === 'text' ? words.required : words[kind] }));
      if (el.form?.querySelector(':invalid') === el) el.focus();
    },
    onInput: () => setErrs((x) => (x[field] ? { ...x, [field]: '' } : x)),
  });
  return { errs, fieldProps };
}

/** The error line under a field: a polite live region that stays in the DOM so the reason is announced when it fills. */
export function FieldError({ id, text }: { id: string; text?: string }) {
  return (
    <p id={`${id}-e`} aria-live="polite" className="mt-1.5 text-kh-small text-kh-ink empty:hidden">
      {text || ''}
    </p>
  );
}

const STATUS_WORDS = { sent: 'Thank you. We have your request and will reply soon.', error: 'Something went wrong. Please try again.' };

/**
 * The sent or error line of a form (see formStatus). Sent is a polite status that takes focus once when it appears (the fields are
 * hidden by the block meanwhile); error is an alert and the form stays live. In an editor both show so their words can be edited.
 */
export function FormStatus({ status, messages }: { status?: 'idle' | 'sent' | 'error'; messages?: { sent: string; error: string } }) {
  const editing = useEditing();
  const words = { ...STATUS_WORDS, ...messages };
  const box = 'rounded-kh-lg border px-4 py-3 text-kh-small outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--kh-focus)';
  const sent = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (status === 'sent') sent.current?.focus();
  }, [status]);
  return (
    <>
      {(status === 'sent' || editing) && (
        <p ref={sent} role="status" tabIndex={-1} className={`${box} border-kh-line-strong bg-kh-accent-soft text-kh-accent-ink`}>
          <Text path={['messages', 'sent']} value={words.sent} as="span" />
        </p>
      )}
      {(status === 'error' || editing) && (
        <p role="alert" className={`${box} border-kh-danger text-kh-ink`}>
          <Text path={['messages', 'error']} value={words.error} as="span" />
        </p>
      )}
    </>
  );
}
