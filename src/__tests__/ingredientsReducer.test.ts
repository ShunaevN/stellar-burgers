import ingredientsReducer, { getIngredients } from '../services/slices/ingridients';

describe('Проверяют редьюсер слайса [ingredintst]', () => {
    // начальное состояние, которое будем менять в тестах
        
    it('обработку экшена Request в слайсе ингредиента', () => {
        
        
        const payloadIngredients = [
            {   
                "id": "1",
                "_id": "643d69a5c3f7b9001cfa093c",
                "name": "Краторная булка N-200i",
                "type": "bun",
                "proteins": 80,
                "fat": 24,
                "carbohydrates": 53,
                "calories": 420,
                "price": 1255,
                "image": "https://code.s3.yandex.net/react/code/bun-02.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
                "__v": 0
            },
            {
                "id": "2",
                "_id": "643d69a5c3f7b9001cfa0941",
                "name": "Биокотлета из марсианской Магнолии",
                "type": "main",
                "proteins": 420,
                "fat": 142,
                "carbohydrates": 242,
                "calories": 4242,
                "price": 424,
                "image": "https://code.s3.yandex.net/react/code/meat-01.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
                "__v": 0
            }

        ]

        const state = 
            {
            ingredients: [],
            isLoading: true,
            error: null,
        }


        expect(ingredientsReducer(undefined, {
            type: getIngredients.pending.type, payload: {payloadIngredients}})).toEqual(state);
    });
    
    it('обработку экшена Success в слайсе ингредиента', () => {
        
        
        const payloadIngredients = [
            {   
                "id": "1",
                "_id": "643d69a5c3f7b9001cfa093c",
                "name": "Краторная булка N-200i",
                "type": "bun",
                "proteins": 80,
                "fat": 24,
                "carbohydrates": 53,
                "calories": 420,
                "price": 1255,
                "image": "https://code.s3.yandex.net/react/code/bun-02.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
                "__v": 0
            },
            {
                "id": "2",
                "_id": "643d69a5c3f7b9001cfa0941",
                "name": "Биокотлета из марсианской Магнолии",
                "type": "main",
                "proteins": 420,
                "fat": 142,
                "carbohydrates": 242,
                "calories": 4242,
                "price": 424,
                "image": "https://code.s3.yandex.net/react/code/meat-01.png",
                "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
                "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
                "__v": 0
            }

        ]

        const state = 
            {
            ingredients: {
                payloadIngredients: payloadIngredients
            },
            isLoading: false,
            error: null,
        }


        expect(ingredientsReducer(undefined, {
            type: getIngredients.fulfilled.type, payload: {payloadIngredients}})).toEqual(state);
        
    });

    it('обработку экшена Failed в слайсе ингредиента', () => {
        
        const state = 
            {
            ingredients: [],
            isLoading: false,
            error: 'error',
        }


        expect(ingredientsReducer(undefined, {
            type: getIngredients.rejected.type, payload: 'error'})).toEqual(state);
    });
});