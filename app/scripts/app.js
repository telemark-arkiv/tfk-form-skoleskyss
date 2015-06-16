'use strict';

var React = require('react/addons');
var StatusBar = require('../../elements/statusbar');
var StandardSelect = require('../../elements/standardselect');
var doSubmitForm = require('../../utils/submitform');
var showBoatOrFerry = require('../../utils/showBoatOrFerry');
var checkValidity = require('../../utils/checkValidity');
var parseSession = require('../../utils/parseSession');
var config = require('../../config');
var pkg = require('../../package.json');
var versionNumber = config.formId + '-' + pkg.version;

function getEmbedUrl(mapUrl){
  var startUrl = 'render.html?url=';
  return startUrl + mapUrl;
}

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

function showPageNumber(state, pageNumber){
  var className = 'hidden';
  if (state === pageNumber) {
    className = '';
  }
  return className;
}

function doNotshowPageNumber(state, pageNumber){
  var className = 'hidden';
  if (state !== pageNumber) {
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

function showAlternativAdresse(state){
  var className = 'hidden';
  if (state !== '') {
    className = '';
  }
  return className;
}

function showInnsendingAvDokumentasjon(adresse, sokegrunnlag){
  var className = 'hidden';
  if (adresse !== '' || sokegrunnlag === 'Annen årsak') {
    className = '';
  }
  return className;
}

function doNotshowInnsendingAvDokumentasjon(adresse, sokegrunnlag){
  var className = 'hidden';
  if (adresse === '' && (sokegrunnlag === 'Avstand til skole' || sokegrunnlag === 'Båt/ferge')) {
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

function showStudieretning(state){
  var className = 'hidden';
  if (state === '39182') {
    className = '';
  }
  if (state === '3724') {
    className = '';
  }
  return className;
}

function showIfEqual(state, value){
  var className = 'hidden';
  if (state === value) {
    className = '';
  }
  return className;
}

function showIfNotEqual(state, value){
  var className = 'hidden';
  if (state !== value) {
    className = '';
  }
  return className;
}

function isInvalid(fields, field) {
  var className = '';
  fields.forEach(function(fieldName) {
    if (fieldName === field) {
      className = 'invalid';
    }
  });
  return className;
}

var App = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return config.initialState;
  },
  componentDidUpdate: function(prevProps, prevState) {
    localStorage[versionNumber] = JSON.stringify(this.state);
  },
  componentDidMount: function() {
    var self = this;
    if (localStorage.getItem(versionNumber)) {
      this.setState(JSON.parse(localStorage.getItem(versionNumber)));
    }
    parseSession(window.location.href, function(error, session) {
      if (session) {
        self.setState(session);
      }
    });
  },
  cleanUp: function(){
    localStorage.clear();
    this.setState(config.initialState);
  },
  cancelForm: function(e){
    e.preventDefault();
    this.cleanUp();
  },
  increasePageNumber: function(e){
    e.preventDefault();
    this.setState({
      page: this.state.page + 1
    })
  },
  setupSchool: function(e){
    e.preventDefault();
    var validityCheck = checkValidity(this.state);
    this.setState({
      validityCheck: validityCheck
    });
    if (validityCheck.formIsValid) {
      if(this.state.skole !== '' && this.state.skole !== 'Skole utenfor Telemark') {
        var skole = config.skoleIndex[this.state.skole];
        this.setState(
          {
            skoleId: this.state.skole,
            skoleNavn: skole.name,
            skoleAdresse: skole.address,
            page: 2
          }
        )
      } else {
        this.setState(
          {
            skoleId: '',
            skoleNavn: '',
            skoleAdresse: '',
            page: 2
          }
        )
      }
    }
  },
  decreasePageNumber: function(e){
    e.preventDefault();
    this.setState({
      page: this.state.page - 1
    })
  },
  submitForm: function(e) {
    e.preventDefault();
    var timestamp = new Date().getTime();
    var self = this;
    var payload = this.state;
    payload.timestamp = timestamp;
    doSubmitForm(payload, function(err, data){
      if (err) {
        console.error(err);
      } else {
        self.cleanUp();
        self.setState({
          page: 4
        });
      }
    });
  },
  render: function(){
    return (
      <div>
        <h1>Skoleskyss</h1>
        <StatusBar status={this.state.page*25}/>
        <form onSubmit={this.submitForm}>
          <div className={showPageNumber(this.state.page, 1)}>
            <fieldset>
              <legend>Hjemstedsfylke</legend>
              <label htmlFor="isFromTelemark">Folkeregistrert fylke</label>
              <select name="isFromTelemark" id="isFromTelemark" valueLink={this.linkState('isFromTelemark')}>
                <option value="ja">Jeg har folkeregistrert adresse i Telemark</option>
                <option value="nei">Jeg har folkeregistrert adresse i et annet fylke</option>
              </select>
            </fieldset>
          </div>
          <div className={showIfEqual(this.state.isFromTelemark, 'ja')}>
          <div className={showPageNumber(this.state.page, 1)}>
          <fieldset>
            <legend>Personalia</legend>
            <div className={showIfEqual(this.state.gotSession, true)}>
              <span id="personnummerAuto">Fødselsnummer: {this.state.personnummer}</span>
            </div>
            <div className={showIfNotEqual(this.state.gotSession, true)}>
              <label htmlFor="personnummer">Fødselsnummer (11 siffer)</label>
              <input type="number" name="personnummer" placeholder="Fødselsnummer, 11 siffer (12345678987)" id="personnummer" className={isInvalid(this.state.validityCheck.invalidFields, 'personnummer')} valueLink={this.linkState('personnummer')} />
            </div>
            <label htmlFor="navn">Fullt navn</label>
            <input type="text" name="navn" placeholder="Fornavn, mellomnavn og etternavn" id="navn" className={isInvalid(this.state.validityCheck.invalidFields, 'navn')} valueLink={this.linkState('navn')} />
          </fieldset>
          <fieldset>
            <legend>Kontaktinformasjon</legend>
            <label htmlFor="epost">E-post</label>
            <input type="email" name="epost" placeholder="E-postadresse" id="epost" className={isInvalid(this.state.validityCheck.invalidFields, 'epost')} valueLink={this.linkState('epost')} />
            <label htmlFor="telefon">Telefon</label>
            <input type="number" name="telefon" placeholder="Mobilnummer/Telefonnummer" id="telefon" valueLink={this.linkState('telefon')} />
          </fieldset>
          <fieldset>
            <legend>Bosted</legend>
            <fieldset>
              <label htmlFor="alternativ_adresse">Hvor bor du i skoleperioden?</label>
              <select name="alternativAdresse" id="alternativAdresse" valueLink={this.linkState('alternativAdresse')}>
                <option value="">Jeg bor bare på folkeregistrert adresse</option>
                <option value="Hybel">Jeg bor på hybel eller studentbolig</option>
                <option value="Delt bosted">Jeg har delt bosted</option>
              </select>
            </fieldset>
            </fieldset>
            <fieldset>
            <label htmlFor="bosted">Folkeregistrert adresse</label>
            <select name="bosted" id="bosted" className={isInvalid(this.state.validityCheck.invalidFields, 'folkeregistrertAdresseBosted')} valueLink={this.linkState('folkeregistrertAdresseBosted')}>
              <option value="">Min adresse har</option>
              <option value="Gateadresse">Gateadresse</option>
              <option value="GnrBnr">Ikke gateadresse. Jeg må bruke gårds og bruksnummer</option>
            </select>
          </fieldset>
          <fieldset className={showGateadresse(this.state.folkeregistrertAdresseBosted)}>
            <label htmlFor="adresse">Adresse, postnummer og poststed</label>
            <input type="text" name="adresse" placeholder="Gateadresse, postnummer og poststed" id="adresse" className={isInvalid(this.state.validityCheck.invalidFields, 'folkeregistrertAdresseAdresse')} valueLink={this.linkState('folkeregistrertAdresseAdresse')} />
          </fieldset>
          <fieldset className={showGnrBnr(this.state.folkeregistrertAdresseBosted)}>
            <label htmlFor="gnr">Gårdsnummer</label>
            <input type="number" name="gnr" placeholder="Gårdsnummer" id="gnr" className={isInvalid(this.state.validityCheck.invalidFields, 'folkeregistrertAdresseGnr')} valueLink={this.linkState('folkeregistrertAdresseGnr')} />
            <label htmlFor="bnr">Bruksnummer</label>
            <input type="number" name="bnr" placeholder="Bruksnummer" id="bnr" className={isInvalid(this.state.validityCheck.invalidFields, 'folkeregistrertAdresseBnr')} valueLink={this.linkState('folkeregistrertAdresseBnr')} />
            <StandardSelect
              labelId="folkeregistrertAdresseKommunenr"
              labelName="Bostedskommune"
              values={config.kommuneListe}
              className={isInvalid(this.state.validityCheck.invalidFields, 'folkeregistrertAdresseKommunenr')}
              valueLink={this.linkState('folkeregistrertAdresseKommunenr')} />
          </fieldset>
          <fieldset className={showAlternativAdresse(this.state.alternativAdresse)}>
            <label htmlFor="alternativAdresseBosted">Annen bostedsadresse: {this.state.alternativAdresse}</label>
            <select name="alternativAdresseBosted" className={isInvalid(this.state.validityCheck.invalidFields, 'alternativAdresseBosted')} valueLink={this.linkState('alternativAdresseBosted')}>
              <option value="">Min adresse har</option>
              <option value="Gateadresse">Gateadresse</option>
              <option value="GnrBnr">Ikke gateadrese. Jeg må bruke gårds og bruksnummer</option>
            </select>
          </fieldset>
          <fieldset className={showGateadresse(this.state.alternativAdresseBosted)}>
            <label htmlFor="alternativAdresseAdresse">Adresse, postnummer og poststed</label>
            <input type="text" name="alternativAdresseAdresse" placeholder="Gateadresse, postnummer og poststed" id="alternativAdresseAdresse" className={isInvalid(this.state.validityCheck.invalidFields, 'alternativAdresseAdresse')} valueLink={this.linkState('alternativAdresseAdresse')} />
          </fieldset>
          <fieldset className={showGnrBnr(this.state.alternativAdresseBosted)}>
            <label htmlFor="alternativGnr">Gårdsnummer</label>
            <input type="number" name="alternativGnr" placeholder="Gårdsnummer" id="alternativGnr" className={isInvalid(this.state.validityCheck.invalidFields, 'alternativAdresseGnr')} valueLink={this.linkState('alternativAdresseGnr')} />
            <label htmlFor="alternativBnr">Bruksnummer</label>
            <input type="number" name="alternativBnr" placeholder="Bruksnummer" id="alternativBnr" className={isInvalid(this.state.validityCheck.invalidFields, 'alternativAdresseBnr')} valueLink={this.linkState('alternativAdresseBnr')} />
            <StandardSelect
              labelId="alternativAdresseKommunenr"
              labelName="Bostedskommune"
              values={config.kommuneListe}
              className={isInvalid(this.state.validityCheck.invalidFields, 'alternativAdresseKommunenr')}
              valueLink={this.linkState('alternativAdresseKommunenr')} />
          </fieldset>
          <fieldset>
            <legend>Skoleinformasjon</legend>
            <StandardSelect
              labelId="skole"
              labelName="Skole"
              values={config.skoleListe}
              required="required"
              className={isInvalid(this.state.validityCheck.invalidFields, 'skole')}
              valueLink={this.linkState('skole')} />
          </fieldset>
          <fieldset className={showStudieretning(this.state.skole)}>
            <label htmlFor="studieretning">Studieretning</label>
            <select name="studieretning" id="studieretning" valueLink={this.linkState('studieretning')}>
              <option value="">Jeg skal gå på</option>
              <option value="musikk, dans og drama"  className={showIfEqual(this.state.skole, '3724')}>musikk, dans og drama</option>
              <option value="teknisk allmennfaglig utdanning (4 år)" className={showIfEqual(this.state.skole, '39182')}>Teknikk og industriell produksjon YSK (TAF)</option>
              <option value="annen linje">annen linje</option>
            </select>
          </fieldset>
          <fieldset className={showEksternSkoleAdresse(this.state.skole)}>
            <label htmlFor="eksternSkoleNavn">Skolens navn</label>
            <input type="text" name="eksternSkoleNavn" placeholder="Navn på skolen" id="eksternSkoleNavn" className={isInvalid(this.state.validityCheck.invalidFields, 'eksternSkoleNavn')} valueLink={this.linkState('eksternSkoleNavn')} />
          </fieldset>
          <fieldset className={showEksternSkoleAdresse(this.state.skole)}>
            <label htmlFor="eksternSkoleAdresse">Skolens adresse</label>
            <input type="text" name="eksternSkoleAdresse" placeholder="Skolens besøksadresse" id="eksternSkoleAdresse" className={isInvalid(this.state.validityCheck.invalidFields, 'eksternSkoleAdresse')} valueLink={this.linkState('eksternSkoleAdresse')} />
          </fieldset>
          <fieldset>
            <label htmlFor="klassestrinn">Klassetrinn</label>
            <select name="klassetrinn" id="klassetrinn" className={isInvalid(this.state.validityCheck.invalidFields, 'klassetrinn')} valueLink={this.linkState('klassetrinn')}>
              <option value="">Velg klassetrinn</option>
              <option value="VG1">VG1</option>
              <option value="VG2">VG2</option>
              <option value="VG3">VG3</option>
              <option value="VG4">VG4</option>
            </select>
          </fieldset>
          <fieldset>
            <legend>Grunnlag for søknad</legend>
            <select name="sokegrunnlag" className={isInvalid(this.state.validityCheck.invalidFields, 'sokegrunnlag')} valueLink={this.linkState('sokegrunnlag')}>
              <option value="">Jeg søker skoleskyss på grunn av</option>
              <option value="Avstand til skole">Avstand til skole</option>
              <option value="Båt/ferge" className={showBoatOrFerry(this.state.folkeregistrertAdresseAdresse + ' ' + this.state.alternativAdresseAdresse)}>Må ta båt/ferge til skolen</option>
              <option value="Annen årsak">Annen årsak</option>
            </select>
          </fieldset>
          <fieldset className={showBusskortvalg(this.state.transporter)}>
            <legend>Busskort</legend>
            <select name="busskortstatus" className={isInvalid(this.state.validityCheck.invalidFields, 'busskortstatus')} valueLink={this.linkState('busskortstatus')}>
              <option value="">Velg busskort</option>
              <option value="Trenger nytt">Jeg har ikke hatt busskort tidligere</option>
              <option value="Mistet busskort">Jeg har har mistet busskortet</option>
              <option value="Har busskort">Jeg har busskort</option>
            </select>
          </fieldset>
          <fieldset className={showBusskortNummer(this.state.busskortstatus)}>
            <label htmlFor="busskortnummer">Busskortnummer</label>
            <input type="text" name="busskortnummer" placeholder="Busskortnummer" id="navn" valueLink={this.linkState('busskortnummer')} />
          </fieldset>
            <fieldset>
              <label>
                <input type="checkbox" checkedLink={this.linkState('termsAccepted')} className={isInvalid(this.state.validityCheck.invalidBooleans, 'termsAccepted')} /> Jeg har lest gjennom, og godtar <a href="terms.html" target="_blank">vilkårene</a> for skoleskyss.
              </label>
            </fieldset>
            </div>
          <div className={showPageNumber(this.state.page, 2)}>
            <h2>Tilleggsopplysninger</h2>
            <div className={showInnsendingAvDokumentasjon(this.state.alternativAdresse, this.state.sokegrunnlag)}>
              Ut i fra opplysningene du har gitt oss har vi behov for enkelte tilleggsopplysninger.<br/>
            </div>
            <div className={doNotshowInnsendingAvDokumentasjon(this.state.alternativAdresse, this.state.sokegrunnlag)}>
              Ut i fra opplysningene du har gitt oss har vi ikke behov for tilleggsopplysninger.<br/>
              Trykk "Neste" og se over opplysningene før du sender inn skjemaet.
            </div>

            <div className={showAlternativAdresse(this.state.alternativAdresse)}>
              <h3>Bosted</h3>
              Du har oppgitt annen adresse enn den som er registrert hos folkeregisteret.<br />
              Gyldig dokumentasjon på dette må sendes til oss via post.<br />
              Eksempler på gyldig dokumentasjon er for eksempel leiekontrakt på hybel.
            </div>
            <div className={showIfEqual(this.state.sokegrunnlag, 'Annen årsak')}>
              <h3>Søknadsgrunnlag</h3>
              Du har oppgitt annet søkegrunnlag enn avstand til skolen.<br />
              Annet søkegrunnlag vil si at du kan ha rett til skyss grunnet <br />
              funksjonshemming, midlertidig skade eller sykdom etter Opplæringsloven § 7-3.<br />
              Gyldig dokumentasjon er legeattest. Legeattesten skal ikke være eldre enn 1 år.<br />
            </div>
            <div className={showInnsendingAvDokumentasjon(this.state.alternativAdresse, this.state.sokegrunnlag)}>
              <h3>Innsending av dokumentasjon</h3>
              Din dokumentasjon må snarest sendes pr post til oss.<br />
              Telemark fylkeskommune<br/>
              Postboks 2844<br/>
              3702 Skien.<br />
              Legg ved ditt fulle navn og fødselsnummer (11 siffer).<br/>
              Merk konvolutten "Skoleskyss".
            </div>
          </div>
          <div className={showPageNumber(this.state.page, 3)}>
            <h2>Sammendrag</h2>
            Her er oversikt over opplysningene du sender oss.<br/>
            <h3>Personalia</h3>
            Navn: {this.state.navn}<br/>
            Fødselsnummer: {this.state.personnummer}
            <h3>Kontaktinformasjon</h3>
            E-post: {this.state.epost}<br/>
            Telefon: {this.state.telefon}
            <h3>Bosted</h3>
            <div className={showGateadresse(this.state.folkeregistrertAdresseBosted)}>
              Folkeregistrert adresse:<br/>
              {this.state.folkeregistrertAdresseAdresse}<br/>
            </div>
            <div className={showGnrBnr(this.state.folkeregistrertAdresseBosted)}>
              Folkeregistrert adresse:<br/>
              Gårdsnummer: {this.state.folkeregistrertAdresseGnr}, bruksnummer: {this.state.folkeregistrertAdresseBnr},
              kommunenummer: {this.state.folkeregistrertAdresseKommunenr}
            </div>
            <div className={showAlternativAdresse(this.state.alternativAdresse)}>
              <div className={showGateadresse(this.state.alternativAdresseBosted)}>
                Alternativ adresse:<br/>
                {this.state.alternativAdresseAdresse}<br/>
              </div>
              <div className={showGnrBnr(this.state.alternativAdresseBosted)}>
                Alternativ adresse:<br/>
                Gårdsnummer: {this.state.alternativAdresseGnr}, bruksnummer: {this.state.alternativAdresseBnr},
                kommunenummer: {this.state.alternativAdresseKommunenr}
              </div>
              <div>
                Alternativ adresse årsak: {this.state.alternativAdresse}
              </div>
            </div>
            <h3>Skole</h3>
            <div className={showIfNotEqual(this.state.skoleNavn, '')}>
              Skole: {this.state.skoleNavn}<br/>
            </div>
            <div className={showIfNotEqual(this.state.eksternSkoleNavn, '')}>
              Skole: {this.state.eksternSkoleNavn}<br/>
            </div>
            <div className={showIfNotEqual(this.state.studieretning, '')}>
              Studieretning: {this.state.studieretning}<br/>
            </div>
            Klassetrinn: {this.state.klassetrinn}
            <h3>Busskort</h3>
            Status: {this.state.busskortstatus}<br/>
            <div className={showBusskortNummer(this.state.busskortstatus)}>
              Busskortnummer: {this.state.busskortnummer}
            </div>
            <h2>Automatiske beregninger</h2>
            Vi vil gjøre noen automatiske beregninger utfra dine opplysninger.<br/>
            Disse tar vi med oss i den videre saksbehandlingen.<br/>
            Du vil få tilsendt beregningsgrunnlaget vårt sammen med avgjørelsen.<br/>
          </div>
          <div className={showPageNumber(this.state.page, 4)}>
            <h2>Skjemaet er innsendt</h2>
            Takk for søknad om fri skoleskyss.<br/>
            Du vil snart motta kvittering og svar på din søknad  i din meldingsboks i Altinn.<br/>
            Har du ikke mottatt kvittering og svar innen 48 timer, kontakt oss på <a href="mailto:skoleskyss@t-fk.no">skoleskyss@t-fk.no</a> eller telefon 35 91 70 00.<br/>
            <h2>Hjelp oss å bli bedre</h2>
            Vi vil gjerne ha innspill til hvordan vi kan bli bedre.<br/>
            Det hadde vært fint om du tok deg tid til å svare på en kort undersøkelse.<br/>
            Den tar under 1 minutt :-)<br/>
            <a href="https://response.questback.com/telemarkfylkeskommune/l4asakv1wk/" target="_blank">Ta undersøkelsen</a>
          </div>
          <div className={showIfEqual(this.state.validityCheck.showFormErrorMessage, true)}>
            <div className="color--danger formErrorMessage">
              {this.state.validityCheck.formErrorMessage}
            </div>
          </div>
          <span className={showPageNumber(this.state.page, 2)}>
            <button className="btn" onClick={this.decreasePageNumber}><span className="icon icon-chevron-left"></span>&nbsp;&nbsp;&nbsp;&nbsp;Tilbake</button>&nbsp;
          </span>
          <span className={showPageNumber(this.state.page, 3)}>
            <button className="btn" onClick={this.decreasePageNumber}><span className="icon icon-chevron-left"></span>&nbsp;&nbsp;&nbsp;&nbsp;Tilbake</button>&nbsp;
          </span>
          <span className={doNotshowPageNumber(this.state.page, 4)}>
            <button className="btn" onClick={this.cancelForm}>Avbryt&nbsp;&nbsp;&nbsp;&nbsp;<span className="icon icon-close"></span></button>&nbsp;
          </span>
          <span className={showPageNumber(this.state.page, 4)}>
            <button className="btn" onClick={this.cancelForm}>Avslutt&nbsp;&nbsp;&nbsp;&nbsp;<span className="icon icon-close"></span></button>&nbsp;
          </span>
          <span  className={showPageNumber(this.state.page, 3)}>
            <button className="btn">Send inn&nbsp;&nbsp;&nbsp;&nbsp;<span className="icon icon-tick"></span></button>&nbsp;
          </span>
          <span className={showPageNumber(this.state.page, 1)}>
            <button type="submit" className="btn buttonNext" onClick={this.setupSchool}>Neste&nbsp;&nbsp;&nbsp;&nbsp;<span className="icon icon-chevron-right"></span></button>&nbsp;
          </span>
          <span className={showPageNumber(this.state.page, 2)}>
            <button className="btn" onClick={this.increasePageNumber}>Neste&nbsp;&nbsp;&nbsp;&nbsp;<span className="icon icon-chevron-right"></span></button>&nbsp;
          </span>
            </div>
          <div className={showIfEqual(this.state.isFromTelemark, 'nei')}>
            <h2>Beklager!</h2>
            Du kan ikke søke skoleskyss gjennom Telemark fylkeskommune.<br/>
            Det er fordi du har folkeregistrert adresse utenfor Telemark.<br/>
            Ta kontakt med fylkeskommunen i ditt hjemfylke.<br/>
            <button className="btn" onClick={this.cancelForm}>Avslutt&nbsp;&nbsp;&nbsp;&nbsp;<span className="icon icon-close"></span></button>&nbsp;
          </div>
        </form>
      </div>
    );
  }
});

React.render(
  <App />,
  document.getElementById('app')
);