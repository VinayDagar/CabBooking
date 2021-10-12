/* eslint-disable no-undef */
/**
 * Make any changes you need to make to the database here
 */
async function up() {
  await domain.Cab.create([
    {
      model: 'Maruti Swift',
      baseCharges: 28.12,
      isBooked: true,
      location: {
        lati: 28.8041,
        longi: 77.1029,
      },
    },
    {
      model: 'Scorpio',
      baseCharges: 68,
      isBooked: false,
      location: {
        lati: 28.7041,
        longi: 77.1025,
      },
    },
    {
      model: 'Desire',
      baseCharges: 24,
      isBooked: false,
      location: {
        lati: 29.7041,
        longi: 77.1085,
      },
    },
    {
      model: 'Innova',
      baseCharges: 58.12,
      isBooked: false,
      location: {
        lati: 27.7071,
        longi: 75.1025,
      },
    },
  ]);
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down() {
  // Write migration here
}

module.exports = { up, down };
