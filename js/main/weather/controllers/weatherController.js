/**
 * @file Handles Weather based activities
 * @author Cameron Kilgore
 */

nocDashboard.controller("weatherController", function($scope, weatherFactory) {
  $scope.pageInit = function() {
    $scope.location_details = {
      city: "Roswell",
      state: "GA",
    };

    $scope.nws_zone_code = "NCC101";

    //Stub out objects
    $scope.weather = {}; //Manipulated through Wunderground calls
    $scope.alerts = {};
    $scope.conditions = {};
    $scope.forecast = {};

    //TODO Get NWS Alerts (build a proxy for the Atom feed)
    //$scope.alerts = $scope.getNWSAlerts("NCZ106");

    //Get Wunderground Alerts
    $scope.getWUAlerts("WU_API_KEY", $scope.location_details.city, $scope.location_details.state);

    //Get Radar Image
    $scope.weather.radarImage = $scope.getRadarImage("WU_API_KEY", $scope.location_details.city, $scope.location_details.state);

    //Get Current Conditions Data
    $scope.getConditionsInfo("WU_API_KEY", $scope.location_details.city, $scope.location_details.state);
    
    //Get Forecast Data
    $scope.getForecastInfo("WU_API_KEY", $scope.location_details.city, $scope.location_details.state);
  };

  $scope.getRadarImage = function(WUAPIKey, City, State) {
    return weatherFactory.getWundergroundAnimatedRadarData(WUAPIKey, City, State, "http://api.wunderground.com/api/", 15, 800, 480);
  };

  $scope.getNWSAlerts = function(ZoneCode) {
    $scope.alerts = weatherFactory.getNWSWeatherAlerts(ZoneCode);

    console.debug("Alerts Call Made", $scope.alerts);
  };

  $scope.getWUAlerts = function(WUAPIKey, City, State) {
    $scope.alerts = weatherFactory.getWUAPIWeatherAlerts(WUAPIKey, City, State);

    console.debug("Alerts Call Made", $scope.alerts);
  };

  $scope.getConditionsInfo = function(WUAPIKey, City, State) {
    $scope.weather.conditions = weatherFactory.getWundergroundConditionData(WUAPIKey, City, State);
    
    console.debug("Conditions Call Made", $scope.weather.conditions);
  };

  $scope.getForecastInfo = function(WUAPIKey, City, State) {
    $scope.weather.forecast = weatherFactory.getWundergroundForecastData(WUAPIKey, City, State);
    
    console.debug("Forecast Call Made", $scope.weather.conditions)    
  };
});
