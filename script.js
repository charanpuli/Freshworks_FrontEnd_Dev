window.addEventListener('load', () => {
    var x = document.getElementById("error");
      x.style.display = "none";
    document.getElementById("search-bar")
        .addEventListener("keyup", (event) =>{
            event.preventDefault();
            countrysearch();
    });
});
function countrysearch(){
    var x = document.getElementById("error");
      x.style.display = "none";
    let search = document.getElementById("search-bar").value;
    var check = document.querySelector(".countries select")[document.querySelector(".countries select").selectedIndex].innerHTML;
    console.log(check);
    let baseurl;
    if(check == 'NAME')
    {
        baseurl = "https://restcountries.eu/rest/v2/name/" + search;
        console.log(baseurl);
    }
    if(check == 'CODE')
    {
    baseurl = "https://restcountries.eu/rest/v2/alpha/" + search;
    console.log(baseurl);
    }
    if(check == 'CURRENCY')
    {
    baseurl = "https://restcountries.eu/rest/v2/currency/" + search;
    console.log(baseurl);
    }
    if(check == 'LANGUAGE')
    {
    baseurl = "https://restcountries.eu/rest/v2/lang/" + search;
    }
    if(check == 'CAPITAL CITY')
    {
    baseurl = "https://restcountries.eu/rest/v2/capital/" + search;
    console.log(baseurl);
    }
    if(check == 'CALLING CODE')
    {
    baseurl = "https://restcountries.eu/rest/v2/callingcode/" + search;
    console.log(baseurl);
    }
    if(check == 'REGION')
    {
    baseurl = "https://restcountries.eu/rest/v2/region/" + search;
    console.log(baseurl);
    }
    if(check == 'REGION BLOC')
    {
    baseurl = "https://restcountries.eu/rest/v2/regionalbloc/" + search;
    console.log(baseurl);
    }
    fetch(baseurl).then((response) => {
        if(response.status === 200)
            return response.json();
       else
       {
        const searchdata = document.getElementById("search-results")
        while(searchdata.firstChild){
            searchdata.removeChild(searchdata.firstChild)
        }
        // alert("No Country Found!!");
        var x = document.getElementById("error");
        if (x.style.display === "none") {
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }
        throw new Error("Data not found!!");
       }
    }).then(response => {
        //Todo dispaly search results
        console.log(response);
        const searchdata = document.getElementById("search-results")
    while(searchdata.firstChild){
        searchdata.removeChild(searchdata.firstChild)
    }
    for(i=0; i<response.length; i++){
        let card = document.createElement("div");
        card.className = "card";

        let flagimage = document.createElement("img");
        flagimage.setAttribute("src", response[i]["flag"]);
        flagimage.className = "flagimage";
        card.appendChild(flagimage);
        
        let countryname = document.createElement("h4");
        countryname.innerHTML = response[i]["name"];
        countryname.className = "countryname";
        card.appendChild(countryname);
        
        let cardlink = document.createElement("a");
        cardlink.className = "a";
        cardlink.setAttribute("href", "countrytable.htm?countryname="+JSON.stringify(response[i]));
        cardlink.appendChild(card);

        searchdata.appendChild(cardlink);
    }
    
    }).catch(error => {
        //Todo Report Error to user
        console.error(error);
    })
}