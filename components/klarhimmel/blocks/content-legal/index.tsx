import { useId } from 'react';
import { Text, withHeadingLevel } from '../../editing';
import { Container, Eyebrow, Opt, Section } from '../_shared/kit';
import { FOCUS } from '../_shared/d-chrome-kit';
import { cn } from '../../lib/utils';
import { spec } from './spec';
import type { BlockProps } from '../types';
import type { z } from 'zod';

export { spec };
type Props = z.infer<typeof spec.schema>;

function ContentLegal({ props }: BlockProps<Props>) {
  const id = useId();
  const base = id.replace(/[^a-zA-Z0-9]/g, '');
  const tocId = `${base}-toc`;
  return (
    <Section labelledBy={id}>
      <Container className="grid gap-12 @4xl:grid-cols-[14rem_1fr] @4xl:gap-20">
        <nav aria-labelledby={tocId} className="@4xl:sticky @4xl:top-8 @4xl:self-start">
          <p id={tocId} className="text-kh-small font-medium text-kh-muted">
            <Text path={['contentsLabel']} value={props.contentsLabel} as="span" />
          </p>
          <ol className="mt-3 border-l border-kh-line">
            {props.sections.map((s, i) => (
              <li key={i}>
                <a href={`#${base}-s${i}`} className={cn('-ml-px flex min-h-9 items-center gap-2 border-l border-transparent py-1 pl-4 text-kh-small text-kh-muted hover:border-kh-ink hover:text-kh-ink', FOCUS)}>
                  <span className="tabular-nums">{i + 1}.</span>
                  <span className="min-w-0 [overflow-wrap:anywhere]">{s.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="max-w-kh-prose">
          <Eyebrow path={['eyebrow']} value={props.eyebrow} />
          <div id={id}>
            <Text path={['title']} value={props.title} as="h1" className="text-kh-title font-semibold" />
          </div>
          <Opt path={['updated']} value={props.updated} className="mt-3 text-kh-small text-kh-muted" placeholder="Last updated" />
          <Opt path={['intro']} value={props.intro} multiline className="mt-6 text-kh-lead text-kh-muted" placeholder="Intro" />
          <div className="mt-12 space-y-12">
            {props.sections.map((s, i) => (
              <section key={i} id={`${base}-s${i}`} aria-labelledby={`${base}-h${i}`} className="scroll-mt-8 border-t border-kh-line pt-8">
                <h2 id={`${base}-h${i}`} className="flex gap-3 text-kh-heading font-semibold">
                  <span aria-hidden className="tabular-nums text-kh-muted">{i + 1}.</span>
                  <Text path={['sections', i, 'title']} value={s.title} as="span" />
                </h2>
                <Text path={['sections', i, 'body']} value={s.body} as="p" multiline className="mt-4 text-kh-body leading-relaxed text-kh-ink-2" />
              </section>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default withHeadingLevel(ContentLegal);
