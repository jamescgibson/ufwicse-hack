window.api = {}
api.app_token = "WWAqNqivUpqzLb9ZQyzCkDXpj";
api.natGasEndpoint = "http://data.cityofgainesville.org/resource/dbcj-nniz.json";
api.electricEndpoint = "http://data.cityofgainesville.org/resource/gk3k-9435.json";
api.potableEndpoint = "http://data.cityofgainesville.org/resource/bn44-jxhy.json";
api.waterEndpoint = "http://data.cityofgainesville.org/resource/khkv-62wd.json";
api.codeEndpoint = "http://data.cityofgainesville.org/resource/vu9p-a5f7.json";
api.bizEndpoint = "http://data.cityofgainesville.org/resource/hk2b-em59.json";
api.taxEndpoint = "http://data.cityofgainesville.org/resource/vs8t-njwg.json";

api.electricPercentile = [0,0,0,0,24,54,82,108,134,159,182,202,221,239,255,271,286,300,314,327,340,353,366,378,390,402,414,425,437,448,459,470,482,493,504,515,526,537,548,559,570,581,592,604,615,627,638,650,662,674,686,698,710,723,736,748,762,775,789,803,817,832,847,862,877,893,910,927,944,962,980,1000,1019,1040,1061,1083,1107,1131,1157,1184,1212,1243,1275,1311,1349,1389,1435,1486,1542,1607,1682,1773,1886,2033,2241,2574,3253,5200,11928]
api.waterPercentile = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7,8,8,8,9,9,9,10,10,11,11,11,12,12,13,13,14,14,14,15,15,16,16,16,17,18,18,19,19,20,20,21,22,22,23,24,25,25,26,27,28,29,30,31,32,33,34,36,37,38,40,42,44,46,49,52,55,61,68,84,118];
api.natGasPercentile = [0,0,0,0,0,0,0,0,0,1,1,2,3,3,4,4,4,5,5,5,5,6,6,6,7,7,7,7,8,8,8,9,9,9,9,10,10,10,11,11,11,12,13,13,13,14,14,15,15,15,16,17,17,18,18,19,19,20,21,21,22,23,23,24,25,26,26,27,28,29,30,31,32,33,34,35,36,38,39,40,42,43,45,46,48,50,52,55,57,60,64,67,72,77,85,95,113,166,486];

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

api.getNatGasPercentile = function(address, callback) {
  //This returns the percentile score
  api.getNatGasFromServer(address, function(data) {
    //console.log(data);
    var sum = _.reduce(data, function(memo, num) { return memo + parseInt(num)}, 0);
    //console.log(sum);
    var avg = sum / data.length;
    //console.log(avg);
    var less = _.filter(api.natGasPercentile, function(num) { return num < avg; });
    //console.log(less);
    var percentile = less.length;
    callback(percentile);
  });
}

api.getElectricPercentile = function(address, callback) {
  //This returns the percentile score
  api.getElectricFromServer(address, function(data) {
    //console.log(data);
    var sum = _.reduce(data, function(memo, num) { return memo + parseInt(num)}, 0);
    //console.log(sum);
    var avg = sum / data.length;
    //console.log(avg);
    var less = _.filter(api.electricPercentile, function(num) { return num < avg; });
    //console.log(less);
    var percentile = less.length;
    callback(percentile);
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

api.getWaterPercentile = function(address, callback) {
  //This returns the percentile score
  api.getWaterFromServer(address, function(data) {
    var sum = _.reduce(data, function(memo, num) { return memo + parseInt(num)}, 0);
    var avg = sum / data.length;
    var less = _.filter(api.waterPercentile, function(num) { return num < avg; });
    var percentile = less.length;
    callback(percentile);
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
