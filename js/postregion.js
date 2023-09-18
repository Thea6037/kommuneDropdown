console.log("jeg er i postregion")

const pbPostregion = document.getElementById("pbPostRegion");

const inpKode = document.getElementById("inpKode");
const inpName = document.getElementById("inpName");
const inpHref = document.getElementById("inpHref");

const regionUrl = "http://localhost:8080/region";

async function postRegion()
{
    const region = {};
    region.kode = inpKode.value;
    region.navn = inpName.value;
    region.href = inpHref.value;
    console.log(region);
    const res = await postObjectAsJson(regionUrl, region)
}

async function postObjectAsJson(url, region)
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

pbPostregion.addEventListener('click', actionPostRegion)