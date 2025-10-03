-- CreateTable
CREATE TABLE `Lote` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data` DATETIME(3) NOT NULL,
    `horario` VARCHAR(191) NULL,
    `turno` VARCHAR(191) NULL,
    `peso_vazio` DOUBLE NULL,
    `peso_cheio` DOUBLE NULL,
    `etiqueta` VARCHAR(191) NULL,
    `operador` VARCHAR(191) NULL,
    `tipo` VARCHAR(191) NULL,
    `autenticado` BOOLEAN NULL DEFAULT false,
    `peso_embalagem` DOUBLE NULL,
    `qtd_sacos` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Unitario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data` DATETIME(3) NOT NULL,
    `turno` VARCHAR(191) NOT NULL,
    `peso` DOUBLE NOT NULL,
    `operador` VARCHAR(191) NOT NULL,
    `etiqueta` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
