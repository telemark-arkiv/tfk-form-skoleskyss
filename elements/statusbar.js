'use strict';

var React = require('react');

var statusbar = React.createClass({

  render: function() {

    var status = this.props.status;

    if (status < 0) {status = 0};
    if (status > 100) {status = 100};

    var style = {
      backgroundColor: this.props.color || 'rgb(106,196,174)',
      width: status + '%',
      transition: "width 200ms",
      height: '1em',
      float: 'left',
      clear: 'both',
      'borderRight': '1px solid black'
    };

    var styleElements = {
      width: '25%',
      float: 'left',
      'borderRight': '1px solid black',
      'paddingLeft': '10px'
    };

    return (
      <div className="statusbar-container">
        <div style={styleElements}>1. Skjema</div>
        <div style={styleElements}>2. Tillegg</div>
        <div style={styleElements}>3. Se over</div>
        <div style={styleElements}>4. Ferdig</div>
        <div className="statusbar-status" style={style}></div>
      </div>
    );
  }
});

module.exports = statusbar;