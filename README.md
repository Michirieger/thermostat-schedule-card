# Thermostat Schedule Card

A Home Assistant Lovelace card for configuring weekly heating/cooling schedules for `climate` entities — with a visual timeline interface.

![Screenshot](https://raw.githubusercontent.com/YOUR_USERNAME/thermostat-schedule-card/main/docs/screenshot.png)

## Features

- **Weekly schedule view** — per-day timeline with color-coded temperature blocks
- **Day grouping** — combine days that share the same schedule (e.g. Mon–Fri, Sat, Sun)
- **Click-to-edit blocks** — set start time, end time and temperature via a dialog
- **Temperature slider** — fine-grained control with configurable step size
- **Multiple climate entities** — apply the same schedule to several thermostats at once
- **HA automation sync** — one-click creation of Home Assistant automations to execute the schedule
- **Visual card editor** — configure directly in the Lovelace UI

---

## Installation via HACS

1. Go to **HACS → Frontend → ⋮ → Custom repositories**
2. Add `https://github.com/YOUR_USERNAME/thermostat-schedule-card` as type **Lovelace**
3. Search for **Thermostat Schedule Card** and install
4. Reload the browser

---

## Manual Installation

1. Download `dist/thermostat-schedule-card.js` from the [latest release](https://github.com/YOUR_USERNAME/thermostat-schedule-card/releases/latest)
2. Copy to `/config/www/thermostat-schedule-card.js`
3. Add a dashboard resource:
   - **Settings → Dashboards → ⋮ → Resources → Add Resource**
   - URL: `/local/thermostat-schedule-card.js`
   - Type: **JavaScript module**
4. Reload the browser

---

## Configuration

```yaml
type: custom:thermostat-schedule-card
title: Heating Schedule          # optional, default: "Thermostat Schedule"
entities:
  - climate.living_room
  - climate.bedroom
min_temp: 5                      # optional, default: 5
max_temp: 35                     # optional, default: 35
temp_step: 0.5                   # optional, default: 0.5
```

The `schedule` key is managed automatically by the card's visual editor — you do not need to edit it manually.

---

## How the schedule is applied

The card provides a **"Sync to HA"** button that creates Home Assistant time-based automations for each time block. These automations:

- Trigger at the block's start time
- Are restricted to the configured weekdays
- Call `climate.set_temperature` on all configured entities

The automations are tagged internally and replaced on each sync, so they always reflect the current card configuration.

> **Note:** The sync requires your HA user to have the *Manage Automations* permission.

---

## Day Grouping

By default the card creates three groups matching the image above: **Mon–Fri**, **Saturday**, **Sunday**.

- Click the **ℹ️** icon on any group to reassign days or delete the group
- Unassigned days can be gathered into a new group via the **"Add day group"** button

---

## Development

```bash
npm install
npm run build      # build to dist/
npm run watch      # watch mode
```

---

## License

MIT
