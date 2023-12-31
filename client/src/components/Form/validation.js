
export default function validation (input){
    let dificultad = Number(input.dificultad);
    let temporada = input.temporada.toLowerCase().trim();
    let errors = {};
    if (!input.nombre){
        errors.nombre= 'Nombre requerido'
    }
    if (!input.dificultad){
        errors.dificultad= 'Dificultad requerida';
    }
    if (dificultad>5 || dificultad<1){
        errors.dificultad= 'La dificultad debe ser un número entre 1 y 5';
    }
    if (input.duracion) {
         if (Number(input.duracion) < 1){
        errors.duracion= 'La duracion no puede ser menor a 1';
        }
        if (input.duracion==='') {
             errors.duracion= '';
        }
       
    }
   
    if (!/[0-9]$/.test(dificultad)) {
        errors.dificultad= 'La dificultad debe ser en números';
    }
    if (!input.temporada) {
        errors.temporada= 'Temporada requerida';
    }
    if (input.temporada) {
        if (temporada !== 'verano'&& temporada !== 'otoño'&& temporada !== 'invierno'&& temporada !== 'primavera') {
            errors.temporada= 'Ingrese una temporada valida';
        } 
    }
    if (input.CountryId.length<1) {
        errors.CountryId='Debe seleccionar al menos un país';
    }
    
    if (!errors.nombre && !errors.duracion && !errors.dificultad && !errors.temporada && !errors.CountryId){
        errors.vacio = true;
    }else{
        errors.vacio = false;
    }
    return errors;
}