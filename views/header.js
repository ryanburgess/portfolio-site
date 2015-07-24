var React = require('react');

var DefaultHeader = React.createClass({
  render: function() {
    return (
      <header className='row'>
        <a href='/'>
          <h1>{this.props.title}</h1>
          <span className='image'></span>
        </a>
      </header>
    );
  }
});

module.exports = DefaultHeader;