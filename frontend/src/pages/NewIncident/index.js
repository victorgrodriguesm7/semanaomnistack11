import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import './style.css';
import logoImg from '../../assets/logo.svg';

export default function NewIncident(){
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [description, setDescripiton] = useState('');
    const [value, setValue] = useState('');

    async function handleNewIncident(e){
        e.preventDefault();
        const data = {
            title,
            description,
            value
        };
        try {
            await api.post('incidents', data, {
            headers : {
                Authorization : ongId
                }
            });
            history.push('/profile');
        }catch(err){
            alert("Erro ao cadastrar caso, tente novamente");
        }
    }
    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente </p>
                    
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041"/>
                        Voltar para home
                    </Link>
                    
                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Título do Caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescripiton(e.target.value)}
                    />
                    <input 
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <div className="button-group">
                        <button className="button" type="submit">Cancelar</button>
                        <button className="button" type="submit">Cadastrar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}