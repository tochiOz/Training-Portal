(function ($) {
   
    var form = $("#signup-form");
    form.steps({
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
        onFinished: function (event, currentIndex) {
            event.preventDefault()

            fetch('/trainee/student/create', {
                method: 'post'
            }).then((res) => {
                Swal.fire(
                    'Success!',
                    'Your Account Was Created Successfully',
                    'success'
                )
                // return res.redirect('/trainee-profile')
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
