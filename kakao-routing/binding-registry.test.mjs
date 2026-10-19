import assert from 'node:assert/strict';
import { listKakaoBindings, saveKakaoBinding, disableKakaoBinding } from './binding-registry.mjs';

const state = {bindings: [], queries: []};
function stmt(sql) {
  return {bind(...args) {
    state.queries.push({sql,args});
    return {
      async first() {
        if (sql.includes('FROM guilds')) return args[0] === 'g1' && args[1] === 'a1' ? {guild_id:'g1',server_id:'s1'} : null;
        if (sql.includes('FROM alliance_servers')) return args[0] === 's1' && args[1] === 'a1' ? {server_id:'s1'} : null;
        throw Error('Unexpected first query');
      },
      async all() {return {results:state.bindings.filter(x=>x.alliance_id===args[0])};},
      async run() {
        if (sql.includes('INSERT INTO kakao_room_bindings_v2')) {
          const [binding_id,alliance_id,room_id,room_type,guild_id,server_id,send_alias,created_at,updated_at]=args;
          const prev=state.bindings.find(x=>x.alliance_id===alliance_id&&x.room_id===room_id);
          if (prev) Object.assign(prev,{room_type,guild_id,server_id,send_alias,active:1,updated_at});
          else state.bindings.push({binding_id,alliance_id,room_id,room_type,guild_id,server_id,send_alias,active:1,created_at,updated_at});
          return {meta:{changes:1}};
        }
        if (sql.startsWith('UPDATE kakao_room_bindings_v2')) {
          const [,aid,room]=args;
          const prev=state.bindings.find(x=>x.alliance_id===aid&&x.room_id===room);
          if (prev) prev.active=0;
          return {meta:{changes:prev?1:0}};
        }
        throw Error('Unexpected run query');
      }
    };
  }};
}
const db={prepare:stmt};
await saveKakaoBinding(db,{alliance_id:'a1',room_id:'r1',room_type:'alliance'});
await saveKakaoBinding(db,{alliance_id:'a1',room_id:'r2',room_type:'guild',guild_id:'g1',server_id:'s1',send_alias:'alias'});
assert.equal((await listKakaoBindings(db,'a1')).length,2);
assert.equal((await disableKakaoBinding(db,'a1','r2')).updated,1);
assert.equal((await listKakaoBindings(db,'a1')).find(x=>x.room_id==='r2').active,0);
await saveKakaoBinding(db,{alliance_id:'a1',room_id:'r2',room_type:'guild',guild_id:'g1',server_id:'s1'});
assert.equal((await listKakaoBindings(db,'a1')).find(x=>x.room_id==='r2').active,1);
await assert.rejects(saveKakaoBinding(db,{alliance_id:'a1',room_id:'bad',room_type:'guild',guild_id:'g2',server_id:'s1'}));
await assert.rejects(saveKakaoBinding(db,{alliance_id:'a1',room_id:'bad',room_type:'guild',guild_id:'g1',server_id:'s2'}));
// A valid server ID alone must not allow binding a guild from another server.
const mismatchedDb={prepare(sql){return {bind(){return {async first(){return sql.includes('FROM guilds')?{guild_id:'g1',server_id:'s2'}:{server_id:'s1'};}};}}}};
await assert.rejects(saveKakaoBinding(mismatchedDb,{alliance_id:'a1',room_id:'wrong-server',room_type:'guild',guild_id:'g1',server_id:'s1'}),/mismatch/);
await assert.rejects(saveKakaoBinding(db,{alliance_id:'a1',room_id:'bad',room_type:'alliance',server_id:'s1'}));
assert.equal((await listKakaoBindings(db,'a1')).length,2);
console.log('Kakao binding registry mock tests passed');
