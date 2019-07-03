import React from 'react';

class Coment extends React.Component {

render (){

  const coment = this.props.coment;
  return (
      <li key={coment.id}>
        <h3>{coment.name}</h3>
        <div>
          {coment.body}
        </div>
        <div>
          {`Autor e-mail: ${coment.email}`}
        </div>
      </li>
    )
}
};

export default Coment;