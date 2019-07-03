(function ($) {
   
    var formy = $("#signup-form");
    formy.steps({
        headerTag: "h3",
        bodyTag: "fieldset",
        transitionEffect: "fade",
        labels: {
            previous: 'Previous',
            next: 'Next',
            finish: 'Submit',
            current: ''
        },
        titleTemplate: '<h3 class="title">#title#</h3>',
        onFinished: function (event, currentIndex, elements) {
       
            event.preventDefault()
            const body = {
                full_name: $('#full_name').val(),
                email: $('#email').val(),
                password: $('#password').val(),
                phone_number: $('#phone_number').val(),
                dob: $('#dob').val(),
                address: $('#address').val(),
                category_id: $('#category').val(),
                school: $('#school').val(),
                academic_discipline: $('#academic_discipline').val(),
                academic_status: $('#academic_status').val(),
                programming_skill: $('#programming_skill').val(),
                teaching_experience: $('#teaching_experience').val(),
                level_id: $('#level_id').val(),
                interest_id: $('#interest_id').val(),
                account_name: $('#account_name').val(),
                account_password: $('#account_password').val(),
                avatar: $('#avatar').val()
            }

            // return alert(JSON.stringify(body))

            axios.post('/trainee/profile/create', JSON.stringify(body)).then((res) => {
                Swal.fire(
                    'Success!',
                    'Your Account Was Created Successfully',
                    'success'
                )
                // return res.redirect('/trainee-profile')
                window.location.href = '/trainee-profile'
            }).catch((e) => {
                console.log(e)
                Swal.fire(
                    'Oppss!',
                    `${e} occured`,
                    'error'
                )
            })
        },
    });

    $(".toggle-password").on('click', function () {

        $(this).toggleClass("zmdi-eye zmdi-eye-off");
        var input = $($(this).attr("toggle"));
        if (input.attr("type") == "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });

})(jQuery);
