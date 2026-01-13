import { Component, Element, h, Prop } from '@stencil/core';

/**
 * Light-DOM select that mirrors the real ds-select flow:
 * - Renders a native <select> and a hidden slot container
 * - Moves slotted <option> nodes into the select after load (and on mutations)
 * - Syncs the selected value both ways
 */
@Component({
  tag: 'my-select',
  shadow: false,
  styleUrl: 'my-select.scss',
})
export class MySelect {
  @Element() host: HTMLElement;

  /** Simulated user id for the fetch */
  @Prop({ reflect: true }) userId = '42';
  /** Currently selected role */
  @Prop({ mutable: true, reflect: true }) value: string;

  private selectEl!: HTMLSelectElement;
  private slotContainer?: HTMLElement;
  private mutationObserver?: MutationObserver;

  componentWillLoad() {
    this.mutationObserver = new MutationObserver(() => this.syncSlotToSelect());
  }

  componentDidLoad() {
    this.slotContainer = this.host.querySelector('.slot') as HTMLElement;
    if (this.slotContainer && this.mutationObserver) {
      this.mutationObserver.observe(this.slotContainer, { childList: true, subtree: true });
    }

    this.syncSlotToSelect();
    // A second sync a moment later mirrors the real lifecycle jitter that loses Percy markers in 4.36.0.
    setTimeout(() => this.syncSlotToSelect(), 30);
  }

  disconnectedCallback() {
    this.mutationObserver?.disconnect();
  }

  private syncSlotToSelect() {
    if (!this.slotContainer || !this.selectEl) return;
    if (!this.slotContainer.childNodes.length) return;

    // Move (not clone) slotted options into the native select.
    this.selectEl.innerHTML = '';
    this.selectEl.append(...Array.from(this.slotContainer.childNodes));

    // Align value both ways.
    if (this.value && this.selectEl.value !== this.value) {
      this.selectEl.value = this.value;
    } else if (!this.value && this.selectEl.value) {
      this.value = this.selectEl.value;
    }
  }

  private onChange = (ev: Event) => {
    const newVal = (ev.target as HTMLSelectElement).value;
    if (newVal !== this.value) {
      this.value = newVal;
    }
  };

  render() {
    return (
      <label class="my-select-label">
        <span class="my-select-caption">User role for #{this.userId}</span>
        <select
          ref={el => (this.selectEl = el)}
          onChange={this.onChange}
          aria-label="User role"
        ></select>
        <div class="slot" aria-hidden="true">
          <slot></slot>
        </div>
      </label>
    );
  }
}
