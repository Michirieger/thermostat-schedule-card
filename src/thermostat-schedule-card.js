import { LitElement, html, css } from 'lit';
import {
  getDefaultSchedule,
  getGroupName,
  getBlockColor,
  getTimeBoundaries,
  minutesToTimeStr,
  generateId,
  sortBlocks,
  DAY_NAMES_SHORT,
} from './utils.js';
import { syncAutomations, countSyncedAutomations } from './automation-manager.js';
import './block-dialog.js';
import './group-dialog.js';
import './editor.js';

// ─── Main Card ─────────────────────────────────────────────────────────────

class ThermostatScheduleCard extends LitElement {
  static properties = {
    hass: { type: Object },
    config: { type: Object },
    _schedule: { state: true },
    _editBlock: { state: true },       // { block, groupId, isNew }
    _editGroup: { state: true },       // group
    _syncStatus: { state: true },      // 'idle' | 'syncing' | 'ok' | 'error'
    _syncMessage: { state: true },
    _syncCount: { state: true },
  };

  static styles = css`
    :host {
      display: block;
      --block-height: 54px;
      --radius: 8px;
      --comfortable-color: #5ba4cf;
      --eco-color: #9e9e9e;
    }

    ha-card {
      overflow: hidden;
    }

    /* ── Header ── */
    .card-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      padding: 14px 16px 6px;
    }

    .header-left {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .card-title {
      font-size: 1rem;
      font-weight: 500;
      color: var(--primary-text-color);
    }

    .card-subtitle {
      font-size: 0.72rem;
      color: var(--secondary-text-color);
    }

    .header-actions {
      display: flex;
      gap: 2px;
      align-items: center;
    }

    /* ── Info banner ── */
    .info-banner {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      margin: 0 16px 8px;
      padding: 8px 10px;
      border-radius: var(--radius);
      background: var(--info-color, #2196f3);
      color: #fff;
      font-size: 0.72rem;
      line-height: 1.4;
      opacity: 0.88;
    }

    .info-banner ha-icon {
      --mdc-icon-size: 16px;
      flex-shrink: 0;
      margin-top: 1px;
    }

    /* ── Schedule ── */
    .schedule-body {
      padding: 4px 16px 12px;
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    /* ── Loading state ── */
    .loading-state {
      padding: 24px 16px;
      text-align: center;
      font-size: 0.82rem;
      color: var(--secondary-text-color);
    }

    /* ── Group section ── */
    .group-section {
      padding: 10px 0 2px;
    }

    .group-section + .group-section {
      border-top: 1px solid var(--divider-color, rgba(0,0,0,0.08));
    }

    .group-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 6px;
    }

    .group-name {
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .group-btns {
      display: flex;
      gap: 0;
    }

    /* ── Timeline ── */
    .timeline {
      position: relative;
      height: var(--block-height);
      border-radius: var(--radius);
      overflow: hidden;
      background: var(--secondary-background-color, #f0f0f0);
      display: flex;
      cursor: default;
    }

    .timeline-block {
      position: relative;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      border-right: 2px solid rgba(255, 255, 255, 0.5);
      transition: filter 0.12s;
      overflow: hidden;
      user-select: none;
    }

    .timeline-block:last-child {
      border-right: none;
    }

    .timeline-block:hover {
      filter: brightness(0.88);
    }

    .block-temp {
      font-size: 0.82rem;
      font-weight: 700;
      color: white;
      text-shadow: 0 1px 2px rgba(0,0,0,0.25);
      pointer-events: none;
    }

    .block-add-hint {
      font-size: 0.6rem;
      color: rgba(255,255,255,0.7);
      pointer-events: none;
    }

    /* ── Time labels ── */
    .time-labels {
      position: relative;
      height: 18px;
      margin-top: 3px;
    }

    .time-label {
      position: absolute;
      font-size: 0.62rem;
      color: var(--secondary-text-color);
      white-space: nowrap;
      transform: translateX(-50%);
    }

    .time-label.edge-left { transform: translateX(0); }
    .time-label.edge-right { transform: translateX(-100%); }

    /* ── Add block button ── */
    .add-block-row {
      display: flex;
      justify-content: flex-end;
      padding-top: 2px;
    }

    /* ── Bottom actions ── */
    .bottom-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6px 16px 14px;
      border-top: 1px solid var(--divider-color, rgba(0,0,0,0.08));
      flex-wrap: wrap;
      gap: 8px;
    }

    .sync-status {
      font-size: 0.72rem;
      display: flex;
      align-items: center;
      gap: 6px;
      color: var(--secondary-text-color);
    }

    .sync-status.ok { color: var(--success-color, #4caf50); }
    .sync-status.error { color: var(--error-color, #f44336); }

    .bottom-right {
      display: flex;
      gap: 6px;
    }

    ha-icon-button {
      --mdc-icon-button-size: 34px;
      color: var(--secondary-text-color);
    }

    ha-icon-button:hover {
      color: var(--primary-color);
    }

    mwc-button {
      --mdc-theme-primary: var(--primary-color);
    }
  `;

