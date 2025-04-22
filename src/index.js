function validarBandeiraCartao(numeroCartao) {
    /**
     * Valida o número do cartão de crédito e retorna a bandeira correspondente.
     * 
     * @param {string} numeroCartao - Número do cartão de crédito.
     * @return {string} - Nome da bandeira ou 'Número de cartão inválido' ou 'Bandeira desconhecida'.
     */
    numeroCartao = numeroCartao.trim();

    // Verifica se o número do cartão é válido pelo algoritmo de Luhn
    if (!validarLuhn(numeroCartao)) {
        return "Número de cartão inválido";
    }

    // Mapeamento de bandeiras e seus padrões
    const bandeiras = [
        { nome: "Visa", regex: /^4/ },
        { nome: "MasterCard", regex: /^5[1-5]|^22[2-9][0-9]|^2[3-6][0-9]{2}|^27[0-1][0-9]|^2720/ },
        { nome: "Elo", regex: /^4011|^4312|^4389|^4514|^4576|^5041|^5066|^5090|^6277|^6362|^6504|^6505|^6507|^6509|^6516|^6550/ },
        { nome: "American Express", regex: /^3[47]/ },
        { nome: "Discover", regex: /^6011|^65|^64[4-9]/ },
        { nome: "Hipercard", regex: /^6062/ },
        { nome: "JCB", regex: /^35(2[8-9]|[3-8][0-9])/ },
        { nome: "Diners Club", regex: /^30[0-5]|^36|^38/ },
        { nome: "EnRoute", regex: /^2014|^2149/ },
        { nome: "Voyage", regex: /^8699/ },
        { nome: "Aura", regex: /^50/ }
    ];

    // Verifica a bandeira correspondente
    for (const bandeira of bandeiras) {
        if (bandeira.regex.test(numeroCartao)) {
            return bandeira.nome;
        }
    }

    return "Bandeira desconhecida";
}

function validarLuhn(numeroCartao) {
    /**
     * Implementa o algoritmo de Luhn para verificar a validade do número do cartão.
     * 
     * @param {string} numeroCartao - Número do cartão de crédito.
     * @return {boolean} - Retorna true se o número for válido, caso contrário false.
     */
    let soma = 0;
    let alternar = false;

    // Percorre o número do cartão de trás para frente
    for (let i = numeroCartao.length - 1; i >= 0; i--) {
        let digito = parseInt(numeroCartao[i], 10);

        if (alternar) {
            digito *= 2;
            if (digito > 9) {
                digito -= 9;
            }
        }

        soma += digito;
        alternar = !alternar;
    }

    return soma % 10 === 0;
}

// Exemplo de uso
const numero = "4111111111111111"; // Exemplo de número Visa válido
const bandeira = validarBandeiraCartao(numero);
console.log(`Bandeira: ${bandeira}`);