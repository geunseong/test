exports.command = function(cssSelector, newValue){
  this.clearValue(cssSelector);
  this.setValue(cssSelector, newValue);
  return this;
};