  // ── Private fields ───────────────────────────────────────────────────────

  _lastEntityState = undefined;

  // ── Config ──────────────────────────────────────────────────────────────

  setConfig(config) {
    if (!config.entities?.length) {
      throw new Error('Please define at least one climate entity.');
    }
    this.config = config;

    if (config.schedule_entity) {
      // Schedule will be loaded from the HA entity via set hass()
      this._schedule = null;
      this._lastEntityState = undefined;
    } else {
      // Legacy: schedule stored in card config
      this._schedule = config.schedule
        ? JSON.parse(JSON.stringify(config.schedule))
        : getDefaultSchedule();
    }

    this._syncStatus = 'idle';
    this._syncMessage = '';
    this._syncCount = null;
    this._loadSyncCount();
  }

  updated(changedProps) {
    if (!changedProps.has('hass')) return;
    const entityId = this.config?.schedule_entity;
    if (!entityId || !this.hass) return;

    const entityState = this.hass.states[entityId]?.state;
    if (entityState === undefined || entityState === this._lastEntityState) return;

    this._lastEntityState = entityState;

    try {
      const parsed = JSON.parse(entityState);
      if (parsed && typeof parsed === 'object' && Array.isArray(parsed.groups)) {
        this._schedule = parsed;
      }
    } catch {
      // State is not valid JSON yet (e.g. entity just created and empty)
    }
  }

  getCardSize() {
    const groups = this._schedule?.groups?.length ?? 3;
    return 2 + groups * 2;
  }

  static getConfigElement() {
    return document.createElement('thermostat-schedule-card-editor');
  }

  static getStubConfig() {
    return {
      entities: ['climate.living_room'],
      title: 'Thermostat Schedule',
      min_temp: 5,
      max_temp: 35,
      temp_step: 0.5,
      schedule: getDefaultSchedule(),
    };
  }

  // ── Lifecycle ────────────────────────────────────────────────────────────

  async _loadSyncCount() {
    if (!this.hass || !this._cardId) return;
    this._syncCount = await countSyncedAutomations(this.hass, this._cardId);
  }

  get _cardId() {
    // Stable ID derived from configured entities
    return (this.config?.entities || []).join('_').replace(/[^a-z0-9_]/gi, '_');
  }

  // ── Schedule mutations ───────────────────────────────────────────────────

  /** Persist schedule — via input_text entity if configured, else via config-changed */
  _commitSchedule(schedule) {
    this._schedule = schedule;

    if (this.config.schedule_entity) {
      // Persist to HA input_text helper; no config-changed needed
      this.hass.callService('input_text', 'set_value', {
        entity_id: this.config.schedule_entity,
        value: JSON.stringify(schedule),
      });
      // Optimistically update the last known state so we don't re-parse our own write
      this._lastEntityState = JSON.stringify(schedule);
    } else {
      // Legacy: fire config-changed so HA saves schedule into card config
      this.config = { ...this.config, schedule };
      this.dispatchEvent(
        new CustomEvent('config-changed', {
          detail: { config: this.config },
          bubbles: true,
          composed: true,
        }),
      );
    }
  }

  _saveBlock(e) {
    const { block } = e.detail;
    const { groupId, isNew } = this._editBlock;
    const groups = this._schedule.groups.map((g) => {
      if (g.id !== groupId) return g;
      let blocks;
      if (isNew) {
        blocks = [...g.blocks, { ...block, id: generateId() }];
      } else {
        blocks = g.blocks.map((b) => (b.id === block.id ? block : b));
      }
      return { ...g, blocks: sortBlocks(blocks) };
    });
    this._commitSchedule({ ...this._schedule, groups });
    this._editBlock = null;
  }

  _deleteBlock(e) {
    const { id } = e.detail;
    const { groupId } = this._editBlock;
    const groups = this._schedule.groups.map((g) => {
      if (g.id !== groupId) return g;
      return { ...g, blocks: g.blocks.filter((b) => b.id !== id) };
    });
    this._commitSchedule({ ...this._schedule, groups });
    this._editBlock = null;
  }

