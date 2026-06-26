# Dev Toolbelt E2E Tests

[![E2E Tests](https://github.com/brunoshiroma/dev-toolbelt-e2e-tests/actions/workflows/cypress.yml/badge.svg)](https://github.com/brunoshiroma/dev-toolbelt-e2e-tests/actions/workflows/cypress.yml)

Projeto de testes E2E (End-to-End) para o [dev-toolbelt](https://github.com/brunoshiroma/dev-toolbelt) usando **Cypress**.

## 📋 Sobre

Este projeto contém testes automatizados para validar:
- ✅ Funcionalidade da aplicação
- ✅ Performance
- ✅ Acessibilidade
- ✅ Responsividade

## 🚀 Pré-requisitos

- Node.js 16+
- npm ou yarn
- dev-toolbelt rodando localmente (http://localhost:8080)

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/brunoshiroma/dev-toolbelt-e2e-tests.git
cd dev-toolbelt-e2e-tests

# Instale as dependências
npm install
```

## ▶️ Como Executar

### Modo Interativo (Cypress UI)
```bash
npm run cypress:open
```

Isso abrirá a interface do Cypress onde você pode:
- Executar testes individualmente
- Ver a execução em tempo real
- Debugar com DevTools integrado

### Modo Headless (CLI)
```bash
npm run cypress:run
```

Para executar em um navegador específico:
```bash
npm run cypress:run:chrome
npm run cypress:run:firefox
```

Para executar com interface visível:
```bash
npm run cypress:run:headed
```

## 📁 Estrutura do Projeto

```
dev-toolbelt-e2e-tests/
├── cypress/
│   ├── e2e/                    # Testes E2E
│   │   ├── homepage.cy.js      # Testes da página inicial
│   │   ├── performance.cy.js   # Testes de performance
│   │   └── accessibility.cy.js # Testes de acessibilidade
│   ├── support/
│   │   ├── commands.js         # Comandos customizados
│   │   └── e2e.js              # Setup do Cypress
│   └── fixtures/               # Dados de teste (opcional)
├── .github/workflows/
│   └── cypress.yml             # GitHub Actions CI/CD
├── cypress.config.js           # Configuração do Cypress
├── package.json                # Dependências e scripts
└── README.md                   # Esta documentação
```

## 🧪 Testes Disponíveis

### Homepage Tests (`homepage.cy.js`)
- Validação de carregamento da página
- Verificação de navegação
- Validação de links
- Estrutura da página

### Performance Tests (`performance.cy.js`)
- Tempo de carregamento
- Detecção de erros no console
- Validação do carregamento de imagens

### Accessibility Tests (`accessibility.cy.js`)
- Validação de títulos descritivos
- Hierarquia de headings
- Alt text em imagens
- Navegação por teclado
- Contraste de cores
- Estrutura de landmarks

## 🛠️ Configuração

O arquivo `cypress.config.js` contém as configurações:

```javascript
- baseUrl: URL base da aplicação (http://localhost:8080)
- viewportWidth: 1280px
- viewportHeight: 720px
- defaultCommandTimeout: 10s
- requestTimeout: 10s
```

Edite conforme necessário para seu ambiente.

## 📝 Adicionar Novos Testes

1. Crie um novo arquivo em `cypress/e2e/`
2. Use a sintaxe do Cypress:

```javascript
describe('Meu Teste', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('deve fazer algo', () => {
    cy.get('button').click();
    cy.get('.resultado').should('be.visible');
  });
});
```

## 🔄 CI/CD - GitHub Actions

Testes são executados automaticamente em cada push e pull request.

Ver workflow em: `.github/workflows/cypress.yml`

## 🐛 Troubleshooting

### Erro: "baseUrl did not respond"
- Verifique se dev-toolbelt está rodando em http://localhost:8080
- Ajuste o `baseUrl` em `cypress.config.js`

### Erro: "Command timed out"
- Aumente `defaultCommandTimeout` em `cypress.config.js`
- Verifique se os seletores estão corretos

### Testes falhando em CI
- Verifique logs do GitHub Actions
- Certifique-se de que todas as dependências estão instaladas
- Valide configurações de ambiente

## 📚 Documentação Útil

- [Cypress Documentation](https://docs.cypress.io)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Cypress API](https://docs.cypress.io/api/table-of-contents)

## 📄 Licença

MIT

## 👤 Autor

[Bruno Shiroma](https://github.com/brunoshiroma)

---

**Dúvidas?** Abra uma [issue](https://github.com/brunoshiroma/dev-toolbelt-e2e-tests/issues)!
