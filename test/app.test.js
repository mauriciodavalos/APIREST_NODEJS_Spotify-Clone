describe(" [APP] Esta es la prueba general ", () => {
    test(" esto deberia retornar", () => {
        const a = 4;
        const b = 4;
        const total = a + b;
        expect(total).toEqual(8);
    }, 10000); // increase timeout to 10000 ms
});

//https://jestjs.io/es-ES/docs/expect
