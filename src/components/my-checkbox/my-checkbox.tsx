import { Component, Element, h, Prop } from '@stencil/core';

/**
 * Light-DOM checkbox similar to ds-checkbox:
 * - Renders a native <input type="checkbox"> with a label
 * - Slot content keeps the marker-loss issue visible through 4.39.x; plain checkboxes are fine in 4.40.0
 */
@Component({
  tag: 'my-checkbox',
  shadow: false,
  styleUrl: 'my-checkbox.scss',
})
export class MyCheckbox {
  @Element() host: HTMLElement;
  @Prop({ reflect: true }) name = 'agree';
  @Prop({ reflect: true }) value = 'yes';
  @Prop({ reflect: true }) label = 'I agree';
  @Prop({ reflect: true }) checked = true;

  private checkboxEl!: HTMLInputElement;

  private onChange = (ev: Event) => {
    const input = ev.target as HTMLInputElement;
    this.checked = input.checked;
  };

  render() {
    return (
        <label class="my-checkbox">
            <input
                ref={el => (this.checkboxEl = el)}
                type="checkbox"
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
