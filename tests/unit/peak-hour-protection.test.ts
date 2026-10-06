import assert from "node:assert/strict";
import test from "node:test";

import {
  describePeakHourWindow,
  evaluatePeakHourProtection,
  normalizePeakHourProtection,
} from "../../src/lib/providers/peakHourProtection.ts";

test("peak-hour protection activates inside weekday UTC windows", () => {
  const state = evaluatePeakHourProtection(
    {
      peakHourProtection: {
        enabled: true,
        mode: "block",
        windows: [
          {
            days: ["mon", "tue", "wed", "thu", "fri"],
            startUtc: "01:00",
            endUtc: "04:00",
          },
        ],
      },
    },
    new Date("2026-08-24T01:30:00.000Z")
  );

  assert.equal(state.active, true);
  assert.equal(state.mode, "block");
  assert.equal(state.retryAfter, "2026-08-24T04:00:00.000Z");
  assert.equal(state.retryAfterSeconds, 9000);
});

test("peak-hour protection honors weekdays and end boundary", () => {
  const providerSpecificData = {
    peakHourProtection: {
      enabled: true,
      windows: [
        {
          days: ["mon", "tue", "wed", "thu", "fri"],
          startUtc: "06:00",
          endUtc: "10:00",
        },
      ],
    },
  };

  assert.deepEqual(
    evaluatePeakHourProtection(providerSpecificData, new Date("2026-08-22T06:30:00.000Z")),
    { active: false }
  );
  assert.deepEqual(
    evaluatePeakHourProtection(providerSpecificData, new Date("2026-08-24T10:00:00.000Z")),
    { active: false }
  );
});

test("overnight windows apply their start day after midnight", () => {
  const mondayWindow = {
    peakHourProtection: {
      enabled: true,
      mode: "block",
      windows: [{ days: ["mon"], startUtc: "22:00", endUtc: "02:00" }],
    },
  };

  const mondayNight = evaluatePeakHourProtection(
    mondayWindow,
    new Date("2026-08-24T23:00:00.000Z")
  );
  assert.equal(mondayNight.active, true);
  assert.equal(mondayNight.retryAfter, "2026-08-25T02:00:00.000Z");

  const tuesdayEarly = evaluatePeakHourProtection(
    mondayWindow,
    new Date("2026-08-25T01:00:00.000Z")
  );
  assert.equal(tuesdayEarly.active, true);
  assert.equal(tuesdayEarly.retryAfter, "2026-08-25T02:00:00.000Z");

  assert.deepEqual(evaluatePeakHourProtection(mondayWindow, new Date("2026-08-25T02:00:00.000Z")), {
    active: false,
  });
  assert.deepEqual(evaluatePeakHourProtection(mondayWindow, new Date("2026-08-25T23:00:00.000Z")), {
    active: false,
  });

  const tuesdayWindow = {
    peakHourProtection: {
      enabled: true,
      mode: "block",
      windows: [{ days: ["tue"], startUtc: "22:00", endUtc: "02:00" }],
    },
  };
  assert.deepEqual(
    evaluatePeakHourProtection(tuesdayWindow, new Date("2026-08-25T01:00:00.000Z")),
    { active: false }
  );

  const sundayWindow = {
    peakHourProtection: {
      enabled: true,
      mode: "block",
      windows: [{ days: ["sun"], startUtc: "22:00", endUtc: "02:00" }],
    },
  };
  assert.equal(
    evaluatePeakHourProtection(sundayWindow, new Date("2026-08-24T01:00:00.000Z")).active,
    true
  );

  const dailyWindow = {
    peakHourProtection: {
      enabled: true,
      mode: "block",
      windows: [{ startUtc: "22:00", endUtc: "02:00" }],
    },
  };
  assert.equal(
    evaluatePeakHourProtection(dailyWindow, new Date("2026-08-25T01:00:00.000Z")).active,
    true
  );
});

test("peak-hour protection supports daily Z.ai-style windows", () => {
  const state = evaluatePeakHourProtection(
    {
      peakHourProtection: {
        enabled: true,
        mode: "avoid",
        windows: [{ name: "Z.ai peak", startUtc: "06:00", endUtc: "10:00" }],
      },
    },
    new Date("2026-08-23T06:30:00.000Z")
  );

  assert.equal(state.active, true);
  assert.equal(state.mode, "avoid");
  assert.equal(describePeakHourWindow(state.window), "Z.ai peak daily 06:00-10:00 UTC");
});

test("normalizer drops malformed windows but keeps operator intent", () => {
  assert.deepEqual(
    normalizePeakHourProtection({
      enabled: true,
      mode: "avoid",
      windows: [
        { startUtc: "bad", endUtc: "10:00" },
        { days: ["mon", "nope", "mon"], startUtc: "6:00", endUtc: "10:00" },
      ],
    }),
    {
      enabled: true,
      mode: "avoid",
      windows: [{ days: ["mon"], startUtc: "06:00", endUtc: "10:00" }],
    }
  );
});
