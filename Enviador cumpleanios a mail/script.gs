function UpcomingBirthdaysEmail() {
  // condiciono el envio de mail a la cantidad de cumpleaños
    let hojaActiva = SpreadsheetApp.getActive();
    let cantidadAEnviar = hojaActiva.getRangeByName("cantidad").getValue();
    if (cantidadAEnviar ==7){ //si el error es 7 (#N/A) no se envia mail.
      Logger.log("no se envio el mail")
    }else{//si hay valor, o sea, no hay error, se envia el mail con los cumpleaños
  
  // Get Active sheet
  var BirthdaysSpreadsheet = SpreadsheetApp.getActive();
  // Sort Data in table
  var BirthdaysTable = BirthdaysSpreadsheet.getRangeByName("Birthdays");
  // Sorts by the values in the days till birthday column
  BirthdaysTable.sort(6);

  // Get cells that contain the information for the email.
  var EmailSheet = BirthdaysSpreadsheet.getSheetByName('Emails')
  var LastRow = BirthdaysSpreadsheet.getRangeByName("SendUpcomingEmailLines").getValue();
  var UpcomingBirthdaysTable = EmailSheet.getRange(1,2,LastRow,4).getDisplayValues();

  // Translate the cells into a HTML table
  var HtmlTemplate = HtmlService.createTemplateFromFile('UpcomingBirthdaysEmail');
  HtmlTemplate.Column1 = "Hoy cumple: ";
  HtmlTemplate.table = UpcomingBirthdaysTable;
  var EmailTable = HtmlTemplate.evaluate().getContent();
  
  // Send Alert Email.
  var Email = 'estebanpiazza51@gmail.com';
  MailApp.sendEmail({
  to: Email,
  subject: "Cumpleaños del dia",
  htmlBody:EmailTable
    });}
}