function checkScroll() {
    if ($(window).scrollTop() > 0) {
        $('.header').addClass('fixed');
    }
    if ($(window).scrollTop() <= 0) {
        $('.header').removeClass('fixed');
    }
}

function removeModal() {
    $('.modal').remove();
}

function sendForm(data) {
    console.log(data);
    $.ajax({
        url: "https://docs.google.com/forms/d/e/1FAIpQLSeycz2lS-2A2iEycEdFmet4J9lMpFiIbbMCJEDs-ovHvFsW6w/formResponse",
        data: {
          "entry.897534436": data.name,
          "entry.1439971969": data.address,
          "entry.1862797708": data.phone,
          "entry.18376172": data.email,
          "entry.1433351178": data.product,
        },
        type: "POST",
        dataType: "json",
        statusCode: {
          0: function () {
          },
          200: function () {
          },
        },
      });
}

function submitModal () {
    var nameM = $('#name-m');
    var addressM = $('#address-m');
    var phoneM = $('#phone-m');
    var emailM = $('#email-m');
    var productM = $('#product-m');
    var submitB = $('#submit-m');
    if(!nameM.val() || !addressM.val() || !phoneM.val() || !emailM.val() || !productM.val()){
        alert('Vui lòng điền đầy đủ thông tin trước khi gửi');
    } else {
        var data = {
            name: nameM.val(),
            address: addressM.val(),
            phone: phoneM.val(),
            email: emailM.val(),
            product: productM.val()
        };
        sendForm(data);
        submitB.prop('disabled', true);
        submitB.attr('style', 'filter: grayscale(1);');
        submitB.val('Đang gửi thông tin');
        setTimeout(function(){
            alert('Thành công');
            nameM.val("");
            addressM.val("");
            phoneM.val("");
            emailM.val("");
            productM.val("");
            submitB.removeAttr('disabled');
            submitB.removeAttr('style');
            submitB.val('Đăng ký');
            removeModal();
        }, 2000)
    }
}

