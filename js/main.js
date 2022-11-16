document.addEventListener('DOMContentLoaded', () => {
  const defaultSelect = () => {
    const element = document.querySelector('.select')
    const choices = new Choices(element, {
      searchEnabled: false,
    });
  }
  ymaps.ready(init);
  function init() {
    var myMap = new ymaps.Map("map", {
      center: [55.7557472279156, 37.611309686376764],
      zoom: 14
    });

    var myPlacemark = new ymaps.Placemark([55.7557472279156, 37.611309686376764], {}, {
      iconLayout: 'default#image',
      iconImageHref: 'images/locationmark.svg',
      iconImageSize: [48, 48],
      iconImageOffset: [-24, -40]
    });

    myMap.geoObjects.add(myPlacemark);

    myMap.controls.remove('geolocationControl'); // удаляем геолокацию
    myMap.controls.remove('searchControl'); // удаляем поиск
    myMap.controls.remove('trafficControl'); // удаляем контроль трафика
    myMap.controls.remove('typeSelector'); // удаляем тип
    myMap.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
    myMap.controls.remove('zoomControl'); // удаляем контрол зуммирования
    myMap.controls.remove('rulerControl'); // удаляем контрол правил
    myMap.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)
  }

  //inputmask
  const form = document.querySelector('.form')
  const telSelector = form.querySelector('input[type="tel"]')
  const inputMask = new Inputmask('+7 (999) 999-99-99')
  inputMask.mask(telSelector)

  new window.JustValidate('.form', {
    rules: {
      name: {
        required: true,
        minLength: 2,
        maxLength: 20,
      },
      tel: {
        required: true,
        function: () => {
          const phone = telSelector.inputmask.unmaskedvalue();
          return Number(phone) && phone.length === 10;
        },
      },
    },
    colorWrong: '#FF5C00',
    messages: {
      name: {
        required: 'Введите имя',
        minLength: 'Введите 2 и более символов',
        maxLength: 'Запрещено вводить более 20 символов',
      },
      email: {
        required: 'Введите email',
        email: 'Введите корректный email'
      },
      tel: {
        required: 'Введите телефон',
        function: 'Введите корректный телефон'
      }
    }
  })

  defaultSelect()
})
