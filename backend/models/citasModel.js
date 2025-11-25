//El modelo para citas debe de tener (no necesariamente en ese orden):
//servicio a realizar
//fecha y hora de la cita (una cita no puede agendarse a la misma fecha y hora, la duracion de las citas que sea de una hora como en bases)
//usuario de que solicito la cita
//fecha de creacion y ultima modificacion
//nombres del estilista asignado [arreglo]
//en los controladores debe de haber metodos para lo siguiente
//crear una cita (debe de llenar el campo de usuario que agendi la cita, obteniendo el nombre desde el token)
//modificar una cita ya creada (solo los usuarios administradores pueden modificar citas ya agendadas)
//obtener las citas agendadas
//eliminar una cita(un usuario puede eliminar su propia cita, un administrador la que sea)
//para las reestricciones de administrador puedes omitirlas por ahora, eso le pregunte al profe el viernes pero creo que le voy a volver a preguntar