  _addBlock(groupId) {
    // Find gaps in existing blocks to suggest a slot
    const group = this._schedule.groups.find((g) => g.id === groupId);
    const sorted = sortBlocks(group?.blocks ?? []);
    // Default: start at 06:00 if space available, else at end
    const suggested = { id: null, startMinutes: 360, endMinutes: 480, temperature: 21 };
    this._editBlock = { block: suggested, groupId, isNew: true };
  }

  _openEditBlock(block, groupId) {
    this._editBlock = { block, groupId, isNew: false };
  }

  _saveGroupDays(e) {
    const { groupId, days } = e.detail;
    const groups = this._schedule.groups.map((g) =>
      g.id === groupId ? { ...g, days } : g,
    );
    this._commitSchedule({ ...this._schedule, groups });
    this._editGroup = null;
  }

  _deleteGroup(e) {
    const { groupId } = e.detail;
    const groups = this._schedule.groups.filter((g) => g.id !== groupId);
    this._commitSchedule({ ...this._schedule, groups });
    this._editGroup = null;
  }

  _addGroup() {
    // Find unassigned days
    const used = this._schedule.groups.flatMap((g) => g.days);
    const free = [0, 1, 2, 3, 4, 5, 6].filter((d) => !used.includes(d));
    if (!free.length) return;
    const newGroup = {
      id: generateId(),
      days: [free[0]],
      blocks: [
        { id: generateId(), startMinutes: 0, endMinutes: 480, temperature: 18 },
        { id: generateId(), startMinutes: 480, endMinutes: 1080, temperature: 22 },
        { id: generateId(), startMinutes: 1080, endMinutes: 1440, temperature: 18 },
      ],
    };
    const groups = [...this._schedule.groups, newGroup];
    this._commitSchedule({ ...this._schedule, groups });
  }

  // ── Automation sync ──────────────────────────────────────────────────────

  async _syncToHA() {
    this._syncStatus = 'syncing';
    this._syncMessage = '';
    try {
      await syncAutomations(
        this.hass,
        this._cardId,
        this.config.entities,
        this._schedule,
        this.config.temp_step ?? 0.5,
      );
      this._syncCount = await countSyncedAutomations(this.hass, this._cardId);
      this._syncStatus = 'ok';
      this._syncMessage = `${this._syncCount} automation(s) synced`;
    } catch (err) {
      this._syncStatus = 'error';
      this._syncMessage = err.message;
    }
  }

  // ── Render helpers ───────────────────────────────────────────────────────

