$( document ).ready(function(){
  $(".button-collapse").sideNav();
  $('select').material_select();

  data.forEach(function(el) {
    $("#name").append(el.nombre);
    $("#email").append(el.email);
    $("#rut").append(el.rut);

    $("#nickname-agua").append(el.cuentas[0].nick);
    $("#id-agua").append(el.cuentas[0].identificador);

    $("#nickname-luz").append(el.cuentas[1].nick);
    $("#id-luz").append(el.cuentas[1].identificador);

    $("#nickname-gas").append(el.cuentas[2].nick);
    $("#id-gas").append(el.cuentas[2].identificador);

    $("#nickname-tag").append(el.cuentas[3].nick);
    $("#id-tag").append(el.cuentas[3].identificador);

    $("#nickname-casa").append(el.cuentas[4].nick);
    $("#id-casa").append(el.cuentas[4].identificador);

  });


  if(localStorage.img) {
    //debugger;
    $('#bannerImg').attr('src', localStorage.img);
  }
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function(e) {
        localStorage.setItem('img', e.target.result);
        $('#bannerImg').attr('src', reader.result);
      }
      reader.readAsDataURL(input.files[0]);
    }
  }

  $(".file-upload").change(function() {
    readURL(this);
  });

  $(".upload-button").on('click', function() {
    $(".file-upload").click();
  });

})
