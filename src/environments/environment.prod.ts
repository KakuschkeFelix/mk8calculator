export const environment = {
  production: true,
  configurationFiles: [
    '../assets/configurations/statistics-form-configuration.json',
  ],
  localAssets: [
    `${window.location.origin}/assets/partstats/bodies.json`,
    `${window.location.origin}/assets/partstats/drivers.json`,
    `${window.location.origin}/assets/partstats/gliders.json`,
    `${window.location.origin}/assets/partstats/tires.json`,
  ]
};
