import pegaArquivo from "./index.js";
import fs from 'fs';
import chalk from "chalk";
import listaValidada from "./http-validacao.js";

const caminho = process.argv;

async function imprimeLista(valida, resultado, identificador = '') {

    if (valida) {
        console.log(
            chalk.yellow('Lista validada:'), 
            chalk.red.bgRed(identificador),
            await listaValidada(resultado))    
    } else {
        console.log(
            chalk.yellow('Lista de links:'), 
            chalk.red.bgRed(identificador),
            resultado)
    }

}

async function processaTexto(argumentos) {
    const caminho = argumentos[2]
    const valida = argumentos[3] === '--valida'
    console.log(valida)

    try {
        fs.lstatSync(caminho)
        if (fs.lstatSync(caminho).isFile()) {
            const resultado = await pegaArquivo(argumentos[2])
            imprimeLista(valida, resultado)
        } else if (fs.lstatSync(caminho).isDirectory()) {
            const arquivos = await fs.promises.readdir(caminho)
            arquivos.forEach(async (nomeArquivo) => {
                const lista = await pegaArquivo(`${caminho}/${nomeArquivo}`)
               
                imprimeLista(valida, lista, nomeArquivo)
            })
        }
    } catch(err) {
        if (err.code === 'ENOENT') {
            console.log('Arquivo ou diretorio não existe!')
            return;
        }
    }
    
}

processaTexto(caminho)