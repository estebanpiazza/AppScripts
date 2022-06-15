
let linkALaHoja = 'url de la hoja post d/'
let cantidadDeArchivosACrear = 8 // <<<< cambiar



function copyDocs() {
  
  for(i=0; i<cantidadDeArchivosACrear; i++){ 
   

  var drive=DriveApp.getFileById(linkALaHoja); 
  drive.makeCopy();
  }
}