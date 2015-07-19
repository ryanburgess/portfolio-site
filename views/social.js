var React = require('react');

var Social = React.createClass({
  render: function() {
    var social = this.props.social;
    return (
      <ul className='social'>
        {social.map(function(social, i) {
          return (
            <li>
              <a href={social.url} className={social.class}>{social.title}</a>
            </li>
          );
        })}
      </ul>
    );
  }
});

module.exports = Social;