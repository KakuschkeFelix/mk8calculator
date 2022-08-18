export const environment = {
  production: true,
  configurationFiles: [
    `${window.location.origin}/configurations/statistics-form-configuration.json`,
  ],
  localAssets: [
    `${window.location.origin}/partstats/bodies.json`,
    `${window.location.origin}/partstats/drivers.json`,
    `${window.location.origin}/partstats/gliders.json`,
    `${window.location.origin}/partstats/tires.json`,
  ]
};
