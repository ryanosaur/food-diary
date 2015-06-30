angular.module('quotes', [])

.controller('QuoteCtrl', function($scope, $http){
  $scope.quotes = [];

  $http.get('http://localhost:3000/quotes')
  .success(function(data){
    $scope.quotes = data.quotes;
    console.log(data);
  })
  .error(function(error){
    console.log(error);
  });

  $scope.postQuote = function(){
    $http.post('http://localhost:3000/quotes', {quote: $scope.quote})
    .success(function(data){
      $scope.quotes = data.quotes;
    })
    .error(function(error){
      console.log(error)
    });
    $scope.quote = '';
  }
});
