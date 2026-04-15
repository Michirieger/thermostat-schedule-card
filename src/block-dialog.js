import { LitElement, html, css } from 'lit';
import { minutesToTimeStr, timeStrToMinutes, getBlockColor } from './utils.js';

/**
 * Dialog for adding or editing a single time block.
 *
 * Events fired:
 *  - 'block-save'   → { block: { id, startMinutes, endMinutes, temperature } }
 *  - 'block-delete' → { id: blockId }
 *  - 'block-cancel' → (no detail)
 */
export class BlockDialog extends LitElement {
  static properties = {
    open: { type: Boolean },
    block: { type: Object }, // existing block or null for new
    isNew: { type: Boolean },
    minTemp: { type: Number },
    maxTemp: { type: Number },
    tempStep: { type: Number },
    _startTime: { state: true },
    _endTime: { state: true },
    _temperature: { state: true },
  };

  static styles = css`
    :host {
      --dialog-width: 340px;
    }

    ha-dialog {
      --mdc-dialog-min-width: var(--dialog-width);
      --mdc-dialog-max-width: var(--dialog-width);
    }

    .content {
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 8px 0 4px;
    }

    .field-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .field-label {
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.06em;
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
      font-size: 0.7rem;
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
      cursor: pointer;
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
      line-height: 1;
      user-select: none;
      transition: background 0.15s, color 0.15s;
    }

    .temp-btn:hover {
      background: var(--primary-color);
      color: white;
      border-color: var(--primary-color);
    }

    .temp-display {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 4px;
    }

    .temp-value {
      font-size: 1.8rem;
      font-weight: 500;
      color: var(--primary-text-color);
    }

    .temp-unit {
      font-size: 0.75rem;
      color: var(--secondary-text-color);
    }

    input[type='range'] {
      flex: 1;
      accent-color: var(--primary-color);
    }

    .preview-block {
      border-radius: 6px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.85rem;
      font-weight: 600;
      transition: background 0.2s;
    }

    .delete-btn {
      --mdc-theme-primary: var(--error-color, #b71c1c);
    }

    .dialog-footer {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
  `;

  willUpdate(changedProps) {
    if (changedProps.has('block') && this.block) {
      this._startTime = minutesToTimeStr(this.block.startMinutes);
      const endMins = this.block.endMinutes;
      this._endTime = endMins === 1440 ? '00:00' : minutesToTimeStr(endMins);
      this._temperature = this.block.temperature;
    }
    if (changedProps.has('isNew') && this.isNew && !this.block) {
      this._startTime = '07:00';
      this._endTime = '22:00';
      this._temperature = 21;
    }
  }

  _cancel() {
    this.dispatchEvent(new CustomEvent('block-cancel', { bubbles: true, composed: true }));
  }

  _save() {
    const startMinutes = timeStrToMinutes(this._startTime, false);
    const endMinutes = timeStrToMinutes(this._endTime, true);
    this.dispatchEvent(
      new CustomEvent('block-save', {
        bubbles: true,
        composed: true,
        detail: {
          block: {
            ...(this.block || {}),
            startMinutes,
            endMinutes,
            temperature: this._temperature,
          },
        },
      }),
    );
  }

  _delete() {
    this.dispatchEvent(
      new CustomEvent('block-delete', {
        bubbles: true,
        composed: true,
        detail: { id: this.block?.id },
      }),
    );
  }

  _adjustTemp(delta) {
    const min = this.minTemp ?? 5;
    const max = this.maxTemp ?? 35;
    const step = this.tempStep ?? 0.5;
    this._temperature = Math.round(
      Math.max(min, Math.min(max, (this._temperature ?? 20) + delta)) / step,
    ) * step;
  }

  _onTempSlider(e) {
    this._temperature = parseFloat(e.target.value);
  }

  render() {
    if (!this.open) return html``;

    const min = this.minTemp ?? 5;
    const max = this.maxTemp ?? 35;
    const step = this.tempStep ?? 0.5;
    const temp = this._temperature ?? 20;
    const colors = getBlockColor(temp, min, max);

    return html`
      <ha-dialog
        .open=${this.open}
        .heading=${this.isNew ? 'Add Time Block' : 'Edit Time Block'}
        @closed=${this._cancel}
        hideActions
      >
        <div class="content" slot="content">

          <div class="field-group">
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
                <span class="time-sublabel">End (00:00 = midnight)</span>
                <input
                  type="time"
                  .value=${this._endTime ?? ''}
                  @change=${(e) => (this._endTime = e.target.value)}
                />
              </div>
            </div>
          </div>

          <div class="field-group">
            <div class="field-label">Temperature</div>
            <div class="temp-control">
              <button class="temp-btn" @click=${() => this._adjustTemp(-step)}>−</button>
              <div class="temp-display">
                <span class="temp-value">${temp % 1 === 0 ? temp : temp.toFixed(1)}</span>
                <span class="temp-unit">°C</span>
              </div>
              <button class="temp-btn" @click=${() => this._adjustTemp(step)}>+</button>
            </div>
            <input
              type="range"
              min=${min}
              max=${max}
              step=${step}
              .value=${String(temp)}
              @input=${this._onTempSlider}
            />
          </div>

          <div
            class="preview-block"
            style="background:${colors.bg}; color:${colors.text}"
          >
            ${temp % 1 === 0 ? temp : temp.toFixed(1)}°C
            &nbsp;·&nbsp;
            ${this._startTime ?? ''} – ${this._endTime === '00:00' ? '24:00' : (this._endTime ?? '')}
          </div>

        </div>

        <div class="dialog-footer" slot="actions">
          ${!this.isNew
            ? html`
                <mwc-button
                  class="delete-btn"
                  label="Delete"
                  @click=${this._delete}
                ></mwc-button>
                <span style="flex:1"></span>
              `
            : html``}
          <mwc-button label="Cancel" @click=${this._cancel}></mwc-button>
          <mwc-button raised label="Save" @click=${this._save}></mwc-button>
        </div>
      </ha-dialog>
    `;
  }
}

customElements.define('thermostat-block-dialog', BlockDialog);
