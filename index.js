import chalk from "chalk";
import fs from "fs";
// const chalk = require('chalk')


function extraiLinks(texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const captura = [...texto.matchAll(regex)];
    const resultados = captura.map(capt => ({[capt[1]]: capt[2]}))
    return resultados
}

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
    
        console.log(extraiLinks(texto))
    } catch(err) {
        trataErro(err)
    }
    
}


pegaArquivo('./arquivos/texto.md')