function onFormSubmit(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lastRow = sheet.getLastRow();
  
  var timestamp = formatDate(new Date(sheet.getRange(lastRow, 1).getValue())); // Marca temporal
  var email = sheet.getRange(lastRow, 2).getValue(); // Dirección de correo electrónico
  var fullName = sheet.getRange(lastRow, 3).getValue(); // Nombre y Apellido
  var studentName = sheet.getRange(lastRow, 4).getValue(); // Nombre y apellido del alumno aspirante
  var classroom = sheet.getRange(lastRow, 5).getValue(); // Sala, Grado o Año al que aspira
  var phone = sheet.getRange(lastRow, 6).getValue(); // Teléfono/WhatsApp
  var contactEmail = sheet.getRange(lastRow, 7).getValue(); // Email
  var previousSchool = sheet.getRange(lastRow, 8).getValue(); // Colegio del que proviene (escribir nombre)
  var referralSource = sheet.getRange(lastRow, 9).getValue(); // Cómo nos conoció (referido, barrio, google, redes sociales, otro)
  
  // Formatear el mensaje de WhatsApp
  var whatsappMessage = "🕒 *Marca temporal:* " + timestamp + "\n" +
                        "✉️ *Correo electrónico:* " + email + "\n" +
                        "👤 *Nombre y Apellido:* " + fullName + "\n" +
                        "👩‍🎓 *Nombre y apellido del alumno aspirante:* " + studentName + "\n" +
                        "🏫 *Sala, Grado o Año al que aspira:* " + classroom + "\n" +
                        "📱 *Teléfono/WhatsApp:* " + phone + "\n" +
                        "📧 *Email:* " + contactEmail + "\n" +
                        "🏢 *Colegio del que proviene:* " + previousSchool + "\n" +
                        "🌐 *Cómo nos conoció:* " + referralSource;
  
  // Generar el enlace de WhatsApp
  var whatsappLink = "https://wa.me/5491164596455/?text=" + encodeURIComponent(whatsappMessage);
  
  // Insertar el enlace de WhatsApp en la columna J y eliminar la palabra "blob"
  var qrCodeCell = sheet.getRange(lastRow, 10); // Columna J
  qrCodeCell.setValue(whatsappLink).setNumberFormat('@STRING@');
  
  // Enviar correo electrónico con el código QR adjunto
  var subject = "Código QR de WhatsApp con datos del formulario";
  var message = "¡Hola " + fullName.split(" ")[0] + ", gracias por registrarte para la Reunión Informativa 2024 adjunto encontrarás el código QR que deberás presentar al momento del ingreso. Recuerda este código permite el acceso de máximo dos personas!! Los esperamos"
  var qrCode = generateQRCode(whatsappLink);
  MailApp.sendEmail(email, subject, message, {attachments: [qrCode]});
}

// Función para formatear la marca temporal
function formatDate(date) {
  var formattedDate = Utilities.formatDate(date, Session.getScriptTimeZone(), "EEEE, MMMM d, yyyy 'a las' HH:mm:ss");
  return formattedDate;
}

// Función para generar el código QR
function generateQRCode(data) {
  var qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?data=" + encodeURIComponent(data) + "&size=500x500";
  var qrCodeBlob = UrlFetchApp.fetch(qrCodeUrl).getBlob();
  return qrCodeBlob.setName("QR_Code.png");
}
