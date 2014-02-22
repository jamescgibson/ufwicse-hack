window.api = {}
api.app_token = "WWAqNqivUpqzLb9ZQyzCkDXpj";
api.natGasEndpoint = "http://data.cityofgainesville.org/resource/dbcj-nniz.json";
api.electricEndpoint = "http://data.cityofgainesville.org/resource/gk3k-9435.json";
api.potableEndpoint = "http://data.cityofgainesville.org/resource/bn44-jxhy.json";
api.waterEndpoint = "http://data.cityofgainesville.org/resource/khkv-62wd.json";
api.codeEndpoint = "http://data.cityofgainesville.org/resource/vu9p-a5f7.json";
api.bizEndpoint = "http://data.cityofgainesville.org/resource/hk2b-em59.json";
api.taxEndpoint = "http://data.cityofgainesville.org/resource/vs8t-njwg.json";

api.electricPercentile = [0,0,0,0,21,64,104,147,187,220,251,280,306,330,354,376,396,415,435,453,471,488,505,521,537,553,568,582,597,612,626,640,654,668,682,696,710,724,738,752,766,780,793,807,821,835,849,864,878,892,906,921,936,951,965,981,996,1012,1028,1044,1059,1076,1093,1111,1128,1145,1163,1182,1201,1221,1241,1263,1285,1308,1331,1355,1381,1407,1435,1464,1494,1527,1563,1600,1641,1687,1735,1790,1852,1923,2006,2109,2236,2396,2639,3014,3796,6024,13920];

api.waterPercentile = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7,8,8,8,9,9,9,10,10,11,11,11,12,12,13,13,14,14,14,15,15,16,16,16,17,18,18,19,19,20,20,21,22,22,23,24,25,25,26,27,28,29,30,31,32,33,34,36,37,38,40,42,44,46,49,52,55,61,68,84,118];

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
