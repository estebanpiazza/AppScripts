
function prueba(){
//creo el for
for ( let i = 0; i < 30;i++){

//Voy a la hoja del for
var hojaActual = SpreadsheetApp.getActiveSpreadsheet().getSheets()[i]
Logger.log(hojaActual)
//tomo el nombre de la hoja
var actualSheetName = hojaActual.getName();
Logger.log(actualSheetName)
// corto el nombre y lo guardo en dos variables
let array1 = []
array1 = actualSheetName.split(",")
let apellido = array1[0]
let nombre =array1[1]


//escribo los valores en los espacios
var apellidoCelda = hojaActual.getRange("A5");
apellidoCelda.setValue("Apellido(s): "+apellido  );


var nombreCelda = hojaActual.getRange("A6");
nombreCelda.setValue("Nombre(s): " + nombre);

}
}
