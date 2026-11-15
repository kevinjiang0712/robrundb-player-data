export const STEAM_URL = 'https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=4262460';
export const INTERVAL = 600000;
export async function collect(previous, fetcher = fetch, now = Date.now()) {
  const samples = (previous?.samples || []).filter(s => s.at >= now - 48 * 3600000);
  try {
    const response = await fetcher(STEAM_URL, {signal: AbortSignal.timeout(12000)});
    if (!response.ok) throw new Error('Steam unavailable');
    const body = await response.json();
    const count = body?.response?.player_count;
    if (body?.response?.result !== 1 || !Number.isSafeInteger(count) || count < 0) throw new Error('Invalid Steam response');
    samples.push({at: now, count});
    return {appid: 4262460, samples: samples.slice(-300), lastAttempt: now, lastAttemptOk: true};
  } catch {
    return {appid: 4262460, samples, lastAttempt: now, lastAttemptOk: false};
  }
}
