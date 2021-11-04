import { rejects } from 'assert';
import express, {Request, Response} from 'express';
import { resolve } from 'path/posix';
import { stringify } from 'querystring';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(function(request, response, next) {
    console.log(request.method, request.url);
    next();
    });

app.get('/', (request: Request, response: Response) => {
return response.send('OK');
});

app.listen(3000, () => console.log("Servidor iniciado..."));


app.use(function(req: Request, res:Response, next) {
    
    if (req.method == 'POST' || req.method == 'PUT' ) {
        const {name , age, cpf,email} = req.body
        if (typeof name != 'string' || isNaN(Number(age)) || typeof cpf != 'string' ) {
            res.status(400).send('Campos invalidos !!')
        }
    } else{
        console.log('campos OK ! !')
        console.log(Math.random().toString(36).substring(2))
        

        //ENCADEAMENTO ****************
        app.use('/users/:id',(req:Request,res:Response,next)=>{

            const name = String(req.body.name)
            const age:string = String(req.body.age)
            const id = Number(req.params.id)
            const cpf = String(req.body.cpf)
    
            if (req.method == 'POST' || req.method == 'PUT' ) {
        
            let indice:number = users.findIndex( users => users.id == id );
        
            if (indice > -1) {
                console.log(`id encontrado para ${name}`)
                
                
            }else{
                res.status(400).send('Campos invalidos !!')
            }
    
            next();
            
        }
            
        
        }) // FIM ENCADEAMENTO *********
    }
    
    next();
    });


       


class Transaction {
    id:number
    title:string
    value:number
    type:string

    constructor(id:number,title:string,value:number,type:string) {
        this.id = id
        this.title = title
        this.value = value
        this.type = type
    }
}

class User {
    id:number
    name:string
    age:number
    cpf:string
    transactions: Transaction[] = []

   constructor(id:number,name:string,age:number,cpf:string) {
       this.id=id
       this.name=name
       this.age=age
       this.cpf=cpf
   }

}

const users:User[] = []

let id: number = 0

const transactions: Transaction[] = []
let idTrans: number = 0



app.get('/users/:id',(req:Request , res: Response)=>{

    
    
    const id = Number(req.params.id)

    const p = new Promise((resolve,reject) => {
        if (id == 3) {
            setTimeout(resolve,2000)
            console.log('é 3')
        } else {
            setTimeout(reject,2000)
            console.log('não é 3')
        }

        
    })

    p.then(()=> {res.send('ok')}).catch(()=>{res.send('erro ')})

    console.log(users[id])
    

   /* res.send(`Resultado: ${JSON.stringify(users[id])}`)  */

})

app.get('/users',(req:Request , res: Response)=>{
 

    res.send(`Resultado: ${JSON.stringify(users)}`)

})


app.post('/users',(req:Request,res:Response)=>{

    
    const name = String(req.body.name)
    const age = Number(req.body.age)
    
    const cpf = String(req.body.cpf)   
    let validacao: boolean = true
    
    
    console.log(id)
    if (name != 'undefined' || cpf != 'undefined'  || (isNaN(age)) ) {
        
        for (let index = 0; index < users.length; index++) {
            
            if (cpf == users[index].cpf) {
               validacao = false
            }                      
            
        }  

        if (validacao) {
            id++
            let user1 = new User(id,name,age,cpf)
            users.push(user1)
            res.send(`Adicionado`)
        }
               
        
    }

    res.status(400).send(`erro`)

    

})


app.put('/users/:id',(req:Request,res:Response)=>{

    const name = String(req.body.name)
    const age:string = String(req.body.age)
    const id = Number(req.params.id)
    const cpf = String(req.body.cpf)

    let indice:number = users.findIndex( users => users.id == id );

    if (indice > -1) {
        console.log(name)
        if(name != 'undefined') users[indice].name = name
        if(age != 'undefined') users[indice].age = Number(age)
        if(cpf != 'undefined') users[indice].cpf = cpf
        
        res.status(201).json(users[indice])
    }

    

})


app.delete('/users/:id',(req:Request,res:Response)=>{

    
    const id = Number(req.params.id)
    

    const indice:number = users.findIndex( users => users.id == id );

    if(indice > -1){
        users.splice(indice,1)
        res.status(201).send('deletado')      
    }else{
        res.status(400).send('nao encontrado')
    }

    

})


app.get('/user/:userId/transactions/:id',(req:Request,res:Response)=>{

    res.send(`Resultado: ${JSON.stringify(transactions)}`)


})