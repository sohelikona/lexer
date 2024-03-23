#include <iostream>
#include <string>
#include <vector>
#include <cctype>

enum TokenType {
    NUMBER,
    PLUS,
    MINUS,
    MULTIPLY,
    DIVIDE,
    END
};

struct Token {
    TokenType type;
    std::string value;
};

class Lexar {
    private:
    std:: string input;
    size_t position;

    char currentChar() {
        if (position >= input.size()) return '\0';
        return input[position];
    }

    void advance() {
        position++;
    }

    public: 
    Lexar(std::string input) : input(input), position(0) {}

    Token getNexetToken() {
        while (isspace(currentChar())) {
            advance();
        }

        if (currentChar() == '+') {
            advance();
            return Token{PLUS, "+"};
        }

         if (currentChar() == '-') {
            advance();
            return Token{MINUS, "-"};
        }

         if (currentChar() == '*') {
            advance();
            return Token{MULTIPLY, "*"};
        }

         if (currentChar() == '/') {
            advance();
            return Token{DIVIDE, "/"};
        }

        if (isdigit(currentChar())) {
            std::string number;
            while (isdigit(currentChar())) {
                number += currentChar();
                advance();
            }
            return Token{NUMBER, number};
        }

        return Token{END, ""};
    }
};

int main() {
    std::string expression = "3 + 4 * 2";
    Lexar lexar(expression);

    std::vector<Token> tokens;
    Token token = lexar.getNexetToken();
    while (token.type != END) {
        tokens.push_back(token);
        token = lexar.getNexetToken();
    }

    for (const auto& token : tokens) {
        std::cout << "Type: " << token.type;
        if (token.type == NUMBER) {
            std::cout << ", Value: " << token.value;
        }
        std::cout << std::endl;
    }

    return 0;
}