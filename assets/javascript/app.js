$(document).ready(function(){

    var fruit = ["apples", "watermelon", "cantelope", "strawberry", "kiwi", "mango", "grapes"];


    function fruitButtons( arr, addtoElement, addToClass){
        $(addtoElement).empty()
        for (var i=0; i<arr.length; i++){
            var whatever = $("<button>");
            whatever.addClass(addToClass);
            whatever.attr("data-type", arr[i]);
            whatever.text(arr[i]);
            $("#gifButtons").append(whatever)
        }
    }


    $(document).on("click", ".gifButts" , function(){
        $("#gifs").empty();
        $(".gifButts").removeClass("active");
        $(this).addClass("active");
        var type = $(this).attr("data-type");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(res){
            console.log(res.data);
            var results = res.data;

            results.forEach(function(u){
                var gifDiv = $("<div class=gif-item>");
                var rating = u.rating;
                
                var p = $("<p>").text("Rating:" + rating);
                var animated = u.images.fixed_height.url;
                var still = u.images.fixed_height_still.url;
                console.log(animated, still);

                var pImg = $("<img>");
                pImg.attr("src", still)
                pImg.attr("data-still", still);
                pImg.attr("data-animated", animated);
                pImg.attr("data-state", "still");
                pImg.addClass("pImg");

                
                


                $("#gifs").append(p);
                $("#gifs").append(pImg);
               
            })

        })
       

        
    });

    $(document).on("click", ".pImg" , function(){

        var state = $(this).attr("data-state");

        if ( state = "still"){
            var animatedGif = $(this).attr("data-animated");
            $(this).attr("src", animatedGif);
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    $("#inputBtn").on('click', function(){
        event.preventDefault();
        var inputText = $("#gifInput").val()
        console.log(inputText);
        var newBtn = $("<button>");
        newBtn.attr("data-type", inputText);
        newBtn.addClass("gifButts");
        newBtn.text(inputText);
        $("#gifButtons").append(newBtn);

    



    })



    fruitButtons( fruit, "#gifButtons", "gifButts");










    
});