$(document).ready(function () {

    //VALORES INICIALES:
    var sugerencia = "";
    document.getElementById("textAreaDiv").innerHTML = "Ctrl + Shift + E para añadir una sugerencia"; //Texto del div sugerencias
    var modalSug = document.getElementById("modalSuge"); //Capturar div de sugerencias dentro del modal
    $('#textArea').hide(); //Ocultar el text area de sugerancias
    calcularTot(); //Llamando a la funcion que calcula el total y completa el modal


    //FUNCION HABILITAR EL TEXTAREA CON UN CLICK
    $('#textAreaDiv').click(function () {
        $('#textAreaDiv').hide();
        $('#textArea').show();
        $('#textArea').focus();

    })

    //FUNCION PARA CAPTURAR LA COMBINACION "CTRL + SHIFT + E" Y HABILITAR EL TEXTAREA
    $(document).keydown(function (e) {
        if (e.ctrlKey && (e.which == 69) && (e.shiftKey)) { //Evalua si esta presionando Ctrl, Shift y la tecla "E" al mismo tiempo    
            $('#textAreaDiv').hide();
            $('#textArea').show();
            $('#textArea').focus();
        }
        if (e.ctrlKey && (e.which == 83) && (e.shiftKey)) { //Evalua si esta presionando Ctrl, Shift y la tecla "S" al mismo tiempo    

            if (($('#textArea').val().trim() == "")) { //validacion campo vacio
                sugerencia = "Ctrl + Shift + E para añadir una sugerencia";
                $('#textArea').val("");
                modalSug.innerHTML = ""
            } else { //Si no esta vacio guarda la sugerencias escritas en el textarea
                sugerencia = $('#textArea').val();
                $('#textArea').val(sugerencia.trim());
                modalSug.innerHTML = sugerencia;
            }

            //Guardando sugerencia en el div de sugerencias
            document.getElementById("textAreaDiv").innerHTML = sugerencia;
            $('#textAreaDiv').show();
            $('#textArea').hide();
        }
    })



    //FUNCION PARA CALCULAR EL TOTAL
    function calcularTot() {
        var tot = 0;
        var content = "";
        let prod = [];//columna productos de la tabla del modal
        let pre = [];//columna precios de la tabla del modal

        $('input[type=radio]').each(function () {//Recorre todos los radio
            if ($(this).is(":checked")) { //Si esta chequeado le agrega el value (obtenido del html) al total y guarda los datos para crear la tabla
                //total
                tot += parseFloat($(this).val());
                //datos tabla
                prod.push($(this).closest('label').text());//captura el texto del label mas cercano al radio
                pre.push($(this).val());
            }
        });

        $('input[type=checkbox]').each(function () {//Recorre todos los checkbox
            if ($(this).is(":checked")) {//si esta chequeado le agrega el value (obtenido del html) al total y guarda los datos para crear la tabla
                //total
                tot += parseFloat($(this).val());
                //datos tabla
                prod.push($(this).closest('label').text());//captura el texto del label mas cercano al checkbox
                pre.push($(this).val());
            }
        });
        //Agregando datos a la tabla
        for (i = 0; i < prod.length; i++) {
            content += "<tr>    <td>" + prod[i] + "</td> <td>$" + pre[i] + "</td>   </tr>";
        }

        content += '<tr class="table-success">    <td>Total</td> <td>$' + tot.toFixed(2) + '</td>   </tr>';
        document.getElementById("tbody").innerHTML = content;

        $('#total').val(tot.toFixed(2)); //Total mostrado con dos decimales
    }



    //EVENTOS CHANGE DE CHECKBOX Y RADIOBUTTONS
    $('input:checkbox').change(function () {
        calcularTot();
    });

    $('input:radio').change(function () {
        calcularTot();
    });

    //RESET/RELOAD
    $('#reset').click(function () {
        location.reload();
    });

})
