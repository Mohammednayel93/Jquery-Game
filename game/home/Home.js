$(document).ready(function(){

    $('#menuDownIcon').click(function(){
        $('.NavMenu').slideDown();
        $(this).css('display','none');
        $('#menuUpIcon').fadeIn(1000);
    })
    $('#menuUpIcon').on('click',function(){
        $('.NavMenu').fadeOut(1000);
        $(this).css('display','none');
        $('#menuDownIcon').fadeIn(1000);
        });
})
var elem;
var myIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  var y = document.getElementsByClassName("caption");



  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
    y[i].style.display = "none";  

  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1}    
  x[myIndex-1].style.display = "block"; 
  y[myIndex-1].style.display = "block";
  setTimeout(carousel, 3000); // Change image every 2 seconds
}
