const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const courseId = urlParams.get('id');
var limit = 5;
var offset = 0;

function getCourseResources() {
    fetch("/v1/courses/".concat(courseId).concat("/resources?limit=").concat(limit).concat("&offset=").concat(offset)).then(function(response) {
        return response.json();
    }).then(function(resources) {
        offset+=5;
        document.querySelector(".onlineButton").href = "./course.html?id=".concat(courseId);
        var resourcesContainer = document.querySelector("#resourcesContainer");
        for(var i=0; i<resources.length; i++){
            var resourceRow = document.createElement("div");
            resourceRow.classList.add("row", "resourceRow");
            var firstCol = document.createElement("div");
            firstCol.classList.add("col-7");
            var title = document.createElement("p");
            title.innerHTML = resources[i].title;
            firstCol.appendChild(title);
            var secondCol = document.createElement("div");
            secondCol.classList.add("col");
            var downloadLink = document.createElement("a");
            downloadLink.href = resources[i].url;
            downloadLink.setAttribute("target", "_blank");
            var downloadTitle = document.createElement("p");
            downloadTitle.classList.add("d-none", "d-md-inline-block");
            downloadTitle.innerHTML = "Link";
            var downloadIcon = document.createElement("i");
            downloadIcon.classList.add("far", "fa-arrow-alt-circle-down");
            downloadLink.appendChild(downloadTitle);
            downloadLink.appendChild(downloadIcon);
            secondCol.appendChild(downloadLink);
            var thirdCol = document.createElement("div");
            thirdCol.classList.add("col-auto");
            var CERFlevel = document.createElement("div");
            CERFlevel.classList.add("CERFlevel");
            var CERFlevelPar = document.createElement("p");
            CERFlevelPar.classList.add("CERFlevelPar");
            CERFlevelPar.innerHTML = resources[i].cerf_level;
            CERFlevel.appendChild(CERFlevelPar);
            thirdCol.appendChild(CERFlevel);
            resourceRow.appendChild(firstCol);
            resourceRow.appendChild(secondCol);
            resourceRow.appendChild(thirdCol);
            resourcesContainer.appendChild(resourceRow);
        }
        if(i<limit){
            document.querySelector("#loadButton").style.display = "none";
        }
    })
}

function loadMoreButton(){
    fetch("/v1/courses/".concat(courseId).concat("/resources")).then(function(response) {
        return response.json();
    }).then(function(resources) {
        if(resources.length>4){
                var loadButton = document.createElement("a");
                loadButton.addEventListener("click", getCourseResources);
                loadButton.classList.add("btn");
                loadButton.setAttribute("id", "loadButton");
                loadButton.setAttribute("role", "button");
                loadButton.innerHTML = "Load more ";
                var loadIcon = document.createElement("i");
                loadIcon.classList.add("fas", "fa-long-arrow-alt-down");
                loadButton.appendChild(loadIcon);
                resourcesContainer.after(loadButton);
            }
    })
}

function getCourseLevel() {
    fetch("/v1/courses/".concat(courseId)).then(function(response) {
        return response.json();
    }).then(function(course) {
        document.querySelector("title").innerHTML = course.level.concat(" course's resources");
        document.querySelector("#courseBreadcrumb a").href = "./course.html?id=".concat(courseId);
        document.querySelector("#courseBreadcrumb a").innerHTML = course.level.concat(" course");
        document.querySelector("#resourcePar h6").innerHTML = (course.level).concat(" course");
    })
}

window.onload = function() {
    this.getCourseResources();
    this.loadMoreButton();
    this.getCourseLevel();
}