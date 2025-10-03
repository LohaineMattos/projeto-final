# 📚 Projeto Final — TCC

# **Gelco - sistema de logística integrada**

Gelco é um sistema **full-stack** concebido para otimizar o controle de mercadorias, operadores, usuários e matérias-prima de estoque em ambientes industriais.  
O projeto foi desenvolvido como Trabalho de Conclusão de Curso (TCC) e demonstra boas práticas de arquitetura, código limpo e UX simples, porém profissional.

---

## ✨ Principais Funcionalidades

| Módulo | Descrição |
| ------ | --------- |
| **Unitários** | Dados de turno, operador e etc. |
| **Lotes** | Registro de mercadorias. |
| **Usuários** | Controle de acesso interno (nome, e-mail). |


---

## 🏗️ Stack & Arquitetura

| Camada | Tecnologias |
| ------ | ----------- |
| **Back-end** | Node.js · Express · Prisma ORM · MySQL  |
| **Front-end** | HTML5 · CSS3 · JavaScript (ES6) – 100 % Vanilla |
| **Persistência local** | `localStorage` (front-end offline-first) |
| **Ferramentas** | Nodemon · VS Code · Insomnia/Postman |

> **Obs.:** O front-end consome a API REST do back-end; mas, em modo demo, pode operar apenas com `localStorage` para facilitar testes rápidos.

---

## ⚙️ Como Executar

### 1. Clonar o repositório
```bash
git clone https://github.com/<seu-usuario>/projeto-final.git
cd smart-supply
```

### 2. Back-end
```bash
cd api
npm install
npx prisma migrate dev          # gera o schema no MySQL
npm run dev                     # inicia em http://localhost:3000
```

### 3. Front-end
Abra `web/front/index.html` no navegador  
*(ou sirva a pasta `web/` com uma extensão Live Server do VS Code).*

---

## 🗂️ Estrutura de Pastas (resumida)

```
api/                 # Node + Express + Prisma
front/
├── docs/           # HTML (Dashboard, Produtos, etc.)
```

---

## 👥 Autores

| Nome | Função |
| ---- | ------ |
| **Maria C. Caleffi** | Dev, designer |
| **Lohaine Mattos** | Po DEV|
| **Heloísa Bordini** | Scrum Master, QA |
| **Miriam Bordini** | Dev Designer |

---

## 📄 Licença
Projeto acadêmico – uso específico para fins de trabalhistas. Credite os autores entre em contato.

---

<div align="center">

**Gelco** © 2025 &nbsp;·&nbsp; Todos os direitos reservados

</div>

