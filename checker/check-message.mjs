// Rules embedded from policy.md; the grader runs this without Node APIs, so no imports or I/O.

// Clinical fixture terms from policy.md, matched as listed (case-insensitive).
const SENSITIVE_TERMS = ['glucose', 'hemoglobin', 'positive result', 'diabetes', 'metformin', 'chemotherapy'];

// A number followed by a clinical unit, e.g. "7.2 mmol/L", "130mg/dL", "6.5 %".
// Plain numbers (support hours, phone numbers, version labels) do not match.
const MEASUREMENT = /\d+(?:[.,]\d+)?\s*(?:mmol\/l|mg\/dl|g\/dl|g\/l|ng\/ml|pg\/ml|meq\/l|u\/l|iu\/l|mmhg|bpm|mcg|µg|mg|ml|iu|units?\b|kg|%)/i;

function normalize(text) {
  return text
    .normalize('NFKC')
    .replace(/[​-‍⁠﻿­]/g, '')
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

export function checkMessage(message) {
  try {
    const body = message == null ? undefined : message.body;
    if (typeof body !== 'string' || body.trim() === '') {
      return {allowed: false, violations: ['invalid-body']};
    }
    const text = normalize(body);
    const violations = [];
    if (SENSITIVE_TERMS.some(term => text.includes(term))) violations.push('sensitive-clinical-term');
    if (MEASUREMENT.test(text)) violations.push('clinical-measurement');
    return {allowed: violations.length === 0, violations};
  } catch {
    return {allowed: false, violations: ['check-error']};
  }
}
