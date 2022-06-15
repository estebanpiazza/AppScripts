let arrayValores = []//aca va la lista
let cantidad = arrayValores.length //cantidad de valores


function AddReportSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  for (let i = 0; i< cantidad; i++){
  SpreadsheetApp.getActiveSpreadsheet().duplicateActiveSheet();

 SpreadsheetApp.getActiveSpreadsheet().renameActiveSheet(arrayValores[i]);
 }
}