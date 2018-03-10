'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [{
      name: 'Cosmic Down 40',
      category: 'sleepingbag',
      price: '129.95',
      description: 'Cosmic Down 40 Sleeping Bag',
      image: 'bag_1.jpg'
    },{
      name: 'Atom',
      category: 'sleepingbag',
      price: '230.93',
      description: 'Atom Sleeping Bag',
      image: 'bag_2.jpg'
    },{
      name: 'The North Face',
      category: 'sleepingbag',
      price: '189',
      description: 'Furnace 20 Sleeping Bag',
      image: 'bag_3.jpg'
    },{
      name: 'Riff 15',
      category: 'sleepingbag',
      price: '419.95',
      description: 'Riff 15 Sleeping Bag',
      image: 'bag_4.jpg'
    },{
      name: 'Co-op Magma 10',
      category: 'sleepingbag',
      price: '369',
      description: 'Co-op Magma 10 Sleeping Bag',
      image: 'bag_5.jpg'
    },{
      name: 'Trestles 0',
      category: 'sleepingbag',
      price: '159',
      description: 'Trestles 0 Sleeping Bag',
      image: 'bag_6.jpg'
    },{
      name: 'Cabana Shelter',
      category: 'tent',
      price: '99.95',
      description: 'Cabana Shelter',
      image: 'tent_1.jpg'
    },{
      name: 'Grande Sunshade',
      category: 'tent',
      price: '124.95',
      description: 'Grande Sunshade',
      image: 'tent_2.jpg'
    },{
      name: 'Co-op Half Dome 2 Plus',
      category: 'tent',
      price: '229',
      description: 'Co-op Half Dome 2 Plus Tent',
      image: 'tent_3.jpg'
    },{
      name: 'Co-op Kingdom 6',
      category: 'tent',
      price: '439',
      description: 'Co-op Kingdom 6 Tent',
      image: 'tent_4.jpg'
    },{
      name: 'Assault 2',
      category: 'tent',
      price: '439',
      description: 'Assault 2 Tent',
      image: 'tent_5.jpg'
    },{
      name: 'Battle Mountain 2',
      category: 'tent',
      price: '699.95',
      description: 'Battle Mountain 2 Tent',
      image: 'tent_6.jpg'
    },{
      name: 'Manta AG 36 Hydration',
      category: 'backpack',
      price: '175',
      description: 'Manta AG 36 Hydration Pack',
      image: 'pack_1.jpg'
    },{
      name: 'Graviton 34',
      category: 'backpack',
      price: '159',
      description: 'Graviton 34 Pack',
      image: 'pack_2.jpg'
    },{
      name: 'Talon 6 Hydration',
      category: 'backpack',
      price: '75',
      description: 'Talon 6 Hydration Waistpack',
      image: 'pack_3.jpg'
    },{
      name: 'Kyte 46',
      category: 'backpack',
      price: '180',
      description: 'Kyte 46 Pack',
      image: 'pack_4.jpg'
    },{
      name: 'Trekker 65',
      category: 'backpack',
      price: '179.95',
      description: 'Trekker 65 Pack',
      image: 'pack_5.jpg'
    },{
      name: 'Kid Comfort Air',
      category: 'backpack',
      price: '240',
      description: 'Kid Comfort Air Child Carrier',
      image: 'pack_6.jpg'
    }], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
