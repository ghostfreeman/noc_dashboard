/**
 * @file Services for the Weather pages
 * @author Cameron Kilgore
 */

/**
 * Provides Weather Underground and NWS Alerts API Integration, through Wunderground
 * and NWS JSON and XML feeds.
 *
 * @type {Object}
 */
nocDashboard.factory('weatherFactory', function($http, $q) {
  var service = {};

  /**
   * Makes an HTTP GET request to the CAP Atom feed, and returns an array of all
   * serialized CAP records referenced in the Atom feed. The execution time on
   * this component is n*n+1.
   * @return {[type]} [description]
   */
  service.getCAPRecords = function(CAPFeedUrl, MaxNumberOfEntries) {
    if(MaxNumberOfEntries === undefined) {
      MaxNumberOfEntries = 20;
    }

    if(CAPFeedUrl === undefined || CAPFeedUrl === null) {
      return false;
    }

    //Make the first XMLHTTPRequest call for the Atom feed
    $http.get(CAPFeedUrl).then(function(SuccessResponse) {
      var x2js = new X2JS();
      AtomFeed = x2js.xml_str2json(SuccessResponse);
      console.debug("Atom Feed Data", AtomFeed);

      //TODO Foreach through all Item calls to get their CAP records
      //angular.foreach()
    }, function(ErrorResponse) {
      console.debug("Error", ErrorResponse);
    });
  };

  /**
   * Returns an Animated Radar image. Use the getWundergroundRadarData call for
   * a static image.
   *
   * The Call will return a valid Image URL for a GIF, representing data to
   * request from Weather Underground.
   *
   * The example API Call is an image URL: http://api.wunderground.com/api/{{API_KEY}}/animatedradar/q/GA/Roswell.gif?width=800&height=600&timelabel=1&timelabel.y=10&num=15&rainsnow=1&delay=75&noclutter=1&smooth=1&newmaps=1
   * @param  {string} WUAPIKey        Weather Underground API Key. Required.
   * @param  {string} City            A Valid US City that can be used for the location. If requesting internationally, use the OASIS xNAL equivalent locality name (full name). Require.
   * @param  {string} State           A Valid US Postal code for a state or thoroughfare. If requesting interantionally, use the OASIS xNAL equivalent country (full name). Required.
   * @param  {string} RadarFeedURL    Origin Radar Feed URL. Defaults to known base if not defined.
   * @param  {number} Frames          Number of frames to use. Integer only. Defaults to 15.
   * @param  {number} Width           Integer number representing width in pixels. Defaults to 640.
   * @param  {number} Height          Integer number representing height in pixels. Defaults to 480.
   * @param  {boolean} Smooth         Smooth the color display on the image. Defaults to true.
   * @param  {boolean} TimeLabel      Display the time label. Defaults to true.
   * @param  {number} Delay           Render delay between animation frames in milliseconds. Defaults to 75 (what WSI Terminals use). Cannot be set lower than 25, or higher than 100.
   * @param  {boolean} RainSnow       Enables color change between Rain and Snow/Mix. Defaults to true.
   * @param  {boolean} MakeTrans      Removes the background map (with city/state/counties/administrative areas). Defaults to false.
   * @return {string}                 Image URL that represents a radar image GIF from Weather Underground
   */
  service.getWundergroundAnimatedRadarData = function(WUAPIKey, City, State, RadarFeedURL, Frames, Width, Height, Smooth, TimeLabel, Delay, RainSnow, MakeTrans) {
    //Validation
    if(typeof WUAPIKey !== "string") {
      return false;
    }

    if(typeof RadarFeedURL !== "string") {
      RadarFeedURL = "http://api.wunderground.com/api/";
    }

    if(typeof City !== "string") {
      return false;
    }

    if(typeof State !== "string") {
      return false;
    }

    if(typeof Frames !== "number") {
      Frames = 15;
    }

    if(typeof Width !== "number") {
      Width = 640;
    }

    if(typeof Height !== "number") {
      Height = 480;
    }

    if(typeof Smooth !== "boolean") {
      Smooth = true;
    }

    if(typeof TimeLabel !== "boolean") {
      TimeLabel = true;
    }

    if(typeof Delay !== "number") {
      if(Delay < 25 && Delay > 100) {
        Delay = 75;
      } else {
        Delay = 75;
      }
    }

    if(typeof RainSnow !== "boolean") {
      RainSnow = true;
    }

    if(typeof MakeTrans !== "boolean") {
      MakeTrans = true;
    }

    //Build URL
    var baseUrl = RadarFeedURL+WUAPIKey+"/animatedradar/q/"+State+"/"+City+".gif?";

    //Build String w/ Attributes
    var attributesStr = "width="+Width+"&height="+Height+"&timelabel="+(~~TimeLabel)+"&timelabel.y=15&num="+Frames+"&rainsnow"+(~~RainSnow)+"&delay="+Delay+"&noclutter=1&smooth="+(~~Smooth)+"&newmaps="+(~~MakeTrans);

    var requestUrl = baseUrl+attributesStr;
    console.debug("Request URL", requestUrl);

    //Return String
    return requestUrl;
  };

  service.getWundergroundConditionData = function(WUAPIKey, City, State, PostalCode) {

  };

  service.getWundergroundForecastData = function(WUAPIKey, City, State, PostalCode) {

  };

  return service;
});
