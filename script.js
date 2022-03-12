createListItems = (item) => {
    let listItemElement = document.createElement('div')
    listItemElement.id = "list-item-container"

    let fullNameItem = document.createElement('div')
    fullNameItem.id = "list-fullName"

    let fullnameParagraph = document.createElement('p')
    fullnameParagraph.innerHTML = item.fullName
    fullNameItem.append(fullnameParagraph)

    let avatarItem = document.createElement('div')
    avatarItem.id = "list-avatar"
    let image = document.createElement('img')
    image.src = item.imageUrl
    avatarItem.append(image)

    listItemElement.append(fullNameItem)
    listItemElement.append(avatarItem)

    listItemElement.onclick = () => {
        fetchCharacterData(item.id)
       
    }
    return listItemElement; 
}

fillDetailView = (character) => {
    document.getElementById("detail-fullname").innerHTML = character.fullName;
}
fetchCharacterData = async (id) => {
    try{
    const response = await fetch("https://thronesapi.com/api/v2/Characters" + id) 
    const data = await response.json()
    console.log(data)
    fillDetailView(data)
    }catch (error){
        console.error(error)
    }



}


fetchCharacterlist = async () =>{
    let list = document.getElementById('list-container')
    try{
        const response = await fetch("https://thronesapi.com/api/v2/Characters")
        if (!response.ok){
            throw new Error(response.status)
        }
        const data = await response.json()
        console.log(data)

        data.map(item =>{
            const listItem = createListItems(item)
            list.append(listItem)
        })
    } catch(error){
        console.error(error)
    }
}

fetchCharacterlist()