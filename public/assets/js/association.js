function getAssociationComments() {
    var carousel = document.querySelector(".associationTestimonials");
    fetch("/v1/comments").then(function(response) {
        return response.json();
    }).then(function(comments) {        
        a=0;
        for(var i=0; i<comments.length; i++) {
            if(comments[i].person_id==null && a<2) {
                a++;
                var carouselComment = document.createElement("div");
                carouselComment.classList.add("carousel-item", "carouselComment");
                if(a==1){
                    carouselComment.classList.add("active");
                }
                var row = document.createElement("div");
                row.classList.add("row", "align-items-center");
                var firstCol = document.createElement("div");
                firstCol.classList.add("col-md-4");
                var secondCol = document.createElement("div");
                secondCol.classList.add("col-md-8");
                var studentName = document.createElement("p");
                studentName.classList.add("overline");
                var commentDate = document.createElement("p");
                commentDate.classList.add("peoplecaption");
                var studentPhoto = document.createElement("img");
                var studentComment = document.createElement("p");
                studentComment.classList.add("bquote");
                let {student_name, text, date, photo} = comments[i];
                studentPhoto.src = `${photo}`;
                studentPhoto.setAttribute("alt", student_name.concat(" image"));
                studentName.innerHTML = `${student_name}`;
                var commentYear = `${date}`.slice(0,4);
                commentDate.innerHTML = "Student ".concat(commentYear);
                studentComment.innerHTML = `${text}`;
                carousel.appendChild(carouselComment);
                carouselComment.appendChild(row);
                row.appendChild(firstCol);
                firstCol.appendChild(studentPhoto);
                firstCol.appendChild(studentName);
                firstCol.appendChild(commentDate);
                row.appendChild(secondCol);
                secondCol.appendChild(studentComment);

                // add controls
                var controls = document.querySelector(".carousel-indicators");
                var controller = document.createElement("li");
                controller.dataset.target = "#carouselIndicatorsTestimonials";
                controller.setAttribute('data-slide-to', (a-1).toString());
                if(a==1){
                    controller.classList.add("active");
                }
                controls.appendChild(controller);
            }
        }
        
    })
}

window.onload = function() {
    this.getAssociationComments();
}