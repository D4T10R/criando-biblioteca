import chalk from "chalk";
import fs from "fs";
// const chalk = require('chalk')

function trataErro(erro) {
    console.log(erro)
    throw new Error(chalk.red(erro.code, 'Não encontramos o caminho do arquivo'));

}

// Promises com then
// function pegaArquivo(caminhoArquivo) {
//     const encoding = 'utf-8'
//     fs.promises
//         .readFile(caminhoArquivo, encoding)
//         .then((texto) => console.log(chalk.green(texto)))
//         .catch(erro => trataErro(erro))
// }

// async/await
async function pegaArquivo(caminhoArquivo) {
    try {
        const encoding = 'utf-8'
        const texto = await fs.promises.readFile(caminhoArquivo, encoding)
    
        console.log(chalk.green(texto))    
    } catch(err) {
        trataErro(err)
    }
    
}


pegaArquivo('./arquivos/texto.md')