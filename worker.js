const APP_VERSION = "V6.2.1";
const SESSION_DAYS = 30;
const KST_MS = 9 * 60 * 60 * 1000;
const APP_HTML = "<!doctype html>\n<html lang=\"ko\">\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover\">\n<meta name=\"theme-color\" content=\"#07101f\">\n<title>GuildCore</title>\n<style>\n\n:root{\n  --bg:#050b17;--bg2:#081224;--panel:#111d32;--panel2:#0c172a;--line:#223754;\n  --text:#f5f8ff;--muted:#8d9bb3;--cyan:#18b8ec;--blue:#2979ff;--purple:#8858ff;\n  --pink:#ff3f72;--green:#25c996;--gold:#ffc247;--red:#f24461;--input:#081326;\n}\n*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}\nhtml,body{margin:0;width:100%;min-height:100%;background:var(--bg);color:var(--text);font-family:system-ui,-apple-system,\"Noto Sans KR\",sans-serif}\nbody{min-width:100%;overflow-x:hidden;background:radial-gradient(circle at 50% -20%,#102345 0,#07101f 34%,#030914 72%)}\nbutton,input,select,textarea{font:inherit}\n.app{width:100%;max-width:none;margin:0;min-height:100svh;padding-bottom:44px}\n.topbar{position:sticky;top:0;z-index:50;width:100%;background:rgba(5,12,25,.97);border-bottom:1px solid #1b2b46;padding:18px max(18px,env(safe-area-inset-left)) 16px;display:flex;align-items:center;gap:13px;backdrop-filter:blur(12px)}\n.brandBadge{flex:0 0 auto;background:linear-gradient(135deg,#6553ee,#9c59f3);padding:9px 13px;border-radius:10px;font-size:15px;font-weight:950;letter-spacing:.2px;box-shadow:0 6px 18px rgba(115,75,255,.22)}\n.brandText{min-width:0;display:flex;flex-direction:column;gap:2px}\n.brandTitle{font-weight:950;font-size:20px;line-height:1.12;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.brandSub{color:#73839c;font-size:11px;font-weight:700}\n.back{display:none;margin-left:8px;border:1px solid #3b4d69;background:#17243a;color:#fff;padding:10px 13px;border-radius:12px;font-weight:850;white-space:nowrap}.versionTag{margin-left:auto;color:#64748b;font-size:11px;font-weight:800;letter-spacing:.4px}.back+.versionTag{margin-left:8px}\nmain{width:100%;padding:20px 18px 0}\n.screen{display:none;width:100%}.screen.active{display:block}\n.homeIntro{margin:2px 1px 17px;color:#8090aa;font-size:12px;font-weight:700}\n.grid{width:100%;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}\n.card{min-width:0;min-height:186px;background:linear-gradient(145deg,#121f36,#0e192c);border:1px solid #263d5e;border-radius:23px;padding:21px 12px;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;box-shadow:0 10px 28px rgba(0,0,0,.18)}\n.card,.btn,.mini,.chip,.back{transition:transform .08s ease,filter .12s ease,box-shadow .12s ease,opacity .12s ease}\n.card:active{transform:scale(.975);filter:brightness(1.12)}\n.btn:active,.mini:active,.back:active{transform:scale(.965);filter:brightness(1.22)}\n.chip:active{transform:scale(.96);filter:brightness(1.18)}\n.btn.is-busy,.mini.is-busy{filter:brightness(.82);opacity:.88;cursor:wait}\n.btn.is-busy::after,.mini.is-busy::after{content:\"\";display:inline-block;width:.8em;height:.8em;margin-left:.55em;border:2px solid rgba(255,255,255,.35);border-top-color:#fff;border-radius:50%;vertical-align:-.08em;animation:spin .7s linear infinite}\n@keyframes spin{to{transform:rotate(360deg)}}\n.iconBox{width:72px;height:72px;border-radius:20px;display:flex;align-items:center;justify-content:center;font-size:37px;margin-bottom:15px;border:1px solid rgba(255,255,255,.07);box-shadow:inset 0 0 28px rgba(255,255,255,.04),0 6px 16px rgba(0,0,0,.14)}\n.i1{background:#123451}.i2{background:#172f4d}.i3{background:#312739}.i4{background:#37203c}.i5{background:#12383a}.i6{background:#2a204b}.i7{background:#12384b}.i8{background:#3a321f}\n.card h3{margin:0 0 7px;font-size:19px;font-weight:950;letter-spacing:-.4px}.card p{margin:0;color:#8190a8;font-size:12.5px;font-weight:650;line-height:1.35}\n.panel{width:100%;background:linear-gradient(160deg,#111d32,#0c172a);border:1px solid #263d5e;border-radius:24px;padding:20px;margin-bottom:16px;box-shadow:0 10px 28px rgba(0,0,0,.15)}\n.panelHead{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:17px}.panel h2{margin:0;font-size:23px;font-weight:950;letter-spacing:-.5px}.sectionIcon{font-size:27px;margin-right:4px}\n.notice{background:#0c223a;border:1px solid #1e5e7c;color:#a9e2f6;padding:13px 14px;border-radius:13px;margin:10px 0 15px;font-size:13px;line-height:1.55}\n.formGrid{display:grid;grid-template-columns:1fr 1fr;gap:11px}.full{grid-column:1/-1}\nlabel{display:block;color:#9ba9bd;font-size:15px;font-weight:850;margin:12px 0 7px}\ninput,select,textarea{width:100%;background:var(--input);border:1px solid #2b3f5f;color:#fff;border-radius:14px;padding:16px 14px;font-size:17px;outline:none;margin:0}\ninput:focus,select:focus,textarea:focus{border-color:#21aee5;box-shadow:0 0 0 2px rgba(33,174,229,.08)}\ntextarea{min-height:130px;resize:vertical}\n.btn{border:0;border-radius:14px;padding:17px 15px;font-size:18px;font-weight:950;color:#fff;background:linear-gradient(90deg,#159ee3,#2d6ff0);width:100%;margin-top:12px;box-shadow:0 8px 20px rgba(31,112,230,.14)}\n.btn.red{background:linear-gradient(90deg,#d8274f,#ff3f67)}.btn.green{background:linear-gradient(90deg,#0fa978,#28cb99)}.btn.gold{background:linear-gradient(90deg,#f2a000,#ffbf19);color:#18120a}.btn.ghost{background:#0c172a;border:1px solid #365170;color:#c7eaff;box-shadow:none}\n.mini{border:1px solid #79374b;background:#2a141e;color:#ff8aa0;border-radius:11px;padding:10px 13px;font-size:16px;font-weight:900;white-space:nowrap}\n.item{width:100%;background:#081326;border:1px solid #1f3352;border-radius:18px;padding:19px;margin:12px 0}.name{font-weight:950;font-size:20px}.small{color:#8898af;font-size:15px;line-height:1.55;margin-top:6px}.muted{color:#7e8ca2;font-size:16px;padding:12px 1px}.num{font-size:34px;font-weight:950}\n.pill{display:inline-flex;align-items:center;border:1px solid #2b89b8;color:#69d4ff;background:#102739;padding:7px 11px;border-radius:999px;font-size:14px;font-weight:850;margin:2px}\n.pill.gold{border-color:#836a21;color:#ffd263;background:#292414}.pill.pink{border-color:#79324f;color:#ff90b1;background:#2a1822}.pill.gray{border-color:#45556d;color:#d6dfec;background:#192231}\n.chips{display:flex;flex-wrap:wrap;gap:9px}.chip{border:1px solid #345170;border-radius:999px;padding:11px 14px;background:#14243a;color:#dce7f6;font-size:16px;font-weight:850}.chip.on{border-color:#19b9ec;background:#10374e;color:#70dcff;box-shadow:0 0 0 1px rgba(25,185,236,.12)}\n.statsBox{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px}.statsBox>div{background:#081326;border:1px solid #1f3352;border-radius:15px;padding:16px;text-align:center}\n.bossItem{background:#081326;border:1px solid #223958;border-radius:17px;padding:15px;margin:11px 0}.bossTop{display:flex;justify-content:space-between;gap:12px;align-items:flex-start}.bossMain{min-width:0;flex:1}.bossTitle{font-size:22px;font-weight:950;display:flex;align-items:center;gap:7px;flex-wrap:wrap}.bossActions{display:flex;gap:7px;align-items:center}.alertLine{margin-top:8px;color:#9aa7b9;font-size:15px}.statusLine{margin-top:7px;color:#9aa7b9;font-size:15px;line-height:1.5}.bossCut{margin-top:12px}.engineOk{display:inline-flex;align-items:center;gap:7px;color:#65ddb1;background:#0e2a24;border:1px solid #1a6b55;padding:9px 12px;border-radius:11px;font-size:14px;font-weight:850}\n#toast{display:none;position:fixed;left:50%;bottom:34px;transform:translateX(-50%);background:#f8fbff;color:#07111e;padding:18px 22px;border-radius:17px;font-size:18px;line-height:1.35;font-weight:950;z-index:1000;width:max-content;max-width:calc(100% - 34px);text-align:center;box-shadow:0 18px 48px rgba(0,0,0,.5),0 0 0 1px rgba(255,255,255,.15);animation:toastIn .16s ease-out}\n#toast.error{background:#ffe9ee;color:#751326;border:1px solid #ff6685}#toast.success{background:#eafff7;color:#07583e;border:1px solid #37d39b}@keyframes toastIn{from{opacity:0;transform:translate(-50%,12px) scale(.96)}to{opacity:1;transform:translate(-50%,0) scale(1)}}\n.hidden{display:none!important}\n@media (min-width:760px){main{padding-left:28px;padding-right:28px}.card{min-height:205px}.grid{gap:18px}.panel{padding:24px}.brandTitle{font-size:23px}}\n@media (max-width:1200px){\n  .app{min-height:100svh;padding-bottom:0}\n  .topbar{min-height:96px;padding:20px 22px}\n  .brandBadge{font-size:32px;padding:13px 19px;border-radius:11px}\n  .brandTitle{font-size:46px}\n  .brandSub{display:none}\n  .versionTag{font-size:14px}\n  .back{font-size:26px;padding:14px 18px}\n  main{padding:18px 20px 14px}\n  #home{height:calc(100svh - 128px);min-height:0}\n  .grid{height:100%;grid-template-rows:repeat(4,minmax(0,1fr));gap:14px 16px}\n\n  /* 카드 크기는 유지하고 실제 내용만 한 단계 더 확대 */\n  .card{min-height:0;height:100%;border-radius:23px;padding:6px 5px}\n  .iconBox{width:132px;height:132px;font-size:68px;border-radius:28px;margin-bottom:19px}\n  .card h3{font-size:48px;margin-bottom:11px}\n  .card p{font-size:30px;line-height:1.38}\n\n  /* 내부 UI 전체 확대 */\n  .panel{padding:42px;border-radius:25px;margin-bottom:23px}\n  .panelHead{margin-bottom:30px}\n  .panel h2{font-size:52px}\n  .notice{font-size:30px;padding:24px 25px;border-radius:17px;line-height:1.55}\n  .formGrid{grid-template-columns:1fr}\n  input,select,textarea{font-size:37px;padding:28px 23px;border-radius:17px}\n  textarea{min-height:220px}\n  label{font-size:30px;margin:20px 0 12px}\n  .btn{font-size:37px;padding:28px 23px;border-radius:17px;margin-top:15px}\n  .item{padding:34px;border-radius:20px;margin:16px 0}\n  .name{font-size:38px}\n  .small{font-size:27px;line-height:1.55}\n  .muted{font-size:27px}\n  .pill{font-size:25px;padding:11px 15px}\n  .chip{font-size:28px;padding:15px 18px}\n  .statsBox>div{padding:32px}\n  .num{font-size:52px}\n  .bossItem{padding:32px;border-radius:20px}\n  .bossTitle{font-size:40px}\n  .statusLine,.alertLine{font-size:27px;line-height:1.5}\n  .mini{font-size:26px;padding:13px 16px}\n  .engineOk{font-size:24px}\n  #toast{bottom:42px;padding:25px 29px;border-radius:20px;font-size:30px;min-width:min(78vw,560px);max-width:calc(100% - 40px)}\n}\n\n\n/* V5 alliance-first overrides */\n.topAction{margin-left:0;border:1px solid #365170;background:#0c172a;color:#d9efff;padding:10px 13px;border-radius:12px;font-weight:900;white-space:nowrap}.authAction{margin-left:auto;border:1px solid #365170;background:#0c172a;color:#d9efff;padding:10px 13px;border-radius:12px;font-weight:900;white-space:nowrap}.permissionNote{margin-top:10px;color:#8fa7c5;font-size:13px;font-weight:700}\n.versionTag{margin-left:8px}.back{margin-left:8px}\n#allianceHome .grid,#guildHome .grid{grid-auto-rows:minmax(150px,1fr)}\n.sectionTitle{font-size:15px;color:#8fa0b8;font-weight:850;margin:4px 2px 12px;letter-spacing:.2px}\n.adminList .item{display:flex;align-items:center;justify-content:space-between;gap:10px}\n.adminInfo{min-width:0;flex:1}.adminActions{display:flex;gap:7px;flex-wrap:wrap;justify-content:flex-end}\n.btn.smallBtn{font-size:14px;padding:10px 12px;margin:0;width:auto;display:inline-flex}\n.previewBox{background:#081326;border:1px solid #1f3352;border-radius:15px;padding:16px;margin-top:12px;text-align:center;font-size:22px;font-weight:950}\n.linkCard{cursor:pointer}.guildTag{font-size:14px;color:#77d9ff;margin-top:5px;font-weight:850}\n.itemRow{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}.itemRowMain{min-width:0;flex:1}\n.money{font-weight:950;color:#ffd263}.statusOk{color:#66ddb2}.statusHold{color:#8ed9ff}\n.twoBtns{display:grid;grid-template-columns:1fr 1fr;gap:10px}.threeBtns{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}\n\n/* Home dashboard cards: reference UI와 다른 좌측 정렬형 관리 대시보드 */\n#allianceHome .card,#guildHome .card{\n  position:relative;overflow:hidden;align-items:stretch;justify-content:flex-start;text-align:left;\n  background:linear-gradient(155deg,rgba(18,34,58,.98),rgba(9,20,37,.98));\n  border:1px solid rgba(73,108,151,.42);border-radius:18px;padding:17px 17px 15px;\n  box-shadow:0 8px 24px rgba(0,0,0,.14);\n}\n#allianceHome .card:before,#guildHome .card:before{\n  content:\"\";position:absolute;left:0;top:0;bottom:0;width:4px;background:linear-gradient(180deg,#725cff,#20bce9);opacity:.85\n}\n.homeCardTop{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:auto}\n.homeIcon{width:42px;height:42px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:23px;background:#0b2039;border:1px solid rgba(104,173,220,.24);box-shadow:none}\n.homeTag{font-size:11px;font-weight:900;letter-spacing:.6px;color:#90a6c3;border:1px solid #314862;background:#0b1728;border-radius:999px;padding:5px 8px}\n.homeBody{margin-top:15px;min-width:0}\n#allianceHome .card h3,#guildHome .card h3{margin:0 0 5px;font-size:21px;line-height:1.15;font-weight:950;letter-spacing:-.4px;text-align:left}\n#allianceHome .card p,#guildHome .card p{margin:0;color:#8394ad;font-size:13px;line-height:1.35;font-weight:700;text-align:left}\n.homeFoot{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:11px;padding-top:10px;border-top:1px solid rgba(93,121,153,.18)}\n.homeMeta{min-width:0;color:#6fd3f7;font-size:11px;font-weight:850;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.homeArrow{flex:0 0 auto;color:#b7c6d9;font-size:18px;font-weight:900}\n\n@media (max-width:1200px){\n  .topAction,.authAction{font-size:24px;padding:13px 16px}\n\n  /* 연합 홈과 길드 홈의 카드 크기/배치를 완전히 동일하게 사용 */\n  #allianceHome,#guildHome{height:calc(100svh - 128px);min-height:0;overflow:hidden}\n  #allianceHome .grid,#guildHome .grid{height:calc(100% - 48px);grid-template-rows:repeat(4,minmax(0,1fr));grid-auto-rows:unset;gap:14px 16px}\n\n  #allianceHome .card,#guildHome .card{min-height:0;height:100%;border-radius:20px;padding:20px 19px 17px}\n  .homeIcon{width:78px;height:78px;border-radius:20px;font-size:43px}\n  .homeTag{font-size:20px;padding:8px 12px}\n  .homeBody{margin-top:16px}\n  #allianceHome .card h3,#guildHome .card h3{font-size:37px;margin-bottom:7px}\n  #allianceHome .card p,#guildHome .card p{font-size:24px;line-height:1.3}\n  .homeFoot{margin-top:13px;padding-top:11px}\n  .homeMeta{font-size:20px}.homeArrow{font-size:31px}\n\n  .btn.smallBtn{font-size:25px;padding:14px 16px}\n  .previewBox{font-size:31px;padding:24px}\n  .guildTag{font-size:25px}.sectionTitle{font-size:26px}\n}\n\n\n/* ===== V6.0.3 MOBILE-FIRST UI FIX =====\n   기존 V5 이식본의 max-width:1200px 확대 규칙을 마지막에서 정상 크기로 덮어쓴다.\n*/\n@media (max-width:1199px){\n  .app{min-height:100svh;padding-bottom:32px}\n  .topbar{\n    min-height:auto;\n    padding:12px 12px;\n    gap:8px;\n    flex-wrap:nowrap;\n  }\n  .brandBadge{\n    font-size:14px;\n    padding:9px 11px;\n    border-radius:9px;\n  }\n  .brandText{min-width:0;flex:1 1 auto}\n  .brandTitle{\n    font-size:18px;\n    line-height:1.15;\n  }\n  .brandSub{display:none}\n  .authAction,.topAction{\n    flex:0 0 auto;\n    font-size:13px;\n    padding:9px 10px;\n    border-radius:10px;\n  }\n  .authAction{margin-left:auto}\n  .topAction{margin-left:0}\n  .versionTag{\n    flex:0 0 auto;\n    margin-left:0;\n    font-size:10px;\n  }\n  .back{\n    flex:0 0 auto;\n    margin-left:0;\n    font-size:13px;\n    padding:9px 10px;\n    border-radius:10px;\n  }\n\n  main{padding:14px 12px 24px}\n\n  #home,#allianceHome,#guildHome{\n    height:auto;\n    min-height:0;\n    overflow:visible;\n  }\n  .grid,\n  #allianceHome .grid,\n  #guildHome .grid{\n    height:auto;\n    grid-template-columns:repeat(2,minmax(0,1fr));\n    grid-template-rows:none;\n    grid-auto-rows:auto;\n    gap:10px;\n  }\n\n  .card{\n    min-height:145px;\n    height:auto;\n    border-radius:18px;\n    padding:14px 12px;\n  }\n  .iconBox{\n    width:58px;\n    height:58px;\n    font-size:31px;\n    border-radius:16px;\n    margin-bottom:11px;\n  }\n  .card h3{font-size:18px;margin-bottom:6px}\n  .card p{font-size:12px;line-height:1.35}\n\n  #allianceHome .card,#guildHome .card{\n    min-height:145px;\n    height:auto;\n    border-radius:17px;\n    padding:14px 13px 12px;\n  }\n  .homeCardTop{margin-bottom:0}\n  .homeIcon{\n    width:44px;\n    height:44px;\n    border-radius:13px;\n    font-size:25px;\n  }\n  .homeTag{\n    font-size:10px;\n    padding:5px 7px;\n  }\n  .homeBody{margin-top:13px}\n  #allianceHome .card h3,#guildHome .card h3{\n    font-size:19px;\n    margin-bottom:5px;\n  }\n  #allianceHome .card p,#guildHome .card p{\n    font-size:12px;\n    line-height:1.35;\n  }\n  .homeFoot{\n    margin-top:10px;\n    padding-top:9px;\n  }\n  .homeMeta{font-size:9.5px}\n  .homeArrow{font-size:17px}\n  .sectionTitle{font-size:14px;margin:3px 2px 10px}\n\n  .panel{\n    padding:16px;\n    border-radius:18px;\n    margin-bottom:13px;\n  }\n  .panelHead{margin-bottom:14px}\n  .panel h2{font-size:21px}\n  .notice{\n    font-size:13px;\n    padding:12px 13px;\n    border-radius:12px;\n    line-height:1.5;\n  }\n  .formGrid{grid-template-columns:1fr;gap:9px}\n  label{font-size:14px;margin:11px 0 6px}\n  input,select,textarea{\n    font-size:16px;\n    padding:14px 13px;\n    border-radius:12px;\n  }\n  textarea{min-height:120px}\n  .btn{\n    font-size:16px;\n    padding:14px 13px;\n    border-radius:12px;\n    margin-top:10px;\n  }\n  .btn.smallBtn{\n    font-size:13px;\n    padding:9px 10px;\n  }\n  .mini{\n    font-size:13px;\n    padding:9px 10px;\n    border-radius:9px;\n  }\n\n  .item{\n    padding:15px;\n    border-radius:15px;\n    margin:10px 0;\n  }\n  .name{font-size:18px}\n  .small{font-size:13px;line-height:1.5}\n  .muted{font-size:14px}\n  .num{font-size:30px}\n  .pill{font-size:12px;padding:6px 9px}\n  .chip{font-size:13px;padding:9px 11px}\n  .statsBox{grid-template-columns:1fr 1fr;gap:8px}\n  .statsBox>div{padding:14px}\n\n  .bossItem{\n    padding:14px;\n    border-radius:14px;\n    margin:9px 0;\n  }\n  .bossTitle{font-size:19px}\n  .statusLine,.alertLine{font-size:13px;line-height:1.45}\n  .engineOk{font-size:12px;padding:8px 10px}\n\n  .previewBox{font-size:20px;padding:15px}\n  .guildTag{font-size:13px}\n  .permissionNote{font-size:12px}\n\n  #toast{\n    bottom:24px;\n    min-width:0;\n    width:max-content;\n    max-width:calc(100% - 28px);\n    padding:14px 17px;\n    border-radius:14px;\n    font-size:15px;\n  }\n}\n\n@media (max-width:520px){\n  .topbar{padding-left:10px;padding-right:10px}\n  .brandBadge{font-size:13px;padding:8px 9px}\n  .brandTitle{font-size:17px}\n  .authAction,.topAction,.back{font-size:12px;padding:8px 9px}\n  .versionTag{display:none}\n  main{padding-left:10px;padding-right:10px}\n\n  .grid,\n  #allianceHome .grid,\n  #guildHome .grid{gap:9px}\n\n  #allianceHome .card,#guildHome .card{min-height:138px;padding:13px 11px 11px}\n  .homeIcon{width:41px;height:41px;font-size:23px}\n  #allianceHome .card h3,#guildHome .card h3{font-size:18px}\n  #allianceHome .card p,#guildHome .card p{font-size:11.5px}\n\n  .adminList .item{flex-direction:column;align-items:stretch}\n  .adminActions{width:100%;justify-content:flex-start}\n  .twoBtns,.threeBtns{gap:7px}\n}\n\n@media (max-width:370px){\n  .brandTitle{font-size:15px}\n  .authAction,.topAction,.back{padding:7px 8px}\n  #allianceHome .card,#guildHome .card{min-height:132px}\n  .homeTag{display:none}\n}\n\n\n/* ===== V6.0.3 ATTENDANCE CHECK ===== */\n.attEvent{background:#081326;border:1px solid #223958;border-radius:15px;padding:14px;margin:9px 0;cursor:pointer}\n.attEvent:active{filter:brightness(1.15)}\n.attEventTop{display:flex;align-items:center;justify-content:space-between;gap:10px}\n.attEventName{font-size:18px;font-weight:950}\n.attEventMeta{font-size:12px;color:#8fa0b7;margin-top:5px;line-height:1.45}\n.attGuildGroup{margin:14px 0 18px}\n.attGuildTitle{font-size:16px;font-weight:950;color:#dcecff;margin:0 0 8px;padding-bottom:7px;border-bottom:1px solid #20344f}\n.attMember{display:flex;align-items:center;gap:11px;background:#081326;border:1px solid #1f3352;border-radius:13px;padding:11px 12px;margin:7px 0}\n.attMember input[type=checkbox]{width:22px;height:22px;flex:0 0 22px;margin:0;accent-color:#20b8eb}\n.attMemberMain{min-width:0;flex:1}\n.attMemberName{font-size:15px;font-weight:900;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.attMemberMeta{font-size:11px;color:#8393aa;margin-top:3px}\n.attSource{font-size:10px;padding:4px 7px;border:1px solid #365170;border-radius:999px;color:#a9dfff;background:#10243a;white-space:nowrap}\n.attToolbar{display:flex;gap:8px;align-items:center;flex-wrap:wrap}\n.attToolbar .btn{margin-top:0;flex:1 1 140px}\n@media(max-width:520px){.attEventName{font-size:16px}.attMember{padding:10px}.attMemberName{font-size:14px}}\n\n\n/* ===== V6.0.6 MEMBER LIST + LOOT ACTIONS ===== */\n.memberCard{background:#081326;border:1px solid #1f3352;border-radius:15px;padding:14px;margin:9px 0}\n.memberTop{display:flex;align-items:flex-start;justify-content:space-between;gap:10px}\n.memberIdentity{min-width:0;flex:1}\n.memberNickname{font-size:18px;font-weight:950;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.memberBadges{display:flex;flex-wrap:wrap;gap:6px;margin-top:7px}\n.memberLogin{flex:0 0 auto;border:1px solid #2d4564;background:#101d31;color:#9fb1c9;border-radius:999px;padding:6px 8px;font-size:11px;font-weight:850;white-space:nowrap}\n.memberLogin.ok{border-color:#1d6a55;background:#0d2922;color:#70dfb6}\n.memberActions{display:flex;gap:7px;margin-top:12px}\n.memberActions .mini{flex:1 1 0;min-width:0;width:auto;padding:10px 5px;font-size:12px;white-space:nowrap}\n.lootActions{display:flex;flex-wrap:wrap;gap:7px;justify-content:flex-end;flex:0 0 auto}\n.mini.danger{border-color:#8e3148;background:#32131d;color:#ff8da3}\n@media(max-width:520px){\n  .memberTop{display:block}\n  .memberLogin{display:inline-flex;margin-top:8px}\n  .memberActions{width:100%}\n  .memberActions .mini{font-size:12px;padding:10px 4px}\n  #guildLootHistory .itemRow{display:block}\n  .lootActions{margin-top:10px;width:100%;justify-content:flex-start}\n  .lootActions .mini{flex:1 1 120px}\n}\n</style>\n</head>\n<body>\n<div class=\"app\">\n  <header class=\"topbar\">\n    <span id=\"gameBadge\" class=\"brandBadge\">ECLIPSE</span>\n    <div class=\"brandText\">\n      <div id=\"appTitle\" class=\"brandTitle\">GuildCore</div>\n      <div id=\"appSub\" class=\"brandSub\">연합 운영 시스템</div>\n    </div>\n    <button id=\"authBtn\" class=\"authAction\" type=\"button\">🔐 로그인</button>\n    <button id=\"adminBtn\" class=\"topAction\" type=\"button\" style=\"display:none\">⚙ 관리</button>\n    <span class=\"versionTag\">V6.0.8</span>\n    <button id=\"back\" class=\"back\" onclick=\"goBack()\">← 뒤로</button>\n  </header>\n\n  <main>\n    <section id=\"allianceHome\" class=\"screen active\">\n      <div class=\"sectionTitle\">연합 공용</div>\n      <div id=\"allianceGrid\" class=\"grid\">\n        <div class=\"card\" data-home-open=\"allianceNotice\"><div class=\"homeCardTop\"><div class=\"homeIcon\">📣</div><span class=\"homeTag\">연합</span></div><div class=\"homeBody\"><h3>연합공지</h3><p>연합 전체 공지와 전달사항</p></div><div class=\"homeFoot\"><span class=\"homeMeta\">ALLIANCE NOTICE</span><span class=\"homeArrow\">→</span></div></div>\n        <div class=\"card\" data-home-open=\"bossTime\"><div class=\"homeCardTop\"><div class=\"homeIcon\">⏳</div><span class=\"homeTag\">보스</span></div><div class=\"homeBody\"><h3>보스타임</h3><p>연합 공용 젠 현황과 컷 관리</p></div><div class=\"homeFoot\"><span class=\"homeMeta\">BOSS SCHEDULE</span><span class=\"homeArrow\">→</span></div></div>\n        <div class=\"card\" onclick=\"openAttendanceCheck('alliance')\"><div class=\"homeCardTop\"><div class=\"homeIcon\">✅</div><span class=\"homeTag\">출석</span></div><div class=\"homeBody\"><h3>참여자 체크</h3><p>보스 회차별 연합 참여 명단 관리</p></div><div class=\"homeFoot\"><span class=\"homeMeta\">ATTENDANCE CHECK</span><span class=\"homeArrow\">→</span></div></div>\n        <div class=\"card\"><div class=\"homeCardTop\"><div class=\"homeIcon\">🏰</div><span class=\"homeTag\">길드</span></div><div class=\"homeBody\"><h3>길드 불러오는 중</h3><p>최근 길드 정보를 확인하고 있습니다</p></div><div class=\"homeFoot\"><span class=\"homeMeta\">LOADING</span><span class=\"homeArrow\">…</span></div></div>\n      </div>\n    </section>\n\n    <section id=\"login\" class=\"screen\">\n      <div class=\"panel\">\n        <div class=\"panelHead\"><h2>🔐 GuildCore 로그인</h2><span id=\"loginRoleBadge\" class=\"pill gray\">게스트</span></div>\n        <div id=\"loginStatus\" class=\"notice\">Discord의 /웹핀 또는 카카오톡의 !웹핀으로 10분짜리 1회용 PIN을 직접 발급할 수 있습니다.</div>\n\n        <div id=\"loginFormFields\">\n        <label>로그인 유형</label>\n        <select id=\"loginMode\" onchange=\"loginModeChanged()\">\n          <option value=\"selfpin\">셀프 PIN (Discord / Kakao)</option>\n          <option value=\"alliance_leader\">연합장 최초 등록</option>\n          <option value=\"member\">복구 PIN (관리자 발급)</option>\n          <option value=\"superadmin\">최고관리자</option>\n        </select>\n\n        <div id=\"selfPinHelp\" class=\"notice\">먼저 Discord에서 <b>/웹핀</b> 또는 카카오톡에서 <b>!웹핀</b>을 실행한 뒤 받은 6자리 PIN을 입력하세요. PIN은 10분·1회용입니다.</div>\n\n        <div id=\"memberLoginFields\" class=\"hidden\">\n          <label>길드</label><select id=\"loginGuild\"></select>\n          <label>게임 닉네임</label><input id=\"loginNickname\" placeholder=\"등록된 게임 닉네임\">\n        </div>\n\n        <div id=\"leaderLoginFields\" class=\"hidden\">\n          <div class=\"notice\">최고관리자가 발급한 연합장 최초 PIN을 사용합니다. Discord/Kakao 자기등록을 먼저 완료해야 합니다.</div>\n          <label>길드명</label><input id=\"loginLeaderGuild\" placeholder=\"등록한 길드명\">\n          <label>게임 닉네임</label><input id=\"loginLeaderNickname\" placeholder=\"등록한 게임 닉네임\">\n        </div>\n\n        <label id=\"loginPinLabel\">셀프 PIN</label><input id=\"loginPin\" type=\"password\" inputmode=\"numeric\" maxlength=\"6\" placeholder=\"6자리 PIN\">\n        <button id=\"loginSubmitBtn\" class=\"btn\" onclick=\"doLogin(this)\">로그인</button>\n        </div>\n        <button id=\"logoutBtn\" class=\"btn ghost hidden\" onclick=\"doLogout(this)\">로그아웃</button>\n        <div id=\"loginPermissionNotes\">\n          <div class=\"permissionNote\">PIN은 본인 확인 수단입니다. 실제 권한은 D1의 길드 직책(role)과 연합 직책(alliance_role)을 그대로 적용합니다.</div>\n          <div class=\"permissionNote\">로그인 상태는 이 기기에서 30일 동안 유지됩니다. 로그아웃하면 즉시 해제됩니다.</div>\n        </div>\n      </div>\n    </section>\n\n    <section id=\"allianceNotice\" class=\"screen\">\n      <div class=\"panel\"><div class=\"panelHead\"><h2>📣 연합 공지</h2></div><div id=\"allianceNoticeList\"></div></div>\n      <div class=\"panel\" id=\"allianceNoticeEditPanel\"><div class=\"panelHead\"><h2>연합 공지 등록</h2></div>\n        <input id=\"aNoticeTitle\" placeholder=\"공지 제목\">\n        <label>공지 내용</label><textarea id=\"aNoticeContent\" placeholder=\"내용을 입력하세요\"></textarea>\n        <label><input id=\"aNoticePinned\" type=\"checkbox\" style=\"width:auto;margin-right:7px\">상단 고정</label>\n        <button class=\"btn\" onclick=\"saveAllianceNoticeUI(this)\">공지 등록</button>\n      </div>\n    </section>\n\n    <section id=\"bossTime\" class=\"screen\">\n      <div class=\"panel\">\n        <div class=\"panelHead\"><h2>⏰ 연합 보스타임</h2><span class=\"engineOk\">● 연합 공용</span></div>\n        <div class=\"notice\">컷 등록 시 다음 젠을 계산하고 출석 이벤트를 엽니다. 젠 시각 입력은 출석을 열지 않습니다.</div>\n        <div id=\"allianceBossList\"></div>\n      </div>\n\n      <div class=\"panel\" id=\"bossAddPanel\">\n        <div class=\"panelHead\"><h2>⏳ 보스 추가</h2></div>\n        <div class=\"formGrid\">\n          <input id=\"adminBossName\" placeholder=\"보스명\">\n          <select id=\"adminBossScope\" onchange=\"adminBossScopeChanged()\"><option value=\"WORLD\">월드/전서버</option><option value=\"SERVER\">서버 전용</option></select>\n          <select id=\"adminBossServer\" class=\"hidden\"></select>\n          <select id=\"adminBossType\" onchange=\"adminBossTypeChanged()\"><option value=\"cooldown\">쿨타임</option><option value=\"fixed\">매일 고정</option><option value=\"weekly\">요일 고정</option></select>\n          <div id=\"adminBossCooldown\"><input id=\"adminBossTime\" type=\"number\" step=\"0.5\" placeholder=\"쿨타임(시간) 예: 5\"></div>\n          <div id=\"adminBossFixed\" class=\"hidden\"><input id=\"adminBossFixedTime\" placeholder=\"매일 고정 젠 예: 06:00,18:00\"></div>\n          <div id=\"adminBossWeekly\" class=\"hidden\">\n            <select id=\"adminBossWeeklyDay\">\n              <option value=\"MON\">월요일</option><option value=\"TUE\">화요일</option><option value=\"WED\">수요일</option>\n              <option value=\"THU\">목요일</option><option value=\"FRI\">금요일</option><option value=\"SAT\">토요일</option><option value=\"SUN\">일요일</option>\n            </select>\n            <input id=\"adminBossWeeklyTime\" type=\"time\" value=\"00:00\">\n          </div>\n          <div class=\"full\"><label><input id=\"adminBossAttendance\" type=\"checkbox\" checked style=\"width:auto;margin-right:7px\">컷 시 출석 사용</label></div>\n        </div>\n        <button class=\"btn\" onclick=\"createBossUI(this)\">보스 등록</button>\n      </div>\n    </section>\n\n    <section id=\"admin\" class=\"screen\">\n      <div class=\"panel\" id=\"adminAlliancePanel\">\n        <div class=\"panelHead\"><h2>⚙ 연합 관리</h2></div>\n        <button id=\"renameAllianceBtn\" class=\"btn ghost smallBtn\" onclick=\"changeAllianceNameUI(this)\">✏ 현재 연합명 변경</button>\n        <label>새 연합명</label><input id=\"newAllianceName\" placeholder=\"예: 이클립스 ○○ 연합\">\n        <label>서버명 (선택)</label><input id=\"newAllianceServer\" placeholder=\"예: 서버 1\">\n        <button class=\"btn\" onclick=\"createAllianceUI(this)\">+ 연합 추가</button>\n        <div id=\"adminAllianceList\" class=\"adminList\"></div>\n      </div>\n\n      <div class=\"panel\" id=\"adminGuildPanel\">\n        <div class=\"panelHead\"><h2>🏰 길드 추가</h2></div>\n        <label>소속 연합</label><select id=\"newGuildAlliance\"></select>\n        <label>길드명</label><input id=\"newGuildName\" placeholder=\"예: 길드명\">\n        <label>서버명</label><input id=\"newGuildServer\" placeholder=\"예: 1서버\">\n        <label>Discord 표시명</label><input id=\"newGuildTag\" placeholder=\"예: 길드\" oninput=\"updateDisplayPreview()\">\n        <label>Discord 역할명</label><input id=\"newGuildRole\" placeholder=\"예: 길드명\">\n        <label>닉네임 표시방식</label>\n        <select id=\"newGuildFormat\" onchange=\"updateDisplayPreview()\">\n          <option value=\"[TAG] NICKNAME\">[표시명] 닉네임</option>\n          <option value=\"TAG | NICKNAME\">표시명 | 닉네임</option>\n          <option value=\"TAG-NICKNAME\">표시명-닉네임</option>\n          <option value=\"NICKNAME\">닉네임만</option>\n        </select>\n        <div id=\"displayPreview\" class=\"previewBox\">[표시명] 닉네임</div>\n        <button class=\"btn\" onclick=\"createGuildUI(this)\">+ 길드 추가</button>\n        <div id=\"adminGuildList\" class=\"adminList\"></div>\n      </div>\n\n    </section>\n\n    <section id=\"guildHome\" class=\"screen\">\n      <div class=\"sectionTitle\" id=\"guildHomeSub\">길드 전용</div>\n      <div class=\"grid\">\n        <div class=\"card\" onclick=\"openGuildScreen('guildNotice')\"><div class=\"homeCardTop\"><div class=\"homeIcon\">📣</div><span class=\"homeTag\">공지</span></div><div class=\"homeBody\"><h3>공지사항</h3><p>길드 전용 공지와 전달사항</p></div><div class=\"homeFoot\"><span class=\"homeMeta\">COMMUNICATION</span><span class=\"homeArrow\">→</span></div></div>\n        <div class=\"card\" onclick=\"openGuildScreen('guildMembers')\"><div class=\"homeCardTop\"><div class=\"homeIcon\">👥</div><span class=\"homeTag\">인원</span></div><div class=\"homeBody\"><h3>길드원</h3><p>명단과 직급을 관리</p></div><div class=\"homeFoot\"><span class=\"homeMeta\">MEMBERS</span><span class=\"homeArrow\">→</span></div></div>\n        <div id=\"guildLootAddCard\" class=\"card\" onclick=\"openGuildScreen('guildLootAdd')\"><div class=\"homeCardTop\"><div class=\"homeIcon\">📦</div><span class=\"homeTag\">아이템</span></div><div class=\"homeBody\"><h3>아이템등록</h3><p>획득 아이템을 직접 입력</p></div><div class=\"homeFoot\"><span class=\"homeMeta\">LOOT</span><span class=\"homeArrow\">→</span></div></div>\n        <div class=\"card\" onclick=\"openGuildScreen('guildLootList')\"><div class=\"homeCardTop\"><div class=\"homeIcon\">🧾</div><span class=\"homeTag\">기록</span></div><div class=\"homeBody\"><h3>아이템내역</h3><p>보유와 판매 기록 확인</p></div><div class=\"homeFoot\"><span class=\"homeMeta\">HISTORY</span><span class=\"homeArrow\">→</span></div></div>\n        <div class=\"card\" onclick=\"openGuildScreen('guildStats')\"><div class=\"homeCardTop\"><div class=\"homeIcon\">📜</div><span class=\"homeTag\">통계</span></div><div class=\"homeBody\"><h3>참여통계</h3><p>기간별 참여 횟수와 참여율 자동 계산</p></div><div class=\"homeFoot\"><span class=\"homeMeta\">ATTENDANCE STATS</span><span class=\"homeArrow\">→</span></div></div>\n        <div class=\"card\" onclick=\"openAttendanceCheck('guild')\"><div class=\"homeCardTop\"><div class=\"homeIcon\">✅</div><span class=\"homeTag\">출석</span></div><div class=\"homeBody\"><h3>참여자 체크</h3><p>보스 회차별 참여자 추가·삭제</p></div><div class=\"homeFoot\"><span class=\"homeMeta\">ATTENDANCE CHECK</span><span class=\"homeArrow\">→</span></div></div>\n        <div class=\"card\" onclick=\"openGuildScreen('guildSettle')\"><div class=\"homeCardTop\"><div class=\"homeIcon\">💰</div><span class=\"homeTag\">정산</span></div><div class=\"homeBody\"><h3>정산내역</h3><p>판매와 참여 기록 집계</p></div><div class=\"homeFoot\"><span class=\"homeMeta\">SETTLEMENT</span><span class=\"homeArrow\">→</span></div></div>\n        <div class=\"card\" onclick=\"openGuildScreen('guildFund')\"><div class=\"homeCardTop\"><div class=\"homeIcon\">🏦</div><span class=\"homeTag\">자금</span></div><div class=\"homeBody\"><h3>길드비용현황</h3><p>금고 자금과 입출금 관리</p></div><div class=\"homeFoot\"><span class=\"homeMeta\">FUND</span><span class=\"homeArrow\">→</span></div></div>\n      </div>\n    </section>\n\n    <section id=\"guildNotice\" class=\"screen\">\n      <div class=\"panel\"><div class=\"panelHead\"><h2>📣 길드 공지</h2></div><div id=\"guildNoticeList\"></div></div>\n      <div class=\"panel\" id=\"guildNoticeEditPanel\"><div class=\"panelHead\"><h2>공지 등록</h2></div>\n        <input id=\"gNoticeTitle\" placeholder=\"공지 제목\"><label>공지 내용</label>\n        <textarea id=\"gNoticeContent\" placeholder=\"내용을 입력하세요\"></textarea>\n        <label><input id=\"gNoticePinned\" type=\"checkbox\" style=\"width:auto;margin-right:7px\">상단 고정</label>\n        <button class=\"btn\" onclick=\"saveGuildNoticeUI(this)\">공지 등록</button>\n      </div>\n    </section>\n\n    <section id=\"guildMembers\" class=\"screen\">\n      <div class=\"panel\" id=\"guildMemberEditPanel\"><div class=\"panelHead\"><h2>👥 길드원</h2><span id=\"guildMemberCount\" class=\"pill\">0명</span></div>\n        <div class=\"notice\">Discord 입장 등록이 연결되면 길드원은 자동 반영됩니다. 수동 등록도 사용할 수 있습니다.</div>\n        <div class=\"formGrid\"><input id=\"guildMemberNick\" placeholder=\"캐릭터 닉네임\"><select id=\"guildMemberRole\"><option>길드원</option><option>운영진</option><option>부길드장</option><option>길드장</option></select></div>\n        <button class=\"btn\" onclick=\"saveGuildMemberUI(this)\">길드원 등록</button>\n      </div>\n      <div class=\"panel\"><div id=\"guildMemberList\"></div></div>\n    </section>\n\n    <section id=\"guildLootAdd\" class=\"screen\">\n      <div class=\"panel\" id=\"guildLootEditPanel\"><div class=\"panelHead\"><h2>📦 아이템 등록</h2></div>\n        <label>아이템명</label><input id=\"lootName\" placeholder=\"아이템명\">\n        <div class=\"formGrid\">\n          <div><label>수량</label><input id=\"lootQty\" type=\"number\" min=\"1\" value=\"1\"></div>\n          <div><label>상태</label><select id=\"lootStatus\" onchange=\"lootStatusChanged()\"><option value=\"보유\">보유</option><option value=\"판매완료\">판매완료</option><option value=\"지급완료\">지급완료</option></select></div>\n          <div id=\"lootSaleWrap\" class=\"full hidden\"><label>판매금액</label><input id=\"lootSale\" type=\"number\" placeholder=\"판매금액\"></div>\n          <div class=\"full\"><label>메모 (선택)</label><input id=\"lootNote\" placeholder=\"선택 메모\"></div>\n        </div>\n        <button class=\"btn\" onclick=\"saveLootUI(this)\">아이템 저장</button>\n      </div>\n    </section>\n\n    <section id=\"guildLootList\" class=\"screen\">\n      <div class=\"panel\"><div class=\"panelHead\"><h2>🧾 아이템 내역</h2></div><div id=\"guildLootHistory\"></div></div>\n    </section>\n\n    <section id=\"guildStats\" class=\"screen\">\n      <div class=\"panel\"><div class=\"panelHead\"><h2>📜 참여통계</h2></div>\n        <div class=\"notice\">선택 기간의 보스 회차와 참여 명단을 기준으로 자동 계산합니다. 과거 참여자 체크를 수정하면 통계도 즉시 바뀝니다.</div>\n        <div class=\"formGrid\"><input id=\"statsStart\" type=\"date\"><input id=\"statsEnd\" type=\"date\"></div>\n        <button class=\"btn ghost\" onclick=\"loadGuildStats(this)\">기간 필터 적용</button><div id=\"guildStatsResult\"></div>\n      </div>\n    </section>\n\n\n    <section id=\"attendanceCheck\" class=\"screen\">\n      <div class=\"panel\">\n        <div class=\"panelHead\"><h2 id=\"attendanceCheckTitle\">✅ 참여자 체크</h2><span id=\"attendanceScopeBadge\" class=\"pill\">길드</span></div>\n        <div class=\"notice\">카톡·Discord·웹 참여는 같은 명단에 반영됩니다. 출석이 종료된 과거 보스도 다시 열어 운영진이 참여자를 추가·삭제할 수 있습니다.</div>\n        <div class=\"formGrid\"><input id=\"attendanceStart\" type=\"date\"><input id=\"attendanceEnd\" type=\"date\"></div>\n        <button class=\"btn ghost\" onclick=\"loadAttendanceEvents(this)\">보스탐 조회</button>\n        <div id=\"attendanceEventList\"></div>\n      </div>\n      <div id=\"attendanceRosterPanel\" class=\"panel hidden\">\n        <div class=\"panelHead\"><h2 id=\"attendanceRosterTitle\">참여 명단</h2><span id=\"attendanceCountBadge\" class=\"pill gold\">0명</span></div>\n        <div class=\"attToolbar\"><input id=\"attendanceMemberSearch\" placeholder=\"길드원 검색\" oninput=\"filterAttendanceMembers()\"><button class=\"btn ghost\" onclick=\"reloadAttendanceRoster(this)\">새로고침</button></div>\n        <div class=\"notice\">카톡·Discord·웹 출석과 보탐 스크린샷을 같은 회차에서 대조합니다. 스크린샷에만 확인된 길드원은 운영진 확인 후 참여에 추가할 수 있으며, 출석에만 있는 인원은 자동 삭제하지 않습니다.</div>\n        <div id=\"attendanceScreenshotBox\">\n          <label>📷 보탐 스크린샷 대조</label>\n          <input id=\"attendanceScreenshotFiles\" type=\"file\" accept=\"image/jpeg,image/png,image/webp\" multiple>\n          <button id=\"attendanceScreenshotAnalyzeBtn\" class=\"btn ghost\" onclick=\"analyzeAttendanceScreenshotsUI(this)\">스크린샷 분석·대조</button>\n          <div class=\"permissionNote\">최대 4장 · 원본 이미지는 저장하지 않고 분석 결과만 보관합니다.</div>\n          <div id=\"attendanceScreenshotResult\"></div>\n        </div>\n        <div id=\"attendanceRosterList\"></div>\n        <button id=\"attendanceDeleteEventBtn\" class=\"btn red hidden\" onclick=\"deleteAttendanceEventUI(this)\">이 보스 회차 삭제</button>\n      </div>\n    </section>\n\n    <section id=\"guildSettle\" class=\"screen\">\n      <div class=\"panel\"><div class=\"panelHead\"><h2>💰 정산 내역</h2></div>\n        <div class=\"notice\">정산 공식은 아직 확정 전입니다. 현재는 판매금액과 연합 출석 참여율을 안전하게 집계합니다.</div>\n        <div class=\"formGrid\"><input id=\"setStart\" type=\"date\"><input id=\"setEnd\" type=\"date\"></div>\n        <button class=\"btn ghost\" onclick=\"loadGuildSettlement(this)\">정산 데이터 집계</button><div id=\"guildSettlementResult\"></div>\n      </div>\n    </section>\n\n    <section id=\"guildFund\" class=\"screen\">\n      <div class=\"panel\"><div class=\"panelHead\"><h2>🏦 길드 비용 및 금고</h2></div>\n        <div class=\"item\" style=\"text-align:center\"><div class=\"small\">현재 길드 금고 보유액</div><div class=\"num\" id=\"guildFundBalance\">0 다이아</div></div>\n        <div id=\"guildFundEditPanel\">\n          <div class=\"formGrid\"><select id=\"fundType\"><option value=\"other_income\">기타 수입</option><option value=\"expense\">길드 지출</option></select><input id=\"fundAmount\" type=\"number\" placeholder=\"금액\"><input id=\"fundMemo\" class=\"full\" placeholder=\"수입/지출 사유\"></div>\n          <button class=\"btn green\" onclick=\"saveFundUI(this)\">금고 반영</button>\n        </div>\n        <div class=\"panelHead\" style=\"margin-top:24px\"><h2 style=\"font-size:.9em\">최근 금고 내역</h2></div>\n        <div id=\"guildFundHistory\"></div>\n      </div>\n    </section>\n\n    <div id=\"toast\"></div>\n  </main>\n</div>\n<script>\n/* GuildCore V6 RPC compatibility layer: 기존 UI의 google.script.run 호출을 Worker /rpc로 연결 */\n(function(){\n  function runner(success, failure){\n    return new Proxy({}, {\n      get:function(_, prop){\n        if(prop === 'withSuccessHandler') return function(fn){ return runner(fn, failure); };\n        if(prop === 'withFailureHandler') return function(fn){ return runner(success, fn); };\n        if(prop === 'then') return undefined;\n        return function(){\n          var args = Array.prototype.slice.call(arguments);\n          fetch('/rpc', {\n            method:'POST',\n            headers:{'Content-Type':'application/json'},\n            body:JSON.stringify({method:String(prop),args:args})\n          }).then(function(r){\n            return r.json().catch(function(){throw new Error('서버 응답을 해석할 수 없습니다.')}).then(function(j){\n              if(!r.ok || !j.ok) throw new Error(j.error || ('HTTP '+r.status));\n              return j.data;\n            });\n          }).then(function(data){ if(typeof success==='function') success(data); })\n            .catch(function(err){\n              var e={message:(err&&err.message)?err.message:String(err)};\n              if(typeof failure==='function') failure(e);\n              else try{console.error('GuildCore RPC error',e.message)}catch(_){}\n            });\n        };\n      }\n    });\n  }\n  window.google={script:{run:runner(null,null)}};\n})();\n</script>\n<script>\nvar INITIAL_HOME_DATA_ENCODED=\"\";\nvar ALLIANCE_DATA={alliance:{alliance_id:\"alliance_001\",alliance_name:\"연합\",game_name:\"ECLIPSE\"},notices:[],bosses:[],guilds:[]};\nvar GUILD_DATA={guild:{},notices:[],members:[],loot:[],pendingLoot:[],fundBalance:0,fundHistory:[]};\nvar ADMIN_DATA={alliances:[],guilds:[]};\nvar CURRENT_ALLIANCE=(function(){try{return localStorage.getItem(\"guildcore_current_alliance\")||\"alliance_001\"}catch(e){return \"alliance_001\"}})();\nvar CURRENT_GUILD=\"\";\nvar ATTENDANCE_MODE=\"guild\",ATTENDANCE_EVENT_ID=\"\",ATTENDANCE_ROSTER=null;\nvar CURRENT_SCREEN=\"allianceHome\";\nvar ROOT_MODE=\"alliance\";\nvar TOAST_TIMER=null;\nvar GUILD_LOADING=false;\nvar USER_INTERACTED=false;\nvar AUTO_REFRESH_TIMER=null;\nvar AUTH_TOKEN=\"\";\nvar AUTH={logged_in:false,role:\"게스트\",level:0,is_superadmin:false,alliance_id:\"\",guild_id:\"\",member_id:\"\",nickname:\"\"};\n\nfunction storageGet(key){try{var v=localStorage.getItem(key);return v?JSON.parse(v):null}catch(e){return null}}\nfunction storageSet(key,value){try{localStorage.setItem(key,JSON.stringify(value))}catch(e){}}\nfunction rememberCurrentAlliance(id){\n  CURRENT_ALLIANCE=String(id||CURRENT_ALLIANCE||\"alliance_001\");\n  try{localStorage.setItem(\"guildcore_current_alliance\",CURRENT_ALLIANCE)}catch(e){}\n  return CURRENT_ALLIANCE;\n}\nfunction allianceCacheKey(id){return \"guildcore:v5021:alliance:\"+String(id||CURRENT_ALLIANCE)}\nfunction guildCacheKey(id){return \"guildcore:v5021:guild:\"+String(id||CURRENT_GUILD)}\n\nfunction q(id){return document.getElementById(id)}\nfunction esc(s){return String(s==null?\"\":s).replace(/[&<>\"']/g,function(c){if(c===\"&\")return \"&amp;\";if(c===\"<\")return \"&lt;\";if(c===\">\")return \"&gt;\";if(c==='\"')return \"&quot;\";return \"&#039;\";})}\nfunction toast(msg,type){var t=q(\"toast\");if(TOAST_TIMER)clearTimeout(TOAST_TIMER);t.className=type===\"error\"?\"error\":\"success\";t.textContent=(type===\"error\"?\"⚠️ \":\"✅ \")+msg;t.style.display=\"block\";TOAST_TIMER=setTimeout(function(){t.style.display=\"none\"},3600)}\nfunction fail(e){toast((e&&e.message)?e.message:String(e),\"error\")}\nfunction tapFeedback(btn){if(!btn)return;btn.classList.add(\"tap\");if(navigator.vibrate)try{navigator.vibrate(18)}catch(_){}}\nfunction busy(btn,text){if(!btn)return;if(!btn.dataset.oldText)btn.dataset.oldText=btn.textContent;btn.disabled=true;btn.classList.add(\"is-busy\");btn.textContent=text||\"처리 중\";tapFeedback(btn)}\nfunction done(btn){if(!btn)return;btn.disabled=false;btn.classList.remove(\"is-busy\");if(btn.dataset.oldText){btn.textContent=btn.dataset.oldText;delete btn.dataset.oldText}}\nfunction failBtn(btn){return function(e){done(btn);fail(e)}}\nfunction showScreen(id){document.querySelectorAll(\".screen\").forEach(function(x){x.classList.remove(\"active\")});q(id).classList.add(\"active\");CURRENT_SCREEN=id;window.scrollTo(0,0);updateHeader()}\n\nfunction authRoleLevelUI(role){\n  if(role===\"최고관리자\")return 100;\n  if(role===\"길드장\")return 40;\n  if(role===\"부길드장\")return 30;\n  if(role===\"운영진\")return 20;\n  return role===\"길드원\"?10:0;\n}\nfunction allianceRoleLevelUI(role){return role===\"연합장\"?80:(role===\"연합운영진\"?70:0)}\nfunction isSuperAdminUI(){return Boolean(AUTH&&AUTH.logged_in&&AUTH.is_superadmin)}\nfunction isAllianceLeaderUI(){return Boolean(isSuperAdminUI()||(AUTH&&AUTH.logged_in&&AUTH.alliance_role===\"연합장\"&&String(AUTH.alliance_id||\"\")===String(CURRENT_ALLIANCE||\"\")))}\nfunction canOperateAllianceUI(){\n  if(isSuperAdminUI())return true;\n  return Boolean(AUTH&&AUTH.logged_in&&Number(AUTH.alliance_level||0)>=70&&String(AUTH.alliance_id||\"\")===String(CURRENT_ALLIANCE||\"\"));\n}\nfunction currentAuthServerIdUI(){\n  var gid=String(AUTH&&AUTH.guild_id||\"\");\n  var g=(ALLIANCE_DATA.guilds||[]).find(function(x){return String(x.guild_id)===gid});\n  return String(g&&g.server_id||AUTH&&AUTH.server_id||\"\");\n}\nfunction canConfigureBossUI(){\n  if(isSuperAdminUI())return true;\n  if(!(AUTH&&AUTH.logged_in&&String(AUTH.alliance_id||\"\")===String(CURRENT_ALLIANCE||\"\")))return false;\n  return Number(AUTH.alliance_level||0)>=70||Number(AUTH.level||0)>=20;\n}\nfunction canConfigureBossItemUI(b){\n  if(isSuperAdminUI())return true;\n  if(!(AUTH&&AUTH.logged_in&&String(AUTH.alliance_id||\"\")===String(CURRENT_ALLIANCE||\"\")))return false;\n  if(Number(AUTH.alliance_level||0)>=70)return true;\n  return Number(AUTH.level||0)>=20&&String(b&&b.boss_scope||\"WORLD\")===\"SERVER\"&&String(b&&b.server_id||\"\")===currentAuthServerIdUI();\n}\nfunction canOperateBossUI(){\n  if(isSuperAdminUI())return true;\n  if(!(AUTH&&AUTH.logged_in&&String(AUTH.alliance_id||\"\")===String(CURRENT_ALLIANCE||\"\")))return false;\n  return Number(AUTH.level||0)>=10||Number(AUTH.alliance_level||0)>=70;\n}\nfunction canCloseBossAttendanceUI(b){\n  if(isSuperAdminUI())return true;\n  if(!(AUTH&&AUTH.logged_in&&String(AUTH.alliance_id||\"\")===String(CURRENT_ALLIANCE||\"\")))return false;\n  if(Number(AUTH.alliance_level||0)>=70)return true;\n  if(Number(AUTH.level||0)<20)return false;\n  return String(b&&b.boss_scope||\"WORLD\")===\"SERVER\"&&String(b&&b.server_id||\"\")===currentAuthServerIdUI();\n}\nfunction canOperateGuildUI(){\n  if(isSuperAdminUI())return true;\n  return Boolean(AUTH&&AUTH.logged_in&&Number(AUTH.level||0)>=20&&String(AUTH.guild_id||\"\")===String(CURRENT_GUILD||\"\"));\n}\nfunction canUseMemberActionUI(){\n  if(isSuperAdminUI())return true;\n  return Boolean(AUTH&&AUTH.logged_in&&Number(AUTH.level||0)>=10&&String(AUTH.guild_id||\"\")===String(CURRENT_GUILD||\"\"));\n}\nfunction canManageTargetMemberUI(role){\n  if(isSuperAdminUI())return true;\n  if(isAllianceLeaderUI())return true;\n  if(!canOperateGuildUI()||AUTH.role!==\"길드장\")return false;\n  return authRoleLevelUI(role||\"길드원\")<40;\n}\nfunction canManageAllianceRoleUI(){return isSuperAdminUI()||isAllianceLeaderUI()}\nfunction setVisible(id,show){\n  var el=q(id);if(!el)return;\n  el.style.display=show?\"\":\"none\";\n}\nfunction refreshRoleSelect(){\n  var sel=q(\"guildMemberRole\");if(!sel)return;\n  var roles=[];\n  if(isSuperAdminUI())roles=[\"길드장\",\"부길드장\",\"운영진\",\"길드원\"];\n  else if(AUTH.role===\"길드장\")roles=[\"부길드장\",\"운영진\",\"길드원\"];\n  else if(canOperateGuildUI())roles=[\"길드원\"];\n  sel.innerHTML=roles.map(function(r){return '<option>'+esc(r)+'</option>'}).join(\"\");\n}\nfunction populateLoginGuilds(){\n  var sel=q(\"loginGuild\");if(!sel)return;\n  var gs=(ALLIANCE_DATA.guilds||[]);\n  sel.innerHTML=gs.length?gs.map(function(g){return '<option value=\"'+esc(g.guild_id)+'\">'+esc(g.guild_name||g.guild_id)+'</option>'}).join(\"\"):'<option value=\"\">등록된 길드 없음</option>';\n  if(AUTH&&AUTH.guild_id)sel.value=AUTH.guild_id;\n}\nfunction applyAuthUI(){\n  var roleLabel=(AUTH&&AUTH.alliance_role)?(AUTH.alliance_role+\" / \"+AUTH.role):((AUTH&&AUTH.role)||\"\");\n  var label=(AUTH&&AUTH.logged_in)?((AUTH.nickname?AUTH.nickname+\" · \":\"\")+roleLabel):\"로그인\";\n  if(q(\"authBtn\"))q(\"authBtn\").textContent=(AUTH&&AUTH.logged_in)?\"👤 \"+label:\"🔐 로그인\";\n  if(q(\"loginRoleBadge\"))q(\"loginRoleBadge\").textContent=(AUTH&&AUTH.logged_in)?AUTH.role:\"게스트\";\n  if(q(\"loginStatus\")){\n    q(\"loginStatus\").textContent=(AUTH&&AUTH.logged_in)?\n      ((AUTH.nickname||\"사용자\")+\" · \"+((AUTH.alliance_role?AUTH.alliance_role+\" / \":\"\")+AUTH.role)+\" 권한으로 로그인 중입니다.\"):\n      \"Discord /웹핀 또는 카카오 !웹핀으로 셀프 PIN을 발급해 로그인할 수 있습니다.\";\n  }\n  var loggedIn=Boolean(AUTH&&AUTH.logged_in);\n  setVisible(\"logoutBtn\",loggedIn);\n  setVisible(\"loginFormFields\",!loggedIn);\n  setVisible(\"loginPermissionNotes\",!loggedIn);\n  setVisible(\"loginSubmitBtn\",!loggedIn);\n  setVisible(\"allianceNoticeEditPanel\",canOperateAllianceUI());\n  setVisible(\"bossAddPanel\",canConfigureBossUI());\n  syncBossConfigScopeUI();\n  setVisible(\"guildNoticeEditPanel\",canOperateGuildUI());\n  setVisible(\"guildMemberEditPanel\",canOperateGuildUI());\n  setVisible(\"guildLootEditPanel\",canOperateGuildUI());\n  setVisible(\"guildLootAddCard\",canOperateGuildUI());\n  setVisible(\"guildFundEditPanel\",canOperateGuildUI());\n  setVisible(\"distSubmitBtn\",canUseMemberActionUI());\n  refreshRoleSelect();\n  updateHeader();\n  if(CURRENT_SCREEN===\"bossTime\")renderBosses();\n  if(ROOT_MODE===\"guild\"&&CURRENT_GUILD)renderGuild();\n}\nfunction loginModeChanged(){\n  var mode=q(\"loginMode\").value;\n  setVisible(\"selfPinHelp\",mode===\"selfpin\");\n  setVisible(\"memberLoginFields\",mode===\"member\");\n  setVisible(\"leaderLoginFields\",mode===\"alliance_leader\");\n  q(\"loginPinLabel\").textContent=mode===\"selfpin\"?\"셀프 PIN\":(mode===\"alliance_leader\"?\"연합장 최초 PIN\":(mode===\"superadmin\"?\"최고관리자 PIN\":\"복구 PIN\"));\n  q(\"loginPin\").placeholder=mode===\"superadmin\"?\"최고관리자 PIN\":\"6자리 PIN\";\n}\nfunction openLogin(){\n  populateLoginGuilds();\n  loginModeChanged();\n  showScreen(\"login\");\n  applyAuthUI();\n}\ntry{window.openLogin=openLogin}catch(_){}\nfunction doLogin(btn){\n  var mode=q(\"loginMode\").value;\n  var payload={mode:mode,pin:q(\"loginPin\").value};\n  if(mode===\"member\"){\n    payload.guild_id=q(\"loginGuild\").value;\n    payload.nickname=q(\"loginNickname\").value;\n  }else if(mode===\"alliance_leader\"){\n    payload.guild_key=q(\"loginLeaderGuild\").value;\n    payload.nickname=q(\"loginLeaderNickname\").value;\n  }\n  busy(btn,\"로그인 중\");\n  google.script.run.withSuccessHandler(function(r){\n    done(btn);\n    AUTH_TOKEN=String(r.token||\"\");\n    AUTH=r.auth||AUTH;\n    try{localStorage.setItem(\"guildcore_web_token\",AUTH_TOKEN);sessionStorage.removeItem(\"guildcore_web_token\")}catch(e){}\n    q(\"loginPin\").value=\"\";\n    applyAuthUI();\n    var roleText=(AUTH.alliance_role?AUTH.alliance_role+\" / \":\"\")+AUTH.role;\n    toast(roleText+\" 로그인 완료\");\n    if(AUTH&&AUTH.logged_in&&!AUTH.is_superadmin&&AUTH.alliance_id){rememberCurrentAlliance(AUTH.alliance_id);loadAlliance(CURRENT_ALLIANCE,true)}else{showAllianceHome()}\n  }).withFailureHandler(failBtn(btn)).webLogin(payload)\n}\nfunction doLogout(btn){\n  var old=AUTH_TOKEN;\n  busy(btn,\"로그아웃 중\");\n  google.script.run.withSuccessHandler(function(){\n    done(btn);\n    AUTH_TOKEN=\"\";\n    AUTH={logged_in:false,role:\"게스트\",level:0,is_superadmin:false,alliance_id:\"\",guild_id:\"\",member_id:\"\",nickname:\"\"};\n    try{localStorage.removeItem(\"guildcore_web_token\");sessionStorage.removeItem(\"guildcore_web_token\")}catch(e){}\n    applyAuthUI();\n    toast(\"로그아웃했습니다.\");\n    showAllianceHome();\n  }).withFailureHandler(function(e){\n    done(btn);\n    AUTH_TOKEN=\"\";\n    try{localStorage.removeItem(\"guildcore_web_token\");sessionStorage.removeItem(\"guildcore_web_token\")}catch(_){}\n    AUTH={logged_in:false,role:\"게스트\",level:0,is_superadmin:false,alliance_id:\"\",guild_id:\"\",member_id:\"\",nickname:\"\"};\n    applyAuthUI();fail(e)\n  }).webLogout(old)\n}\nfunction restoreAuthSession(){\n  try{\n    AUTH_TOKEN=localStorage.getItem(\"guildcore_web_token\")||sessionStorage.getItem(\"guildcore_web_token\")||\"\";\n    if(AUTH_TOKEN){localStorage.setItem(\"guildcore_web_token\",AUTH_TOKEN);sessionStorage.removeItem(\"guildcore_web_token\")}\n  }catch(e){AUTH_TOKEN=\"\"}\n  if(!AUTH_TOKEN){applyAuthUI();return}\n  google.script.run.withSuccessHandler(function(a){\n    AUTH=a||AUTH;\n    if(!AUTH.logged_in){\n      AUTH_TOKEN=\"\";\n      try{localStorage.removeItem(\"guildcore_web_token\");sessionStorage.removeItem(\"guildcore_web_token\")}catch(e){}\n    }\n    applyAuthUI();\n  }).withFailureHandler(function(){\n    AUTH_TOKEN=\"\";\n    AUTH={logged_in:false,role:\"게스트\",level:0,is_superadmin:false,alliance_id:\"\",guild_id:\"\",member_id:\"\",nickname:\"\"};\n    try{localStorage.removeItem(\"guildcore_web_token\");sessionStorage.removeItem(\"guildcore_web_token\")}catch(e){}\n    applyAuthUI();\n  }).webWhoAmI(AUTH_TOKEN)\n}\nfunction updateHeader(){\n  var isAllianceHome=CURRENT_SCREEN===\"allianceHome\";\n  q(\"back\").style.display=isAllianceHome?\"none\":\"block\";\n  q(\"adminBtn\").style.display=((isSuperAdminUI()||isAllianceLeaderUI())&&(CURRENT_SCREEN===\"allianceHome\"||CURRENT_SCREEN===\"admin\"))?\"block\":\"none\";\n  var v=document.querySelector(\".versionTag\");if(v)v.style.display=isAllianceHome?\"inline\":\"none\";\n  if(ROOT_MODE===\"guild\"){\n    q(\"appTitle\").textContent=((GUILD_DATA.guild&&GUILD_DATA.guild.guild_name)||\"길드\")+\" 길드관리\";\n    q(\"appSub\").textContent=\"연합 소속 길드 전용\";\n    q(\"gameBadge\").textContent=(GUILD_DATA.guild&&GUILD_DATA.guild.game_name)||\"ECLIPSE\";\n    q(\"back\").textContent=CURRENT_SCREEN===\"guildHome\"?\"← 연합\":\"← 길드\";\n  }else{\n    q(\"appTitle\").textContent=(ALLIANCE_DATA.alliance&&ALLIANCE_DATA.alliance.alliance_name)||\"GuildCore\";\n    q(\"appSub\").textContent=\"연합 운영 시스템\";\n    q(\"gameBadge\").textContent=(ALLIANCE_DATA.alliance&&ALLIANCE_DATA.alliance.game_name)||\"ECLIPSE\";\n    q(\"back\").textContent=\"← 연합\";\n  }\n}\nfunction goBack(){\n  if(ROOT_MODE===\"guild\"){\n    if(CURRENT_SCREEN===\"guildHome\"){showAllianceHome();return}\n    showScreen(\"guildHome\");return;\n  }\n  showAllianceHome();\n}\nfunction showAllianceHome(){\n  ROOT_MODE=\"alliance\";CURRENT_GUILD=\"\";\n  var loadedId=ALLIANCE_DATA&&ALLIANCE_DATA.alliance?String(ALLIANCE_DATA.alliance.alliance_id||\"\"):\"\";\n  if(String(CURRENT_ALLIANCE||\"\")&&loadedId!==String(CURRENT_ALLIANCE)){loadAlliance(CURRENT_ALLIANCE,true);return}\n  showScreen(\"allianceHome\");\n}\nfunction openAllianceScreen(id){if(id===\"attendanceCheck\"){openAttendanceCheck(\"alliance\");return}ROOT_MODE=\"alliance\";showScreen(id);if(id===\"bossTime\"||id===\"allianceNotice\")loadAlliance(CURRENT_ALLIANCE,false)}\nfunction openGuildScreen(id){ROOT_MODE=\"guild\";showScreen(id)}\n\nfunction openAttendanceCheck(mode){\n  if(!AUTH_TOKEN){toast(\"참여자 체크는 로그인이 필요합니다.\",\"error\");openLogin();return}\n  ATTENDANCE_MODE=mode===\"alliance\"?\"alliance\":\"guild\";\n  ROOT_MODE=ATTENDANCE_MODE===\"guild\"?\"guild\":\"alliance\";\n  q(\"attendanceCheckTitle\").textContent=ATTENDANCE_MODE===\"alliance\"?\"✅ 연합 참여자 체크\":\"✅ 길드 참여자 체크\";\n  q(\"attendanceScopeBadge\").textContent=ATTENDANCE_MODE===\"alliance\"?\"연합 전체\":\"길드\";\n  q(\"attendanceRosterPanel\").classList.add(\"hidden\");\n  ATTENDANCE_EVENT_ID=\"\";ATTENDANCE_ROSTER=null;\n  var e=todayISO(new Date()),s=todayISO(new Date(Date.now()-14*86400000));\n  if(!q(\"attendanceStart\").value)q(\"attendanceStart\").value=s;\n  if(!q(\"attendanceEnd\").value)q(\"attendanceEnd\").value=e;\n  showScreen(\"attendanceCheck\");\n  loadAttendanceEvents();\n}\nfunction loadAttendanceEvents(btn){\n  if(btn)busy(btn,\"조회 중\");\n  var gid=ATTENDANCE_MODE===\"guild\"?CURRENT_GUILD:\"\";\n  google.script.run.withSuccessHandler(function(r){\n    if(btn)done(btn);\n    var rows=r.events||[];\n    q(\"attendanceEventList\").innerHTML=rows.length?rows.map(function(x){\n      var status=x.attendance_status===\"open\"?'<span class=\"pill pink\">OPEN</span>':'<span class=\"pill gray\">종료</span>';\n      var del=x.can_delete?'<button class=\"mini danger\" onclick=\"deleteAttendanceEventFromListUI(\\''+esc(x.event_id)+'\\',this,event)\">삭제</button>':'';\n      return '<div class=\"attEvent\" data-att-event=\"'+esc(x.event_id)+'\"><div class=\"attEventTop\"><div class=\"attEventName\">'+esc(x.boss_name)+'</div><div style=\"display:flex;align-items:center;gap:8px\">'+status+del+'</div></div><div class=\"attEventMeta\">'+esc(x.display_time)+' · 참여 '+Number(x.participant_count||0)+'명 · '+esc(x.scope_label||'월드')+'</div></div>';\n    }).join(\"\"):'<div class=\"muted\">선택 기간에 저장된 보스 회차가 없습니다.</div>';\n  }).withFailureHandler(function(e){if(btn)done(btn);fail(e)}).getAttendanceEvents(CURRENT_ALLIANCE,gid,q(\"attendanceStart\").value,q(\"attendanceEnd\").value,AUTH_TOKEN)\n}\nfunction openAttendanceEvent(eventId){\n  ATTENDANCE_EVENT_ID=eventId;\n  var gid=ATTENDANCE_MODE===\"guild\"?CURRENT_GUILD:\"\";\n  google.script.run.withSuccessHandler(function(r){ATTENDANCE_ROSTER=r;renderAttendanceRoster()}).withFailureHandler(fail).getAttendanceRoster(CURRENT_ALLIANCE,eventId,gid,AUTH_TOKEN)\n}\nfunction reloadAttendanceRoster(btn){\n  if(!ATTENDANCE_EVENT_ID)return;\n  if(btn)busy(btn,\"불러오는 중\");\n  var gid=ATTENDANCE_MODE===\"guild\"?CURRENT_GUILD:\"\";\n  google.script.run.withSuccessHandler(function(r){if(btn)done(btn);ATTENDANCE_ROSTER=r;renderAttendanceRoster()}).withFailureHandler(function(e){if(btn)done(btn);fail(e)}).getAttendanceRoster(CURRENT_ALLIANCE,ATTENDANCE_EVENT_ID,gid,AUTH_TOKEN)\n}\nfunction renderAttendanceRoster(){\n  var r=ATTENDANCE_ROSTER||{},event=r.event||{},rows=r.members||[],groups={};\n  q(\"attendanceRosterPanel\").classList.remove(\"hidden\");\n  q(\"attendanceRosterTitle\").textContent=(event.boss_name||\"보스\")+\" · \"+(event.display_time||\"\");\n  q(\"attendanceCountBadge\").textContent=Number(r.participant_count||0)+\"명\";\n  rows.forEach(function(m){var key=m.guild_id||\"unknown\";(groups[key]||(groups[key]={name:m.guild_name||\"기타\",rows:[]})).rows.push(m)});\n  var h=Object.keys(groups).map(function(k){var g=groups[k];return '<div class=\"attGuildGroup\"><div class=\"attGuildTitle\">'+esc(g.name)+' · '+g.rows.filter(function(x){return x.attended}).length+'명</div>'+g.rows.map(function(m){\n    var src=m.source?'<span class=\"attSource\">'+esc(m.source_label||m.source)+'</span>':'';\n    return '<label class=\"attMember\" data-att-search=\"'+esc((m.nickname||'')+' '+(m.guild_name||''))+'\"><input type=\"checkbox\" data-att-member=\"'+esc(m.member_id)+'\" '+(m.attended?'checked ':'')+(r.can_edit?'':'disabled ')+'><div class=\"attMemberMain\"><div class=\"attMemberName\">'+esc(m.nickname)+'</div><div class=\"attMemberMeta\">'+esc(m.role||'길드원')+'</div></div>'+src+'</label>';\n  }).join('')+'</div>'}).join('');\n  q(\"attendanceRosterList\").innerHTML=h||'<div class=\"muted\">표시할 길드원이 없습니다.</div>';\n  renderAttendanceScreenshotResult(r.screenshot_check||null);\n  if(q(\"attendanceScreenshotAnalyzeBtn\"))q(\"attendanceScreenshotAnalyzeBtn\").style.display=r.can_edit?\"block\":\"none\";\n  if(q(\"attendanceScreenshotFiles\"))q(\"attendanceScreenshotFiles\").disabled=!r.can_edit;\n  if(q(\"attendanceDeleteEventBtn\"))q(\"attendanceDeleteEventBtn\").classList.toggle(\"hidden\",!r.can_delete);\n  filterAttendanceMembers();\n}\nfunction screenshotNames_(rows){return (rows||[]).map(function(x){return esc(x.nickname||x.text||x.member_id||\"\")}).filter(Boolean).join(\" · \")}\nfunction renderAttendanceScreenshotResult(r){\n  var el=q(\"attendanceScreenshotResult\");if(!el)return;\n  if(!r){el.innerHTML='<div class=\"muted\">아직 저장된 스크린샷 대조 결과가 없습니다.</div>';return}\n  var matched=r.matched||[],shot=r.screenshot_only||[],att=r.attendance_only||[],unc=r.uncertain||[];\n  var apply=(shot.length&&ATTENDANCE_ROSTER&&ATTENDANCE_ROSTER.can_edit)?'<button class=\"btn green\" onclick=\"applyAttendanceScreenshotMissingUI(\\''+esc(r.check_id)+'\\',this)\">스샷 누락자 참여추가 ('+shot.length+'명)</button>':'';\n  var del=(ATTENDANCE_ROSTER&&ATTENDANCE_ROSTER.can_delete)?'<button class=\"btn red\" onclick=\"deleteAttendanceScreenshotChecksUI(this)\">이 회차 스샷 대조기록 삭제</button>':'';\n  el.innerHTML='<div class=\"item\"><div class=\"name\">📸 '+esc(r.boss_name||\"보탐\")+' 스크린샷 대조</div>'+\n    '<div class=\"small\">분석 '+Number(r.recognized_count||0)+'명 · '+esc(r.created_at_display||r.created_at||\"\")+'</div>'+\n    '<div class=\"statusLine\">✅ 일치 '+matched.length+'명'+(matched.length?' · '+screenshotNames_(matched):'')+'</div>'+\n    '<div class=\"statusLine\">➕ 스샷에만 있음 '+shot.length+'명'+(shot.length?' · '+screenshotNames_(shot):'')+'</div>'+\n    '<div class=\"statusLine\">⚠️ 출석에만 있음 '+att.length+'명'+(att.length?' · '+screenshotNames_(att):'')+'</div>'+\n    '<div class=\"statusLine\">❓ 인식 불확실 '+unc.length+'명'+(unc.length?' · '+screenshotNames_(unc):'')+'</div>'+apply+del+'</div>';\n}\nfunction fileToBase64_(file){return new Promise(function(resolve,reject){var r=new FileReader();r.onload=function(){var v=String(r.result||\"\"),i=v.indexOf(\",\");resolve({name:file.name,mime_type:file.type||\"image/jpeg\",data:i>=0?v.slice(i+1):v})};r.onerror=function(){reject(new Error(\"이미지를 읽지 못했습니다: \"+file.name))};r.readAsDataURL(file)})}\nasync function analyzeAttendanceScreenshotsUI(btn){\n  if(!ATTENDANCE_EVENT_ID){toast(\"먼저 보스 회차를 선택하세요.\",\"error\");return}\n  if(!ATTENDANCE_ROSTER||!ATTENDANCE_ROSTER.can_edit){toast(\"운영진 이상 권한이 필요합니다.\",\"error\");return}\n  var fs=Array.from((q(\"attendanceScreenshotFiles\")&&q(\"attendanceScreenshotFiles\").files)||[]);\n  if(!fs.length){toast(\"스크린샷을 선택하세요.\",\"error\");return}\n  if(fs.length>4){toast(\"스크린샷은 한 번에 최대 4장입니다.\",\"error\");return}\n  for(var i=0;i<fs.length;i++){if(fs[i].size>8*1024*1024){toast(\"이미지 한 장은 8MB 이하로 올려주세요.\",\"error\");return}}\n  busy(btn,\"이미지 분석 중\");\n  try{\n    var imgs=[];for(var j=0;j<fs.length;j++)imgs.push(await fileToBase64_(fs[j]));\n    google.script.run.withSuccessHandler(function(r){done(btn);renderAttendanceScreenshotResult(r);reloadAttendanceRoster();toast(\"스크린샷 대조 완료\")}).withFailureHandler(failBtn(btn)).analyzeAttendanceScreenshots(CURRENT_ALLIANCE,ATTENDANCE_EVENT_ID,imgs,AUTH_TOKEN);\n  }catch(e){done(btn);fail(e)}\n}\nfunction applyAttendanceScreenshotMissingUI(checkId,btn){\n  if(!checkId)return;\n  if(!confirm(\"스크린샷에는 확인됐지만 출석에는 없는 등록 길드원을 참여에 추가할까요?\"))return;\n  busy(btn,\"출석 반영 중\");\n  google.script.run.withSuccessHandler(function(r){done(btn);toast(r.message||\"반영했습니다.\");reloadAttendanceRoster()}).withFailureHandler(failBtn(btn)).applyAttendanceScreenshotMissing(CURRENT_ALLIANCE,checkId,AUTH_TOKEN);\n}\nfunction deleteAttendanceScreenshotChecksUI(btn){\n  if(!ATTENDANCE_EVENT_ID)return;\n  if(!confirm(\"이 회차의 스크린샷 대조 기록을 모두 삭제할까요?\\n원본 Discord 스크린샷은 삭제하지 않습니다.\"))return;\n  busy(btn,\"대조기록 삭제 중\");\n  google.script.run.withSuccessHandler(function(r){done(btn);toast(r.message||\"삭제했습니다.\");reloadAttendanceRoster()}).withFailureHandler(failBtn(btn)).deleteAttendanceScreenshotChecks(CURRENT_ALLIANCE,ATTENDANCE_EVENT_ID,AUTH_TOKEN);\n}\nfunction deleteAttendanceEventUI(btn){\n  if(!ATTENDANCE_EVENT_ID||!ATTENDANCE_ROSTER)return;\n  var name=(ATTENDANCE_ROSTER.event&&ATTENDANCE_ROSTER.event.boss_name)||\"보스\";\n  if(!confirm(\"'\"+name+\"' 이 보스 회차를 삭제할까요?\\n\\n참여기록·스샷 대조기록도 함께 삭제됩니다.\\n보스 자체 설정과 현재 컷/젠 상태는 유지됩니다.\"))return;\n  busy(btn,\"회차 삭제 중\");\n  google.script.run.withSuccessHandler(function(r){done(btn);toast(r.message||\"회차를 삭제했습니다.\");ATTENDANCE_EVENT_ID=\"\";ATTENDANCE_ROSTER=null;q(\"attendanceRosterPanel\").classList.add(\"hidden\");loadAttendanceEvents()}).withFailureHandler(failBtn(btn)).deleteAttendanceEvent(CURRENT_ALLIANCE,ATTENDANCE_EVENT_ID,AUTH_TOKEN);\n}\nfunction deleteAttendanceEventFromListUI(eventId,btn,ev){\n  if(ev){ev.preventDefault();ev.stopPropagation()}\n  if(!confirm(\"이 보스 회차를 삭제할까요?\\n참여·스샷 대조기록도 함께 삭제됩니다.\"))return;\n  busy(btn,\"삭제 중\");\n  google.script.run.withSuccessHandler(function(r){done(btn);toast(r.message||\"회차를 삭제했습니다.\");if(String(ATTENDANCE_EVENT_ID)===String(eventId)){ATTENDANCE_EVENT_ID=\"\";ATTENDANCE_ROSTER=null;q(\"attendanceRosterPanel\").classList.add(\"hidden\")}loadAttendanceEvents()}).withFailureHandler(failBtn(btn)).deleteAttendanceEvent(CURRENT_ALLIANCE,eventId,AUTH_TOKEN);\n}\n\nfunction filterAttendanceMembers(){\n  var qv=String(q(\"attendanceMemberSearch\").value||\"\").trim().toLowerCase();\n  document.querySelectorAll(\"[data-att-search]\").forEach(function(el){el.style.display=!qv||String(el.getAttribute(\"data-att-search\")||\"\").toLowerCase().includes(qv)?\"\":\"none\"})\n}\nfunction setAttendanceMemberUI(memberId,checked,box){\n  if(!ATTENDANCE_ROSTER||!ATTENDANCE_ROSTER.can_edit){box.checked=!checked;toast(\"운영진 이상 권한이 필요합니다.\",\"error\");return}\n  box.disabled=true;\n  google.script.run.withSuccessHandler(function(){box.disabled=false;reloadAttendanceRoster()}).withFailureHandler(function(e){box.disabled=false;box.checked=!checked;fail(e)}).setAttendanceMember(CURRENT_ALLIANCE,ATTENDANCE_EVENT_ID,memberId,checked,\"web_admin\",AUTH_TOKEN)\n}\n\nfunction todayISO(d){var z=d||new Date(),p=function(n){return (\"0\"+n).slice(-2)};return z.getFullYear()+\"-\"+p(z.getMonth()+1)+\"-\"+p(z.getDate())}\nfunction monthStartDate(){var d=new Date();return todayISO(new Date(d.getFullYear(),d.getMonth(),1))}\n\nfunction loadAlliance(id,showHome){\n  rememberCurrentAlliance(id||CURRENT_ALLIANCE||\"alliance_001\");\n  var requestedAlliance=CURRENT_ALLIANCE;\n  google.script.run.withSuccessHandler(function(data){\n    if(String(requestedAlliance)!==String(CURRENT_ALLIANCE))return;\n    ALLIANCE_DATA=data||ALLIANCE_DATA;\n    rememberCurrentAlliance((ALLIANCE_DATA.alliance&&ALLIANCE_DATA.alliance.alliance_id)||requestedAlliance);\n    storageSet(allianceCacheKey(CURRENT_ALLIANCE),ALLIANCE_DATA);\n    renderAlliance();\n    if(showHome!==false)showAllianceHome();\n  }).withFailureHandler(fail).getAllianceHomeData(requestedAlliance)\n}\nfunction renderAlliance(){\n  var cards=[];\n  cards.push('<div class=\"card\" data-home-open=\"allianceNotice\"><div class=\"homeCardTop\"><div class=\"homeIcon\">📣</div><span class=\"homeTag\">연합</span></div><div class=\"homeBody\"><h3>연합공지</h3><p>연합 전체 공지와 전달사항</p></div><div class=\"homeFoot\"><span class=\"homeMeta\">ALLIANCE NOTICE</span><span class=\"homeArrow\">→</span></div></div>');\n  cards.push('<div class=\"card\" data-home-open=\"bossTime\"><div class=\"homeCardTop\"><div class=\"homeIcon\">⏳</div><span class=\"homeTag\">보스</span></div><div class=\"homeBody\"><h3>보스타임</h3><p>연합 공용 젠 현황과 컷 관리</p></div><div class=\"homeFoot\"><span class=\"homeMeta\">BOSS SCHEDULE</span><span class=\"homeArrow\">→</span></div></div>');\n  cards.push('<div class=\"card\" data-home-open=\"attendanceCheck\"><div class=\"homeCardTop\"><div class=\"homeIcon\">✅</div><span class=\"homeTag\">출석</span></div><div class=\"homeBody\"><h3>참여자 체크</h3><p>보스 회차별 연합 참여 명단 관리</p></div><div class=\"homeFoot\"><span class=\"homeMeta\">ATTENDANCE CHECK</span><span class=\"homeArrow\">→</span></div></div>');\n  (ALLIANCE_DATA.guilds||[]).forEach(function(g){\n    cards.push('<div class=\"card linkCard\" data-home-guild=\"'+esc(g.guild_id)+'\"><div class=\"homeCardTop\"><div class=\"homeIcon\">🏰</div><span class=\"homeTag\">길드</span></div><div class=\"homeBody\"><h3>'+esc(g.guild_name)+'</h3><p>길드 전용 운영 화면</p></div><div class=\"homeFoot\"><span class=\"homeMeta\">Discord ['+esc(g.discord_tag||g.guild_name)+']</span><span class=\"homeArrow\">→</span></div></div>')\n  });\n  var grid=q(\"allianceGrid\");\n  grid.innerHTML=cards.join(\"\");\n  grid.querySelectorAll(\"[data-home-open]\").forEach(function(el){\n    el.onclick=function(){openAllianceScreen(el.getAttribute(\"data-home-open\"))};\n  });\n  grid.querySelectorAll(\"[data-home-guild]\").forEach(function(el){\n    el.onclick=function(){openGuild(el.getAttribute(\"data-home-guild\"))};\n  });\n  q(\"allianceNoticeList\").innerHTML=(ALLIANCE_DATA.notices||[]).length?(ALLIANCE_DATA.notices||[]).map(function(n){var del=canOperateAllianceUI()?'<button class=\"mini danger\" onclick=\"deleteAllianceNoticeUI(\\''+esc(n.notice_id)+'\\',this,event)\">삭제</button>':'';return '<div class=\"item\"><div class=\"itemRow\"><div class=\"itemRowMain\"><div class=\"name\">'+(n.pinned?'<span class=\"pill pink\">필독</span> ':'')+esc(n.title)+'</div><div class=\"small\">'+esc(n.content)+'</div></div>'+del+'</div></div>'}).join(\"\"):'<div class=\"muted\">등록된 연합 공지가 없습니다.</div>';\n  setVisible(\"allianceNoticeEditPanel\",canOperateAllianceUI());\n  setVisible(\"bossAddPanel\",canConfigureBossUI());\n  renderBosses();updateHeader();\n}\nfunction bindBossActionButtons(){\n  var root=q(\"allianceBossList\");\n  if(!root)return;\n  root.querySelectorAll(\"[data-boss-now]\").forEach(function(el){el.onclick=function(e){if(e){e.preventDefault();e.stopPropagation()}bossNowCut(el.getAttribute(\"data-boss-now\"),el)}});\n  root.querySelectorAll(\"[data-boss-past]\").forEach(function(el){el.onclick=function(e){if(e){e.preventDefault();e.stopPropagation()}bossPastCut(el.getAttribute(\"data-boss-past\"),el)}});\n  root.querySelectorAll(\"[data-boss-spawn]\").forEach(function(el){el.onclick=function(e){if(e){e.preventDefault();e.stopPropagation()}bossSpawnSet(el.getAttribute(\"data-boss-spawn\"),el)}});\n  root.querySelectorAll(\"[data-boss-close]\").forEach(function(el){el.onclick=function(e){if(e){e.preventDefault();e.stopPropagation()}bossAttendanceClose(el.getAttribute(\"data-boss-close\"),el)}});\n  root.querySelectorAll(\"[data-boss-delete]\").forEach(function(el){el.onclick=function(e){if(e){e.preventDefault();e.stopPropagation()}deleteBossUI(el.getAttribute(\"data-boss-delete\"),el.getAttribute(\"data-boss-delete-name\")||\"\",el)}});\n}\nfunction refreshServerSelects(){\n  var servers=(ALLIANCE_DATA.servers||[]).filter(function(x){return x.enabled!==false});\n  if(!isSuperAdminUI()&&Number(AUTH&&AUTH.alliance_level||0)<70){\n    var mySid=currentAuthServerIdUI();\n    servers=servers.filter(function(x){return String(x.server_id||\"\")===mySid});\n  }\n  var sel=q(\"adminBossServer\");\n  if(sel)sel.innerHTML=servers.map(function(x){return '<option value=\"'+esc(x.server_id)+'\">'+esc(x.server_name||x.server_id)+'</option>'}).join(\"\");\n}\nfunction syncBossConfigScopeUI(){\n  var scope=q(\"adminBossScope\"),server=q(\"adminBossServer\");if(!scope||!server)return;\n  var allianceManager=isSuperAdminUI()||Number(AUTH&&AUTH.alliance_level||0)>=70;\n  if(!allianceManager&&canConfigureBossUI()){\n    scope.value=\"SERVER\";scope.disabled=true;\n  }else scope.disabled=false;\n  refreshServerSelects();\n  adminBossScopeChanged();\n}\nfunction adminBossScopeChanged(){var server=q(\"adminBossScope\").value===\"SERVER\";q(\"adminBossServer\").classList.toggle(\"hidden\",!server)}\nfunction visibleBossesForUI(){\n  var list=ALLIANCE_DATA.bosses||[];\n  if(isSuperAdminUI()||Number(AUTH&&AUTH.alliance_level||0)>=70)return list;\n  var gid=String(AUTH&&AUTH.guild_id||\"\");\n  var g=(ALLIANCE_DATA.guilds||[]).find(function(x){return String(x.guild_id)===gid});\n  var sid=String(g&&g.server_id||AUTH&&AUTH.server_id||\"\");\n  return list.filter(function(b){return String(b.boss_scope||\"WORLD\")===\"WORLD\"||String(b.server_id||\"\")===sid});\n}\nfunction parseWeeklyScheduleClient_(value){\n  var m=String(value||\"\").match(/^(SUN|MON|TUE|WED|THU|FRI|SAT)@((?:[01]\\\\d|2[0-3]):[0-5]\\\\d)$/);\n  if(!m)return null;\n  var labels={SUN:\"일\",MON:\"월\",TUE:\"화\",WED:\"수\",THU:\"목\",FRI:\"금\",SAT:\"토\"};\n  return {day:labels[m[1]]||m[1],time:m[2]};\n}\n\nfunction renderBosses(){\n  refreshServerSelects();\n  var list=visibleBossesForUI();\n  var groups={WORLD:[]};\n  list.forEach(function(b){var key=String(b.boss_scope||\"WORLD\")===\"WORLD\"?\"WORLD\":String(b.server_name||b.server_id||\"서버\");if(!groups[key])groups[key]=[];groups[key].push(b)});\n  var order=Object.keys(groups).filter(function(k){return groups[k].length}).sort(function(a,b){if(a===\"WORLD\")return -1;if(b===\"WORLD\")return 1;return a.localeCompare(b)});\n  var html=[];\n  order.forEach(function(key){\n    html.push('<div class=\"sectionTitle\">'+(key===\"WORLD\"?'월드보스':esc(key))+'</div>');\n    groups[key].forEach(function(b){\n      var cut=b.last_kill_at?String(b.last_kill_at).slice(-5):\"-\";\n      var next=b.next_spawn_at?String(b.next_spawn_at).slice(-5):\"-\";\n      var actions='';\n      if(canOperateBossUI()&&b.boss_type===\"cooldown\"){\n        if(b.attendance_open){actions=canCloseBossAttendanceUI(b)?'<div class=\"twoBtns\"><button class=\"btn ghost smallBtn\" disabled>출석 진행중</button><button class=\"btn red smallBtn\" data-boss-close=\"'+esc(b.open_event_id)+'\">출석 종료</button></div>':'<div class=\"twoBtns\"><button class=\"btn ghost smallBtn\" disabled>출석 진행중</button></div>'}\n        else{actions='<div class=\"threeBtns\"><button class=\"btn red smallBtn\" data-boss-now=\"'+esc(b.boss_id)+'\">지금 컷</button><button class=\"btn ghost smallBtn\" data-boss-past=\"'+esc(b.boss_id)+'\">지난 컷</button><button class=\"btn ghost smallBtn\" data-boss-spawn=\"'+esc(b.boss_id)+'\">젠 시각</button></div>'}\n      }\n      var deleteBtn=canConfigureBossItemUI(b)?'<div style=\"margin-top:8px;display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap\">'+((b.boss_type===\"cooldown\"&&(b.last_kill_at||b.next_spawn_at))?'<button class=\"mini danger\" onclick=\"clearBossStateUI(\\''+esc(b.boss_id)+'\\',this,event)\">컷/젠 기록삭제</button>':'')+'<button class=\"mini\" data-boss-delete=\"'+esc(b.boss_id)+'\" data-boss-delete-name=\"'+esc(b.boss_name)+'\">보스 삭제</button></div>':'';\n      var scheduleText=\"\";\n      if(b.boss_type===\"fixed\")scheduleText=\" · 매일 \"+esc(b.fixed_times||\"\");\n      else if(b.boss_type===\"weekly\"){\n        var ws=parseWeeklyScheduleClient_(b.fixed_times||\"\");\n        scheduleText=ws?\" · 매주 \"+ws.day+\"요일 \"+ws.time:\" · 요일고정\";\n      }\n      html.push('<div class=\"bossItem\"><div class=\"bossTitle\">'+esc(b.boss_name)+(b.attendance_open?' <span class=\"pill pink\">출석 OPEN</span>':'')+'</div><div class=\"statusLine\">컷 '+esc(cut)+' · 예정 '+esc(next)+scheduleText+'</div>'+actions+deleteBtn+'</div>');\n    });\n  });\n  q(\"allianceBossList\").innerHTML=html.length?html.join(\"\"):'<div class=\"muted\">활성 보스가 없습니다.</div>';\n  bindBossActionButtons();\n}\n\nfunction openGuild(guildId){\n  CURRENT_GUILD=guildId;ROOT_MODE=\"guild\";GUILD_LOADING=true;\n\n  /* 길드 홈은 서버 응답을 기다리지 않고 즉시 연다. */\n  var meta=(ALLIANCE_DATA.guilds||[]).find(function(g){return String(g.guild_id)===String(guildId)})||{};\n  var cached=storageGet(guildCacheKey(guildId));\n  if(cached&&cached.guild){\n    GUILD_DATA=cached;\n  }else{\n    GUILD_DATA={\n      guild:{guild_id:guildId,alliance_id:CURRENT_ALLIANCE,guild_name:meta.guild_name||\"길드\",game_name:(ALLIANCE_DATA.alliance&&ALLIANCE_DATA.alliance.game_name)||\"ECLIPSE\",discord_tag:meta.discord_tag||meta.guild_name||\"\"},\n      notices:[],members:[],loot:[],pendingLoot:[],fundBalance:0,fundHistory:[]\n    };\n  }\n  renderGuild();\n  showScreen(\"guildHome\");\n\n  /* 최신 데이터는 뒤에서 갱신한다. 화면 전환을 막지 않는다. */\n  google.script.run.withSuccessHandler(function(data){\n    GUILD_LOADING=false;\n    if(data){\n      GUILD_DATA=data;\n      storageSet(guildCacheKey(guildId),GUILD_DATA);\n      if(String(CURRENT_GUILD)===String(guildId)){renderGuild();}\n    }\n  }).withFailureHandler(function(e){GUILD_LOADING=false;fail(e);if(String(CURRENT_GUILD)===String(guildId))renderGuild()}).getGuildAppData(guildId)\n}\nfunction reloadGuild(){if(CURRENT_GUILD)openGuild(CURRENT_GUILD)}\nfunction renderGuild(){\n  q(\"guildHomeSub\").textContent=((GUILD_DATA.guild&&GUILD_DATA.guild.discord_tag)?(\"[\"+GUILD_DATA.guild.discord_tag+\"] \"):\"\")+((GUILD_DATA.guild&&GUILD_DATA.guild.guild_name)||\"길드\")+\" 전용\"+(GUILD_LOADING?\" · 동기화 중\":\"\");\n  q(\"guildMemberCount\").textContent=(GUILD_DATA.members||[]).length+\"명\";\n  q(\"guildNoticeList\").innerHTML=(GUILD_DATA.notices||[]).length?(GUILD_DATA.notices||[]).map(function(n){var del=canOperateGuildUI()?'<button class=\"mini danger\" onclick=\"deleteGuildNoticeUI(\\''+esc(n.notice_id)+'\\',this,event)\">삭제</button>':'';return '<div class=\"item\"><div class=\"itemRow\"><div class=\"itemRowMain\"><div class=\"name\">'+(n.pinned?'<span class=\"pill pink\">필독</span> ':'')+esc(n.title)+'</div><div class=\"small\">'+esc(n.content)+'</div></div>'+del+'</div></div>'}).join(\"\"):'<div class=\"muted\">등록된 길드 공지가 없습니다.</div>';\n  q(\"guildMemberList\").innerHTML=(GUILD_DATA.members||[]).length?(GUILD_DATA.members||[]).slice().sort(function(a,b){\n    var lv={\"길드장\":40,\"부길드장\":30,\"운영진\":20,\"길드원\":10};\n    return (lv[b.role]||0)-(lv[a.role]||0)||String(a.nickname||\"\").localeCompare(String(b.nickname||\"\"),\"ko\");\n  }).map(function(m){\n    var cls=m.role===\"길드장\"?\"gold\":(m.role===\"부길드장\"?\"pink\":(m.role===\"운영진\"?\"\":\"gray\"));\n    var badges='<span class=\"pill '+cls+'\">'+esc(m.role||\"길드원\")+'</span>';\n    if(m.alliance_role)badges+='<span class=\"pill gold\">'+esc(m.alliance_role)+'</span>';\n    var actions=[];\n    if(canOperateGuildUI()&&canManageTargetMemberUI(m.role)){\n      actions.push('<button class=\"mini\" data-member-pin=\"'+esc(m.member_id)+'\">복구 PIN '+(m.web_access_enabled?'재발급':'발급')+'</button>');\n    }\n    if(canManageTargetMemberUI(m.role)){\n      actions.push('<button class=\"mini\" data-member-role=\"'+esc(m.member_id)+'\" data-member-role-now=\"'+esc(m.role||\"길드원\")+'\">직급변경</button>');\n    }\n    if(canManageAllianceRoleUI()){\n      actions.push('<button class=\"mini\" data-member-alliance-role=\"'+esc(m.member_id)+'\" data-member-alliance-role-now=\"'+esc(m.alliance_role||\"\")+'\">연합권한</button>');\n    }\n    if(canOperateGuildUI()&&canManageTargetMemberUI(m.role)){\n      actions.push('<button class=\"mini danger\" data-member-delete=\"'+esc(m.member_id)+'\" data-member-delete-name=\"'+esc(m.nickname||\"\")+'\">삭제</button>');\n    }\n    return '<div class=\"memberCard\"><div class=\"memberTop\"><div class=\"memberIdentity\"><div class=\"memberNickname\">'+esc(m.nickname)+'</div><div class=\"memberBadges\">'+badges+'</div></div><div class=\"memberLogin '+(m.web_access_enabled?'ok':'')+'\">'+(m.web_access_enabled?'🔐 복구 PIN 있음':'📱 셀프 PIN')+'</div></div>'+(actions.length?'<div class=\"memberActions\">'+actions.join('')+'</div>':'')+'</div>'\n  }).join(\"\"):'<div class=\"muted\">등록된 길드원이 없습니다.</div>';\n  q(\"guildLootHistory\").innerHTML=(GUILD_DATA.loot||[]).length?(GUILD_DATA.loot||[]).map(function(x){\n    var st=String(x.status||\"보유\"),sold=st===\"판매완료\",actions=[];\n    if(canOperateGuildUI()&&!sold&&st!==\"지급완료\")actions.push('<button class=\"mini\" data-loot-sell=\"'+esc(x.loot_id)+'\">판매완료</button>');\n    if(canOperateGuildUI())actions.push('<button class=\"mini danger\" data-loot-delete=\"'+esc(x.loot_id)+'\" data-loot-delete-name=\"'+esc(x.item_name||\"\")+'\">삭제</button>');\n    return '<div class=\"item\"><div class=\"itemRow\"><div class=\"itemRowMain\"><div class=\"name\">'+esc(x.item_name)+' <span class=\"pill '+(sold?'gold':'gray')+'\">'+esc(st)+'</span></div><div class=\"small\">수량 '+esc(x.quantity||1)+(x.sale_amount?' · 판매 '+Number(x.sale_amount).toLocaleString():'')+(x.created_at?' · '+esc(x.created_at):'')+'</div></div>'+(actions.length?'<div class=\"lootActions\">'+actions.join('')+'</div>':'')+'</div></div>'\n  }).join(\"\"):'<div class=\"muted\">등록된 아이템이 없습니다.</div>';\n  q(\"guildFundBalance\").textContent=Number(GUILD_DATA.fundBalance||0).toLocaleString()+\" 다이아\";\n  if(q(\"guildFundHistory\")){\n    q(\"guildFundHistory\").innerHTML=(GUILD_DATA.fundHistory||[]).length?(GUILD_DATA.fundHistory||[]).map(function(x){\n      var amt=Number(x.amount_signed||0),label=amt<0?\"지출\":\"수입\",pill=amt<0?\"pink\":\"gold\";\n      var del=canOperateGuildUI()?'<button class=\"mini danger\" data-fund-delete=\"'+esc(x.txn_id)+'\">삭제</button>':'';\n      return '<div class=\"item\"><div class=\"itemRow\"><div class=\"itemRowMain\"><div class=\"name\"><span class=\"pill '+pill+'\">'+label+'</span> '+(amt>0?'+':'')+amt.toLocaleString()+' 다이아</div><div class=\"small\">'+esc(x.display_time||x.occurred_at||'')+(x.memo?' · '+esc(x.memo):'')+(x.source?' · '+esc(x.source):'')+'</div></div>'+del+'</div></div>';\n    }).join(\"\"):'<div class=\"muted\">금고 내역이 없습니다.</div>';\n  }\n  setVisible(\"guildNoticeEditPanel\",canOperateGuildUI());\n  setVisible(\"guildMemberEditPanel\",canOperateGuildUI());\n  setVisible(\"guildLootEditPanel\",canOperateGuildUI());\n  setVisible(\"guildLootAddCard\",canOperateGuildUI());\n  setVisible(\"guildFundEditPanel\",canOperateGuildUI());\n  refreshRoleSelect();\n  updateHeader();\n}\n\nfunction saveAllianceNoticeUI(btn){busy(btn,\"공지 저장 중\");google.script.run.withSuccessHandler(function(r){done(btn);toast(r.message);q(\"aNoticeTitle\").value=\"\";q(\"aNoticeContent\").value=\"\";loadAlliance(CURRENT_ALLIANCE,false)}).withFailureHandler(failBtn(btn)).saveAllianceNotice(CURRENT_ALLIANCE,{title:q(\"aNoticeTitle\").value,content:q(\"aNoticeContent\").value,pinned:q(\"aNoticePinned\").checked},AUTH_TOKEN)}\nfunction saveGuildNoticeUI(btn){busy(btn,\"공지 저장 중\");google.script.run.withSuccessHandler(function(r){done(btn);toast(r.message);q(\"gNoticeTitle\").value=\"\";q(\"gNoticeContent\").value=\"\";google.script.run.withSuccessHandler(function(d){GUILD_DATA=d;renderGuild()}).withFailureHandler(fail).getGuildAppData(CURRENT_GUILD)}).withFailureHandler(failBtn(btn)).saveGuildNotice(CURRENT_GUILD,{title:q(\"gNoticeTitle\").value,content:q(\"gNoticeContent\").value,pinned:q(\"gNoticePinned\").checked},AUTH_TOKEN)}\nfunction deleteAllianceNoticeUI(noticeId,btn,ev){\n  if(ev){ev.preventDefault();ev.stopPropagation()}\n  if(!confirm(\"이 연합 공지를 삭제할까요?\"))return;\n  busy(btn,\"삭제 중\");\n  google.script.run.withSuccessHandler(function(r){done(btn);toast(r.message);loadAlliance(CURRENT_ALLIANCE,false)}).withFailureHandler(failBtn(btn)).deleteAllianceNotice(CURRENT_ALLIANCE,noticeId,AUTH_TOKEN);\n}\nfunction deleteGuildNoticeUI(noticeId,btn,ev){\n  if(ev){ev.preventDefault();ev.stopPropagation()}\n  if(!confirm(\"이 길드 공지를 삭제할까요?\"))return;\n  busy(btn,\"삭제 중\");\n  google.script.run.withSuccessHandler(function(r){done(btn);toast(r.message);google.script.run.withSuccessHandler(function(d){GUILD_DATA=d;renderGuild()}).withFailureHandler(fail).getGuildAppData(CURRENT_GUILD)}).withFailureHandler(failBtn(btn)).deleteGuildNotice(CURRENT_GUILD,noticeId,AUTH_TOKEN);\n}\n\nfunction saveGuildMemberUI(btn){\n  busy(btn,\"길드원 저장 중\");\n  google.script.run.withSuccessHandler(function(r){\n    done(btn);\n    q(\"guildMemberNick\").value=\"\";\n    if(r&&r.access_pin){\n      alert(\"길드원 등록 완료\\\\n\\\\n직급: \"+r.role+\"\\\\n웹 로그인 PIN: \"+r.access_pin+\"\\\\n\\\\n이 PIN은 길드원에게 전달하세요.\");\n    }else{\n      toast(r.message);\n    }\n    google.script.run.withSuccessHandler(function(d){GUILD_DATA=d;renderGuild()}).withFailureHandler(fail).getGuildAppData(CURRENT_GUILD)\n  }).withFailureHandler(failBtn(btn)).saveGuildMember(\n    CURRENT_GUILD,\n    {nickname:q(\"guildMemberNick\").value,role:q(\"guildMemberRole\").value},\n    AUTH_TOKEN\n  )\n}\n\nfunction deleteGuildMemberUI(memberId,name,btn){\n  if(!memberId)return;\n  if(!confirm(\"'\"+(name||\"길드원\")+\"' 길드원을 삭제할까요?\\n\\n길드원 목록과 웹 로그인·Discord·카톡 연결에서 제거됩니다.\\n과거 보스 출석 기록은 통계 보존을 위해 유지됩니다.\"))return;\n  busy(btn,\"길드원 삭제 중\");\n  google.script.run.withSuccessHandler(function(r){done(btn);toast(r.message||\"길드원을 삭제했습니다.\");google.script.run.withSuccessHandler(function(d){GUILD_DATA=d;renderGuild()}).withFailureHandler(fail).getGuildAppData(CURRENT_GUILD)}).withFailureHandler(failBtn(btn)).deleteGuildMember(CURRENT_GUILD,memberId,AUTH_TOKEN)\n}\n\nfunction resetMemberPinUI(memberId,btn){\n  if(!canOperateGuildUI()){toast(\"운영진 이상 권한이 필요합니다.\",\"error\");return}\n  if(!confirm(\"이 길드원의 복구용 웹 PIN을 발급/재발급할까요?\\n\\n일반 사용자는 Discord /웹핀 또는 카카오 !웹핀을 사용합니다.\"))return;\n  busy(btn,\"PIN 발급 중\");\n  google.script.run.withSuccessHandler(function(r){\n    done(btn);\n    alert(\"복구용 웹 PIN 발급 완료\\\\n\\\\nPIN: \"+r.pin+\"\\\\n\\\\n셀프 PIN을 사용할 수 없는 경우에만 전달하세요.\");\n    google.script.run.withSuccessHandler(function(d){GUILD_DATA=d;renderGuild()}).withFailureHandler(fail).getGuildAppData(CURRENT_GUILD)\n  }).withFailureHandler(failBtn(btn)).resetMemberWebPin(CURRENT_GUILD,memberId,AUTH_TOKEN)\n}\nfunction changeMemberRoleUI(memberId,currentRole,btn){\n  if(!canManageTargetMemberUI(currentRole)){toast(\"이 직급을 변경할 권한이 없습니다.\",\"error\");return}\n  var guide=isSuperAdminUI()?\"길드장 / 부길드장 / 운영진 / 길드원\":(isAllianceLeaderUI()?\"연합장 권한: 길드장 지정/해제 · 자기 길드장 권한이 있으면 부길드장/운영진 지정 가능\":\"부길드장 / 운영진 / 길드원\");\n  var next=prompt(\"새 직급을 입력하세요.\\n\"+guide,currentRole||\"길드원\");\n  if(next===null)return;\n  next=String(next||\"\").trim();\n  if([\"길드장\",\"부길드장\",\"운영진\",\"길드원\"].indexOf(next)<0){toast(\"직급명이 올바르지 않습니다.\",\"error\");return}\n  busy(btn,\"직급 변경 중\");\n  google.script.run.withSuccessHandler(function(r){\n    done(btn);toast(r.message);\n    google.script.run.withSuccessHandler(function(d){GUILD_DATA=d;renderGuild()}).withFailureHandler(fail).getGuildAppData(CURRENT_GUILD)\n  }).withFailureHandler(failBtn(btn)).updateGuildMemberRole(CURRENT_GUILD,memberId,next,AUTH_TOKEN)\n}\nfunction changeAllianceRoleUI(memberId,current,btn){\n  if(!canManageAllianceRoleUI()){toast(\"연합장 이상 권한이 필요합니다.\",\"error\");return}\n  var guide=isSuperAdminUI()?\"연합장 / 연합운영진 / 없음\":\"연합운영진 / 없음\";\n  var next=prompt(\"연합 권한을 입력하세요.\\n가능: \"+guide,current||\"없음\");\n  if(next===null)return;\n  next=String(next||\"\").trim();if(next===\"없음\")next=\"\";\n  var allowed=isSuperAdminUI()?[\"\",\"연합장\",\"연합운영진\"]:[\"\",\"연합운영진\"];\n  if(allowed.indexOf(next)<0){toast(\"지정할 수 없는 연합 권한입니다.\",\"error\");return}\n  busy(btn,\"연합권한 변경 중\");\n  google.script.run.withSuccessHandler(function(r){done(btn);toast(r.message);google.script.run.withSuccessHandler(function(d){GUILD_DATA=d;renderGuild()}).withFailureHandler(fail).getGuildAppData(CURRENT_GUILD)}).withFailureHandler(failBtn(btn)).updateMemberAllianceRole(CURRENT_GUILD,memberId,next,AUTH_TOKEN)\n}\nfunction lootStatusChanged(){q(\"lootSaleWrap\").classList.toggle(\"hidden\",q(\"lootStatus\").value!==\"판매완료\")}\nfunction saveLootUI(btn){busy(btn,\"아이템 저장 중\");google.script.run.withSuccessHandler(function(r){done(btn);toast(r.message);q(\"lootName\").value=\"\";q(\"lootQty\").value=\"1\";q(\"lootSale\").value=\"\";q(\"lootNote\").value=\"\";google.script.run.withSuccessHandler(function(d){GUILD_DATA=d;renderGuild()}).withFailureHandler(fail).getGuildAppData(CURRENT_GUILD)}).withFailureHandler(failBtn(btn)).saveGuildLoot(CURRENT_GUILD,{item_name:q(\"lootName\").value,quantity:q(\"lootQty\").value,status:q(\"lootStatus\").value,sale_amount:q(\"lootSale\").value,note:q(\"lootNote\").value},AUTH_TOKEN)}\nfunction markLootSoldUI(lootId,btn){var amount=prompt(\"판매금액을 입력하세요.\",\"\");if(amount===null)return;busy(btn,\"처리 중\");google.script.run.withSuccessHandler(function(r){done(btn);toast(r.message);google.script.run.withSuccessHandler(function(d){GUILD_DATA=d;renderGuild()}).withFailureHandler(fail).getGuildAppData(CURRENT_GUILD)}).withFailureHandler(failBtn(btn)).markGuildLootSold(CURRENT_GUILD,lootId,amount,AUTH_TOKEN)}\nfunction deleteLootUI(lootId,itemName,btn){\n  if(!canOperateGuildUI()){toast(\"운영진 이상 권한이 필요합니다.\",\"error\");return}\n  var name=String(itemName||\"아이템\");\n  if(!confirm(\"'\"+name+\"' 아이템 기록을 삭제할까요?\\n\\n판매완료 기록이면 정산 집계에서도 제외됩니다.\"))return;\n  busy(btn,\"삭제 중\");\n  google.script.run.withSuccessHandler(function(r){\n    done(btn);toast(r.message);\n    google.script.run.withSuccessHandler(function(d){GUILD_DATA=d;renderGuild()}).withFailureHandler(fail).getGuildAppData(CURRENT_GUILD)\n  }).withFailureHandler(failBtn(btn)).deleteGuildLoot(CURRENT_GUILD,lootId,AUTH_TOKEN)\n}\nfunction saveFundUI(btn){busy(btn,\"금고 반영 중\");google.script.run.withSuccessHandler(function(r){done(btn);toast(r.message);q(\"fundAmount\").value=\"\";q(\"fundMemo\").value=\"\";google.script.run.withSuccessHandler(function(d){GUILD_DATA=d;renderGuild()}).withFailureHandler(fail).getGuildAppData(CURRENT_GUILD)}).withFailureHandler(failBtn(btn)).addFundTransaction(CURRENT_GUILD,{type:q(\"fundType\").value,amount:q(\"fundAmount\").value,memo:q(\"fundMemo\").value},AUTH_TOKEN)}\nfunction deleteFundTransactionUI(txnId,btn){\n  if(!txnId)return;\n  if(!confirm(\"이 금고 입출금 기록을 삭제할까요?\\n삭제 즉시 금고 잔액도 다시 계산됩니다.\"))return;\n  busy(btn,\"금고기록 삭제 중\");\n  google.script.run.withSuccessHandler(function(r){done(btn);toast(r.message||\"금고 기록을 삭제했습니다.\");google.script.run.withSuccessHandler(function(d){GUILD_DATA=d;renderGuild()}).withFailureHandler(fail).getGuildAppData(CURRENT_GUILD)}).withFailureHandler(failBtn(btn)).deleteFundTransaction(CURRENT_GUILD,txnId,AUTH_TOKEN)\n}\nfunction loadGuildStats(btn){busy(btn,\"통계 조회 중\");google.script.run.withSuccessHandler(function(r){done(btn);var h='<div class=\"statsBox\"><div><div class=\"small\">기간 보스</div><div class=\"num\">'+r.total_raids+'</div></div><div><div class=\"small\">참여 길드원</div><div class=\"num\">'+r.ranking.length+'</div></div></div>';h+=r.ranking.map(function(x,i){return '<div class=\"item\"><div class=\"name\">'+(i+1)+'. '+esc(x.nickname)+'</div><div class=\"small\">'+x.count+'회 참여 · 참여율 '+x.rate+'%</div></div>'}).join(\"\");q(\"guildStatsResult\").innerHTML=h;toast(\"통계 조회가 완료됐습니다.\")}).withFailureHandler(failBtn(btn)).getGuildStats(CURRENT_GUILD,q(\"statsStart\").value,q(\"statsEnd\").value)}\nfunction loadGuildSettlement(btn){busy(btn,\"정산 집계 중\");google.script.run.withSuccessHandler(function(r){done(btn);var h='<div class=\"statsBox\"><div><div class=\"small\">기간 판매금액</div><div class=\"num\">'+Number(r.total_sales||0).toLocaleString()+'</div></div><div><div class=\"small\">기간 보스</div><div class=\"num\">'+r.total_raids+'</div></div></div>';h+='<div class=\"notice\">정산 방식: '+esc(r.allocation_mode)+' · '+esc(r.note||\"\")+'</div>';h+=r.ranking.map(function(x){return '<div class=\"item\"><div class=\"name\">'+esc(x.nickname)+'</div><div class=\"small\">'+x.count+'회 · 참여율 '+x.rate+'%</div></div>'}).join(\"\");q(\"guildSettlementResult\").innerHTML=h;toast(\"정산 데이터 집계가 완료됐습니다.\")}).withFailureHandler(failBtn(btn)).getGuildSettlementPreview(CURRENT_GUILD,q(\"setStart\").value,q(\"setEnd\").value)}\n\nfunction clearBossStateUI(bossId,btn,ev){\n  if(ev){ev.preventDefault();ev.stopPropagation()}\n  if(!confirm(\"현재 컷/젠 기록을 삭제할까요?\\n\\n보스 설정과 과거 출석 회차는 유지됩니다.\"))return;\n  busy(btn,\"기록 삭제 중\");\n  google.script.run.withSuccessHandler(function(r){done(btn);toast(r.message);loadAlliance(CURRENT_ALLIANCE,false)}).withFailureHandler(failBtn(btn)).clearAllianceBossState(CURRENT_ALLIANCE,bossId,AUTH_TOKEN);\n}\n\nfunction deleteBossUI(bossId,bossName,btn){\n  if(!canConfigureBossUI()){\n    toast(\"연합운영진 이상 권한이 필요합니다.\",\"error\");\n    return;\n  }\n  if(!confirm((bossName||\"보스\")+\"을(를) 삭제할까요?\\\\n과거 컷/출석 기록은 유지됩니다.\"))return;\n\n  busy(btn,\"삭제 중\");\n  google.script.run\n    .withSuccessHandler(function(r){\n      done(btn);\n      toast(r.message);\n      loadAlliance(CURRENT_ALLIANCE,false);\n    })\n    .withFailureHandler(failBtn(btn))\n    .disableAllianceBoss(CURRENT_ALLIANCE,bossId,AUTH_TOKEN)\n}\n\nfunction bossNowCut(id,btn){busy(btn,\"컷 등록 중\");google.script.run.withSuccessHandler(function(r){done(btn);toast(r.message);loadAlliance(CURRENT_ALLIANCE,false)}).withFailureHandler(failBtn(btn)).registerAllianceBossCut(CURRENT_ALLIANCE,id,\"\",\"web\",\"web\",AUTH_TOKEN)}\nfunction bossPastCut(id,btn){var t=prompt(\"실제 컷 시각을 입력하세요. 예: 20:35\",\"\");if(t===null)return;busy(btn,\"컷 등록 중\");google.script.run.withSuccessHandler(function(r){done(btn);toast(r.message);loadAlliance(CURRENT_ALLIANCE,false)}).withFailureHandler(failBtn(btn)).registerAllianceBossCut(CURRENT_ALLIANCE,id,t,\"web\",\"web\",AUTH_TOKEN)}\nfunction bossSpawnSet(id,btn){var t=prompt(\"다음 젠 시각을 입력하세요. 예: 03:40 · 비우면 젠 시각 제거\",\"\");if(t===null)return;busy(btn,\"젠 변경 중\");google.script.run.withSuccessHandler(function(r){done(btn);toast(r.message);loadAlliance(CURRENT_ALLIANCE,false)}).withFailureHandler(failBtn(btn)).setAllianceBossSpawn(CURRENT_ALLIANCE,id,t,\"web\",\"web\",AUTH_TOKEN)}\nfunction bossAttendanceClose(eventId,btn){if(!confirm(\"현재 출석을 종료할까요?\"))return;busy(btn,\"출석 종료 중\");google.script.run.withSuccessHandler(function(r){done(btn);toast(r.message);loadAlliance(CURRENT_ALLIANCE,false)}).withFailureHandler(failBtn(btn)).closeBossAttendance(CURRENT_ALLIANCE,eventId,\"web\",AUTH_TOKEN)}\n\nfunction openAdmin(){\n  if(!isSuperAdminUI()&&!isAllianceLeaderUI()){toast(\"최고관리자 또는 연합장 권한이 필요합니다.\",\"error\");openLogin();return}\n  ROOT_MODE=\"alliance\";\n  google.script.run.withSuccessHandler(function(data){ADMIN_DATA=data||ADMIN_DATA;renderAdmin();showScreen(\"admin\")}).withFailureHandler(fail).getAdminStructure(AUTH_TOKEN)\n}\nfunction renderAdmin(){\n  var activeAlliances=(ADMIN_DATA.alliances||[]).filter(function(a){return String(a.status||\"active\")===\"active\"});\n  q(\"adminAlliancePanel\").style.display=isSuperAdminUI()?\"\":\"none\";\n  q(\"newGuildAlliance\").innerHTML=activeAlliances.map(function(a){return '<option value=\"'+esc(a.alliance_id)+'\" '+(String(a.alliance_id)===String(CURRENT_ALLIANCE)?'selected':'')+'>'+esc(a.alliance_name||a.alliance_id)+'</option>'}).join(\"\");\n  if(!isSuperAdminUI())q(\"newGuildAlliance\").disabled=true;else q(\"newGuildAlliance\").disabled=false;\n  q(\"adminAllianceList\").innerHTML=isSuperAdminUI()?(ADMIN_DATA.alliances||[]).map(function(a){var active=String(a.status||\"active\")===\"active\",name=String(a.alliance_name||a.alliance_id);return '<div class=\"item\"><div class=\"adminInfo\"><div class=\"name\">'+esc(name)+'</div><div class=\"small\">'+esc(a.alliance_id)+' · '+esc(a.status||\"active\")+'</div></div><div class=\"adminActions\">'+(active?'<button class=\"btn ghost smallBtn\" data-open-alliance=\"'+esc(a.alliance_id)+'\">열기</button><button class=\"btn ghost smallBtn\" data-alliance-leader-pin=\"'+esc(a.alliance_id)+'\" data-alliance-leader-name=\"'+esc(name)+'\">연합장 PIN</button><button class=\"btn ghost smallBtn\" data-off-alliance=\"'+esc(a.alliance_id)+'\">보관제거</button>':'<button class=\"btn ghost smallBtn\" data-restore-alliance=\"'+esc(a.alliance_id)+'\">복구</button>')+'<button class=\"mini\" data-delete-alliance=\"'+esc(a.alliance_id)+'\" data-delete-name=\"'+esc(name)+'\">완전제거</button></div></div>'}).join(\"\"):'';\n  q(\"adminGuildList\").innerHTML=(ADMIN_DATA.guilds||[]).filter(function(g){return String(g.alliance_id)===String(CURRENT_ALLIANCE)}).map(function(g){var active=String(g.status||\"active\")===\"active\",name=String(g.guild_name||g.guild_id),hard=isSuperAdminUI()?'<button class=\"mini\" data-delete-guild=\"'+esc(g.guild_id)+'\" data-delete-name=\"'+esc(name)+'\">완전제거</button>':'';var renameBtn=active?'<button class=\"mini\" data-guild-rename=\"'+esc(g.guild_id)+'\" data-guild-rename-now=\"'+esc(name)+'\">길드명변경</button>':'';var serverBtn=active?'<button class=\"mini\" data-guild-server=\"'+esc(g.guild_id)+'\" data-guild-server-now=\"'+esc(g.server_name||g.game_server_name||\"\")+'\">서버변경</button>':'';return '<div class=\"item\"><div class=\"adminInfo\"><div class=\"name\">'+esc(name)+' <span class=\"pill\">['+esc(g.discord_tag||g.guild_name||\"\")+']</span></div><div class=\"small\">'+esc(g.server_name||g.game_server_name||\"서버 미지정\")+' · '+esc(g.status||\"active\")+'</div></div><div class=\"adminActions\">'+renameBtn+serverBtn+(active?'<button class=\"btn ghost smallBtn\" data-off-guild=\"'+esc(g.guild_id)+'\">삭제(보관)</button>':'<button class=\"btn ghost smallBtn\" data-restore-guild=\"'+esc(g.guild_id)+'\">복구</button>')+hard+'</div></div>'}).join(\"\");\n  updateDisplayPreview();refreshServerSelects();adminBossScopeChanged();\n}\nfunction updateDisplayPreview(){var tag=q(\"newGuildTag\").value||\"표시명\",f=q(\"newGuildFormat\").value,n=\"닉네임\",out=\"[\"+tag+\"] \"+n;if(f===\"TAG | NICKNAME\")out=tag+\" | \"+n;else if(f===\"TAG-NICKNAME\")out=tag+\"-\"+n;else if(f===\"NICKNAME\")out=n;q(\"displayPreview\").textContent=out}\nfunction createAllianceUI(btn){busy(btn,\"연합 생성 중\");google.script.run.withSuccessHandler(function(r){done(btn);toast(r.message);q(\"newAllianceName\").value=\"\";q(\"newAllianceServer\").value=\"\";rememberCurrentAlliance(r.alliance_id);loadAlliance(r.alliance_id,true)}).withFailureHandler(failBtn(btn)).createAllianceWorkspace({alliance_name:q(\"newAllianceName\").value,game_id:\"eclipse\",game_name:\"ECLIPSE\",game_server_name:q(\"newAllianceServer\").value},AUTH_TOKEN)}\nfunction createGuildUI(btn){busy(btn,\"길드 생성 중\");google.script.run.withSuccessHandler(function(r){done(btn);toast(r.message);q(\"newGuildName\").value=\"\";q(\"newGuildServer\").value=\"\";q(\"newGuildTag\").value=\"\";q(\"newGuildRole\").value=\"\";openAdmin();loadAlliance(CURRENT_ALLIANCE,false)}).withFailureHandler(failBtn(btn)).createGuildWorkspace({alliance_id:q(\"newGuildAlliance\").value,guild_name:q(\"newGuildName\").value,server_name:q(\"newGuildServer\").value,discord_tag:q(\"newGuildTag\").value,discord_role_name:q(\"newGuildRole\").value,discord_display_format:q(\"newGuildFormat\").value},AUTH_TOKEN)}\nfunction adminBossTypeChanged(){\n  var type=q(\"adminBossType\").value;\n  q(\"adminBossCooldown\").classList.toggle(\"hidden\",type!==\"cooldown\");\n  q(\"adminBossFixed\").classList.toggle(\"hidden\",type!==\"fixed\");\n  q(\"adminBossWeekly\").classList.toggle(\"hidden\",type!==\"weekly\");\n}\nfunction createBossUI(btn){\n  if(!canConfigureBossUI()){toast(\"보스 설정 권한이 필요합니다.\",\"error\");return}\n  if(!isSuperAdminUI()&&Number(AUTH&&AUTH.alliance_level||0)<70&&q(\"adminBossScope\").value!==\"SERVER\"){toast(\"길드 운영진은 자기 서버 보스만 설정할 수 있습니다.\",\"error\");return}\n  busy(btn,\"보스 등록 중\");\n  var type=q(\"adminBossType\").value,time=\"\";\n  if(type===\"cooldown\")time=q(\"adminBossTime\").value;\n  else if(type===\"fixed\")time=q(\"adminBossFixedTime\").value;\n  else if(type===\"weekly\")time=q(\"adminBossWeeklyDay\").value+\"@\"+q(\"adminBossWeeklyTime\").value;\n  var scope=q(\"adminBossScope\").value;\n  google.script.run.withSuccessHandler(function(r){\n    done(btn);toast(r.message);\n    q(\"adminBossName\").value=\"\";\n    q(\"adminBossTime\").value=\"\";\n    q(\"adminBossFixedTime\").value=\"\";\n    q(\"adminBossWeeklyTime\").value=\"00:00\";\n    loadAlliance(CURRENT_ALLIANCE,false)\n  }).withFailureHandler(failBtn(btn)).saveAllianceBoss(CURRENT_ALLIANCE,{\n    boss_name:q(\"adminBossName\").value,boss_type:type,boss_scope:scope,\n    server_id:scope===\"SERVER\"?q(\"adminBossServer\").value:\"\",\n    time_value:time,notify_enabled:true,alert_10m:true,alert_5m:true,alert_1m:true,alert_spawn:true,\n    attendance_enabled:q(\"adminBossAttendance\").checked\n  },AUTH_TOKEN)\n}\n\nfunction issueAllianceLeaderPinUI(allianceId,allianceName,btn){\n  if(!isSuperAdminUI()){toast(\"최고관리자 권한이 필요합니다.\",\"error\");return}\n  if(!confirm((allianceName||allianceId)+\" 연합의 최초 연합장 PIN을 발급할까요?\\n\\n새 PIN을 발급하면 이전 미사용 PIN은 폐기됩니다.\"))return;\n  busy(btn,\"PIN 발급 중\");\n  google.script.run.withSuccessHandler(function(r){\n    done(btn);\n    alert(\"연합장 최초 PIN 발급 완료\\n\\n연합: \"+(r.alliance_name||allianceName||allianceId)+\"\\nPIN: \"+r.pin+\"\\n유효시간: 24시간 · 1회용\\n\\n연합장은 먼저 Discord/Kakao 자기등록을 완료한 뒤 웹 로그인에서 '연합장 최초 등록'을 선택해 사용합니다.\");\n  }).withFailureHandler(failBtn(btn)).issueAllianceLeaderBootstrapPin(allianceId,AUTH_TOKEN)\n}\n\nfunction changeAllianceNameUI(btn){\n  var current=(ALLIANCE_DATA.alliance&&ALLIANCE_DATA.alliance.alliance_name)||\"\";\n  var name=prompt(\"새 연합명을 입력하세요.\",current);\n  if(name===null)return;\n  name=String(name||\"\").trim();\n  if(!name){toast(\"연합명을 입력하세요.\",\"error\");return}\n  if(name===current){toast(\"현재 연합명과 같습니다.\",\"error\");return}\n  busy(btn,\"연합명 변경 중\");\n  google.script.run.withSuccessHandler(function(r){\n    done(btn);\n    toast(r.message);\n    if(ALLIANCE_DATA.alliance)ALLIANCE_DATA.alliance.alliance_name=r.alliance_name;\n    loadAlliance(CURRENT_ALLIANCE,false);\n    openAdmin();\n  }).withFailureHandler(failBtn(btn)).renameAlliance(CURRENT_ALLIANCE,name,AUTH_TOKEN)\n}\n\nfunction changeGuildNameUI(guildId,currentName,btn){\n  var name=prompt(\"새 길드명을 입력하세요.\",currentName||\"\");\n  if(name===null)return;\n  name=String(name||\"\").trim();\n  if(!name){toast(\"길드명을 입력하세요.\",\"error\");return}\n  if(name===String(currentName||\"\")){toast(\"현재 길드명과 같습니다.\",\"error\");return}\n  busy(btn,\"길드명 변경 중\");\n  google.script.run.withSuccessHandler(function(r){\n    done(btn);\n    toast(r.message);\n    loadAlliance(CURRENT_ALLIANCE,false);\n    openAdmin();\n  }).withFailureHandler(failBtn(btn)).renameGuild(guildId,name,AUTH_TOKEN)\n}\n\nfunction changeGuildServerUI(guildId,currentName,btn){\n  var name=prompt(\"이 길드가 소속된 게임 서버명을 입력하세요.\",currentName||\"\");\n  if(name===null)return;name=String(name||\"\").trim();if(!name){toast(\"서버명을 입력하세요.\",\"error\");return}\n  busy(btn,\"서버 변경 중\");\n  google.script.run.withSuccessHandler(function(r){done(btn);toast(r.message);openAdmin();loadAlliance(CURRENT_ALLIANCE,false)}).withFailureHandler(failBtn(btn)).updateGuildServer(guildId,name,AUTH_TOKEN)\n}\n\nfunction adminAction(action,id,btn){\n  busy(btn,\"처리 중\");\n  var runner=google.script.run.withSuccessHandler(function(r){done(btn);toast(r.message||\"처리했습니다.\");if(action.indexOf(\"alliance\")>=0){openAdmin();if(String(id)===String(CURRENT_ALLIANCE)&&action===\"off-alliance\"){var next=(ADMIN_DATA.alliances||[]).find(function(a){return String(a.status||\"active\")===\"active\"&&String(a.alliance_id)!==String(id)});if(next)loadAlliance(next.alliance_id,true)}}else{openAdmin();loadAlliance(CURRENT_ALLIANCE,false)}}).withFailureHandler(failBtn(btn));\n  if(action===\"off-guild\")runner.deactivateGuild(id,AUTH_TOKEN);else if(action===\"restore-guild\")runner.restoreGuild(id,AUTH_TOKEN);else if(action===\"off-alliance\")runner.deactivateAlliance(id,AUTH_TOKEN);else if(action===\"restore-alliance\")runner.restoreAlliance(id,AUTH_TOKEN)\n}\n\nfunction permanentDeleteGuildUI(id,name,btn){\n  var expected=name+\" 완전삭제\";\n  var typed=prompt(\"길드 데이터와 연결 시트를 완전제거합니다.\\\\n되돌릴 수 없습니다.\\\\n\\\\n확인을 위해 아래 문구를 그대로 입력하세요.\\\\n\"+expected,\"\");\n  if(typed===null)return;\n  if(typed!==expected){toast(\"확인 문구가 일치하지 않습니다.\",\"error\");return}\n  busy(btn,\"완전제거 중\");\n  google.script.run.withSuccessHandler(function(r){done(btn);toast(r.message);openAdmin();loadAlliance(CURRENT_ALLIANCE,false)}).withFailureHandler(failBtn(btn)).deleteGuildPermanently(id,typed,AUTH_TOKEN)\n}\nfunction permanentDeleteAllianceUI(id,name,btn){\n  var expected=name+\" 완전삭제\";\n  var typed=prompt(\"연합 데이터와 연결 시트를 완전제거합니다.\\\\n소속 길드가 남아 있으면 삭제되지 않습니다.\\\\n되돌릴 수 없습니다.\\\\n\\\\n확인을 위해 아래 문구를 그대로 입력하세요.\\\\n\"+expected,\"\");\n  if(typed===null)return;\n  if(typed!==expected){toast(\"확인 문구가 일치하지 않습니다.\",\"error\");return}\n  busy(btn,\"완전제거 중\");\n  google.script.run.withSuccessHandler(function(r){done(btn);toast(r.message);google.script.run.withSuccessHandler(function(data){ADMIN_DATA=data||ADMIN_DATA;var next=(ADMIN_DATA.alliances||[]).find(function(a){return String(a.status||\"active\")===\"active\"});if(next){rememberCurrentAlliance(next.alliance_id);loadAlliance(CURRENT_ALLIANCE,true)}else{renderAdmin();showScreen(\"admin\")}}).withFailureHandler(fail).getAdminStructure(AUTH_TOKEN)}).withFailureHandler(failBtn(btn)).deleteAlliancePermanently(id,typed,AUTH_TOKEN)\n}\n\nvar now=new Date(),end=todayISO(now),start=monthStartDate();q(\"statsStart\").value=start;q(\"statsEnd\").value=end;q(\"setStart\").value=start;q(\"setEnd\").value=end;\nfunction actionTarget_(node){\n  while(node&&node!==document){\n    if(node.id===\"authBtn\"||node.id===\"adminBtn\")return node;\n    if(node.hasAttribute&&(\n      node.hasAttribute(\"data-home-open\")||node.hasAttribute(\"data-home-guild\")||node.hasAttribute(\"data-att-event\")||\n      node.hasAttribute(\"data-open\")||node.hasAttribute(\"data-guild\")||\n      node.hasAttribute(\"data-boss-now\")||node.hasAttribute(\"data-boss-past\")||\n      node.hasAttribute(\"data-boss-spawn\")||node.hasAttribute(\"data-boss-close\")||node.hasAttribute(\"data-boss-delete\")||\n      node.hasAttribute(\"data-loot-sell\")||node.hasAttribute(\"data-loot-delete\")||node.hasAttribute(\"data-member-pin\")||node.hasAttribute(\"data-member-delete\")||node.hasAttribute(\"data-fund-delete\")||\n      node.hasAttribute(\"data-member-role\")||node.hasAttribute(\"data-member-alliance-role\")||node.hasAttribute(\"data-alliance-leader-pin\")||node.hasAttribute(\"data-guild-rename\")||node.hasAttribute(\"data-guild-server\")||node.hasAttribute(\"data-open-alliance\")||\n      node.hasAttribute(\"data-off-alliance\")||node.hasAttribute(\"data-restore-alliance\")||\n      node.hasAttribute(\"data-delete-alliance\")||node.hasAttribute(\"data-off-guild\")||\n      node.hasAttribute(\"data-restore-guild\")||node.hasAttribute(\"data-delete-guild\")\n    ))return node;\n    node=node.parentElement;\n  }\n  return null;\n}\n\ndocument.addEventListener(\"click\",function(e){\n  USER_INTERACTED=true;\n  if(AUTO_REFRESH_TIMER){clearTimeout(AUTO_REFRESH_TIMER);AUTO_REFRESH_TIMER=null}\n  var t=actionTarget_(e.target);\n  if(!t)return;\n  if(t.id===\"authBtn\"){openLogin();return}\n  if(t.id===\"adminBtn\"){openAdmin();return}\n  if(t.hasAttribute(\"data-home-open\")){openAllianceScreen(t.getAttribute(\"data-home-open\"));return}\n  if(t.hasAttribute(\"data-home-guild\")){openGuild(t.getAttribute(\"data-home-guild\"));return}\n  if(t.hasAttribute(\"data-att-event\")){openAttendanceEvent(t.getAttribute(\"data-att-event\"));return}\n  if(t.hasAttribute(\"data-open\")){openAllianceScreen(t.getAttribute(\"data-open\"));return}\n  if(t.hasAttribute(\"data-guild\")){openGuild(t.getAttribute(\"data-guild\"));return}\n  if(t.hasAttribute(\"data-boss-now\")){bossNowCut(t.getAttribute(\"data-boss-now\"),t);return}\n  if(t.hasAttribute(\"data-boss-past\")){bossPastCut(t.getAttribute(\"data-boss-past\"),t);return}\n  if(t.hasAttribute(\"data-boss-spawn\")){bossSpawnSet(t.getAttribute(\"data-boss-spawn\"),t);return}\n  if(t.hasAttribute(\"data-boss-close\")){bossAttendanceClose(t.getAttribute(\"data-boss-close\"),t);return}\n  if(t.hasAttribute(\"data-boss-delete\")){deleteBossUI(t.getAttribute(\"data-boss-delete\"),t.getAttribute(\"data-boss-delete-name\")||\"\",t);return}\n  if(t.hasAttribute(\"data-loot-sell\")){markLootSoldUI(t.getAttribute(\"data-loot-sell\"),t);return}\n  if(t.hasAttribute(\"data-loot-delete\")){deleteLootUI(t.getAttribute(\"data-loot-delete\"),t.getAttribute(\"data-loot-delete-name\")||\"\",t);return}\n  if(t.hasAttribute(\"data-member-delete\")){deleteGuildMemberUI(t.getAttribute(\"data-member-delete\"),t.getAttribute(\"data-member-delete-name\")||\"\",t);return}\n  if(t.hasAttribute(\"data-fund-delete\")){deleteFundTransactionUI(t.getAttribute(\"data-fund-delete\"),t);return}\n  if(t.hasAttribute(\"data-member-pin\")){resetMemberPinUI(t.getAttribute(\"data-member-pin\"),t);return}\n  if(t.hasAttribute(\"data-member-role\")){changeMemberRoleUI(t.getAttribute(\"data-member-role\"),t.getAttribute(\"data-member-role-now\")||\"길드원\",t);return}\n  if(t.hasAttribute(\"data-member-alliance-role\")){changeAllianceRoleUI(t.getAttribute(\"data-member-alliance-role\"),t.getAttribute(\"data-member-alliance-role-now\")||\"\",t);return}\n  if(t.hasAttribute(\"data-alliance-leader-pin\")){issueAllianceLeaderPinUI(t.getAttribute(\"data-alliance-leader-pin\"),t.getAttribute(\"data-alliance-leader-name\")||\"\",t);return}\n  if(t.hasAttribute(\"data-guild-rename\")){changeGuildNameUI(t.getAttribute(\"data-guild-rename\"),t.getAttribute(\"data-guild-rename-now\")||\"\",t);return}\n  if(t.hasAttribute(\"data-guild-server\")){changeGuildServerUI(t.getAttribute(\"data-guild-server\"),t.getAttribute(\"data-guild-server-now\")||\"\",t);return}\n  if(t.hasAttribute(\"data-open-alliance\")){rememberCurrentAlliance(t.getAttribute(\"data-open-alliance\"));loadAlliance(CURRENT_ALLIANCE,true);return}\n  if(t.hasAttribute(\"data-off-alliance\")){if(confirm(\"연합을 보관제거(비활성화)할까요? 데이터는 삭제되지 않습니다.\"))adminAction(\"off-alliance\",t.getAttribute(\"data-off-alliance\"),t);return}\n  if(t.hasAttribute(\"data-restore-alliance\")){adminAction(\"restore-alliance\",t.getAttribute(\"data-restore-alliance\"),t);return}\n  if(t.hasAttribute(\"data-delete-alliance\")){permanentDeleteAllianceUI(t.getAttribute(\"data-delete-alliance\"),t.getAttribute(\"data-delete-name\")||t.getAttribute(\"data-delete-alliance\"),t);return}\n  if(t.hasAttribute(\"data-off-guild\")){if(confirm(\"길드를 보관제거(비활성화)할까요? 과거 기록은 유지됩니다.\"))adminAction(\"off-guild\",t.getAttribute(\"data-off-guild\"),t);return}\n  if(t.hasAttribute(\"data-restore-guild\")){adminAction(\"restore-guild\",t.getAttribute(\"data-restore-guild\"),t);return}\n  if(t.hasAttribute(\"data-delete-guild\")){permanentDeleteGuildUI(t.getAttribute(\"data-delete-guild\"),t.getAttribute(\"data-delete-name\")||t.getAttribute(\"data-delete-guild\"),t);return}\n});\n\ndocument.addEventListener(\"change\",function(e){var t=e.target;if(t&&t.hasAttribute&&t.hasAttribute(\"data-att-member\")){setAttendanceMemberUI(t.getAttribute(\"data-att-member\"),t.checked,t)}});\nfunction bootGuildCore_(){\n  try{\n    lootStatusChanged();\n    adminBossTypeChanged();\n    adminBossScopeChanged();\n    updateDisplayPreview();\n    loginModeChanged();\n    restoreAuthSession();\n\n    var INITIAL_HOME_DATA=null;\n    if(INITIAL_HOME_DATA_ENCODED){\n      try{INITIAL_HOME_DATA=JSON.parse(decodeURIComponent(INITIAL_HOME_DATA_ENCODED))}catch(e){INITIAL_HOME_DATA=null}\n    }\n    if(INITIAL_HOME_DATA&&INITIAL_HOME_DATA.alliance&&String(INITIAL_HOME_DATA.alliance.alliance_id||\"\")!==String(CURRENT_ALLIANCE||\"\")){\n      INITIAL_HOME_DATA=null;\n    }\n    if(!INITIAL_HOME_DATA){INITIAL_HOME_DATA=storageGet(allianceCacheKey(CURRENT_ALLIANCE))}\n    if(INITIAL_HOME_DATA&&INITIAL_HOME_DATA.alliance&&String(INITIAL_HOME_DATA.alliance.alliance_id||\"\")===String(CURRENT_ALLIANCE||\"\")){\n      ALLIANCE_DATA=INITIAL_HOME_DATA;\n      rememberCurrentAlliance(INITIAL_HOME_DATA.alliance.alliance_id||CURRENT_ALLIANCE);\n      storageSet(allianceCacheKey(CURRENT_ALLIANCE),ALLIANCE_DATA);\n      renderAlliance();\n      showAllianceHome();\n      AUTO_REFRESH_TIMER=setTimeout(function(){\n        if(!USER_INTERACTED&&CURRENT_SCREEN===\"allianceHome\")loadAlliance(CURRENT_ALLIANCE,false);\n      },8000);\n    }else{\n      loadAlliance(CURRENT_ALLIANCE,true);\n    }\n  }catch(e){\n    try{console.error(\"GuildCore boot error\",e)}catch(_){}\n    try{\n      var t=q(\"toast\");\n      if(t){t.className=\"error\";t.textContent=\"⚠️ 화면 초기화 오류: \"+((e&&e.message)?e.message:String(e));t.style.display=\"block\"}\n    }catch(_){}\n  }\n}\n\nif(document.readyState===\"loading\")document.addEventListener(\"DOMContentLoaded\",bootGuildCore_);\nelse bootGuildCore_();\n</script>\n</body>\n</html>";

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}

function nowIso() { return new Date().toISOString(); }
function toIso(v) {
  if (!v) return "";
  const d = v instanceof Date ? v : new Date(v);
  return Number.isNaN(d.getTime()) ? "" : d.toISOString();
}
function boolVal(v, def = false) {
  if (v === null || v === undefined || v === "") return def;
  if (typeof v === "boolean") return v;
  if (typeof v === "number") return v !== 0;
  return !["false","0","no","off","n"].includes(String(v).trim().toLowerCase());
}
function bint(v, def = false) { return boolVal(v, def) ? 1 : 0; }
function uid(prefix) { return `${prefix}_${crypto.randomUUID().replaceAll("-", "")}`; }
function fmtSeq(prefix, n) { return `${prefix}_${String(Number(n)).padStart(3, "0")}`; }
function errorMessage(e) { return e && e.message ? e.message : String(e); }

async function all(db, sql, ...args) {
  const r = await db.prepare(sql).bind(...args).all();
  return r.results || [];
}
async function first(db, sql, ...args) {
  return await db.prepare(sql).bind(...args).first();
}
async function run(db, sql, ...args) {
  return await db.prepare(sql).bind(...args).run();
}

async function nextSequence(db, name) {
  await run(db, "INSERT OR IGNORE INTO sequences(name,value) VALUES(?,0)", name);
  await run(db, "UPDATE sequences SET value=value+1 WHERE name=?", name);
  const row = await first(db, "SELECT value FROM sequences WHERE name=?", name);
  return Number(row?.value || 1);
}

function normalizeGuildRole(role) {
  const r = String(role || "").trim();
  if (["길드장","부길드장","운영진","길드원"].includes(r)) return r;
  return "길드원";
}
function guildRoleLevel(role) {
  const r = normalizeGuildRole(role);
  return r === "길드장" ? 40 : r === "부길드장" ? 30 : r === "운영진" ? 20 : 10;
}
function normalizeAllianceRole(role) {
  const r = String(role || "").trim();
  return r === "연합장" || r === "연합운영진" ? r : "";
}
function allianceRoleLevel(role) {
  const r = normalizeAllianceRole(role);
  return r === "연합장" ? 80 : r === "연합운영진" ? 70 : 0;
}

function discordGuildPositionRole_(role) {
  const r = normalizeGuildRole(role);
  if (r === "길드장") return "길드장";
  if (r === "부길드장") return "부길드장";
  if (r === "운영진") return "길드운영진";
  return "";
}
function publicAuth(ctx) {
  if (!ctx) return {logged_in:false,role:"게스트",level:0,alliance_role:"",alliance_level:0,is_superadmin:false,alliance_id:"",guild_id:"",member_id:"",nickname:"",server_id:"",server_name:""};
  return {
    logged_in:true,
    role:String(ctx.role || "길드원"),
    level:Number(ctx.level || 0),
    alliance_role:String(ctx.alliance_role || ""),
    alliance_level:Number(ctx.alliance_level || 0),
    is_superadmin:Boolean(ctx.is_superadmin),
    alliance_id:String(ctx.alliance_id || ""),
    guild_id:String(ctx.guild_id || ""),
    member_id:String(ctx.member_id || ""),
    nickname:String(ctx.nickname || ""),
    server_id:String(ctx.server_id || ""),
    server_name:String(ctx.server_name || "")
  };
}

async function sha256Hex(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(String(text)));
  return [...new Uint8Array(buf)].map(x => x.toString(16).padStart(2,"0")).join("");
}
function randomPin() {
  const a = new Uint32Array(1);
  crypto.getRandomValues(a);
  return String(100000 + (a[0] % 900000));
}

async function ensureWebLoginCodeSchema_(env) {
  await run(env.DB, "CREATE TABLE IF NOT EXISTS web_login_codes(code_hash TEXT PRIMARY KEY,purpose TEXT NOT NULL,alliance_id TEXT NOT NULL DEFAULT '',guild_id TEXT NOT NULL DEFAULT '',member_id TEXT NOT NULL DEFAULT '',source TEXT NOT NULL DEFAULT '',issued_by TEXT NOT NULL DEFAULT '',created_at TEXT NOT NULL,expires_at TEXT NOT NULL,used_at TEXT NOT NULL DEFAULT '')");
  await run(env.DB, "CREATE INDEX IF NOT EXISTS idx_web_login_codes_member ON web_login_codes(member_id,purpose,expires_at)");
  await run(env.DB, "CREATE INDEX IF NOT EXISTS idx_web_login_codes_alliance ON web_login_codes(alliance_id,purpose,expires_at)");
}
function webPinPepper_(env) {
  return String(env.GUILDCORE_API_KEY || env.BOT_API_KEY || env.GUILDCORE_BRIDGE_KEY || env.SUPERADMIN_PIN || "guildcore-web-login");
}
async function webLoginCodeHash_(env,purpose,pin) {
  return await sha256Hex(`web:${String(purpose||"login")}:${String(pin||"").trim()}:${webPinPepper_(env)}`);
}
async function createWebLoginCode_(env,{purpose,alliance_id="",guild_id="",member_id="",source="",issued_by="",minutes=10}={}) {
  await ensureWebLoginCodeSchema_(env);
  const now=new Date(),nowS=now.toISOString(),exp=new Date(now.getTime()+Math.max(1,Number(minutes||10))*60000).toISOString();
  await run(env.DB,"DELETE FROM web_login_codes WHERE expires_at<?",new Date(now.getTime()-86400000).toISOString());
  if(member_id)await run(env.DB,"UPDATE web_login_codes SET used_at=? WHERE member_id=? AND purpose=? AND used_at=''",nowS,String(member_id),String(purpose));
  else if(alliance_id)await run(env.DB,"UPDATE web_login_codes SET used_at=? WHERE alliance_id=? AND purpose=? AND used_at=''",nowS,String(alliance_id),String(purpose));
  for(let i=0;i<8;i++){
    const pin=randomPin(),hash=await webLoginCodeHash_(env,purpose,pin);
    if(await first(env.DB,"SELECT 1 FROM web_login_codes WHERE code_hash=?",hash))continue;
    await run(env.DB,"INSERT INTO web_login_codes(code_hash,purpose,alliance_id,guild_id,member_id,source,issued_by,created_at,expires_at,used_at) VALUES(?,?,?,?,?,?,?,?,?,'')",hash,String(purpose),String(alliance_id),String(guild_id),String(member_id),String(source),String(issued_by),nowS,exp);
    return {pin,expires_at:exp};
  }
  throw new Error("PIN 생성에 실패했습니다. 다시 시도하세요.");
}
async function findWebLoginCode_(env,purpose,pin) {
  const value=String(pin||"").trim();
  if(!/^\d{6}$/.test(value))throw new Error("6자리 PIN을 입력하세요.");
  await ensureWebLoginCodeSchema_(env);
  const hash=await webLoginCodeHash_(env,purpose,value),nowS=nowIso();
  const row=await first(env.DB,"SELECT * FROM web_login_codes WHERE code_hash=? AND purpose=? AND used_at='' AND expires_at>?",hash,String(purpose),nowS);
  if(!row)throw new Error("PIN이 올바르지 않거나 만료되었습니다. 새 PIN을 발급하세요.");
  return {...row,_code_hash:hash};
}
async function markWebLoginCodeUsed_(env,row) {
  const hash=String(row?._code_hash||row?.code_hash||"");
  const u=await run(env.DB,"UPDATE web_login_codes SET used_at=? WHERE code_hash=? AND used_at=''",nowIso(),hash);
  if(Number(u?.meta?.changes||0)<1)throw new Error("이미 사용된 PIN입니다. 새 PIN을 발급하세요.");
}
async function consumeWebLoginCode_(env,purpose,pin) {
  const row=await findWebLoginCode_(env,purpose,pin);
  await markWebLoginCodeUsed_(env,row);
  return row;
}
async function memberContextById_(env,memberId,guildId="") {
  const member=guildId
    ? await first(env.DB,"SELECT * FROM members WHERE member_id=? AND guild_id=? AND status='활성'",String(memberId),String(guildId))
    : await first(env.DB,"SELECT * FROM members WHERE member_id=? AND status='활성'",String(memberId));
  if(!member)throw new Error("활성 길드원 정보를 찾을 수 없습니다.");
  const guild=await guildMeta(env,member.guild_id),srv=await serverMeta(env,guild.alliance_id,guild.server_id);
  const role=normalizeGuildRole(member.role),ar=normalizeAllianceRole(member.alliance_role);
  return {role,level:guildRoleLevel(role),alliance_role:ar,alliance_level:allianceRoleLevel(ar),is_superadmin:false,alliance_id:guild.alliance_id,guild_id:guild.guild_id,member_id:member.member_id,nickname:member.nickname,server_id:guild.server_id||"",server_name:srv?.server_name||guild.game_server_name||""};
}
async function issueMemberSelfWebPin_(env,memberId,source="self") {
  const ctx=await memberContextById_(env,memberId);
  const code=await createWebLoginCode_(env,{purpose:"member_self",alliance_id:ctx.alliance_id,guild_id:ctx.guild_id,member_id:ctx.member_id,source,issued_by:source,minutes:10});
  return {ok:true,pin:code.pin,expires_at:code.expires_at,member_id:ctx.member_id,nickname:ctx.nickname,guild_id:ctx.guild_id,alliance_id:ctx.alliance_id};
}
async function issueAllianceLeaderBootstrapPin(env,allianceId,authToken) {
  await requireSuperAdmin(env,authToken);
  const a=await allianceMeta(env,allianceId);
  const code=await createWebLoginCode_(env,{purpose:"alliance_leader_bootstrap",alliance_id:a.alliance_id,source:"superadmin",issued_by:"superadmin",minutes:24*60});
  return {ok:true,pin:code.pin,expires_at:code.expires_at,alliance_id:a.alliance_id,alliance_name:a.alliance_name};
}

async function ensureBootstrap(env) {
  const db = env.DB;
  const count = await first(db, "SELECT COUNT(*) AS c FROM alliances");
  if (Number(count?.c || 0) > 0) return;
  const now = nowIso();
  await db.batch([
    db.prepare("INSERT OR REPLACE INTO sequences(name,value) VALUES('alliance',1)"),
    db.prepare("INSERT OR IGNORE INTO alliances(alliance_id,alliance_name,game_id,game_name,game_server_name,status,created_at,updated_at,schema_version) VALUES('alliance_001','연합','eclipse','ECLIPSE','기본서버','active',?,?, '6.0')").bind(now,now),
    db.prepare("INSERT OR IGNORE INTO alliance_servers(alliance_id,server_id,server_name,enabled,created_at,updated_at,note) VALUES('alliance_001','server_001','기본서버',1,?,?, '')").bind(now,now)
  ]);
}

async function allianceMeta(env, id, allowInactive = false) {
  const r = await first(env.DB, "SELECT * FROM alliances WHERE alliance_id=?", String(id));
  if (!r) throw new Error("연합을 찾을 수 없습니다: " + id);
  if (!allowInactive && String(r.status || "active") !== "active") throw new Error("현재 비활성화된 연합입니다.");
  return r;
}
async function guildMeta(env, id, allowInactive = false) {
  const r = await first(env.DB, "SELECT * FROM guilds WHERE guild_id=?", String(id));
  if (!r) throw new Error("길드를 찾을 수 없습니다: " + id);
  if (!allowInactive && String(r.status || "active") !== "active") throw new Error("현재 비활성화된 길드입니다.");
  return r;
}
async function activeGuilds(env, allianceId) {
  return await all(env.DB, "SELECT * FROM guilds WHERE alliance_id=? AND status='active' ORDER BY created_at, guild_id", String(allianceId));
}
async function ensureAllianceServer(env, allianceId, name) {
  const n = String(name || "").trim() || "기본서버";
  let row = await first(env.DB, "SELECT * FROM alliance_servers WHERE alliance_id=? AND server_name=? AND enabled=1", String(allianceId), n);
  if (row) return row;
  const rows = await all(env.DB, "SELECT server_id FROM alliance_servers WHERE alliance_id=?", String(allianceId));
  let max = 0;
  for (const x of rows) {
    const m = String(x.server_id || "").match(/^server_(\d+)$/);
    if (m) max = Math.max(max, Number(m[1]));
  }
  const serverId = fmtSeq("server", max + 1);
  const now = nowIso();
  await run(env.DB, "INSERT INTO alliance_servers(alliance_id,server_id,server_name,enabled,created_at,updated_at,note) VALUES(?,?,?,?,?,?,?)", String(allianceId), serverId, n, 1, now, now, "");
  return {alliance_id:String(allianceId),server_id:serverId,server_name:n,enabled:1,created_at:now,updated_at:now,note:""};
}
async function serverMeta(env, allianceId, serverId) {
  if (!serverId) return null;
  return await first(env.DB, "SELECT * FROM alliance_servers WHERE alliance_id=? AND server_id=? AND enabled=1", String(allianceId), String(serverId));
}

function kstParts(date = new Date()) {
  const d = new Date(date.getTime() + KST_MS);
  return {y:d.getUTCFullYear(),m:d.getUTCMonth()+1,day:d.getUTCDate(),hh:d.getUTCHours(),mm:d.getUTCMinutes(),ss:d.getUTCSeconds(),dow:d.getUTCDay()};
}
function kstDateToUtc(y,m,d,hh,mm,ss=0) {
  return new Date(Date.UTC(y,m-1,d,hh,mm,ss) - KST_MS);
}
function formatKst(value, withSeconds = true) {
  if (!value) return "";
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return String(value || "");
  const p = kstParts(d), z=n=>String(n).padStart(2,"0");
  return `${p.y}-${z(p.m)}-${z(p.day)} ${z(p.hh)}:${z(p.mm)}${withSeconds?":"+z(p.ss):""}`;
}
function normalizeClockInput_(value) {
  const s=String(value||"").trim();
  return /^\d{4}$/.test(s)?`${s.slice(0,2)}:${s.slice(2)}`:s;
}
function isClockInput_(value) {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(normalizeClockInput_(value));
}
function parseLocalDateTime(value, now = new Date()) {
  const raw = String(value || "").trim();
  let m = raw.match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})(?::(\d{2}))?$/);
  if (m) return kstDateToUtc(Number(m[1]),Number(m[2]),Number(m[3]),Number(m[4]),Number(m[5]),Number(m[6]||0));
  const s=normalizeClockInput_(raw);
  m = s.match(/^([01]\d|2[0-3]):([0-5]\d)$/);
  if (m) {
    const p = kstParts(now);
    return kstDateToUtc(p.y,p.m,p.day,Number(m[1]),Number(m[2]),0);
  }
  if (/^\d{4}$/.test(raw) || /^\d{2}:\d{2}$/.test(raw)) return null;
  const d = new Date(raw);
  return Number.isNaN(d.getTime()) ? null : d;
}
function fixedTimes(value) {
  return String(value || "").split(",").map(x=>normalizeClockInput_(x)).filter(x=>isClockInput_(x));
}
function nextFixedSpawn(value, now = new Date()) {
  const times = fixedTimes(value);
  if (!times.length) return null;
  const p = kstParts(now);
  const candidates = times.map(t=>{
    const [hh,mm] = t.split(":").map(Number);
    return kstDateToUtc(p.y,p.m,p.day,hh,mm,0);
  }).sort((a,b)=>a-b);
  const f = candidates.find(d=>d.getTime() >= now.getTime());
  if (f) return f;
  const first = candidates[0];
  return new Date(first.getTime() + 86400000);
}
function parseWeekly(value) {
  const m = String(value || "").trim().toUpperCase().match(/^(SUN|MON|TUE|WED|THU|FRI|SAT)@(.+)$/);
  if (!m) return null;
  const time=normalizeClockInput_(m[2]);
  if(!isClockInput_(time))return null;
  const map={SUN:0,MON:1,TUE:2,WED:3,THU:4,FRI:5,SAT:6};
  return {code:m[1],dow:map[m[1]],time};
}
function nextWeeklySpawn(value, now = new Date()) {
  const s = parseWeekly(value);
  if (!s) return null;
  const p = kstParts(now);
  const [hh,mm] = s.time.split(":").map(Number);
  let delta = (s.dow - p.dow + 7) % 7;
  let candidate = kstDateToUtc(p.y,p.m,p.day + delta,hh,mm,0);
  if (candidate.getTime() < now.getTime()) candidate = new Date(candidate.getTime() + 7*86400000);
  return candidate;
}
function scheduledNext(boss, now = new Date()) {
  if (boss.boss_type === "fixed") return nextFixedSpawn(boss.fixed_times, now);
  if (boss.boss_type === "weekly") return nextWeeklySpawn(boss.fixed_times, now);
  return null;
}
function scheduledCandidates(boss, now = new Date()) {
  const next = scheduledNext(boss, new Date(now.getTime() - 11*60000));
  const arr=[];
  if (next) arr.push(next);
  const next2 = scheduledNext(boss, new Date((next || now).getTime()+60000));
  if (next2 && (!next || next2.getTime() !== next.getTime())) arr.push(next2);
  return arr;
}

async function createSession(env, ctx) {
  const token = crypto.randomUUID().replaceAll("-","") + crypto.randomUUID().replaceAll("-","");
  const now = new Date(), exp = new Date(now.getTime()+SESSION_DAYS*86400000);
  await run(env.DB, "INSERT INTO sessions(token,context_json,created_at,expires_at) VALUES(?,?,?,?)", token, JSON.stringify(ctx), now.toISOString(), exp.toISOString());
  return token;
}
async function getSession(env, token) {
  const t = String(token || "").trim();
  if (!t) return null;
  const row = await first(env.DB, "SELECT * FROM sessions WHERE token=?", t);
  if (!row) return null;
  if (new Date(row.expires_at).getTime() <= Date.now()) {
    await run(env.DB, "DELETE FROM sessions WHERE token=?", t);
    return null;
  }
  try { return JSON.parse(row.context_json); } catch { return null; }
}
async function refreshContext(env, ctx) {
  if (!ctx) return null;
  if (ctx.is_superadmin) return {...ctx,role:"최고관리자",level:100,alliance_level:100};
  const member = await first(env.DB, "SELECT * FROM members WHERE member_id=? AND guild_id=? AND status='활성'", String(ctx.member_id), String(ctx.guild_id));
  if (!member) throw new Error("길드원 계정이 더 이상 활성 상태가 아닙니다.");
  const guild = await guildMeta(env, ctx.guild_id);
  const srv = await serverMeta(env, guild.alliance_id, guild.server_id);
  const role=normalizeGuildRole(member.role), ar=normalizeAllianceRole(member.alliance_role);
  return {role,level:guildRoleLevel(role),alliance_role:ar,alliance_level:allianceRoleLevel(ar),is_superadmin:false,alliance_id:guild.alliance_id,guild_id:guild.guild_id,member_id:member.member_id,nickname:member.nickname,server_id:guild.server_id||"",server_name:srv?.server_name||guild.game_server_name||""};
}
async function requireLogin(env, token) {
  const ctx = await getSession(env, token);
  if (!ctx) throw new Error("로그인이 필요합니다.");
  return await refreshContext(env, ctx);
}
async function requireSuperAdmin(env, token) {
  const ctx=await requireLogin(env,token); if(!ctx.is_superadmin)throw new Error("최고관리자 권한이 필요합니다."); return ctx;
}
async function requireGuildMember(env, token, guildId) {
  const ctx=await requireLogin(env,token); if(ctx.is_superadmin)return ctx; if(String(ctx.guild_id)!==String(guildId))throw new Error("현재 로그인한 길드에서만 사용할 수 있습니다."); return ctx;
}
async function requireGuildOperate(env, token, guildId) {
  const ctx=await requireGuildMember(env,token,guildId); if(ctx.is_superadmin)return ctx; if(Number(ctx.level)<20)throw new Error("운영진 이상 권한이 필요합니다."); return ctx;
}
async function requireAllianceOperate(env, token, allianceId) {
  const ctx=await requireLogin(env,token); if(ctx.is_superadmin)return ctx; if(String(ctx.alliance_id)!==String(allianceId))throw new Error("소속 연합에서만 수정할 수 있습니다."); if(Number(ctx.alliance_level)<70)throw new Error("연합운영진 이상 권한이 필요합니다."); return ctx;
}
async function requireAllianceLeader(env, token, allianceId) {
  const ctx=await requireLogin(env,token); if(ctx.is_superadmin)return ctx; if(String(ctx.alliance_id)!==String(allianceId)||String(ctx.alliance_role)!=="연합장")throw new Error("연합장 권한이 필요합니다."); return ctx;
}
async function requireBossActionMember(env, token, allianceId, bossScope, serverId) {
  const ctx=await requireLogin(env,token);
  if(ctx.is_superadmin)return ctx;
  if(String(ctx.alliance_id)!==String(allianceId))throw new Error("소속 연합에서만 사용할 수 있습니다.");
  if(Number(ctx.level)<10)throw new Error("등록된 길드원만 사용할 수 있습니다.");
  if(String(bossScope||"WORLD").toUpperCase()==="SERVER"&&String(ctx.server_id||"")!==String(serverId||""))throw new Error("자기 서버 보스만 사용할 수 있습니다.");
  return ctx;
}
async function requireBossConfigScope(env, token, allianceId, bossScope, serverId) {
  const ctx=await requireLogin(env,token);
  if(ctx.is_superadmin)return ctx;
  if(String(ctx.alliance_id)!==String(allianceId))throw new Error("소속 연합에서만 수정할 수 있습니다.");
  if(Number(ctx.alliance_level)>=70)return ctx;
  if(String(bossScope||"WORLD").toUpperCase()==="SERVER"&&Number(ctx.level)>=20&&String(ctx.server_id||"")===String(serverId||""))return ctx;
  if(String(bossScope||"WORLD").toUpperCase()==="WORLD")throw new Error("월드보스 설정은 연합장/연합운영진만 가능합니다.");
  throw new Error("자기 서버의 길드장/부길드장/길드운영진만 서버보스를 설정할 수 있습니다.");
}
async function requireBossAttendanceOperate(env, token, allianceId, bossScope, serverId) {
  const ctx=await requireLogin(env,token);
  if(ctx.is_superadmin)return ctx;
  if(String(ctx.alliance_id)!==String(allianceId))throw new Error("소속 연합에서만 수정할 수 있습니다.");
  if(Number(ctx.alliance_level)>=70)return ctx;
  if(String(bossScope||"WORLD").toUpperCase()==="SERVER"&&Number(ctx.level)>=20&&String(ctx.server_id||"")===String(serverId||""))return ctx;
  throw new Error("출석 종료/정정은 연합운영진 또는 자기 서버 길드 운영진 이상만 가능합니다.");
}
function assertCanManageMember(ctx,targetRole){if(ctx.is_superadmin)return; if(Number(ctx.level)<=guildRoleLevel(targetRole))throw new Error("본인과 같거나 높은 직급은 관리할 수 없습니다.");}
function assertCanAssignRole(ctx,role){const raw=String(role||"").trim();if(!["길드장","부길드장","운영진","길드원"].includes(raw))throw new Error("직급이 올바르지 않습니다.");const target=normalizeGuildRole(raw);if(ctx.is_superadmin)return target;if(Number(ctx.level)>=40){if(target==="길드장")throw new Error("길드장은 자기 길드의 부길드장·운영진·길드원만 지정할 수 있습니다.");return target;}if(target!=="길드원")throw new Error("직책 임명은 길드장만 할 수 있습니다.");return target;}

async function webLogin(env,payload={}){
  const mode=String(payload.mode||"selfpin");
  if(mode==="superadmin"){
    const pin=String(payload.pin||"").trim();
    if(!env.SUPERADMIN_PIN)throw new Error("Worker 환경변수 SUPERADMIN_PIN을 먼저 설정하세요.");
    if(!pin||pin!==String(env.SUPERADMIN_PIN))throw new Error("최고관리자 PIN이 올바르지 않습니다.");
    const ctx={role:"최고관리자",level:100,alliance_role:"",alliance_level:100,is_superadmin:true,alliance_id:"alliance_001",guild_id:"",member_id:"",nickname:"최고관리자",server_id:"",server_name:""};
    return {ok:true,token:await createSession(env,ctx),auth:publicAuth(ctx)};
  }
  if(mode==="selfpin"){
    const code=await consumeWebLoginCode_(env,"member_self",payload.pin);
    const ctx=await memberContextById_(env,code.member_id,code.guild_id);
    return {ok:true,token:await createSession(env,ctx),auth:publicAuth(ctx)};
  }
  if(mode==="alliance_leader"){
    const code=await findWebLoginCode_(env,"alliance_leader_bootstrap",payload.pin);
    const allianceId=String(code.alliance_id||"");
    const key=String(payload.guild_key||"").trim(),nickname=String(payload.nickname||"").trim();
    if(!key||!nickname)throw new Error("길드명과 게임 닉네임을 입력하세요.");
    const q=key.toLowerCase(),guilds=await activeGuilds(env,allianceId);
    let guild=guilds.find(x=>String(x.guild_id).toLowerCase()===q)||guilds.find(x=>String(x.guild_name||"").trim().toLowerCase()===q);
    if(!guild){const matches=guilds.filter(x=>String(x.guild_name||"").toLowerCase().includes(q));if(matches.length===1)guild=matches[0];}
    if(!guild)throw new Error("연합장 PIN이 발급된 연합에서 해당 길드를 찾을 수 없습니다.");
    const member=await first(env.DB,"SELECT * FROM members WHERE guild_id=? AND nickname=? AND status='활성'",guild.guild_id,nickname);
    if(!member)throw new Error("먼저 Discord/Kakao에서 자기등록을 완료하세요. 등록된 길드원 정보를 찾을 수 없습니다.");
    const leader=await first(env.DB,"SELECT m.member_id,m.nickname,g.guild_name FROM members m JOIN guilds g ON g.guild_id=m.guild_id WHERE g.alliance_id=? AND g.status='active' AND m.status='활성' AND m.alliance_role='연합장' LIMIT 1",allianceId);
    if(leader&&String(leader.member_id)!==String(member.member_id))throw new Error(`이미 연합장(${leader.nickname})이 지정되어 있습니다. 최고관리자가 기존 연합장 권한을 해제한 뒤 다시 진행하세요.`);
    await run(env.DB,"UPDATE members SET alliance_role='연합장' WHERE member_id=? AND guild_id=?",member.member_id,guild.guild_id);
    await markWebLoginCodeUsed_(env,code);
    const ctx=await memberContextById_(env,member.member_id,guild.guild_id);
    return {ok:true,token:await createSession(env,ctx),auth:publicAuth(ctx)};
  }
  const guildId=String(payload.guild_id||"").trim(), nickname=String(payload.nickname||"").trim(), pin=String(payload.pin||"").trim();
  if(!guildId||!nickname||!pin)throw new Error("길드, 닉네임, 복구 PIN을 입력하세요.");
  const member=await first(env.DB,"SELECT * FROM members WHERE guild_id=? AND nickname=? AND status='활성'",guildId,nickname);
  if(!member)throw new Error("등록된 길드원을 찾을 수 없습니다.");
  if(!boolVal(member.web_access_enabled,false)||!member.web_pin_hash)throw new Error("복구 PIN이 발급되지 않은 길드원입니다. Discord /웹핀 또는 카카오 !웹핀을 사용하세요.");
  if(await sha256Hex(`${member.member_id}:${pin}`)!==String(member.web_pin_hash))throw new Error("복구 PIN이 올바르지 않습니다.");
  const ctx=await memberContextById_(env,member.member_id,guildId);
  return {ok:true,token:await createSession(env,ctx),auth:publicAuth(ctx)};
}
async function webWhoAmI(env,token){const ctx=await getSession(env,token);if(!ctx)return publicAuth(null);try{const r=await refreshContext(env,ctx);await run(env.DB,"UPDATE sessions SET context_json=? WHERE token=?",JSON.stringify(r),String(token));return publicAuth(r)}catch{await run(env.DB,"DELETE FROM sessions WHERE token=?",String(token));return publicAuth(null)}}
async function webLogout(env,token){if(token)await run(env.DB,"DELETE FROM sessions WHERE token=?",String(token));return {ok:true};}

async function bossView(env,allianceId){
  const bosses=await all(env.DB,"SELECT * FROM bosses WHERE alliance_id=? AND enabled=1 ORDER BY created_at,boss_name",String(allianceId));
  const states=await all(env.DB,"SELECT * FROM boss_state WHERE alliance_id=?",String(allianceId));
  const events=await all(env.DB,"SELECT * FROM boss_events WHERE alliance_id=? AND attendance_status='open'",String(allianceId));
  const servers=await all(env.DB,"SELECT * FROM alliance_servers WHERE alliance_id=? AND enabled=1",String(allianceId));
  const stMap=Object.fromEntries(states.map(x=>[String(x.boss_id),x]));
  const evMap=Object.fromEntries(events.map(x=>[String(x.boss_id),x]));
  const svMap=Object.fromEntries(servers.map(x=>[String(x.server_id),x]));
  const now=new Date();
  return bosses.map(b=>{
    const st=stMap[String(b.boss_id)]||{}, ev=evMap[String(b.boss_id)]||null, sched=scheduledNext(b,now);
    const scope=String(b.boss_scope||"WORLD").toUpperCase()==="SERVER"?"SERVER":"WORLD";
    const next = sched ? sched.toISOString() : (st.next_spawn_at||"");
    const status=b.boss_type==="fixed"?(sched?"매일고정":"시간미설정"):(b.boss_type==="weekly"?(sched?"요일고정":"시간미설정"):(st.status||"미등록"));
    return {boss_id:b.boss_id,boss_name:b.boss_name,boss_type:b.boss_type,boss_scope:scope,server_id:scope==="SERVER"?String(b.server_id||""):"",server_name:scope==="SERVER"?(svMap[String(b.server_id)]?.server_name||String(b.server_id||"서버")):"월드",respawn_minutes:Number(b.respawn_minutes||0),fixed_times:b.fixed_times||"",last_kill_at:st.last_kill_at?formatKst(st.last_kill_at,false):"",next_spawn_at:next?formatKst(next,false):"",status,notify_enabled:boolVal(b.notify_enabled,true),alert_10m:boolVal(b.alert_10m,true),alert_5m:boolVal(b.alert_5m,true),alert_1m:boolVal(b.alert_1m,true),alert_spawn:boolVal(b.alert_spawn,true),attendance_enabled:boolVal(b.attendance_enabled,true),attendance_open:Boolean(ev),open_event_id:ev?ev.event_id:""};
  });
}

async function getAllianceHomeData(env,allianceId){
  await ensureBootstrap(env);
  let id=String(allianceId||"alliance_001");
  let meta=await first(env.DB,"SELECT * FROM alliances WHERE alliance_id=? AND status='active'",id);
  if(!meta){meta=await first(env.DB,"SELECT * FROM alliances WHERE status='active' ORDER BY created_at LIMIT 1");if(!meta)throw new Error("활성 연합이 없습니다.");id=meta.alliance_id;}
  const guilds=(await all(env.DB,"SELECT * FROM guilds WHERE alliance_id=? AND status='active' ORDER BY created_at,guild_id",id)).map(g=>({guild_id:g.guild_id,guild_name:g.guild_name,server_id:g.server_id||"",server_name:g.game_server_name||"",game_server_name:g.game_server_name||"",discord_tag:g.discord_tag||g.guild_name,discord_role_name:g.discord_role_name||g.guild_name,discord_display_format:g.discord_display_format||"[TAG] NICKNAME"}));
  const servers=(await all(env.DB,"SELECT * FROM alliance_servers WHERE alliance_id=? AND enabled=1 ORDER BY server_name",id)).map(s=>({server_id:s.server_id,server_name:s.server_name,enabled:true}));
  const notices=await all(env.DB,"SELECT * FROM alliance_announcements WHERE alliance_id=? AND enabled=1 ORDER BY pinned DESC, created_at DESC",id);
  return {alliance:{alliance_id:id,alliance_name:meta.alliance_name||"연합",game_name:meta.game_name||"ECLIPSE"},servers,notices:notices.map(n=>({...n,pinned:boolVal(n.pinned),enabled:boolVal(n.enabled)})),bosses:await bossView(env,id),guilds,now:formatKst(new Date())};
}

async function getGuildAppData(env,guildId){
  const g=await guildMeta(env,String(guildId));
  const notices=(await all(env.DB,"SELECT * FROM guild_announcements WHERE guild_id=? AND enabled=1 ORDER BY pinned DESC, created_at DESC",g.guild_id)).map(n=>({...n,pinned:boolVal(n.pinned),enabled:boolVal(n.enabled)}));
  const members=(await all(env.DB,"SELECT * FROM members WHERE guild_id=? AND status='활성' ORDER BY joined_at,nickname",g.guild_id)).map(m=>({member_id:m.member_id,nickname:m.nickname,role:normalizeGuildRole(m.role),alliance_role:normalizeAllianceRole(m.alliance_role),joined_at:m.joined_at||"",status:m.status||"활성",note:m.note||"",web_access_enabled:boolVal(m.web_access_enabled,false)}));
  const loot=await all(env.DB,"SELECT * FROM loot WHERE guild_id=? ORDER BY created_at DESC LIMIT 200",g.guild_id);
  const pendingLoot=loot.filter(x=>["보유","대기",""] .includes(String(x.status||"")));
  const bal=await first(env.DB,"SELECT COALESCE(SUM(amount_signed),0) AS balance FROM fund_ledger WHERE guild_id=?",g.guild_id);
  const fundHistory=(await all(env.DB,"SELECT txn_id,occurred_at,type,amount_signed,memo,created_by,source FROM fund_ledger WHERE guild_id=? ORDER BY occurred_at DESC,txn_id DESC LIMIT 100",g.guild_id)).map(x=>({...x,amount_signed:Number(x.amount_signed||0),display_time:formatKst(x.occurred_at,false)}));
  const srv=await serverMeta(env,g.alliance_id,g.server_id);
  return {guild:{guild_id:g.guild_id,alliance_id:g.alliance_id,guild_name:g.guild_name,game_name:g.game_name||"ECLIPSE",game_server_name:srv?.server_name||g.game_server_name||"",server_id:g.server_id||"",discord_tag:g.discord_tag||g.guild_name,discord_role_name:g.discord_role_name||g.guild_name,discord_display_format:g.discord_display_format||"[TAG] NICKNAME"},notices,members,loot,pendingLoot,fundBalance:Number(bal?.balance||0),fundHistory,now:formatKst(new Date())};
}

async function getAdminStructure(env,authToken){
  const ctx=await requireLogin(env,authToken);
  const alliances=await all(env.DB,"SELECT *, '' AS spreadsheet_id, '' AS spreadsheet_url FROM alliances ORDER BY created_at,alliance_id");
  const guilds=await all(env.DB,"SELECT *, game_server_name AS server_name, '' AS spreadsheet_id, '' AS spreadsheet_url FROM guilds ORDER BY created_at,guild_id");
  if(ctx.is_superadmin)return {alliances,guilds,version:APP_VERSION};
  if(String(ctx.alliance_role)!=="연합장")throw new Error("연합장 권한이 필요합니다.");
  return {alliances:alliances.filter(a=>String(a.alliance_id)===String(ctx.alliance_id)),guilds:guilds.filter(g=>String(g.alliance_id)===String(ctx.alliance_id)),version:APP_VERSION};
}

async function createAllianceWorkspace(env,payload={},authToken){
  await requireSuperAdmin(env,authToken);
  const name=String(payload.alliance_name||"").trim(); if(!name)throw new Error("연합명을 입력하세요.");
  if(await first(env.DB,"SELECT 1 FROM alliances WHERE alliance_name=? AND status='active'",name))throw new Error("같은 이름의 활성 연합이 이미 있습니다.");
  const n=await nextSequence(env.DB,"alliance"), allianceId=fmtSeq("alliance",n), now=nowIso();
  const serverName=String(payload.game_server_name||"").trim()||"기본서버";
  await env.DB.batch([
    env.DB.prepare("INSERT INTO alliances(alliance_id,alliance_name,game_id,game_name,game_server_name,status,created_at,updated_at,schema_version) VALUES(?,?,?,?,?,'active',?,?,'6.0')").bind(allianceId,name,String(payload.game_id||"eclipse").toLowerCase(),String(payload.game_name||"ECLIPSE")||"ECLIPSE",serverName,now,now),
    env.DB.prepare("INSERT INTO alliance_servers(alliance_id,server_id,server_name,enabled,created_at,updated_at,note) VALUES(?,?,?,1,?,?, '')").bind(allianceId,"server_001",serverName,now,now)
  ]);
  return {ok:true,message:"연합을 추가했습니다.",alliance_id:allianceId,alliance_name:name,spreadsheet_url:""};
}
async function renameAlliance(env,allianceId,newName,authToken){const id=String(allianceId||"").trim(),name=String(newName||"").trim();await requireAllianceLeader(env,authToken,id);if(!name)throw new Error("새 연합명을 입력하세요.");if(await first(env.DB,"SELECT 1 FROM alliances WHERE alliance_id<>? AND alliance_name=? AND status='active'",id,name))throw new Error("같은 이름의 활성 연합이 이미 있습니다.");await run(env.DB,"UPDATE alliances SET alliance_name=?,updated_at=? WHERE alliance_id=?",name,nowIso(),id);return {ok:true,message:`연합명을 ${name}(으)로 변경했습니다.`,alliance_id:id,alliance_name:name};}
async function deactivateAlliance(env,allianceId,authToken){await requireSuperAdmin(env,authToken);await run(env.DB,"UPDATE alliances SET status='inactive',updated_at=? WHERE alliance_id=?",nowIso(),String(allianceId));return {ok:true,message:"연합을 제거(비활성화)했습니다. 데이터는 보존됩니다."};}
async function restoreAlliance(env,allianceId,authToken){await requireSuperAdmin(env,authToken);await run(env.DB,"UPDATE alliances SET status='active',merged_into_alliance_id='',updated_at=? WHERE alliance_id=?",nowIso(),String(allianceId));return {ok:true,message:"연합을 다시 활성화했습니다."};}
async function deleteAlliancePermanently(env,allianceId,confirmText,authToken){await requireSuperAdmin(env,authToken);const a=await allianceMeta(env,allianceId,true),expected=`${a.alliance_name||allianceId} 완전삭제`;if(String(confirmText||"").trim()!==expected)throw new Error("확인 문구가 일치하지 않습니다. 정확히 입력하세요: "+expected);const child=await first(env.DB,"SELECT COUNT(*) c FROM guilds WHERE alliance_id=?",String(allianceId));if(Number(child?.c||0)>0)throw new Error("소속 길드가 남아 있습니다. 길드를 먼저 완전제거한 뒤 연합을 완전제거하세요.");const others=await first(env.DB,"SELECT COUNT(*) c FROM alliances WHERE alliance_id<>? AND status='active'",String(allianceId));if(Number(others?.c||0)<1)throw new Error("마지막 활성 연합은 완전제거할 수 없습니다. 새 연합을 먼저 추가하세요.");await run(env.DB,"DELETE FROM alliances WHERE alliance_id=?",String(allianceId));return {ok:true,message:`${a.alliance_name} 연합을 완전제거했습니다.`};}

async function createGuildWorkspace(env,payload={},authToken){
  const allianceId=String(payload.alliance_id||"").trim(); await requireAllianceLeader(env,authToken,allianceId);
  const name=String(payload.guild_name||"").trim(), tag=String(payload.discord_tag||"").trim(), roleName=String(payload.discord_role_name||name).trim(), format=String(payload.discord_display_format||"[TAG] NICKNAME").trim();
  if(!name)throw new Error("길드명을 입력하세요.");if(!tag)throw new Error("Discord 표시명을 입력하세요.");
  if(await first(env.DB,"SELECT 1 FROM guilds WHERE alliance_id=? AND guild_name=? AND status='active'",allianceId,name))throw new Error("같은 이름의 활성 길드가 이미 있습니다.");
  const a=await allianceMeta(env,allianceId), srv=await ensureAllianceServer(env,allianceId,payload.server_name||payload.game_server_name||"기본서버"), guildId=fmtSeq("guild",await nextSequence(env.DB,"guild")), now=nowIso();
  await run(env.DB,"INSERT INTO guilds(guild_id,alliance_id,guild_name,game_id,game_name,game_server_name,server_id,status,discord_role_id,discord_tag,discord_role_name,discord_display_format,created_at,updated_at,schema_version) VALUES(?,?,?,?,?,?,?,'active','',?,?,?,?,?,'6.0')",guildId,allianceId,name,a.game_id||"eclipse",a.game_name||"ECLIPSE",srv.server_name,srv.server_id,tag,roleName,format,now,now);
  return {ok:true,message:"길드를 추가했습니다.",guild_id:guildId,guild_name:name,server_id:srv.server_id,server_name:srv.server_name,spreadsheet_url:""};
}
async function renameGuild(env,guildId,newName,authToken){const g=await guildMeta(env,guildId,true),name=String(newName||"").trim();await requireAllianceLeader(env,authToken,g.alliance_id);if(!name)throw new Error("새 길드명을 입력하세요.");if(await first(env.DB,"SELECT 1 FROM guilds WHERE guild_id<>? AND alliance_id=? AND guild_name=? AND status='active'",String(guildId),g.alliance_id,name))throw new Error("같은 이름의 활성 길드가 이미 있습니다.");await run(env.DB,"UPDATE guilds SET guild_name=?,updated_at=? WHERE guild_id=?",name,nowIso(),String(guildId));return {ok:true,message:`길드명을 ${name}(으)로 변경했습니다.`,guild_id:String(guildId),guild_name:name,alliance_id:g.alliance_id};}
async function updateGuildServer(env,guildId,serverName,authToken){const g=await guildMeta(env,guildId,true);await requireAllianceLeader(env,authToken,g.alliance_id);const srv=await ensureAllianceServer(env,g.alliance_id,serverName);await run(env.DB,"UPDATE guilds SET server_id=?,game_server_name=?,updated_at=? WHERE guild_id=?",srv.server_id,srv.server_name,nowIso(),String(guildId));return {ok:true,message:`${g.guild_name||guildId} 서버를 ${srv.server_name}(으)로 변경했습니다.`,server_id:srv.server_id,server_name:srv.server_name};}
async function deactivateGuild(env,guildId,authToken){const g=await guildMeta(env,guildId,true);await requireAllianceLeader(env,authToken,g.alliance_id);if(g.status==="inactive")return {ok:true,message:"이미 비활성화된 길드입니다."};await run(env.DB,"UPDATE guilds SET status='inactive',updated_at=? WHERE guild_id=?",nowIso(),String(guildId));return {ok:true,message:"길드를 삭제(보관)했습니다. 과거 기록은 보존됩니다."};}
async function restoreGuild(env,guildId,authToken){const g=await guildMeta(env,guildId,true);await requireAllianceLeader(env,authToken,g.alliance_id);await run(env.DB,"UPDATE guilds SET status='active',merged_into_guild_id='',updated_at=? WHERE guild_id=?",nowIso(),String(guildId));return {ok:true,message:"길드를 다시 활성화했습니다."};}
async function deleteGuildPermanently(env,guildId,confirmText,authToken){await requireSuperAdmin(env,authToken);const g=await guildMeta(env,guildId,true),expected=`${g.guild_name||guildId} 완전삭제`;if(String(confirmText||"").trim()!==expected)throw new Error("확인 문구가 일치하지 않습니다. 정확히 입력하세요: "+expected);await env.DB.batch([env.DB.prepare("UPDATE discord_members SET current_guild_id='',current_member_id='',status='detached',updated_at=? WHERE alliance_id=? AND current_guild_id=?").bind(nowIso(),g.alliance_id,String(guildId)),env.DB.prepare("UPDATE kakao_members SET current_guild_id='',current_member_id='',status='detached',updated_at=? WHERE alliance_id=? AND current_guild_id=?").bind(nowIso(),g.alliance_id,String(guildId)),env.DB.prepare("DELETE FROM guilds WHERE guild_id=?").bind(String(guildId))]);return {ok:true,message:`${g.guild_name} 길드를 완전제거했습니다.`};}

async function saveAllianceNotice(env,allianceId,payload={},authToken){await requireAllianceOperate(env,authToken,allianceId);const title=String(payload.title||"").trim();if(!title)throw new Error("공지 제목을 입력하세요.");const now=nowIso();await run(env.DB,"INSERT INTO alliance_announcements(notice_id,alliance_id,title,content,pinned,author,created_at,updated_at,enabled) VALUES(?,?,?,?,?,?,?,?,1)",uid("anotice"),String(allianceId),title,String(payload.content||"").trim(),bint(payload.pinned),String(payload.author||"web"),now,now);return {ok:true,message:"연합 공지를 등록했습니다."};}
async function deleteAllianceNotice(env,allianceId,noticeId,authToken){
  await requireAllianceOperate(env,authToken,allianceId);
  const n=await first(env.DB,"SELECT notice_id,title FROM alliance_announcements WHERE alliance_id=? AND notice_id=?",String(allianceId),String(noticeId));
  if(!n)throw new Error("연합 공지를 찾을 수 없습니다.");
  await run(env.DB,"DELETE FROM alliance_announcements WHERE alliance_id=? AND notice_id=?",String(allianceId),String(noticeId));
  return {ok:true,message:`${n.title||"연합 공지"} 삭제 완료`};
}
async function saveGuildNotice(env,guildId,payload={},authToken){await requireGuildOperate(env,authToken,guildId);const title=String(payload.title||"").trim();if(!title)throw new Error("공지 제목을 입력하세요.");const now=nowIso();await run(env.DB,"INSERT INTO guild_announcements(notice_id,guild_id,title,content,pinned,author_member_id,created_at,updated_at,enabled) VALUES(?,?,?,?,?,?,?,?,1)",uid("notice"),String(guildId),title,String(payload.content||"").trim(),bint(payload.pinned),String(payload.author_member_id||"web"),now,now);return {ok:true,message:"길드 공지를 등록했습니다."};}

async function deleteGuildNotice(env,guildId,noticeId,authToken){
  await requireGuildOperate(env,authToken,guildId);
  const n=await first(env.DB,"SELECT notice_id,title FROM guild_announcements WHERE guild_id=? AND notice_id=?",String(guildId),String(noticeId));
  if(!n)throw new Error("길드 공지를 찾을 수 없습니다.");
  await run(env.DB,"DELETE FROM guild_announcements WHERE guild_id=? AND notice_id=?",String(guildId),String(noticeId));
  return {ok:true,message:`${n.title||"길드 공지"} 삭제 완료`};
}
async function saveGuildMember(env,guildId,payload={},authToken){const ctx=await requireGuildOperate(env,authToken,guildId), nickname=String(payload.nickname||"").trim();if(!nickname)throw new Error("닉네임을 입력하세요.");if(await first(env.DB,"SELECT 1 FROM members WHERE guild_id=? AND nickname=? AND status='활성'",String(guildId),nickname))throw new Error("같은 닉네임의 활성 길드원이 이미 있습니다.");const role=assertCanAssignRole(ctx,String(payload.role||"길드원")),memberId=uid("member"),pin=randomPin(),hash=await sha256Hex(`${memberId}:${pin}`);await run(env.DB,"INSERT INTO members(member_id,guild_id,nickname,role,alliance_role,joined_at,status,note,web_pin_hash,web_access_enabled) VALUES(?,?,?,?,?,?,'활성',?,?,1)",memberId,String(guildId),nickname,role,"",nowIso(),String(payload.note||""),hash);return {ok:true,message:"길드원을 등록했습니다. 웹 로그인 PIN이 함께 발급되었습니다.",member_id:memberId,access_pin:pin,role};}
async function deleteGuildMember(env,guildId,memberId,authToken){
  const ctx=await requireGuildOperate(env,authToken,guildId),g=await guildMeta(env,guildId,true),m=await first(env.DB,"SELECT * FROM members WHERE guild_id=? AND member_id=? AND status='활성'",String(guildId),String(memberId));
  if(!m)throw new Error("길드원을 찾을 수 없습니다.");
  assertCanManageMember(ctx,m.role);
  if(!ctx.is_superadmin&&String(ctx.member_id||"")===String(m.member_id))throw new Error("본인 계정은 직접 삭제할 수 없습니다.");
  const now=nowIso();
  await env.DB.batch([
    env.DB.prepare("UPDATE members SET status='삭제',alliance_role='',web_pin_hash='',web_access_enabled=0,note=CASE WHEN note='' THEN '웹 삭제' ELSE note||' / 웹 삭제' END WHERE member_id=?").bind(String(memberId)),
    env.DB.prepare("UPDATE discord_members SET current_guild_id='',current_member_id='',status='detached',updated_at=? WHERE alliance_id=? AND current_member_id=?").bind(now,String(g.alliance_id||""),String(memberId)),
    env.DB.prepare("UPDATE kakao_members SET current_guild_id='',current_member_id='',status='detached',updated_at=? WHERE alliance_id=? AND current_member_id=?").bind(now,String(g.alliance_id||""),String(memberId)),
    env.DB.prepare("UPDATE web_login_codes SET used_at=? WHERE member_id=? AND used_at=''").bind(now,String(memberId))
  ]);
  await run(env.DB,"DELETE FROM sessions WHERE context_json LIKE ?",`%\"member_id\":\"${String(memberId)}\"%`);
  return {ok:true,message:`${m.nickname||"길드원"} 삭제 완료 · 과거 출석 기록은 유지됩니다.`,member_id:String(memberId)};
}
async function resetMemberWebPin(env,guildId,memberId,authToken){const ctx=await requireGuildOperate(env,authToken,guildId),m=await first(env.DB,"SELECT * FROM members WHERE guild_id=? AND member_id=?",String(guildId),String(memberId));if(!m)throw new Error("길드원을 찾을 수 없습니다.");assertCanManageMember(ctx,m.role);const pin=randomPin(),hash=await sha256Hex(`${m.member_id}:${pin}`);await run(env.DB,"UPDATE members SET web_pin_hash=?,web_access_enabled=1 WHERE member_id=?",hash,String(memberId));return {ok:true,message:"웹 로그인 PIN을 발급했습니다.",pin,member_id:String(memberId)};}
async function updateGuildMemberRole(env,guildId,memberId,newRole,authToken){
  const g=await guildMeta(env,guildId,true),ctx=await requireLogin(env,authToken),m=await first(env.DB,"SELECT * FROM members WHERE guild_id=? AND member_id=?",String(guildId),String(memberId));
  if(!m)throw new Error("길드원을 찾을 수 없습니다.");
  const raw=String(newRole||"").trim();
  if(!["길드장","부길드장","운영진","길드원"].includes(raw))throw new Error("직급이 올바르지 않습니다.");
  const role=normalizeGuildRole(raw);
  let allowed=false;
  if(ctx.is_superadmin)allowed=true;
  const sameAlliance=String(ctx.alliance_id||"")===String(g.alliance_id||"");
  const sameGuild=String(ctx.guild_id||"")===String(guildId||"");
  if(!ctx.is_superadmin&&sameGuild&&Number(ctx.level||0)>=40){
    if(guildRoleLevel(role)<Number(ctx.level||0)&&guildRoleLevel(m.role)<Number(ctx.level||0))allowed=true;
  }
  if(!ctx.is_superadmin&&sameAlliance&&String(ctx.alliance_role)==="연합장"){
    if(role==="길드장"||(normalizeGuildRole(m.role)==="길드장"&&role==="길드원"))allowed=true;
  }
  if(!allowed)throw new Error("이 길드 직급을 변경할 권한이 없습니다. 연합장은 길드장 지정/해제, 길드장은 자기 길드의 부길드장·운영진을 지정할 수 있습니다.");
  if(role==="길드장"){
    const old=await first(env.DB,"SELECT member_id,nickname FROM members WHERE guild_id=? AND status='활성' AND role='길드장' AND member_id<>? LIMIT 1",String(guildId),String(memberId));
    if(old)throw new Error(`기존 길드장(${old.nickname})을 먼저 해제한 뒤 새 길드장을 지정하세요.`);
  }
  await run(env.DB,"UPDATE members SET role=? WHERE member_id=?",role,String(memberId));
  return {ok:true,message:`직급을 ${role}(으)로 변경했습니다.`,role};
}
async function updateMemberAllianceRole(env,guildId,memberId,newRole,authToken){
  const g=await guildMeta(env,guildId,true),ctx=await requireLogin(env,authToken),m=await first(env.DB,"SELECT * FROM members WHERE guild_id=? AND member_id=?",String(guildId),String(memberId));
  if(!m)throw new Error("길드원을 찾을 수 없습니다.");
  const raw=String(newRole||"").trim(),role=normalizeAllianceRole(raw);
  if(raw&&!role)throw new Error("연합 권한은 연합장/연합운영진/없음만 가능합니다.");
  if(ctx.is_superadmin){
    if(role==="연합장"){
      const old=await first(env.DB,"SELECT m.member_id,m.nickname FROM members m JOIN guilds g2 ON g2.guild_id=m.guild_id WHERE g2.alliance_id=? AND g2.status='active' AND m.status='활성' AND m.alliance_role='연합장' AND m.member_id<>? LIMIT 1",g.alliance_id,String(memberId));
      if(old)throw new Error(`기존 연합장(${old.nickname}) 권한을 먼저 해제하세요.`);
    }
  }else{
    if(String(ctx.alliance_id)!==String(g.alliance_id)||String(ctx.alliance_role)!=="연합장")throw new Error("연합장 권한이 필요합니다.");
    if(String(m.alliance_role||"")==="연합장")throw new Error("연합장은 자기 연합장 권한을 변경할 수 없습니다.");
    if(role!=="연합운영진"&&role!=="")throw new Error("연합장은 연합운영진 임명/해제만 할 수 있습니다.");
  }
  await run(env.DB,"UPDATE members SET alliance_role=? WHERE member_id=?",role,String(memberId));
  return {ok:true,message:role?`연합 권한을 ${role}(으)로 변경했습니다.`:"연합 권한을 해제했습니다.",alliance_role:role};
}

async function saveGuildLoot(env,guildId,payload={},authToken){await requireGuildOperate(env,authToken,guildId);const item=String(payload.item_name||"").trim(),qty=Math.max(1,Number(payload.quantity||1)),status=String(payload.status||"보유"),sale=Math.max(0,Number(payload.sale_amount||0));if(!item)throw new Error("아이템명을 입력하세요.");if(!["보유","판매완료","지급완료"].includes(status))throw new Error("아이템 상태가 올바르지 않습니다.");await run(env.DB,"INSERT INTO loot(loot_id,guild_id,raid_id,item_name,quantity,status,winner_member_id,sale_amount,fund_rate,fund_amount,guild_support_amount,distribution_pool,completed_at,note,created_at,source) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",uid("loot"),String(guildId),String(payload.raid_id||""),item,qty,status,String(payload.winner_member_id||""),sale||null,null,null,null,null,(status==="판매완료"||status==="지급완료")?nowIso():"",String(payload.note||""),nowIso(),String(payload.source||"web"));return {ok:true,message:"아이템을 등록했습니다."};}
async function markGuildLootSold(env,guildId,lootId,saleAmount,authToken){await requireGuildOperate(env,authToken,guildId);const amount=Math.max(0,Number(saleAmount||0));if(!(amount>0))throw new Error("판매금액을 입력하세요.");const l=await first(env.DB,"SELECT 1 FROM loot WHERE guild_id=? AND loot_id=?",String(guildId),String(lootId));if(!l)throw new Error("아이템을 찾을 수 없습니다.");await run(env.DB,"UPDATE loot SET status='판매완료',sale_amount=?,completed_at=? WHERE loot_id=?",amount,nowIso(),String(lootId));return {ok:true,message:"판매완료로 변경했습니다."};}
async function deleteGuildLoot(env,guildId,lootId,authToken){
  await requireGuildOperate(env,authToken,guildId);
  const l=await first(env.DB,"SELECT loot_id,item_name,status FROM loot WHERE guild_id=? AND loot_id=?",String(guildId),String(lootId));
  if(!l)throw new Error("아이템을 찾을 수 없습니다.");
  await run(env.DB,"DELETE FROM loot WHERE guild_id=? AND loot_id=?",String(guildId),String(lootId));
  return {ok:true,message:`${l.item_name||"아이템"} 기록을 삭제했습니다.`,loot_id:String(lootId)};
}

async function createDistributionRequest(env,guildId,payload={},authToken){const ctx=await requireGuildMember(env,authToken,guildId);if(!payload.loot_id)throw new Error("아이템을 선택하세요.");let memberId=String(payload.member_id||"");if(!ctx.is_superadmin&&Number(ctx.level)<20)memberId=String(ctx.member_id||"");if(!memberId)throw new Error("신청 길드원을 확인할 수 없습니다.");await run(env.DB,"INSERT INTO distribution_requests(request_id,guild_id,loot_id,member_id,request_type,priority,status,requested_at,note) VALUES(?,?,?,?,?,?,'신청',?,?)",uid("req"),String(guildId),String(payload.loot_id),memberId,String(payload.request_type||"희망"),Number(payload.priority||0),nowIso(),String(payload.note||""));return {ok:true,message:"분배 희망 신청을 등록했습니다."};}
async function addFundTransaction(env,guildId,payload={},authToken){await requireGuildOperate(env,authToken,guildId);const amount=Math.abs(Number(payload.amount||0));if(!amount)throw new Error("금액을 입력하세요.");const type=String(payload.type||"other_income"),signed=type==="expense"?-amount:amount,bal=await first(env.DB,"SELECT COALESCE(SUM(amount_signed),0) balance FROM fund_ledger WHERE guild_id=?",String(guildId)),after=Number(bal?.balance||0)+signed;await run(env.DB,"INSERT INTO fund_ledger(txn_id,guild_id,occurred_at,type,amount_signed,balance_after,reference_type,reference_id,member_id,memo,created_by,source,note) VALUES(?,?,?,?,?,?, 'manual','','',?,'web','web','')",uid("txn"),String(guildId),nowIso(),type==="expense"?"expense":"other_income",signed,after,String(payload.memo||""));return {ok:true,message:"금고에 반영했습니다.",balance:after};}

async function deleteFundTransaction(env,guildId,txnId,authToken){
  await requireGuildOperate(env,authToken,guildId);
  const t=await first(env.DB,"SELECT txn_id,amount_signed,memo FROM fund_ledger WHERE guild_id=? AND txn_id=?",String(guildId),String(txnId));
  if(!t)throw new Error("금고 기록을 찾을 수 없습니다.");
  await run(env.DB,"DELETE FROM fund_ledger WHERE guild_id=? AND txn_id=?",String(guildId),String(txnId));
  const bal=await first(env.DB,"SELECT COALESCE(SUM(amount_signed),0) balance FROM fund_ledger WHERE guild_id=?",String(guildId));
  return {ok:true,message:"금고 기록을 삭제했습니다.",balance:Number(bal?.balance||0),txn_id:String(txnId)};
}

async function getGuildStats(env,guildId,startDate,endDate){
  const g=await guildMeta(env,guildId), start=parseLocalDateTime(`${startDate} 00:00`), end=parseLocalDateTime(`${endDate} 23:59`);if(!start||!end)throw new Error("기간 형식이 올바르지 않습니다.");
  const events=await all(env.DB,"SELECT * FROM boss_events WHERE alliance_id=? AND event_type<>'manual_participation' AND cut_at>=? AND cut_at<=? AND (boss_scope='WORLD' OR server_id=?)",g.alliance_id,start.toISOString(),end.toISOString(),g.server_id||"");
  if(!events.length)return {total_raids:0,ranking:[]};
  const ids=events.map(x=>x.event_id); const ph=ids.map(()=>"?").join(",");
  const rows=await all(env.DB,`SELECT member_id_at_event member_id,game_nickname_at_event nickname,COUNT(*) count FROM boss_attendance WHERE guild_id_at_event=? AND attended=1 AND event_id IN (${ph}) GROUP BY member_id_at_event,game_nickname_at_event`,String(guildId),...ids);
  const total=events.length;return {total_raids:total,ranking:rows.map(x=>({member_id:x.member_id,nickname:x.nickname||x.member_id,count:Number(x.count||0),rate:total?Math.round(Number(x.count||0)/total*1000)/10:0})).sort((a,b)=>b.count-a.count||String(a.nickname).localeCompare(String(b.nickname)))};
}


async function attendanceContext(env,allianceId,guildId,authToken){
  const ctx=await requireLogin(env,authToken),aid=String(allianceId||"");
  if(!ctx.is_superadmin&&String(ctx.alliance_id)!==aid)throw new Error("소속 연합에서만 조회할 수 있습니다.");
  if(guildId){const g=await guildMeta(env,guildId);if(String(g.alliance_id)!==aid)throw new Error("현재 연합의 길드가 아닙니다.");if(!ctx.is_superadmin&&String(ctx.guild_id)!==String(guildId)&&Number(ctx.alliance_level)<70)throw new Error("다른 길드 명단은 연합운영진 이상만 조회할 수 있습니다.");}
  const canEdit=ctx.is_superadmin||Number(ctx.alliance_level)>=70||Boolean(guildId&&String(ctx.guild_id)===String(guildId)&&Number(ctx.level)>=20);
  return {ctx,can_edit:canEdit};
}
function canOperateAttendanceEventCtx_(ctx,e){
  if(ctx?.is_superadmin)return true;
  if(Number(ctx?.alliance_level||0)>=70)return true;
  return String(e?.boss_scope||"WORLD").toUpperCase()==="SERVER"&&Number(ctx?.level||0)>=20&&String(ctx?.server_id||"")===String(e?.server_id||"");
}
async function getAttendanceEvents(env,allianceId,guildId,startDate,endDate,authToken){
  const aid=String(allianceId||""),perm=await attendanceContext(env,aid,String(guildId||""),authToken);
  let start=parseLocalDateTime(`${startDate||""} 00:00`),end=parseLocalDateTime(`${endDate||""} 23:59`);if(!start||!end)throw new Error("조회 기간을 입력하세요.");
  let guild=null,sql="SELECT e.* FROM boss_events e WHERE e.alliance_id=? AND e.cut_at>=? AND e.cut_at<=?",args=[aid,start.toISOString(),end.toISOString()];
  if(guildId){guild=await guildMeta(env,guildId);sql+=" AND (e.boss_scope='WORLD' OR e.server_id=?)";args.push(String(guild.server_id||""));}
  sql+=" ORDER BY e.cut_at DESC,e.created_at DESC LIMIT 300";
  const events=await all(env.DB,sql,...args),out=[];
  for(const e of events){let c;if(guildId)c=await first(env.DB,"SELECT COUNT(*) c FROM boss_attendance WHERE event_id=? AND guild_id_at_event=? AND attended=1",e.event_id,String(guildId));else c=await first(env.DB,"SELECT COUNT(*) c FROM boss_attendance WHERE event_id=? AND attended=1",e.event_id);const srv=e.server_id?await serverMeta(env,aid,e.server_id):null;out.push({...e,display_time:formatKst(e.cut_at,false),participant_count:Number(c?.c||0),scope_label:String(e.event_type||"")==="manual_participation"?"연합참여":(String(e.boss_scope||"WORLD")==="SERVER"?(srv?.server_name||"서버"):"월드"),can_delete:canOperateAttendanceEventCtx_(perm.ctx,e)});}
  return {events:out,can_edit:perm.can_edit,scope:guildId?"guild":"alliance"};
}
async function getAttendanceRoster(env,allianceId,eventId,guildId,authToken){
  const aid=String(allianceId||""),gid=String(guildId||""),perm=await attendanceContext(env,aid,gid,authToken),e=await first(env.DB,"SELECT * FROM boss_events WHERE alliance_id=? AND event_id=?",aid,String(eventId));if(!e)throw new Error("보스 회차를 찾을 수 없습니다.");
  let members;if(gid)members=await all(env.DB,"SELECT m.*,g.guild_name FROM members m JOIN guilds g ON g.guild_id=m.guild_id WHERE m.guild_id=? AND m.status='활성' ORDER BY m.nickname",gid);else members=await all(env.DB,"SELECT m.*,g.guild_name FROM members m JOIN guilds g ON g.guild_id=m.guild_id WHERE g.alliance_id=? AND g.status='active' AND m.status='활성' ORDER BY g.created_at,g.guild_name,m.nickname",aid);
  const rows=await all(env.DB,"SELECT * FROM boss_attendance WHERE event_id=?",String(eventId)),byMember=new Map(rows.filter(x=>x.member_id_at_event).map(x=>[String(x.member_id_at_event),x]));
  const out=members.map(m=>{const a=byMember.get(String(m.member_id));if(a)byMember.delete(String(m.member_id));return {member_id:m.member_id,guild_id:m.guild_id,guild_name:m.guild_name,nickname:m.nickname,role:normalizeGuildRole(m.role),attended:Boolean(a&&Number(a.attended)),source:a?.source||"",source_label:attendanceSourceLabel(a?.source||""),recorded_at:a?.recorded_at||""};});
  for(const a of byMember.values()){if(gid&&String(a.guild_id_at_event)!==gid)continue;if(!Number(a.attended))continue;out.push({member_id:a.member_id_at_event||`past_${a.attendance_id}`,guild_id:a.guild_id_at_event||"",guild_name:a.guild_name_at_event||"과거 소속",nickname:a.game_nickname_at_event||"과거 길드원",role:"과거기록",attended:true,source:a.source||"",source_label:attendanceSourceLabel(a.source||""),recorded_at:a.recorded_at||"",historical:true});}
  return {event:{...e,display_time:formatKst(e.cut_at,false)},members:out,participant_count:out.filter(x=>x.attended).length,can_edit:perm.can_edit,can_delete:canOperateAttendanceEventCtx_(perm.ctx,e),scope:gid?"guild":"alliance",screenshot_check:await latestScreenshotCheckByEvent_(env,aid,e.event_id)};
}
function attendanceSourceLabel(source){const s=String(source||"");if(s.includes("discord"))return "Discord";if(s.includes("kakao"))return "Kakao";if(s.includes("screenshot"))return "스크린샷";if(s.includes("web"))return "웹";if(s.includes("admin"))return "관리자";return s||"";}
async function setAttendanceMember(env,allianceId,eventId,memberId,attended,source,authToken){
  const aid=String(allianceId||""),e=await first(env.DB,"SELECT * FROM boss_events WHERE alliance_id=? AND event_id=?",aid,String(eventId));if(!e)throw new Error("보스 회차를 찾을 수 없습니다.");const m=await first(env.DB,"SELECT m.*,g.alliance_id,g.guild_name,g.server_id,g.game_server_name FROM members m JOIN guilds g ON g.guild_id=m.guild_id WHERE m.member_id=?",String(memberId));if(!m||String(m.alliance_id)!==aid)throw new Error("길드원을 찾을 수 없습니다.");const perm=await attendanceContext(env,aid,String(m.guild_id),authToken);if(!perm.can_edit)throw new Error("운영진 이상 권한이 필요합니다.");
  const old=await first(env.DB,"SELECT * FROM boss_attendance WHERE event_id=? AND member_id_at_event=? ORDER BY recorded_at DESC LIMIT 1",String(eventId),String(memberId)),now=nowIso(),on=boolVal(attended,false);if(old){await run(env.DB,"UPDATE boss_attendance SET attended=?,recorded_at=?,cancelled_at=?,source=?,guild_id_at_event=?,guild_name_at_event=?,server_id_at_event=?,server_name_at_event=?,game_nickname_at_event=? WHERE attendance_id=?",on?1:0,on?now:(old.recorded_at||now),on?"":now,String(source||"web_admin"),m.guild_id,m.guild_name,m.server_id||"",m.game_server_name||"",m.nickname,old.attendance_id);}else if(on){const dm=await first(env.DB,"SELECT discord_user_id FROM discord_members WHERE alliance_id=? AND current_member_id=? AND status='active'",aid,String(memberId));await run(env.DB,"INSERT INTO boss_attendance(attendance_id,alliance_id,event_id,boss_id,discord_user_id,guild_id_at_event,guild_name_at_event,server_id_at_event,server_name_at_event,member_id_at_event,game_nickname_at_event,attended,recorded_at,cancelled_at,online_status_snapshot,source,note) VALUES(?,?,?,?,?,?,?,?,?,?,?,1,?,'','',?,'')",uid("att"),aid,e.event_id,e.boss_id,dm?.discord_user_id||"",m.guild_id,m.guild_name,m.server_id||"",m.game_server_name||"",m.member_id,m.nickname,now,String(source||"web_admin"));}
  await queueAttendanceSync_(env,aid,e.event_id,"upsert","web attendance change");
  return {ok:true,attended:on,message:on?`${m.nickname} 참여 추가`:`${m.nickname} 참여 제거`};
}


async function ensureAttendanceSyncSchema_(env){
  await run(env.DB,"CREATE TABLE IF NOT EXISTS attendance_sync_queue(event_id TEXT PRIMARY KEY,alliance_id TEXT NOT NULL,action TEXT NOT NULL DEFAULT 'upsert',status TEXT NOT NULL DEFAULT 'queued',created_at TEXT NOT NULL,updated_at TEXT NOT NULL,note TEXT NOT NULL DEFAULT '')");
  await run(env.DB,"CREATE INDEX IF NOT EXISTS idx_att_sync_alliance_status ON attendance_sync_queue(alliance_id,status,updated_at)");
}
async function queueAttendanceSync_(env,aid,eventId,action="upsert",note=""){
  const eid=String(eventId||"");if(!eid)return;
  await ensureAttendanceSyncSchema_(env);const n=nowIso();
  await run(env.DB,"INSERT INTO attendance_sync_queue(event_id,alliance_id,action,status,created_at,updated_at,note) VALUES(?,?,?,'queued',?,?,?) ON CONFLICT(event_id) DO UPDATE SET alliance_id=excluded.alliance_id,action=excluded.action,status='queued',updated_at=excluded.updated_at,note=excluded.note",eid,String(aid||""),String(action||"upsert"),n,n,String(note||""));
}
async function botPullAttendanceSync_(env,aid,p){
  await ensureAttendanceSyncSchema_(env);const limit=Math.max(1,Math.min(100,Number(p.limit||30)));
  const rows=await all(env.DB,"SELECT * FROM attendance_sync_queue WHERE alliance_id=? AND status='queued' ORDER BY updated_at LIMIT ?",aid,limit);
  return {events:rows.map(x=>({event_id:x.event_id,action:x.action||"upsert",updated_at:x.updated_at||x.created_at||""}))};
}
async function botMarkAttendanceSync_(env,aid,p){
  await ensureAttendanceSyncSchema_(env);const ids=Array.isArray(p.event_ids)?p.event_ids.map(String).filter(Boolean):[];if(!ids.length)return {updated:0};
  const ph=ids.map(()=>"?").join(","),status=String(p.status||"sent");await run(env.DB,`UPDATE attendance_sync_queue SET status=?,updated_at=? WHERE alliance_id=? AND event_id IN (${ph})`,status,nowIso(),aid,...ids);return {updated:ids.length};
}

async function ensureDiscordMessageDeleteSchema_(env){
  await run(env.DB,"CREATE TABLE IF NOT EXISTS discord_message_delete_queue(delete_id TEXT PRIMARY KEY,alliance_id TEXT NOT NULL,channel_id TEXT NOT NULL,message_id TEXT NOT NULL,status TEXT NOT NULL DEFAULT 'queued',created_at TEXT NOT NULL,updated_at TEXT NOT NULL,note TEXT NOT NULL DEFAULT '')");
  await run(env.DB,"CREATE UNIQUE INDEX IF NOT EXISTS idx_discord_delete_message ON discord_message_delete_queue(alliance_id,channel_id,message_id)");
  await run(env.DB,"CREATE INDEX IF NOT EXISTS idx_discord_delete_status ON discord_message_delete_queue(alliance_id,status,updated_at)");
}
async function queueDiscordMessageDelete_(env,aid,channelId,messageId,note=""){
  const ch=String(channelId||""),mid=String(messageId||"");if(!ch||!mid)return;
  await ensureDiscordMessageDeleteSchema_(env);const n=nowIso();
  await run(env.DB,"INSERT INTO discord_message_delete_queue(delete_id,alliance_id,channel_id,message_id,status,created_at,updated_at,note) VALUES(?,?,?,?,'queued',?,?,?) ON CONFLICT(alliance_id,channel_id,message_id) DO UPDATE SET status='queued',updated_at=excluded.updated_at,note=excluded.note",uid("dmsg"),String(aid||""),ch,mid,n,n,String(note||""));
}
async function botPullDiscordMessageDeletes_(env,aid,p){
  await ensureDiscordMessageDeleteSchema_(env);const limit=Math.max(1,Math.min(100,Number(p.limit||40)));
  const rows=await all(env.DB,"SELECT delete_id,channel_id,message_id,note FROM discord_message_delete_queue WHERE alliance_id=? AND status='queued' ORDER BY updated_at LIMIT ?",aid,limit);
  return {messages:rows};
}
async function botMarkDiscordMessageDeletes_(env,aid,p){
  await ensureDiscordMessageDeleteSchema_(env);const ids=Array.isArray(p.delete_ids)?p.delete_ids.map(String).filter(Boolean):[];if(!ids.length)return {updated:0};
  const ph=ids.map(()=>"?").join(","),status=String(p.status||"sent");await run(env.DB,`UPDATE discord_message_delete_queue SET status=?,updated_at=? WHERE alliance_id=? AND delete_id IN (${ph})`,status,nowIso(),aid,...ids);return {updated:ids.length};
}

async function ensureScreenshotSchema_(env){
  await run(env.DB,"CREATE TABLE IF NOT EXISTS attendance_screenshot_checks(check_id TEXT PRIMARY KEY,alliance_id TEXT NOT NULL,event_id TEXT NOT NULL DEFAULT '',boss_id TEXT NOT NULL DEFAULT '',boss_name TEXT NOT NULL DEFAULT '',source TEXT NOT NULL DEFAULT '',source_message_id TEXT NOT NULL DEFAULT '',source_channel_id TEXT NOT NULL DEFAULT '',result_message_id TEXT NOT NULL DEFAULT '',image_count INTEGER NOT NULL DEFAULT 0,recognized_count INTEGER NOT NULL DEFAULT 0,recognized_json TEXT NOT NULL DEFAULT '[]',matched_json TEXT NOT NULL DEFAULT '[]',screenshot_only_json TEXT NOT NULL DEFAULT '[]',attendance_only_json TEXT NOT NULL DEFAULT '[]',uncertain_json TEXT NOT NULL DEFAULT '[]',model TEXT NOT NULL DEFAULT '',status TEXT NOT NULL DEFAULT 'done',created_at TEXT NOT NULL,created_by TEXT NOT NULL DEFAULT '',note TEXT NOT NULL DEFAULT '')");
  await run(env.DB,"CREATE INDEX IF NOT EXISTS idx_att_shot_event ON attendance_screenshot_checks(alliance_id,event_id,created_at)");
  await run(env.DB,"CREATE INDEX IF NOT EXISTS idx_att_shot_source ON attendance_screenshot_checks(alliance_id,source_message_id)");
}
function jsonArray_(v){try{const x=JSON.parse(String(v||"[]"));return Array.isArray(x)?x:[]}catch{return []}}
function publicScreenshotCheck_(x){
  if(!x)return null;return {check_id:x.check_id,event_id:x.event_id,boss_id:x.boss_id,boss_name:x.boss_name,source:x.source,source_message_id:x.source_message_id||"",source_channel_id:x.source_channel_id||"",result_message_id:x.result_message_id||"",image_count:Number(x.image_count||0),recognized_count:Number(x.recognized_count||0),recognized:jsonArray_(x.recognized_json),matched:jsonArray_(x.matched_json),screenshot_only:jsonArray_(x.screenshot_only_json),attendance_only:jsonArray_(x.attendance_only_json),uncertain:jsonArray_(x.uncertain_json),model:x.model||"",status:x.status||"done",created_at:x.created_at||"",created_at_display:x.created_at?formatKst(x.created_at):"",note:x.note||""};
}
async function latestScreenshotCheckByEvent_(env,aid,eventId){await ensureScreenshotSchema_(env);return publicScreenshotCheck_(await first(env.DB,"SELECT * FROM attendance_screenshot_checks WHERE alliance_id=? AND event_id=? AND status='done' ORDER BY created_at DESC LIMIT 1",aid,String(eventId||"")));}
async function screenshotCandidates_(env,aid,e){
  const scope=String(e.boss_scope||"WORLD").toUpperCase();
  const sid=String(e.server_id||"").trim();
  let rows;
  if(scope==="SERVER"){
    if(!sid)throw new Error("서버보스 회차에 server_id가 없습니다.");
    /* 서버보스는 특정 길드가 아니라 같은 server_id에 소속된 연합 전체 활성 길드원을 합산한다. */
    rows=await all(env.DB,"SELECT m.member_id,m.nickname,m.guild_id,g.guild_name,g.server_id,s.server_name FROM members m JOIN guilds g ON g.guild_id=m.guild_id LEFT JOIN alliance_servers s ON s.alliance_id=g.alliance_id AND s.server_id=g.server_id WHERE g.alliance_id=? AND g.server_id=? AND g.status='active' AND m.status='활성' ORDER BY g.guild_name,m.nickname",aid,sid);
  }else{
    /* 월드보스는 연합 전체 서버/전체 길드의 활성 길드원이 후보군이다. */
    rows=await all(env.DB,"SELECT m.member_id,m.nickname,m.guild_id,g.guild_name,g.server_id,s.server_name FROM members m JOIN guilds g ON g.guild_id=m.guild_id LEFT JOIN alliance_servers s ON s.alliance_id=g.alliance_id AND s.server_id=g.server_id WHERE g.alliance_id=? AND g.status='active' AND m.status='활성' ORDER BY s.server_name,g.guild_name,m.nickname",aid);
  }
  const seen=new Set(),out=[];
  for(const x of rows){
    const id=String(x.member_id||""),nick=String(x.nickname||"").trim();
    if(!id||!nick||seen.has(id))continue;seen.add(id);
    out.push({member_id:id,nickname:nick,guild_id:String(x.guild_id||""),guild_name:String(x.guild_name||""),server_id:String(x.server_id||""),server_name:String(x.server_name||"")});
  }
  return out;
}
function base64Bytes_(data){
  const bin=atob(String(data||"")),out=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)out[i]=bin.charCodeAt(i);return out;
}
function screenshotExt_(mime){const m=String(mime||"").toLowerCase();if(m.includes("png"))return "png";if(m.includes("webp"))return "webp";if(m.includes("gif"))return "gif";if(m.includes("bmp"))return "bmp";return "jpg";}
function workersAiText_(result){
  if(result==null)return "";
  if(typeof result==="string")return result;
  if(typeof result.response==="string")return result.response;
  if(result.choices&&result.choices[0]&&result.choices[0].message){
    const m=result.choices[0].message,c=m.content;
    if(typeof c==="string")return c;
    if(Array.isArray(c))return c.map(x=>typeof x==="string"?x:String(x?.text||x?.content||"")).join("\n");
  }
  if(result.result&&typeof result.result.response==="string")return result.result.response;
  return "";
}
function workersAiObject_(result){
  if(!result||typeof result!=="object")return null;
  if(result.response&&typeof result.response==="object"&&!Array.isArray(result.response))return result.response;
  const msg=result.choices&&result.choices[0]&&result.choices[0].message;
  if(msg){
    if(msg.parsed&&typeof msg.parsed==="object"&&!Array.isArray(msg.parsed))return msg.parsed;
    if(msg.content&&typeof msg.content==="object"&&!Array.isArray(msg.content))return msg.content;
  }
  if(result.result&&result.result.response&&typeof result.result.response==="object"&&!Array.isArray(result.result.response))return result.result.response;
  if(Array.isArray(result.matched_member_ids)||Array.isArray(result.uncertain_text))return result;
  return null;
}
function workersAiJson_(result){
  const direct=workersAiObject_(result);if(direct)return direct;
  let raw=workersAiText_(result).trim();
  if(!raw)throw new Error("Workers AI 응답 본문이 비어 있습니다.");
  raw=raw.replace(/^```(?:json)?\s*/i,"").replace(/\s*```$/i,"").trim();
  try{return JSON.parse(raw)}catch(_){}
  const a=raw.indexOf("{"),b=raw.lastIndexOf("}");
  if(a>=0&&b>=a){try{return JSON.parse(raw.slice(a,b+1))}catch(_){}}
  /* JSON 모드가 지켜지지 않은 경우를 대비한 마지막 안전 파서 */
  const out={matched_member_ids:[],uncertain_text:[],note:""};
  const mid=raw.match(/matched_member_ids\s*[:=]\s*\[([^\]]*)\]/i);
  if(mid)out.matched_member_ids=mid[1].split(",").map(x=>x.trim().replace(/^["']|["']$/g,"")).filter(Boolean);
  const unc=raw.match(/uncertain_text\s*[:=]\s*\[([^\]]*)\]/i);
  if(unc)out.uncertain_text=unc[1].split(",").map(x=>x.trim().replace(/^["']|["']$/g,"")).filter(Boolean);
  const note=raw.match(/note\s*[:=]\s*["']?([^\n\r}"']+)/i);if(note)out.note=String(note[1]||"").trim();
  if(mid||unc)return out;
  throw new Error("Workers AI 대조 결과를 구조화하지 못했습니다.");
}
function normalizeWorkersAiMatch_(value){
  const v=value&&typeof value==="object"?value:{};
  const ids=Array.isArray(v.matched_member_ids)?v.matched_member_ids.map(String).map(x=>x.trim()).filter(Boolean):[];
  const uncertain=Array.isArray(v.uncertain_text)?v.uncertain_text.map(String).map(x=>x.trim()).filter(Boolean):[];
  return {matched_member_ids:ids,uncertain_text:uncertain,note:String(v.note||"").trim()};
}
function bytesBase64_(bytes){
  const u=bytes instanceof Uint8Array?bytes:new Uint8Array(bytes||0);
  /* 2026 Workers 런타임은 Uint8Array base64 연산을 네이티브 지원한다. 큰 OCR 타일에서 JS 루프 CPU를 피한다. */
  if(typeof u.toBase64==="function")return u.toBase64();
  let out="",step=0x8000;for(let i=0;i<u.length;i+=step)out+=String.fromCharCode(...u.subarray(i,Math.min(i+step,u.length)));
  return btoa(out);
}
function screenshotImageStream_(bytes,mime){return new Blob([bytes],{type:String(mime||"image/jpeg")}).stream();}
async function screenshotTransform_(env,bytes,mime,region,label,sourceW,sourceH,targetOverride){
  if(!env.IMAGES)throw new Error("Cloudflare Images 바인딩(IMAGES)이 설정되지 않았습니다. wrangler.jsonc의 images.binding=IMAGES를 확인하세요.");
  const cropW=Math.max(1,Math.round(Number(sourceW||1)*Math.max(.08,Number(region.width||1))));
  /* Free Worker 1102 방지: 한 타일을 과도하게 2K+ PNG로 만들지 않고 OCR에 충분한 1536px 이내로 제한 */
  const targetW=Math.min(1536,Math.max(1152,Number(targetOverride||Math.round(cropW*2.25))));
  const response=(await env.IMAGES.input(screenshotImageStream_(bytes,mime))
    .transform({trim:{top:region.top,left:region.left,width:region.width,height:region.height}})
    .transform({width:targetW,fit:"scale-up",upscale:"interpolate",sharpen:3,contrast:1.28,brightness:1.03,saturation:.92})
    .output({format:"image/png",anim:false})).response();
  if(!response.ok)throw new Error(`Images transform HTTP ${response.status}`);
  const out=new Uint8Array(await response.arrayBuffer());
  return {label,data:bytesBase64_(out),mime_type:"image/png",note:`${label} ${sourceW}x${sourceH} → ${targetW}w OCR`};
}
async function screenshotVisionPlan_(env,img){
  if(!env.IMAGES)throw new Error("Cloudflare Images 바인딩(IMAGES)이 설정되지 않았습니다. wrangler.jsonc의 images.binding=IMAGES를 확인하세요.");
  const bytes=base64Bytes_(img.data),mime=String(img.mime_type||"image/jpeg");
  const info=await env.IMAGES.info(screenshotImageStream_(bytes,mime));
  const w=Math.max(1,Number(info&&info.width||0)),h=Math.max(1,Number(info&&info.height||0));
  const landscape=w>=h,regions=[];
  if(landscape){
    /* 3x2 겹침: 12타일보다 훨씬 가볍지만 기존 5대형 타일보다는 글자를 더 크게 확보한다. */
    const xs=[0,.31,.62],ys=[0,.44];
    for(let yi=0;yi<ys.length;yi++)for(let xi=0;xi<xs.length;xi++)regions.push({label:`r${yi+1}c${xi+1}`,top:ys[yi],left:xs[xi],width:.38,height:.56});
  }else{
    const xs=[0,.44],ys=[0,.31,.62];
    for(let yi=0;yi<ys.length;yi++)for(let xi=0;xi<xs.length;xi++)regions.push({label:`r${yi+1}c${xi+1}`,top:ys[yi],left:xs[xi],width:.56,height:.38});
  }
  return {bytes,mime,w,h,regions};
}
function screenshotNorm_(v){try{return String(v||"").normalize("NFKC").replace(/[\s·ㆍ.\-_\'"`~!@#$%^&*()\[\]{}<>:;|\/\\]+/g,"").toLowerCase()}catch{return String(v||"").replace(/\s+/g,"").toLowerCase()}}
function screenshotEditDistance_(a,b){
  const x=[...screenshotNorm_(a)],y=[...screenshotNorm_(b)];if(!x.length)return y.length;if(!y.length)return x.length;
  let prev=Array.from({length:y.length+1},(_,i)=>i),cur=new Array(y.length+1);
  for(let i=1;i<=x.length;i++){cur[0]=i;for(let j=1;j<=y.length;j++)cur[j]=Math.min(cur[j-1]+1,prev[j]+1,prev[j-1]+(x[i-1]===y[j-1]?0:1));[prev,cur]=[cur,prev];}
  return prev[y.length];
}
function screenshotMatchDetectedName_(name,candidates){
  const n=screenshotNorm_(name);if(!n)return {id:"",exact:false,hint:""};
  const exact=candidates.filter(c=>screenshotNorm_(c.nickname)===n);
  if(exact.length===1)return {id:exact[0].member_id,exact:true,hint:exact[0].nickname};
  let best=null,second=null;
  for(const c of candidates){const cn=screenshotNorm_(c.nickname);if(!cn)continue;const d=screenshotEditDistance_(n,cn),max=Math.max(n.length,cn.length),score=max?1-d/max:0,row={c,d,score};if(!best||score>best.score){second=best;best=row}else if(!second||score>second.score)second=row;}
  if(best&&best.score>=.80&&best.d<=1&&(!second||best.score-second.score>=.12))return {id:"",exact:false,hint:best.c.nickname};
  return {id:"",exact:false,hint:""};
}
async function geminiScreenshotViews_(env,img){
  if(!env.IMAGES)throw new Error("Cloudflare Images 바인딩(IMAGES)이 설정되지 않았습니다. wrangler.jsonc의 images.binding=IMAGES를 확인하세요.");
  const bytes=base64Bytes_(img.data),mime=String(img.mime_type||"image/jpeg");
  const info=await env.IMAGES.info(screenshotImageStream_(bytes,mime));
  const w=Math.max(1,Number(info&&info.width||0)),h=Math.max(1,Number(info&&info.height||0));
  const landscape=w>=h;
  /* 원본 + 핵심 확대 조각. Gemini는 한 요청에서 모든 이미지를 함께 보고 중복을 합친다. */
  const regions=landscape?[
    {label:"center",top:.14,left:.22,width:.56,height:.66},
    {label:"left",top:.08,left:0,width:.48,height:.72},
    {label:"right",top:.08,left:.52,width:.48,height:.72},
    {label:"lower-center",top:.34,left:.18,width:.64,height:.54}
  ]:[
    {label:"center",top:.20,left:.12,width:.76,height:.56},
    {label:"top",top:0,left:.08,width:.84,height:.52},
    {label:"bottom",top:.48,left:.08,width:.84,height:.52}
  ];
  const views=[{label:"original",data:String(img.data||""),mime_type:mime,note:`original ${w}x${h}`}];
  for(const r of regions){
    try{views.push(await screenshotTransform_(env,bytes,mime,r,r.label,w,h,1536));}
    catch(e){views.push({label:r.label,error:String(e&&e.message?e.message:e)});}
  }
  return views.filter(v=>v&&v.data);
}
function geminiResultText_(result){
  if(!result||typeof result!=="object")return "";
  const parts=result.candidates&&result.candidates[0]&&result.candidates[0].content&&result.candidates[0].content.parts;
  if(Array.isArray(parts))return parts.map(p=>String(p&&p.text||"")).join("").trim();
  return "";
}
async function geminiAnalyzeScreenshot_(env,img,candidates,context={}){
  if(!env.GEMINI_API_KEY)throw new Error("GEMINI_API_KEY secret이 설정되지 않았습니다. Google AI Studio 무료 API 키를 ROOT Worker Secret에 추가하세요.");
  const views=await geminiScreenshotViews_(env,img);
  const scope=String(context.scope||"WORLD")==="SERVER"?"서버보스":"월드보스";
  const scopeText=String(context.scope||"WORLD")==="SERVER"?`대상 서버: ${String(context.server_name||context.server_id||"해당 서버")}`:"대상: 연합 전체";
  const roster=candidates.map(c=>`${c.member_id}\t${c.nickname}\t${c.guild_name||""}`).join("\n");
  const prompt=`당신은 모바일 MMORPG 보스전 스크린샷의 참가자 닉네임을 판독하는 비전 검사기입니다.
같은 장면의 원본과 확대 조각을 함께 제공합니다. ${scope}. ${scopeText}.

[후보 명단: member_id / 닉네임 / 길드]
${roster}

규칙:
1) 실제 픽셀에서 보이는 플레이어 캐릭터 닉네임만 판독하세요. 길드명, 직책, 보스명, 데미지 숫자, 채팅, 퀘스트, 스킬/UI 문구는 제외합니다.
2) 후보 명단에 있다고 추측해서 넣지 마세요. 반드시 화면에서 해당 닉네임의 시각적 근거가 있어야 합니다.
3) 같은 장면의 확대 조각들이 겹치므로 중복은 하나로 합치세요.
4) 화면에서 읽힌 이름이 후보 명단과 명확히 일치하면 matches에 정확한 member_id와 실제로 읽힌 seen_text를 넣으세요.
5) 화면에는 보이지만 후보 명단에 없는 닉네임은 observed_unregistered에 원문 그대로 넣으세요.
6) 비슷하지만 확정할 수 없으면 uncertain에 넣으세요. 정중앙 플레이어의 닉네임도 반드시 확인하세요.
7) 작은 한글 글자를 우선해서 세밀하게 읽으세요.`;
  const schema={
    type:"object",
    properties:{
      matches:{type:"array",items:{type:"object",properties:{member_id:{type:"string"},seen_text:{type:"string"},confidence:{type:"string",enum:["high","medium","low"]}},required:["member_id","seen_text","confidence"]}},
      observed_unregistered:{type:"array",items:{type:"string"}},
      uncertain:{type:"array",items:{type:"object",properties:{seen_text:{type:"string"},candidate_member_id:{type:"string"},candidate_nickname:{type:"string"}},required:["seen_text","candidate_member_id","candidate_nickname"]}},
      note:{type:"string"}
    },
    required:["matches","observed_unregistered","uncertain","note"]
  };
  const parts=[{text:prompt}];
  for(const v of views)parts.push({inlineData:{mimeType:String(v.mime_type||"image/jpeg"),data:String(v.data||"")}});
  const body={contents:[{role:"user",parts}],generationConfig:{mediaResolution:"MEDIA_RESOLUTION_HIGH",maxOutputTokens:2200,responseFormat:{text:{mimeType:"APPLICATION_JSON",schema}}}};
  const primary=String(env.GEMINI_MODEL||"gemini-3.8-flash").trim()||"gemini-3.8-flash";
  const models=[primary,"gemini-3.5-flash","gemini-3.1-flash-lite"].filter((v,i,a)=>v&&a.indexOf(v)===i);
  let data=null,model="",lastErr="";
  for(let mi=0;mi<models.length;mi++){
    const m=models[mi],tries=mi===0?2:1;
    for(let attempt=0;attempt<tries;attempt++){
      const res=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(m)}:generateContent`,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":String(env.GEMINI_API_KEY)},body:JSON.stringify(body)});
      const text=await res.text();let parsed={};try{parsed=JSON.parse(text)}catch{}
      if(res.ok){data=parsed;model=m;break;}
      const msg=parsed&&parsed.error&&parsed.error.message?parsed.error.message:text.slice(0,300);
      lastErr=`Gemini API ${res.status} (${m}): ${msg}`;
      if(![429,500,502,503,504].includes(res.status))throw new Error(lastErr);
      if(mi===0&&attempt===0)await new Promise(r=>setTimeout(r,700));
    }
    if(data)break;
  }
  if(!data)throw new Error(lastErr||"Gemini API 호출 실패");
  let raw=geminiResultText_(data);if(!raw)throw new Error(`Gemini 응답 본문이 비어 있습니다. (${model||primary})`);
  raw=raw.replace(/^```(?:json)?\s*/i,"").replace(/\s*```$/i,"").trim();
  let obj;try{obj=JSON.parse(raw)}catch(e){throw new Error(`Gemini JSON 파싱 실패: ${raw.slice(0,220)}`);}
  const candidateById=new Map(candidates.map(c=>[String(c.member_id),c])),memberIds=new Set(),uncertain=[];
  for(const m of Array.isArray(obj.matches)?obj.matches:[]){
    const id=String(m&&m.member_id||"").trim(),seen=String(m&&m.seen_text||"").trim(),conf=String(m&&m.confidence||"").toLowerCase();
    const c=candidateById.get(id);if(!c)continue;
    if(conf==="high"||conf==="medium")memberIds.add(id);else uncertain.push({text:`${seen||c.nickname} → 후보 ${c.nickname}`});
  }
  for(const name of Array.isArray(obj.observed_unregistered)?obj.observed_unregistered:[]){
    const seen=String(name||"").trim();if(!seen)continue;const m=screenshotMatchDetectedName_(seen,candidates);if(m.id)memberIds.add(m.id);else if(m.hint)uncertain.push({text:`${seen} → 후보 ${m.hint}`});else uncertain.push({text:`미등록/대상외: ${seen}`});
  }
  for(const u of Array.isArray(obj.uncertain)?obj.uncertain:[]){const seen=String(u&&u.seen_text||"").trim(),hint=String(u&&u.candidate_nickname||"").trim();if(seen||hint)uncertain.push({text:hint?`${seen||"판독불명"} → 후보 ${hint}`:(seen||"판독불명")});}
  const uniq=[];const seenU=new Set();for(const u of uncertain){const t=String(u.text||"");if(t&&!seenU.has(t)){seenU.add(t);uniq.push(u)}}
  return {model:`Gemini Free Vision / ${model} HIGH`,member_ids:[...memberIds],uncertain:uniq,note:`views=${views.length} candidates=${candidates.length} | ${String(obj.note||"").slice(0,420)}`};
}
async function geminiScreenshotMatch_(env,images,candidates,context={}){
  const valid=(Array.isArray(images)?images:[]).slice(0,2).filter(x=>x&&x.data&&String(x.mime_type||"").startsWith("image/"));if(!valid.length)throw new Error("분석할 이미지가 없습니다.");
  const memberIds=new Set(),uncertain=[],notes=[];let model="Gemini Free Vision";
  for(let i=0;i<valid.length;i++){
    const r=await geminiAnalyzeScreenshot_(env,valid[i],candidates,context);model=r.model||model;for(const id of r.member_ids||[])memberIds.add(id);for(const u of r.uncertain||[])uncertain.push(u);if(r.note)notes.push(`image ${i+1}: ${r.note}`);
  }
  const uniq=[];const set=new Set();for(const u of uncertain){const t=String(u&&u.text||"");if(t&&!set.has(t)){set.add(t);uniq.push({text:t})}}
  return {model,member_ids:[...memberIds],uncertain:uniq,note:notes.join(" | ")};
}
async function analyzeScreenshotCore_(env,aid,eventId,images,meta={}){
  await ensureScreenshotSchema_(env);const eid=String(eventId||""),e=await first(env.DB,"SELECT * FROM boss_events WHERE alliance_id=? AND event_id=?",aid,eid);if(!e)throw new Error("보스 회차를 찾을 수 없습니다.");
  const sourceMessage=String(meta.source_message_id||"");if(sourceMessage){const old=await first(env.DB,"SELECT * FROM attendance_screenshot_checks WHERE alliance_id=? AND source_message_id=? AND status='done' ORDER BY created_at DESC LIMIT 1",aid,sourceMessage);if(old)return publicScreenshotCheck_(old);}
  const candidates=await screenshotCandidates_(env,aid,e),srv=e.server_id?await serverMeta(env,aid,e.server_id):null,analysis=await geminiScreenshotMatch_(env,images,candidates,{scope:String(e.boss_scope||"WORLD"),server_id:String(e.server_id||""),server_name:String(srv?.server_name||"")}),byId=new Map(candidates.map(x=>[x.member_id,x])),recognized=analysis.member_ids.map(id=>byId.get(id)).filter(Boolean);
  const attendance=await botAttendanceList_(env,aid,eid),attendedIds=new Set((attendance.participants||[]).map(x=>String(x.member_id||"")).filter(Boolean)),recognizedIds=new Set(recognized.map(x=>x.member_id));
  const matched=recognized.filter(x=>attendedIds.has(x.member_id)),screenshotOnly=recognized.filter(x=>!attendedIds.has(x.member_id));
  const attendanceOnly=(attendance.participants||[]).filter(x=>!recognizedIds.has(String(x.member_id||""))).map(x=>({member_id:String(x.member_id||""),nickname:String(x.nickname||""),guild_id:String(x.guild_id||""),guild_name:String(x.guild_name||""),server_id:String(x.server_id||""),server_name:String(x.server_name||"")}));
  const checkId=uid("shot"),now=nowIso();await run(env.DB,"INSERT INTO attendance_screenshot_checks(check_id,alliance_id,event_id,boss_id,boss_name,source,source_message_id,source_channel_id,result_message_id,image_count,recognized_count,recognized_json,matched_json,screenshot_only_json,attendance_only_json,uncertain_json,model,status,created_at,created_by,note) VALUES(?,?,?,?,?,?,?,?,?,?, ?,?,?,?,?,?,?, 'done',?,?,?)",checkId,aid,eid,e.boss_id||"",e.boss_name||"",String(meta.source||"web"),sourceMessage,String(meta.source_channel_id||""),"",Math.min(4,Array.isArray(images)?images.length:0),recognized.length,JSON.stringify(recognized),JSON.stringify(matched),JSON.stringify(screenshotOnly),JSON.stringify(attendanceOnly),JSON.stringify(analysis.uncertain),analysis.model,now,String(meta.created_by||""),analysis.note||"");
  return publicScreenshotCheck_(await first(env.DB,"SELECT * FROM attendance_screenshot_checks WHERE check_id=?",checkId));
}
async function queueEventDiscordDeletes_(env,aid,e){
  const seen=new Set(),links=[];
  for(const x of botParseEventDiscordLinks_(e?.note)){const k=`${x.channel_id}:${x.message_id}`;if(!seen.has(k)){seen.add(k);links.push(x)}}
  if(e?.discord_channel_id&&e?.discord_message_id){const k=`${e.discord_channel_id}:${e.discord_message_id}`;if(!seen.has(k)){seen.add(k);links.push({channel_id:e.discord_channel_id,message_id:e.discord_message_id})}}
  await ensureScreenshotSchema_(env);const shots=await all(env.DB,"SELECT source_channel_id,result_message_id FROM attendance_screenshot_checks WHERE alliance_id=? AND event_id=? AND result_message_id<>''",aid,String(e?.event_id||""));
  for(const x of shots){const k=`${x.source_channel_id}:${x.result_message_id}`;if(x.source_channel_id&&x.result_message_id&&!seen.has(k)){seen.add(k);links.push({channel_id:x.source_channel_id,message_id:x.result_message_id})}}
  for(const x of links)await queueDiscordMessageDelete_(env,aid,x.channel_id,x.message_id,`attendance event ${e?.event_id||""}`);
  return links.length;
}
async function deleteAttendanceScreenshotChecks(env,allianceId,eventId,authToken){
  const aid=String(allianceId||""),e=await first(env.DB,"SELECT * FROM boss_events WHERE alliance_id=? AND event_id=?",aid,String(eventId));if(!e)throw new Error("보스 회차를 찾을 수 없습니다.");
  await requireBossAttendanceOperate(env,authToken,aid,e.boss_scope||"WORLD",e.server_id||"");await ensureScreenshotSchema_(env);
  const rows=await all(env.DB,"SELECT * FROM attendance_screenshot_checks WHERE alliance_id=? AND event_id=?",aid,e.event_id);
  for(const x of rows)if(x.source_channel_id&&x.result_message_id)await queueDiscordMessageDelete_(env,aid,x.source_channel_id,x.result_message_id,"screenshot check delete");
  await run(env.DB,"DELETE FROM attendance_screenshot_checks WHERE alliance_id=? AND event_id=?",aid,e.event_id);
  return {ok:true,deleted:rows.length,message:`스크린샷 대조 기록 ${rows.length}건을 삭제했습니다.`};
}
async function deleteAttendanceEvent(env,allianceId,eventId,authToken){
  const aid=String(allianceId||""),eid=String(eventId||""),e=await first(env.DB,"SELECT * FROM boss_events WHERE alliance_id=? AND event_id=?",aid,eid);if(!e)throw new Error("보스 회차를 찾을 수 없습니다.");
  await requireBossAttendanceOperate(env,authToken,aid,e.boss_scope||"WORLD",e.server_id||"");
  const discordDeletes=await queueEventDiscordDeletes_(env,aid,e);
  await ensureAttendanceSyncSchema_(env);
  await Promise.all([
    run(env.DB,"DELETE FROM attendance_screenshot_checks WHERE alliance_id=? AND event_id=?",aid,eid),
    run(env.DB,"DELETE FROM boss_attendance WHERE alliance_id=? AND event_id=?",aid,eid),
    run(env.DB,"DELETE FROM attendance_result_queue WHERE alliance_id=? AND event_id=?",aid,eid),
    run(env.DB,"DELETE FROM attendance_sync_queue WHERE alliance_id=? AND event_id=?",aid,eid)
  ]);
  await run(env.DB,"DELETE FROM boss_events WHERE alliance_id=? AND event_id=?",aid,eid);
  return {ok:true,message:`${e.boss_name||"보스"} 회차를 삭제했습니다.`,discord_messages_queued:discordDeletes};
}

async function analyzeAttendanceScreenshots(env,allianceId,eventId,images,authToken){
  const aid=String(allianceId||""),e=await first(env.DB,"SELECT * FROM boss_events WHERE alliance_id=? AND event_id=?",aid,String(eventId||""));if(!e)throw new Error("보스 회차를 찾을 수 없습니다.");await requireBossAttendanceOperate(env,authToken,aid,e.boss_scope||"WORLD",e.server_id||"");
  return analyzeScreenshotCore_(env,aid,e.event_id,images,{source:"web",created_by:"web"});
}
async function applyScreenshotMissingCore_(env,aid,checkId,source){
  await ensureScreenshotSchema_(env);const c=await first(env.DB,"SELECT * FROM attendance_screenshot_checks WHERE alliance_id=? AND check_id=?",aid,String(checkId||""));if(!c)throw new Error("스크린샷 대조 결과를 찾을 수 없습니다.");const e=await first(env.DB,"SELECT * FROM boss_events WHERE alliance_id=? AND event_id=?",aid,c.event_id);if(!e)throw new Error("보스 회차를 찾을 수 없습니다.");
  const rows=jsonArray_(c.screenshot_only_json),now=nowIso();let added=0;
  for(const item of rows){const mid=String(item.member_id||"");if(!mid)continue;const m=await first(env.DB,"SELECT m.*,g.guild_name,g.server_id,g.game_server_name FROM members m JOIN guilds g ON g.guild_id=m.guild_id WHERE m.member_id=? AND g.alliance_id=? AND m.status='활성'",mid,aid);if(!m)continue;const old=await first(env.DB,"SELECT * FROM boss_attendance WHERE event_id=? AND member_id_at_event=? ORDER BY recorded_at DESC LIMIT 1",e.event_id,mid),dm=await first(env.DB,"SELECT discord_user_id FROM discord_members WHERE alliance_id=? AND current_member_id=? AND status='active'",aid,mid);if(old)await run(env.DB,"UPDATE boss_attendance SET attended=1,recorded_at=?,cancelled_at='',source=?,guild_id_at_event=?,guild_name_at_event=?,server_id_at_event=?,server_name_at_event=?,game_nickname_at_event=? WHERE attendance_id=?",now,String(source||"screenshot_confirmed"),m.guild_id,m.guild_name,m.server_id||"",m.game_server_name||"",m.nickname,old.attendance_id);else await run(env.DB,"INSERT INTO boss_attendance(attendance_id,alliance_id,event_id,boss_id,discord_user_id,guild_id_at_event,guild_name_at_event,server_id_at_event,server_name_at_event,member_id_at_event,game_nickname_at_event,attended,recorded_at,cancelled_at,online_status_snapshot,source,note) VALUES(?,?,?,?,?,?,?,?,?,?,?,1,?,'','',?,'')",uid("att"),aid,e.event_id,e.boss_id,dm?.discord_user_id||"",m.guild_id,m.guild_name,m.server_id||"",m.game_server_name||"",mid,m.nickname,now,String(source||"screenshot_confirmed"));added++;}
  await queueAttendanceSync_(env,aid,e.event_id,"upsert","screenshot apply");return {ok:true,added,event_id:e.event_id,message:`스크린샷 확인 인원 ${added}명을 참여에 추가했습니다.`,attendance:await botAttendanceList_(env,aid,e.event_id)};
}
async function applyAttendanceScreenshotMissing(env,allianceId,checkId,authToken){
  const aid=String(allianceId||"");await ensureScreenshotSchema_(env);const c=await first(env.DB,"SELECT * FROM attendance_screenshot_checks WHERE alliance_id=? AND check_id=?",aid,String(checkId||""));if(!c)throw new Error("스크린샷 대조 결과를 찾을 수 없습니다.");const e=await first(env.DB,"SELECT * FROM boss_events WHERE alliance_id=? AND event_id=?",aid,c.event_id);if(!e)throw new Error("보스 회차를 찾을 수 없습니다.");await requireBossAttendanceOperate(env,authToken,aid,e.boss_scope||"WORLD",e.server_id||"");return applyScreenshotMissingCore_(env,aid,c.check_id,"screenshot_web_confirmed");
}
async function botScreenshotWatchChannels_(env,aid,p){
  const ids=new Set();
  const rows=await all(env.DB,"SELECT channel_id FROM discord_channels WHERE alliance_id=? AND kind='attendance' AND channel_id<>''",aid);for(const x of rows)if(x.channel_id)ids.add(String(x.channel_id));
  const a=await allianceMeta(env,aid);if(a.discord_attendance_channel_id)ids.add(String(a.discord_attendance_channel_id));
  const since=new Date(Date.now()-2*60*60000).toISOString(),events=await all(env.DB,"SELECT * FROM boss_events WHERE alliance_id=? AND (attendance_status='open' OR COALESCE(NULLIF(attendance_closed_at,''),updated_at)>=?) ORDER BY created_at DESC LIMIT 100",aid,since);
  for(const e of events){if(e.discord_channel_id)ids.add(String(e.discord_channel_id));for(const l of botParseEventDiscordLinks_(e.note))if(l.channel_id)ids.add(String(l.channel_id));}
  return {channel_ids:[...ids]};
}
async function botScreenshotResolve_(env,aid,p){
  await ensureScreenshotSchema_(env);const sourceMessage=String(p.source_message_id||"");if(sourceMessage){const old=await first(env.DB,"SELECT * FROM attendance_screenshot_checks WHERE alliance_id=? AND source_message_id=? AND status='done' ORDER BY created_at DESC LIMIT 1",aid,sourceMessage);if(old){const pub=publicScreenshotCheck_(old);return {processed:true,needs_reply:!String(old.result_message_id||""),check:pub};}}
  const replyMessageId=String(p.reply_message_id||"");
  if(replyMessageId){
    const maybe=await all(env.DB,"SELECT * FROM boss_events WHERE alliance_id=? AND (discord_message_id=? OR note LIKE ?) ORDER BY created_at DESC LIMIT 100",aid,replyMessageId,`%${replyMessageId}%`);
    const exact=maybe.find(e=>String(e.discord_message_id||"")===replyMessageId||botParseEventDiscordLinks_(e.note).some(l=>String(l.message_id||"")===replyMessageId));
    if(exact)return {processed:false,requires_boss_name:false,via_reply:true,event_id:exact.event_id,boss_name:exact.boss_name,boss_scope:exact.boss_scope||"WORLD",server_id:exact.server_id||""};
  }
  const channelId=String(p.source_channel_id||""),text=String(p.message_text||"").trim().toLowerCase();let cfg=channelId?await first(env.DB,"SELECT * FROM discord_channels WHERE alliance_id=? AND kind='attendance' AND channel_id=? LIMIT 1",aid,channelId):null;
  const since=new Date(Date.now()-60*60000).toISOString();let events=await all(env.DB,"SELECT * FROM boss_events WHERE alliance_id=? AND ((attendance_status='open') OR (attendance_status='closed' AND COALESCE(NULLIF(attendance_closed_at,''),updated_at)>=?)) ORDER BY CASE WHEN attendance_status='open' THEN 0 ELSE 1 END,attendance_opened_at DESC,created_at DESC LIMIT 30",aid,since);
  if(cfg){if(String(cfg.scope)==="WORLD")events=events.filter(e=>String(e.boss_scope||"WORLD")==="WORLD");else if(String(cfg.scope)==="SERVER")events=events.filter(e=>String(e.boss_scope||"WORLD")==="SERVER"&&String(e.server_id||"")===String(cfg.server_id||""));}
  if(text){const exact=events.filter(e=>text.includes(String(e.boss_name||"").trim().toLowerCase()));if(exact.length===1)events=exact;}
  if(events.length===1){const e=events[0];return {processed:false,requires_boss_name:false,event_id:e.event_id,boss_name:e.boss_name,boss_scope:e.boss_scope||"WORLD",server_id:e.server_id||""};}
  if(!events.length)return {processed:false,requires_boss_name:false,no_event:true,message:"최근 1시간 안에 대조할 보스 출석 회차가 없습니다."};
  return {processed:false,requires_boss_name:true,candidates:events.slice(0,10).map(e=>({event_id:e.event_id,boss_name:e.boss_name,status:e.attendance_status,cut_at:formatKst(e.cut_at,false)}))};
}
async function botScreenshotAnalyze_(env,aid,p){return analyzeScreenshotCore_(env,aid,p.event_id,Array.isArray(p.images)?p.images:[],{source:"discord",source_message_id:p.source_message_id||"",source_channel_id:p.source_channel_id||"",created_by:p.discord_user_id||""});}
async function botScreenshotReplyLink_(env,aid,p){await ensureScreenshotSchema_(env);await run(env.DB,"UPDATE attendance_screenshot_checks SET result_message_id=? WHERE alliance_id=? AND check_id=?",String(p.result_message_id||""),aid,String(p.check_id||""));return {ok:true};}
async function botScreenshotLatest_(env,aid,p){
  await ensureScreenshotSchema_(env);let event=null;if(p.event_id)event=await first(env.DB,"SELECT * FROM boss_events WHERE alliance_id=? AND event_id=?",aid,String(p.event_id));
  if(!event){const actor=(p.discord_user_id||p.kakao_user_key)?await botActor_(env,aid,p):null,rows=await all(env.DB,"SELECT * FROM boss_events WHERE alliance_id=? ORDER BY created_at DESC LIMIT 100",aid),q=String(p.boss||"").trim().toLowerCase(),visible=[];for(const e of rows){if(actor&&!await botEventVisible_(actor,e))continue;if(q&&!(String(e.boss_name||"").toLowerCase().includes(q)||String(e.boss_id||"").toLowerCase()===q))continue;visible.push(e);}event=visible[0]||null;}
  if(!event)throw new Error("대조 결과를 확인할 보스 회차를 찾을 수 없습니다.");const c=await latestScreenshotCheckByEvent_(env,aid,event.event_id);if(!c)return {event_id:event.event_id,boss_name:event.boss_name,empty:true};return c;
}
async function botScreenshotApplyMissing_(env,aid,p){await ensureScreenshotSchema_(env);const c=await first(env.DB,"SELECT * FROM attendance_screenshot_checks WHERE alliance_id=? AND check_id=?",aid,String(p.check_id||""));if(!c)throw new Error("스크린샷 대조 결과를 찾을 수 없습니다.");const e=await first(env.DB,"SELECT * FROM boss_events WHERE alliance_id=? AND event_id=?",aid,c.event_id);if(!e)throw new Error("보스 회차를 찾을 수 없습니다.");await botRequireBossAttendanceOperate_(env,aid,p,e.boss_scope||"WORLD",e.server_id||"");return applyScreenshotMissingCore_(env,aid,c.check_id,"screenshot_discord_confirmed");}

async function saveAllianceBoss(env,allianceId,payload={},authToken){
  const name=String(payload.boss_name||"").trim(),type=String(payload.boss_type||"cooldown"),scope=String(payload.boss_scope||"WORLD").toUpperCase()==="SERVER"?"SERVER":"WORLD";if(!name)throw new Error("보스명을 입력하세요.");if(!["cooldown","fixed","weekly"].includes(type))throw new Error("보스 유형이 올바르지 않습니다.");let sid="";if(scope==="SERVER"){sid=String(payload.server_id||"").trim();if(!await serverMeta(env,allianceId,sid))throw new Error("서버를 선택하세요.");}await requireBossConfigScope(env,authToken,allianceId,scope,sid);if(await first(env.DB,"SELECT 1 FROM bosses WHERE alliance_id=? AND boss_name=? AND boss_scope=? AND server_id=? AND enabled=1",String(allianceId),name,scope,sid))throw new Error("같은 범위에 이미 등록된 보스명입니다.");let resp=null,fixed="";if(type==="cooldown"){const h=Number(payload.time_value||0);if(!(h>0))throw new Error("쿨타임 시간을 입력하세요.");resp=Math.round(h*60);}else if(type==="fixed"){const t=fixedTimes(payload.time_value);if(!t.length)throw new Error("고정 젠시간을 입력하세요. 예: 06:00,18:00");fixed=t.join(",");}else{const w=parseWeekly(payload.time_value);if(!w)throw new Error("요일과 시간을 선택하세요.");fixed=`${w.code}@${w.time}`;}const id=uid("boss"),a=await allianceMeta(env,allianceId),now=nowIso();await run(env.DB,"INSERT INTO bosses(boss_id,alliance_id,game_id,boss_name,boss_type,boss_scope,server_id,respawn_minutes,fixed_times,enabled,note,notify_enabled,alert_10m,alert_5m,alert_1m,alert_spawn,attendance_enabled,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,1,?,?,?,?,?,?,?,?,?)",id,String(allianceId),a.game_id||"eclipse",name,type,scope,sid,resp,fixed,String(payload.note||""),bint(payload.notify_enabled,true),bint(payload.alert_10m,true),bint(payload.alert_5m,true),bint(payload.alert_1m,true),bint(payload.alert_spawn,true),bint(payload.attendance_enabled,true),now,now);return {ok:true,message:"보스를 등록했습니다.",boss_id:id};
}
async function disableAllianceBoss(env,allianceId,bossId,authToken){const b=await first(env.DB,"SELECT * FROM bosses WHERE alliance_id=? AND boss_id=?",String(allianceId),String(bossId));if(!b)throw new Error("보스를 찾을 수 없습니다.");await requireBossConfigScope(env,authToken,allianceId,b.boss_scope||"WORLD",b.server_id||"");await env.DB.batch([env.DB.prepare("UPDATE bosses SET enabled=0,updated_at=? WHERE boss_id=?").bind(nowIso(),String(bossId)),env.DB.prepare("UPDATE boss_state SET status='삭제',updated_at=? WHERE alliance_id=? AND boss_id=?").bind(nowIso(),String(allianceId),String(bossId))]);return {ok:true,message:`${b.boss_name} 삭제 완료 · 과거 기록은 유지됩니다.`,boss_id:String(bossId),boss_name:b.boss_name};}
async function clearAllianceBossState(env,allianceId,bossId,authToken){
  const aid=String(allianceId||""),bid=String(bossId||""),b=await first(env.DB,"SELECT * FROM bosses WHERE alliance_id=? AND boss_id=?",aid,bid);if(!b)throw new Error("보스를 찾을 수 없습니다.");
  await requireBossConfigScope(env,authToken,aid,b.boss_scope||"WORLD",b.server_id||"");
  if(await first(env.DB,"SELECT 1 FROM boss_events WHERE alliance_id=? AND boss_id=? AND attendance_status='open' LIMIT 1",aid,bid))throw new Error("출석이 진행 중입니다. 먼저 해당 회차를 종료하거나 삭제하세요.");
  await run(env.DB,"DELETE FROM boss_state WHERE alliance_id=? AND boss_id=?",aid,bid);
  return {ok:true,message:`${b.boss_name} 현재 컷/젠 기록을 삭제했습니다.`};
}

async function registerAllianceBossCut(env,allianceId,bossId,cutAtValue,registeredBy,source,authToken){const b=await first(env.DB,"SELECT * FROM bosses WHERE alliance_id=? AND boss_id=? AND enabled=1",String(allianceId),String(bossId));if(!b)throw new Error("보스를 찾을 수 없습니다.");await requireBossActionMember(env,authToken,allianceId,b.boss_scope||"WORLD",b.server_id||"");if(b.boss_type!=="cooldown")throw new Error("시간표형 보스는 컷 등록이 필요하지 않습니다.");let cut=cutAtValue?parseLocalDateTime(cutAtValue):new Date();if(!cut)throw new Error("컷 시각이 올바르지 않습니다.");if(cutAtValue&&/^\d{2}:\d{2}$/.test(String(cutAtValue).trim())&&cut.getTime()>Date.now()+300000)cut=new Date(cut.getTime()-86400000);if(boolVal(b.attendance_enabled,true)&&await first(env.DB,"SELECT 1 FROM boss_events WHERE alliance_id=? AND boss_id=? AND attendance_status='open'",String(allianceId),String(bossId)))throw new Error("이미 출석 진행 중인 보스입니다.");const next=new Date(cut.getTime()+Number(b.respawn_minutes||0)*60000),now=nowIso();await run(env.DB,"INSERT INTO boss_state(alliance_id,boss_id,boss_scope,server_id,last_kill_at,next_spawn_at,status,registered_by_discord_user_id,source,updated_at,note) VALUES(?,?,?,?,?,?, '대기',?,?,?,'') ON CONFLICT(alliance_id,boss_id) DO UPDATE SET boss_scope=excluded.boss_scope,server_id=excluded.server_id,last_kill_at=excluded.last_kill_at,next_spawn_at=excluded.next_spawn_at,status='대기',registered_by_discord_user_id=excluded.registered_by_discord_user_id,source=excluded.source,updated_at=excluded.updated_at",String(allianceId),String(bossId),b.boss_scope||"WORLD",b.server_id||"",cut.toISOString(),next.toISOString(),String(registeredBy||""),String(source||"web"),now);let eventId="";if(boolVal(b.attendance_enabled,true)){eventId=uid("event");const closes=new Date(Date.now()+10*60000);await run(env.DB,"INSERT INTO boss_events(event_id,alliance_id,boss_id,boss_name,boss_scope,server_id,event_type,cut_at,next_spawn_at,attendance_opened_at,attendance_closes_at,attendance_status,registered_by_discord_user_id,source,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,'open',?,?,?,?)",eventId,String(allianceId),String(bossId),b.boss_name,b.boss_scope||"WORLD",b.server_id||"",cutAtValue?"past_cut":"cut",cut.toISOString(),next.toISOString(),now,closes.toISOString(),String(registeredBy||""),String(source||"web"),now,now);await queueAttendanceSync_(env,String(allianceId),eventId,"upsert","web cut");}return {ok:true,message:`${b.boss_name} 컷 등록 완료${eventId?" · 출석 OPEN":""}`,event_id:eventId,state:{boss_name:b.boss_name,last_kill_at:formatKst(cut),next_spawn_at:formatKst(next),status:"대기"}};}
async function setAllianceBossSpawn(env,allianceId,bossId,spawnAtValue,registeredBy,source,authToken){const b=await first(env.DB,"SELECT * FROM bosses WHERE alliance_id=? AND boss_id=? AND enabled=1",String(allianceId),String(bossId));if(!b)throw new Error("보스를 찾을 수 없습니다.");await requireBossActionMember(env,authToken,allianceId,b.boss_scope||"WORLD",b.server_id||"");const now=nowIso();if(spawnAtValue===null||String(spawnAtValue||"").trim()===""){await run(env.DB,"INSERT INTO boss_state(alliance_id,boss_id,boss_scope,server_id,next_spawn_at,status,registered_by_discord_user_id,source,updated_at,note) VALUES(?,?,?,?, '','미등록',?,?,?,'') ON CONFLICT(alliance_id,boss_id) DO UPDATE SET next_spawn_at='',status='미등록',registered_by_discord_user_id=excluded.registered_by_discord_user_id,source=excluded.source,updated_at=excluded.updated_at",String(allianceId),String(bossId),b.boss_scope||"WORLD",b.server_id||"",String(registeredBy||""),String(source||"web"),now);return {ok:true,message:`${b.boss_name} 젠 시각을 제거했습니다.`,next_spawn_at:""};}let spawn=parseLocalDateTime(spawnAtValue);if(!spawn)throw new Error("젠 시각이 올바르지 않습니다.");if(/^\d{2}:\d{2}$/.test(String(spawnAtValue).trim())&&spawn.getTime()<Date.now()-60000)spawn=new Date(spawn.getTime()+86400000);await run(env.DB,"INSERT INTO boss_state(alliance_id,boss_id,boss_scope,server_id,next_spawn_at,status,registered_by_discord_user_id,source,updated_at,note) VALUES(?,?,?,?,?,'대기',?,?,?,'') ON CONFLICT(alliance_id,boss_id) DO UPDATE SET boss_scope=excluded.boss_scope,server_id=excluded.server_id,next_spawn_at=excluded.next_spawn_at,status='대기',registered_by_discord_user_id=excluded.registered_by_discord_user_id,source=excluded.source,updated_at=excluded.updated_at",String(allianceId),String(bossId),b.boss_scope||"WORLD",b.server_id||"",spawn.toISOString(),String(registeredBy||""),String(source||"web"),now);return {ok:true,message:`${b.boss_name} 젠 시각을 변경했습니다.`,next_spawn_at:formatKst(spawn)};}
async function attendanceSummary(env,event){const rows=await all(env.DB,"SELECT * FROM boss_attendance WHERE event_id=? AND attended=1 ORDER BY guild_name_at_event,game_nickname_at_event",event.event_id);const names=rows.map(x=>x.game_nickname_at_event).filter(Boolean),manual=String(event.event_type||"")==="manual_participation";return `📋 ${event.boss_name} ${manual?"참여체크":"출석"} 종료\n참여 ${names.length}명${names.length?"\n"+names.join(" · "):""}`;}
async function closeBossAttendance(env,allianceId,eventId,source,authToken){const e=await first(env.DB,"SELECT * FROM boss_events WHERE alliance_id=? AND event_id=?",String(allianceId),String(eventId));if(!e)throw new Error("보스 이벤트를 찾을 수 없습니다.");await requireBossAttendanceOperate(env,authToken,allianceId,e.boss_scope||"WORLD",e.server_id||"");if(e.attendance_status!=="open")return {ok:true,message:"이미 종료된 출석입니다."};const now=nowIso();await run(env.DB,"UPDATE boss_events SET attendance_status='closed',attendance_closed_at=?,closed_reason='manual',updated_at=?,source=? WHERE event_id=?",now,now,String(source||e.source||"web"),String(eventId));const summary=await attendanceSummary(env,e),srv=e.server_id?await serverMeta(env,allianceId,e.server_id):null;await run(env.DB,"INSERT INTO attendance_result_queue(result_id,alliance_id,event_id,boss_id,boss_name,boss_scope,server_id,server_name,message,discord_status,kakao_status,created_at,discord_message_id,discord_channel_id,note) VALUES(?,?,?,?,?,?,?,?,?,'queued','queued',?,'','','')",uid("result"),String(allianceId),e.event_id,e.boss_id,e.boss_name,e.boss_scope||"WORLD",e.server_id||"",srv?.server_name||"",summary,now);await queueAttendanceSync_(env,String(allianceId),e.event_id,"close","web close");return {ok:true,message:"출석을 종료했습니다."};}


async function ensureScheduledAttendanceEvent(env,boss,spawn,now=new Date()){
  if(!boolVal(boss.attendance_enabled,true)||boss.boss_type==="cooldown")return null;
  const diff=Math.abs(now.getTime()-spawn.getTime());if(diff>120000)return null;
  const eventId=`event_${boss.boss_id}_${Math.floor(spawn.getTime()/1000)}`,opened=spawn.toISOString(),closes=new Date(spawn.getTime()+10*60000),status=now.getTime()<closes.getTime()?"open":"closed",n=nowIso();
  await run(env.DB,"INSERT OR IGNORE INTO boss_events(event_id,alliance_id,boss_id,boss_name,boss_scope,server_id,event_type,cut_at,next_spawn_at,attendance_opened_at,attendance_closes_at,attendance_closed_at,attendance_status,closed_reason,registered_by_discord_user_id,source,discord_message_id,discord_channel_id,created_at,updated_at,note) VALUES(?,?,?,?,?,?,'scheduled',?,'',?,?,?, ?,?,'','cron','','',?,?,'')",eventId,boss.alliance_id,boss.boss_id,boss.boss_name,boss.boss_scope||"WORLD",boss.server_id||"",opened,opened,closes.toISOString(),status==="closed"?n:"",status,status==="closed"?"auto_10m":"",n,n);
  return eventId;
}

async function processScheduled(env){
  await ensureBootstrap(env);const now=new Date(),nowS=now.toISOString();
  const expired=await all(env.DB,"SELECT * FROM boss_events WHERE attendance_status='open' AND attendance_closes_at<>'' AND attendance_closes_at<=?",nowS);
  for(const e of expired){await run(env.DB,"UPDATE boss_events SET attendance_status='closed',attendance_closed_at=?,closed_reason='auto_10m',updated_at=? WHERE event_id=? AND attendance_status='open'",nowS,nowS,e.event_id);const summary=await attendanceSummary(env,e),srv=e.server_id?await serverMeta(env,e.alliance_id,e.server_id):null;await run(env.DB,"INSERT OR IGNORE INTO attendance_result_queue(result_id,alliance_id,event_id,boss_id,boss_name,boss_scope,server_id,server_name,message,discord_status,kakao_status,created_at,discord_message_id,discord_channel_id,note) VALUES(?,?,?,?,?,?,?,?,?,'queued','queued',?,'','','auto close')",`result_${e.event_id}`,e.alliance_id,e.event_id,e.boss_id,e.boss_name,e.boss_scope||"WORLD",e.server_id||"",srv?.server_name||"",summary,nowS);await queueAttendanceSync_(env,e.alliance_id,e.event_id,"close","auto close");}
  const bosses=await all(env.DB,"SELECT b.*,a.discord_alert_channel_id FROM bosses b JOIN alliances a ON a.alliance_id=b.alliance_id WHERE b.enabled=1 AND b.notify_enabled=1 AND a.status='active'");
  for(const b of bosses){let spawns=[];if(b.boss_type==="cooldown"){const st=await first(env.DB,"SELECT next_spawn_at FROM boss_state WHERE alliance_id=? AND boss_id=?",b.alliance_id,b.boss_id);if(st?.next_spawn_at)spawns=[new Date(st.next_spawn_at)];}else spawns=scheduledCandidates(b,now);for(const spawn of spawns){if(!spawn||Number.isNaN(spawn.getTime()))continue;if(b.boss_type!=="cooldown")await ensureScheduledAttendanceEvent(env,b,spawn,now);for(const a of [{type:"10m",mins:10,on:boolVal(b.alert_10m,true)},{type:"5m",mins:5,on:boolVal(b.alert_5m,true)},{type:"1m",mins:1,on:boolVal(b.alert_1m,true)},{type:"spawn",mins:0,on:boolVal(b.alert_spawn,true)}]){if(!a.on)continue;const due=new Date(spawn.getTime()-a.mins*60000),lag=now.getTime()-due.getTime();if(lag<0||lag>=120000)continue;const srv=b.server_id?await serverMeta(env,b.alliance_id,b.server_id):null,t=formatKst(spawn,false).slice(-5),msg=a.type==="spawn"?`🚨 [${b.boss_name}] 젠 시간입니다! (${t} 젠)`:`⏰ [${b.boss_name}] 젠 ${a.mins}분 전입니다. (${t} 젠)`;await run(env.DB,"INSERT OR IGNORE INTO boss_alert_queue(alert_id,alliance_id,boss_id,boss_name,boss_scope,server_id,server_name,spawn_at,alert_type,due_at,status,discord_status,kakao_status,message,created_at,target,discord_channel_id,discord_channel_ids,note) VALUES(?,?,?,?,?,?,?,?,?,?,'queued','queued','queued',?,?,'alliance',?,'','')",uid("alert"),b.alliance_id,b.boss_id,b.boss_name,b.boss_scope||"WORLD",b.server_id||"",srv?.server_name||"",spawn.toISOString(),a.type,due.toISOString(),msg,nowS,b.discord_alert_channel_id||"");}}}
  await run(env.DB,"DELETE FROM sessions WHERE expires_at<=?",nowS);
  return {ok:true,attendance_closed:expired.length};
}

const RPC = {
  webLogin, webWhoAmI, webLogout, issueAllianceLeaderBootstrapPin,
  getAllianceHomeData, getGuildAppData, getAdminStructure,
  createAllianceWorkspace, renameAlliance, deactivateAlliance, restoreAlliance, deleteAlliancePermanently,
  createGuildWorkspace, renameGuild, updateGuildServer, deactivateGuild, restoreGuild, deleteGuildPermanently,
  saveAllianceNotice, deleteAllianceNotice, saveGuildNotice, deleteGuildNotice,
  saveGuildMember, deleteGuildMember, resetMemberWebPin, updateGuildMemberRole, updateMemberAllianceRole,
  saveGuildLoot, markGuildLootSold, deleteGuildLoot, addFundTransaction, deleteFundTransaction, getGuildStats,
  getAttendanceEvents, getAttendanceRoster, setAttendanceMember, analyzeAttendanceScreenshots, applyAttendanceScreenshotMissing, deleteAttendanceScreenshotChecks, deleteAttendanceEvent,
  saveAllianceBoss, disableAllianceBoss, clearAllianceBossState, registerAllianceBossCut, setAllianceBossSpawn, closeBossAttendance
};

async function handleRpc(request, env){
  let body;try{body=await request.json()}catch{throw new Error("JSON 요청 형식이 올바르지 않습니다.");}
  const method=String(body?.method||""),args=Array.isArray(body?.args)?body.args:[];
  const fn=RPC[method];if(!fn)throw new Error("지원하지 않는 RPC: "+method);
  return await fn(env,...args);
}

/* ===== V6.0.3 DIRECT BOT API (Discord + Kakao -> Worker -> D1) ===== */
function botSource_(p){return p&&p.kakao_user_key?"kakao":"discord";}
function botActorId_(p){return p&&p.kakao_user_key?`kakao:${String(p.kakao_user_key)}`:String(p&&p.discord_user_id||"");}
function botNormalizeKey_(v){return String(v||"").trim().toLowerCase();}

async function botActiveAlliances_(env){return all(env.DB,"SELECT * FROM alliances WHERE status='active' ORDER BY created_at,alliance_id");}
async function botResolveAllianceQuery_(env,query){
  const rows=await botActiveAlliances_(env),q=String(query||"").trim();
  if(!q){
    if(rows.length===1)return {requires_selection:false,alliance_id:rows[0].alliance_id,alliance_name:rows[0].alliance_name};
    return {requires_selection:true,alliances:rows.map(a=>({alliance_id:a.alliance_id,alliance_name:a.alliance_name}))};
  }
  const ql=q.toLowerCase();
  let hit=rows.find(a=>String(a.alliance_id).toLowerCase()===ql)||rows.find(a=>String(a.alliance_name).trim().toLowerCase()===ql);
  if(!hit){const p=rows.filter(a=>String(a.alliance_name||"").toLowerCase().includes(ql));if(p.length===1)hit=p[0];}
  if(!hit)throw new Error("연합을 찾을 수 없습니다: "+q);
  return {requires_selection:false,alliance_id:hit.alliance_id,alliance_name:hit.alliance_name};
}
async function botResolveAlliance_(env,body){
  const explicit=String(body.alliance_id||"").trim();
  if(explicit){const a=await first(env.DB,"SELECT * FROM alliances WHERE alliance_id=? AND status='active'",explicit);if(!a)throw new Error("활성 연합을 찾을 수 없습니다: "+explicit);return a;}
  const ds=String(body.discord_server_id||"").trim();
  if(ds){const a=await first(env.DB,"SELECT * FROM alliances WHERE discord_server_id=? AND status='active'",ds);if(a)return a;throw new Error("이 Discord 서버에 연결된 연합이 없습니다. /서버연결 을 먼저 실행하세요.");}
  const rows=await botActiveAlliances_(env);if(rows.length===1)return rows[0];
  throw new Error("연합을 확인할 수 없습니다.");
}
async function botListAlliances_(env){const rows=await botActiveAlliances_(env);return {alliances:rows.map(a=>({alliance_id:a.alliance_id,alliance_name:a.alliance_name,discord_server_id:a.discord_server_id||""}))};}
async function botBindAlliance_(env,discordServerId,query){
  const ds=String(discordServerId||"").trim();if(!ds)throw new Error("Discord 서버 ID가 없습니다.");
  const r=await botResolveAllianceQuery_(env,query);if(r.requires_selection)throw new Error("연합을 선택하세요.");
  const now=nowIso();await env.DB.batch([
    env.DB.prepare("UPDATE alliances SET discord_server_id='',discord_enabled=0,updated_at=? WHERE discord_server_id=? AND alliance_id<>?").bind(now,ds,r.alliance_id),
    env.DB.prepare("UPDATE alliances SET discord_server_id=?,discord_enabled=1,updated_at=? WHERE alliance_id=?").bind(ds,now,r.alliance_id)
  ]);
  return {ok:true,alliance_id:r.alliance_id,alliance_name:r.alliance_name,message:`${r.alliance_name} 연합에 연결했습니다.`};
}
async function botUnbindAlliance_(env,discordServerId){const ds=String(discordServerId||"").trim();if(!ds)throw new Error("Discord 서버 ID가 없습니다.");const a=await first(env.DB,"SELECT * FROM alliances WHERE discord_server_id=? AND status='active'",ds);if(!a)return {ok:true,message:"이미 연결 해제 상태입니다."};await run(env.DB,"UPDATE alliances SET discord_server_id='',discord_enabled=0,updated_at=? WHERE alliance_id=?",nowIso(),a.alliance_id);return {ok:true,alliance_id:a.alliance_id,alliance_name:a.alliance_name,message:"Discord 서버 연결을 해제했습니다."};}

async function botConfig_(env,aid){
  const a=await allianceMeta(env,aid),guilds=await activeGuilds(env,aid),servers=await all(env.DB,"SELECT * FROM alliance_servers WHERE alliance_id=? AND enabled=1 ORDER BY server_name",aid),channels=await all(env.DB,"SELECT scope,server_id,kind,channel_id FROM discord_channels WHERE alliance_id=?",aid);
  return {alliance_id:aid,alliance_name:a.alliance_name,discord_server_id:a.discord_server_id||"",discord_enabled:boolVal(a.discord_enabled,false),discord_alert_channel_id:a.discord_alert_channel_id||"",discord_attendance_channel_id:a.discord_attendance_channel_id||"",guilds:guilds.map(g=>({guild_id:g.guild_id,guild_name:g.guild_name,server_id:g.server_id||"",server_name:g.game_server_name||"",discord_role_id:g.discord_role_id||"",discord_role_name:g.discord_role_name||g.guild_name,discord_tag:g.discord_tag||g.guild_name,discord_display_format:g.discord_display_format||"[TAG] NICKNAME"})),servers:servers.map(s=>({server_id:s.server_id,server_name:s.server_name})),channels};
}

async function botDiscordRoleSync_(env,aid){
  const guilds=await activeGuilds(env,aid);
  const managedGuildRoleNames=[...new Set(
    guilds.map(g=>String(g.discord_role_name||g.guild_name||"").trim()).filter(Boolean)
  )];

  const rows=await all(env.DB,`
    SELECT
      dm.discord_user_id,
      dm.discord_username,
      dm.current_guild_id AS guild_id,
      dm.current_member_id AS member_id,
      dm.status AS discord_status,
      m.nickname,
      m.role AS guild_role,
      m.alliance_role,
      m.status AS member_status,
      g.guild_name,
      g.discord_role_id,
      g.discord_role_name,
      g.status AS guild_status
    FROM discord_members dm
    LEFT JOIN members m
      ON m.member_id=dm.current_member_id
     AND m.guild_id=dm.current_guild_id
    LEFT JOIN guilds g
      ON g.guild_id=dm.current_guild_id
     AND g.alliance_id=dm.alliance_id
    WHERE dm.alliance_id=?
    ORDER BY dm.discord_user_id
  `,aid);

  return {
    alliance_id:aid,
    managed_alliance_role_names:["연합장","연합운영진","연합원"],
    managed_position_role_names:["길드장","부길드장","길드운영진"],
    managed_guild_role_names:managedGuildRoleNames,
    members:rows.map(x=>{
      const active=
        String(x.discord_status||"")==="active" &&
        String(x.member_status||"")==="활성" &&
        String(x.guild_status||"")==="active" &&
        !!String(x.guild_id||"") &&
        !!String(x.member_id||"");

      const guildRole=active?normalizeGuildRole(x.guild_role):"";
      const allianceRole=active?normalizeAllianceRole(x.alliance_role):"";

      return {
        discord_user_id:String(x.discord_user_id||""),
        discord_username:String(x.discord_username||""),
        active,
        guild_id:active?String(x.guild_id||""):"",
        guild_name:active?String(x.guild_name||""):"",
        member_id:active?String(x.member_id||""):"",
        nickname:active?String(x.nickname||""):"",
        guild_role:guildRole,
        alliance_role:allianceRole,
        discord_alliance_role_name:active?(allianceRole||"연합원"):"",
        discord_position_role_name:active?discordGuildPositionRole_(guildRole):"",
        discord_guild_role_id:active?String(x.discord_role_id||""):"",
        discord_guild_role_name:active?String(x.discord_role_name||x.guild_name||""):""
      };
    })
  };
}
async function botSetDiscordChannel_(env,aid,p,discordServerId){
  const kind=String(p.kind||"alert")==="attendance"?"attendance":"alert",channel=String(p.channel_id||"").trim();if(!channel)throw new Error("Discord 채널 ID가 필요합니다.");
  let scope=String(p.scope||"ALL").toUpperCase();if(!["ALL","WORLD","SERVER"].includes(scope))scope="ALL";let sid=scope==="SERVER"?String(p.server_id||"").trim():"";
  if(scope==="SERVER"&&!await first(env.DB,"SELECT 1 FROM alliance_servers WHERE alliance_id=? AND server_id=? AND enabled=1",aid,sid))throw new Error("서버를 선택하세요.");
  await run(env.DB,"INSERT INTO discord_channels(alliance_id,scope,server_id,kind,channel_id,updated_at,note) VALUES(?,?,?,?,?,?,'') ON CONFLICT(alliance_id,scope,server_id,kind) DO UPDATE SET channel_id=excluded.channel_id,updated_at=excluded.updated_at",aid,scope,sid,kind,channel,nowIso());
  const patchKind=kind==="alert"?"discord_alert_channel_id":"discord_attendance_channel_id";
  if(scope==="ALL")await run(env.DB,`UPDATE alliances SET discord_server_id=?,discord_enabled=1,${patchKind}=?,updated_at=? WHERE alliance_id=?`,String(discordServerId||""),channel,nowIso(),aid);
  else await run(env.DB,"UPDATE alliances SET discord_server_id=?,discord_enabled=1,updated_at=? WHERE alliance_id=?",String(discordServerId||""),nowIso(),aid);
  return {ok:true,message:`${kind==="alert"?"보스알림":"출석"} 채널을 설정했습니다.`,kind,scope,server_id:sid,channel_id:channel,config:await botConfig_(env,aid)};
}

async function botResolveChannels_(env,aid,kind,scope,serverId){
  const sc=String(scope||"WORLD").toUpperCase()==="SERVER"?"SERVER":"WORLD",sid=sc==="SERVER"?String(serverId||""):"";
  let rows=[];
  if(sc==="SERVER"){
    rows=await all(env.DB,"SELECT channel_id FROM discord_channels WHERE alliance_id=? AND scope='SERVER' AND server_id=? AND kind=? AND channel_id<>''",aid,sid,kind);
  }else{
    rows=await all(env.DB,"SELECT channel_id FROM discord_channels WHERE alliance_id=? AND scope='SERVER' AND kind=? AND channel_id<>'' ORDER BY server_id",aid,kind);
    if(!rows.length)rows=await all(env.DB,"SELECT channel_id FROM discord_channels WHERE alliance_id=? AND scope='WORLD' AND server_id='' AND kind=? AND channel_id<>''",aid,kind);
  }
  if(!rows.length)rows=await all(env.DB,"SELECT channel_id FROM discord_channels WHERE alliance_id=? AND scope='ALL' AND server_id='' AND kind=? AND channel_id<>''",aid,kind);
  let ids=[...new Set(rows.map(x=>String(x.channel_id||"")).filter(Boolean))];
  if(!ids.length){const a=await allianceMeta(env,aid),fallback=String(kind==="attendance"?a.discord_attendance_channel_id:a.discord_alert_channel_id||"");if(fallback)ids=[fallback];}
  return ids;
}
async function botResolveChannel_(env,aid,kind,scope,serverId){return (await botResolveChannels_(env,aid,kind,scope,serverId))[0]||"";}
function botDiscordDisplay_(g,nickname){const tag=String(g.discord_tag||g.guild_name||"").trim(),fmt=String(g.discord_display_format||"[TAG] NICKNAME").trim();if(fmt==="TAG | NICKNAME")return `${tag} | ${nickname}`;if(fmt==="TAG-NICKNAME")return `${tag}-${nickname}`;if(fmt==="NICKNAME")return nickname;return `[${tag}] ${nickname}`;}
async function botEnsureMember_(env,guildId,nickname,existingMemberId,source){
  if(existingMemberId){const old=await first(env.DB,"SELECT * FROM members WHERE member_id=? AND guild_id=?",String(existingMemberId),String(guildId));if(old){await run(env.DB,"UPDATE members SET nickname=?,status='활성' WHERE member_id=?",nickname,old.member_id);return old.member_id;}}
  const same=await first(env.DB,"SELECT * FROM members WHERE guild_id=? AND nickname=? AND status='활성'",String(guildId),nickname);if(same)return same.member_id;
  const id=uid("member");await run(env.DB,"INSERT INTO members(member_id,guild_id,nickname,role,alliance_role,joined_at,status,note,web_pin_hash,web_access_enabled) VALUES(?,?,?,'길드원','',?,'활성',?,'',0)",id,String(guildId),nickname,nowIso(),source==="kakao"?"Kakao 등록":"Discord 등록");return id;
}
async function botRegisterDiscordMember_(env,aid,p){
  const user=String(p.discord_user_id||"").trim(),username=String(p.discord_username||"").trim(),gid=String(p.guild_id||"").trim(),nick=String(p.game_nickname||"").trim();if(!user||!gid||!nick)throw new Error("Discord ID, 길드, 게임 닉네임이 필요합니다.");
  const g=await first(env.DB,"SELECT * FROM guilds WHERE guild_id=? AND alliance_id=? AND status='active'",gid,aid);if(!g)throw new Error("현재 연합의 활성 길드가 아닙니다.");
  const old=await first(env.DB,"SELECT * FROM discord_members WHERE alliance_id=? AND discord_user_id=?",aid,user),oldG=old?.current_guild_id||"",oldNick=old?.game_nickname||"";
  if(old&&oldG&&oldG!==gid&&old.current_member_id)await run(env.DB,"UPDATE members SET status='이동' WHERE member_id=?",old.current_member_id);
  const mid=await botEnsureMember_(env,gid,nick,old&&oldG===gid?old.current_member_id:"","discord"),display=botDiscordDisplay_(g,nick),now=nowIso();
  await run(env.DB,"INSERT INTO discord_members(alliance_id,discord_user_id,discord_username,current_guild_id,current_member_id,game_nickname,discord_display_name,status,registered_at,last_reregistered_at,updated_at,source,note) VALUES(?,?,?,?,?,?,?,'active',?,?,?,'discord','') ON CONFLICT(alliance_id,discord_user_id) DO UPDATE SET discord_username=excluded.discord_username,current_guild_id=excluded.current_guild_id,current_member_id=excluded.current_member_id,game_nickname=excluded.game_nickname,discord_display_name=excluded.discord_display_name,status='active',last_reregistered_at=excluded.updated_at,updated_at=excluded.updated_at",aid,user,username,gid,mid,nick,display,old?.registered_at||now,old?now:"",now);
  await run(env.DB,"INSERT INTO membership_history(history_id,alliance_id,discord_user_id,action_type,from_guild_id,to_guild_id,old_nickname,new_nickname,changed_at,source,changed_by_discord_user_id,note) VALUES(?,?,?,?,?,?,?,?,?,'discord',?,'')",uid("mh"),aid,user,old?"reregister":"register",oldG,gid,oldNick,nick,now,user);
  const allGuildNames=(await activeGuilds(env,aid)).map(x=>String(x.discord_role_name||x.guild_name)).filter(Boolean),srv=await serverMeta(env,aid,g.server_id);
  const member=await first(env.DB,"SELECT role,alliance_role FROM members WHERE member_id=? AND guild_id=?",mid,gid);
  const guildRole=normalizeGuildRole(member?.role),allianceRole=normalizeAllianceRole(member?.alliance_role);
  return {
    registered:true,reregistered:!!old,alliance_id:aid,guild_id:gid,member_id:mid,
    guild_name:g.guild_name,server_id:g.server_id||"",server_name:srv?.server_name||g.game_server_name||"",
    game_nickname:nick,discord_display_name:display,
    discord_role_id:g.discord_role_id||"",discord_role_name:g.discord_role_name||g.guild_name,
    guild_role:guildRole,alliance_role:allianceRole,
    alliance_role_name:allianceRole||"연합원",
    guild_position_role_name:discordGuildPositionRole_(guildRole),
    all_guild_role_names:allGuildNames
  };
}
async function botRegisterKakaoMember_(env,aid,p){
  const key=String(p.kakao_user_key||"").trim(),sender=String(p.kakao_sender||p.sender||"").trim(),guildKey=String(p.guild_key||p.guild_id||"").trim(),nick=String(p.game_nickname||"").trim();if(!key||!guildKey||!nick)throw new Error("카카오 사용자, 길드, 게임 닉네임이 필요합니다.");
  const gs=await activeGuilds(env,aid),q=guildKey.toLowerCase();let g=gs.find(x=>String(x.guild_id).toLowerCase()===q)||gs.find(x=>String(x.guild_name).trim().toLowerCase()===q);if(!g){const p2=gs.filter(x=>String(x.guild_name).toLowerCase().includes(q));if(p2.length===1)g=p2[0];}if(!g)throw new Error("길드를 찾을 수 없습니다: "+guildKey);
  const old=await first(env.DB,"SELECT * FROM kakao_members WHERE alliance_id=? AND kakao_user_key=?",aid,key),oldG=old?.current_guild_id||"",oldNick=old?.game_nickname||"";if(old&&oldG&&oldG!==g.guild_id&&old.current_member_id)await run(env.DB,"UPDATE members SET status='이동' WHERE member_id=?",old.current_member_id);
  const mid=await botEnsureMember_(env,g.guild_id,nick,old&&oldG===g.guild_id?old.current_member_id:"","kakao"),now=nowIso();
  await run(env.DB,"INSERT INTO kakao_members(alliance_id,kakao_user_key,kakao_user_hash,kakao_sender,kakao_room_id,kakao_room_name,current_guild_id,current_member_id,game_nickname,status,registered_at,last_reregistered_at,updated_at,source,note) VALUES(?,?,?,?,?,?,?,?,?,'active',?,?,?,'kakao','') ON CONFLICT(alliance_id,kakao_user_key) DO UPDATE SET kakao_user_hash=excluded.kakao_user_hash,kakao_sender=excluded.kakao_sender,kakao_room_id=excluded.kakao_room_id,kakao_room_name=excluded.kakao_room_name,current_guild_id=excluded.current_guild_id,current_member_id=excluded.current_member_id,game_nickname=excluded.game_nickname,status='active',last_reregistered_at=excluded.updated_at,updated_at=excluded.updated_at",aid,key,String(p.user_hash||""),sender,String(p.room_id||""),String(p.room_name||""),g.guild_id,mid,nick,old?.registered_at||now,old?now:"",now);
  await run(env.DB,"INSERT INTO membership_history(history_id,alliance_id,discord_user_id,action_type,from_guild_id,to_guild_id,old_nickname,new_nickname,changed_at,source,changed_by_discord_user_id,note) VALUES(?,?,?, ?,?,?,?,?,?,'kakao','','')",uid("mh"),aid,"kakao:"+key,old?"reregister":"register",oldG,g.guild_id,oldNick,nick,now);
  return {registered:true,reregistered:!!old,alliance_id:aid,guild_id:g.guild_id,member_id:mid,guild_name:g.guild_name,game_nickname:nick};
}

async function botActor_(env,aid,p,required=true){
  let ident,kind="discord";
  if(p&&p.kakao_user_key){kind="kakao";ident=await first(env.DB,"SELECT * FROM kakao_members WHERE alliance_id=? AND kakao_user_key=? AND status='active'",aid,String(p.kakao_user_key));}
  else ident=await first(env.DB,"SELECT * FROM discord_members WHERE alliance_id=? AND discord_user_id=? AND status='active'",aid,String(p&&p.discord_user_id||""));
  if(!ident){if(required)throw new Error(kind==="kakao"?"먼저 !등록 길드명 게임닉네임 을 완료하세요.":"먼저 /등록을 완료하세요.");return null;}
  const gid=String(ident.current_guild_id||""),mid=String(ident.current_member_id||"");if(!gid||!mid)throw new Error("현재 길드 등록이 없습니다.");
  const g=await guildMeta(env,gid),m=await first(env.DB,"SELECT * FROM members WHERE member_id=? AND guild_id=?",mid,gid);if(!m)throw new Error("길드원 정보를 찾을 수 없습니다.");const srv=await serverMeta(env,aid,g.server_id);
  return {kind,identity:ident,guild:g,member:m,guild_id:gid,member_id:mid,nickname:m.nickname||ident.game_nickname||"",guild_role:normalizeGuildRole(m.role),guild_level:guildRoleLevel(m.role),alliance_role:normalizeAllianceRole(m.alliance_role),alliance_level:allianceRoleLevel(m.alliance_role),server_id:g.server_id||"",server_name:srv?.server_name||g.game_server_name||""};
}
async function botRequireBossAction_(env,aid,p){const a=await botActor_(env,aid,p);if(a.guild_level>=10||a.alliance_level>=70)return a;throw new Error("등록된 길드원만 사용할 수 있습니다.");}
async function botRequireBossOperate_(env,aid,p){const a=await botActor_(env,aid,p);if(a.alliance_level>=70||a.guild_level>=20)return a;throw new Error("길드 운영진 이상 권한이 필요합니다.");}
async function botRequireBossAttendanceOperate_(env,aid,p,scope,serverId){const a=await botActor_(env,aid,p);const sc=String(scope||"WORLD").toUpperCase()==="SERVER"?"SERVER":"WORLD",sid=String(serverId||"");if(a.alliance_level>=70)return a;if(sc==="SERVER"&&a.guild_level>=20&&String(a.server_id||"")===sid)return a;if(sc==="WORLD")throw new Error("월드보스 출석 운영은 연합장/연합운영진만 가능합니다.");throw new Error("자기 서버 보스 출석은 길드 운영진 이상만 운영할 수 있습니다.");}
async function botRequireBossConfigScope_(env,aid,p,scope,serverId){const a=await botActor_(env,aid,p);const sc=String(scope||"WORLD").toUpperCase()==="SERVER"?"SERVER":"WORLD",sid=String(serverId||"");if(a.alliance_level>=70)return a;if(sc==="SERVER"&&a.guild_level>=20&&String(a.server_id||"")===sid)return a;if(sc==="WORLD")throw new Error("월드보스 설정은 연합장/연합운영진만 가능합니다.");throw new Error("자기 서버의 길드장/부길드장/길드운영진만 서버보스를 설정할 수 있습니다.");}
async function botRequireAllianceOperate_(env,aid,p){const a=await botActor_(env,aid,p);if(a.alliance_level>=70)return a;throw new Error("연합운영진 이상 권한이 필요합니다.");}
async function botRequireGuildOperate_(env,aid,p){const a=await botActor_(env,aid,p);if(a.guild_level>=20)return a;throw new Error("길드 운영진 이상 권한이 필요합니다.");}
async function botWebPinSelf_(env,aid,p){
  const a=await botActor_(env,aid,p);
  const r=await issueMemberSelfWebPin_(env,a.member_id,a.kind==="kakao"?"kakao":"discord");
  return {...r,guild_name:a.guild.guild_name,alliance_role:a.alliance_role,guild_role:a.guild_role};
}

async function botBosses_(env,aid,p={}){const list=await bossView(env,aid),actor=await botActor_(env,aid,p,false);if(!actor)return list;return list.filter(b=>b.boss_scope!=="SERVER"||String(b.server_id)===String(actor.server_id));}
async function botBoss_(env,aid,value,p={}){const list=await botBosses_(env,aid,p),q=String(value||"").trim().toLowerCase();let b=list.find(x=>String(x.boss_id).toLowerCase()===q)||list.find(x=>String(x.boss_name).trim().toLowerCase()===q);if(!b){const pp=list.filter(x=>String(x.boss_name).toLowerCase().includes(q));if(pp.length===1)b=pp[0];}if(!b)throw new Error("보스를 찾을 수 없습니다: "+value);return b;}
async function botBossRow_(env,aid,value,p={}){const v=await botBoss_(env,aid,value,p);return first(env.DB,"SELECT * FROM bosses WHERE alliance_id=? AND boss_id=? AND enabled=1",aid,v.boss_id);}

async function botBossAdd_(env,aid,p){let scope=String(p.boss_scope||"WORLD").toUpperCase()==="SERVER"?"SERVER":"WORLD",sid=scope==="SERVER"?String(p.server_id||"").trim():"";if(scope==="SERVER"&&!await serverMeta(env,aid,sid))throw new Error("서버를 선택하세요.");await botRequireBossConfigScope_(env,aid,p,scope,sid);const name=String(p.boss_name||"").trim(),type=String(p.boss_type||"cooldown");if(!name)throw new Error("보스명을 입력하세요.");if(!["cooldown","fixed","weekly"].includes(type))throw new Error("보스 유형이 올바르지 않습니다.");let resp=null,fixed="";if(type==="cooldown"){const h=Number(p.time_value||0);if(!(h>0))throw new Error("쿨타임(시간)을 입력하세요.");resp=Math.round(h*60);}else if(type==="fixed"){const t=fixedTimes(p.time_value);if(!t.length)throw new Error("고정 젠시간을 입력하세요.");fixed=t.join(",");}else{const w=parseWeekly(p.time_value);if(!w)throw new Error("주간 형식은 SAT@00:00 처럼 입력하세요.");fixed=`${w.code}@${w.time}`;}if(await first(env.DB,"SELECT 1 FROM bosses WHERE alliance_id=? AND boss_name=? AND boss_scope=? AND server_id=? AND enabled=1",aid,name,scope,sid))throw new Error("같은 범위에 이미 등록된 보스명입니다.");const id=uid("boss"),now=nowIso();await run(env.DB,"INSERT INTO bosses(boss_id,alliance_id,game_id,boss_name,boss_type,boss_scope,server_id,respawn_minutes,fixed_times,enabled,note,notify_enabled,alert_10m,alert_5m,alert_1m,alert_spawn,attendance_enabled,created_at,updated_at) VALUES(?,?, 'eclipse',?,?,?,?,?,?,1,?,?,?,?,?,?,?,?,?)",id,aid,name,type,scope,sid,resp,fixed,String(p.note||""),bint(p.notify_enabled,true),bint(p.alert_10m,true),bint(p.alert_5m,true),bint(p.alert_1m,true),bint(p.alert_spawn,true),bint(p.attendance_enabled,true),now,now);const srv=sid?await serverMeta(env,aid,sid):null;return {boss_id:id,boss_name:name,boss_scope:scope,server_id:sid,server_name:scope==="SERVER"?(srv?.server_name||sid):"월드",message:"보스를 등록했습니다."};}
async function botBossUpdate_(env,aid,p){
  const b=await botBossRow_(env,aid,p.boss,p);
  await botRequireBossConfigScope_(env,aid,p,b.boss_scope||"WORLD",b.server_id||"");
  const sets=[],args=[];
  if(p.boss_name!==undefined&&String(p.boss_name).trim()){sets.push("boss_name=?");args.push(String(p.boss_name).trim());}
  let type=p.boss_type!==undefined&&String(p.boss_type).trim()?String(p.boss_type):String(b.boss_type);
  if(p.boss_type!==undefined){if(!["cooldown","fixed","weekly"].includes(type))throw new Error("보스 유형이 올바르지 않습니다.");sets.push("boss_type=?");args.push(type);}
  if(p.time_value!==undefined&&String(p.time_value).trim()!==""){
    if(type==="cooldown"){const h=Number(p.time_value);if(!(h>0))throw new Error("쿨타임이 올바르지 않습니다.");sets.push("respawn_minutes=?","fixed_times=?");args.push(Math.round(h*60),"");}
    else if(type==="fixed"){const t=fixedTimes(p.time_value);if(!t.length)throw new Error("고정 젠시간이 올바르지 않습니다.");sets.push("respawn_minutes=?","fixed_times=?");args.push(null,t.join(","));}
    else{const w=parseWeekly(p.time_value);if(!w)throw new Error("주간 형식은 SAT@00:00 처럼 입력하세요.");sets.push("respawn_minutes=?","fixed_times=?");args.push(null,`${w.code}@${w.time}`);}
  }
  if(p.boss_scope!==undefined){
    const scope=String(p.boss_scope).toUpperCase()==="SERVER"?"SERVER":"WORLD";
    let sid=scope==="SERVER"?String(p.server_id||"").trim():"";
    if(scope==="SERVER"&&!await serverMeta(env,aid,sid))throw new Error("서버를 선택하세요.");
    await botRequireBossConfigScope_(env,aid,p,scope,sid);
    sets.push("boss_scope=?","server_id=?");args.push(scope,sid);
  }else if(p.server_id!==undefined&&String(p.server_id).trim()!==String(b.server_id||"")){
    const sid=String(p.server_id||"").trim();
    if(String(b.boss_scope||"WORLD")!=="SERVER")throw new Error("월드보스는 서버를 지정할 수 없습니다.");
    if(!await serverMeta(env,aid,sid))throw new Error("서버를 선택하세요.");
    await botRequireBossConfigScope_(env,aid,p,"SERVER",sid);
    sets.push("server_id=?");args.push(sid);
  }
  ["notify_enabled","alert_10m","alert_5m","alert_1m","alert_spawn","attendance_enabled"].forEach(k=>{if(p[k]!==undefined&&p[k]!==""){sets.push(`${k}=?`);args.push(bint(p[k],true));}});
  if(!sets.length)throw new Error("변경할 값을 입력하세요.");
  sets.push("updated_at=?");args.push(nowIso(),b.boss_id);
  await run(env.DB,`UPDATE bosses SET ${sets.join(",")} WHERE boss_id=?`,...args);
  return {boss_id:b.boss_id,message:"보스 설정을 변경했습니다."};
}
async function botBossDisable_(env,aid,p){const b=await botBossRow_(env,aid,p.boss,p);await botRequireBossConfigScope_(env,aid,p,b.boss_scope||"WORLD",b.server_id||"");await env.DB.batch([env.DB.prepare("UPDATE bosses SET enabled=0,updated_at=? WHERE boss_id=?").bind(nowIso(),b.boss_id),env.DB.prepare("UPDATE boss_state SET status='삭제',updated_at=? WHERE alliance_id=? AND boss_id=?").bind(nowIso(),aid,b.boss_id)]);return {boss_id:b.boss_id,boss_name:b.boss_name,message:"보스를 비활성화했습니다. 과거 기록은 유지됩니다."};}
async function botBossCut_(env,aid,p){
  const actor=await botRequireBossAction_(env,aid,p),b=await botBossRow_(env,aid,p.boss,p);if(b.boss_type!=="cooldown")throw new Error("시간표형 보스는 컷 등록 대상이 아닙니다.");if(b.boss_scope==="SERVER"&&actor.alliance_level<70&&String(actor.server_id)!==String(b.server_id))throw new Error("자기 서버 보스만 사용할 수 있습니다.");
  let cut=p.cut_at?parseLocalDateTime(p.cut_at):new Date();if(!cut)throw new Error("컷 시각이 올바르지 않습니다.");if(p.cut_at&&isClockInput_(p.cut_at)&&cut.getTime()>Date.now()+300000)cut=new Date(cut.getTime()-86400000);if(boolVal(b.attendance_enabled,true)&&await first(env.DB,"SELECT 1 FROM boss_events WHERE alliance_id=? AND boss_id=? AND attendance_status='open'",aid,b.boss_id))throw new Error("이미 출석 진행 중인 보스입니다.");
  const next=new Date(cut.getTime()+Number(b.respawn_minutes||0)*60000),now=nowIso(),source=botSource_(p),actorId=botActorId_(p);await run(env.DB,"INSERT INTO boss_state(alliance_id,boss_id,boss_scope,server_id,last_kill_at,next_spawn_at,status,registered_by_discord_user_id,source,updated_at,note) VALUES(?,?,?,?,?,?,'대기',?,?,?,'') ON CONFLICT(alliance_id,boss_id) DO UPDATE SET boss_scope=excluded.boss_scope,server_id=excluded.server_id,last_kill_at=excluded.last_kill_at,next_spawn_at=excluded.next_spawn_at,status='대기',registered_by_discord_user_id=excluded.registered_by_discord_user_id,source=excluded.source,updated_at=excluded.updated_at",aid,b.boss_id,b.boss_scope||"WORLD",b.server_id||"",cut.toISOString(),next.toISOString(),actorId,source,now);
  let eid="";if(boolVal(b.attendance_enabled,true)){eid=uid("event");const closes=new Date(Date.now()+10*60000);await run(env.DB,"INSERT INTO boss_events(event_id,alliance_id,boss_id,boss_name,boss_scope,server_id,event_type,cut_at,next_spawn_at,attendance_opened_at,attendance_closes_at,attendance_status,registered_by_discord_user_id,source,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,'open',?,?,?,?)",eid,aid,b.boss_id,b.boss_name,b.boss_scope||"WORLD",b.server_id||"",p.cut_at?"past_cut":"cut",cut.toISOString(),next.toISOString(),now,closes.toISOString(),actorId,source,now,now);await queueAttendanceSync_(env,aid,eid,"upsert",source+" cut");}
  const srv=b.server_id?await serverMeta(env,aid,b.server_id):null,channels=eid?await botResolveChannels_(env,aid,"attendance",b.boss_scope,b.server_id):[];return {boss_id:b.boss_id,boss_name:b.boss_name,boss_scope:b.boss_scope||"WORLD",server_id:b.server_id||"",server_name:b.boss_scope==="SERVER"?(srv?.server_name||b.server_id):"월드",cut_at:formatKst(cut,false),next_spawn_at:formatKst(next,false),event_id:eid,attendance_open:!!eid,attendance_channel_id:channels[0]||"",attendance_channel_ids:channels.join(",")};
}
async function botBossSpawn_(env,aid,p){const actor=await botRequireBossAction_(env,aid,p),b=await botBossRow_(env,aid,p.boss,p);if(b.boss_scope==="SERVER"&&actor.alliance_level<70&&String(actor.server_id)!==String(b.server_id))throw new Error("자기 서버 보스만 사용할 수 있습니다.");const now=nowIso(),actorId=botActorId_(p),source=botSource_(p);if(p.spawn_at===null||String(p.spawn_at||"").trim()===""){await run(env.DB,"INSERT INTO boss_state(alliance_id,boss_id,boss_scope,server_id,next_spawn_at,status,registered_by_discord_user_id,source,updated_at,note) VALUES(?,?,?,?, '', '미등록',?,?,?,'') ON CONFLICT(alliance_id,boss_id) DO UPDATE SET next_spawn_at='',status='미등록',registered_by_discord_user_id=excluded.registered_by_discord_user_id,source=excluded.source,updated_at=excluded.updated_at",aid,b.boss_id,b.boss_scope||"WORLD",b.server_id||"",actorId,source,now);return {boss_name:b.boss_name,next_spawn_at:"",message:"젠 시각을 제거했습니다."};}let spawn=parseLocalDateTime(p.spawn_at);if(!spawn)throw new Error("젠 시각이 올바르지 않습니다.");if(isClockInput_(p.spawn_at)&&spawn.getTime()<Date.now()-60000)spawn=new Date(spawn.getTime()+86400000);await run(env.DB,"INSERT INTO boss_state(alliance_id,boss_id,boss_scope,server_id,next_spawn_at,status,registered_by_discord_user_id,source,updated_at,note) VALUES(?,?,?,?,?,'대기',?,?,?,'') ON CONFLICT(alliance_id,boss_id) DO UPDATE SET boss_scope=excluded.boss_scope,server_id=excluded.server_id,next_spawn_at=excluded.next_spawn_at,status='대기',registered_by_discord_user_id=excluded.registered_by_discord_user_id,source=excluded.source,updated_at=excluded.updated_at",aid,b.boss_id,b.boss_scope||"WORLD",b.server_id||"",spawn.toISOString(),actorId,source,now);return {boss_name:b.boss_name,next_spawn_at:formatKst(spawn,false),message:"젠 시각을 변경했습니다."};}


async function botEnsureManualParticipationBoss_(env,aid){
  const id=`manual_${aid}`,old=await first(env.DB,"SELECT * FROM bosses WHERE boss_id=?",id);
  if(old)return old;
  const now=nowIso(),a=await allianceMeta(env,aid);
  await run(env.DB,"INSERT INTO bosses(boss_id,alliance_id,game_id,boss_name,boss_type,boss_scope,server_id,respawn_minutes,fixed_times,enabled,note,notify_enabled,alert_10m,alert_5m,alert_1m,alert_spawn,attendance_enabled,created_at,updated_at) VALUES(?,?,?,'연합 참여체크','fixed','WORLD','',NULL,'',0,'system manual participation',0,0,0,0,0,1,?,?)",id,aid,a.game_id||"eclipse",now,now);
  return first(env.DB,"SELECT * FROM bosses WHERE boss_id=?",id);
}
async function botParticipationCreate_(env,aid,p){
  const actor=await botRequireAllianceOperate_(env,aid,p),title=String(p.title||p.name||"").trim();
  if(!title)throw new Error("참여체크 제목을 입력하세요.");
  if(title.length>80)throw new Error("참여체크 제목은 80자 이하로 입력하세요.");
  const sys=await botEnsureManualParticipationBoss_(env,aid),now=nowIso(),eid=uid("event");
  await run(env.DB,"INSERT INTO boss_events(event_id,alliance_id,boss_id,boss_name,boss_scope,server_id,event_type,cut_at,next_spawn_at,attendance_opened_at,attendance_closes_at,attendance_status,registered_by_discord_user_id,source,created_at,updated_at,note) VALUES(?,?,?,?, 'WORLD','', 'manual_participation',?,'',?,'','open',?,?,?,?,'')",eid,aid,sys.boss_id,title,now,now,botActorId_(p),botSource_(p),now,now);
  await queueAttendanceSync_(env,aid,eid,"upsert",botSource_(p)+" manual participation");
  return {event_id:eid,event_type:"manual_participation",title,boss_name:title,boss_scope:"WORLD",server_id:"",cut_at:formatKst(now,false),attendance_status:"open",created_by:actor.nickname};
}
function botParseEventDiscordLinks_(note){
  try{const x=JSON.parse(String(note||""));return Array.isArray(x?.discord_links)?x.discord_links.filter(v=>v&&v.channel_id&&v.message_id):[];}catch{return []}
}
async function botBoundDiscordServers_(env){
  const rows=await all(env.DB,"SELECT alliance_id,alliance_name,discord_server_id FROM alliances WHERE status='active' AND discord_enabled=1 AND discord_server_id<>'' ORDER BY created_at");
  return {servers:rows.map(x=>({alliance_id:x.alliance_id,alliance_name:x.alliance_name,discord_server_id:x.discord_server_id}))};
}

async function botEventVisible_(actor,e){return String(e.boss_scope||"WORLD")!=="SERVER"||String(e.server_id||"")===String(actor.server_id||"")||actor.alliance_level>=70;}
async function botOpenEvent_(env,aid,bossValue,p){const actor=await botActor_(env,aid,p),events=await all(env.DB,"SELECT * FROM boss_events WHERE alliance_id=? AND attendance_status='open' ORDER BY attendance_opened_at DESC,created_at DESC",aid),visible=[];for(const e of events)if(await botEventVisible_(actor,e))visible.push(e);if(bossValue){const q=String(bossValue||"").trim().toLowerCase(),direct=visible.find(x=>String(x.event_id||"").toLowerCase()===q||String(x.boss_name||"").trim().toLowerCase()===q);if(direct)return direct;const b=await botBoss_(env,aid,bossValue,p),e=visible.find(x=>String(x.boss_id)===String(b.boss_id));if(!e)throw new Error(`${b.boss_name}은(는) 현재 열린 출석이 없습니다.`);return e;}if(!visible.length)throw new Error("현재 진행 중인 보스 출석이 없습니다.");if(visible.length>1)throw new Error("열린 출석이 여러 개입니다. 보스명/참여체크 제목을 함께 입력하세요.");return visible[0];}
async function botAttendanceSet_(env,aid,p){
  const actor=await botActor_(env,aid,p),e=await first(env.DB,"SELECT * FROM boss_events WHERE alliance_id=? AND event_id=?",aid,String(p.event_id||""));if(!e)throw new Error("참여 이벤트를 찾을 수 없습니다.");if(e.attendance_status!=="open")throw new Error("이미 종료된 출석입니다.");if(!await botEventVisible_(actor,e))throw new Error("현재 참여할 수 없는 이벤트입니다.");
  const attended=boolVal(p.attended,true),now=nowIso(),g=actor.guild,srv=await serverMeta(env,aid,g.server_id),old=await first(env.DB,"SELECT * FROM boss_attendance WHERE event_id=? AND member_id_at_event=? ORDER BY recorded_at DESC LIMIT 1",e.event_id,actor.member_id);if(old)await run(env.DB,"UPDATE boss_attendance SET attended=?,recorded_at=?,cancelled_at=?,source=?,discord_user_id=?,guild_id_at_event=?,guild_name_at_event=?,server_id_at_event=?,server_name_at_event=?,game_nickname_at_event=? WHERE attendance_id=?",attended?1:0,now,attended?"":now,botSource_(p),p.kakao_user_key?"":String(p.discord_user_id||""),actor.guild_id,g.guild_name,g.server_id||"",srv?.server_name||g.game_server_name||"",actor.nickname,old.attendance_id);else await run(env.DB,"INSERT INTO boss_attendance(attendance_id,alliance_id,event_id,boss_id,discord_user_id,guild_id_at_event,guild_name_at_event,server_id_at_event,server_name_at_event,member_id_at_event,game_nickname_at_event,attended,recorded_at,cancelled_at,online_status_snapshot,source,note) VALUES(?,?,?,?,?,?,?,?,?,?,?, ?,?,?, '',?,'')",uid("att"),aid,e.event_id,e.boss_id,p.kakao_user_key?"":String(p.discord_user_id||""),actor.guild_id,g.guild_name,g.server_id||"",srv?.server_name||g.game_server_name||"",actor.member_id,actor.nickname,attended?1:0,now,attended?"":now,botSource_(p));
  await queueAttendanceSync_(env,aid,e.event_id,"upsert",botSource_(p)+" attendance");return {event_id:e.event_id,boss_id:e.boss_id,boss_name:e.boss_name,nickname:actor.nickname,attended};
}

async function botAttendanceList_(env,aid,eventId){
  const e=await first(env.DB,"SELECT * FROM boss_events WHERE alliance_id=? AND event_id=?",aid,String(eventId||""));if(!e)throw new Error("참여 이벤트를 찾을 수 없습니다.");
  const rows=await all(env.DB,"SELECT * FROM boss_attendance WHERE event_id=? AND attended=1 ORDER BY server_name_at_event,guild_name_at_event,game_nickname_at_event",e.event_id);
  const links=botParseEventDiscordLinks_(e.note),channelIds=await botResolveChannels_(env,aid,"attendance",e.boss_scope||"WORLD",e.server_id||"");
  return {event_id:e.event_id,event_type:e.event_type||"cut",boss_id:e.boss_id,boss_name:e.boss_name,boss_scope:e.boss_scope||"WORLD",server_id:e.server_id||"",cut_at:formatKst(e.cut_at,false),next_spawn_at:e.next_spawn_at?formatKst(e.next_spawn_at,false):"",attendance_status:e.attendance_status,discord_message_id:e.discord_message_id||"",discord_channel_id:e.discord_channel_id||"",discord_message_links:links,attendance_channel_id:channelIds[0]||"",attendance_channel_ids:channelIds.join(","),participants:rows.map(x=>({attendance_id:x.attendance_id,discord_user_id:x.discord_user_id||"",guild_id:x.guild_id_at_event||"",guild_name:x.guild_name_at_event||"",server_id:x.server_id_at_event||"",server_name:x.server_name_at_event||"",member_id:x.member_id_at_event||"",nickname:x.game_nickname_at_event||"",source:x.source||""}))};
}

async function botAttendanceClose_(env,aid,p){
  let e=null;
  if(p.event_id)e=await first(env.DB,"SELECT * FROM boss_events WHERE alliance_id=? AND event_id=?",aid,String(p.event_id));
  if(!e)e=await botOpenEvent_(env,aid,p.boss||"",p);
  if(String(e.event_type||"")==="manual_participation")await botRequireAllianceOperate_(env,aid,p);else await botRequireBossAttendanceOperate_(env,aid,p,e.boss_scope||"WORLD",e.server_id||"");
  if(e.attendance_status!=="open")return {message:"이미 종료된 참여입니다.",event_id:e.event_id,boss_name:e.boss_name,event_type:e.event_type||""};
  const now=nowIso();await run(env.DB,"UPDATE boss_events SET attendance_status='closed',attendance_closed_at=?,closed_reason='manual',updated_at=?,source=? WHERE event_id=?",now,now,botSource_(p),e.event_id);
  const summary=await attendanceSummary(env,e),srv=e.server_id?await serverMeta(env,aid,e.server_id):null,resultId=uid("result");
  await run(env.DB,"INSERT INTO attendance_result_queue(result_id,alliance_id,event_id,boss_id,boss_name,boss_scope,server_id,server_name,message,discord_status,kakao_status,created_at,discord_message_id,discord_channel_id,note) VALUES(?,?,?,?,?,?,?,?,?,'queued','queued',?,'','','')",resultId,aid,e.event_id,e.boss_id,e.boss_name,e.boss_scope||"WORLD",e.server_id||"",srv?.server_name||"",summary,now);
  await queueAttendanceSync_(env,aid,e.event_id,"close",botSource_(p)+" close");
  return {message:"참여체크를 종료했습니다.",summary,event_id:e.event_id,boss_name:e.boss_name,event_type:e.event_type||"",result_id:resultId};
}
async function botAttendanceRemove_(env,aid,p){const e=await botOpenEvent_(env,aid,p.boss||"",p);if(String(e.event_type||"")==="manual_participation")await botRequireAllianceOperate_(env,aid,p);else await botRequireBossAttendanceOperate_(env,aid,p,e.boss_scope||"WORLD",e.server_id||"");const nick=String(p.nickname||"").trim();if(!nick)throw new Error("닉네임을 입력하세요.");const row=await first(env.DB,"SELECT * FROM boss_attendance WHERE event_id=? AND game_nickname_at_event=? AND attended=1 ORDER BY recorded_at DESC LIMIT 1",e.event_id,nick);if(!row)throw new Error("참여자 명단에서 찾을 수 없습니다: "+nick);await run(env.DB,"UPDATE boss_attendance SET attended=0,cancelled_at=?,source=? WHERE attendance_id=?",nowIso(),botSource_(p)+":admin_remove",row.attendance_id);await queueAttendanceSync_(env,aid,e.event_id,"upsert",botSource_(p)+" remove");return {event_id:e.event_id,message:`${nick} 참여를 삭제했습니다.`,attendance:await botAttendanceList_(env,aid,e.event_id)};}
async function botMyAttendance_(env,aid,p){const actor=await botActor_(env,aid,p),month=String(p.month||formatKst(new Date(),false).slice(0,7));if(!/^\d{4}-\d{2}$/.test(month))throw new Error("월 형식은 YYYY-MM 입니다.");const start=parseLocalDateTime(month+"-01 00:00"),d=new Date(start.getTime()+KST_MS),nextK=kstDateToUtc(d.getUTCFullYear(),d.getUTCMonth()+2,1,0,0),events=await all(env.DB,"SELECT * FROM boss_events WHERE alliance_id=? AND event_type<>'manual_participation' AND cut_at>=? AND cut_at<? AND (boss_scope='WORLD' OR server_id=?)",aid,start.toISOString(),nextK.toISOString(),actor.server_id||"");if(!events.length)return {month,count:0,total_events:0,rate:0};const ids=events.map(x=>x.event_id),ph=ids.map(()=>"?").join(","),r=await first(env.DB,`SELECT COUNT(*) c FROM boss_attendance WHERE attended=1 AND member_id_at_event=? AND event_id IN (${ph})`,actor.member_id,...ids),count=Number(r?.c||0);return {month,count,total_events:events.length,rate:events.length?Math.round(count/events.length*1000)/10:0,server_id:actor.server_id,server_name:actor.server_name};}

async function botAttendanceMessageLink_(env,aid,p){
  const eid=String(p.event_id||""),channelId=String(p.channel_id||""),messageId=String(p.message_id||"");if(!eid)throw new Error("event_id가 없습니다.");
  const e=await first(env.DB,"SELECT * FROM boss_events WHERE alliance_id=? AND event_id=?",aid,eid);if(!e)throw new Error("참여 이벤트를 찾을 수 없습니다.");
  let links=botParseEventDiscordLinks_(e.note),key=`${channelId}:${messageId}`;
  links=links.filter(x=>`${x.channel_id}:${x.message_id}`!==key);if(channelId&&messageId)links.push({channel_id:channelId,message_id:messageId});
  if(links.length>20)links=links.slice(-20);
  const note=JSON.stringify({discord_links:links});
  await run(env.DB,"UPDATE boss_events SET discord_message_id=?,discord_channel_id=?,note=?,updated_at=? WHERE alliance_id=? AND event_id=?",messageId,channelId,note,nowIso(),aid,eid);
  return {ok:true,event_id:eid,link_count:links.length};
}

async function botAttendanceChannelResolve_(env,aid,p){
  let scope=String(p.boss_scope||"WORLD"),sid=String(p.server_id||"");
  if(p.event_id){const e=await first(env.DB,"SELECT * FROM boss_events WHERE alliance_id=? AND event_id=?",aid,String(p.event_id));if(e){scope=e.boss_scope||"WORLD";sid=e.server_id||"";}}
  const ids=await botResolveChannels_(env,aid,"attendance",scope,sid);
  return {channel_id:ids[0]||"",channel_ids:ids.join(","),scope,server_id:sid};
}
async function botAllianceNotices_(env,aid){const rows=await all(env.DB,"SELECT * FROM alliance_announcements WHERE alliance_id=? AND enabled=1 ORDER BY pinned DESC,created_at DESC LIMIT 20",aid);return {notices:rows.map(x=>({notice_id:x.notice_id,title:x.title,content:x.content||"",pinned:boolVal(x.pinned),created_at:formatKst(x.created_at)}))};}
async function botGuildNotices_(env,aid,p){const a=await botActor_(env,aid,p),rows=await all(env.DB,"SELECT * FROM guild_announcements WHERE guild_id=? AND enabled=1 ORDER BY pinned DESC,created_at DESC LIMIT 20",a.guild_id);return {guild_id:a.guild_id,notices:rows.map(x=>({notice_id:x.notice_id,title:x.title,content:x.content||"",pinned:boolVal(x.pinned),created_at:formatKst(x.created_at)}))};}
async function botAllianceNoticeAdd_(env,aid,p){await botRequireAllianceOperate_(env,aid,p);const title=String(p.title||"").trim();if(!title)throw new Error("공지 제목을 입력하세요.");const now=nowIso();await run(env.DB,"INSERT INTO alliance_announcements(notice_id,alliance_id,title,content,pinned,author,created_at,updated_at,enabled) VALUES(?,?,?,?,?,?,?, ?,1)",uid("anotice"),aid,title,String(p.content||"").trim(),bint(p.pinned),botActorId_(p),now,now);return {message:"연합 공지를 등록했습니다."};}
async function botGuildNoticeAdd_(env,aid,p){const a=await botRequireGuildOperate_(env,aid,p),title=String(p.title||"").trim();if(!title)throw new Error("공지 제목을 입력하세요.");const now=nowIso();await run(env.DB,"INSERT INTO guild_announcements(notice_id,guild_id,title,content,pinned,author_member_id,created_at,updated_at,enabled) VALUES(?,?,?,?,?,?,?,?,1)",uid("notice"),a.guild_id,title,String(p.content||"").trim(),bint(p.pinned),a.member_id,now,now);return {guild_id:a.guild_id,message:"길드 공지를 등록했습니다."};}
async function botGuildMembers_(env,aid,p){const a=await botActor_(env,aid,p),rows=await all(env.DB,"SELECT member_id,nickname,role,alliance_role FROM members WHERE guild_id=? AND status='활성' ORDER BY joined_at,nickname",a.guild_id);return {guild_id:a.guild_id,members:rows.map(x=>({...x,role:normalizeGuildRole(x.role)}))};}
async function botGuildMemberAdd_(env,aid,p){const a=await botRequireGuildOperate_(env,aid,p),nick=String(p.nickname||"").trim();if(!nick)throw new Error("닉네임을 입력하세요.");if(await first(env.DB,"SELECT 1 FROM members WHERE guild_id=? AND nickname=? AND status='활성'",a.guild_id,nick))throw new Error("같은 닉네임의 활성 길드원이 이미 있습니다.");const id=uid("member"),role=normalizeGuildRole(p.role||"길드원");await run(env.DB,"INSERT INTO members(member_id,guild_id,nickname,role,alliance_role,joined_at,status,note,web_pin_hash,web_access_enabled) VALUES(?,?,?,?, '',?,'활성','봇 수동 등록','',0)",id,a.guild_id,nick,role,nowIso());return {guild_id:a.guild_id,member_id:id,message:"길드원을 등록했습니다."};}
async function botLootList_(env,aid,p){const a=await botActor_(env,aid,p),rows=await all(env.DB,"SELECT * FROM loot WHERE guild_id=? ORDER BY created_at DESC LIMIT 100",a.guild_id);return {guild_id:a.guild_id,loot:rows.map(x=>({loot_id:x.loot_id,item_name:x.item_name,quantity:Number(x.quantity||1),status:x.status||"보유",sale_amount:Number(x.sale_amount||0),created_at:x.created_at?formatKst(x.created_at):""}))};}
async function botLootAdd_(env,aid,p){const a=await botRequireGuildOperate_(env,aid,p),item=String(p.item_name||"").trim();if(!item)throw new Error("아이템명을 입력하세요.");const qty=Math.max(1,Number(p.quantity||1)),status=String(p.status||"보유"),sale=Math.max(0,Number(p.sale_amount||0));if(!["보유","판매완료","지급완료"].includes(status))throw new Error("아이템 상태가 올바르지 않습니다.");const id=uid("loot");await run(env.DB,"INSERT INTO loot(loot_id,guild_id,raid_id,item_name,quantity,status,winner_member_id,sale_amount,fund_rate,fund_amount,guild_support_amount,distribution_pool,completed_at,note,created_at,source) VALUES(?,?,?,?,?,?,?,?,NULL,NULL,NULL,NULL,?,?,?,?)",id,a.guild_id,String(p.raid_id||""),item,qty,status,String(p.winner_member_id||""),sale||null,(status==="판매완료"||status==="지급완료")?nowIso():"",String(p.note||""),nowIso(),botSource_(p));return {guild_id:a.guild_id,loot_id:id,message:"아이템을 등록했습니다."};}
async function botLootMarkSold_(env,aid,p){const a=await botRequireGuildOperate_(env,aid,p),amount=Math.max(0,Number(p.sale_amount||0));if(!(amount>0))throw new Error("판매금액을 입력하세요.");let row=null;if(p.loot_id)row=await first(env.DB,"SELECT * FROM loot WHERE guild_id=? AND loot_id=?",a.guild_id,String(p.loot_id));if(!row&&p.item_name)row=await first(env.DB,"SELECT * FROM loot WHERE guild_id=? AND item_name=? AND status<>'판매완료' ORDER BY created_at DESC LIMIT 1",a.guild_id,String(p.item_name));if(!row)throw new Error("아이템을 찾을 수 없습니다.");await run(env.DB,"UPDATE loot SET status='판매완료',sale_amount=?,completed_at=? WHERE loot_id=?",amount,nowIso(),row.loot_id);return {guild_id:a.guild_id,loot_id:row.loot_id,message:"판매완료로 변경했습니다."};}
async function botFundStatus_(env,aid,p){const a=await botActor_(env,aid,p),bal=await first(env.DB,"SELECT COALESCE(SUM(amount_signed),0) balance FROM fund_ledger WHERE guild_id=?",a.guild_id),recent=await all(env.DB,"SELECT occurred_at,type,amount_signed,memo FROM fund_ledger WHERE guild_id=? ORDER BY occurred_at DESC LIMIT 20",a.guild_id);return {guild_id:a.guild_id,balance:Number(bal?.balance||0),recent:recent.map(x=>({...x,amount_signed:Number(x.amount_signed||0),occurred_at:formatKst(x.occurred_at)}))};}
async function botFundAdd_(env,aid,p){const a=await botRequireGuildOperate_(env,aid,p),amount=Math.abs(Number(p.amount||0));if(!amount)throw new Error("금액을 입력하세요.");const type=String(p.type||"other_income"),signed=type==="expense"?-amount:amount,bal=await first(env.DB,"SELECT COALESCE(SUM(amount_signed),0) balance FROM fund_ledger WHERE guild_id=?",a.guild_id),after=Number(bal?.balance||0)+signed;await run(env.DB,"INSERT INTO fund_ledger(txn_id,guild_id,occurred_at,type,amount_signed,balance_after,reference_type,reference_id,member_id,memo,created_by,source,note) VALUES(?,?,?,?,?,?,'manual','',?,?,?,?,'')",uid("txn"),a.guild_id,nowIso(),type==="expense"?"expense":"other_income",signed,after,a.member_id,String(p.memo||""),a.nickname,botSource_(p));return {guild_id:a.guild_id,balance:after,message:"길드 금고에 반영했습니다."};}
async function botGuildStats_(env,aid,p){const a=await botActor_(env,aid,p),r=await getGuildStats(env,a.guild_id,p.start_date,p.end_date);return {guild_id:a.guild_id,...r};}
async function botSettlement_(env,aid,p){const a=await botActor_(env,aid,p),stats=await getGuildStats(env,a.guild_id,p.start_date,p.end_date),start=parseLocalDateTime(`${p.start_date} 00:00`),end=parseLocalDateTime(`${p.end_date} 23:59`);if(!start||!end)throw new Error("기간 형식이 올바르지 않습니다.");const sales=await first(env.DB,"SELECT COALESCE(SUM(COALESCE(sale_amount,0)),0) total_sales,COALESCE(SUM(COALESCE(distribution_pool,0)),0) total_pool FROM loot WHERE guild_id=? AND COALESCE(NULLIF(completed_at,''),created_at)>=? AND COALESCE(NULLIF(completed_at,''),created_at)<=?",a.guild_id,start.toISOString(),end.toISOString());return {guild_id:a.guild_id,total_sales:Number(sales?.total_sales||0),total_pool:Number(sales?.total_pool||0),total_raids:stats.total_raids,ranking:stats.ranking,allocation_mode:"미설정",note:"정산 공식은 아직 확정하지 않았습니다. 판매금액과 참여기록만 집계합니다."};}


async function botPullAlerts_(env,aid,p){
  const target=String(p.target||"discord").toLowerCase()==="kakao"?"kakao":"discord",key=target+"_status",limit=Math.max(1,Math.min(100,Number(p.limit||20))),now=Date.now(),rows=await all(env.DB,`SELECT * FROM boss_alert_queue WHERE alliance_id=? AND ${key}='queued' ORDER BY due_at,created_at LIMIT 200`,aid),live=[];
  for(const x of rows){
    const due=new Date(x.due_at);if(!Number.isNaN(due.getTime())&&now-due.getTime()>10*60000){await run(env.DB,`UPDATE boss_alert_queue SET ${key}='expired' WHERE alert_id=?`,x.alert_id);continue;}
    let eventId="",attendanceIds=[];
    if(String(x.alert_type)==="spawn"){
      const d=new Date(x.spawn_at),eid=!Number.isNaN(d.getTime())?`event_${x.boss_id}_${Math.floor(d.getTime()/1000)}`:"";
      if(eid&&await first(env.DB,"SELECT 1 FROM boss_events WHERE alliance_id=? AND event_id=?",aid,eid)){eventId=eid;attendanceIds=await botResolveChannels_(env,aid,"attendance",x.boss_scope||"WORLD",x.server_id||"");}
    }
    const alertIds=await botResolveChannels_(env,aid,"alert",x.boss_scope||"WORLD",x.server_id||"");
    live.push({...x,attendance_event_id:eventId,attendance_channel_id:attendanceIds[0]||"",attendance_channel_ids:attendanceIds.join(","),discord_channel_id:alertIds[0]||String(x.discord_channel_id||""),discord_channel_ids:alertIds.join(",")||String(x.discord_channel_ids||"")});
    if(live.length>=limit)break;
  }
  return {target,alerts:live.map(x=>({alert_id:x.alert_id,boss_id:x.boss_id,boss_name:x.boss_name,boss_scope:x.boss_scope||"WORLD",server_id:x.server_id||"",server_name:x.server_name||"",alert_type:x.alert_type,message:x.message,discord_channel_id:x.discord_channel_id||"",discord_channel_ids:x.discord_channel_ids||"",spawn_at:x.spawn_at?formatKst(x.spawn_at,false):"",attendance_event_id:x.attendance_event_id||"",attendance_channel_id:x.attendance_channel_id||"",attendance_channel_ids:x.attendance_channel_ids||""}))};
}
async function botMarkAlerts_(env,aid,p){const target=String(p.target||"discord").toLowerCase()==="kakao"?"kakao":"discord",key=target+"_status",sent=target+"_sent_at",ids=Array.isArray(p.alert_ids)?p.alert_ids.map(String):[];if(!ids.length)return {updated:0,target};const ph=ids.map(()=>"?").join(","),status=String(p.status||"sent");await run(env.DB,`UPDATE boss_alert_queue SET ${key}=?,${sent}=?,note=CASE WHEN ?<>'' THEN ? ELSE note END WHERE alliance_id=? AND alert_id IN (${ph})`,status,status==="sent"?nowIso():"",String(p.note||""),String(p.note||""),aid,...ids);return {updated:ids.length,target};}

async function botPullAttendanceResults_(env,aid,p){
  const target=String(p.target||"discord").toLowerCase()==="kakao"?"kakao":"discord",key=target+"_status",limit=Math.max(1,Math.min(100,Number(p.limit||20))),rows=await all(env.DB,`SELECT * FROM attendance_result_queue WHERE alliance_id=? AND ${key}='queued' ORDER BY created_at LIMIT ?`,aid,limit),results=[];
  for(const x of rows){
    const e=await first(env.DB,"SELECT * FROM boss_events WHERE alliance_id=? AND event_id=?",aid,x.event_id),links=e?botParseEventDiscordLinks_(e.note):[],fallback=e?await botResolveChannels_(env,aid,"attendance",e.boss_scope||"WORLD",e.server_id||""):[];
    results.push({result_id:x.result_id,event_id:x.event_id,event_type:e?.event_type||"",boss_name:x.boss_name,boss_scope:x.boss_scope||"WORLD",server_id:x.server_id||"",server_name:x.server_name||"",message:x.message||"",discord_message_id:x.discord_message_id||e?.discord_message_id||"",discord_channel_id:x.discord_channel_id||e?.discord_channel_id||"",discord_message_links:links,discord_channel_ids:fallback.join(",")});
  }
  return {target,results};
}
async function botMarkAttendanceResults_(env,aid,p){const target=String(p.target||"discord").toLowerCase()==="kakao"?"kakao":"discord",key=target+"_status",sent=target+"_sent_at",ids=Array.isArray(p.result_ids)?p.result_ids.map(String):[];if(!ids.length)return {updated:0,target};const ph=ids.map(()=>"?").join(","),status=String(p.status||"sent");await run(env.DB,`UPDATE attendance_result_queue SET ${key}=?,${sent}=?,note=CASE WHEN ?<>'' THEN ? ELSE note END WHERE alliance_id=? AND result_id IN (${ph})`,status,status==="sent"?nowIso():"",String(p.note||""),String(p.note||""),aid,...ids);return {updated:ids.length,target};}

function botKakaoHelp_(){return ["📌 GuildCore 카톡 명령어","","[연결/동기화]","!초기설정 [연합명] · !서버연결 [연합명]","!동기화 · !서버연결해제 · !핑 [연합명]","","[기본/보스]","!등록 길드명 게임닉네임","!웹핀 · 웹 로그인 10분/1회용 PIN","!보스 / !보스확인 / !보탐","!컷 보스명 [HH:MM|HHMM] · 등록 길드원 모두","!젠 보스명 [HH:MM|HHMM] · 등록 길드원 모두","!내출석 [YYYY-MM]","!보탐대조 [보스명] · Discord/UI 스샷 분석 결과 조회","","[출석 운영]","!참여체크생성 제목","!참여 [보스명|참여체크 제목] · !취소 [보스명|참여체크 제목]","!출석종료 보스명|참여체크 제목","!참여삭제 보스명 닉네임","","[알림방 설정 · 연합운영진+]","!보스알림채널설정 [전체|월드|서버명]","!출석채널설정 [전체|월드|서버명]","!보스알림테스트 [전체|월드|서버명]","","[보스 설정]","월드: 연합장/연합운영진 · 서버: 해당 서버 길드장/부길드장/길드운영진","!보스등록 월드|서버명 보스명 쿨|고정|주간 값","!보스수정 보스명 쿨|고정|주간 값","!보스제거 보스명","","[공지/길드]","!연합공지 제목 | 내용","!길드공지 제목 | 내용","!공지확인 연합|길드","!길드원확인 · !길드원추가 닉네임 [직급]","","[아이템/자금/통계]","!아이템내역 · !아이템등록 이름 [수량]","!아이템판매 이름 금액","!길드비용현황 · !길드비용 수입|지출 금액 [메모]","!참여통계 [시작] [종료] · !정산조회 [시작] [종료]","","추가: !연결상태 · !연결초기화 · !핑해제 · !참여 · !취소","Web UI · Discord · Kakao는 같은 GuildCore D1 데이터를 사용합니다.","!도움 / !명령어"].join("\n");}
async function botKakaoCommand_(env,aid,p){
  const text=String(p.text||"").trim(),key=String(p.kakao_user_key||"").trim();if(!text.startsWith("!"))return {reply:""};const tokens=text.slice(1).trim().split(/\s+/).filter(Boolean),cmd=String(tokens.shift()||""),args=tokens;
  if(cmd==="핑")return {reply:`✅ GuildCore ${APP_VERSION} 정상 연결\n카톡 → Worker → D1\n${aid}`};
  if(cmd==="도움"||cmd==="명령어"||cmd==="도구")return {reply:botKakaoHelp_()};
  if(cmd==="관리권한확인"){const a=await botRequireAllianceOperate_(env,aid,{...p,kakao_user_key:key});return {reply:"",authorized:true,role:a.alliance_role||a.guild_role||""};}
  if(cmd==="동기화"){await botRequireAllianceOperate_(env,aid,{...p,kakao_user_key:key});const cfg=await botConfig_(env,aid),bosses=await botBosses_(env,aid,{kakao_user_key:key});return {reply:`✅ GuildCore 실시간 동기화 확인\n버전: ${APP_VERSION}\n서버 ${(cfg.servers||[]).length}개 · 길드 ${(cfg.guilds||[]).length}개 · 보스 ${bosses.length}개\nWeb UI · Discord · Kakao가 같은 D1 데이터를 사용 중입니다.`};}
  if(cmd==="등록"){if(args.length<2)throw new Error("사용법: !등록 길드명 게임닉네임");const guild=args.shift(),nick=args.join(" "),r=await botRegisterKakaoMember_(env,aid,{...p,guild_key:guild,game_nickname:nick});return {reply:`✅ 등록 완료\n길드: ${r.guild_name}\n닉네임: ${r.game_nickname}`};}
  if(cmd==="웹핀"){const r=await botWebPinSelf_(env,aid,{...p,kakao_user_key:key});return {reply:`🔐 웹 로그인 PIN: ${r.pin}\n유효시간 10분 · 1회용\n사용 후 즉시 폐기됩니다.`};}
  if(cmd==="보스"||cmd==="보스확인"||cmd==="보탐"){const list=await botBosses_(env,aid,{kakao_user_key:key});if(!list.length)return {reply:"등록된 활성 보스가 없습니다."};const groups={};for(const b of list){const k=b.boss_scope==="WORLD"?"월드":b.server_name;(groups[k]||(groups[k]=[])).push(b);}const out=[];for(const k of Object.keys(groups).sort((a,b)=>a==="월드"?-1:(b==="월드"?1:a.localeCompare(b,"ko")))){out.push(`[${k}]`);for(const b of groups[k])out.push(`${b.boss_name} · 컷 ${b.last_kill_at?b.last_kill_at.slice(-5):"-"} · 예정 ${b.next_spawn_at?b.next_spawn_at.slice(-5):"-"}`);}return {reply:out.join("\n")};}
  if(cmd==="컷"){if(!args.length)throw new Error("사용법: !컷 보스명 [HH:MM|HHMM]");let cutAt="",lastCut=String(args[args.length-1]||"");if(args.length>1&&(/^\d{4}$/.test(lastCut)||/^\d{2}:\d{2}$/.test(lastCut))){if(!isClockInput_(lastCut))throw new Error("컷 시각은 HH:MM 또는 HHMM 형식으로 입력하세요.");cutAt=args.pop();}const boss=args.join(" ").trim();if(!boss)throw new Error("보스명을 입력하세요.");const r=await botBossCut_(env,aid,{kakao_user_key:key,boss,cut_at:cutAt});let s=`${r.boss_name}\n컷 ${r.cut_at.slice(-5)}\n예정 ${r.next_spawn_at.slice(-5)}`;if(r.event_id)s+=`\n\n참여: !참여 ${r.boss_name} · 취소: !취소 ${r.boss_name}`;return {reply:s,event_id:r.event_id||"",sync_attendance:!!r.event_id};}
  if(cmd==="젠"){if(!args.length)throw new Error("사용법: !젠 보스명 [HH:MM|HHMM]");let spawnAt="",lastSpawn=String(args[args.length-1]||"");if(args.length>1&&(/^\d{4}$/.test(lastSpawn)||/^\d{2}:\d{2}$/.test(lastSpawn))){if(!isClockInput_(lastSpawn))throw new Error("젠 시각은 HH:MM 또는 HHMM 형식으로 입력하세요.");spawnAt=args.pop();}const boss=args.join(" ").trim();if(!boss)throw new Error("보스명을 입력하세요.");const r=await botBossSpawn_(env,aid,{kakao_user_key:key,boss,spawn_at:spawnAt});return {reply:`${r.boss_name}\n예정 ${r.next_spawn_at?r.next_spawn_at.slice(-5):"-"}`};}
  if(cmd==="참여체크생성"){const title=args.join(" ").trim();if(!title)throw new Error("사용법: !참여체크생성 제목");const r=await botParticipationCreate_(env,aid,{kakao_user_key:key,title});return {reply:`✅ 참여체크 생성\n${r.title}\n참여: !참여 ${r.title}\n취소: !취소 ${r.title}\n종료: !출석종료 ${r.title}`,event_id:r.event_id||"",sync_attendance:true};}
  if(cmd==="참여"||cmd==="취소"){const target=args.join(" ").trim(),e=await botOpenEvent_(env,aid,target,{kakao_user_key:key}),r=await botAttendanceSet_(env,aid,{kakao_user_key:key,event_id:e.event_id,attended:cmd==="참여"});return {reply:`${r.attended?"✅ 참여":"↩️ 취소"} · ${r.boss_name} · ${r.nickname}`,event_id:r.event_id||"",sync_attendance:true};}
  if(cmd==="출석종료"){if(!args.length)throw new Error("사용법: !출석종료 보스명|참여체크 제목");const r=await botAttendanceClose_(env,aid,{kakao_user_key:key,boss:args.join(" ")});return {reply:r.summary||r.message,attendance_result_id:r.result_id||"",event_id:r.event_id||"",sync_attendance:true};}
  if(cmd==="참여삭제"){if(args.length<2)throw new Error("사용법: !참여삭제 보스명 닉네임");const r=await botAttendanceRemove_(env,aid,{kakao_user_key:key,boss:args[0],nickname:args.slice(1).join(" ")});return {reply:`✅ ${r.message}\n현재 참여 ${(r.attendance.participants||[]).map(x=>x.nickname).join(" · ")}`,event_id:r.event_id||"",sync_attendance:true};}
  if(cmd==="보탐대조"){const r=await botScreenshotLatest_(env,aid,{kakao_user_key:key,boss:args.join(" ")});if(r.empty)return {reply:`📸 ${r.boss_name} · 저장된 스크린샷 대조 결과가 없습니다.`};const names=function(rows){return (rows||[]).map(x=>x.nickname||x.text||"").filter(Boolean).join(" · ")||"-"};return {reply:`📸 ${r.boss_name} 보탐 대조\n✅ 일치 ${(r.matched||[]).length}명 · ${names(r.matched)}\n➕ 스샷에만 ${(r.screenshot_only||[]).length}명 · ${names(r.screenshot_only)}\n⚠️ 출석에만 ${(r.attendance_only||[]).length}명 · ${names(r.attendance_only)}\n❓ 불확실 ${(r.uncertain||[]).length}명 · ${names(r.uncertain)}`};}
  if(cmd==="내출석"){const r=await botMyAttendance_(env,aid,{kakao_user_key:key,month:args[0]||""});return {reply:`📊 ${r.month} 내 출석 · ${r.count}회 / ${r.total_events}회 · ${r.rate}%`};}
  if(cmd==="보스등록"){if(args.length<4)throw new Error("사용법: !보스등록 월드|서버명 보스명 쿨|고정|주간 값");const target=args[0],name=args[1],type=args[2]==="고정"?"fixed":((args[2]==="주간"||args[2]==="요일")?"weekly":"cooldown"),value=args[3],world=target==="월드";let sid="";if(!world){const server=await first(env.DB,"SELECT * FROM alliance_servers WHERE alliance_id=? AND server_name=? AND enabled=1",aid,target);if(!server)throw new Error("등록된 서버명을 입력하세요: "+target);sid=server.server_id;}const r=await botBossAdd_(env,aid,{kakao_user_key:key,boss_name:name,boss_type:type,time_value:value,boss_scope:world?"WORLD":"SERVER",server_id:sid,attendance_enabled:true,notify_enabled:true});return {reply:`✅ ${r.boss_name} 등록 · ${world?"월드":target}`};}
  if(cmd==="보스수정"){if(args.length<3)throw new Error("사용법: !보스수정 보스명 쿨|고정|주간 값");const r=await botBossUpdate_(env,aid,{kakao_user_key:key,boss:args[0],boss_type:args[1]==="고정"?"fixed":((args[1]==="주간"||args[1]==="요일")?"weekly":"cooldown"),time_value:args[2]});return {reply:"✅ "+r.message};}
  if(cmd==="보스제거"){if(!args.length)throw new Error("사용법: !보스제거 보스명");const r=await botBossDisable_(env,aid,{kakao_user_key:key,boss:args[0]});return {reply:`✅ ${r.boss_name} · ${r.message}`};}
  if(cmd==="연합공지"||cmd==="길드공지"){const raw=text.substring(text.indexOf(" ")+1),parts=raw.split("|").map(x=>x.trim());if(parts.length<2||!parts[0]||!parts[1])throw new Error(`사용법: !${cmd} 제목 | 내용`);const payload={kakao_user_key:key,title:parts[0],content:parts.slice(1).join(" | "),pinned:false},r=cmd==="연합공지"?await botAllianceNoticeAdd_(env,aid,payload):await botGuildNoticeAdd_(env,aid,payload);return {reply:"✅ "+r.message};}
  if(cmd==="공지확인"){const scope=args[0]||"연합",r=scope==="길드"?await botGuildNotices_(env,aid,{kakao_user_key:key}):await botAllianceNotices_(env,aid),list=(r.notices||[]).slice(0,10).map(x=>(x.pinned?"📌 ":"")+x.title+(x.content?" · "+x.content:"")).join("\n")||"등록된 공지가 없습니다.";return {reply:list};}
  if(cmd==="길드원확인"){const r=await botGuildMembers_(env,aid,{kakao_user_key:key});return {reply:`👥 ${(r.members||[]).length}명\n${(r.members||[]).map(x=>`${x.nickname}(${x.role})`).join(" · ")}`};}
  if(cmd==="길드원추가"){if(!args.length)throw new Error("사용법: !길드원추가 닉네임 [직급]");const r=await botGuildMemberAdd_(env,aid,{kakao_user_key:key,nickname:args[0],role:args[1]||"길드원"});return {reply:"✅ "+r.message};}
  if(cmd==="아이템내역"){const r=await botLootList_(env,aid,{kakao_user_key:key});return {reply:(r.loot||[]).slice(0,20).map(x=>`${x.item_name}×${x.quantity}(${x.status})`).join(" · ")||"아이템 없음"};}
  if(cmd==="아이템등록"){if(!args.length)throw new Error("사용법: !아이템등록 이름 [수량]");const r=await botLootAdd_(env,aid,{kakao_user_key:key,item_name:args[0],quantity:Number(args[1]||1),status:"보유"});return {reply:"✅ "+r.message};}
  if(cmd==="아이템판매"){if(args.length<2)throw new Error("사용법: !아이템판매 이름 금액");const r=await botLootMarkSold_(env,aid,{kakao_user_key:key,item_name:args[0],sale_amount:Number(args[1])});return {reply:"✅ "+r.message};}
  if(cmd==="길드비용현황"){const r=await botFundStatus_(env,aid,{kakao_user_key:key});return {reply:`🏦 현재 잔액 ${Number(r.balance||0).toLocaleString()} 다이아`};}
  if(cmd==="길드비용"){if(args.length<2)throw new Error("사용법: !길드비용 수입|지출 금액 [메모]");const r=await botFundAdd_(env,aid,{kakao_user_key:key,type:args[0]==="지출"?"expense":"other_income",amount:Number(args[1]),memo:args.slice(2).join(" ")});return {reply:`✅ ${r.message} · 잔액 ${Number(r.balance||0).toLocaleString()}`};}
  if(cmd==="보스참여자"||cmd==="참여통계"||cmd==="정산조회"){const now=new Date(Date.now()+KST_MS),end=`${now.getUTCFullYear()}-${String(now.getUTCMonth()+1).padStart(2,"0")}-${String(now.getUTCDate()).padStart(2,"0")}`,start=`${now.getUTCFullYear()}-${String(now.getUTCMonth()+1).padStart(2,"0")}-01`,payload={kakao_user_key:key,start_date:args[0]||start,end_date:args[1]||end},r=cmd==="정산조회"?await botSettlement_(env,aid,payload):await botGuildStats_(env,aid,payload);if(cmd!=="정산조회")return {reply:`📜 기간 보스 ${r.total_raids}회\n${(r.ranking||[]).map(x=>`${x.nickname} ${x.count}회(${x.rate}%)`).join(" · ")}`};return {reply:`💰 판매 ${Number(r.total_sales||0).toLocaleString()} · 보스 ${r.total_raids}회\n${(r.ranking||[]).map(x=>`${x.nickname} ${x.count}회`).join(" · ")}`};}
  throw new Error("알 수 없는 명령입니다. !도움 을 입력하세요.");
}

async function handleBotApi(request,env){
  let body={};try{body=await request.json()}catch{body={};}
  const bearer=request.headers.get("Authorization")?.replace(/^Bearer\s+/i,"")||"",received=String(bearer||body.key||""),expected=String(env.BOT_API_KEY||env.GUILDCORE_API_KEY||env.GUILDCORE_BRIDGE_KEY||"");
  if(!expected)return json({ok:false,error:"V6 BOT_API_KEY(GUILDCORE_API_KEY) secret이 설정되지 않았습니다."},500);
  if(received!==expected)return json({ok:false,error:"인증 실패"},401);
  try{
    const action=String(body.action||"").trim(),p=body.payload||{},discordServerId=String(body.discord_server_id||"");
    if(action==="kakao_resolve_alliance")return json({ok:true,data:await botResolveAllianceQuery_(env,p.query||"")});
    if(action==="discord_alliance_list")return json({ok:true,data:await botListAlliances_(env)});
    if(action==="discord_bind_alliance")return json({ok:true,data:await botBindAlliance_(env,discordServerId,p.query||"")});
    if(action==="discord_unbind_alliance")return json({ok:true,data:await botUnbindAlliance_(env,discordServerId)});
    if(action==="discord_bound_servers")return json({ok:true,data:await botBoundDiscordServers_(env)});
    const a=await botResolveAlliance_(env,body),aid=String(a.alliance_id);
    let data;
    switch(action){
      case "health":data={ok:true,version:APP_VERSION,engine:"Cloudflare Worker + D1",alliance_id:aid};break;
      case "config":data=await botConfig_(env,aid);break;
      case "discord_role_sync":data=await botDiscordRoleSync_(env,aid);break;
      case "servers":data={servers:(await all(env.DB,"SELECT server_id,server_name FROM alliance_servers WHERE alliance_id=? AND enabled=1 ORDER BY server_name",aid))};break;
      case "discord_channel_set":data=await botSetDiscordChannel_(env,aid,p,discordServerId);break;
      case "attendance_channel_resolve":data=await botAttendanceChannelResolve_(env,aid,p);break;
      case "register_member":data=await botRegisterDiscordMember_(env,aid,p);break;
      case "web_pin_self":data=await botWebPinSelf_(env,aid,p);break;
      case "bosses":data=await botBosses_(env,aid,p);break;
      case "boss_add":data=await botBossAdd_(env,aid,p);break;
      case "boss_update":data=await botBossUpdate_(env,aid,p);break;
      case "boss_disable":data=await botBossDisable_(env,aid,p);break;
      case "boss_cut":data=await botBossCut_(env,aid,p);break;
      case "boss_spawn":data=await botBossSpawn_(env,aid,p);break;
      case "participation_create":data=await botParticipationCreate_(env,aid,p);break;
      case "attendance_set":data=await botAttendanceSet_(env,aid,p);break;
      case "attendance_list":data=await botAttendanceList_(env,aid,p.event_id);break;
      case "attendance_close":data=await botAttendanceClose_(env,aid,p);break;
      case "attendance_remove":data=await botAttendanceRemove_(env,aid,p);break;
      case "attendance_message_link":data=await botAttendanceMessageLink_(env,aid,p);break;
      case "attendance_sync_pull":data=await botPullAttendanceSync_(env,aid,p);break;
      case "attendance_sync_mark":data=await botMarkAttendanceSync_(env,aid,p);break;
      case "discord_message_deletes_pull":data=await botPullDiscordMessageDeletes_(env,aid,p);break;
      case "discord_message_deletes_mark":data=await botMarkDiscordMessageDeletes_(env,aid,p);break;
      case "screenshot_watch_channels":data=await botScreenshotWatchChannels_(env,aid,p);break;
      case "screenshot_resolve":data=await botScreenshotResolve_(env,aid,p);break;
      case "screenshot_analyze":data=await botScreenshotAnalyze_(env,aid,p);break;
      case "screenshot_discord_reply_link":data=await botScreenshotReplyLink_(env,aid,p);break;
      case "screenshot_latest":data=await botScreenshotLatest_(env,aid,p);break;
      case "screenshot_apply_missing":data=await botScreenshotApplyMissing_(env,aid,p);break;
      case "my_attendance":data=await botMyAttendance_(env,aid,p);break;
      case "alliance_notices":data=await botAllianceNotices_(env,aid);break;
      case "alliance_notice_add":data=await botAllianceNoticeAdd_(env,aid,p);break;
      case "guild_notices":data=await botGuildNotices_(env,aid,p);break;
      case "guild_notice_add":data=await botGuildNoticeAdd_(env,aid,p);break;
      case "guild_members":data=await botGuildMembers_(env,aid,p);break;
      case "guild_member_add":data=await botGuildMemberAdd_(env,aid,p);break;
      case "loot_list":data=await botLootList_(env,aid,p);break;
      case "loot_add":data=await botLootAdd_(env,aid,p);break;
      case "loot_mark_sold":data=await botLootMarkSold_(env,aid,p);break;
      case "fund_status":data=await botFundStatus_(env,aid,p);break;
      case "fund_add":data=await botFundAdd_(env,aid,p);break;
      case "guild_stats":data=await botGuildStats_(env,aid,p);break;
      case "settlement_preview":data=await botSettlement_(env,aid,p);break;
      case "alerts_pull":data=await botPullAlerts_(env,aid,p);break;
      case "alerts_mark":data=await botMarkAlerts_(env,aid,p);break;
      case "attendance_results_pull":data=await botPullAttendanceResults_(env,aid,p);break;
      case "attendance_results_mark":data=await botMarkAttendanceResults_(env,aid,p);break;
      case "kakao_command":data=await botKakaoCommand_(env,aid,p);break;
      default:throw new Error("지원하지 않는 action: "+action);
    }
    return json({ok:true,data});
  }catch(e){return json({ok:false,error:errorMessage(e)},400);}
}

export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      if (request.method === "GET" && url.pathname === "/health") {
        return json({ok:true,version:APP_VERSION,engine:"Cloudflare Worker + D1"});
      }
      if (request.method === "GET" && (url.pathname === "/" || url.pathname === "/index.html")) {
        await ensureBootstrap(env);
        return new Response(APP_HTML, {
          headers:{"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"}
        });
      }
      if (request.method === "POST" && url.pathname === "/rpc") {
        try {
          const data = await handleRpc(request, env);
          return json({ok:true,data});
        } catch (e) {
          return json({ok:false,error:errorMessage(e)},400);
        }
      }
      if (request.method === "POST" && url.pathname === "/api/bot") {
        return await handleBotApi(request, env);
      }
      return new Response("Not Found", {status:404});
    } catch (e) {
      return json({ok:false,error:errorMessage(e)},500);
    }
  },
  async scheduled(event, env, ctx) {
    ctx.waitUntil(processScheduled(env));
  }
};