  _renderGroup(group) {
    const blocks = sortBlocks(group.blocks);
    const boundaries = getTimeBoundaries(blocks);
    const minTemp = this.config.min_temp ?? 5;
    const maxTemp = this.config.max_temp ?? 35;

    return html`
      <div class="group-section">
        <div class="group-header">
          <span class="group-name">${getGroupName(group.days)}</span>
          <div class="group-btns">
            <ha-icon-button
              title="Manage days / delete group"
              .path=${'M12,2C6.48,2 2,6.48 2,12s4.48,10 10,10 10-4.48 10-10S17.52,2 12,2zm1,15h-2v-2h2v2zm0-4h-2V7h2v6z'}
              @click=${() => { this._editGroup = group; }}
            ></ha-icon-button>
          </div>
        </div>

        <div class="timeline">
          ${blocks.map((block) => {
            const width = ((block.endMinutes - block.startMinutes) / 1440) * 100;
            const colors = getBlockColor(block.temperature, minTemp, maxTemp);
            return html`
              <div
                class="timeline-block"
                style="width:${width}%; background:${colors.bg};"
                title="${minutesToTimeStr(block.startMinutes)} – ${
                  block.endMinutes === 1440 ? '24:00' : minutesToTimeStr(block.endMinutes)
                }  |  ${block.temperature}°C  (click to edit)"
                @click=${() => this._openEditBlock(block, group.id)}
              >
                <span class="block-temp">${block.temperature}°</span>
              </div>
            `;
          })}
        </div>

        <!-- Time labels -->
        <div class="time-labels">
          ${boundaries.map((min, idx) => {
            const pct = (min / 1440) * 100;
            const isFirst = idx === 0;
            const isLast = idx === boundaries.length - 1;
            return html`
              <span
                class="time-label ${isFirst ? 'edge-left' : ''} ${isLast ? 'edge-right' : ''}"
                style="left:${pct}%"
              >
                ${min === 1440 ? '24:00' : minutesToTimeStr(min)}
              </span>
            `;
          })}
        </div>

        <div class="add-block-row">
          <mwc-button
            dense
            label="Add time block"
            @click=${() => this._addBlock(group.id)}
          ></mwc-button>
        </div>
      </div>
    `;
  }

  _renderSyncStatus() {
    if (this._syncStatus === 'idle') {
      return html`
        <span class="sync-status">
          ${this._syncCount !== null
            ? html`${this._syncCount} automation(s) active`
            : html`Not yet synced to HA`}
        </span>
      `;
    }
    if (this._syncStatus === 'syncing') {
      return html`<span class="sync-status">Syncing…</span>`;
    }
    if (this._syncStatus === 'ok') {
      return html`<span class="sync-status ok">✓ ${this._syncMessage}</span>`;
    }
    return html`<span class="sync-status error" title=${this._syncMessage}>⚠ Sync failed</span>`;
  }

  render() {
    const { schedule: _s, ...cfg } = this.config ?? {};
    const schedule = this._schedule;
    const hasEntity = Boolean(this.config?.schedule_entity);

    // Show loading placeholder while waiting for entity state to arrive
    if (!schedule) {
      return html`
        <ha-card>
          <div class="loading-state">
            Loading schedule from <code>${this.config.schedule_entity}</code>…
          </div>
        </ha-card>
      `;
    }

    const usedDays = schedule.groups.flatMap((g) => g.days);
    const freeCount = 7 - usedDays.length;

    const editB = this._editBlock;
    const editG = this._editGroup;

    const entityList = (this.config.entities || []).join(', ');
    const title = this.config.title ?? 'Thermostat Schedule';

    return html`
      <ha-card>
        <!-- ── Header ── -->
        <div class="card-header">
          <div class="header-left">
            <span class="card-title">${title}</span>
            <span class="card-subtitle">${entityList}</span>
          </div>
        </div>

        <!-- ── Info banner (only when no schedule_entity is set) ── -->
        ${!hasEntity ? html`
          <div class="info-banner">
            <ha-icon icon="mdi:information-outline"></ha-icon>
            <span>Tip: Add <code>schedule_entity: input_text.my_schedule</code> to persist changes without dashboard edit mode.</span>
          </div>
        ` : html``}

        <!-- ── Schedule rows ── -->
        <div class="schedule-body">
          ${schedule.groups.map((g) => this._renderGroup(g))}

          ${freeCount > 0
            ? html`
                <div style="padding-top:8px;">
                  <mwc-button
                    outlined
                    label="Add day group (${freeCount} day${freeCount > 1 ? 's' : ''} unassigned)"
                    @click=${this._addGroup}
                  ></mwc-button>
                </div>
              `
            : html``}
        </div>

        <!-- ── Bottom bar ── -->
        <div class="bottom-bar">
          ${this._renderSyncStatus()}
          <div class="bottom-right">
            <mwc-button
              outlined
              label="Sync to HA"
              title="Create/update Home Assistant automations for this schedule"
              ?disabled=${this._syncStatus === 'syncing'}
              @click=${this._syncToHA}
            ></mwc-button>
          </div>
        </div>
      </ha-card>

      <!-- ── Block edit dialog ── -->
      ${editB
        ? html`
            <thermostat-block-dialog
              .open=${true}
              .block=${editB.block}
              .isNew=${editB.isNew}
              .minTemp=${this.config.min_temp ?? 5}
              .maxTemp=${this.config.max_temp ?? 35}
              .tempStep=${this.config.temp_step ?? 0.5}
              @block-save=${this._saveBlock}
              @block-delete=${this._deleteBlock}
              @block-cancel=${() => { this._editBlock = null; }}
            ></thermostat-block-dialog>
          `
        : html``}

      <!-- ── Group edit dialog ── -->
      ${editG
        ? html`
            <thermostat-group-dialog
              .open=${true}
              .group=${editG}
              .usedDays=${usedDays}
              @group-days-save=${this._saveGroupDays}
              @group-delete=${(e) => this._deleteGroup({ detail: { groupId: e.detail.groupId } })}
              @group-cancel=${() => { this._editGroup = null; }}
            ></thermostat-group-dialog>
          `
        : html``}
    `;
  }
}

customElements.define('thermostat-schedule-card', ThermostatScheduleCard);

// ── HACS card registration ─────────────────────────────────────────────────

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'thermostat-schedule-card',
  name: 'Thermostat Schedule Card',
  description:
    'A weekly schedule card for climate entities — configure heating/cooling times and temperatures for each day group.',
  preview: true,
  documentationURL: 'https://github.com/Michirieger/thermostat-schedule-card',
});
