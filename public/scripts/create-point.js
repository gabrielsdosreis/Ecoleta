function populateUFs() {
const ufselect = document.querySelector("select[name=uf]")

fetch ("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
.then ( res => res.json() )
.then( states => {

    for( const state of states ){
        
        ufselect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
    }

   } ) 
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateinput = document.querySelector("[name=state]")
  
    const ufValue = event.target.value

    const indexOfSelectedState = event.target. selectedIndex
    stateinput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
   
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch (url)
.then ( res => res.json() )
.then( cities => {
  
    for( const city of cities ){  
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
    }

    citySelect.disabled = false
   } ) 
}

document
.querySelector("select[name=uf]")
.addEventListener("change", getCities)

// Itens de coleta
// pegar todos os li´s
const itensToCollect = document.querySelectorAll(".itens-grid li")

for (const item of itensToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const  collecteditems = document.querySelector("input[name=items]")

let SelectedItems = []

function handleSelectedItem(event) { 
    const itemLi = event.target
   
    // adicionar ou remover uma classe com javascript
itemLi.classList.toggle("selected")
    
    const itemId = itemLi.dataset.id

 

    // Verificar se existem itens selecionados, se sim
    // pegar os itens selecionados

    const alreadySelected = SelectedItems.findIndex( item => {
        const itemFound = item == itemId // isso será true ou  false
        return itemFound 
    })


    // Se já estiver selecionado 

    if(alreadySelected >=0 ) {
        //tirar da seleção
        const filteredItems = SelectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        } )

        SelectedItems = filteredItems
    } else {
   // se não estiver selecionado,
   // adicionar a seleção
        SelectedItems.push(itemId)
    }

    // atualizar o campo escondido com os dados selecionados
    collecteditems.value = SelectedItems


}