'use strict';

var React = require('react/addons');
var doSubmitForm = require('../../utils/submitform');
var config = require('../../config');
var pkg = require('../../package.json');
var versionNumber = config.formId + '-' + pkg.version;

function showGateadresse(state){
  var className = 'hidden';
  if (state === 'Gateadresse' && state !== '') {
    className = '';
  }
  return className;
}

function showGnrBnr(state){
  var className = 'hidden';
  if (state === 'GnrBnr' && state !== '') {
    className = '';
  }
  return className;
}

function showBusskortvalg(state){
  var className = 'hidden';
  if (state !== 'Telemark Bilruter/Telemarksekspressen/Haukeliekspressen' && state !== '') {
    className = '';
  }
  return className;
}

function showBusskortNummer(state){
  var className = 'hidden';
  if (state === 'Har busskort') {
    className = '';
  }
  return className;
}

function showEksternSkoleAdresse(state){
  var className = 'hidden';
  if (state === 'Skole utenfor Telemark') {
    className = '';
  }
  return className;
}

var App = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return config.initialState;
  },
  componentDidUpdate: function(prevProps, prevState) {
    localStorage[config.formId] = JSON.stringify(this.state);
  },
  componentDidMount: function() {
    if (localStorage.getItem(versionNumber)) {
      this.setState(JSON.parse(localStorage.getItem(versionNumber)));
    }
  },
  cleanUp: function(){
    localStorage.clear();
    this.setState(config.initialState);
  },
  cancelForm: function(e){
    e.preventDefault();
    this.cleanUp();
  },
  submitForm: function(e) {
    e.preventDefault();
    var self = this;
    var payload = {
      personnummer: this.state.personnummer,
      navn: this.state.navn,
      adresse: this.state.adresse,
      gnr: this.state.gnr,
      bnr: this.state.bnr,
      kommunenr: this.state.kommunenr,
      telefon: this.state.telefon,
      epost: this.state.epost,
      skole: this.state.skole,
      klassetrinn: this.state.klassetrinn,
      busskortstatus: this.state.busskortstatus,
      busskortnummer: this.state.busskortnummer,
      eksternSkoleNavn: this.state.eksternSkoleNavn,
      eksternSkoleAdresse: this.state.eksternSkoleAdresse,
      formId: config.formId,
      formVersion: pkg.version
    };
    doSubmitForm(payload, function(err, data){
      if (err) {
        console.error(err);
      } else {
        self.cleanUp();
      }
    });
  },
  render: function(){
    return (
      <div>
      <h1>Skoleskyss</h1>
        <form onSubmit={this.submitForm}>
          <fieldset>
            <legend>Personalia</legend>
            <label htmlFor="personnummer">Fødselsnummer (11 siffer)</label>
            <input type="text" name="personnummer" placeholder="Fødselsnummer, 11 siffer" id="personnummer" valueLink={this.linkState('personnummer')} />
            <label htmlFor="navn">Navn</label>
            <input type="text" name="navn" placeholder="Fornavn, mellomnavn og etternavn" id="navn" valueLink={this.linkState('navn')} />
          </fieldset>
          <fieldset>
          <legend>Kontaktinformasjon</legend>
            <label htmlFor="epost">E-post</label>
            <input type="text" name="epost" placeholder="E-postadresse" id="epost" valueLink={this.linkState('epost')} />
            <label htmlFor="telefon">Telefon</label>
            <input type="text" name="telefon" placeholder="Mobilnummer/Telefonnummer" id="telefon" valueLink={this.linkState('telefon')} />
          </fieldset>
          <fieldset>
            <legend>Bosted</legend>
            <select name="bosted" valueLink={this.linkState('bosted')}>
            <option value="">Velg adresseform</option>
            <option value="Gateadresse">Gateadresse</option>
            <option value="GnrBnr">Gårds og bruksnummer</option>
            </select>
          </fieldset>
          <fieldset className={showGateadresse(this.state.bosted)}>
            <label htmlFor="adresse">Adresse</label>
            <input type="text" name="adresse" placeholder="Gateadresse, postnummer og poststed" id="adresse" valueLink={this.linkState('adresse')} />
          </fieldset>
          <fieldset className={showGnrBnr(this.state.bosted)}>
            <label htmlFor="gnr">Gårdsnummer</label>
            <input type="text" name="gnr" placeholder="Gårdsnummer" id="gnr" valueLink={this.linkState('gnr')} />
            <label htmlFor="bnr">Bruksnummer</label>
            <input type="text" name="bnr" placeholder="Bruksnummer" id="bnr" valueLink={this.linkState('bnr')} />
          </fieldset>
          <fieldset>
            <legend>Skole</legend>
            <select name="skole" valueLink={this.linkState('skole')}>
              <option value="">Velg skole</option>
              <option value="Bamble videregående skole, Tønderveien 6, 3960 Stathelle">
                Bamble videregående skole, avdeling Grasmyr
              </option>
              <option value="Bamble videregående skole, Tostrupsvei 7, 3960 Stathelle">
                Bamble videregående skole, avdeling Croftholmen
              </option>
              <option value="Bø videregåande skule, Gymnasbakken 23, 3802 Bø">
                Bø videregåande skule
              </option>
              <option value="Hjalmar Johansen videregående skole, Moflatvegen 38, 3733 Skien">
                Hjalmar Johansen videregående skole, avdeling Fritidsparken
              </option>
              <option value="Hjalmar Johansen videregående skole, Olai Skulleruds veg 20, 3730 Skien">
                Hjalmar Johansen videregående skole, avdeling Klosterskogen
              </option>
              <option value="Kragerø videregående skole, Frydensborgveien 9-11, 3770 Kragerø">
                Kragerø videregående skole
              </option>
              <option value="Kvitsund gymnas, Jakob Naadlandsveg 2, 3850 Kviteseid">
                Kvitsund gymnas
              </option>
              <option value="Nome videregående skole, Olav Strannas vei 25, 382 Lunde">
                Nome videregående skole, avdeling Lunde
              </option>
              <option value="Nome videregående skole, Søveveien 8, 3830 Ulefoss">
                Nome videregående skole, avdeling Søve
              </option>
              <option value="Notodden videregående skole, Heddalsveien 4, 3674 Notodden">
                Notodden videregående skole
              </option>
              <option value="Porsgrunn videregående skole, Kjølnes Ring 58, 3918 Porsgrunn">
                Porsgrunn videregående skole, avdeling Nord
              </option>
              <option value="Porsgrunn videregående skole, Kjølnes Ring 20, 3918 Porsgrunn">
                Porsgrunn videregående skole, avdeling Sør
              </option>
              <option value="Rjukan videregående skole, Såheimveien 22, 3660 Rjukan">
                Rjukan videregående skole
              </option>
              <option value="Skien videregående skole, Rektor Ørns gate 2, 3717 Skien">
                Skien videregående skole, avdeling Brekkeby
              </option>
              <option value="Skien videregående skole, Einar Østvedts gate 12, 3724 Skien">
                Skien videregående skole, avdeling Prestegjordet
              </option>
              <option value="Skogmo videregående skole, Kjørbekkdalen 11, 3735 Skien">
                Skogmo videregående skole
              </option>
              <option value="Toppidrettsgymnaset i Telemark, Fritjof Nansens gate 19C, 3722 Skien">
                Toppidrettsgymnaset i Telemark
              </option>
              <option value="Vest-Telemark vidaregåande skule, Storvegen 195, 3880 Dalen">
                Vest-Telemark vidaregåande skule, avdeling Dalen
              </option>
              <option value="Vest-Telemark vidaregåande skule, Brøløsvegen 2, 3840 Seljord">
                Vest-Telemark vidaregåande skule, avdeling Seljord
              </option>
              <option value="Skole utenfor Telemark">Skole utenfor Telemark</option>
            </select>
          </fieldset>
          <fieldset className={showEksternSkoleAdresse(this.state.skole)}>
            <label htmlFor="eksternSkoleNavn">Skolens navn</label>
            <input type="text" name="eksternSkoleNavn" placeholder="Navn på skolen" id="eksternSkoleNavn" valueLink={this.linkState('eksternSkoleNavn')} />
          </fieldset>
          <fieldset className={showEksternSkoleAdresse(this.state.skole)}>
            <label htmlFor="eksternSkoleAdresse">Skolens adresse</label>
            <input type="text" name="eksternSkoleAdresse" placeholder="Skolens besøksadresse" id="eksternSkoleAdresse" valueLink={this.linkState('eksternSkoleAdresse')} />
          </fieldset>
          <fieldset>
            <legend>Klassetrinn</legend>
            <select name="klassetrinn" valueLink={this.linkState('klassetrinn')}>
              <option value="">Velg klassetrinn</option>
              <option value="1. klasse">1. klasse</option>
              <option value="2. klasse">2. klasse</option>
              <option value="3. klasse">3. klasse</option>
              <option value="4. klasse">4. klasse</option>
            </select>
          </fieldset>
          <fieldset className={showBusskortvalg(this.state.transporter)}>
            <legend>Busskort</legend>
            <select name="busskortstatus" valueLink={this.linkState('busskortstatus')}>
              <option value="">Velg busskortstatus</option>
              <option value="Trenger nytt">Jeg har ikke hatt skyss tidligere og trenger busskort</option>
              <option value="Mistet busskort">Jeg har hatt skyss tidligere, men har mistet busskortet</option>
              <option value="Har busskort">Jeg har hatt skyss tidligere</option>
            </select>
          </fieldset>
          <fieldset className={showBusskortNummer(this.state.busskortstatus)}>
            <label htmlFor="busskortnummer">Busskortnummer</label>
            <input type="text" name="busskortnummer" placeholder="Busskortnummer" id="navn" valueLink={this.linkState('busskortnummer')} />
          </fieldset>
          <button className="btn">Send inn</button> <button className="btn" onClick={this.cancelForm}>Avbryt</button>
        </form>
      </div>
    );
  }
});

React.render(
  <App />,
  document.getElementById('app')
);