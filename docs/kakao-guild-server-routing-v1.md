# GuildCore — Kakao alliance/guild alert routing (design v1)

Status: design only. No production code, schema, or Kakao bot script changes.

## Required routing
- WORLD (alliance boss): deliver to the alliance Kakao room and every active guild Kakao room belonging to the same alliance.
- SERVER boss: deliver only to active guild Kakao rooms whose server_id equals the boss server_id; never to guild rooms on other servers or the alliance room.
- Multiple guilds on one server share the server's boss schedule but have independent delivery receipts.
- A room receives at most one copy of a given alert even if multiple subscriptions resolve to it.
- A guild room not configured/connected receives nothing; existing alliance-room behavior must remain intact until the new routing is enabled and verified.

## Data boundaries
- Keep existing bosses.boss_scope and bosses.server_id.
- Persist room identity, alliance_id, guild_id, server_id, active state and delivery alias independently of volatile bot-script state.
- Do not delete or recreate members, Kakao registrations, or room bindings during code updates.
- Introduce per-room delivery tracking keyed by (alert_id, room_binding_id) rather than using boss_alert_queue.kakao_status as a global delivered flag.
- Confirm each room independently, with leases and idempotency. Do not mark an alert fully delivered until every required room is accounted for.
- Use stable room identifiers and preserve the existing sender-alias fallback; do not treat unverified room title as proof of delivery.

## Rollout safeguards
1. Inspect existing Kakao client script and server room receipt endpoints before implementation.
2. Add additive schema migration only; no destructive schema/data changes.
3. Introduce opt-in routing for test guild rooms; leave current alliance route unchanged.
4. Verify WORLD to alliance + same/different-server guilds; SERVER only matching-server guilds; retry/duplicate protection; script edit/reload persistence.
5. Enable only after controlled test and explicit approval.

## Known existing implementation
- Root worker.js already stores boss_scope/server_id and generates boss_alert_queue rows.
- botPullAlerts_ currently polls by alliance_id, and Kakao 10m/5m alerts share a single kakao_status.
- Direct Kakao API has room_delivery_get/room_delivery_mark; their semantics and the live client script must be reviewed before modifying delivery.

## Outstanding
- Locate the exact currently deployed MessengerBotR 2.2.4 source and its persistence/room binding code.
- Verify current schema for guild/server mapping and Kakao room receipts.
- Implement and test in this branch, then review before merge.
