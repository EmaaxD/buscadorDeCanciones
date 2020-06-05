import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Formulario from './components/Formulario';
import Spinner from './components/utils/Spinner';
import Error from './components/utils/Error';
import Artista from './components/Artista';
import Cancion from './components/Cancion';

const App = () => {

  const [loading, setLoading] = useState(false);
  const [busquedaletra, setBusquedaLetra] = useState({});
  const [error, setError] = useState(false);
  const [letra, setLetra] = useState('');
  const [artista, setArtista] = useState({});

  useEffect(() => {
    const consultarApi = async () => {
      if (Object.keys(busquedaletra).length === 0) return;

      const url_letra = `https://api.lyrics.ovh/v1/${busquedaletra.artista}/${busquedaletra.cancion}`;
      const url_info = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${busquedaletra.artista}`;

      try {
        const [{ data: { lyrics } }, { data: { artists } }] = await Promise.all([
          axios.get(url_letra), axios.get(url_info)
        ]);

        setError(false);
        setLoading(false);

        setLetra(lyrics)
        setArtista(artists[0])
        
      } catch (error) {
        setError(true);
        setLoading(false);
      }

    }

    consultarApi();
  }, [busquedaletra])

  return (
    <React.Fragment>
      <Formulario 
        setLoading ={setLoading}
        setBusquedaLetra ={setBusquedaLetra}
      />
      <div className="container mt-5">
        <div className="row justify-content-center">
          {
            loading ?
              null
            :
              error ?
                <Error message="Error Interno, por favor intente mas tarde o la cancion que busca no existe" />
              :
                null
          }
        </div>

        <div className="row">
          {
            loading ?
              <Spinner />
            :
              !error ?
                (
                  <React.Fragment>
                    <div className="col-md-6">
                      <Artista artista={artista} />
                    </div>
                    <div className="col-md-6">
                      <Cancion letra={letra} />
                    </div>
                  </React.Fragment>
                )
              :
                null
          }
        </div>
      </div>
    </React.Fragment>
  );
}
 
export default App;
