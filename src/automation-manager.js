import {
  minutesToTimeStr,
  getGroupName,
  DAY_NAMES_HA,
} from './utils.js';

const TAG_PREFIX = 'thermostat_schedule_card';

function buildTag(cardId) {
  return `${TAG_PREFIX}:${cardId}`;
}

/**
 * Sync all schedule automations:
 * - Delete old automations for this card
 * - Create new automations based on current schedule
 *
 * @param {Object} hass  - HA hass object
 * @param {string} cardId - Unique ID for this card instance
 * @param {string[]} entities - climate entity IDs
 * @param {Object} schedule - schedule data
 * @param {number} [tempStep=0.5] - temperature step
 */
export async function syncAutomations(hass, cardId, entities, schedule, tempStep = 0.5) {
  const tag = buildTag(cardId);

  // 1. List all automations and find ours
  let allAutomations = [];
  try {
    allAutomations = await hass.callWS({ type: 'config/automation/list' });
  } catch (e) {
    throw new Error(`Failed to list automations: ${e.message}`);
  }

  const ours = allAutomations.filter(
    (a) => a.description && a.description.startsWith(tag + ':'),
  );

  // 2. Delete old ones
  for (const auto of ours) {
    try {
      await hass.callWS({
        type: 'config/automation/delete',
        automation_id: auto.id,
      });
    } catch (e) {
      console.warn(`[thermostat-schedule-card] Could not delete automation ${auto.id}:`, e);
    }
  }

  // 3. Create new automations
  const errors = [];
  for (const group of schedule.groups) {
    for (const block of group.blocks) {
      try {
        await createBlockAutomation(hass, tag, group, block, entities, tempStep);
      } catch (e) {
        errors.push(`Block ${block.id}: ${e.message}`);
      }
    }
  }

  if (errors.length) {
    throw new Error(`Some automations failed:\n${errors.join('\n')}`);
  }
}

async function createBlockAutomation(hass, tag, group, block, entities, tempStep) {
  const startTime = minutesToTimeStr(block.startMinutes);
  const haDays = group.days.map((d) => DAY_NAMES_HA[d]);
  const groupLabel = getGroupName(group.days);

  const config = {
    alias: `[Thermostat Schedule] ${groupLabel} → ${block.temperature}° at ${startTime}`,
    description: `${tag}:${group.id}:${block.id}`,
    mode: 'single',
    trigger: [
      {
        platform: 'time',
        at: `${startTime}:00`,
      },
    ],
    condition:
      haDays.length < 7
        ? [
            {
              condition: 'time',
              weekday: haDays,
            },
          ]
        : [],
    action: entities.map((entity_id) => ({
      service: 'climate.set_temperature',
      target: { entity_id },
      data: { temperature: block.temperature },
    })),
  };

  await hass.callWS({
    type: 'config/automation/create',
    config,
  });
}

/**
 * Count existing synced automations for this card.
 * Returns 0 if automations API is unavailable.
 */
export async function countSyncedAutomations(hass, cardId) {
  const tag = buildTag(cardId);
  try {
    const all = await hass.callWS({ type: 'config/automation/list' });
    return all.filter((a) => a.description && a.description.startsWith(tag + ':')).length;
  } catch {
    return 0;
  }
}
