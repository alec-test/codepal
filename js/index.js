var config = {
    content: [{
        type: 'row',
      content:[{
        type: 'stack',
        width: 50,
        content:[{
              type: 'component',
              componentName: 'testComponent',
              title:'Component 1'
          }]
      },{
            type: 'column',
            content:[{
                type: 'component',
                componentName: 'youtube',
                title:'Youtube Player'
            },{
                type: 'component',
                componentName: 'testComponent',
                title:'Component 3'
            }]
        }]
    }]
};

var myLayout = new GoldenLayout( config );

myLayout.registerComponent( 'youtube', function(container, state){
  container.getElement().html('<iframe width="100%" height="100%" src="https://www.youtube.com/embed/videoseries?list=PLE7E8B7F4856C9B19" allowfullscreen=></iframe>');
});

myLayout.registerComponent( 'testComponent', function(){});

myLayout.init();

