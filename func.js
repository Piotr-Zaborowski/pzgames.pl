
const search1 = document.getElementsByClassName("search1");
const search2 = document.getElementsByClassName("search2");

const resViewers = document.getElementsByClassName("res_viewer");

const resImage = document.getElementsByClassName("res_image");
const resTitle = document.getElementsByClassName("res_title");
const resAuthor = document.getElementsByClassName("res_author");
const resDate = document.getElementsByClassName("res_date");
const resDesc = document.getElementsByClassName("res_desc");

document.addEventListener('DOMContentLoaded', () =>
{
    search1[0].style.display = "none";
    search2[0].style.display = "none";
    disableResViewers();
});

function disableResViewers()
{
    for (let x=0; x<7; x++ )
    {
        resViewers[x].style.display = "none";
    }
}

function search1Function() {
    if (search1[0].style.display === "none") {
        search1[0].style.display = "block";
        search2[0].style.display = "none";
    }
}

function search2Function() {
    if (search2[0].style.display === "none") {
        search2[0].style.display = "block";
        search1[0].style.display = "none";
    }
}

var baseURL = "https://www.rijksmuseum.nl/api/en/collection/"
var apiKey = "?key=tdNEiaGJ&imgonly=True&format=json&culture=en&s&ps=7"

function search1func()
{
    let namee = document.getElementById("name").value;
    let url=baseURL + apiKey + "&q=Q".replace("Q", namee);
    fetch(url)
        .then(res => res.json())
        .then(out =>{
            disableResViewers()
            console.log(out.count);
                for (let objArt in out.artObjects)
                {
                    console.log(out.artObjects[objArt].objectNumber)
                    console.log(out.artObjects[objArt].webImage.url)
                    console.log(out.artObjects[objArt].longTitle)

                    let namesArr = out.artObjects[objArt].longTitle.split(',');

                    resViewers[objArt].style.display = "grid";

                    resImage[objArt].src=out.artObjects[objArt].webImage.url;
                    resTitle[objArt].innerHTML="Title: "+out.artObjects[objArt].title;
                    resAuthor[objArt].innerHTML="Author: "+out.artObjects[objArt].principalOrFirstMaker;
                    resDate[objArt].innerHTML="Date: "+namesArr[namesArr.length-1];




                }
            }
        )
        .catch(err => console.log(err));
}

