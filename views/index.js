var React = require('react');
var DefaultHeader = require('./header');
var Social = require('./social');
var DefaultLayout = require('./default');

var about = React.createClass({
  render: function() {

    return (
      <DefaultLayout title={this.props.title} description={this.props.description}>
        <DefaultHeader title={this.props.title}>
        </DefaultHeader>
        <div className='container row'>
          <div className='content'>
            <h2>About</h2>
            <Social social={this.props.social}></Social>
            {this.props.about.map(function(about, i) {
              return (
                <p>
                  {about}
                </p>
              );
            })}
          </div>
        </div>
      </DefaultLayout>
    );
  }
});

module.exports = about;