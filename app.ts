interface Farda{

    camisa:string;
    short:string;
    tamanho:string;
    quantidade:number;
    entrega:string;

}

let fardas:Farda[]=[];

function limpar(){

    (<HTMLInputElement>document.getElementById("camisa")).value="";
    (<HTMLInputElement>document.getElementById("short")).value="";
    (<HTMLInputElement>document.getElementById("quantidade")).value="";
    (<HTMLInputElement>document.getElementById("entrega")).value="";
    (<HTMLInputElement>document.getElementById("indice")).value="";

}

function salvar(){

    let camisa=(<HTMLInputElement>document.getElementById("camisa")).value;

    let short=(<HTMLInputElement>document.getElementById("short")).value;

    let tamanho=(<HTMLSelectElement>document.getElementById("tamanho")).value;

    let quantidade=Number((<HTMLInputElement>document.getElementById("quantidade")).value);

    let entrega=(<HTMLInputElement>document.getElementById("entrega")).value;

    let indice=(<HTMLInputElement>document.getElementById("indice")).value;

    let objeto:Farda={

        camisa,
        short,
        tamanho,
        quantidade,
        entrega

    };

    if(indice==""){

        fardas.push(objeto);

    }else{

        fardas[Number(indice)]=objeto;

    }

    atualizarTabela();

    limpar();

}

function atualizarTabela(){

    let tabela=document.getElementById("lista")!;

    tabela.innerHTML="";

    fardas.forEach((item,index)=>{

        tabela.innerHTML+=`

        <tr>

            <td>${item.camisa}</td>

            <td>${item.short}</td>

            <td>${item.tamanho}</td>

            <td>${item.quantidade}</td>

            <td>${item.entrega}</td>

            <td>

                <button class="editar" onclick="editar(${index})">Editar</button>

                <button class="excluir" onclick="excluir(${index})">Excluir</button>

            </td>

        </tr>

        `;

    });

}

function editar(i:number){

    (<HTMLInputElement>document.getElementById("camisa")).value=fardas[i].camisa;

    (<HTMLInputElement>document.getElementById("short")).value=fardas[i].short;

    (<HTMLSelectElement>document.getElementById("tamanho")).value=fardas[i].tamanho;

    (<HTMLInputElement>document.getElementById("quantidade")).value=fardas[i].quantidade.toString();

    (<HTMLInputElement>document.getElementById("entrega")).value=fardas[i].entrega;

    (<HTMLInputElement>document.getElementById("indice")).value=i.toString();

}

function excluir(i:number){

    if(confirm("Deseja realmente excluir esta farda?")){

        fardas.splice(i,1);

        atualizarTabela();

    }

}