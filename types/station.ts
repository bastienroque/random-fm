export interface Station {
  stationuuid: string;
  name: string;
  url_resolved: string; // direct stream URL (use this, not `url`)
  homepage: string;
  favicon: string;
  country: string;
  language: string;
  tags: string;
  codec: string;
  bitrate: number;
  votes: number;
}
