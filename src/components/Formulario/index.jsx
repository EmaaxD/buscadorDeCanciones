import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Error from './../utils/Error';

const Formulario = ({ setLoading, setBusquedaLetra}) => {

    const [busqueda, setBusqueda] = useState({
        artista: '',
        cancion: ''
    });
    const [error, setError] = useState(false);

    const { artista, cancion } = busqueda;

    const handleInput = event => {
        setBusqueda({
            ...busqueda,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = event => {
        event.preventDefault();

        setLoading(true);

        if (artista.trim() === '' || cancion.trim() === '') {
            setError(true);
            setLoading(false);
            return;
        }

        setError(false);
        setBusquedaLetra(busqueda);
    }


    return (
        <div className="bg-info">
            <div className="container">
                <div className="row">
                    <form
                        className="col card text-white bg-transparent mb-5 pt-5 pb-5"
                        onSubmit={handleSubmit}
                    >
                        <fieldset>
                            <legend className="text-center">Buscar Letras de Canciones</legend>

                            {
                                error ?
                                    <Error message="Se necesita todos los campos completos." />
                                :
                                    null
                            }

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="artista">Artista</label>
                                        <input 
                                            type="text" 
                                            name="artista" 
                                            id="artista"
                                            placeholder="Nombre Artista"
                                            className="form-control"
                                            onChange={handleInput}
                                            value={artista}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="cancion">Cancion</label>
                                        <input 
                                            type="text" 
                                            name="cancion" 
                                            id="cancion"
                                            placeholder="Nombre Cancion"
                                            className="form-control"
                                            onChange={handleInput}
                                            value={cancion}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button 
                                type="submit"
                                className="btn btn-primary float-right"
                            >
                                Buscar
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
}

Formulario.propTypes = {
    setLoading: PropTypes.func.isRequired,
    setBusquedaLetra: PropTypes.func.isRequired
}
 
export default Formulario;