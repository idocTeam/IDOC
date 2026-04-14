export const toMinutes = (time) => {
  if (!time || typeof time !== "string" || !time.includes(":")) return null;

  const [h, m] = time.split(":").map(Number);

  if (
    Number.isNaN(h) ||
    Number.isNaN(m) ||
    h < 0 ||
    h > 23 ||
    m < 0 ||
    m > 59
  ) {
    return null;
  }

  return h * 60 + m;
};

export const toHHMM = (minutes) => {
  const h = String(Math.floor(minutes / 60)).padStart(2, "0");
  const m = String(minutes % 60).padStart(2, "0");
  return `${h}:${m}`;
};

export const generateSubSlots = (
  startTime,
  endTime,
  slotDurationMinutes,
  bufferMinutes = 0
) => {
  const start = toMinutes(startTime);
  const end = toMinutes(endTime);

  if (
    start === null ||
    end === null ||
    !Number.isInteger(slotDurationMinutes) ||
    slotDurationMinutes < 5 ||
    !Number.isInteger(bufferMinutes) ||
    bufferMinutes < 0 ||
    start >= end
  ) {
    return [];
  }

  const slots = [];
  let current = start;

  while (current + slotDurationMinutes <= end) {
    const slotStart = current;
    const slotEnd = current + slotDurationMinutes;

    slots.push({
      startTime: toHHMM(slotStart),
      endTime: toHHMM(slotEnd)
    });

    current = slotEnd + bufferMinutes;
  }

  return slots;
};