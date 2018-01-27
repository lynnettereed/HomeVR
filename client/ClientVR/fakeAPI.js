const fakeAPI = {
  domMenuContent: {
    menuFamilyRoom: {
      menuData: [
        {
          sectionHeader: 'scene',
          sectionOptions: ['FamilyRoom', 'Kitchen'],
        },
        {
          sectionHeader: 'elevation',
          sectionOptions: ['american classic', 'bella vista', 'bella vista brick'],
        },
        {
          sectionHeader: 'sunroom',
          sectionOptions: ['on', 'off'],
        },
      ],
    },
    menuKitchen: {
      menuData: [
        {
          sectionHeader: 'scene',
          sectionOptions: ['FamilyRoom', 'Kitchen'],
        },
        {
          sectionHeader: 'elevation',
          sectionOptions: ['american classic', 'bella vista', 'bella vista brick'],
        },
        {
          sectionHeader: 'sunroom',
          sectionOptions: ['on', 'off'],
        },
        {
          sectionHeader: 'cabinets',
          sectionOptions: ['option1', 'option2', 'option3', 'option4'],
        },
        {
          sectionHeader: 'backsplash',
          sectionOptions: ['option1', 'option2', 'option3', 'option4'],
        },
        {
          sectionHeader: 'counter',
          sectionOptions: ['option1', 'option2', 'option3', 'option4'],
        },
      ],
    }
  },
  modalContent: {
    appliances: {
      refrigerator: {
        data: {
          title: '36-inch Wide Side-by-Side Refrigerator - 28 cu. ft.',
          model: 'WRS588FIHV',
          msrp: '$1,899.00',
          quickFeatures: [
            '-Exterior Ice with EveryDrop™ Filtration',
            '-In-Door-Ice® Storage',
            '-Accu-Chill™ Temperature Management System'
          ],
          additionalFeatures: [
            {
              title: 'Exterior Ice and Water Dispenser with EveryDrop™ Filtration',
              info: 'Access fresh filtered water and ice without ever opening the refrigerator door.'
            },
            {
              title: 'In-Door-Ice® Storage',
              info: 'Get an extra full shelf in the freezer with an ice bin that\'s been moved to the door.'
            },
            {
              title: 'Accu-Chill™ Temperature Management System',
              info: 'Cool food quickly with technology that senses and adapts to create the ideal environment for food.'
            },
            {
              title: 'Frameless Glass Shelves',
              info: 'Store more items on each shelf with wall-to-wall frameless glass shelves, which offer greater storage flexibility.'
            }
          ],
          imgSrc: '/static_assets/images/refrigerator.png',
          prodImgSrc: './static_assets/images/refrigerator.png',
          colorOptions: [
            {
              name: 'black',
              value: '#000'
            },
            {
              name: 'fingerprint resistant black stainless',
              value: '#5B5959'
            },
            {
              name: 'white',
              value: '#FFF'
            },
            {
              name: 'fingerprint resistant stainless steel',
              value: '#D8D8D8'
            },
          ]
        }
      }
    }
  },
  getMenuData: function() {
    return new Promise((resolve, reject) => {
      const menuDescriptor = Object.getOwnPropertyDescriptor(this, 'domMenuContent');
      menuDescriptor ? resolve(menuDescriptor.value) : reject(new Error('menu content not found'));
    });
  },
  getModalData: function() {
    return new Promise((resolve, reject) => {
      const modalDescriptor = Object.getOwnPropertyDescriptor(this, 'modalContent');
      modalDescriptor ? resolve(modalDescriptor.value) : reject(new Error('modal content not found'));
    });
  }
}

export default fakeAPI;
