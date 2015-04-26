'use strict';

var config = {
  formId: 'tkf-skoleskyss',
  formName: 'Skoleskyss',
  initialState: {
    personnummer: '',
    navn: '',
    folkeregistrert_adresse_bosted: '',
    folkeregistrert_adresse_adresse:'',
    folkeregistrert_adresse_gnr: '',
    folkeregistrert_adresse_bnr: '',
    folkeregistrert_adresse_kommunenr:'',
    alternativ_adresse: '',
    alternativ_adresse_bosted: '',
    alternativ_adresse_adresse:'',
    alternativ_adresse_gnr: '',
    alternativ_adresse_bnr: '',
    alternativ_adresse_kommunenr:'',
    telefon: '',
    epost: '',
    skole: '',
    klassetrinn: '',
    sokegrunnlag: '',
    busskortstatus: '',
    busskortnummer: '',
    eksternSkoleNavn: '',
    eksternSkoleAdresse: ''
  },
  SERVER_PORT: 3000,
  API_POST_HOST: 'api.t-fk.no',
  API_POST_PATH: '/forms'
};

module.exports = config;