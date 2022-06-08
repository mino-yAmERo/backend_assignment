$(document).ready(function () {
    $('.cart-container').hide();
    $('.order-container').hide();  
    const xhttp = new XMLHttpRequest();
    var url = "http://localhost:3000/product"
    var table;
    var cart;
    xhttp.open('GET',url);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            let myJSON = JSON.parse(this.responseText);
            console.log(myJSON);
            
            table = $('#productTable').DataTable({
                'paging': true,
                'searching': true,
                'responsive':true,
                'lengthMenu': [10,20,50],
                'data': myJSON,
                'columns': [
                    {data : 'id', "title" : "Product ID"},
                    {data : 'gender', "title" : "Gender"},
                    {data : 'size', "title" : "Size"},
                    {data : 'style', "title" : "Style"},
                    {data : 'substyle'},
                    {data : 'price',"title" : "Price"},
                ]
            });
            
        }
    }   
    $('#productTable tbody').on('click', 'tr', function () {
        
        var product = table.row(this).data();

        console.log(product);
        //Sweet alert
        Swal.fire({
            title: 'Are you sure?',
            html: "Would you like to add this to cart? <br><br> Product ID : "+product.id+"<br>Gender : "+product.gender+"<br>Size : "+product.size+"<br>Style : "+product.style+" "+product.substyle+"<br>Price : "+product.price+"" ,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: 'limegreen',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, I got it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Success',
                    'This product has been added to cart.',
                    'success'
                )
                var data = {
                    "id": product.id,
                    "gender":product.gender,
                    "size": product.size,
                    "style": product.style,
                    "substyle" :product.substyle,
                    "price" : product.price
                }
            
                $.ajax({
                    url: 'http://localhost:3000/product/addCart',
                    type: 'POST',
                    data: data,
                    success: function (result) {
                        $('.cart-container').show();
                        $('.order-container').show();   
                        var sum = 0;
                        $.each(result, function(key, value) {
                            sum += parseFloat(value.price);
                            console.log('sum : '+sum)
                        })
                        $('#totalPrice').text(sum);
                        
                        productJSON = result;
                        if ( $.fn.dataTable.isDataTable( '#cartTable' ) ) {
                            cart.destroy();
                        } 

                        cart = $('#cartTable').DataTable({
                            'paging': false,
                            'searching': false,
                            'responsive':true,
                            'info':false,
                            
                            'data': productJSON,
                            'columns': [
                                {data : 'id', "title" : "Product ID"},
                                {data : 'gender', "title" : "Gender"},
                                {data : 'size', "title" : "Size"},
                                {data : 'style', "title" : "Style"},
                                {data : 'substyle'},
                                {data : 'price',"title" : "Price"},
                            ]
                        });
                        
                    }
                });
        }
    })

        //add class selected
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });


    $.ajax({
        url: 'http://localhost:3000/product/getCart',
        type: 'get',
        success: function (result) {
            var sum = 0;
            $.each(result, function(key, value) {
                sum += parseFloat(value.price);
                console.log('sum : '+sum)
            })
            $('#totalPrice').text(sum);
            productJSON = result;
            
            if ( $.fn.dataTable.isDataTable( '#cartTable' ) ) {
                cart.destroy();
            } 
            if (result.length > 0)  {
                $('.cart-container').show();
                $('.order-container').show(); 
            }
            cart = $('#cartTable').DataTable({
                'paging': false,
                'searching': false,
                'responsive':true,
                'info':false,
                
                'data': productJSON,
                'columns': [
                    {data : 'id', "title" : "Product ID"},
                    {data : 'gender', "title" : "Gender"},
                    {data : 'size', "title" : "Size"},
                    {data : 'style', "title" : "Style"},
                    {data : 'substyle'},
                    {data : 'price',"title" : "Price"},
                ]
            });
            
        }
    });
    
    $('#testBtn').on('click', function () {

        if ($('#address').val() === "") {
            Swal.fire(
                'Warning',
                'Please fill out the address',
                'warning',
                )
            return;
        }
        console.log('AJAX CALLED');
        $.ajax({
            url: 'http://localhost:3000/product/createOrder',
            type: 'POST',
            data: {
                "address": $('#address').val(),
                "totalPrice": $('#totalPrice').text(),
            },
            success: function (result) {
                console.log(result);
                if (result) {
                    Swal.fire('',
                    'Your order has been created',
                    'success',);
                }
                cart.destroy();
                $('#address').val('');
                $('#cartTable').empty();
                $('.cart-container').hide();
                $('.order-container').hide();
            }
        });
    });
    
});




