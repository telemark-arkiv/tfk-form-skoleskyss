'use strict';

var React = require('react/addons');
var doSubmitForm = require('../../utils/submitform');
var config = require('../../config');
var pkg = require('../../package.json');
var versionNumber = config.formId + '-' + pkg.version;

function showTransportform(state){
  var className = 'hidden';
  if(state !== ''){
    className = '';
  }
  return className;
}

function showTransportselskap(state){
  var className = 'hidden';
  if(state === 'Buss'){
    className = '';
  }
  return className;
}

function showBusskortvalg(state){
  console.log(state);
  var className = 'hidden';
  if(state !== 'Telemark Bilruter/Telemarksekspressen/Haukeliekspressen' && state !== ''){
    className = '';
  }
  return className;
}

function showBusskortNummer(state){
  var className = 'hidden';
  if(state === 'Har busskort'){
    className = '';
  }
  return className;
}

function toogleOn(e){
  e.preventDefault();
  console.log(e.value);
  console.log(e.target.value);
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
      telefon: this.state.telefon,
      skole: this.state.skole,
      klassetrinn: this.state.klassetrinn,
      transportform: this.state.transportform,
      transporter: this.state.transporter,
      busskortstatus: this.state.busskortstatus,
      busskortnummer: this.state.busskortnummer,
      holdeplassHjem: this.state.holdeplassHjem,
      holdeplassSkole: this.state.holdeplassSkole,
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
          <label htmlFor="personnummer">Personnummer (11 siffer)</label>
          <input type="text" name="personnummer" placeholder="18119169298" id="personnummer" valueLink={this.linkState('personnummer')} />
            <label htmlFor="navn">Navn</label>
            <input type="text" name="navn" placeholder="Fornavn, mellomnavn og etternavn" id="navn" valueLink={this.linkState('navn')} />
            <label htmlFor="adresse">Adresse</label>
            <input type="text" name="adresse" placeholder="Gateadresse, postnummer og poststed" id="adresse" valueLink={this.linkState('adresse')} />
            <label htmlFor="telefon">Telefon</label>
            <input type="text" name="telefon" placeholder="Mobilnummer/Telefonnummer" id="telefon" valueLink={this.linkState('telefon')} />
          </fieldset>
          <fieldset>
            <legend>Skole</legend>
            <select name="skole" valueLink={this.linkState('skole')}>
              <option value="">Velg skole</option>
              <option value="Eksamenskarakter skriftlig">Eksamenskarakter skriftlig</option>
              <option value="Muntlig eksamen">Muntlig eksamen</option>
              <option value="Standpunktkarakter">Standpunktkarakter</option>
              <option value="Karakter ved lokalgitt eksamen">Karakter ved lokalgitt eksamen</option>
            </select>
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
          <fieldset className={showTransportform(this.state.klassetrinn)}>
            <legend>Transportform</legend>
            <select name="transportform" valueLink={this.linkState('transportform')}>
              <option value="">Velg transportform</option>
              <option value="Buss">Buss</option>
              <option value="Buss/ferge">Buss/ferge</option>
              <option value="Buss/tog">Buss/tog</option>
              <option value="Transport ut av fylket">Tranport ut av fylket</option>
            </select>
          </fieldset>
          <fieldset className={showTransportselskap(this.state.transportform)}>
            <legend>Transportør</legend>
            <select name="transporter" valueLink={this.linkState('transporter')}>
              <option value="">Velg transportør</option>
              <option value="Telemark Bilruter/Telemarksekspressen/Haukeliekspressen">Telemark Bilruter/Telemarksekspressen/Haukeliekspressen</option>
              <option value="Nettbuss/Drangedal Bilruter/Tinn Billag (inkl. Rjukanekspressen)">Nettbuss/Drangedal Bilruter/Tinn Billag (inkl. Rjukanekspressen)</option>
              <option value="Begge">Begge</option>
            </select>
          </fieldset>

          <fieldset className={showBusskortvalg(this.state.transporter)}>
            <legend>Busskort</legend>
            <select name="busskortstatus" valueLink={this.linkState('busskortstatus')}>
              <option value="">Velg busskort</option>
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