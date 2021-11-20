CREATE TABLE users(
	userId INT NOT NULL GENERATED ALWAYS AS IDENTITY,
	name VARCHAR NOT NULL,
	username VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL,
    minimalReceipt DECIMAL NOT NULL DEFAULT 0.5,
    monthlyReceipt DECIMAL NOT NULL DEFAULT 0,
	PRIMARY KEY(id)
);

CREATE TYPE categories AS ENUM ('Cartão de crédito', 'Imóveis e aluguéis', 'Custos gerais');
CREATE TYPE types AS ENUM ('receita', 'despesa');

CREATE TABLE costs(
	id INT NOT NULL GENERATED ALWAYS AS IDENTITY,
	label VARCHAR NOT NULL,
	value DECIMAL NOT NULL DEFAULT 0,
    date TIMESTAMP NOT NULL DEFAULT NOW(),
    type types NOT NULL,
    category categories NOT NULL,
    userId INT NOT NULL,
	PRIMARY KEY(id),
    FOREIGN KEY(userId) REFERENCES users(userId)
);

CREATE TABLE bills(
	id INT NOT NULL GENERATED ALWAYS AS IDENTITY,
	label VARCHAR NOT NULL,
	value DECIMAL NOT NULL,
    dueDate TIMESTAMP,
    type billsTypes NOT NULL,
    costId INT,
    isPayed BOOLEAN NOT NULL DEFAULT FALSE,
	PRIMARY KEY(id),
    FOREIGN KEY(costId) REFERENCES costs(id)
);

CREATE TYPE billsTypes AS ENUM(
        'educação',
        'saúde',
        'alimentação',
        'veículo',
        'contas',
        'aluguel',
        'condomínio',
        'cartão',
        'outros',
      )