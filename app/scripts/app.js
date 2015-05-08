'use strict';

var React = require('react/addons');
var StatusBar = require('../../elements/statusbar');
var StandardSelect = require('../../elements/standardselect');
var doSubmitForm = require('../../utils/submitform');
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
  if (state === 'Porsgrunn videregående skole, Kjølnes Ring 20, 3918 Porsgrunn') {
    className = '';
  }
  if (state === 'Skien videregående skole, Einar Østvedts gate 12, 3724 Skien') {
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

var App = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return config.initialState;
  },
  componentDidUpdate: function(prevProps, prevState) {
    localStorage[versionNumber] = JSON.stringify(this.state);
  },
  componentDidMount: function() {
    this.setState({
      formId: config.formId,
      formVersion: pkg.version
    });

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
  increasePageNumber: function(e){
    e.preventDefault();
    this.setState({
      page: this.state.page + 1
    })
  },
  decreasePageNumber: function(e){
    e.preventDefault();
    this.setState({
      page: this.state.page - 1
    })
  },
  submitForm: function(e) {
    e.preventDefault();
    var self = this;
    var payload = this.state;
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
            <legend>Personalia</legend>
            <label htmlFor="personnummer">Fødselsnummer (11 siffer)</label>
            <input type="number" name="personnummer" placeholder="Fødselsnummer, 11 siffer" id="personnummer" required="required" valueLink={this.linkState('personnummer')} />
            <label htmlFor="navn">Navn</label>
            <input type="text" name="navn" placeholder="Fornavn, mellomnavn og etternavn" id="navn" required="required" valueLink={this.linkState('navn')} />
          </fieldset>
          <fieldset>
            <legend>Kontaktinformasjon</legend>
            <label htmlFor="epost">E-post</label>
            <input type="email" name="epost" placeholder="E-postadresse" id="epost" valueLink={this.linkState('epost')} />
            <label htmlFor="telefon">Telefon</label>
            <input type="number" name="telefon" placeholder="Mobilnummer/Telefonnummer" id="telefon" valueLink={this.linkState('telefon')} />
          </fieldset>
          <fieldset>
            <legend>Bosted</legend>
            <label htmlFor="bosted">Folkeregistrert adresse</label>
            <select name="bosted" id="bosted" required="required" valueLink={this.linkState('folkeregistrert_adresse_bosted')}>
              <option value="">Min adresse har</option>
              <option value="Gateadresse">Gateadresse</option>
              <option value="GnrBnr">Ikke gateadresse. Jeg må bruke gårds og bruksnummer</option>
            </select>
          </fieldset>
          <fieldset className={showGateadresse(this.state.folkeregistrert_adresse_bosted)}>
            <label htmlFor="adresse">Adresse</label>
            <input type="text" name="adresse" placeholder="Gateadresse, postnummer og poststed" id="adresse" valueLink={this.linkState('folkeregistrert_adresse_adresse')} />
          </fieldset>
          <fieldset className={showGnrBnr(this.state.folkeregistrert_adresse_bosted)}>
            <label htmlFor="gnr">Gårdsnummer</label>
            <input type="number" name="gnr" placeholder="Gårdsnummer" id="gnr" valueLink={this.linkState('folkeregistrert_adresse_gnr')} />
            <label htmlFor="bnr">Bruksnummer</label>
            <input type="number" name="bnr" placeholder="Bruksnummer" id="bnr" valueLink={this.linkState('folkeregistrert_adresse_bnr')} />
            <StandardSelect
              labelId="folkeregistrert_adresse_kommunenr"
              labelName="Bostedskommune"
              values={config.kommuneListe}
              valueLink={this.linkState('folkeregistrert_adresse_kommunenr')} />
          </fieldset>
          <fieldset>
            <label htmlFor="alternativ_adresse">Annen adresse</label>
            <select name="alternativ_adresse" id="alternativ_adresse" valueLink={this.linkState('alternativ_adresse')}>
              <option value="">Jeg bor også et annet sted</option>
              <option value="Hybel">Jeg bor på hybel</option>
              <option value="Delt omsorg">Mine foresatte har delt omsorg</option>
              <option value="Feil folkeregistrert adresse">Folkeregistrert adresse er feil</option>
            </select>
          </fieldset>
          <fieldset className={showAlternativAdresse(this.state.alternativ_adresse)}>
            <label htmlFor="alternativ_adresse_bosted">Alternativ adresse: {this.state.alternativ_adresse}</label>
            <select name="alternativ_adresse_bosted" valueLink={this.linkState('alternativ_adresse_bosted')}>
              <option value="">Min adresse har</option>
              <option value="Gateadresse">Gateadresse</option>
              <option value="GnrBnr">Ikke gateadrese. Jeg må bruke gårds og bruksnummer</option>
            </select>
          </fieldset>
          <fieldset className={showGateadresse(this.state.alternativ_adresse_bosted)}>
            <label htmlFor="alternativ_adresse_adresse">Adresse</label>
            <input type="text" name="alternativ_adresse_adresse" placeholder="Gateadresse, postnummer og poststed" id="alternativ_adresse_adresse" valueLink={this.linkState('alternativ_adresse_adresse')} />
          </fieldset>
          <fieldset className={showGnrBnr(this.state.alternativ_adresse_bosted)}>
            <label htmlFor="alternativ_gnr">Gårdsnummer</label>
            <input type="number" name="alternativ_gnr" placeholder="Gårdsnummer" id="alternativ_gnr" valueLink={this.linkState('alternativ_adresse_gnr')} />
            <label htmlFor="alternativ_bnr">Bruksnummer</label>
            <input type="number" name="alternativ_bnr" placeholder="Bruksnummer" id="alternativ_bnr" valueLink={this.linkState('alternativ_adresse_bnr')} />
            <StandardSelect
              labelId="alternativ_adresse_kommunenr"
              labelName="Bostedskommune"
              values={config.kommuneListe}
              valueLink={this.linkState('alternativ_adresse_kommunenr')} />
          </fieldset>
          <fieldset>
            <legend>Skoleinformasjon</legend>
            <StandardSelect
              labelId="skole"
              labelName="Skole"
              values={config.skoleListe}
              required="required"
              valueLink={this.linkState('skole')} />
          </fieldset>
          <fieldset className={showStudieretning(this.state.skole)}>
            <label htmlFor="studieretning">Studieretning</label>
            <select name="studieretning" id="studieretning" valueLink={this.linkState('studieretning')}>
              <option value="">Jeg skal gå på</option>
              <option value="musikk, dans og drama">musikk, dans og drama</option>
              <option value="teknisk allmennfaglig utdanning (4 år)">Teknikk og industriell produksjon YSK (TAF)</option>
              <option value="annen linje">annen linje</option>
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
            <label htmlFor="klassestrinn">Klassetrinn</label>
            <select name="klassetrinn" id="klassetrinn" required="required" valueLink={this.linkState('klassetrinn')}>
              <option value="">Velg klassetrinn</option>
              <option value="VG1">VG1</option>
              <option value="VG2">VG2</option>
              <option value="VG3">VG3</option>
              <option value="VG4">VG4</option>
            </select>
          </fieldset>
          <fieldset>
            <legend>Grunnlag for søknad</legend>
            <select name="sokegrunnlag" required="required" valueLink={this.linkState('sokegrunnlag')}>
              <option value="">Jeg søker skoleskyss på grunn av</option>
              <option value="Avstand til skole">Avstand til skole</option>
              <option value="Båt/ferge">Må ta båt/ferge til skolen</option>
              <option value="Annen årsak">Annen årsak</option>
            </select>
          </fieldset>
          <fieldset className={showBusskortvalg(this.state.transporter)}>
            <legend>Busskort</legend>
            <select name="busskortstatus" required="required" valueLink={this.linkState('busskortstatus')}>
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
            </div>
          <div className={showPageNumber(this.state.page, 2)}>
            <h2>Tilleggsopplysninger</h2>
            <div className={showInnsendingAvDokumentasjon(this.state.alternativ_adresse, this.state.sokegrunnlag)}>
              Ut i fra opplysningene du har gitt oss har vi behov for enkelte tilleggsopplysninger.<br/>
            </div>
            <div className={doNotshowInnsendingAvDokumentasjon(this.state.alternativ_adresse, this.state.sokegrunnlag)}>
              Ut i fra opplysningene du har gitt oss har vi ikke behov for tilleggsopplysninger.<br/>
              Trykk "Neste" og se over opplysningene før du sender inn skjemaet.
            </div>

            <div className={showAlternativAdresse(this.state.alternativ_adresse)}>
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
              Gyldig dokumentasjon er legeerklæring.<br />
            </div>
            <div className={showInnsendingAvDokumentasjon(this.state.alternativ_adresse, this.state.sokegrunnlag)}>
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
            <div className={showGateadresse(this.state.folkeregistrert_adresse_bosted)}>
              Folkeregistrert adresse:<br/>
              {this.state.folkeregistrert_adresse_adresse}
            </div>
            <div className={showGnrBnr(this.state.folkeregistrert_adresse_bosted)}>
              Folkeregistrert adresse:<br/>
              Gårdsnummer: {this.state.folkeregistrert_adresse_gnr}, bruksnummer: {this.state.folkeregistrert_adresse_bnr},
              kommunenummer: {this.state.folkeregistrert_adresse_kommunenr}
            </div>
            <div className={showAlternativAdresse(this.state.alternativ_adresse)}>
              <div className={showGateadresse(this.state.alternativ_adresse_bosted)}>
                Alternativ adresse:<br/>
                {this.state.alternativ_adresse_adresse}<br/>
              </div>
              <div className={showGnrBnr(this.state.alternativ_adresse_bosted)}>
                Alternativ adresse:<br/>
                Gårdsnummer: {this.state.alternativ_adresse_gnr}, bruksnummer: {this.state.alternativ_adresse_bnr},
                kommunenummer: {this.state.alternativ_adresse_kommunenr}
              </div>
              <div>
                Alternativ adresse årsak: {this.state.alternativ_adresse}
              </div>
            </div>
            <h3>Skole</h3>
            Skole: {this.state.skole}<br/>
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
            Skjemaet er nå sendt inn til oss.<br/>
            Du vil snart motta kvittering via Svar ut.<br/>
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
            <button className="btn" onClick={this.increasePageNumber}>Neste&nbsp;&nbsp;&nbsp;&nbsp;<span className="icon icon-chevron-right"></span></button>&nbsp;
          </span>
          <span className={showPageNumber(this.state.page, 2)}>
            <button className="btn" onClick={this.increasePageNumber}>Neste&nbsp;&nbsp;&nbsp;&nbsp;<span className="icon icon-chevron-right"></span></button>&nbsp;
          </span>
        </form>
      </div>
    );
  }
});

React.render(
  <App />,
  document.getElementById('app')
);