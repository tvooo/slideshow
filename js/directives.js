var slideshowDirectives = angular.module('slideshowDirectives', []);

slideshowDirectives.directive('markdown', function($compile) {
  return {
    scope: {
      data: '=data',
    },
    link: function ( scope, element, attrs ) {
      var el;
      scope.$watch('data', function( data ) {
        console.log("changed2");
        if ( angular.isDefined( data ) ) {
          el = marked( scope.data, {smartypants: true} );
          // stupid way of emptying the element
          element.html( el );
        }
      });
      /*attrs.$observe( 'data', function ( data ) {
        console.log("changed");
        if ( angular.isDefined( data ) ) {
          el = marked( scope.data, {smartypants: true} );
          // stupid way of emptying the element
          element.html( el );
        }
      });*/
    }
  };
});