$(document).ready(function () {
    // Cache selectors
    var lastId,
        topMenu = $(".header__menu"),
        topMenuHeight = topMenu.outerHeight() + 15,
        // All list items
        menuItems = topMenu.find("a"),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function () {
            var item = $($(this).attr("href"));
            if (item.length) { return item; }
        });

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function (e) {
        $('.header__menu').removeClass('active');
        $('.backdrop').removeClass('show');
        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top - 73;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 1000);
        e.preventDefault();
    });

    // Bind to scroll
    $(window).scroll(function () {
        // Get container scroll position
        var fromTop = $(this).scrollTop() + topMenuHeight;

        // Get id of current scroll item
        var cur = scrollItems.map(function () {
            if ($(this).offset().top < fromTop)
                return this;
        });
        // Get the id of the current element
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems
                .removeClass("active")
                .filter("[href='#" + id + "']").addClass("active");
        };
        checkScroll();
    });

    $('.header__icon').click(function () {
        $('.header__menu').addClass('active');
        $('.backdrop').addClass('show');
    });
    $('.backdrop').click(function () {
        $('.header__menu').removeClass('active');
        $('.backdrop').removeClass('show');
    });

    $('.reg-btn').click(function () {
        var html = '';
        var idModal = $(this).attr("data-modal");
        switch (idModal) {
            case 'modal-1':
                html = `
                <div class="modal">
                    <div class="modal__bg" onclick="removeModal()"></div>
                    <div class="modal__box">
                        <div class="modal__close" onclick="removeModal()">×</div>
                        <div class="modal__body">
                            <div class="modal__title">
                                <div class="title__main">Lãi suất vàng - Kinh doanh rộn ràng</div>
                                <div class="title__sub"><span>Chọn</span> VietABank</div>
                            </div>
                            <div class="modal__form">
                                <div class="form-group">
                                    <input class="modal__input" id="name-m" type="text" placeholder="Họ và tên">
                                </div>
                                <div class="form-group">
                                    <input class="modal__input" id="address-m" type="text" placeholder="Địa chỉ">
                                </div>
                                <div class="form-group">
                                    <input class="modal__input" id="phone-m" type="text" placeholder="Số điện thoại">
                                </div>
                                <div class="form-group">
                                    <input class="modal__input" id="email-m" type="text" placeholder="Email">
                                </div>
                                <div class="form-group">
                                    <input class="modal__input" id="product-m" type="text" placeholder="Lãi suất vàng">
                                </div>
                                <div class="modal__submit">
                                    <input class="button-1" id="submit-m" onclick="submitModal()" type="button" value="Đăng ký">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `;
                break;
            case 'modal-2':
                html = `
                <div class="modal">
                    <div class="modal__bg" onclick="removeModal()"></div>
                    <div class="modal__box">
                        <div class="modal__close" onclick="removeModal()">×</div>
                        <div class="modal__body">
                            <div class="modal__title">
                                <div class="title__main">Tiết Kiệm Đắc Lộc - Sinh lời tự động</div>
                                <div class="title__sub"><span>Chọn</span> VietABank</div>
                            </div>
                            <div class="modal__form">
                                <div class="form-group">
                                    <input class="modal__input" id="name-m" type="text" placeholder="Họ và tên">
                                </div>
                                <div class="form-group">
                                    <input class="modal__input" id="address-m" type="text" placeholder="Địa chỉ">
                                </div>
                                <div class="form-group">
                                    <input class="modal__input" id="phone-m" type="text" placeholder="Số điện thoại">
                                </div>
                                <div class="form-group">
                                    <input class="modal__input" id="email-m" type="text" placeholder="Email">
                                </div>
                                <div class="form-group">
                                    <input class="modal__input" id="product-m" type="text" placeholder="Tiết kiệm đắc lộc">
                                </div>
                                <div class="modal__submit">
                                    <input class="button-1" id="submit-m" onclick="submitModal()" type="button" value="Đăng ký">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `;
                break;
            case 'modal-3':
                html = `
                <div class="modal">
                    <div class="modal__bg" onclick="removeModal()"></div>
                    <div class="modal__box">
                        <div class="modal__close" onclick="removeModal()">×</div>
                        <div class="modal__body">
                            <div class="modal__title">
                                <img src="images/title-p3.jpg" alt="">
                            </div>
                            <div class="modal__form">
                                 <div class="form-group">
                                    <input class="modal__input" id="name-m" type="text" placeholder="Họ và tên">
                                </div>
                                <div class="form-group">
                                    <input class="modal__input" id="address-m" type="text" placeholder="Địa chỉ">
                                </div>
                                <div class="form-group">
                                    <input class="modal__input" id="phone-m" type="text" placeholder="Số điện thoại">
                                </div>
                                <div class="form-group">
                                    <input class="modal__input" id="email-m" type="text" placeholder="Email">
                                </div>
                                <div class="form-group">
                                    <input class="modal__input" id="product-m" type="text" placeholder="Sản phẩm thẻ tín dụng muốn đăng ký">
                                </div>
                               <div class="modal__submit">
                                    <input class="button-1" id="submit-m" onclick="submitModal()" type="button" value="Đăng ký">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `;
                break;
            case 'modal-4':
                html = `
                <div class="modal">
                    <div class="modal__bg" onclick="removeModal()"></div>
                    <div class="modal__box">
                        <div class="modal__close" onclick="removeModal()">×</div>
                        <div class="modal__body">
                            <div class="modal__title">
                                <img src="images/title-p4.jpg" alt="">
                            </div>
                            <div class="modal__form">
                                <div class="form-group">
                                    <input class="modal__input" id="name-m" type="text" placeholder="Họ và tên">
                                </div>
                                <div class="form-group">
                                    <input class="modal__input" id="address-m" type="text" placeholder="Địa chỉ">
                                </div>
                                <div class="form-group">
                                    <input class="modal__input" id="phone-m" type="text" placeholder="Số điện thoại">
                                </div>
                                <div class="form-group">
                                    <input class="modal__input" id="email-m" type="text" placeholder="Email">
                                </div>
                                <div class="form-group">
                                    <input class="modal__input" id="product-m" type="text" placeholder="Sản phẩm bảo hiểm muốn đăng ký">
                                </div>
                                <div class="modal__submit">
                                    <input class="button-1" id="submit-m" onclick="submitModal()" type="button" value="Đăng ký">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `;
                break;
            default:
                html = '';
        };
        $(html).appendTo('body');

    });

    $(".btn-action").click(function() {
        $('html, body').animate({
            scrollTop: $("#page2").offset().top - 73
        }, 1000);
    });
    $(".btn-action1").click(function() {
        console.log($("#page3").offset().top);
        $('html, body').animate({
            scrollTop: $("#page3").offset().top - 73
        }, 1000);
    });
    $(".btn-action2").click(function() {
        $('html, body').animate({
            scrollTop: $("#page4").offset().top - 73
        }, 1000);
    });

    checkScroll();

    $('.next__screen4').click(function() {
        $('.screen4 .container4').css('display', 'none');
        $('.screen4__slide').css('display', 'block');
        $('.screen4').addClass('isActive');
    });

    $('.next__screen5').click(function() {
        $('.screen5 .container5').css('display', 'none');
        $('.screen5__slide').css('display', 'block');
    });

   

    //form bottom
    $('#submit-b').on('click', function() {
        var nameB = $('#name-b');
        var addressB = $('#address-b');
        var phoneB = $('#phone-b');
        var emailB = $('#email-b');
        var productB = $('#product-b');
        if(!nameB.val() || !addressB.val() || !phoneB.val() || !emailB.val() || !productB.val()){
            alert('Vui lòng điền đầy đủ thông tin trước khi gửi');
        } else {
            var data = {
                name: nameB.val(),
                address: addressB.val(),
                phone: phoneB.val(),
                email: emailB.val(),
                product: productB.val()
            };
            sendForm(data);
            $('#submit-b').prop('disabled', true);
            $('#submit-b').attr('style', 'filter: grayscale(1);');
            $('#submit-b').val('Đang gửi thông tin');
            setTimeout(function(){
                alert('Thành công');
                nameB.val("");
                addressB.val("");
                phoneB.val("");
                emailB.val("");
                productB.val("");
                $('#submit-b').removeAttr('disabled');
                $('#submit-b').removeAttr('style');
                $('#submit-b').val('Đăng ký');
            }, 2000)
        }
    })
});
