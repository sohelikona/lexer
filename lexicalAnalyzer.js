function lex(input) {
    let tokens = [];
    let current = 0;

    while (current < input.length) {
        let char = input[current];

        if (/\s/.test(char)) {
            current++;
            continue;
        }

        if (/[0-9]/.test(char)) {
            let value = '';
            while (/[0-9]/.test(char)) {
                value += char;
                char = input[++current];
            }
            tokens.push({ type: 'NUMBER', value});
            continue;
        }

        if (char === '+') {
            tokens.push({ type: 'PLUS', value: '+'});
            current++;
            continue;
        }

        if (char === '-') {
            tokens.push({ type: 'MINUS', value: '-'});
            current++;
            continue;
        }

        if (char === '*') {
            tokens.push({ type: 'MULTIPLY', value: '*'});
            current++;
            continue;
        }

        if (char === '/') {
            tokens.push({ type: 'DEVIDE', value: '/'});
            current++;
            continue;
        }

        throw new Error('Unknown token: ' + char);
    }

    return tokens;
}

const expression = "3 + 4 * 2";
const tokens = lex(expression);
console.log(tokens)