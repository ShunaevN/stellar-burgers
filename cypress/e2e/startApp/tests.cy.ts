beforeEach(()=>{
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:4000');
    cy.viewport(2000, 1000);

    cy.get('[data-cy="burger_ingredient_Краторная булка N-200i"]').as('bun');
    cy.get('[data-cy="burger_ingredient_Биокотлета из марсианской Магнолии"]').as('main');
    cy.get('[data-cy="burger_ingredient_Соус Spicy-X"]').as('sauce');
    cy.get('[data-cy="constructor_ingredients_price"]').as('ingredients_price');
    
});


describe('проверяем работу конструктора', function() {
    it('Добавление данных в конструктор', function() {
       cy.get('@bun').contains('Добавить').click();
       cy.get('@main').contains('Добавить').click();
       cy.get('@sauce').contains('Добавить').click();
       cy.get('@ingredients_price').contains('3024').should('exist');
    });
}); 


describe('проверка создания заказа', function() {
     it('Создание заказа', function() {
        cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });

        cy.get('@bun').contains('Добавить').click();
        cy.get('@main').contains('Добавить').click();
        cy.get('@sauce').contains('Добавить').click();
        cy.get('[data-cy="total_order_price"]').click();

        cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
        cy.get('[data-cy="ingredient_detail"]').as('modal');
        cy.get('[data-cy="ingredient_detail_button_close"]').as('modal_close');
        cy.get('@modal').should('exist');
        cy.get('[data-cy="order_number"]').contains('5398');

        cy.get('@modal_close').click();
        cy.get('@modal').should('not.exist');
        cy.get('@ingredients_price').contains('0');
     });

}); 


describe('проверка модального окна', function() {
    it('Открытие и закрытие по крестику', function() {

        cy.get('@bun').click();
        cy.get('[data-cy="ingredient_detail"]').as('modal');
        cy.get('[data-cy="ingredient_detail_button_close"]').as('modal_close');
        cy.get('@modal').get('@modal_close').click();
     });

    it('Открытие и закрытие по оверлею', function() {
        cy.get('@bun').click();
        cy.get('[data-cy="overlay_close"]').click({force:true});
     });
});
