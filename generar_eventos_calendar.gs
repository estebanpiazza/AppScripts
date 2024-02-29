//https://www.youtube.com/watch?v=stsqoCeyINE&t=350s
//https://tesel.mx/agregar-eventos-a-google-calendar-desde-google-sheets-9437/
function onOpen() {  
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Calendario')
      .addItem('Agregar eventos a calendario', 'agregar_eventos')
      .addToUi();
}
 
function agregar_eventos() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var fila_inicial = 2;
  var columna_inicial = 3;
  var columna_url_evento = 10;
  var columna_id_evento = 11;
  var ultima_fila = sheet.getLastRow() - 1;
  var id_calendario = ""; //id del calendar

  var range = sheet.getRange(fila_inicial, columna_inicial, ultima_fila, columna_id_evento);
  var datos = range.getValues().map(
    ([Nombre_del_evento, Fecha_inicio_evento, Hora_inicio_evento, Fecha_fin_evento, Hora_fin_evento, Nivel, Curso, url_evento, id_evento]) =>
    ({ Nombre_del_evento, Fecha_inicio_evento, Hora_inicio_evento, Fecha_fin_evento, Hora_fin_evento, Nivel, Curso, url_evento, id_evento })
  );

  datos.forEach((dato, index) => {
    if (dato.id_evento == "" && dato.Nombre_del_evento != "" && dato.Fecha_inicio_evento != "" && dato.Fecha_fin_evento != "") {
      let fecha_inicio = new Date(dato.Fecha_inicio_evento);
      let fecha_fin = new Date(dato.Fecha_fin_evento);
      let hora_inicio = new Date(dato.Hora_inicio_evento);
      let hora_fin = new Date(dato.Hora_fin_evento);
      console.log("hora inicio:" + hora_inicio)
      console.log("hora fin:" + hora_fin)

      fecha_inicio.setHours(hora_inicio.getHours());
      fecha_inicio.setMinutes(hora_inicio.getMinutes());
      fecha_inicio.setSeconds(hora_inicio.getSeconds());

// Insertar la hora de hora_fin en fecha_fin
      fecha_fin.setHours(hora_fin.getHours());
      fecha_fin.setMinutes(hora_fin.getMinutes());
      fecha_fin.setSeconds(hora_fin.getSeconds());




      let info_adicional = `El nivel involucrado en el evento es ${dato.Nivel} y los cursos son ${dato.Curso}`;
    console.log("fecha inicio:" + fecha_inicio)
    console.log("fecha fin:" + fecha_fin)
      var evento = CalendarApp.getCalendarById(id_calendario).createEvent(
        dato.Nombre_del_evento,
        fecha_inicio,
        fecha_fin,
        {
          description: info_adicional,

        }
      )

      var evento_url = "https://calendar.google.com/r/eventedit/" + Utilities.base64Encode(evento.getId().split('@')[0] + " " + id_calendario).replace("==", '');
      sheet.getRange(fila_inicial + index, columna_url_evento).setValue(evento_url);
      sheet.getRange(fila_inicial + index, columna_id_evento).setValue(evento.getId());
      SpreadsheetApp.flush();
    }
  })
}

agregar_eventos()
