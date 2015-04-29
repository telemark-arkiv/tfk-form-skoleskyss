'use strict';

var React = require('react');

var StandardSelect = React.createClass({
  render: function(){
    return (
      <div>
        <label htmlFor={this.props.labelId}>{this.props.labelName}</label>
        <select name={this.props.labelId} id={this.props.labelId} valueLink={this.props.valueLink}>
          {this.props.values.map(function(item){
            return <option value={item.value} key={item.id} >{item.text}</option>;
          })}
        </select>
      </div>
    )
  }
});

module.exports = StandardSelect;