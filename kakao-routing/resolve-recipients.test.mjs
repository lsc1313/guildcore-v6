import assert from 'node:assert/strict';
import { resolveKakaoAlertRooms } from './resolve-recipients.mjs';

const bindings = [
  {room_id:'alliance',alliance_id:'alliance_002',room_type:'alliance',active:true},
  {room_id:'guild-1',alliance_id:'alliance_002',room_type:'guild',guild_id:'g1',server_id:'s1',active:true},
  {room_id:'guild-2',alliance_id:'alliance_002',room_type:'guild',guild_id:'g2',server_id:'s3',active:true},
  {room_id:'guild-3',alliance_id:'alliance_002',room_type:'guild',guild_id:'g3',server_id:'s1',active:true},
  {room_id:'guild-1',alliance_id:'alliance_002',room_type:'guild',guild_id:'g1',server_id:'s1',active:true},
  {room_id:'inactive',alliance_id:'alliance_002',room_type:'guild',guild_id:'g4',server_id:'s1',active:false},
  {room_id:'other-alliance',alliance_id:'alliance_999',room_type:'guild',guild_id:'g5',server_id:'s1',active:true}
];
const world = {alliance_id:'alliance_002',boss_scope:'WORLD'};
const server = id => ({alliance_id:'alliance_002',boss_scope:'SERVER',server_id:id});
assert.deepEqual(resolveKakaoAlertRooms(world, bindings), ['alliance','guild-1','guild-2','guild-3']);
assert.deepEqual(resolveKakaoAlertRooms(server('s1'), bindings), ['guild-1','guild-3']);
assert.deepEqual(resolveKakaoAlertRooms(server('s3'), bindings), ['guild-2']);
assert.deepEqual(resolveKakaoAlertRooms(server(''), bindings), []);
assert.deepEqual(resolveKakaoAlertRooms({...world,boss_scope:'INVALID'}, bindings), []);
assert.deepEqual(resolveKakaoAlertRooms({...world,alliance_id:'alliance_999'}, bindings), ['other-alliance']);
assert.deepEqual(resolveKakaoAlertRooms(server('s1'), []), []);
console.log('Kakao recipient routing tests passed');
