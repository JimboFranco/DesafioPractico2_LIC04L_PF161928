$(document).ready(function () {
    //VALORES INICIALES
    let num = [];
    var  max, min;
    $('#numeros').focus();
    $('#mostrar').prop('disabled', true); //desabilitar boton mostrar hasta que se hallan ingresado los 5 numeros
    $('#msg').hide();

    //FUNCION QUE GUARDA LOS NUMEROS
    $('#ingresar').click(function () {

        num.push($('#numeros').val());
        $('#numeros').val('');
        $('#numeros').focus();
        if (num.length == 5) { //Si ya ingreso los 5 numeros desabilita el boton ingresar y muestra el boton mostrar
            $('#ingresar').prop('disabled', true);
            $('#mostrar').prop('disabled', false);
            $('#msg').show();//Muestra mensaje ingresados los 5 numeros
            maxMin(num);
        }
    })

    
    //FUNCION QUE RECORRE EL ARRAY Y OBTIENE EL MAYOR Y MENOR
    function maxMin(n){
        min = n[0];
        max = n[0];

            for (j = 0; j < n.length; j++) {
                if (parseInt(min) > parseInt(n[j])) {
                    min = n[j];
                }
                if (parseInt(max) < parseInt(n[j])) {
                    max = n[j];
                }
            }
        
    }

    //FUNCION MOSTRAR QUE ORDENA LOS NUMEROS, CREA Y MUESTRA LA TABLA
    $('#mostrar').click(function () {
        
        var tab="";
        num.sort((a, b) => b - a);//ORDENAMIENTO DESC

       
        //TABLA
        tab += '<table class="table table-striped"> <thead><tr><th> Analisis de: '+num.slice()+'</th><th></th></tr></thead>';
        tab += '<tbody><tr><td>Mayor: ' + max +'</td>';
        tab += '<td >Menor: ' + min +'</td></tr></tbody></table>';

        document.getElementById("tabla").innerHTML = tab;
    })

})
