'use strict';

var config = {
  formId: 'tkf-skoleskyss',
  formName: 'Skoleskyss',
  initialState: {
    personnummer: '',
    navn: '',
    adresse: '',
    telefon: '',
    skole: '',
    klassetrinn: '',
    transportform: '',
    transporter: '',
    busskortstatus: '',
    busskortnummer: '',
    holdeplassHjem: '',
    holdeplassSkole: '',
    eksternSkoleNavn: '',
    eksternSkoleAdresse: ''
  },
  SERVER_PORT: 3000,
  API_POST_HOST: 'api.t-fk.no',
  API_POST_PATH: '/forms'
};

module.exports = config;