import { LitElement, html, css } from 'lit';

/**
 * Visual config editor for the thermostat-schedule-card.
 * Registered as the card's `getConfigElement()` return type.
 *
 * Fires 'config-changed' with updated config whenever any field changes.
 */
export class ThermostatScheduleCardEditor extends LitElement {
  static properties = {
    hass: { type: Object },
    config: { type: Object },
  };

  static styles = css`
    .form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 8px 0;
    }

    .section-title {
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 4px;
    }

    .entity-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .entity-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .entity-row ha-entity-picker {
      flex: 1;
    }

    .number-row {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 12px;
    }

    ha-textfield {
      width: 100%;
    }

    .helper-note {
      font-size: 0.75rem;
      color: var(--secondary-text-color);
      margin-top: 6px;
      line-height: 1.4;
    }

    .helper-note code {
      font-size: 0.72rem;
      background: var(--secondary-background-color, rgba(0,0,0,0.06));
      padding: 1px 4px;
      border-radius: 3px;
    }
  `;

  setConfig(config) {
    this.config = config;
  }

  _fireChanged(partial) {
    this.config = { ...this.config, ...partial };
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: this.config },
        bubbles: true,
        composed: true,
      }),
    );
  }

  _addEntity() {
    const entities = [...(this.config.entities || []), ''];
    this._fireChanged({ entities });
  }

  _updateEntity(index, value) {
    const entities = [...(this.config.entities || [])];
    entities[index] = value;
    this._fireChanged({ entities });
  }

  _removeEntity(index) {
    const entities = (this.config.entities || []).filter((_, i) => i !== index);
    this._fireChanged({ entities });
  }

  _updateScheduleEntity(value) {
    if (value) {
      this._fireChanged({ schedule_entity: value });
    } else {
      // Remove the key entirely when cleared
      const { schedule_entity, ...rest } = this.config;
      this.config = rest;
      this.dispatchEvent(
        new CustomEvent('config-changed', {
          detail: { config: this.config },
          bubbles: true,
          composed: true,
        }),
      );
    }
  }

  render() {
    if (!this.hass || !this.config) return html``;

    const entities = this.config.entities || [];
    const minTemp = this.config.min_temp ?? 5;
    const maxTemp = this.config.max_temp ?? 35;
    const tempStep = this.config.temp_step ?? 0.5;
    const scheduleEntity = this.config.schedule_entity ?? '';

    return html`
      <div class="form">

        <div>
          <div class="section-title">Climate Entities</div>
          <div class="entity-list">
            ${entities.map(
              (entity, i) => html`
                <div class="entity-row">
                  <ha-entity-picker
                    .hass=${this.hass}
                    .value=${entity}
                    .includeDomains=${['climate']}
                    @value-changed=${(e) => this._updateEntity(i, e.detail.value)}
                    allow-custom-entity
                  ></ha-entity-picker>
                  <ha-icon-button
                    .path=${'M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z'}
                    @click=${() => this._removeEntity(i)}
                    title="Remove entity"
                  ></ha-icon-button>
                </div>
              `,
            )}
            <mwc-button
              label="Add Entity"
              icon="mdi:plus"
              @click=${this._addEntity}
            ></mwc-button>
          </div>
        </div>

        <div>
          <div class="section-title">Title (optional)</div>
          <ha-textfield
            label="Card title"
            .value=${this.config.title ?? ''}
            @change=${(e) => this._fireChanged({ title: e.target.value })}
          ></ha-textfield>
        </div>

        <div>
          <div class="section-title">Temperature Range</div>
          <div class="number-row">
            <ha-textfield
              label="Min (°C)"
              type="number"
              .value=${String(minTemp)}
              @change=${(e) =>
                this._fireChanged({ min_temp: parseFloat(e.target.value) })}
            ></ha-textfield>
            <ha-textfield
              label="Max (°C)"
              type="number"
              .value=${String(maxTemp)}
              @change=${(e) =>
                this._fireChanged({ max_temp: parseFloat(e.target.value) })}
            ></ha-textfield>
            <ha-textfield
              label="Step (°C)"
              type="number"
              step="0.5"
              .value=${String(tempStep)}
              @change=${(e) =>
                this._fireChanged({ temp_step: parseFloat(e.target.value) })}
            ></ha-textfield>
          </div>
        </div>

        <div>
          <div class="section-title">Schedule Storage Entity (input_text)</div>
          <ha-entity-picker
            .hass=${this.hass}
            .value=${scheduleEntity}
            .includeDomains=${['input_text']}
            @value-changed=${(e) => this._updateScheduleEntity(e.detail.value)}
            allow-custom-entity
          ></ha-entity-picker>
          <div class="helper-note">
            Create a Text helper in
            <strong>Settings → Devices &amp; Services → Helpers</strong>,
            set max length to <code>10000</code>.
            When set, schedule changes are saved immediately without requiring
            dashboard edit mode.
          </div>
        </div>

      </div>
    `;
  }
}

customElements.define('thermostat-schedule-card-editor', ThermostatScheduleCardEditor);
