import {readFile,writeFile} from 'node:fs/promises';
import {collect} from './collect.mjs';
let previous;
try { previous=JSON.parse(await readFile('players.json','utf8')); } catch(e) { if(e.code!=='ENOENT')throw e; }
if(previous && (previous.appid!==4262460 || !Array.isArray(previous.samples)))throw new Error('Invalid history; refusing to replace');
const now=Date.now();
if(previous?.lastAttempt && now-previous.lastAttempt<5*60000){console.log('Recent sample exists');process.exit(0);}
const result=await collect(previous,fetch,now);
await writeFile('players.json',JSON.stringify(result)+'\n');
console.log(JSON.stringify({ok:result.lastAttemptOk,samples:result.samples.length,last:result.samples.at(-1)}));
