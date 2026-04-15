import { LitElement, html, css } from 'lit';
import { minutesToTimeStr, timeStrToMinutes, getBlockColor } from './utils.js';

/**
 * Dialog for adding or editing a single time block.
 *
 * ha-dialog slot API:
 *   - default slot          → content
 *   - slot="primaryAction"  → right button (Save)
 *   - slot="secondaryAction"→ left button  (Delete / Cancel)
 *
 * Events fired:
 *  'block-save'   → { block: { id, startMinutes, endMinutes, temperature } }
 *  'block-delete' → { id: blockId }
 *  'block-cancel' → (no detail)
 */
export class BlockDialog extends LitElement {
  static properties = {
    open: { type: Boolean },
    block: { type: Object },
    isNew: { type: Boolean },
    minTemp: { type: Number },
    maxTemp: { type: Number },
    tempStep: { type: Number },
    _startTime: { state: true },
    _endTime: { state: true },
    _temperature: { state: true },
  };

  static styles = css`
    ha-dialog {
      --mdc-dialog-min-width: min(360px, 96vw);
      --mdc-dialog-max-width: 400px;
    }

    .content {
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 0 0 8px;
    }

    .field-label {
      font-size: 0.72rem;
      font-weight: 600;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.07em;
      margin-bottom: 6px;
    }

    .time-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .time-input-wrap {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .time-sublabel {
      font-size: 0.68rem;
      color: var(--secondary-text-color);
    }

    input[type='time'] {
      width: 100%;
      padding: 10px 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 6px;
      font-size: 1rem;
      font-family: inherit;
      background: var(--secondary-background-color, #f5f5f5);
      color: var(--primary-text-color);
      box-sizing: border-box;
      outline: none;
    }

    input[type='time']:focus {
      border-color: var(--primary-color);
    }

    .temp-control {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .temp-btn {
      background: var(--secondary-background-color, #f5f5f5);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 50%;
      width: 40px;
      height: 40px;
      font-size: 1.4rem;
      cursor: pointer;
      color: var(--primary-text-color);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      user-select: none;
      transition: background 0.15s, color 0.15s;
    }

    .temp-btn:hover {
      background: var(--primary-color);
      color: white;
      border-color: var(--primary-color);
    }

    .temp-center {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .temp-value {
      font-size: 2rem;
      font-weight: 500;
      color: var(--primary-text-color);
      line-height: 1.1;
    }

    .temp-unit {
      font-size: 0.72rem;
      color: var(--secondary-text-color);
    }

    input[type='range'] {
      width: 100%;
      margin-top: 6px;
      accent-color: var(--primary-color);
    }

    .preview-block {
      border-radius: 8px;
      padding: 10px 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.85rem;
      font-weight: 600;
      gap: 8px;
      transition: background 0.2s;
    }

    .delete-btn {
      --mdc-theme-primary: var(--error-color, #b71c1c);
    }
  `;

  willUpdate(changedProps) {
    if (changedProps.has('block') && this.block) {
      this._startTime = minutesToTimeStr(this.block.startMinutes);
      const end = this.block.endMinutes;
      this._endTime = end === 1440 ? '00:00' : minutesToTimeStr(end);
      this._temperature = this.block.temperature;
    }
    if (changedProps.has('open') && this.open && this.isNew && this._temperature == null) {
      this._startTime = '07:00';
      this._endTime = '22:00';
      this._temperature = 21;
    }
  }

  _dispatch(name, detail = {}) {
    this.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true, detail }));
  }

  _cancel() { this._dispatch('block-cancel'); }

  _save() {
    const startMinutes = timeStrToMinutes(this._startTime, false);
    const endMinutes = timeStrToMinutes(this._endTime, true);
    this._dispatch('block-save', {
      block: { ...(this.block || {}), startMinutes, endMinutes, temperature: this._temperature },
    });
  }

  _delete() {
    this._dispatch('block-delete', { id: this.block?.id });
  }

  _adjustTemp(delta) {
    const min = this.minTemp ?? 5;
    const max = this.maxTemp ?? 35;
    const step = this.tempStep ?? 0.5;
    const raw = (this._temperature ?? 20) + delta;
    this._temperature = Math.round(Math.max(min, Math.min(max, raw)) / step) * step;
  }

  render() {
    if (!this.open) return html``;

    const min = this.minTemp ?? 5;
    const max = this.maxTemp ?? 35;
    const step = this.tempStep ?? 0.5;
    const temp = this._temperature ?? 20;
    const colors = getBlockColor(temp, min, max);
    const tempStr = temp % 1 === 0 ? String(temp) : temp.toFixed(1);
    const endDisplay = this._endTime === '00:00' ? '24:00' : (this._endTime ?? '');

    return html`
      <ha-dialog
        .open=${this.open}
        .heading=${this.isNew ? 'Add Time Block' : 'Edit Time Block'}
        @closed=${this._cancel}
      >
        <!-- content goes in the DEFAULT slot (no slot attribute) -->
        <div class="content">

          <div>
            <div class="field-label">Time Range</div>
            <div class="time-row">
              <div class="time-input-wrap">
                <span class="time-sublabel">Start</span>
                <input
                  type="time"
                  .value=${this._startTime ?? ''}
                  @change=${(e) => (this._startTime = e.target.value)}
                />
              </div>
              <div class="time-input-wrap">
                <span class="time-sublabel">End &nbsp;(00:00 = midnight)</span>
                <input
                  type="time"
                  .value=${this._endTime ?? ''}
                  @change=${(e) => (this._endTime = e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <div class="field-label">Temperature</div>
            <div class="temp-control">
              <button class="temp-btn" @click=${() => this._adjustTemp(-step)}>−</button>
              <div class="temp-center">
                <span class="temp-value">${tempStr}</span>
                <span class="temp-unit">°C</span>
              </div>
              <button class="temp-btn" @click=${() => this._adjustTemp(step)}>+</button>
            </div>
            <input
              type="range"
              .min=${String(min)}
              .max=${String(max)}
              .step=${String(step)}
              .value=${String(temp)}
              @input=${(e) => (this._temperature = parseFloat(e.target.value))}
            />
          </div>

          <div
            class="preview-block"
            style="background:${colors.bg}; color:${colors.text}"
          >
            <span>${tempStr}°C</span>
            <span>·</span>
            <span>${this._startTime ?? ''} – ${endDisplay}</span>
          </div>

        </div>

        <!-- named action slots -->
        ${!this.isNew
          ? html`<mwc-button class="delete-btn" slot="secondaryAction" @click=${this._delete}>
                   Delete
                 </mwc-button>`
          : html`<mwc-button slot="secondaryAction" @click=${this._cancel}>Cancel</mwc-button>`}

        <mwc-button slot="primaryAction" raised @click=${this._save}>Save</mwc-button>
      </ha-dialog>
    `;
  }
}

customElements.define('thermostat-block-dialog', BlockDialog);
