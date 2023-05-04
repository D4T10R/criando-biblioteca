import pegaArquivo from "./index.js";
import fs from 'fs';
import chalk from "chalk";

const caminho = process.argv;

function imprimeLista(resultado, identificador = '') {
    console.log(
        chalk.yellow('Lista de links:'), 
        chalk.red.bgRed(identificador),
        resultado)
}

async function processaTexto(argumentos) {
    const caminho = argumentos[2]

    try {
        fs.lstatSync(caminho)
        if (fs.lstatSync(caminho).isFile()) {
            const resultado = await pegaArquivo(argumentos[2])
            imprimeLista(resultado)
        } else if (fs.lstatSync(caminho).isDirectory()) {
            const arquivos = await fs.promises.readdir(caminho)
            arquivos.forEach(async (nomeArquivo) => {
                const lista = await pegaArquivo(`${caminho}/${nomeArquivo}`)
               
                imprimeLista(lista, nomeArquivo)
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