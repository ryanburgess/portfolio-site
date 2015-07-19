exports.index = function(req, res){
  res.render('index', { 
    title: 'Ryan Burgess',
    description: 'Ryan Burgess is a Manager, UI Engineering at Netflix in California.',
    about: ['Ryan Burgess is a Manager, UI Engineering at Netflix in California. Throughout his years of experience he has obtained a great deal of knowledge working for internal and external clients delivering web and mobile applications. He has a extensive experience working with HTML5, CSS3, SASS, LESS, Responsive Design, JQuery, JavaScript, AngularJS, BackboneJS, NodeJS, Mobile, PHP, MySQL, ActionScript 3 and the Adobe Creative Suite.'],
    social:[
      {
        'title': 'Github',
        'url': 'https://github.com/ryanburgess',
        'class': 'github'
      },
      {
        'title': 'Twitter',
        'url': 'https://twitter.com/burgessdryan',
        'class': 'twitter'
      },
      {
        'title': 'LinkedIn',
        'url': 'https://www.linkedin.com/in/ryanburgess',
        'class': 'linkedin'
      }
    ]
  });
};