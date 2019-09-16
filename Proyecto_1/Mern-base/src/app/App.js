import React, {Component} from 'react';
import {render} from 'react-dom';

var logedGlobal = false;
var usernameGlobal = '';

class Tempuso extends Component{

    constructor(props){
        super();
        this.state={
            idmaster:props.id,
            usermaster:props.user,
            title:props.title,
            descriptionmaster:props.description,

            show:false,
            coments:[],

            _id:'',
            username:'',
            description:'',
            creator:false,
            date:'',
            //------------------------------------------------INICIO SEGURIDAD--------------------
            //------------------------------------------------FIN SEGURIDAD--------------------
        }
        this.showcomments = this.showcomments.bind(this);
        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    //------------------------------------------------INICIO SEGURIDAD--------------------
    //------------------------------------------------FIN SEGURIDAD--------------------

    changeStatus(){
        //console.log('status change');
        if(this.state.show){
            this.setState({show:false});
            this.setState({coments:[]});
            this.render();
        }else{
            this.setState({show:true});
            this.fechtComents();
            this.render();
        }
    }
    
    fechtComents(){
        fetch(`/api/post/title/${this.state.title}`)
            .then(res => res.json())
            .then(data =>{
                //console.log(data); 
                  //REPARAR +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                //console.log(this.state.coments);
                for (let index = 0; index < data.length; index++) {
                    if(data[index].creator==true){
                        data.splice(index,1);
                    }               
                }
            //END
                this.setState({coments:data});
                //console.log(this.state.coments);
            })
       
    }

    showcomments(){
        if(this.state.show){
            return(
                <div>
                    <div>
                    {
                        this.state.coments.map(coments=>{
                            return(
                                <div className="row" key={coments._id}>
                                    <div className="col s1 "/>
                                    <div className="col s9 ">
                                        <div className="card blue-grey darken-1">
                                            <div className="card-content white-text">
                                            <span className="card-title">{coments.title}</span>
                                            <p>{coments.description}</p>
                                            @{coments.username}
                                            </div>                                     
                                        </div>
                                    </div>
                                    { (logedGlobal && usernameGlobal == coments.username) ? (
                                            <div className="col s2">
                                                <button className="btn ligth-blue darken-4" style={{margin:"4px"}} > 
                                                    <i className="material-icons">edit</i>
                                                </button>
                                                <button className="btn ligth-blue darken-4" style={{margin:"4px"}} onClick={() =>this.deletTaks(coments._id)}> 
                                                    <i className="material-icons">delete</i>
                                                </button>
                                            </div> 
                                        ):( <p></p> )
                                    }
                                </div>
                            )
                        })
                    }
                    </div>
                    <div>
                        { logedGlobal ? (
                                <div className="row" >
                                    <div className="col s1 "/>
                                    <div className="col s9 ">
                                        <div className="card blue-grey darken-1">
                                            <h3 style={{margin:"6px"}}>Coment</h3>
                                            <div className="card-content white-text">
                                            <p><textarea name ="description" onChange={this.handleChange} type="text" placeholder="Description" value={this.state.description} /></p>
                                            </div>                                      
                                        </div>
                                    </div>
                                    <div className="col s2">
                                        <button className="btn ligth-blue darken-4" style={{margin:"4px"}} onClick={this.addTask}> 
                                            <i className="material-icons">+</i>
                                        </button>
                                    </div> 
                                </div>
                            ):(<p></p>)
                        }
                    </div>
                </div>
                );
        }else{
            return <a/>;
        }
        
    }

    addTask(e){
        this.setState({date:Date.now()});
        this.setState({username:usernameGlobal})
        if(this.state._id){
            fetch(`/api/post/${this.state._id}`,{
                method:'PUT',
                body:JSON.stringify(this.state),
                headers: {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(res =>res.json())
            .then(data =>{
                //console.log(data);
                M.toast({html:'Post editado'});
                this.setState({username:'',description:'',_id:'',date:''});
                this.fechtComents();
            })
        }else{

        fetch('/api/post',{
            method:"POST",
            body:JSON.stringify(this.state),
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                //console.log(data)
                M.toast({html:'Post guardado'});
                this.setState({username:'',description:''})
                this.fechtComents();
            })
            .catch(res => console.log(err));
        
        }
        e.preventDefault();
    }
    deletTaks(id){
        if(confirm('Desea eliminar este post?')){
            fetch(`/api/post/${id}` ,{
                method:'DELETE',
                headers: {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    //console.log(data);
                    M.toast({html:'Post eliminado'});
                    this.fechtComents();
                });
            //console.log('eliminando',id)
        }
    }
    handleChange(e){
        //console.log(e.target.name)
        const{name,value}=e.target;
        this.setState({
            [name]:value
        });

    }

    render(){
            return(
                <div>
                    <div className="row">
                        <div className="col s12 ">
                            <div className="card blue-grey darken-1">
                                <div className="row">
                                    <div className="col s9">
                                        <div className="card-content white-text">
                                            <span className="card-title">{this.state.title}</span>
                                            <p>{this.state.descriptionmaster}</p>
                                            @{this.state.usermaster}
                                        </div>
                                    </div>
                                    <div className="col s3">
                                        <div className="card-content white-text">
                                            <button className="waves-effect waves-light btn" style={{margin:"4px"}} onClick={() =>this.changeStatus()}>Show more </button>
                                        <div/>
                                    </div>                                    
                                    
                                    </div>
                                </div>
                            </div>
                            <div className="card-action"/>
                            <this.showcomments/>
                        </div>
                    </div>
                </div>
            );

    }
}

class App extends Component{

    constructor(){
        super();
        this.state={
            username:'',
            title:'',
            description:'',
            creator:true,
            date:'',
            _id:'',
            tasks: [],
            forums:[],
            top:[],
            statustop:'coment',

            usersearch:'',
            titlesearch:'',

            /*---------------------------------------------------------Inicio variables agregadas para seguridad*/
            loginState:'login', /*      login, register, loged */
            usernameEntered:'',
            passwordEntered:'',
            confirmEntered:'',
            loginRegisTitle:'Inicio de sesion',
            registerState:false,
            mensaje:'',
            loged:false

        };
        this.registrarse = this.registrarse.bind(this);
        this.ingresar = this.ingresar.bind(this);
        this.logout = this.logout.bind(this);
        /*----------------------------------------------------------Fin variables agregadas para seguridad*/

        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.searchfetch = this.searchfetch.bind(this);
    }

    /*---------------------------------------------------------Inicio metodos agregadas para SEGURIDAD*/
    validarLogin(){
        if (this.state.usernameEntered.trim() == "" || this.state.passwordEntered.trim() == ""){
            this.setState({mensaje:'Todos los espacios son requeridos!'})
            return false;
        }
        this.setState({mensaje:''})
        return true;
    }

    validarRegistro(){
        if (this.state.usernameEntered.trim() == "" || this.state.passwordEntered.trim() == "" || this.state.confirmEntered.trim() == ""){
            this.setState({mensaje:'Todos los espacios son requeridos!'})
            return false;
        } else {
            if (this.state.passwordEntered != this.state.confirmEntered) {
                this.setState({mensaje:'Las contraseñas no coinciden!'})
                return false;
            } else {
                if (this.state.passwordEntered.length < 8) {
                    this.setState({mensaje:'La longitud de la contraseña debe ser mayor o igual a 8 caracteres!'})
                    return false;
                } else{
                    if (this.state.usernameEntered.length < 4) {
                        this.setState({mensaje:'La longitud del usuario debe ser mayor o igual a 4 caracteres!'})
                        return false;
                    } else {
                        this.setState({mensaje:''})
                        return true;
                    }
                }
            }
        }
    }

    registrarse(){
        if (this.validarRegistro()) {
            //console.log("registro correcto");
            console.log(this.state.usernameEntered)
            console.log(this.state.passwordEntered)
            fetch('/api/post/users/register',{
                method:"POST",
                body:JSON.stringify({_id:this.state.usernameEntered,password:this.state.passwordEntered}),
                headers: {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                //console.log(data)
                if (String(data) == 'valid') {
                    M.toast({html:'Usuario registrado exitosamente!'});
                    this.setState({usernameEntered:'',passwordEntered:'',confirmEntered:'',mensaje:''})
                } else {
                    M.toast({html:'Este usuario ya se encuentra registrado!'});
                    this.setState({mensaje:'Porfavor intente con un usuario diferente!'})
                }
            })
            .catch(res => console.log("Error"));
        }
    }

    ingresar(){
        if (this.validarLogin()) {
            //console.log("logueo correcto");
            fetch('/api/post/users/login',{
                method:"POST",
                body:JSON.stringify({_id:this.state.usernameEntered,password:this.state.passwordEntered}),
                headers: {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                //console.log("data: ")
                //console.log(data)
                if (String(data) == 'valid') {
                    M.toast({html:'Bienvenido!\n' + String(this.state.usernameEntered)});
                    this.setState({passwordEntered:'',confirmEntered:'',mensaje:'',loged:true,loginRegisTitle:this.state.usernameEntered})
                    this.setState({username:this.state.usernameEntered})
                    logedGlobal = true;
                    usernameGlobal = this.state.usernameEntered
                    this.render();
                } else {
                    M.toast({html:'Usuario o contraseña incorrecto!'});
                    this.setState({mensaje:'Usuario o contraseña incorrecto!'})
                }
            })
            .catch(res => console.log("Error:" + res));
        }
    }

    logout(){
        M.toast({html:'Adios!'});
        this.setState({loged:false,loginRegisTitle:'Inicio de sesion',usernameEntered:'',username:''});
        logedGlobal=false;
        usernameGlobal = ''
    }
    /*----------------------------------------------------------Fin metodos agregadas para SEGURIDAD*/

    addTask(e){    
        this.setState({date:Date.now()});
        if(this.state._id){
            fetch(`/api/post/${this.state._id}`,{
                method:'PUT',
                body:JSON.stringify(this.state),
                headers: {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(res =>res.json())
            .then(data =>{
                //console.log(data);
                M.toast({html:'Post editado'});
                this.setState({username:'',title:'',description:'',_id:'',date:''});
                this.fetchTasks();
            })
        }else{

        fetch('/api/post',{
            method:"POST",
            body:JSON.stringify(this.state),
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                //console.log(data)
                M.toast({html:'Post guardado'});
                this.setState({username:'',title:'',description:''})
                this.fetchTasks();
            })
            .catch(res => console.log(err));
        
        }
        e.preventDefault();
    }

    componentDidMount(){
        this.fetchTasks();
    }

    fetchTasks(){
        //Comentarios
        fetch('/api/post')
            .then(res => res.json())
            .then(data =>{
                //console.log(data);
                if (this.state.usersearch !=='') {
                    for (let index = 0; index < data.length; index++) {
                        if(data[index].username !== this.state.usersearch){
                            data.splice(index,1);
                            index--;
                        }
                    }
                } 
                if (this.state.titlesearch !=='') {
                    for (let index = 0; index < data.length; index++) {
                        if(data[index].title !== this.state.titlesearch){
                            data.splice(index,1);
                            index--;
                        }
                    }
                }
                this.setState({tasks:data});

                //console.log(this.state.tasks);
            })
        //POSTS
        fetch('/api/post/forums/true')
        .then(res => res.json())
        .then(data =>{
            //console.log(data);
            this.setState({forums:data});
        })
        fetch('/api/post')
        .then(res => res.json())
        .then(data =>{
            //console.log(data);
            data.sort(function(a,b){
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.date) - new Date(a.date);
                });
                this.setState({top:data});
                //console.log(data.title);
        })
            
    }

    deletTaks(id){
        if(confirm('Desea eliminar este post?')){
            fetch(`/api/post/${id}` ,{
                method:'DELETE',
                headers: {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    //console.log(data);
                    M.toast({html:'Post eliminado'});
                    this.fetchTasks();
                });
            //console.log('eliminando',id)
        }
    }

    editTaks(id){
        fetch(`/api/post/${id}`)
            .then(res => res.json())    
            .then(data=> {
                //console.log(data)
                this.setState({
                    username:data.username,
                    title:data.title,
                    description:data.description,
                    _id:data._id
                })

    
            });
    }
    handleChange(e){
        //--------------------------------------------------------------SEGURIDAD se comentan estos 2 por seguridad----------
        //console.log(e.target.name)
        const{name,value}=e.target;
        this.setState({
            [name]:value
        });
        //console.log(this.state.titlesearch);

    }

    searchfetch(){
        this.fetchTasks();
    }
   


    render(){
        /*-----------------------------------------Se agregaron todas estas variables para SEGURIDAD-----------------------------------*/
        const registerState = this.state.registerState;
        const mensaje = this.state.mensaje;
        const loged = this.state.loged;
        const usernameEntered = this.state.usernameEntered;
        return(
            <div>
                {/*NAVIGATION*/}
                <nav className="light-blue darken-4">
                    <div>
                        <a className="brand-logo center" href="/" >Twiker</a>
                    </div>
                </nav>
                
                <div className="container">
                    <div className="row">
                        {/*-----------------------------------------INICIO SEGURIDAD-----------------------------------*/}
                        <div className="col s4">
                            
                            <div className="card">
                                <div className="card-content">
                                    <form style={{minHeight: '309px'}}>
                                        <h3 className="center">{this.state.loginRegisTitle}</h3>
                                            { loged ? (<p></p>):(
                                                <div>
                                                    <div className="row">
                                                        <div className="input-field col s12">
                                                            <input name ="usernameEntered" onChange={this.handleChange} type="text" placeholder="username" value={this.state.usernameEntered}/>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s12">
                                                            <input name ="passwordEntered" onChange={this.handleChange} type="password" placeholder="contraseña" value={this.state.passwordEntered}/>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s12">
                                                            <div>
                                                                { registerState ? (
                                                                    <input name ="confirmEntered" onChange={this.handleChange} type="password" placeholder="contraseña" value={this.state.confirmEntered}/>
                                                                ) : (
                                                                    <p></p>
                                                                ) }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <label>{mensaje}</label>
                                                    </div>
                                                    <div>
                                                        { registerState ? (
                                                            <button type="button" onClick={()=>this.setState({loginRegisTitle:'Inicio de sesion', loginState:'login', registerState:false,usernameEntered:'',passwordEntered:'',confirmEntered:'',mensaje:''})} className="btn light-blue darken-4">Cancel</button>
                                                            ) : (
                                                            <button type="button" onClick={this.ingresar} className="btn light-blue darken-4">Ingresar</button>
                                                            )
                                                        }
                                                    </div>
                                                    <div>
                                                        { registerState ? (
                                                            <button style={{marginTop: '10px'}} type="button" onClick={this.registrarse} className="btn light-blue darken-4">Registro</button>
                                                            ) : (
                                                            <button style={{marginTop: '10px'}} type="button" className="btn light-blue darken-4" onClick={()=>this.setState({loginRegisTitle:'Registro de usuarios', loginState:'register', registerState:true, usernameEntered:'',passwordEntered:'',confirmEntered:'',mensaje:''})}>Registro</button>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        }
                                        { loged ? (
                                        <button style={{marginTop: '10px',marginBottom: '0px'}} type="button" onClick={this.logout} className="btn light-blue darken-4">Salir</button>
                                        ):(<p></p>)
                                        }
                                    </form>
                                </div>
                            </div>
                        </div>
                        {/*-----------------------------------------FIN SEGURIDAD-----------------------------------*/}
                        {/*se cambio de col s4 a col s8*/}
                        <div style={{align: 'left'}}>
                            { loged ? (
                                <div className="col s8">
                                    <div className="card">
                                        <div className="card-content">
                                            <form onSubmit={this.addTask}>
                                                <h3 className="center">Creador de foro</h3>
                                                <div className="row">
                                                    <div className="input-field col s12">
                                                        <input name ="title" onChange={this.handleChange} type="text" placeholder="tasktilte" value={this.state.title}/>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="input-field col s12">
                                                        <textarea name="description" onChange={this.handleChange} placeholder="Task description" value={this.state.description}
                                                        className="materialize-textarea"></textarea>
                                                    </div>
                                                </div>
                                                <button type="submit" className="btn light-blue darken-4">Enviar</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                ):( <p></p> )
                            }
                        </div>

                        <div className="col s8">
                            {this.state.forums.map(forums=>{
                                return(
                                    <div key={forums._id}>
                                        <Tempuso id={forums._id} user={forums.username} title={forums.title} description={forums.description}/>
                                    </div>
                                )
                            })}                                                        
                        </div>
                    </div>
                    <div className="row">  
                        <div className="row center col s8">
                            <h2>Search</h2>
                            <div className="card " >
                                    <div className="card-content">
                                        
                                            <input name ="titlesearch" onChange={this.handleChange} type="text" placeholder="Title" value={this.state.titlesearch}/>    
                                            <input name ="usersearch" onChange={this.handleChange} type="text" placeholder="User" value={this.state.usersearch}/>
                                            <button className="btn waves-effect waves-light" onClick={this.searchfetch} name="action" style={{margin:"4px"}}>Submit
                                                <i className="material-icons right">send</i>
                                            </button>
                                            <p>  </p>
                                            <button className="btn waves-effect waves-light" name="action" style={{margin:"4px"}} onClick={()=>{this.setState({titlesearch:'',usersearch:''});this.fetchTasks();}}>All Coments
                                            </button>
                                        
                                    </div>
                            </div>                     
                        </div>
                        <div className=" center col s4">
                            <h2>
                                Tops
                            </h2>
                            <div className="row">
                                <button onClick={()=>this.setState({statustop:'coment'})}>Coments</button>
                                <button onClick={()=>this.setState({statustop:'title'})}>#teme</button>
                                <button onClick={()=>this.setState({statustop:'user'})}>@users</button>
                            </div>
                            <div>
                            {
                                this.state.top.map(top=>{
                                    if (this.state.statustop=="coment") {
                                        return(<div key={top._id}>{top.description}</div>);
                                    }
                                    if (this.state.statustop=="title") {
                                        return(<div key={top._id}>#{top.title}</div>);
                                    }
                                    if (this.state.statustop=="user") {
                                        return(<div key={top._id}>@{top.username}</div>);
                                    }
                                    return(<div key={top._id}>                       
                                </div>);})
                            }
                            </div>
                        </div>
                    <table>
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        this.state.tasks.map(task=>{
                                            return(
                                                <tr key={task._id}> 
                                                    <td>{task.username}</td>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                        { loged && (usernameEntered == task.username) ? (
                                                        <td>
                                                            <button className="btn ligth-blue darken-4" style={{margin:"4px"}} onClick={() =>this.editTaks(task._id)}> 
                                                                <i className="material-icons">edit</i>
                                                            </button>
                                                            <button className="btn ligth-blue darken-4" style={{margin:"4px"}} onClick={() =>this.deletTaks(task._id)}> 
                                                                <i className="material-icons">delete</i>
                                                            </button>
                                                        </td>
                                                        ):(<td></td>)
                                                        }
                                                </tr>
                                            )
                                        
                                        })
                                            
                                    }
                                </tbody>
                            </table>
                    </div>
                    
                </div>
                
            </div>
            
        )
    }
}



export default App;