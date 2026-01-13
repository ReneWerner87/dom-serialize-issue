import { Component, Element, h, Prop } from '@stencil/core';

/**
 * Light-DOM radio similar to ds-radio:
 * - Renders a native <input type="radio"> with a label and optional suffix slot
 * - Slot content keeps the marker-loss issue visible through 4.39.x; plain radios are fine in 4.40.0
 */
@Component({
  tag: 'my-radio',
  shadow: false,
  styleUrl: 'my-radio.scss',
})
export class MyRadio {
  @Element() host: HTMLElement;
  @Prop({ reflect: true }) name = 'choice';
  @Prop({ reflect: true }) value = 'option-a';
  @Prop({ reflect: true }) label = 'Option A';
  @Prop({ reflect: true }) checked = true;

  private radioEl!: HTMLInputElement;

  private onChange = (ev: Event) => {
    const input = ev.target as HTMLInputElement;
    this.checked = input.checked;
  };

  render() {
    return (
      <label class="my-radio">
        <input
          ref={el => (this.radioEl = el)}
          type="radio"
          name={this.name}
          value={this.value}
          checked={this.checked}
          onChange={this.onChange}
          aria-label={this.label}
        />
        <slot name="suffix"></slot>
        <span>{this.label}</span>
      </label>
    );
  }
}
