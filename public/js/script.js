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
      $scope.quotes.push(data.quote);
    })
    .error(function(error){
      console.log(error);
    });
    $scope.quote = '';
  }

  $scope.deleteQuote = function(index){
    $http.delete('http://localhost:3000/quotes/' + index)
    .success(function(data){
      $scope.quotes.splice(index, 1);
    })
    .error(function(error){
      console.log(error);
    });
    $scope.quote = '';
  }
});
