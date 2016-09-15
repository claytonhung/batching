
jQuery(document).ready(function() {

    /*
        Fullscreen background
    */
    $.backstretch("assets/img/photo-1436891620584-47fd0e565afb.jpeg");
    // $.backstretch("assets/img/backgrounds/1.jpg");

    $('#top-navbar-1').on('shown.bs.collapse', function(){
        $.backstretch("resize");
    });
    $('#top-navbar-1').on('hidden.bs.collapse', function(){
        $.backstretch("resize");
    });

    /*
        Social Media textbox hide
    */
    var form_fb = $('#form-facebook');
    var form_tw = $('#form-twitter');
    var form_sms = $('#form-sms');

    form_fb.hide();
    form_tw.hide();
    form_sms.hide();

    $('#btn-twitter').on('click', function (e) {
        form_tw.fadeIn();
        form_sms.hide();
        form_fb.hide();
    });

    $('#btn-sms').on('click', function (e) {
        form_sms.fadeIn();
        form_tw.hide();
        form_fb.hide();
    });

    $('#btn-facebook').on('click', function (e) {
        form_fb.fadeIn();
        form_tw.hide();
        form_sms.hide();
    });

    /*
        New Item on Click
    */
    // function setIngredientRemoveBinding(ingredientItem){
    //   var ingredientIcon = ingredientItem.children(".ingredient-item-icon")[0]
    //   $(ingredientIcon).click(function(){
    //     this.parentElement.remove();
    //     ingredientList.pop(ingredientIcon.innerHTML);
    //     //INCLUDE REMOVE ANIMATION HERE *****************************************************************************
    //   });
    // }

    var count = 1;
    $('#btn-new-item').on('click', function (e) {
        var startString = " <tr><td> "
        var endString = " </td></tr>"
        var item = '<input type="text" name="form-item" placeholder="Item..." class="form-item form-control" id="form-item-' + count + '">' + '</td><td>' + '<input type="time" style="height:50px; text-align:center;" name="form-item" placeholder="Time..." class="form-item form-control" id="form-item-time-' + count + '" >';
        var newListItem = startString + item + endString;
        var x = $(newListItem).appendTo('.items-table');
        // setItemRemoveBinding(x);
        count++;
    });

    /*
        Form
    */
    $('.registration-form fieldset:first-child').fadeIn('slow');

    $('.registration-form input[type="text"], .registration-form input[type="time"], .registration-form textarea').on('focus', function() {
    	$(this).removeClass('input-error');
    });

    // next step
    $('.registration-form .btn-next').on('click', function() {
    	var parent_fieldset = $(this).parents('fieldset');
    	var next_step = true;

    	parent_fieldset.find('input[type="text"], input[type="time"], textarea').each(function() {
    		if( $(this).val() == "" ) {
    			$(this).addClass('input-error');
    			next_step = false;
    		}
    		else {
    			$(this).removeClass('input-error');
    		}
    	});

    	if( next_step ) {
    		parent_fieldset.fadeOut(400, function() {
	    		$(this).next().fadeIn();
	    	});
    	}

    });

    // previous step
    $('.registration-form .btn-previous').on('click', function() {
    	$(this).parents('fieldset').fadeOut(400, function() {
    		$(this).prev().fadeIn();
    	});
    });

    // submit
    $('.registration-form .btn-submit').on('click', function(e) {
        var submit = true;
        var parent_fieldset = $(this).parents('fieldset');

        // MAKE SURE ONE OF THEM IS NOT EMPTY(below makes sure all of them arent empty)

    	// $(this).find('input[type="text"], input[type="password"], textarea').each(function() {
    	// 	if( $(this).val() == "" ) {
    	// 		e.preventDefault();
    	// 		$(this).addClass('input-error');
     //            submit = false;
    	// 	}
    	// 	else {
    	// 		$(this).removeClass('input-error');
    	// 	}
    	// });

        if( submit ) {
            var obj = {
                social: {
                    twitter: '',
                    sms: '',
                    facebook: ''
                },
                items: []
            };

            if ($('#form-twitter').val() !=="")
                obj.social.twitter = $('#form-twitter').val();
            if ($('#form-sms').val() !=="")
                obj.social.sms = $('#form-sms').val();
            if ($('#form-facebook').val() !=="")
                obj.social.facebook = $('#form-facebook').val();

            for(var i = 0; i < count; i++) {
                var item = {
                    message: $('#form-item-' + i).val(),
                    time: $('#form-item-time-' + i).val()
                };
                obj.items.push(item);
            }

            parent_fieldset.fadeOut(400, function() {
                $.ajax({
                  type: 'POST',
                  url: 'http://localhost:3000/api/v1/postItems',
                  dataType: 'json',
                  data: obj
                }).done(function(res) {
                    if (res == 0) {
                        alert("failed boy");
                    } else {
                        parent_fieldset.next().fadeIn();
                    }
                });
            });
        }
    });

});
