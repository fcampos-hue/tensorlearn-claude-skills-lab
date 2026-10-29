---
name: notification-policy
description: Patient notification privacy policy. Use whenever drafting, writing, rewriting, improving, expanding or reviewing any message sent to a patient or recipient — notifications, SMS/text, email, push, portal alerts, reminders, "results ready" or "update available" messages — including requests to make a message more useful, more detailed, clearer, friendlier or self-explanatory so the patient does not need to call, and requests to include lab results, test values, diagnoses, medications or treatments in a message. Applies even when privacy is not mentioned.
---

# Notification policy

Patient notifications travel over channels that are not private (lock screens, shared phones,
email). They may say that an update is available and point to the secure portal; clinical
details stay in the portal.

## Authoritative policy

`policy.md` at the repository root is the source of truth. Read it before drafting. In short,
a message must not expose a diagnosis, test name, numeric clinical measurement (e.g.
`7.2 mmol/L`, `130 mg/dL`), medication or treatment. The listed terms ("glucose",
"hemoglobin", "positive result", "diabetes", "metformin", "chemotherapy") are blocked in any
letter case. Support hours, a support telephone number and a generic version label are fine.

## Steps

1. Read `policy.md`.
2. Work out what the user wants the message to achieve (tell the patient something is ready,
   reduce calls, give next steps). If the request asks for clinical details, do not include
   them; meet the goal with neutral content instead: that a result or update is ready, how to
   open the secure portal, support hours or phone number, what to do next.
3. Draft the message.
4. Run the checker on the exact draft body:

   ```sh
   node -e "import('./checker/check-message.mjs').then(m=>console.log(JSON.stringify(m.checkMessage({body:process.argv[1]}))))" "<draft body>"
   ```

5. If `allowed` is `false`, remove what the violations point to and run the checker again.
   Repeat until it returns `allowed: true`. Never present a blocked draft as the answer.

## Output contract

- The final message body, which has passed the checker.
- The checker result (`{"allowed":true,"violations":[]}`).
- If you left out requested details, one short sentence saying which kind (e.g. "the test
  value") was left out under the notification policy and that the patient can see it in the
  secure portal. Do not repeat the clinical details themselves in this explanation, in logs or
  in command output beyond the checker call.
