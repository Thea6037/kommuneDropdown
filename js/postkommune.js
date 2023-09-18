console.log("jeg er i postkommune")

const pbPostkommune = document.getElementById("pbPostKommune");
const pbPutkommune = document.getElementById("pbPutKommune");

const inpKode = document.getElementById("inpKode");
const inpName = document.getElementById("inpName");
const inpHref = document.getElementById("inpHref");
const inpRegionKode = document.getElementById("inpRegionKode")

const kommuneUrl = "http://localhost:8080/kommune";

function getkommune()
{
    const kommune = {};
    kommune.kode = inpKode.value;
    kommune.navn = inpName.value;
    kommune.href = inpHref.value;
    kommune.region= {}
    kommune.region.kode = inpRegionKode.value;
    console.log(kommune);
    return kommune;
}

async function postkommune()
{
    const kommune = getkommune();
    const res = await postObjectAsJson(kommuneUrl, kommune, "POST")
    if(res.ok)
    {
        alert("kommune saved");
    }
}

async function putkommune()
{
    const kommune = getkommune();
    const putUrl = kommuneUrl + "/" + kommune.kode;
    console.log(putUrl)
    const res = await postObjectAsJson(putUrl, kommune, "PUT")
    if (res.ok)
    {
        alert("kommune is changed")
    }
}

async function postObjectAsJson(url, object, httpVerbum) {
    const objectAsJsonString = JSON.stringify(object);
    console.log(objectAsJsonString);
    const fetchOptions = {
        method: httpVerbum,
        headers: {
            "Content-Type": "application/json",
        },
        body: objectAsJsonString
    }

    const response = await fetch(url, fetchOptions)
    return response;

}



async function postObjectAsJsonxxx(url, kommune)
{
    const objectAsJsonString = JSON.stringify(kommune);
    console.log(objectAsJsonString);
    const fetchOptions = {
        method: "POST", //http verbum
        headers: {
            "Content-Type": "application/json",
        },
        body: objectAsJsonString
    }

    const response = await fetch(url, fetchOptions)

    if(!response.ok)
    {
        const errorMessage = await response.text()
        throw new Error(errorMessage);
    } else
    {
        alert("kommune saved")
    }

}

function actionPostkommune()
{
    postkommune();
}

function actionPutkommune()
{
    putkommune();
}

pbPostkommune.addEventListener('click', actionPostkommune)
pbPutkommune.addEventListener('click', actionPutkommune)