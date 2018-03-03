$(document).ready(function() {
$("#submit-button").on("click", function() {
    var quantity = $("#quantity").val();
    var item = $("#submit-button").data("product");
    var data = {
    quantity: $("#quantity").val()
    };
    $.ajax({
    method: "POST",
    data: data,
    url: "/addtocart/tents/" + item
    }).done(function(result) {
    location.href = "/cart";
    });
});
});
