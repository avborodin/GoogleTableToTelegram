let api_token = "";
let webAppUrl = "";
let chat_id = "";



let document_id = "1a96qJlzcI6DfogdJqcD2OB6Y2epVD1bLcnOpQXd3sBw";

function getMe() {
  let response = UrlFetchApp.fetch("https://api.telegram.org/bot" + api_token + "/getMe");
  console.log(response.getContentText());
}

function setWebhook() {
  let response = UrlFetchApp.fetch("https://api.telegram.org/bot" + api_token + "/setWebhook?url=" + webAppUrl);
  console.log(response.getContentText());
}

function doPost(e) {
  var sheet =  SpreadsheetApp.openById(document_id).getSheets()[0]
  var lastpost = sheet.getRange(sheet.getLastRow(), 1, 1,  14).getValues()[0]
  //var message = ' <strong>'+lastpost[1] + '</strong> \n' + lastpost[2].getHours() +'\n' + lastpost[3].getDate() + "." + lastpost[3].getMonth() + "." + lastpost[3].getFullYear();
  
  //Формат съемок: 
  //Кол-во камер:
  
  var main_info =  lastpost[5] + "\n";
      main_info += lastpost[6] + "\n";
      
      if(lastpost[7]){
        main_info += "Дедлайн: " + lastpost[7].getDate() + "." + lastpost[7].getMonth() + "." + lastpost[7].getFullYear() + "\n";
      }
      
      main_info += "Бюджет: " + lastpost[13] + "\n";
  var supporting_info = '';
      if(lastpost[8]){
        supporting_info += "Цветокоррекция: " + lastpost[8] + "\n";
      }
      if(lastpost[9]){
        supporting_info += "Вертикальные видео: " + lastpost[9] + "\n";
      }
      if(lastpost[11]){
        supporting_info += "Тизер: " + lastpost[11] + "\n";
      }
      if(lastpost[10]){
        supporting_info += "Субтитры: " + lastpost[10] + "\n";
      }
  var links = lastpost[12];

  let txt = "<strong>Основная информация</strong>\n" + main_info;
      txt += '\n<strong>Вспомогательная информация</strong>\n' + supporting_info;
      
      if(links){
        txt += '\n<strong>Ссылки</strong>\n' + links;
      }

  var payload = {
    'method': 'sendMessage',
    'chat_id': String(chat_id),
    'text': txt,
    'parse_mode': 'HTML'
  }     
  var data = {
    "method": "post",
    "payload": payload
  }
        
  UrlFetchApp.fetch('https://api.telegram.org/bot' + api_token + '/', data);
}
