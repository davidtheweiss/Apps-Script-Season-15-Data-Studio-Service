const cc = DataStudioApp.createCommunityConnector();

function getAuthType() {
  return cc.newAuthTypeResponse()
    .setAuthType(cc.AuthType.KEY)
    .setHelpUrl('https://p.nomics.com/cryptocurrency-bitcoin-api')
    .build();
}

function resetAuth() {
  var userProperties = PropertiesService.getUserProperties();
  userProperties.deleteProperty('dscc.key');
}

function isAuthValid() {
  var userProperties = PropertiesService.getUserProperties();
  var key = userProperties.getProperty('dscc.key');
  var res = UrlFetchApp.fetch(`https://api.nomics.com/v1/markets?key=${key}`, { 'muteHttpExceptions':true });
  return res.getResponseCode() == 200;
}

function setCredentials(request) {
  var key = request.key;
  var res = UrlFetchApp.fetch(`https://api.nomics.com/v1/markets?key=${key}`, { 'muteHttpExceptions':true });
  if (res.getResponseCode() != 200) {
    return cc.newSetCredentialsResponse()
      .setIsValid(false)
      .build();
  } else {
    var userProperties = PropertiesService.getUserProperties();
    userProperties.setProperty('dscc.key', key);
    return cc.newSetCredentialsResponse()
      .setIsValid(true)
      .build();
  }
}

function getConfig() {
  const config = cc.getConfig();

  const option1 = config.newOptionBuilder()
    .setLabel('U.S. Dollars (USD)')
    .setValue("USD");
  const option2 = config.newOptionBuilder()
    .setLabel('Euros (EUR)')
    .setValue("EUR");
  const option3 = config.newOptionBuilder()
    .setLabel('Japanese Yen (JPY)')
    .setValue("JPY");
  const option4 = config.newOptionBuilder()
    .setLabel('Pound Sterling (GBP)')
    .setValue("GBP");

  config.newSelectSingle()
    .setId('currency')
    .setName('Please Select a Currency to Quote the Ticker Prices')
    .addOption(option1)
    .addOption(option2)
    .addOption(option3)
    .addOption(option4);

  config.newInfo()
    .setText('To learn more about currencies please go here: https://en.wikipedia.org/wiki/Currency');

  return config.build();
}

function getSchema() {
  
}

function getData(request) {
  
}
