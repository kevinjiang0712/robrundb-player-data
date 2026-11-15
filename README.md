# ROB RUN player observations
Public, timestamped observations of Steam app **4262460** for [ROB RUN Wiki](https://www.robrundb.wiki/guide/rob-run-steam-charts).

Source: Steam's public `ISteamUserStats/GetNumberOfCurrentPlayers/v1` endpoint. This counts game-wide concurrent players excluding users offline in Steam; it is not a per-server health signal.

GitHub Actions is scheduled at minutes 3,13,23,33,43,53 of each hour (UTC). Scheduled execution and the raw file cache can be delayed. The website labels samples older than 20 minutes stale. Failed fetches retain the last valid observation and set `lastAttemptOk` false; they never add a zero sample. The dataset retains the latest 48 hours (up to 300 observations). Git history retains previous published observations. No player identities, user reports, account credentials or private site source are stored here.

`workflow_dispatch` supports manual recovery. To pause, disable the collection workflow in Actions. To reproduce locally: Node 22+, `node update.mjs`.
