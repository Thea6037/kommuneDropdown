console.log("jeg er i postregion")

const pbPostregion = document.getElementById("pbPostRegion");
const pbPutRegion = document.getElementById("pbPutRegion");
const pbDeleteRegion = document.getElementById("pbDeleteRegion")

const inpKode = document.getElementById("inpKode");
const inpName = document.getElementById("inpName");
const inpHref = document.getElementById("inpHref");

const regionUrl = "http://localhost:8080/region";

function getRegion()
{
    const region = {};
    region.kode = inpKode.value;
    region.navn = inpName.value;
    region.href = inpHref.value;
    console.log(region);
    return region;
}

async function postRegion()
{
    const region = getRegion();
    const res = await postObjectAsJson(regionUrl, region, "POST")
    if(res.ok)
    {
        alert("Region saved");
    }
}

async function putRegion()
{
    const region = getRegion();
    const putUrl = regionUrl + "/" + region.kode;
    console.log(putUrl)
    const res = await postObjectAsJson(putUrl, region, "PUT")
    if (res.ok)
    {
        alert("Region is changed")
    }
}

async function deleteRegion()
{
    const region = getRegion();
    const deleteUrl = regionUrl + "/" + region.kode;
    console.log(deleteUrl)
    const res = await postObjectAsJson(deleteUrl, region, "DELETE")
    if (res.ok)
    {
        alert("Region is deleted")
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



async function postObjectAsJsonxxx(url, region)
{
    const objectAsJsonString = JSON.stringify(region);
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
        alert("Region saved")
    }

}

function actionPostRegion()
{
    postRegion();
}

function actionPutRegion()
{
    putRegion();
}

function actionDeleteRegion()
{
    deleteRegion();
}

pbPostregion.addEventListener('click', actionPostRegion)
pbPutRegion.addEventListener('click', actionPutRegion)
pbDeleteRegion.addEventListener('click', actionDeleteRegion)
