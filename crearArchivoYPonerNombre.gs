let arrayNombres = []
link = 'url de la hoja post d/'


let cantidad = arrayNombres.length


function copyDocs() {
  
  for(i=0; i<cantidad; i++){ 
    DriveApp.getFileById(link).setName(arrayNombres[i]);


  var drive=DriveApp.getFileById(link);
   
  drive.makeCopy();
  }
}