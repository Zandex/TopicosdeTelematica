import React, {Component} from 'react';
import {render} from 'react-dom';
 
class Tempuso extends Component{

    constructor(props){
        super();
        this.state={
            id:props.id,
            usermaster:props.user,
            title:props.title,
            description:props.description,
            show:false,
            coments:[]
        }
        this.showcomments = this.showcomments.bind(this);
    }   
    changeStatus(){
        //console.log('status change');
        if(this.state.show){
            this.setState({show:false});
            this.setState({coments:[]});
        }else{
            this.setState({show:true});
            this.fechtComents();
        }
    }
    
    fechtComents(){
        fetch(`/api/post/title/${this.state.title}`)
            .then(res => res.json())
            .then(data =>{
                //console.log(data);
                this.setState({coments:data});

                //console.log(this.state.coments);
            })
        //REPARAR +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            for (let index = 0; index < this.state.coments.length; index++) {
                if(this.state.coments[index].creator){
                    this.state.coments.splice(index,1);
                }               
            }
        //END
    }

    showcomments(){
        if(this.state.show){
            return(
                <div>
                    <div>
                    {
                        this.state.coments.map(coments=>{
                            return(
                                <div className="row" >
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
                                    <div className="col s2">
                                        <button className="btn ligth-blue darken-4" style={{margin:"4px"}} > 
                                            <i className="material-icons">edit</i>
                                        </button>
                                        <button className="btn ligth-blue darken-4" style={{margin:"4px"}} > 
                                            <i className="material-icons">delete</i>
                                        </button>
                                    </div> 
                                </div>                                
                            )                        
                        })       
                    }
                    </div>
                                <div className="row" >
                                    <div className="col s1 "/>
                                    <div className="col s9 ">
                                        <div className="card blue-grey darken-1">
                                            <div className="card-content white-text">
                                            <span className="card-title">    
                                                <input name ="title" onChange={this.handleChange} type="text" placeholder="tasktilte" />
                                            </span>
                                            <p><input name ="description" onChange={this.handleChange} type="text" placeholder="tasktilte" /></p>
                                            -User
                                            </div>                                     
                                        </div>
                                    </div>
                                    <div className="col s2">
                                        <button className="btn ligth-blue darken-4" style={{margin:"4px"}} > 
                                            <i className="material-icons">+</i>
                                        </button>
                                    </div> 
                                </div>    
                    </div>                
                    
                );
        }else{
            return <a/>;
        }
        
    }

    render(){
            return(
                <div>
                    <div className="row">
                        <div className="col s12 m6">
                            <div className="card blue-grey darken-1">
                                <div className="row">
                                    <div className="col s9">
                                        <div className="card-content white-text">
                                            <span className="card-title">{this.state.title}</span>
                                            <p>{this.state.description}</p>
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

        if(this.state.show){
        }else{
            return(
                <div>

                </div>
            );
        }
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
            _id:'',
            tasks: [],
            forums:[]
        };
        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    addTask(e){        
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
                this.setState({username:'',title:'',description:'',_id:''});
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
        //console.log(e.target.name)
        const{name,value}=e.target;
        this.setState({
            [name]:value
        });

    }

    showforums(){
        
           

    render(){
        return(
            <div>
                {/*NAVIGATION*/}
                <nav className="light-blue darken-4">
                    <div>
                        <a className="brand-logo" href="/">Mern base</a>
                    </div>
                </nav>
                
                <div className="container">
                    <div className="row">                  
                        <div className="col s5">
                            
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name ="username" onChange={this.handleChange} type="text" placeholder="username" value={this.state.username}/>
                                            </div>
                                        </div>
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
                        <div className="col s7">
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
                                                    <td>
                                                        <button className="btn ligth-blue darken-4" style={{margin:"4px"}} onClick={() =>this.editTaks(task._id)}> 
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                        <button className="btn ligth-blue darken-4" style={{margin:"4px"}} onClick={() =>this.deletTaks(task._id)}> 
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        
                                        })
                                            
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {this.state.forums.map(forums=>{
                    return(
                        <div>
                            <Tempuso id={forums._id} user={forums.username} title={forums.title} description={forums.description}/>
                        </div>
                    )
                    })}
                </div>
                
            </div>
            
        )
    }
}



export default App;