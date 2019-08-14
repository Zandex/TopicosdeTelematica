import React, {Component} from 'react';
import {render} from 'react-dom';
 

class App extends Component{

    constructor(){
        super();
        this.state={
            username:'',
            title:'',
            description:'',
            _id:'',
            tasks: []
        };
        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    addTask(e){
        //console.log(this.state);
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
                console.log(data);
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
                console.log(data)
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
        fetch('/api/post')
            .then(res => res.json())
            .then(data =>{
                //console.log(data);
                this.setState({tasks:data});
                console.log(this.state.tasks);
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
                    console.log(data);
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
                console.log(data)
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
                </div>
            </div>
        )
    }
}

export default App;