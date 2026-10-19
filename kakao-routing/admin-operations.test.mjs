import assert from 'node:assert/strict';
import { kakaoBindingOperation } from './admin-operations.mjs';

const calls=[];
const db={prepare(sql){return {bind(...args){calls.push({sql,args});return {
  async all(){return {results:[{room_id:'r1',alliance_id:args[0]}]};},
  async run(){return {meta:{changes:1}};}
};}}}};
const allowed=async aid=>aid==='a1';
await assert.rejects(kakaoBindingOperation(db,{operation:'list',alliance_id:'a1'}),/authorization unavailable/);
await assert.rejects(kakaoBindingOperation(db,{operation:'list',alliance_id:'a2'},allowed),/administrator required/);
await assert.rejects(kakaoBindingOperation(db,{operation:'save',alliance_id:'a2',binding:{alliance_id:'a1'}},allowed),/administrator required/);
assert.deepEqual((await kakaoBindingOperation(db,{operation:'list',alliance_id:'a1'},allowed)).bindings,[{room_id:'r1',alliance_id:'a1'}]);
assert.equal((await kakaoBindingOperation(db,{operation:'disable',alliance_id:'a1',room_id:'r1'},allowed)).updated,1);
assert.equal(calls.length,2,'unauthorized requests must not access database');
console.log('Kakao admin operation authorization tests passed');
