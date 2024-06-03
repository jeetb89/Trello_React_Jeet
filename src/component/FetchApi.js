const keyValue = "eae633dae6fa76a149ad9223c1a2c552";
const tokenValue = "ATTA07a64511c9fd8ab2e80abcea1105c3e240d0b1e1cd98104ccf3a0f990634655d0734081C";

import axios from "axios";


export function FetchApi(boardId) {
   return    axios
    .get(
        `https://api.trello.com/1/boards/${boardId}/lists?key=${keyValue}&token=${tokenValue}`
     )
     .then((response) => {
        
       return response.data
    })
     .catch((error) => {
       console.error("There was an error creating the board!", error);
     });   
}

export function getAllBoard(){

  return  axios
   .get(
       `https://api.trello.com/1/members/me/boards?key=${keyValue}&token=${tokenValue}`
    )
    .then((response) => {
       
      return response.data
   })
    .catch((error) => {
      console.error("There was an error creating the board!", error);
    });
}


export function createBoard(nameOfBoard){
   
   return axios
    .post(
       `https://api.trello.com/1/boards/?name=${nameOfBoard}&key=${keyValue}&token=${tokenValue}`
     )
     .then((response) => {
       console.log(response.status, response.data);
     })
     .catch((error) => {
       console.error("There was an error creating the board!", error);
     });

}


export function getCards(listId) {
    return axios.get(
      `https://api.trello.com/1/lists/${listId}/cards?key=${keyValue}&token=${tokenValue}`
    )
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log("Error getting card info:", error.message);
      });
  }


  export function createCards(cardName, listId) {
    
    return axios.post(`https://api.trello.com/1/cards?key=${keyValue}&token=${tokenValue}`, 
    { name: cardName, idList: listId })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
    
  }

  export function createLists(listName, boardId) {
    return axios.post(
      `https://api.trello.com/1/lists?key=${keyValue}&token=${tokenValue}`,
      { name: listName, idBoard: boardId }
    ) .then((response) => {
      return response.data
    })
    .catch((error) => {
      console.log("Error getting card info:", error.message);
    });
  }

  export function deleteList(listId) {
    return axios.put(
      `https://api.trello.com/1/lists/${listId}/closed?key=${keyValue}&token=${tokenValue}`,
      { value: true}
    ).then((response)=> { 
        return response.data
      })
    .catch((error) => {
      console.log("Error getting card info:", error.message);
    });
  }

  export function deleteCard(cardid) {
    return axios.delete(
      `https://api.trello.com/1/cards/${cardid}?key=${keyValue}&token=${tokenValue}`
    ).then((response)=> { 
      console.log(response.data);
    })
     .catch((error) => {
       console.log("Error getting card info:", error.message);
     });
  }

  export function getCheckList(cardId){

    return axios.get(`https://api.trello.com/1/cards/${cardId}/checklists?key=${keyValue}&token=${tokenValue}`
    ).then((response)=> { 
      // console.log(response.data);
      return response.data;
    })
     .catch((error) => {
       console.log("Error getting card info:", error.message);
     });
  }

  export function createCheckList(cardId,checkListName){
      return axios.post(`https://api.trello.com/1/checklists?idCard=${cardId}&key=${keyValue}&token=${tokenValue}`,
     {name:checkListName}
    ).then((response)=> { 
      return response.data;
    })
     .catch((error) => {
       console.log("Error getting card info:", error.message);
     });

  }

  export  function deleteCheckList(checkListId){
      return axios.delete(`https://api.trello.com/1/checklists/${checkListId}?key=${keyValue}&token=${tokenValue}`) 
       .catch((error) => {
         console.log("Error getting card info:", error.message);
       });
  }

  export function getCheckItems(checkListId){

    return axios.get(`https://api.trello.com/1/checklists/${checkListId}/checkItems?key=${keyValue}&token=${tokenValue}`)
    .then((response)=>{
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log("Error getting card info:", error.message);
    });
  }

  export function createCheckItem(checkListId,checkItemName){
      return axios.post(`https://api.trello.com/1/checklists/${checkListId}/checkItems?name=${checkItemName}&key=${keyValue}&token=${tokenValue}`)
    .then((response)=> { 
      // console.log(response.data);
      return response.data;
    })
     .catch((error) => {
       console.log("Error getting card info:", error.message);
     });

  }

  export function deleteCheckItem(checkListId,idCheckItem){
       return axios.delete(`https://api.trello.com/1/checklists/${checkListId}/checkItems/${idCheckItem}?key=${keyValue}&token=${tokenValue}`)
      
       .catch((error) => {
        console.log("Error getting card info:", error.message);
      });
  }

  export function changeItemCheckbox(cardId,checkItemId,newState){
         console.log(newState);
        return axios.put(`https://api.trello.com/1/cards/${cardId}/checkItem/${checkItemId}?key=${keyValue}&token=${tokenValue}`,
           {state:newState}
         )
        .then((response)=> { 
          console.log(response.data);
          // return response.data;
        })
        .catch((error) => {
          console.log("Error getting card info:", error.message);
        });
  } 