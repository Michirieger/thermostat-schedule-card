import { LitElement, html, css } from 'lit';

/**
 * Visual config editor.
 * Uses ha-selector (HA's standard entity selector) instead of ha-entity-picker
 * so it works reliably inside shadow DOM.
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
      gap: 20px;
      padding: 8px 0;
    }

    .section-title {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 8px;
    }

    .entity-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }

    .entity-row ha-selector {
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

    ha-selector {
      display: block;
      width: 100%;
    }

    .helper-note {
      font-size: 0.75rem;
      color: var(--secondary-text-color);
      margin-top: 8px;
      line-height: 1.5;
    }

    .add-btn {
      margin-top: 4px;
    }
  `;

  setConfig(config) {
    this.config = config;
  }

  _fire(partial) {
    this.config = { ...this.config, ...partial };
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: this.config },
      bubbles: true,
      composed: true,
    }));
  }

  _updateEntity(index, value) {
    const entities = [...(this.config.entities || [])];
    if (value) {
      entities[index] = value;
    } else {
      entities.splice(index, 1);
    }
    this._fire({ entities });
  }

  _addEntity() {
    this._fire({ entities: [...(this.config.entities || []), ''] });
  }

  _updateScheduleEntity(value) {
    if (value) {
      this._fire({ schedule_entity: value });
    } else {
      const { schedule_entity, ...rest } = this.config;
      this.config = rest;
      this.dispatchEvent(new CustomEvent('config-changed', {
        detail: { config: this.config },
        bubbles: true,
        composed: true,
      }));
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

        <!-- Climate Entities -->
        <div>
          <div class="section-title">Climate Entities</div>
          ${entities.map((entity, i) => html`
            <div class="entity-row">
              <ha-selector
                .hass=${this.hass}
                .selector=${{ entity: { domain: 'climate' } }}
                .value=${entity || ''}
                .label=${'Climate entity'}
                @value-changed=${(e) => this._updateEntity(i, e.detail.value)}
              ></ha-selector>
              <ha-icon-button
                .path=${'M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z'}
                title="Remove"
                @click=${() => this._updateEntity(i, '')}
              ></ha-icon-button>
            </div>
          `)}
          <mwc-button class="add-btn" @click=${this._addEntity}>
            + Add entity
          </mwc-button>
        </div>

        <!-- Card Title -->
        <div>
          <div class="section-title">Title</div>
          <ha-textfield
            label="Card title (optional)"
            .value=${this.config.title ?? ''}
            @change=${(e) => this._fire({ title: e.target.value })}
          ></ha-textfield>
        </div>

        <!-- Temperature Range -->
        <div>
          <div class="section-title">Temperature Range</div>
          <div class="number-row">
            <ha-textfield
              label="Min (°C)"
              type="number"
              .value=${String(minTemp)}
              @change=${(e) => this._fire({ min_temp: parseFloat(e.target.value) })}
            ></ha-textfield>
            <ha-textfield
              label="Max (°C)"
              type="number"
              .value=${String(maxTemp)}
              @change=${(e) => this._fire({ max_temp: parseFloat(e.target.value) })}
            ></ha-textfield>
            <ha-textfield
              label="Step (°C)"
              type="number"
              step="0.5"
              .value=${String(tempStep)}
              @change=${(e) => this._fire({ temp_step: parseFloat(e.target.value) })}
            ></ha-textfield>
          </div>
        </div>

        <!-- Schedule Storage Entity -->
        <div>
          <div class="section-title">Schedule Storage (input_text)</div>
          <ha-selector
            .hass=${this.hass}
            .selector=${{ entity: { domain: 'input_text' } }}
            .value=${scheduleEntity}
            .label=${'input_text helper (optional)'}
            @value-changed=${(e) => this._updateScheduleEntity(e.detail.value)}
          ></ha-selector>
          <p class="helper-note">
            Optional: speichert den Zeitplan in einem <strong>Text-Helfer</strong>
            (Einstellungen → Geräte &amp; Dienste → Helfer → Text, max. Länge 10000).
            Dann werden Änderungen sofort gespeichert — ohne Dashboard-Bearbeitungsmodus.
          </p>
        </div>

      </div>
    `;
  }
}

customElements.define('thermostat-schedule-card-editor', ThermostatScheduleCardEditor);
