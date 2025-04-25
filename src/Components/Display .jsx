import React from 'react';

function MovieList(props) {
  if (props.loading) {
    return (
      <div>
        <div>Loading...</div>
      </div>
    );
  }

  if (props.data && props.data.length > 0) {
    return (
      <div>
        {props.data.map((movie) => (
          <div key={movie.id}>
            <img 
              src={movie.poster} 
              alt={movie.title}
              style={{ width: '200px', height: '300px' }}
            />
            <div>
              <h3>{movie.title}</h3>
              <p>{movie.year}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <p>No results found</p>
    </div>
  );
}

export default MovieList;