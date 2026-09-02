import { AfterViewInit, Directive, ElementRef, Renderer2, inject } from '@angular/core';

/* Write |show vtp status| in an entry and it comes out as a code snippet.
   ---------------------------------------------------------------------------
   The point is speed: typing two pipes is quicker than typing <code></code>
   thirty times, and it keeps the raw entry readable while you are writing it.

   It walks text nodes only and rebuilds them through Renderer2, so element
   nodes — links, <strong>, anything with a binding on it — are left untouched,
   and it works during prerendering as well as in the browser. Text already
   inside a <code> is skipped, so hand-written <code> tags still work. */
@Directive({
  selector: '[codeMarks]',
})
export class CodeMarks implements AfterViewInit {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);

  ngAfterViewInit(): void {
    this.walk(this.host.nativeElement);
  }

  private walk(node: Node): void {
    // Copied, because converting a text node mutates the child list underneath.
    for (const child of Array.from(node.childNodes)) {
      if (child.nodeType === Node.TEXT_NODE) {
        this.convert(child as Text);
      } else if (
        child.nodeType === Node.ELEMENT_NODE &&
        (child as Element).tagName !== 'CODE' &&
        (child as Element).tagName !== 'PRE'
      ) {
        this.walk(child);
      }
    }
  }

  private convert(text: Text): void {
    const value = text.nodeValue ?? '';
    // Split on |…| keeping the captured middles. A pair has to sit on one line,
    // so a lone pipe in prose is left alone rather than swallowing a paragraph.
    const parts = value.split(/\|([^|\n]+)\|/g);
    if (parts.length < 3) return;

    const parent = text.parentNode;
    if (!parent) return;

    parts.forEach((part, i) => {
      if (!part) return;
      if (i % 2 === 1) {
        const code = this.renderer.createElement('code');
        this.renderer.appendChild(code, this.renderer.createText(part));
        this.renderer.insertBefore(parent, code, text);
      } else {
        this.renderer.insertBefore(parent, this.renderer.createText(part), text);
      }
    });

    this.renderer.removeChild(parent, text);
  }
}
