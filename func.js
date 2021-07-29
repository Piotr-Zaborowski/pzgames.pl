
const search1 = document.getElementsByClassName("search1");
const search2 = document.getElementsByClassName("search2");

document.addEventListener('DOMContentLoaded', () =>
{
    search1[0].style.display = "none";
    search2[0].style.display = "none";
});

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