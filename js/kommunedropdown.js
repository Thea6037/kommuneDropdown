const urlKommune = "https://api.dataforsyningen.dk/kommuner";
const select = document.getElementById("ddKommuner");
const fillDrop = document.getElementById("pbFillKommuner")
const searchInput = document.getElementById("userInput")
const searchOptions = document.getElementById("searchOptions")

let kommuneArr;

function fetchAnyUrl(url)
{
    console.log("inside fetch url = " + url)
    return fetch(url).then(response => response.json())
}

function fillDropdown(item)
{
    const el = document.createElement("option")
    el.textContent = item.navn
    el.value = item.navn
    select.appendChild(el)

}

async function fetchKommuner(any)
{
    select.innerHTML = '';
    kommuneArr = await fetchAnyUrl(urlKommune)
    console.log(kommuneArr)
    kommuneArr.forEach(fillDropdown)
    kommuneArr.forEach(fillInputField)
}

function selectedKommune()
{
    const selectedOption = select.options[select.selectedIndex]
    select.value = selectedOption.value
}

function removeKommuneFromArr(option)
{
    for (let i = 0; i < kommuneArr.length; i++) {
        if (kommuneArr[i].navn === option.navn) {
            kommuneArr.splice(i, 1);
            break;
        }
    }
}

function createATag(option)
{
        searchInput.value = option.navn;
        searchOptions.innerHTML = "";
        const aTag = document.createElement('a')
        aTag.textContent = option.navn
        aTag.href = option.href
        document.body.appendChild(aTag);

        removeKommuneFromArr(option);
}

function getUserInput() {
    const userInput = searchInput.value;
    searchOptions.innerHTML = "";
    if (userInput.length > 0) {
        kommuneArr.forEach(option => {
            if (option.navn.toLowerCase().includes(userInput.toLowerCase())) {
                const optionIndex = document.createElement('div');
                optionIndex.textContent = option.navn;
                optionIndex.addEventListener('click', () => createATag(option));
                searchOptions.appendChild(optionIndex);
            }
        });
    }
}

select.addEventListener('change', selectedKommune)
fillDrop.addEventListener('click', fetchKommuner)
searchInput.addEventListener('input', getUserInput)
