window.api = {}
api.app_token = "WWAqNqivUpqzLb9ZQyzCkDXpj";
api.endpoint = "http://data.cityofgainesville.org/resource/dbcj-nniz.json";

api.getNatGasFromServer = function(address) {
  return $.get(api.endpoint + "?ServiceAddress=10%20NW%206TH%20ST", function(data) {
    var result = [];
    if(data.length > 0) {
      result = _.map(data, function(value) {
        value.therm_consumption;
      });
    }
    return result;
  });
}
