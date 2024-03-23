const TokenType = {
    NUMBER: 'NUMBER',
    PLUS: 'PLUS',
    MINUS: 'MINUS',
    MULTIPLY: 'MULTIPLY',
    DIVIDE: 'DIVIDE',
    END: 'END'
};

class Token {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
}

class Lexar {
    constructor(input) {
        this.input = input;
        this.position = 0;
    }

    currentChar(){
        if (this.position >= this.input.length) return '\0';
        return this.input[this.position];
    }

    advance() {
        this.position++;
    }

    getNextToken() {
        while (/\s/.test(this.currentChar())) {
            this.advance();
        }

        if (this.currentChar() === '+') {
            this.advance();
            return new Token(TokenType.PLUS, "+");
        }

        if (this.currentChar() === '-') {
            this.advance();
            return new Token(TokenType.MINUS, "-");
        }
        if (this.currentChar() === '*') {
            this.advance();
            return new Token(TokenType.MULTIPLY, "*");
        }

        if (this.currentChar() === '/') {
            this.advance();
            return new Token(TokenType.DIVIDE, "/");
        }

        if (/\d/.test(this.currentChar())) {
            let number = "";
            while (/\d/.test(this.currentChar())) {
                number += this.currentChar();
                this.advance();
            }
            return new Token(TokenType.NUMBER, number);
        }

        return new Token(TokenType.END, "");
    }
}

const expression = "3 + 4 * 2";
const lexer = new Lexar(expression);

const tokens = [];
let token = lexer.getNextToken();
while (token.type != TokenType.END) {
    tokens.push(token);
    token = lexer.getNextToken();
}

for (const token of tokens) {
    console.log(`Type: ${token.type}${token.type === TokenType.NUMBER ? `, Value: ${token.value}` : ""}`);

}