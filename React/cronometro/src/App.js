import React, {Component} from 'react';
import './style.css'

class App extends Component{

    constructor(props){
        super(props);
        this.state = {
            numero: 0,
            botao: 'VAI'
        };
        this.timer = null;
        this.vai = this.vai.bind(this);
        this.limpar = this.limpar.bind(this);
    }

    vai(){
        let state = this.state;

        if(this.timer !== null){
            clearInterval(this.timer);
            this.timer = null;
            state.botao = 'VAI';
        }else{
            this.timer = setInterval(() => {
                let state= this.state;
                state.numero += 0.1;
                this.setState(state);
                
            }, 100)
            state.botao= 'PAUSAR'
        }

        this.setState(state);
       
    }

    limpar(){
        if(this.timer !== null){
            clearInterval(this.timer);
            this.timer = null;
            
        }

        let state= this.state;
        state.numero = 0;
        state.botao = 'VAI';
        this.setState(state);

    }

    render(){
        return(
            <div className="container">
                <img alt="" className="img" src={require('./assets/cronometro.png')}/>
                <div className="timer">{this.state.numero.toFixed(2)}</div>
                <div className="areaBtn">
                    <div className="botao" onClick={this.vai}>{this.state.botao}</div>
                    <div className="botao" onClick={this.limpar}>LIMPAR</div>
                </div>
            </div>
        );
    }
}

export default App;