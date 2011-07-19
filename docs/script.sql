SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL';

CREATE SCHEMA IF NOT EXISTS `financialmobile` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci ;
USE `financialmobile` ;

-- -----------------------------------------------------
-- Table `financialmobile`.`Perfil`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `financialmobile`.`Perfil` (
  `idPerfil` INT NOT NULL AUTO_INCREMENT ,
  `nomePerfil` VARCHAR(20) NOT NULL ,
  `descricaoPerfil` VARCHAR(45) NULL ,
  PRIMARY KEY (`idPerfil`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `financialmobile`.`Usuario`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `financialmobile`.`Usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT ,
  `nomeUsuario` VARCHAR(45) NOT NULL ,
  `emailUsuario` VARCHAR(45) NOT NULL ,
  `loginUsuario` VARCHAR(15) NOT NULL ,
  `senhaUsuario` CHAR(32) NOT NULL ,
  `ativo` BIT(1) NOT NULL ,
  `idPerfil` INT NOT NULL ,
  PRIMARY KEY (`idUsuario`) ,
  INDEX `fk_Usuario_Perfil1` (`idPerfil` ASC) ,
  CONSTRAINT `fk_Usuario_Perfil1`
    FOREIGN KEY (`idPerfil` )
    REFERENCES `financialmobile`.`Perfil` (`idPerfil` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `financialmobile`.`Categoria`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `financialmobile`.`Categoria` (
  `idCategoria` INT NOT NULL AUTO_INCREMENT ,
  `descCategoria` VARCHAR(45) NOT NULL ,
  `descCompletaCategoria` VARCHAR(255) NULL ,
  `idUsuario` INT NOT NULL ,
  PRIMARY KEY (`idCategoria`) ,
  INDEX `fk_Categoria_Usuario1` (`idUsuario` ASC) ,
  CONSTRAINT `fk_Categoria_Usuario1`
    FOREIGN KEY (`idUsuario` )
    REFERENCES `financialmobile`.`Usuario` (`idUsuario` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `financialmobile`.`Custo`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `financialmobile`.`Custo` (
  `idCusto` INT NOT NULL AUTO_INCREMENT ,
  `descricaoGasto` VARCHAR(45) NOT NULL ,
  `idCategoriaGasto` INT NOT NULL ,
  `idUsuario` INT NOT NULL ,
  PRIMARY KEY (`idCusto`) ,
  INDEX `fk_Custo_Categoria` (`idCategoriaGasto` ASC) ,
  INDEX `fk_Custo_Usuario` (`idUsuario` ASC) ,
  CONSTRAINT `fk_Custo_Categoria`
    FOREIGN KEY (`idCategoriaGasto` )
    REFERENCES `financialmobile`.`Categoria` (`idCategoria` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Custo_Usuario`
    FOREIGN KEY (`idUsuario` )
    REFERENCES `financialmobile`.`Usuario` (`idUsuario` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `financialmobile`.`Parcelas`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `financialmobile`.`Parcelas` (
  `idCusto` INT NOT NULL ,
  `numeroParcela` INT NOT NULL ,
  `dataVencimento` DATE NOT NULL ,
  `valorParcela` DOUBLE NOT NULL ,
  PRIMARY KEY (`numeroParcela`, `idCusto`) ,
  INDEX `fk_Parcelas_Custo1` (`idCusto` ASC) ,
  CONSTRAINT `fk_Parcelas_Custo1`
    FOREIGN KEY (`idCusto` )
    REFERENCES `financialmobile`.`Custo` (`idCusto` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `financialmobile`.`Entradas`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `financialmobile`.`Entradas` (
  `idEntrada` INT NOT NULL AUTO_INCREMENT ,
  `idUsuario` INT NOT NULL ,
  `descricao` VARCHAR(45) NOT NULL ,
  `dataEntrada` DATE NOT NULL ,
  `valorEntrada` DOUBLE NULL ,
  PRIMARY KEY (`idEntrada`, `idUsuario`) ,
  INDEX `fk_Entradas_Usuario1` (`idUsuario` ASC) ,
  CONSTRAINT `fk_Entradas_Usuario1`
    FOREIGN KEY (`idUsuario` )
    REFERENCES `financialmobile`.`Usuario` (`idUsuario` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `financialmobile`.`Saldo`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `financialmobile`.`Saldo` (
  `idUsuario` INT NOT NULL ,
  `valorSaldo` DOUBLE NOT NULL ,
  PRIMARY KEY (`idUsuario`) ,
  INDEX `fk_Saldo_Usuario1` (`idUsuario` ASC) ,
  CONSTRAINT `fk_Saldo_Usuario1`
    FOREIGN KEY (`idUsuario` )
    REFERENCES `financialmobile`.`Usuario` (`idUsuario` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
