/* eslint-disable no-undef */
/**
 * Make any changes you need to make to the database here
 */
async function up() {
  await domain.User.create([
    {
      name: 'Kavita',
      phone: '8965854778',
      email: 'kavita@gmail.com',
      password: '123456',
      location: {
        lati: 28.7041,
        longi: 77.1025,
      },
    },
    {
      name: 'rahul',
      phone: '8965854778',
      email: 'rahul@gmail.com',
      password: '123456',
      location: {
        lati: 28.7141,
        longi: 77.1025,
      },
    },
    {
      name: 'Kavita',
      phone: '8965854778',
      email: 'kavita@gmail.com',
      password: '123456',
      location: {
        lati: 28.7049,
        longi: 77.1025,
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
