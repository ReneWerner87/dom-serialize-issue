import { Component, Element, h, Prop } from '@stencil/core';

/**
 * Light-DOM input similar to ds-input:
 * - Renders a native <input> in render()
 * - Plain Light-DOM input with an optional suffix slot
 * - Presence of slot content keeps the marker-loss issue visible through 4.39.x (fixed for plain inputs in 4.40.0)
 */
@Component({
  tag: 'my-input',
  shadow: false,
  styleUrl: 'my-input.scss',
})
export class MyInput {
  @Element() host: HTMLElement;
  @Prop({ reflect: true }) name = 'email';
  @Prop({ reflect: true }) value = 'test@example.com';
  @Prop({ reflect: true }) placeholder = 'Enter email';

  private onInput = (ev: Event) => {
    const newVal = (ev.target as HTMLInputElement).value;
    if (newVal !== this.value) {
      this.value = newVal;
    }
  };

  render() {
    return (
      <label class="my-input-label">
        <span class="my-input-caption">Email for #{this.name}</span>
        <div class="input-wrap">
          <input
            name={this.name}
            value={this.value}
            placeholder={this.placeholder}
            onInput={this.onInput}
            aria-label="Email"
          />
          <slot name="suffix"></slot>
        </div>
      </label>
    );
  }
}
