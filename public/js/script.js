$(document).ready(function() {
    $(".buybtn").click(function() {
        let storedvalue = $(this).attr('id')
        console.log(storedvalue)
        localStorage.setItem("products", storedvalue)
        console.log(localStorage.getItem('products'))
    })
})
