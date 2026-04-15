import { LitElement, html, css } from 'lit';
import { DAY_NAMES_SHORT } from './utils.js';

/**
 * Dialog to manage which days belong to which schedule group.
 * Shows all 7 days as toggleable chips. Days not in any group are unassigned.
 *
 * Events:
 *  - 'group-days-save' → { groupId, days: number[] }
 *  - 'group-split'     → { groupId, day: number } (split one day into its own group)
 *  - 'group-delete'    → { groupId }
 *  - 'group-cancel'    → {}
 */
export class GroupDialog extends LitElement {
  static properties = {
    open: { type: Boolean },
    group: { type: Object },
    usedDays: { type: Array }, // days already used in other groups
    _selectedDays: { state: true },
  };

  static styles = css`
    ha-dialog {
      --mdc-dialog-min-width: 320px;
      --mdc-dialog-max-width: 380px;
    }

    .content {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 8px 0;
    }

    .field-label {
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-bottom: 8px;
    }

    .day-chips {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }

    .day-chip {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 2px solid var(--divider-color, #e0e0e0);
      background: var(--secondary-background-color, #f5f5f5);
      color: var(--secondary-text-color);
      font-size: 0.75rem;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s, color 0.15s, border-color 0.15s;
      user-select: none;
    }

    .day-chip.selected {
      background: var(--primary-color);
      border-color: var(--primary-color);
      color: white;
    }

    .day-chip.disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }

    .hint {
      font-size: 0.75rem;
      color: var(--secondary-text-color);
    }

    .danger-section {
      border-top: 1px solid var(--divider-color, #e0e0e0);
      padding-top: 12px;
    }

    .danger-label {
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--error-color, #b71c1c);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin-bottom: 8px;
    }

    .dialog-footer {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      align-items: center;
    }

    mwc-button.delete {
      --mdc-theme-primary: var(--error-color, #b71c1c);
    }
  `;

  willUpdate(changedProps) {
    if (changedProps.has('group') && this.group) {
      this._selectedDays = [...(this.group.days || [])];
    }
  }

  _toggleDay(day) {
    const used = (this.usedDays || []).filter(
      (d) => !(this.group?.days || []).includes(d),
    );
    if (used.includes(day)) return; // used by another group

    const idx = (this._selectedDays || []).indexOf(day);
    if (idx >= 0) {
      this._selectedDays = this._selectedDays.filter((d) => d !== day);
    } else {
      this._selectedDays = [...(this._selectedDays || []), day];
    }
  }

  _cancel() {
    this.dispatchEvent(new CustomEvent('group-cancel', { bubbles: true, composed: true }));
  }

  _save() {
    if (!this._selectedDays?.length) return;
    this.dispatchEvent(
      new CustomEvent('group-days-save', {
        bubbles: true,
        composed: true,
        detail: { groupId: this.group.id, days: [...this._selectedDays] },
      }),
    );
  }

  _delete() {
    this.dispatchEvent(
      new CustomEvent('group-delete', {
        bubbles: true,
        composed: true,
        detail: { groupId: this.group.id },
      }),
    );
  }

  render() {
    if (!this.open || !this.group) return html``;

    const usedByOthers = (this.usedDays || []).filter(
      (d) => !(this.group.days || []).includes(d),
    );
    const selected = this._selectedDays || [];

    return html`
      <ha-dialog
        .open=${this.open}
        heading="Manage Days"
        @closed=${this._cancel}
        hideActions
      >
        <div class="content" slot="content">
          <div>
            <div class="field-label">Days in this group</div>
            <div class="day-chips">
              ${[0, 1, 2, 3, 4, 5, 6].map(
                (day) => html`
                  <div
                    class="day-chip
                      ${selected.includes(day) ? 'selected' : ''}
                      ${usedByOthers.includes(day) ? 'disabled' : ''}"
                    @click=${() => this._toggleDay(day)}
                    title=${usedByOthers.includes(day)
                      ? 'Used by another group'
                      : DAY_NAMES_SHORT[day]}
                  >
                    ${DAY_NAMES_SHORT[day]}
                  </div>
                `,
              )}
            </div>
            <p class="hint">
              Grayed-out days are assigned to another group. Remove them from
              that group first to reassign them here.
            </p>
          </div>

          <div class="danger-section">
            <div class="danger-label">Danger Zone</div>
            <mwc-button
              class="delete"
              label="Delete this group"
              @click=${this._delete}
            ></mwc-button>
          </div>
        </div>

        <div class="dialog-footer" slot="actions">
          <mwc-button label="Cancel" @click=${this._cancel}></mwc-button>
          <mwc-button
            raised
            label="Save"
            ?disabled=${!selected.length}
            @click=${this._save}
          ></mwc-button>
        </div>
      </ha-dialog>
    `;
  }
}

customElements.define('thermostat-group-dialog', GroupDialog);
