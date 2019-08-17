// import { ADD_DECK, GET_DECK, UPDATE_DECK} from '../actionTypes';
import axios from 'axios'

export const ADD_DECK = 'ADD_DECK';
export function addDeck(user, name, url){

    const deck = {
        name,
        url,
        userId: user.id
    }

}