'use strict';

var pkg = require('../package.json');
var formId = 'tfk-skoleskyss';

var config = {
  formId: formId,
  formName: 'Skoleskyss',
  initialState: {
    page: 1,
    formId: formId,
    formVersion: pkg.version,
    gotSession: false,
    validityCheck:{
      formIsValid: false,
      formErrorMessage: 'Du har ikke fyllt ut alle påkrevde felt',
      showFormErrorMessage: false,
      invalidFields:[],
      invalidBooleans:[],
      invalidFormats: []

    },
    isFromTelemark: 'ja',
    personnummer: '',
    navn: '',
    alternativAdresse: '',
    alternativAdresseAdresse:'',
    alternativAdressePostnummer: '',
    alternativAdressePoststed: '',
    telefon: '',
    epost: '',
    skole: '',
    skoleId: '',
    skoleNavn: '',
    skoleAdresse: '',
    klassetrinn: '',
    studieretning: '',
    sokegrunnlag: '',
    busskortstatus: '',
    busskortnummer: '',
    eksternSkoleNavn: '',
    eksternSkoleAdresse: '',
    termsAccepted: ''
  },
  skoleListe: [
    {value:'', text:'Jeg skal gå på', id:'007'},
    {value:'39601', text:'Bamble videregående skole, avdeling Grasmyr', id:'39601'},
    {value:'39602', text:'Bamble videregående skole, avdeling Croftholmen', id:'39602'},
    {value:'3802', text:'Bø videregåande skule', id:'3802'},
    {value:'3733', text:'Hjalmar Johansen videregående skole, avdeling Fritidsparken', id:'3733'},
    {value:'3730', text:'Hjalmar Johansen videregående skole, avdeling Klosterskogen', id:'3730'},
    {value:'3770', text:'Kragerø videregående skole', id:'3770'},
    {value:'3850', text:'Kvitsund gymnas', id:'3850'},
    {value:'3825', text:'Nome videregående skole, avdeling Lunde', id:'3825'},
    {value:'3830', text:'Nome videregående skole, avdeling Søve', id:'3830'},
    {value:'3674', text:'Notodden videregående skole', id:'3674'},
    {value:'39181', text:'Porsgrunn videregående skole, avdeling Nord', id:'39181'},
    {value:'39182', text:'Porsgrunn videregående skole, avdeling Sør', id:'39182'},
    {value:'3660', text:'Rjukan videregående skole', id:'3660'},
    {value:'3717', text:'Skien videregående skole, avdeling Brekkeby', id:'3717'},
    {value:'3724', text:'Skien videregående skole, avdeling Prestejordet', id:'3724'},
    {value:'3735', text:'Skogmo videregående skole', id:'3735'},
    {value:'3722', text:'Toppidrettsgymnaset i Telemark', id:'3722'},
    {value:'3880', text:'Vest-Telemark vidaregåande skule, avdeling Dalen', id:'3880'},
    {value:'3840', text:'Vest-Telemark vidaregåande skule, avdeling Seljord', id:'3840'},
    {value:'Skole utenfor Telemark', text:'Skole utenfor Telemark', id:'0666'}
  ],
  skoleIndex: {
    '39601': {
      name:'Bamble videregående skole, avdeling Grasmyr',
      address: 'Tønderveien 6, 3960 Stathelle'
    },
    '39602': {
      name:'Bamble videregående skole, avdeling Croftholmen',
      address: 'Tostrupsvei 7, 3960 Stathelle'
    },
    '3802': {
      name:'Bø videregåande skule',
      address: 'Gymnasbakken 23, 3802 Bø'
    },
    '3733': {
      name:'Hjalmar Johansen videregående skole, avdeling Fritidsparken',
      address: 'Moflatvegen 38, 3733 Skien'
    },
    '3730': {
      name:'Hjalmar Johansen videregående skole, avdeling Klosterskogen',
      address: 'Olai Skulleruds veg 20, 3730 Skien'
    },
    '3770': {
      name:'Kragerø videregående skole',
      address: 'Frydensborgveien 9-11, 3770 Kragerø'
    },
    '3850': {
      name:'Kvitsund gymnas',
      address: 'Jakob Naadlandsveg 2, 3850 Kviteseid'
    },
    '3825': {
      name:'Nome videregående skole, avdeling Lunde',
      address: 'Olav Strannas vei 25, 3825 Lunde'
    },
    '3830': {
      name: 'Nome videregående skole, avdeling Søve',
      address: 'Søveveien 8, 3830 Ulefoss'
    },
    '3674': {
      name:'Notodden videregående skole',
      address: 'Heddalsveien 4, 3674 Notodden'
    },
    '39181': {
      name:'Porsgrunn videregående skole, avdeling Nord',
      address: 'Kjølnes Ring 58, 3918 Porsgrunn'
    },
    '39182': {
      name:'Porsgrunn videregående skole, avdeling Sør',
      address: 'Kjølnes Ring 20, 3918 Porsgrunn'
    },
    '3660': {
      name: 'Rjukan videregående skole',
      address: 'Såheimveien 22, 3660 Rjukan'
    },
    '3717': {
      name: 'Skien videregående skole, avdeling Brekkeby',
      address: 'Rektor Ørns gate 2, 3717 Skien'
    },
    '3724': {
      name: 'Skien videregående skole, avdeling Prestejordet',
      address: 'Einar Østvedts gate 12, 3724 Skien'
    },
    '3735': {
      name:'Skogmo videregående skole',
      address: 'Kjørbekkdalen 11, 3735 Skien'
    },
    '3722': {
      name:'Toppidrettsgymnaset i Telemark',
      address: 'Fritjof Nansens gate 19C, 3722 Skien'
    },
    '3880': {
      name:'Vest-Telemark vidaregåande skule, avdeling Dalen',
      address: 'Storvegen 195, 3880 Dalen'
    },
    '3840': {
      name:'Vest-Telemark vidaregåande skule, avdeling Seljord',
      address: 'Brøløsvegen 2, 3840 Seljord'}
},
  SERVER_PORT: 3000,
  API_POST_HOST: 'api.t-fk.no',
  API_POST_PATH: '/forms',
  TRAVEL_API: 'https://api.t-fk.no/stages/travel',
  SESSION_API: 'https://api.t-fk.no/session'
};

module.exports = config;