// function showAllProducts() {
//     const xhttp = new XMLHttpRequest();
//     var url = "http://localhost:3000/product"
//     xhttp.open('GET',url);
//     xhttp.send();
//     xhttp.onreadystatechange = function() {
//         if(this.readyState == 4 && this.status == 200) {
//             console.log(this.responseText);
//             let myJSON = JSON.parse(this.responseText);
//             console.log(myJSON);
//             document.getElementById('textAll'). innerHTML = this.responseText;
//         }
//     }
    
// }
// function showProductbyID() {
//     let id = document.getElementById('productID').value;
//     console.log('id : '+id);
//     if (100 - id > 90) {
//         id = '00'+id;
//     } else if (100 - id <= 90) {
//         id = '0'+id;
//     }
//     var url = "http://localhost:3000/product/id/"+id ;
//     console.log('after check : '+id);
//     console.log('url : '+url);
//     const xhttp = new XMLHttpRequest();
//     xhttp.open('GET',url);
//     xhttp.send();
//     xhttp.onreadystatechange = function() {
//         if(this.readyState == 4 && this.status == 200) {
//             console.log(this.responseText);
//             let myJSON = JSON.parse(this.responseText);
//             console.log(myJSON);
//             document.getElementById('textID'). innerHTML = this.responseText;
//             console.log('Type of res : '+typeof(this.responseText));
            
//             if(myJSON.length === 0) document.getElementById('textID'). innerHTML = " Sorry, I Couldn't find this product ID";
//         }
//     }
// }
// function showProductbyGender() {
//     let selectGender = document.getElementById('productGender').value;
//     console.log(selectGender);

//     if (selectGender === "") {
//         document.getElementById('textGender').innerHTML = "Please select your gender";
//         return;
//     }
//     var url = "http://localhost:3000/product/gender/"+selectGender ;
//     const xhttp = new XMLHttpRequest();
//     xhttp.open('GET',url);
//     xhttp.send();
//     xhttp.onreadystatechange = function() {
//         if(this.readyState == 4 && this.status == 200) {
//             console.log(this.responseText);
//             let myJSON = JSON.parse(this.responseText);
//             console.log(myJSON);
//             document.getElementById('textGender'). innerHTML = this.responseText;
            
//         }
//     }
// }

// function showProductbySize() {
//     let selectSize = document.getElementById('productSize').value;
//     console.log(selectSize);

//     if (selectSize === "") {
//         document.getElementById('textGender').innerHTML = "Please select your size";
//         return;
//     }
//     var url = "http://localhost:3000/product/size/"+selectSize ;
//     const xhttp = new XMLHttpRequest();
//     xhttp.open('GET',url);
//     xhttp.send();
//     xhttp.onreadystatechange = function() {
//         if(this.readyState == 4 && this.status == 200) {
//             console.log(this.responseText);
//             let myJSON = JSON.parse(this.responseText);
//             console.log(myJSON);
//             document.getElementById('textSize'). innerHTML = this.responseText;
            
//         }
//     }
// }

// function showProductbyStyle() {
//     let selectStyle = document.getElementById('productStyle').value;
//     console.log(selectStyle);

//     if (selectStyle === "") {
//         document.getElementById('textStyle').innerHTML = "Please select your style";
//         return;
//     }
//     var type = selectStyle.slice(0,3);
//     var subtype = selectStyle.slice(4);
//     console.log('Type : '+type+ ' Sub type : '+subtype );

//     var url = "http://localhost:3000/product/style/"+type+"/"+subtype ;
//     console.log('url : '+url);
//     const xhttp = new XMLHttpRequest();
//     xhttp.open('GET',url);
//     xhttp.send();
//     xhttp.onreadystatechange = function() {
//         if(this.readyState == 4 && this.status == 200) {
//             console.log(this.responseText);
//             let myJSON = JSON.parse(this.responseText);
//             console.log(myJSON);
//             document.getElementById('textStyle'). innerHTML = this.responseText;
            
//             if(myJSON.length === 0) document.getElementById('textStyle'). innerHTML = " Sorry, I Couldn't find this product style"
//         }
//     }
// }
