import assert from 'node:assert/strict';
import {parseKakaoPingBinding} from './parse-ping.mjs';
assert.deepEqual(parseKakaoPingBinding('!핑 숭배'),{room_type:'alliance',alliance_name:'숭배',guild_name:''});
assert.deepEqual(parseKakaoPingBinding(' !핑   숭배   숭배 '),{room_type:'guild',alliance_name:'숭배',guild_name:'숭배'});
assert.deepEqual(parseKakaoPingBinding('!핑 숭배 다른길드'),{room_type:'guild',alliance_name:'숭배',guild_name:'다른길드'});
assert.equal(parseKakaoPingBinding('!참여'),null);
assert.throws(()=>parseKakaoPingBinding('!핑'),/사용법/);
assert.throws(()=>parseKakaoPingBinding('!핑 숭배 길드 기타'),/사용법/);
console.log('PING parsing tests passed');
