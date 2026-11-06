/**
 * Glifos dibujados a mano. Trazo 1.5, linecap round, viewBox 24.
 * Sin librería de iconos: el vocabulario gráfico es del autor.
 */
export const iconPaths = {
  briefcase:
    '<rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M8.5 7V5.5A1.5 1.5 0 0 1 10 4h4a1.5 1.5 0 0 1 1.5 1.5V7"/><path d="M3 12.5h18"/><path d="M10 12.5v1.8h4v-1.8"/>',
  person:
    '<circle cx="12" cy="8" r="3.4"/><path d="M5.2 20c.7-3.5 3.3-5.4 6.8-5.4s6.1 1.9 6.8 5.4"/>',
  gear:
    '<circle cx="12" cy="12" r="3.2"/><path d="M12 2.9v2.3M12 18.8v2.3M21.1 12h-2.3M5.2 12H2.9M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6M18.4 18.4l-1.6-1.6M7.2 7.2 5.6 5.6"/>',
  globe:
    '<circle cx="12" cy="12" r="8.8"/><path d="M3.2 12h17.6"/><path d="M12 3.2c2.6 2.4 3.9 5.5 3.9 8.8s-1.3 6.4-3.9 8.8c-2.6-2.4-3.9-5.5-3.9-8.8S9.4 5.6 12 3.2Z"/>',
  cap: '<path d="M2.6 9 12 4.6 21.4 9 12 13.4 2.6 9Z"/><path d="M6.6 11.2V16c0 1.6 2.4 2.9 5.4 2.9s5.4-1.3 5.4-2.9v-4.8"/><path d="M21.4 9v5"/>',
  arrowRight: '<path d="M4 12h15"/><path d="m13 6 6 6-6 6"/>',
  arrowUp: '<path d="M12 19V5"/><path d="m6 11 6-6 6 6"/>',
  copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5.5 15.5H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10.5a1 1 0 0 1 1 1v1.5"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7"/>',
  pause: '<path d="M9 6.5v11M15 6.5v11"/>',
  play: '<path d="M8.5 5.5v13L18.5 12l-10-6.5Z"/>',
  layers:
    '<path d="m12 3.5 8.5 4.7-8.5 4.7-8.5-4.7 8.5-4.7Z"/><path d="m3.5 12.6 8.5 4.7 8.5-4.7"/><path d="m3.5 16.8 8.5 4.7 8.5-4.7"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.6 6.7 8.4 6 8.4-6"/>',
} as const;

export type IconName = keyof typeof iconPaths;
