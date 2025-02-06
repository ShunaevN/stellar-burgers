beforeEach(()=>{
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:4000');
    cy.viewport(2000, 1000);
});


describe('проверяем работу конструктора', function() {
    it('Добавление данных в конструктор', function() {
       const bun = cy.get('[data-cy="burger_ingredient_Краторная булка N-200i"]');
       const main = cy.get('[data-cy="burger_ingredient_Биокотлета из марсианской Магнолии"]');
       const sauce = cy.get('[data-cy="burger_ingredient_Соус Spicy-X"]');
       bun.contains('Добавить').click();
       main.contains('Добавить').click();
       sauce.contains('Добавить').click();
       cy.get('[data-cy="constructor_ingredients_price"]').contains('3024').should('exist');
    });
}); 


describe('проверка создания заказа', function() {
     it('Создание заказа', function() {
        cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });

        const bun = cy.get('[data-cy="burger_ingredient_Краторная булка N-200i"]');
        const main = cy.get('[data-cy="burger_ingredient_Биокотлета из марсианской Магнолии"]');
        const sauce = cy.get('[data-cy="burger_ingredient_Соус Spicy-X"]');

        bun.contains('Добавить').click();
        main.contains('Добавить').click();
        sauce.contains('Добавить').click();

        cy.get('[data-cy="total_order_price"]').click();
        cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
        const isModal = cy.get('[data-cy="ingredient_detail"]');
        isModal.should('exist');
        cy.get('[data-cy="order_number"]').contains('5398');
        cy.get('[data-cy="ingredient_detail_button_close"]').click();
        isModal.should('not.exist');
        cy.get('[data-cy="constructor_ingredients_price"]').contains('0');
     });

}); 


describe('проверка модального окна', function() {
    it('Открытие и закрытие по крестику', function() {
        const bun = cy.get('[data-cy="burger_ingredient_Краторная булка N-200i"]');
        bun.click();
        cy.get('[data-cy="ingredient_detail"]').get('[data-cy="ingredient_detail_button_close"]').click();
     });

    it('Открытие и закрытие по оверлею', function() {
        const bun = cy.get('[data-cy="burger_ingredient_Краторная булка N-200i"]');
        bun.click();
        cy.get('[data-cy="overlay_close"]').click({force:true});
     });
});
