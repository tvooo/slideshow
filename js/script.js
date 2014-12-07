var slideshowApp = angular.module('slideshowApp', ['slideshowDirectives', 'omr.angularFileDnD', 'LocalStorageModule']);

slideshowApp.controller('SlideshowCtrl', function ($scope, $http, localStorageService) {

  var reset = function() {
    $scope.activeSlide = 0;
    $scope.progress = "0%";
    $scope.slides = [];
  };

  $scope.decksOpen = false;

  var decks = localStorageService.get('decks');
  $scope.decks = decks || [];
  $scope.markdown = "";
  reset();

  $scope.$on('file-dropzone-drop-event', function( event, file ) {
    console.log("dropppppped");
    reset();
    $scope.slides = file.file.split("\n---\n");
    var md = $('<div>').html(marked(file.file, {smartypants: true}));
    var title = $('h1', md).first().text();

    var deck = {
      title: title || file.name,
      markdown: file.file,
      filename: file.name,
      firstSlide: $scope.slides[0]
    };
    $scope.decks.push(deck);
    localStorageService.set('decks', $scope.decks);
    $scope.$apply();
  });

  //$scope.slides = $scope.markdown.split("\n---\n");

  $scope.keyPress = function( event ) {
    /*
    left arrow  37
    up arrow  38
    right arrow   39
    down arrow  40
    */
    console.log( event.keyCode );
    if ( 40 === event.keyCode ) {
      $scope.nextSlide();
    } else if ( 39 === event.keyCode ) {
      $scope.nextSlide();
    } else if ( 38 === event.keyCode ) {
      $scope.prevSlide();
    } else if ( 37 === event.keyCode ) {
      $scope.prevSlide();
    } else if (83 === event.keyCode ) { // [s]lides

    } else if (78 === event.keyCode) { // [n]new
      reset();
    } else if (68 === event.keyCode) { // [d]ecks
      $scope.decksOpen = !$scope.decksOpen;
    } else if (70 === event.keyCode) {
      toggleFullScreen();
    }
  };


  $scope.nextSlide = function() {
    if ( $scope.activeSlide + 1 < $scope.slides.length ) {
      $scope.activeSlide++;
    }
    $scope.progress = (100 * $scope.activeSlide / ($scope.slides.length-1)) + "%";
    console.log($scope.progress);
  };

  $scope.prevSlide = function() {
    if ( $scope.activeSlide > 0 ) {
      $scope.activeSlide--;
    }
    $scope.progress = (100 * $scope.activeSlide / ($scope.slides.length-1)) + "%";
  }

  $scope.clearAll = localStorageService.clearAll;

  $scope.loadDeck = function( deck ) {
    reset();
    $scope.slides = deck.markdown.split("\n---\n");
    $scope.decksOpen = false;
  };

  $scope.removeDeck = function( deckNumber ) {
    $scope.decks.splice( deckNumber, 1 );
    localStorageService.set('decks', $scope.decks);
  };

  function toggleFullScreen() {
    if ( document.fullScreen ) {
      document.cancelFullScreen();
    } else {
      $('body').get(0).mozRequestFullScreen();
    }

  }
});
