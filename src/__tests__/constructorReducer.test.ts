import { addIngredient, burgerConstructorReducer, moveUp, removeIngredient } from '../services/slices/burgerConstructor';


describe('Проверяют редьюсер слайса [constructor]', () => {
    // начальное состояние, которое будем менять в тестах
        
    it('обработку экшена добавления ингредиента', () => {
        
        const initialState = {
            ingredients: [
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
            ],
            bun: null
        }

        const ingredient = {
            "id": 'D8ZGm-hDEWoZVIWisCX3N',
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

        const newState = burgerConstructorReducer(initialState, addIngredient(ingredient));

        const { ingredients } = newState;
        // деструктурируем, так как id присваивается через nanoid и мы не знаем какой он будет. Избавляемся
        const { id, ...result } = ingredients[ingredients.length - 1];
        
        // сравниваем то что получилось с ожидаемым результатом
        expect(result).toEqual(
            {
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
            });
    })

    it('обработку экшена удаления ингредиента', () => {
        
        const initialState = {
            ingredients: [
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
            ],
            bun: null
        }

        const ingredientToRemove = {
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
        const resultIngredient = [{   
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
        }]

        const newState = burgerConstructorReducer(initialState, removeIngredient(ingredientToRemove));

        const { ingredients } = newState;
        // деструктурируем, так как id присваивается через nanoid и мы не знаем какой он будет. Избавляемся
        
        // сравниваем то что получилось с ожидаемым результатом
        expect(ingredients).toEqual(resultIngredient);
    })

    it('обработку экшена изменения порядка ингредиентов в начинке', () => {
        
        const initialState = {
            ingredients: [
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
            ],
            bun: null
        }

        const resultIngredientsState = [
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
            },
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
        }]

        const newState = burgerConstructorReducer(initialState, moveUp(1));

        const { ingredients } = newState;
        // деструктурируем, так как id присваивается через nanoid и мы не знаем какой он будет. Избавляемся
        
        // сравниваем то что получилось с ожидаемым результатом
        expect(ingredients).toEqual(resultIngredientsState);
    })
});

