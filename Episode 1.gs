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
  
}

function getSchema() {
  
}

function getData() {
  
}
