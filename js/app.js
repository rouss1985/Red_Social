$(document).ready(function(){

    //asigno el valor de lo que tenga la base local como un json
    var store = JSON.parse(localStorage.getItem('local'));
    //si el local no trae nada, hago un arreglo vacio, de lo contrario
    //le asigno el valor de la base local
    if(store==null){
        var local=[];
    }else{
        var local = JSON.parse(localStorage.getItem('local'));
    }

    //cuando carga el dom itero en la base local que es un objeto json
    $.each(JSON.parse(localStorage.getItem('local')),function(key,value){
        //mando a llamar la funcion bloque para pintar un bloque html
        var blok=bloque(value[0],value[1],value[2],value[3]);
        //le hago un prpend para mostrar lo que tiene la base
        $(".container").prepend(blok);
    });

    //guardamos el registro en local storage
    $("#guardar").click(function() {
        var texto = $("#historia").val();
        var img = $("#imgurl").val();
        var arr =[texto,img,1,1];
        var blok=bloque(texto,img,1,1);
        //le hago un prepend al mensaje que escibe el user
        $(".container").prepend(blok);

        //ux para mostrar y ocultar
        $('.btnSubmit').hide();
        $('#userImage').val("");
        $('#historia').val("");
        $('#userImage').show();
        $("#targetLayer").html("");
        //le hago un push al arregleo de base local
        local.push(arr);
        //guardo el arreglo
        localStorage.setItem('local', JSON.stringify(local));
        //lo pinto en consola
        console.log(JSON.parse(localStorage.getItem('local')));
    });
    $('.btnSubmit').hide();
    $("#userImage").click(function(e) {
        $('#guardar').prop('disabled',true);
    });
    //esta no tocar
    $(".btnSubmit").click(function(e) {
        e.preventDefault();
        console.log("ok");
        var file_data = $('#userImage').prop('files')[0];
        var form_data = new FormData();
        form_data.append('userImage', file_data);
        console.log(form_data);
        $.ajax({
            url: "upload.php", // Url to which the request is send
            type: "POST",             // Type of request to be send, called as method
            data: form_data, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
            contentType: false,       // The content type used when sending data to the server.
            cache: false,             // To unable request pages to be cached
            processData:false,        // To send DOMDocument or non processed data file it is set to false
            success: function(data)   // A function to be called if request succeeds
            {
                console.log(data);
                //ux para mostrar y ocultar
                $('.btnSubmit').hide();
                $('#userImage').hide();
                $("#imgurl").val(data);
                $("#targetLayer").show();
                $('#guardar').prop('disabled',false);
    			$("#targetLayer").html("La imagen se subió con éxito");
			},
		  	error: function()
	    	{
                alert("ups, paso algo, intenta de nuevo");
	    	}

	   });
	});

});
//funcion de template
function bloque(txt,img,like,encanta){
    var bloque=
    '<div class="timeline-item">'+
        '<div class="incontent small-12 columns">'+
            '<h3>31-Enero-2018</h3>'+
            '<p>'+ txt +
            '</p>'+
            '<img src="'+img+'">'+
            '<div class="actions">'+
                '<ul>'+
                    '<li><i class="fa fa-thumbs-o-up" aria-hidden="true"></i> (<span id="1">'+like+'</span>)</li>'+
                    '<li><i class="fa fa-heart-o" aria-hidden="true"></i> (<span id="1">'+encanta+'</span>)</li>'+
                '</ul>'+
            '</div>'+
            '<div class="comentarios">'+
            '<span class="hovericon"><i class="fa fa-commenting-o" aria-hidden="true"></i> Comentar</span> | <span class="hovericon"><i class="fa fa-share-square-o" aria-hidden="true"></i> Compartir</span>'+
            '</div>'+
        '</div>'+
    '</div>';
    return bloque;
}
//funcion para mostrar imagen previa
function showPreview(objFileInput) {
    if (objFileInput.files[0]) {
        var fileReader = new FileReader();
        fileReader.onload = function (e) {
            $('#blah').attr('src', e.target.result);
			$("#targetLayer").html('<img src="'+e.target.result+'" width="200px" height="200px" class="upload-preview" />');
			$("#targetLayer").css('opacity','0.7');
			$(".icon-choose-image").css('opacity','0.5');
            //ux para mostrar y ocultar
            $('.btnSubmit').show();
        }
		fileReader.readAsDataURL(objFileInput.files[0]);
    }
}
$(document).foundation();
