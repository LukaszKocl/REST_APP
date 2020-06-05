
function dataAjax (url, type, method){
    let query = $.ajax({
        url: url,
        type: type,
        dataType: "json"
    })

        if (method == "loading"){
            query.done(function (json) {

                for( let i=0 ; i < json.length; i++){
                    let title = $('<div>');
                    let author = $('<div>');
                    let isbn = $('<div>');
                    let publisher = $('<div>');
                    let genre = $('<div>');
                    let position = $('<div>');
                    let deleteLink = $('<a>');

                    title.attr('id', 'title');
                    title.attr("data-id", json[i].id);
                    author.attr('class', 'details');
                    isbn.attr('class', 'details');
                    publisher.attr('class', 'details');
                    genre.attr('class', 'details');
                    deleteLink.attr('class', 'details');
                    position.attr('id','position');

                    title.text("TYTUŁ: " + json[i].title + " ");
                    deleteLink.text("Usuń książkę");

                    position.append(title);
                    position.append(author);
                    position.append(isbn);
                    position.append(publisher);
                    position.append(genre);
                    position.append(deleteLink);
                    position.append($('<br>'));

                    $('#container').last().append(position);

                    }


                $('a').on("click",function () {

                    let url = "http://127.0.0.1:8000/book/" + this.parentElement.firstElementChild.dataset.id;

                    dataAjax (url, "DELETE", "delete");
                    });


                $('div#position').on('click',function (event) {
                    let childrens = event.currentTarget.children;

                    for (let i = 0 ; i < childrens.length; i++){
                        if (i != 0 && i != childrens.length - 1){
                            childrens[i].classList.toggle('details');
                        }
                    }

                    $.get("http://127.0.0.1:8000/book/" + this.firstElementChild.dataset.id  , function (data) {
                        childrens[1].innerHTML = "Autor: " + data.author;
                        childrens[2].innerHTML = "ISBN: " + data.isbn;
                        childrens[3].innerHTML = "Wydawca: " + data.publisher;
                        childrens[4].innerHTML = "Gatunek: " + data.genre;

                        })
                    })


                console.log("Dane zostały wczytane");

                })

                query.fail(function(xhr, status, err) {
                    alert("Wystąpił błąd");
                });

                query.always(function(xhr, status) {
                        console.log("Koniec działania funkcji");
                })
        } else if (method == "delete"){

            query.done (function () {
                alert("Książka została ustunięta");
                location.reload();
            });

            query.fail(function () {
            alert("Książka nie została usunięta.");
            });
        }

};

$('button').on("click", function (e) {
    e.preventDefault();
    let author = $('input[name="author"]').val();
    let title = $('input[name="title"]').val();
    let isbn = $('input[name="isbn"]').val();
    let publisher = $('input[name="publisher"]').val();
    let genre = $('select[name="genres"]').val();


    if (author != "" && title != "" && isbn != "" && publisher != ""  ){

       var query = $.post("http://127.0.0.1:8000/book/", {author: author, title: title, isbn: isbn, publisher: publisher, genre: genre}, function () {
           alert("Książka " + title + " została dodana do bazy.");
           $('form').submit();
        })

        query.fail(function () {
                alert("Książka nie została dodana.");
            })
    }

});

dataAjax ("http://127.0.0.1:8000/book", "GET", "loading");




