
const search1 = document.getElementsByClassName("search1");
const search2 = document.getElementsByClassName("search2");

const noRes = document.getElementsByClassName("no_res_class");

const resViewers = document.getElementsByClassName("res_viewer");

const resImage = document.getElementsByClassName("res_image");
const resTitle = document.getElementsByClassName("res_title");
const resAuthor = document.getElementsByClassName("res_author");
const resDate = document.getElementsByClassName("res_date");

const resDesc = document.getElementsByClassName("res_desc");
const resDescDet = document.getElementsByClassName("res_desc_det");
const resDescExt = document.getElementsByClassName("res_desc_ext");

const bottomPagePanel = document.getElementsByClassName("page_selector");

document.addEventListener('DOMContentLoaded', () =>
{
    search1[0].style.display = "none";
    search2[0].style.display = "none";
    disableResViewers();
});


function disableResViewers()
{
    noRes[0].style.display = "none";
    for (let x=0; x<7; x++ )
    {
        resViewers[x].style.display = "none";
        resDescDet[x].style.display = "none";
        resDescDet[x].removeAttribute("open");

    }
    bottomPagePanel[0].style.display = "none";
}

function updatePage(ele)
{
    if(event.key === 'Enter') {
        let num = ele.value.replace(/[^0-9]/g,'');
        changePage(num);
    }
}


function search1Function() {
    noRes[0].style.display = "none";
    if (search1[0].style.display === "none") {
        search1[0].style.display = "block";
        search2[0].style.display = "none";
    }
}

function search2Function() {
    noRes[0].style.display = "none";
    if (search2[0].style.display === "none") {
        search2[0].style.display = "block";
        search1[0].style.display = "none";
    }
}

let key="?key=tdNEiaGJ";

let baseURL = "https://www.rijksmuseum.nl/api/en/collection/"
let apiKey = key+"&imgonly=True&format=json&culture=en&s&ps=7&p=1"

let completeUrl="";

let pageNumber=1;
let totalPages=1;

function changeNumerator(page)
{
    document.getElementById("pagee").value=pageNumber;
    document.getElementById("page_selector_text2").innerText="/"+totalPages;
}

function goToFirst()
{
    changePage(1);
}

function goToPrev()
{
    changePage(--pageNumber);
}

function goToLast()
{
    changePage(totalPages);
}

function goToNext()
{
    changePage(++pageNumber);
}

function changePage(page)
{
    if(page<1) page=1;
    if(page>totalPages) page=totalPages;
    pageNumber=page;
    //changeNumerator(page);
    let tempUrl = completeUrl.replace("&ps=7&p=1","&ps=7&p="+page);
    searchByUrl(tempUrl);
}

function search1func()
{
    pageNumber=1;
    let searchByTitle = document.getElementById("name").value;
    let searchByDesc = document.getElementById("description").value;
    let url=baseURL + apiKey + "&title=Q".replace("Q", searchByTitle)+"&text=Q".replace("Q",searchByDesc);
    completeUrl=url;
    searchByUrl(url);
}

function search2func()
{
    pageNumber=1;
    let searchBy = document.getElementById("form2name").value;
    console.log(searchBy)
    let url=baseURL + apiKey + "&involvedMaker=Q".replace("Q", searchBy);
    completeUrl=url;
    searchByUrl(url);
}

function searchByUrl(url)
{
    //console.log(url);
    objArtNumberArr = [];
    fetch(url)
        .then(res => res.json())
        .then(out =>{
                disableResViewers()
                if(out.count==0)
                {
                    noRes[0].style.display = "block";
                }
                if(out.count>7)
                {
                    bottomPagePanel[0].style.display = "grid";
                    if(pageNumber==1)
                    {
                        totalPages=Math.ceil(out.count/7);
                        if(totalPages>1428)
                        {
                            totalPages=1428; //Implemented due to API restrictions
                        }
                    }
                    changeNumerator(pageNumber);
                    //console.log(pageNumber);
                }

                for (let objArt in out.artObjects)
                {
                    let objNumber=out.artObjects[objArt].objectNumber;
                    //console.log(objNumber)
                    objArtNumberArr.push(objNumber);

                    //console.log(out.artObjects[objArt].webImage.url)
                    //console.log(out.artObjects[objArt].longTitle)

                    let namesArr = out.artObjects[objArt].longTitle.split(',');

                    resViewers[objArt].style.display = "grid";

                    resImage[objArt].src=out.artObjects[objArt].webImage.url;
                    resTitle[objArt].innerHTML="Title: "+out.artObjects[objArt].title;
                    resAuthor[objArt].innerHTML="Author: "+out.artObjects[objArt].principalOrFirstMaker;
                    resDate[objArt].innerHTML="Date: "+namesArr[namesArr.length-1];

                }
                //return 1;
            }
        )
        .then(out=>
        {
            getDescription();
        })
        .catch(err => console.log(err));
}


function getDescription()
{
    for (let X in objArtNumberArr)
    {
        let collectionDataUrl = baseURL+objArtNumberArr[X]+key;
        resDesc[X].innerHTML="Description: ";
        //console.log(collectionDataUrl);
        fetch(collectionDataUrl)
            .then(res => res.json())
            .then(out =>{
                let fullDesc = out.artObject.description;
                    if(fullDesc==null)
                    {
                        resDesc[X].innerHTML="Description: No data";
                    }
                    else {
                        let index = fullDesc.indexOf(". ");
                        if(index==-1)
                        {
                            resDesc[X].innerHTML="Description: "+fullDesc;
                        }
                        else
                        {
                            let firstPart=fullDesc.substr(0, index+1);
                            let secondPart=fullDesc.substr(index + 1);
                            resDesc[X].innerHTML="Description: "+firstPart;
                            resDescDet[X].style.display = "block";
                            resDescExt[X].innerHTML=secondPart;
                        }
                    }
                }
            )
            .catch(err =>
            {
                console.log(err);
                resDesc[X].innerHTML="Description: Cannot get data from server";
            });
    }
}

var modal = document.getElementById("myModal");
var modalImg = document.getElementById("img01");
function showModal(elem){
    modal.style.display = "block";
    modalImg.src = elem.src;
}

var closeButton = document.getElementsByClassName("close")[0];
closeButton.onclick = function() {
    modal.style.display = "none";
}



