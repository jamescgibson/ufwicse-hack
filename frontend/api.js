window.api = {}
api.app_token = "WWAqNqivUpqzLb9ZQyzCkDXpj";
api.natGasEndpoint = "http://data.cityofgainesville.org/resource/dbcj-nniz.json";
api.electricEndpoint = "http://data.cityofgainesville.org/resource/gk3k-9435.json";
api.potableEndpoint = "http://data.cityofgainesville.org/resource/bn44-jxhy.json";
api.waterEndpoint = "http://data.cityofgainesville.org/resource/khkv-62wd.json";
api.codeEndpoint = "http://data.cityofgainesville.org/resource/vu9p-a5f7.json";
api.bizEndpoint = "http://data.cityofgainesville.org/resource/hk2b-em59.json";
api.taxEndpoint = "http://data.cityofgainesville.org/resource/vs8t-njwg.json";


api.encodeAddress = function(address) {
  var result = address.replace(/ /g, "%20");
  return result;
}

//These functions require an encoded address
api.getNatGasFromServer = function(address, callback) {
  $.get(api.natGasEndpoint + "?serviceaddress=" + address, function(data) {
    var result = [];
    if(data.length > 0) {
      result = _.map(data, function(value) {
        return value.therm_consumption;
      });
    }
    callback(result);
  });
}

api.getElectricFromServer = function(address, callback) {
  //console.log(api.electricEndpoint + "?ServiceAddress=" + address);
  $.get(api.electricEndpoint + "?ServiceAddress=" + address, function(data) {
    var result = [];
    if(data.length > 0) {
      result = _.map(data, function(value) {
        return value.kwh_consumption;
      });
    }
    callback(result);
  });
}

api.getWaterFromServer = function(address, callback) {
  console.log(api.waterEndpoint + "?ServiceAddress=" + address);
  $.get(api.waterEndpoint + "?ServiceAddress=" + address, function(data) {
    var result = [];
    if(data.length > 0) {
      result = _.map(data, function(value) {
        return value.kgal_consumption; //in kilo-gallons
      });
    }
    callback(result);
  });
}

//THIS ONE DOESN'T WORK
api.getCodeViolationsFromServer = function(address, callback) {
  console.log(api.codeEndpoint + "?Address=" + address);
  $.get(api.codeEndpoint + "?Address=" + address, function(data) {
    var result = [];
    if(data.length > 0) {
      result = _.map(data, function(value) {
        return value.kgal_consumption; //in kilo-gallons
      });
    }
    callback(result);
  });
}

api.getBizFromServer = function(address, callback) {
  console.log(api.bizEndpoint + "?location_address=" + address);
  $.get(api.bizEndpoint+ "?location_address=" + address, function(data) {
    if(data.length > 0) {
      result = data[0].name;
    }
    callback(result);
  });
}

//UNTESTED 
api.getTaxRollData = function(address, callback) {
  console.log(api.taxEndpoint + "?physical_address=" + address);
  $.get(api.bizEndpoint+ "?location_address=" + address, function(data) {
    callback(data);
  });
}
