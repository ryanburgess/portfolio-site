var React = require('react');

var DefaultLayout = React.createClass({
  render: function() {
    return (
      <html lang="en">
        <head>
          <title>{this.props.title}</title>
          <meta name="description" content="{this.props.description}"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes"/>
          <link rel="stylesheet" href="/css/style.css"/>
        </head>
        <body>
          {this.props.children}
        </body>
      </html>
    );
  }
});

module.exports = DefaultLayout;