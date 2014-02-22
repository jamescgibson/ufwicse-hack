function Location(address) {
  var self = this;
  self.address = address;
  self.locationType;
  self.overallRating = api.getOverallRating(overall);
  self.electricityPercentile = api.getElectricityPercentile(self);
  self.waterPercentile = api.getElectricityPercentile(self);
  self.garbagePercentile = api.getElectricityPercentile(self);
}
