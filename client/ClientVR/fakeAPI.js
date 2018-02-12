const fakeAPI = {
  domMenuData: {
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
  modalData: {
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
  storageKeyData: {
    kitchen: {
      scene: 'KitchenScenePano',
      sunroom: 'KitchenSunroomPano',
      cabinets: 'KitchenCabinetsPano',
      backsplash: 'KitchenBacksplashPano',
      counter: 'KitchenCounterPano',
      all: ['KitchenScenePano', 'KitchenSunroomPano', 'KitchenCabinetsPano', 'KitchenBacksplashPano', 'KitchenCounterPano']
    },
    all: ['KitchenScenePano', 'KitchenSunroomPano', 'KitchenCabinetsPano', 'KitchenBacksplashPano', 'KitchenCounterPano']
  },
  panoUriData: {
    kitchen: {
      scene: {
        americanClassic: [
          'panos/kitchen/AC/Foster_Int_Kitchen_AmericanClassic0.jpg',
          'panos/kitchen/AC/Foster_Int_Kitchen_AmericanClassic1.jpg',
          'panos/kitchen/AC/Foster_Int_Kitchen_AmericanClassic2.jpg',
          'panos/kitchen/AC/Foster_Int_Kitchen_AmericanClassic3.jpg',
          'panos/kitchen/AC/Foster_Int_Kitchen_AmericanClassic4.jpg',
          'panos/kitchen/AC/Foster_Int_Kitchen_AmericanClassic5.jpg'
        ],
        americanClassicSunroom: [
          'panos/kitchen/AC/Foster_Int_Kitchen_AmericanClassic_Sunroom0.jpg',
          'panos/kitchen/AC/Foster_Int_Kitchen_AmericanClassic_Sunroom1.jpg',
          'panos/kitchen/AC/Foster_Int_Kitchen_AmericanClassic_Sunroom2.jpg',
          'panos/kitchen/AC/Foster_Int_Kitchen_AmericanClassic_Sunroom3.jpg',
          'panos/kitchen/AC/Foster_Int_Kitchen_AmericanClassic_Sunroom4.jpg',
          'panos/kitchen/AC/Foster_Int_Kitchen_AmericanClassic_Sunroom5.jpg'
        ],
        bellaVista: [
          'panos/kitchen/BV/Foster_Int_Kitchen_BellaVista0.jpg',
          'panos/kitchen/BV/Foster_Int_Kitchen_BellaVista1.jpg',
          'panos/kitchen/BV/Foster_Int_Kitchen_BellaVista2.jpg',
          'panos/kitchen/BV/Foster_Int_Kitchen_BellaVista3.jpg',
          'panos/kitchen/BV/Foster_Int_Kitchen_BellaVista4.jpg',
          'panos/kitchen/BV/Foster_Int_Kitchen_BellaVista5.jpg'
        ],
        bellaVistaBrick: [
          'panos/kitchen/BVB/Foster_Int_Kitchen_BellaVistaBrick0.jpg',
          'panos/kitchen/BVB/Foster_Int_Kitchen_BellaVistaBrick1.jpg',
          'panos/kitchen/BVB/Foster_Int_Kitchen_BellaVistaBrick2.jpg',
          'panos/kitchen/BVB/Foster_Int_Kitchen_BellaVistaBrick3.jpg',
          'panos/kitchen/BVB/Foster_Int_Kitchen_BellaVistaBrick4.jpg',
          'panos/kitchen/BVB/Foster_Int_Kitchen_BellaVistaBrick5.jpg'
        ]
      },
      sunroom: {
        bellaVista: 'panos/kitchen/BV/Foster_Int_Kitchen_BellaVista_Sunroom.png',
        bellaVistaBrick: 'panos/kitchen/BVB/Foster_Int_Kitchen_BellaVistaBrick_Sunroom.png',
      },
      backsplash: {
        option2: 'panos/kitchen/backsplash/Kitchen_AC_Backsplash2.png',
        option3: 'panos/kitchen/backsplash/Kitchen_AC_Backsplash3.png',
        option4: 'panos/kitchen/backsplash/Kitchen_AC_Backsplash4.png',
        sunroom: {
          option2: 'panos/kitchen/backsplash/Kitchen_AC_Sunroom_Backsplash2.png',
          option3: 'panos/kitchen/backsplash/Kitchen_AC_Sunroom_Backsplash3.png',
          option4: 'panos/kitchen/backsplash/Kitchen_AC_Sunroom_Backsplash4.png'
        }
      },
      cabinets: {
        option2: 'panos/kitchen/cabinets/Kitchen_AC_Cabs2.png',
        option3: 'panos/kitchen/cabinets/Kitchen_AC_Cabs3.png',
        option4: 'panos/kitchen/cabinets/Kitchen_AC_Cabs4.png',
        sunroom: {
          option2: 'panos/kitchen/cabinets/Kitchen_AC_Sunroom_Cabs2.png',
          option3: 'panos/kitchen/cabinets/Kitchen_AC_Sunroom_Cabs3.png',
          option4: 'panos/kitchen/cabinets/Kitchen_AC_Sunroom_Cabs4.png'
        }
      },
      counter: {
        option2: 'panos/kitchen/counter/Kitchen_AC_Counter2.png',
        option3: 'panos/kitchen/counter/Kitchen_AC_Counter3.png',
        option4: 'panos/kitchen/counter/Kitchen_AC_Counter4.png',
        sunroom: {
          option2: 'panos/kitchen/counter/Kitchen_AC_Sunroom_Counter2.png',
          option3: 'panos/kitchen/counter/Kitchen_AC_Sunroom_Counter3.png',
          option4: 'panos/kitchen/counter/Kitchen_AC_Sunroom_Counter4.png'
        }
      }
    }
  },
  getMenuData: function() {
    return new Promise((resolve, reject) => {
      const menuDescriptor = Object.getOwnPropertyDescriptor(this, 'domMenuData');
      menuDescriptor ? resolve(menuDescriptor.value) : reject(new Error('menu data not found'));
    });
  },
  getModalData: function() {
    return new Promise((resolve, reject) => {
      const modalDescriptor = Object.getOwnPropertyDescriptor(this, 'modalData');
      modalDescriptor ? resolve(modalDescriptor.value) : reject(new Error('modal data not found'));
    });
  },
  getStorageKeyData: function() {
    return new Promise((resolve, reject) => {
      const storageKeyDescriptor = Object.getOwnPropertyDescriptor(this, 'storageKeyData');
      storageKeyDescriptor ? resolve(storageKeyDescriptor.value) : reject(new Error('storage key data not found'));
    });
  },
  getPanoUriData: function() {
    return new Promise((resolve, reject) => {
      const panoUriDescriptor = Object.getOwnPropertyDescriptor(this, 'panoUriData');
      panoUriDescriptor ? resolve(panoUriDescriptor.value) : reject(new Error('pano uri data not found'));
    })
  }
}

export default fakeAPI;
