describe('Explore Github Page ', () => {
    before(() => {
        cy.visit('https://github.com/')
    });

    it('should explore github (as a non-registered user)', () => {
        cy.get('header nav li summary').contains(' Explore ').click({force: true});
        cy.get('header nav li a[href="/trending"]').contains('Trending').click({force: true});

        cy.get('.application-main #select-menu-language .select-menu-button').click();
        cy.get('.application-main filter-input input[placeholder="Filter languages"]').type('JavaScript');
        cy.get('.application-main .select-menu-list span').contains('JavaScript').click();

        cy.wait(2000)

        cy.get('.application-main #select-menu-date .select-menu-button').click();
        cy.get('.application-main .select-menu-list span').contains('This week').click();

        cy.get('.application-main .d-inline-block.float-sm-right')
            .invoke('text')
            .then((rateText) => {
                if(rateText.match( /[0-9]+/g)) {
                    const numberOfStars = parseInt(rateText)
                    if(numberOfStars >= 200) {
                        cy.get('.application-main .Box-row').
                        find('.d-inline-block.float-sm-right')
                        .parents('.Box')
                        .contains(numberOfStars)
                        .click()

                        cy.get('.application-main #repository-container-header .mr-2.flex-self-stretch')
                        .invoke('text')
                        .should('be.true')      
                       
               }

            }
        })      
        
    });

})